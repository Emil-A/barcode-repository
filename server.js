var express = require('express');
var app = express();
var mongojs = require("mongojs");
var db = mongojs('barcode_scanner', ['products', 'grocerylist', 'storage'])
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/storage', function (req, res) {
	console.log("Got yo storage request ;)");

	//Aggregate to show count, rather than duplicates
	db.storage.aggregate(
		[
			{$group: { _id: { barcode: '$product._id', name: "$product.name", brand: "$product.brand", img_url: "$product.img_url"}, amount: {$sum : 1}}}
		]).toArray(function(err, docs) {
			console.log(docs);
			res.json(docs);
		});
});

app.get('/grocerylist', function (req, res) {
	console.log("Got yo grocery request ;)");

	db.grocerylist.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/grocerylist', function (req, res) {
	console.log(req.body);
	db.grocerylist.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

app.delete('/grocerylist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.grocerylist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.listen(3000);
console.log("Server running on port 3000");