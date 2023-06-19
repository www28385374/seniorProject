import requests,math,re,json
from bs4 import BeautifulSoup
from lxml import etree, html
from datetime import datetime
from baseFunc import BaseFunc

class GetPageByXpath(BaseFunc):
    """Get the number of pages by xpath."""
    def __init__(self) -> None:
        pass

    def get_num_page(self, html:object, cmd:str) -> int :
        """Get website's number of pages.

        Returns:
            Website's number of pages.
        """
        num_page=html.xpath(cmd)[1]
        num_page=math.ceil(int(num_page)/200)
        return num_page


class GetAllContent(BaseFunc):
    """Get this page's all content and add to list_total.

    Attributes:
        list_total: The list save all dictionary.
        today: Today's date not datetime.
    """
    def __init__(self) -> None:
        self.list_total=[]
        self.today=datetime.today().date()

    def merge_page_content(self, html:object) -> bool:
        """Merge all content and append to list_total.

        Args:
            html: The page's HTML that need to merge all content.
        """
        dict_all_content=self.get_page_all_content(html)
        for i in range(dict_all_content['num_data']):
            print(i)
            print(dict_all_content['all_title'][i])
            upload_date=self.transform_date(dict_all_content['all_date'][i])
            if self.compare_date(upload_date):
                return False
            title=dict_all_content['all_title'][i]
            href=f"https://content.yunlin.gov.tw/{dict_all_content['all_href'][i]}"
            content=self.get_article_content(href)
            sig_dict={"title":title, "href":href, "upload_date":upload_date, "content":content, "city_id":22}
            self.list_total.append(sig_dict)
        return True

    def get_page_all_content(self, html:object) -> dict:
        """Get this page's content.

        Args:
            html: The page's HTML that need to get all content.

        Returns:
            A dict that save num_data,all_title,all_href,all_date.
        """
        num_data=len(html.xpath('//*[@class="in"]//tbody//a'))
        all_title=html.xpath('//*[@class="in"]//tbody//a//text()')
        all_href=html.xpath('//*[@class="in"]//tbody//a//@href')
        all_date=html.xpath('//*[@class="in"]//tbody//td[2]//text()')
        return {'num_data': num_data, 'all_title': all_title, 'all_href': all_href, 'all_date': all_date}

    def get_article_content(self, href:str) -> str:
        """Get this article's content.

        Args:
            href: The article's href that need to get content text.

        Returns:
            A string that is article's content text.
        """
        html=self.get_html(href)
        try:
            content="".join(html.xpath('//*[@class="p"]//text()'))
            content=self.filter_space(content)
        except:
            content=""
        return content

    def main_function(self):
        """Call main function."""
        fn_get_num_page=GetPageByXpath()
        html_home=fn_get_num_page.get_html("https://content.yunlin.gov.tw/News.aspx?n=1438&sms=9780")
        num_page=fn_get_num_page.get_num_page(html_home,'//*[@class="count"]//text()')
        fn_merge_page_content=GetAllContent()
        for i in range(num_page):
            html_page=fn_merge_page_content.get_html(f"https://content.yunlin.gov.tw/News.aspx?n=1438&sms=9780&page={i+1}&PageSize=200")
            result=fn_merge_page_content.merge_page_content(html_page)
            if(result==False):
                break
        list_total=fn_merge_page_content.get_list_total()
        fn_merge_page_content.write_to_json("yunlinNews",list_total)

if __name__ == '__main__':
    GetAllContent().main_function()