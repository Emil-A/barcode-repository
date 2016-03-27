import sys
import urllib
import datetime
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.barcode_scanner

class Product(object):
    name = ""
    brand = ""
    amount = ""
    image = ""


#When a product is scanned in, add it to the storage
def addStorage():
  amount = 1
  while 1:
      scanIn = sys.stdin.readline().rstrip()
      if not(scanIn is None):
        queryProd = db.products.find({"_id": scanIn})
        if(queryProd.count() > 0):
          #Product exsists
          now = datetime.datetime.utcnow()
          db.storage.insert_one({"date": now, "product": queryProd[0]})
          print "Inserted successfully"
        else:
          #Product not in db, need to add
          print "Let's add this to the products DB"
          newProd = createNewProd();
          db.storage.insert_one({"_id": scanIn, "name": newProd.name, "brand": newProd.brand, "amount": newProd.amount, "img_url": newProd.image})
          queryProd = db.products.find({"_id": scanIn})
          now = datetime.datetime.utcnow()
          db.storage.insert_one({"date": now, "product": queryProd[0]})
          print "Inserted successfully"
        print queryProd[0]
        scanIn = None

def createNewProd():
  product = Product()
  #Validate input
  product.name = raw_input("What's the name? ")
  product.brand = raw_input("What's the brand? ")
  product.amount = raw_input("What's the amount (kg/ml)? ")
  product.image = raw_input("What's the image url? ")

#When a product is scanned out, remove it from the storage
def removeStorage():
  print "Remove!"

addStorage()