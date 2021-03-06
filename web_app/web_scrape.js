var request = require("request");
var cheerio = require("cheerio");
var mongodb = require('mongodb');

var url = "http://ca.openfoodfacts.org/";
var completedPages = 0;
var completedProds = 0;
var newProducts = [];


//Loop through all 27 pages
for(var i = 1; i <= 27; i++) {
    url = "http://ca.openfoodfacts.org/" + i;
    getProductPages(url);
} 


//Get all product links from page  
function getProductPages(url) {
    request(url, function (error, response, html) {
      if (!error) {
        var $ = cheerio.load(html);

        $('.products li a').each(function() {
            var link = $(this);
            var text = link.text();
            var href = link.attr("href");

            completedPages++;
            console.log("Fetching page: " + completedPages + ", " + href);
            getProductInfo(href);

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
            var quantity = name[2].trim();
        }else if (name.length == 2) {
            var product =  name[0];
            var brand = undefined;
            var quantity = name[1].trim();
        }else {
            var product =  name[0];
            var brand = undefined;
            var quantity = undefined;
        }

        //Strip first 0 for UPC
        var barcode = $('span[itemprop="gtin13"]').text().substring(1);
        var img_url = $('#og_image').attr('src');
        
        //console.log(product + ", " + brand + ", " + quantity + ", " + barcode + ", " + img_url);

        if(barcode && product) {
            newProducts.push({_id: barcode, name: product, brand: brand, quantity: quantity, img_url: img_url});
        }

        completedProds++;
        console.log("Fetching product info: " + completedProds + ", " + href);
        if (completedProds == 540) {
            console.log("Insert!");
            insertDB(newProducts);  
            completedProds = 541;          
        }

      } else {
        console.log("We’ve encountered an error: " + error);
      }
    });  
    
}

//Connect to db and insert all accumulated data
function insertDB(insertData) {
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/barcode_scanner';

    MongoClient.connect(url, function(err, db) {
        if (!err) {
            console.log("Connected correctly to server");
            console.log("Current database", db.databaseName);
            db.createCollection("products");
            db.collection("products", function(err, collection) {
                if (!err) {
                    console.log("We good");
                    collection.insert(insertData, function (err, result) {
                        if (err) {
                            console.log(err);
                        }else {
                            console.log('Inserted %d documents into the "products" collection. The documents inserted with "_id" are:', result.length, result);
                        }
                    });
                }
            });
        }
       //db.close();
    });
}
