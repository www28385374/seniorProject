import os, json
import pandas as pd
import mysql.connector
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("firebase/museum-3f66b-firebase-adminsdk-xgvbc-66a34842ab.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

mydb = mysql.connector.connect(
                        host='localhost',
                        database='senior_learning',
                        user='pma',
                        password='1234')
mycursor = mydb.cursor(buffered=True)
sql_select = '''SELECT count(*) FROM culture WHERE cul_title=%s OR cul_href=%s'''
sql_insert = '''INSERT INTO culture ( cul_id, cul_title, cul_href, cul_content, cul_upload_date, city_id ,t_id)
SELECT '',%s,%s,%s,%s,%s,%s
FROM  DUAL WHERE  NOT EXISTS ( SELECT cul_id FROM culture_test WHERE cul_title LIKE %s and cul_href = %s)'''

class JsonFiles:
    def call_JsonFiles():
        path_to_json = './final'
        json_files = [pos_json for pos_json in os.listdir(path_to_json) if pos_json.endswith('.json')]
        return json_files


    def merge_JsonFiles(filename):
        result = list()
        for f1 in filename:
            print(f1)
            with open('./final/'+f1, 'r',encoding="utf-8") as infile:
                result.extend(json.load(infile))
        with open('./final/'+'counseling.json', 'w',encoding="utf-8") as output_file:
            json.dump(result, output_file, ensure_ascii=False)

    def read_Json():
        f = open('./prediction/result.json' ,'r',encoding="utf-8")
        data=json.load(f)
        for i in data:
            mycursor.execute(sql_select,(i['title'],i['href']))

            if (mycursor.fetchone()[0] > 0):
                print("已新增過")
            else :
                mycursor.execute(sql_insert,(i['title'],i['href'],i['content'],i['upload_date'],i['city_id'],i['type'],"%"+i['title']+"%",i['href']))
                i['cul_id']=mycursor.lastrowid
                print(type(i))
                if(mycursor.lastrowid!=0):
                    print(i)
                    doc_ref = db.collection("culture").document(str(i["cul_id"]))
                    doc_ref.set(i)
                else:
                    print("已新增過")




if __name__ == '__main__':
    # jsonArray=JsonFiles.call_JsonFiles()
    # JsonFiles.merge_JsonFiles(jsonArray)
    # for i in jsonArray:
    #     JsonFiles.read_Json(i)
    JsonFiles.read_Json()
    mydb.commit()

    # mycursor.execute(sql_insert,('title','','content','',22,'title','content'))

