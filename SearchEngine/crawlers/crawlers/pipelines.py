# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

import pymongo
class CrawlersPipeline(object):
    def __init__(self):
        self.conn = pymongo.MongoClient("mongodb://PowerHouseCoder:KiN8ZXuI4WaYKo9A@powerhousecoder-shard-00-00-rte3q.mongodb.net:27017,powerhousecoder-shard-00-01-rte3q.mongodb.net:27017,powerhousecoder-shard-00-02-rte3q.mongodb.net:27017/test?ssl=true&replicaSet=PowerHouseCoder-shard-0&authSource=admin&retryWrites=true&w=majority")
        # self.conn = pymongo.MongoClient(
        #     'localhost',
        #     27017
        # )
        db = self.conn['TheHinduCrawler']
        self.collection = db['CrawledData']
    def process_item(self, item, spider):
        self.collection.insert(dict(item))
        return item
