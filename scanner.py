import sys
import urllib
import sqlite3

conn = sqlite3.connect('barcodescanner.db')
print "Opened database successfully";
'''
cursor = conn.execute("SELECT * from products")
for row in cursor:
   print "barcode = ", row[0]
   print "name = ", row[1]
   print "brand = ", row[2]
   print "quantity = ", row[3], "\n"
'''

amount = 1
while 1:
    scanIn = sys.stdin.readline().rstrip()
    if not(scanIn is None):
		conn.execute("INSERT INTO fridge (barcode, dateBought, amount) VALUES ("+scanIn+",date('now'),"+str(amount)+")");
		conn.commit()
		print scanIn
		scanIn = None;
		print "Inserted successfully";

conn.close()