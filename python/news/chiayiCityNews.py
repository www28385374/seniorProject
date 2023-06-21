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
        num_page=html.xpath(cmd)[0]
        num_page=int(num_page[1:-1])
        num_page=math.ceil(num_page/12)
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

        Returns:
            A boolean to make sure if the article is old.
        """
        dict_all_content=self.get_page_all_content(html)
        for i in range(dict_all_content['num_data']):
            href="https://www.cabcy.gov.tw/web/"+dict_all_content['all_href'][i]
            dict_article=self.get_article_content(href)
            upload_date=dict_article['upload_date']
            if self.compare_date(upload_date):
                return False
            title=dict_all_content['all_title'][i]
            content=dict_article['content']
            sig_dict={"title":title,"href":href,"upload_date":upload_date,"content":content,"city_id":2}
            self.list_total.append(sig_dict)
        return True

    def get_page_all_content(self, html:object) -> dict:
        """Get this page's content.

        Args:
            html: The page's HTML that need to get all content.

        Returns:
            A dict that save num_data,all_title,all_href.
        """
        num_data=len(html.xpath('//*[@class="kf-activity_item01"]'))
        all_title = html.xpath('//*[@class="kf-activity_item01"]//a//@title')
        all_href = html.xpath('//*[@class="kf-activity_item01"]//a//@href')
        return {'num_data': num_data, 'all_title': all_title, 'all_href': all_href}

    def get_article_content(self, href:str) -> dict:
        """Get this article's content and upload date.

        Args:
            href: The article's href that need to get content text.

        Returns:
            A dict about the article's content text and upload date.
        """

        html =self.get_html(href)
        try:
            upload_date=self.transform_date(html.xpath('//*[@class="kf-title_time"]//text()')[0],'-')
        except:
            upload_date=""
        try:
            content="".join(html.xpath('//*[@class="kf-detail-content"]//text()'))
            content=self.filter_space(content)
        except:
            content=""
        return {'content': content, 'upload_date': upload_date}

    def main_function(self):
        """Call main function."""
        fn_get_num_page=GetPageByXpath()
        html_home=fn_get_num_page.get_html("https://www.cabcy.gov.tw/web/HotActivitiesListC000000.aspx?appname=HotActivitiesListC000000")
        num_page=fn_get_num_page.get_num_page(html_home,'//*[@class="kf-paginator_number"]/font[1]//text()')
        fn_merge_page_content=GetAllContent()
        for i in range(num_page):
            print(i)
            html_page=fn_merge_page_content.get_html(f"https://www.cabcy.gov.tw/web/HotActivitiesListC000000.aspx?Pindex={str(i+1)}&QueryType=M")
            result=fn_merge_page_content.merge_page_content(html_page)
            if(result==False):
                break
        list_total=fn_merge_page_content.get_list_total()
        fn_merge_page_content.write_to_json("chiayiCityNews",list_total)

if __name__ == '__main__':
    GetAllContent().main_function()