var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var InventoryItemModel = require('../Models/Item_Model');
var StoreModel = require('../Models/Store_Model');

const url = 'mongodb://127.0.0.1:27017/Ouluxx'

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
	console.log(req.body);
	console.log("Hello");
});

/*

The JSON looks like: 

{
	"storename" : "<name>",
	"storeaddress" : "<address>",
	"storecity" : "<city>",
	"storestate" : "<state>",
	"storezipcode" : "<zipcode>",
	"email" : "<email>",
	"description" : "<description>"
	"categories" : ["<categories>"]
}

Add a store. 

*/

router.post('/add', async function (req, res, next) {
	console.log(req.body);
	// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
	var newStore = new StoreModel({
		Name: req.body.storename,
		Address: req.body.storeaddress,
		City: req.body.storecity,
		State: req.body.storestate,
		Zipcode: req.body.storezipcode,
		Email: req.body.email,
		Description: req.body.description,
		Categories: req.body.categories
	});
	await newStore.save();
	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));
	// mongoose.connection.close();
});

/*

A delete payload is as such: 

{
	"storeid" : "<storeid>" // this is stored on the store's page as the store id
}

Remove a store. 

*/

router.post('/delete', async function (req, res, next) {
	console.log(req.body);
	// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
	await StoreModel.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.body.storeid) });
	await InventoryItemModel.deleteMany({ StoreID: req.body.storeid });
	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));
	// mongoose.connection.close();
});

/*

A get store payload is as such: 

{
	"storeid" : "<storeid>" // this is stored on the store's page as the store id
}

This returns a single store based on the id and all of the information that is held within the store object. 
If there is no store with the given id, it returns null.  

*/

router.post('/get_store', async function (req, res, next) {
	console.log(req.body);
	// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
	await StoreModel.findOne({ _id: mongoose.Types.ObjectId(req.body.storeid) },
		function (err, StoreModel) {
			res.json(JSON.stringify(StoreModel))
		});
	// mongoose.connection.close();
});

/*

There is no payload for this route. 

This returns a list of all stores. 
If there are no stores, it returns null. 

*/

router.post('/get_all_stores', async function (req, res, next) {
	console.log(req.body);
	// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
	await StoreModel.find({},
		function (err, StoreModel) {
			res.json(JSON.stringify(StoreModel))
		});
	// mongoose.connection.close();
});

/*

A get store with property payload is as such: 

{
	"<property>" : "<property>" // could be something like address, etc. 
	"<value>" : "<value>" // could be something like a specific address, etc. 
}
{
	"<property>" :"<value>" //property - name of the field you are searching for, value - the value of the field you are searching for 
}
get stores with specific properties

*/

router.post('/get_store_with_property', async function (req, res, next) {
	console.log(req.body);
	// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
	// var propertyname = req.body.property;
	// await StoreModel.find({propertyname : req.body.value},
	// 	function(err, StoreModel) {
	// 		res.json(JSON.stringify(StoreModel))
	// 	});
	for (const [key, value] of Object.entries(req.body)) {
		if (key.toString().toUpperCase() === "ZIPCODE") {
			await StoreModel.find(
				{ "Zipcode": value.toString() },
				function (err, StoreModel) {
					res.json(JSON.stringify(StoreModel))
				});
		} else if (key.toString().toUpperCase() === "CITY") {
			await StoreModel.find(
				{ "City": value.toString() },
				function (err, StoreModel) {
					res.json(JSON.stringify(StoreModel))
				});
		} else if (key.toString().toUpperCase() === "STATE") {
			await StoreModel.find(
				{ "State": value.toString() },
				function (err, StoreModel) {
					res.json(JSON.stringify(StoreModel))
				});
		} else {
			// ignore
		}
	}
	// mongoose.connection.close();
});

/*

An add comment JSON is structured as this: 

{ 
	"storeid" : "<The ID of the store>", // This should be stored on the page. 
	"comment" : "<comment string>", 
	"userid" : "The users id, from logged in cookie"
	"username" : "The users username, from logged in cookie"
}

Add a comment to an item. 

*/

router.post('/add_comment', async function (req, res, next) {// add an item to the db, and add it to the store. 
	console.log(req.body);
	// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
	var commentitem = { // create inventory item to add to inventory array
		Body: req.body.comment,
		userID: req.body.userid,
		Username: req.body.username
	};
	await StoreModel.findOneAndUpdate( // update the model by adding the new item to inventory
		{ _id: mongoose.Types.ObjectId(req.body.storeid) },
		{ $push: { Comments: commentitem } }
	);
	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));
	// mongoose.connection.close();
});

module.exports = router;