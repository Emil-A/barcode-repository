import sys
import urllib
import datetime
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.barcode_scanner

class Product(object):
    name = ""
    brand = ""
    quantity = ""
    image = ""


#When a product is scanned in, add it to the storage
def add_storage(scanIn):
  if not scanIn.isdigit() and scanIn.length != 12:
    return False

  queryProd = db.products.find({"_id": scanIn})
  if(queryProd.count() > 0):
    #Product exsists
    #Don't check if already in storage, tally up because of now time
    now = datetime.datetime.utcnow()
    db.storage.insert_one({"date": now, "product": queryProd[0]})
    return True
  else:
    #Product not in db, need to add
    print "Let's add this to the products DB"
    newProd = create_new_prod();
    db.products.insert_one(
      {
      "_id": scanIn, "name": newProd.name, "brand": newProd.brand, "quantity": newProd.quantity, "img_url": newProd.image
      })
    queryProd = db.products.find({"_id": scanIn})
    now = datetime.datetime.utcnow()
    db.storage.insert_one({"date": now, "product": queryProd[0]})
    return True
        

def create_new_prod():
  product = Product()
  #Validate input
  product.name = raw_input("What's the name? ")
  product.brand = raw_input("What's the brand? ")
  product.quantity = raw_input("What's the quantity (kg/ml)? ")
  product.image = raw_input("What's the image url? ")

  return product

#When a product is scanned out, remove it from the storage
def remove_storage():
  return True

def main():
  while 1:
    scanIn = sys.stdin.readline().rstrip()
    if not(scanIn is None):
      if addStorage(scanIn)
        print "Inserted successfully"
      scanIn = None

if __name__ == "__main()__":
  main()