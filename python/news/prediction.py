import torch
from torch.utils.data import DataLoader, Dataset
from transformers import BertConfig, BertTokenizerFast, BertForSequenceClassification
import numpy as np
from tqdm.auto import tqdm
import sys,json,os
import mysql.connector,datetime
from datetime import datetime

class JsonFiles:
    def call_JsonFiles():
        path_to_json = './final'
        json_files = [pos_json for pos_json in os.listdir(path_to_json) if pos_json.endswith('.json')]
        return json_files


    def merge_JsonFiles(filename):
        result = list()
        for f1 in filename:
            with open('./final/'+f1, 'r',encoding="utf-8") as infile:
                result.extend(json.load(infile))
        with open('./prediction/counseling.json', 'w+',encoding="utf-8") as output_file:
            json.dump(result, output_file, ensure_ascii=False)

jsonArray=JsonFiles.call_JsonFiles()
JsonFiles.merge_JsonFiles(jsonArray)


now = datetime.now()
format_str = '%d/%m/%Y'

# filename = sys.argv[0] #filename (current filename)

# parameter_1_text = sys.argv[1] #parameter[0] (input string) 111111111
# with open(sys.argv[1],encoding="utf-8") as json_data:
#     parameter_data = json.load(json_data)

# parameter_json=parameter_data

with open('./prediction/counseling.json',encoding="utf-8") as json_data:
    parameter_data = json.load(json_data)

parameter_json=parameter_data

# Whether to use GPU for training
def use_gpu():
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(device)
    print(torch.version.cuda)
    return device
device = use_gpu()

# loading model and config
tokenizer = BertTokenizerFast.from_pretrained("bert-base-chinese")
config = BertConfig.from_json_file("./saved_museum_model/config.json")
model = BertForSequenceClassification.from_pretrained("./saved_museum_model/", config=config).to(device)
model.eval()
predictionText=[]

# parameter_1_text = ''.join(char for char in parameter_1_text if char.isalnum())
for i in range(len(parameter_data)):
    parameter_data[i]['title'] = ''.join(char for char in parameter_data[i]['title'] if char.isalnum())
    parameter_data[i]['content'] = ''.join(char for char in parameter_data[i]['content'] if char.isalnum())
    predictionText.append([parameter_data[i]['title']+parameter_data[i]['content']])


predictionText_Tokenized = tokenizer([textState[0] for textState in predictionText], add_special_tokens=True)



class MuseumDatasetPreProcess(Dataset):
    def __init__(self, text, tokenized_text):
        self.text = text
        self.tokenized_text = tokenized_text
        self.max_text_len = 150
        # Input sequence length = [CLS] + text + [SEP]
        self.max_seq_len = 1 + self.max_text_len + 1

    def __len__(self):
        return len(self.text)

    def __getitem__(self, index):
        #Select bert wordbook ids(number)
        input_ids_text = self.tokenized_text[index].ids
        #Pad zeros
        input_ids, token_type_ids, attention_mask = self.padding(input_ids_text)

        return torch.as_tensor(input_ids), torch.as_tensor(token_type_ids), torch.as_tensor(attention_mask)
    def padding(self, input_ids_text):
        input_ids_text = input_ids_text[0:self.max_text_len]
        # Pad zeros if sequence length is shorter than max_seq_len
        padding_len = self.max_seq_len - len(input_ids_text)
        # Indices of input sequence tokens in the vocabulary
        input_ids = input_ids_text + [0] * padding_len
        # Segment token indices to indicate first and second portions of the inputs. Indices are selected in [0, 1]
        token_type_ids = [0] * len(input_ids_text) + [0] * padding_len
        # Mask to avoid performing attention on padding token indices. Mask values selected in [0, 1]
        attention_mask = [1] * len(input_ids_text) + [0] * padding_len
        return input_ids, token_type_ids, attention_mask

predictionSet = MuseumDatasetPreProcess(predictionText, predictionText_Tokenized)

predictionSetLoader = DataLoader(predictionSet, batch_size=1, shuffle=False, pin_memory=True)

city_id='1'
data_id=1
#predictionLabel
result=[]
with torch.no_grad():
    for i, test_data in enumerate(tqdm(predictionSetLoader)):
        if (parameter_json[i]['city_id']==str(int(city_id)+1)):
            data_id=1
        output = model(input_ids=test_data[0].to(device),
                        token_type_ids=test_data[1].to(device),
                        attention_mask=test_data[2].to(device))

        test_pred = np.argmax(output.logits.detach().cpu(), axis=1).numpy()
    #11111111111111111 (下面資訊要變for迴圈跑 tab)
        print('id='+str(i))
        print('data_id='+str(data_id))
        print('city_id='+str(parameter_json[i]['city_id']))
        print('type='+str(test_pred[0]))
        #final result
        try:
            datetime_obj = datetime.datetime.strptime(parameter_json[i]['upload_date'], format_str).date()
        except:
            datetime_obj = None
        val = (parameter_json[i]['city_id'],data_id)



        # print(len(allText))
        data_id+=1
        city_id=parameter_json[i]['city_id']
        result.append(test_pred[0])
        print('---------------------------------------------------------------------------------------')
        fp = open("./prediction/predictionResult.txt", "w+")
        fp.writelines(str(test_pred[0])+'\n')
        fp.close()

final_list=[]

with open('./prediction/counseling.json',encoding="utf-8") as json_data:
    parameter_final_file = json.load(json_data)


for i in range(len(parameter_final_file)):
    final_list.append({'title': parameter_final_file[i]['title'],
    'href': parameter_final_file[i]['href'],
    'upload_date': parameter_final_file[i]['upload_date'],
    'content': parameter_final_file[i]['content'],
    'city_id': parameter_final_file[i]['city_id'],
    'type':int(result[i])})


with open('./prediction/result.json', 'w+',encoding="utf-8") as output_file:
    json.dump(final_list, output_file, ensure_ascii=False)


# mydb.commit()