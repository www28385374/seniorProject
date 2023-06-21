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
        num_page=(num_page.split('page='))[1]
        return int(num_page)

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
            upload_date=self.filter_space(dict_all_content['all_date'][i].split("發布日期：")[1])
            if self.compare_date(upload_date):
                return False
            title=dict_all_content['all_title'][i]
            href="https://www.hchcc.gov.tw/Tw/News/"+dict_all_content['all_href'][i]
            content=self.get_article_content(href)
            sig_dict={"title":title,"href":href,"upload_date":upload_date,"content":content,"city_id":5}
            self.list_total.append(sig_dict)
        return True

    def get_page_all_content(self, html:object) -> dict:
        """Get this page's content.

        Args:
            html: The page's HTML that need to get all content.

        Returns:
            A dict that save num_data,all_title,all_href,all_date.
        """
        num_data=len(html.xpath('//*[@class="i_title"]'))
        all_title=html.xpath('//*[@class="i_title"]//text()')
        all_href=html.xpath('//*[@class="inside_list_type1_area"]//a/@href')
        all_date=html.xpath('//*[@class="list_info"]//text()')
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
            content="".join(html.xpath('//*[@class="content_txt"]//text()'))
            content=self.filter_space(content)
        except:
            content=""
        return content
    def main_function(self):
        """Call main function."""
        fn_get_num_page=GetPageByXpath()
        html_home=fn_get_num_page.get_html("https://www.hchcc.gov.tw/Tw/News/CultureNewsList?filter=2d19cb6c-e4bf-49af-937e-42beb45299dd")
        num_page=fn_get_num_page.get_num_page(html_home,'//*[@class="PagedList-skipToLast"]/a/@href')
        fn_merge_page_content=GetAllContent()
        for i in range(num_page):
            html_page=fn_merge_page_content.get_html(f"https://www.hchcc.gov.tw/Tw/News/CultureNewsList?filter=2d19cb6c-e4bf-49af-937e-42beb45299dd&page={i+1}")
            result=fn_merge_page_content.merge_page_content(html_page)
            if(result==False):
                break
        list_total=fn_merge_page_content.get_list_total()
        fn_merge_page_content.write_to_json("hsinchuCounty",list_total)

if __name__ == '__main__':
    GetAllContent().main_function()