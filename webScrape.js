var request = require("request");
var cheerio = require("cheerio");
var url = "http://ca.openfoodfacts.org/";
var links = [];

/*for(var i = 1; i <= 27; i++) {
    url = "http://ca.openfoodfacts.org/" + i;
    links += getProductPagess(url);
} */

getProductInfo("/product/3250390729082/creme-brulee-aux-oeufs-netto");

  
function getProductPagess(url) {
    request(url, function (error, response, html) {
      if (!error) {
        var $ = cheerio.load(html);

        var links = [];
        $('.products li a').each(function() {
            var link = $(this);
            var text = link.text();
            var href = link.attr("href");

            getProductInfo(href);
        });

      } else {
        console.log("We’ve encountered an error: " + error);
      }
    });
}

function getProductInfo(href) {
    url = "http://ca.openfoodfacts.org" + href;
    console.log(url);
    
    request(url, function (error, response, html) {
      if (!error) {
        var $ = cheerio.load(html);

        var name = $('h1[itemprop="name"]')
        console.log(url);
        console.log(name.text());

      } else {
        console.log("We’ve encountered an error: " + error);
      }
    });  
    
}