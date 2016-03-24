import sys
import urllib
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.barcode_scanner

'''
for product in db.products.find():
  print product
'''


amount = 1
while 1:
    scanIn = sys.stdin.readline().rstrip()
    if not(scanIn is None):
      query = db.products.find({"barcode": scanIn})
      if(query.count() > 0):
        insert = db.storage.insert_one(query)
        print scanIn
        scanIn = None;
        print "Inserted successfully";

