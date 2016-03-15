var request = require("request");
var cheerio = require("cheerio");
var url = "http://ca.openfoodfacts.org/";
var links = [];
var completed = 0;

//Loop through all 27 pages
for(var i = 1; i <= 27; i++) {
    url = "http://ca.openfoodfacts.org/" + i;
    getProductPagess(url);
} 

//Get all product links from page  
function getProductPagess(url) {
    request(url, function (error, response, html) {
      if (!error) {
        var $ = cheerio.load(html);

        var links = [];
        $('.products li a').each(function() {
            var link = $(this);
            var text = link.text();
            var href = link.attr("href");

            links.push(href);
            completed++;
            if (completed > 530) {
                //Got all links, ready to scrape
                for(link in links) {
                    getProductInfo(links[link]);
                }
            }

        });

      } else {
        console.log("We’ve encountered an error: " + error);
      }
    });
}

//Get each individual product information to be inserted into database
function getProductInfo(href) {
    url = "http://ca.openfoodfacts.org" + href;
        
    request(url, function (error, response, html) {
      if (!error) {
        var $ = cheerio.load(html);

        var name = $('h1[itemprop="name"]');
        name = name.text().split(" - ");
        if(name.length == 3) {
            var product =  name[0];
            var brand = name[1];
            var amount = name[2];
        }else {
            var product =  name[0];
            var brand = undefined;
            var amount = name[1];
        }

        var barcode = $('span[itemprop="gtin13"]');
        var img = $('#og_image').attr('src');


        console.log(product + ", " + brand + ", " + amount + ", " + barcode.text() + ", " + img);

      } else {
        console.log("We’ve encountered an error: " + error);
      }
    });  
    
}