import sys
import urllib
import datetime
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.barcode_scanner

#When a product is scanned in, add it to the storage
def addStorage():
  amount = 1
  while 1:
      scanIn = sys.stdin.readline().rstrip()
      if not(scanIn is None):
        query = db.products.find({"_id": scanIn})
        if(query.count() > 0):
          #Product exsists
          now = datetime.datetime.utcnow()
          insert = db.storage.insert_one({"date": now, "product": query[0]})
          print query[0]
          print scanIn
          scanIn = None;
          print "Inserted successfully"
        else:
          print ":/ couldn't find"

#When a product is scanned out, remove it from the storage
def removeStorage():
  while 1:


addStorage()