import requests,math,re,json,os
from bs4 import BeautifulSoup
from lxml import etree, html
import mysql.connector
class GetHTML:
    """Get the HTML by href."""
    def __init__(self) -> None:
        pass

    def get_html(self) -> object:
        """Get city's HTML by city name.

        Args:
            city_name: The city name in city list.

        Returns:
            The city page's HTML.
        """
        req = requests.get(f"https://moe.senioredu.moe.gov.tw/Home/University")
        HTMLDecode = req.content.decode()
        html = etree.HTML(HTMLDecode)
        return html

class GetContent:
    def __init__(self) -> None:
        self.result_list=[]
        pass

    def get_all_content(self,html)->None:
        """Get page's all content."""
        for i in range(4,92):
            td=html.xpath(f'//*[@id="table_content5"]//tr[{i}]//td//text()')
            href=html.xpath(f'//*[@id="table_content5"]//tr[{i}]//td[3]//@href')
            sig_dict={"city":str(td[1]), "name":str(td[2]),"href":str(href[0]), "unit":str(td[3]), "person":str(td[4]), "phone":str(td[5])}
            self.result_list.append(sig_dict)


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

    def insert_database(self) ->None:
        """Insert data into database"""
        mydb = mysql.connector.connect(
                        host='localhost',
                        database='senior_learning',
                        user='pma',
                        password='1234')
        mycursor = mydb.cursor()
        sql_city=""" SELECT city_id from city  WHERE city_name_CN LIKE %s"""
        sql_insert = '''INSERT INTO university ( univ_id, univ_name, univ_href, univ_unit, univ_contact_person,univ_phone, city_id )
        VALUES ('',%s,%s,%s,%s,%s,%s)'''

        for i in self.result_list:
            if i['city']=='新竹縣' or i['city']=='嘉義縣' or i['city']=='新竹市':
                mycursor.execute(sql_city,("%"+i['city'],))
            else:
                mycursor.execute(sql_city,("%"+i['city'][:2]+"%",))
            city_id=mycursor.fetchone()
            print(i['href'])
            # mycursor.execute(sql_insert,(i['name'],i['href'],i['unit'],i['person'],i['phone'],int(city_id[0])))

        mydb.commit()



if __name__ == '__main__':
    GetContent=GetContent()
    html = GetHTML().get_html()

    GetContent.get_all_content(html)
    GetContent.insert_database()