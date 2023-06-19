import requests, math, re, json
from bs4 import BeautifulSoup
from lxml import etree, html
from datetime import date, datetime,timedelta
from fake_useragent import UserAgent
import os

class BaseFunc(object):
    """BaseFunc will import by culture news.

    Attributes:
        href: Now website's href.
    """
    def __init__(self) -> None:
        pass

    def get_html(self, href:str='', verify:bool=True) -> object:
        """Get website's HTML object by self.href.

        Args:
            verify: A boolean value that used to disable SSL verify, default value is True.

        Returns:
            A html object that used to parse by xpath.
        """
        ua=UserAgent()
        headers={'user-agent': ua.random}
        req=requests.get(href, headers=headers, verify=verify)
        HTMLDecode=req.content.decode()
        html=etree.HTML(HTMLDecode)
        return html

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
        # before_ten_day=self.today - timedelta(days=10)
        return date < before_ten_day
        return date < today
        return date < self.today

    def transform_date(self, date:str, mark:str='-', ROC:bool=True) -> str:
        """The ROC era date will transform to Western date.

        Args:
            date: The article's date.
            mark: A mark is '/' or '-' or anything to parse date
            ROC: If ROC boolean value is True use transform ROC,else not transform.

        Returns:
            A string that is ROC date's Western date.
        """
        date=date.split(f"{mark}")
        if ROC:
            date[0]=int(date[0])+1911
        date='-'.join(str(x) for x in date)
        return date

    def filter_space(self, content:str) -> str:
        """Filter content's space and excessive lines.

        Args:
            content: The article's content.

        Returns:
            A string that is article's content within filter.
        """
        content=re.sub(r"^\s+|\s+$", "", content)
        content=re.sub(r"\s+", "\n", content)
        return content

    def write_to_json(self, name_file:str, list_total:list) -> None:
        """Write final list into json file.

        Args:
            fileName: The JSON file's name.
            list_total: The list has all dict to write to file.
        """
        if not os.path.exists('final'):
            os.makedirs('final')
        final=json.dumps(list_total, indent=4, ensure_ascii=False)
        f=open(f"final/{name_file}.json", "w", encoding='UTF-8')
        f.write(final)
        f.close()
        print(final)

    def get_list_total(self) -> list:
        """Filter content's space and excessive lines.

        Returns:
            A list that has all content dict.
        """
        return self.list_total
