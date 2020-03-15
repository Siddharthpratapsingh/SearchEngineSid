# -*- coding: utf-8 -*-
import scrapy
from ..items import CrawlersItem


class ThehinducrawlerSpider(scrapy.Spider):
    name = 'TheHinducrawler'
    page_number = 2
    allowed_domains = ['thehindu.com']
    start_urls = ['https://www.thehindu.com/search/?q=news&order=DESC&sort=publishdate&page=1']

    def parse(self, response):
        items = CrawlersItem()
        title = response.css('.story-card75x1-text').css('::text').extract()
        description = response.css('.story-card-33-text').css('::text').extract()
        dateAndTime = response.css('.dateline').css('::text').extract()
        img = response.css('.focuspoint::attr(href)').extract()
        
        items['title']=title
        items['description']=description
        items['dateAndTime']=dateAndTime
        items['img']=img

        yield items

        next_page = 'https://www.thehindu.com/search/?q=news&order=DESC&sort=publishdate&page='+str(ThehinducrawlerSpider.page_number)
        if ThehinducrawlerSpider.page_number<=100000:
            ThehinducrawlerSpider.page_number=ThehinducrawlerSpider.page_number+1
            yield response.follow(next_page,callback=self.parse)