import sys
import urllib
from pymongo import MongoClient

client = MongoClient('localhost', 27017)

db = client.test

names = db.names

item = names.find_one()

print item
'''
amount = 1
while 1:
    scanIn = sys.stdin.readline().rstrip()
    if not(scanIn is None):
		#conn.execute("INSERT INTO fridge (barcode, dateBought, amount) VALUES ("+scanIn+",date('now'),"+str(amount)+")");
		#conn.commit()


		print scanIn
		scanIn = None;
		print "Inserted successfully";

'''