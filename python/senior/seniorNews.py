import requests,math,re,json,os
from bs4 import BeautifulSoup
from lxml import etree, html
from datetime import datetime, timedelta
import mysql.connector
class GetCityHTML:
    """Get the City HTML by city list."""
    def __init__(self) -> None:
        """Set city list.."""
        self.city_list=["Changhua","Chiayi","ChiayiCounty","Hsinchu","HsinchuCounty","Hualien","Kaohsiung","Keelung",
                        "Kinmen","Lianjiang","Miaoli","Nantou","Xinbei","Penghu","Pingtung","Taichung","Tainan","Taipei",
                        "Taitung","Taoyuan","Yilan","Yunlin"]

    def get_city_list(self) -> list:
        """Get city's list.

        Returns:
            City's list.
        """
        return self.city_list

    def get_city_html(self,city_name) -> object:
        """Get city's HTML by city name.

        Args:
            city_name: The city name in city list.

        Returns:
            The city page's HTML.
        """
        req = requests.get(f"https://moe.senioredu.moe.gov.tw/senioredu_ms/HomeSon/{city_name}/{city_name}NewsCenter")
        HTMLDecode = req.content.decode()
        html = etree.HTML(HTMLDecode)
        return html

class GetCityContent:
    def __init__(self) -> None:
        """Set default total list and today date."""
        self.list_total=[]
        self.today=datetime.today().date()
        pass

    def get_all_content(self,city_id,html)->None:
        """Get page's all content include title,href,upload_date.

        Args:
            city_id: The city's id.
        """
        title=html.xpath('//*[@id="DataTable"]//tbody//td[1]//a//text()')
        href=html.xpath('//*[@id="DataTable"]//tbody//td[1]//a//@href')
        upload_date=html.xpath('//*[@id="DataTable"]//tbody//td[2]//text()')
        if len(title)==0:
            return False
        for i in range(len(title)):
            if self.compare_date(upload_date[i],'/'):
                break
            else:
                content = self.get_article_content(href[i].split("enFormId%3D")[1])
                sig_dict={"title":str(title[i]),"href":"https://moe.senioredu.moe.gov.tw/"+href[i],"upload_date": str(upload_date[i]),"content":content,"city_id":city_id}
                self.list_total.append(sig_dict)

    def compare_date(self, date:str, mark:str='-') -> bool:
        """Compare date between date and today.

        Args:
            date: The article's date.
            mark: A mark is '/' or '-' to parse date

        Returns:
            A boolean value means break for-loop if that is true.
        """
        date=datetime.strptime(date, f'%Y{mark}%m{mark}%d').date()
        before_ten_day=datetime.strptime(f"2022{mark}12{mark}18", f'%Y{mark}%m{mark}%d').date()

        # before_ten_day=self.today - timedelta(days=1)
        return date < before_ten_day

    # 取得文章內容
    def get_article_content(self,href):
        """Get this article's content.

        Args:
            href: The article's href that need to get content text.

        Returns:
            A string that is article's content text.
        """
        req = requests.get("https://moe.senioredu.moe.gov.tw/senioredu_ms/Home/SeniorCenterMoreNewsDataRead?seniorCenterMessageFileViewModel.enFormId="+href)
        HTMLDecode = req.content.decode()
        html = etree.HTML(HTMLDecode)
        try:
            content = "".join(html.xpath("//*[@class='col-12 text-start px-4']//text()"))
            content = self.filter_space(content)
        except:
            content = ""
        return content


    #過濾字串
    def filter_space(self,content) -> str:
        """Filter content's space and excessive lines.

        Args:
            content: The article's content.

        Returns:
            A string that is article's content within filter.
        """
        content=re.sub(r"^\s+|\s+$", "", content)
        content=re.sub(r"\s+", "\n", content)
        return content

    def write_to_json(self,fileName) ->None:
        """Write final list into json file.

        Args:
            fileName: The JSON file's name.
            list_total: The list has all dict to write to file.
        """
        if not os.path.exists('seniorFinalNews'):
            os.makedirs('seniorFinalNews')
        final_file = json.dumps(self.list_total, indent=4, ensure_ascii=False)
        f = open(f"seniorFinalNews/{fileName}.json", "w", encoding='UTF-8')
        f.write(final_file)
        f.close()

    def insert_database(self) ->None:
        """Insert data into database"""
        mydb = mysql.connector.connect(
                        host='localhost',
                        database='senior_learning',
                        user='pma',
                        password='1234')
        mycursor = mydb.cursor()
        sql_insert = '''INSERT INTO senior ( se_id, se_title, se_href, se_content, se_upload_date, city_id )
        SELECT '',%s,%s,%s,%s,%s
        FROM  DUAL WHERE  NOT EXISTS ( SELECT se_id FROM senior WHERE se_title = %s or se_content = %s )'''

        for i in self.list_total:
            mycursor.execute(sql_insert,(i['title'],i['href'],i['content'],i['upload_date'],i['city_id'],i['title'],i['content']))
        mydb.commit()



if __name__ == '__main__':

    GetCityHTML=GetCityHTML()
    GetCityContent=GetCityContent()
    city_list = GetCityHTML.get_city_list()

    for city_id,city_name in enumerate(city_list):
        print(city_id,city_name)
        html = GetCityHTML.get_city_html(city_name)
        GetCityContent.get_all_content(city_id+1,html)
        print('------------------------------------------------------------------------------------------')

    GetCityContent.insert_database()
    GetCityContent.write_to_json('seniorNews')