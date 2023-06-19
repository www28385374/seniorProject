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
        num_page=int(html.xpath(cmd)[0])
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
            upload_date=self.filter_space(dict_all_content['all_date'][i])
            if self.compare_date(upload_date):
                return False
            title=self.filter_space(dict_all_content['all_title'][i])
            href=dict_all_content['all_href'][i]
            content=self.get_article_content(href)
            sig_dict={"title":title, "href":href, "upload_date":upload_date, "content":content, "city_id":10}
            self.list_total.append(sig_dict)
        return True

    def get_page_all_content(self, html:object) -> dict:
        """Get this page's content.

        Args:
            html: The page's HTML that need to get all content.

        Returns:
            A dict that save num_data,all_title,all_href,all_date.
        """
        num_data=len(html.xpath("//*[@class='elementor-post__title']/a/text()"))
        all_title=html.xpath("//*[@class='elementor-post__title']/a/text()")
        all_href=html.xpath("//*[@class='elementor-post__title']/a/@href")
        all_date=html.xpath("//*[@class='elementor-post__meta-data']/span/text()")
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
            content = "".join(html.xpath("//div[@class='elementor-element elementor-element-717ce3c2 elementor-widget elementor-widget-theme-post-content']//text()"))
            if content == "":
                content = "".join(html.xpath("//div[@class='entry-content clr']//text()"))
            content=self.filter_space(content)
        except:
            content=""
        return content

    def main_function(self):
        """Call main function."""
        fn_get_num_page=GetPageByXpath()
        html_home=fn_get_num_page.get_html(f"https://www.matsucc.gov.tw/%e8%97%9d%e6%96%87%e8%b3%87%e8%a8%8a/")
        num_page=fn_get_num_page.get_num_page(html_home,"//div[@class='e-load-more-anchor']/@data-max-page")
        fn_merge_page_content=GetAllContent()
        for i in range(num_page):
            html_page=fn_merge_page_content.get_html(f"https://www.matsucc.gov.tw/%e8%97%9d%e6%96%87%e8%b3%87%e8%a8%8a/{i+1}/")
            result=fn_merge_page_content.merge_page_content(html_page)
            if(result==False):
                break
        list_total=fn_merge_page_content.get_list_total()
        fn_merge_page_content.write_to_json("lianjiangNews",list_total)

if __name__ == '__main__':
    GetAllContent().main_function()