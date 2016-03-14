import sys
import urllib

while 1:
    line = sys.stdin.readline().rstrip()
    print line
    #f = urllib.urlopen("http://www.google.com/search?%s" % urllib.urlencode( {'q':line} ))
    #print f.read()