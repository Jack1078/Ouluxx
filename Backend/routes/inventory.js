var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 
var flash = require('connect-flash');
const jwt = require("jsonwebtoken");


var InventoryItemModel = require('../Models/Item_Model'); 
var StoreModel = require('../Models/Store_Model'); 


const url = 'mongodb://127.0.0.1:27017/Ouluxx'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(req.body);
  console.log("Hello");
});

/*

An item JSON is structured as this: 

{
	"itemname" : "<Item's Name>", 
	"itemprice" : "<Item's Price>", 
	"itemstore" : "<The name of the store the item belongs to>", 
	"storeid" : "The ID of the store the item belongs to", // This should be stored on the cookie of the logged in store. 
	"categories" : ["<catagory 1>", "<category 2>", ...], 
	"inventory" : <Integer> // this is an optional parameter
}

Add a single item to the DB. 

*/

router.post('/add', async function(req, res, next) {// add an item to the db, and add it to the store. 
	console.log(req.body);
	var itemprice = parseFloat(req.body.itemprice);
	var newitem = new InventoryItemModel({
				Name : req.body.itemname, 
				Price : itemprice, 
				StoreName : req.body.itemstore, 
				StoreID : req.body.storeid, 
				Category : req.body.categories
			});
	var number_In_Inventory = -1;
	if (req.body.inventory != null) {
		number_In_Inventory = req.body.inventory;
	}
	var StoreItem = { // create inventory item to add to inventory array
		ItemID: newitem._id, 
		ItemName: req.body.itemname, 
		NumberInInventory: number_In_Inventory
	};
	await StoreModel.findOneAndUpdate( // update the model by adding the new item to inventory
		{_id:mongoose.Types.ObjectId(req.body.storeid)}, 
		{ $push: { Inventory: StoreItem } }
	); 
	await newitem.save();
	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));
});

/*

An add comment JSON is structured as this: 

{ 
	"itemid" : "<The ID of the item>", // This should be stored on the page. 
	"comment" : "<comment string>", 
	"userid" : "The users id, from logged in cookie"
	"username" : "The users username, from logged in cookie"
}

Add a comment to an item. 

*/

router.post('/add_comment',async function(req, res, next) {// add an item to the db, and add it to the store. 
	console.log(req.body);
	var commentitem = { // create inventory item to add to inventory array
		Body: req.body.comment, 
		userID: req.body.userid,
		Username: req.body.username
	};
	await InventoryItemModel.findOneAndUpdate( // update the model by adding the new item to inventory
		{_id:mongoose.Types.ObjectId(req.body.itemid)}, 
		{ $push: { Comments: commentitem } }
	); 
	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));
});

/*

A list of many items to be added looks like this

{
	"storeid" : "The ID of the store the item belongs to", // This should be stored on the cookie of the logged in store. 
	"Item_1" : 
	{
		"itemname" : "<Item's Name>", 
		"itemprice" : "<Item's Price>", 
		"itemstore" : "<The name of the store the item belongs to>", 
		"categories" : ["<catagory 1>", "<category 2>", ...], 
		"inventory" : <Integer> // this is an optional parameter
	}, 
	"Item_2" : 
	{
		"itemname" : "<Item's Name>", 
		"itemprice" : "<Item's Price>", 
		"itemstore" : "<The name of the store the item belongs to>", 
		"categories" : ["<catagory 1>", "<category 2>", ...], 
		"inventory" : <Integer> // this is an optional parameter
	}, 
	...
}

Adds many entries to the database. Is designed for information to be parsed on the frontend.  

*/

router.post('/add_many', async function(req, res, next) {// add an item to the db, and add it to the store. 
	console.log(req.body);

	for(const [key, value] of Object.entries(req.body.items))
	{
		var itemprice = parseFloat(value.itemprice);
		var newitem = new InventoryItemModel({
					Name : value.itemname, 
					Price : itemprice, 
					StoreName : value.itemstore, 
					StoreID : value.storeid, 
					Category : value.categories
				});
		var number_In_Inventory = -1;
		if (req.body.inventory != null) {
			number_In_Inventory = value.inventory;
		}
		var StoreItem = { // create inventory item to add to inventory array
			ItemID: newitem._id, 
			ItemName: value.itemname, 
			NumberInInventory: number_In_Inventory
		};
		await StoreModel.findOneAndUpdate( // update the model by adding the new item to inventory
			{_id:mongoose.Types.ObjectId(req.body.storeid)}, 
			{ $push: { Inventory: StoreItem } }
		); 
		await newitem.save();
	}

	
	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));
});

/*

A delete payload is as such: 

{
	"itemid" : "<itemid>" // this is stored on the page as the item id
}

Removes item from database. 

*/

router.post('/delete', async function(req, res, next) {// add an item to the db, and add it to the store. 
	console.log(req.body);
	await InventoryItemModel.findOneAndRemove({_id: mongoose.Types.ObjectId(req.body.itemid)});
	await StoreModel.findOneAndUpdate( // update the model by adding the new item to inventory
		{_id:mongoose.Types.ObjectId(req.body.storeid)}, 
		{ $pull: { Inventory: {ItemID : req.body.itemid} } }
	);
	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));
});

/*

This appears as such, all params except the id are optional: 

{
	"itemID" : "<The Item's ID>", // stored on the page when the item is retrieved from the DB
	"PRICE" : "<Item's Price>", 
	"HIDDEN" : <boolean>, 
	"Add_Category_1" : "<Category>", 
	"Add_Category_2" : "<Category>", 
	"Add_Category_..." : "<Category>", 
	"Remove_Category_1" : "<Category>", 
	"Remove_Category_2" : "<Category>", 
	"Remove_Category_..." : "<Category>"
}

Updates entries in the MongoDB database. 

*/

router.post('/update', async function(req, res, next) {// add an item to the db, and add it to the store. 
	console.log(req.body);
	for (const [key, value] of Object.entries(req.body)) {
		//console.log(key, value);
		if ((key.toString().toUpperCase().includes("ID") && !(key.toString().toUpperCase() === "HIDDEN")) 
			|| key.toString().toUpperCase().includes("Name")) {
			console.log(key); // cannot be changed
		}
		else if (key.toString().toUpperCase() === "PRICE") {
			await InventoryItemModel.findOneAndUpdate( // update the model by adding the new item to inventory
				{_id : mongoose.Types.ObjectId(req.body.itemid) }, 
				{ "Price" : parseFloat(value) }
			);
		}
		else if (key.toString().toUpperCase() === "HIDDEN") {
			await InventoryItemModel.findOneAndUpdate( // update the model by adding the new item to inventory
				{_id : mongoose.Types.ObjectId(req.body.itemid) }, 
				{ "Hidden" : value==="true" }
			);
		}
		else if (key.toString().includes("Add_Category")) 
		{
			await InventoryItemModel.findOneAndUpdate( // update the model by adding the new item to inventory
				{ _id : mongoose.Types.ObjectId(req.body.itemid) }, 
				{ $push: { "Category" : value } }
			); 
		}
		else if (key.toString().includes("Remove_Category")) 
		{
			await InventoryItemModel.findOneAndUpdate( // update the model by adding the new item to inventory
				{ _id : mongoose.Types.ObjectId(req.body.itemid) }, 
				{ $pull: { "Category" : value } }
			); 
		}
		else
		{
			//console.log("other"); //ignore
		}
	}
	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));
});

/*

A get item payload is as such: 

{
	"itemid" : "<itemid>" // this is stored on the item's page as the item id
}

This returns a single item based on the id and all of the information that is held within the item object. 
If there is no item with the given id, it returns null.  

*/

router.post('/get_item', async function(req, res, next) {
	console.log(req.body);
	await InventoryItemModel.findOne({_id: mongoose.Types.ObjectId(req.body.itemid)}, 
		function(err, InventoryItemModel) {
			res.json(JSON.stringify(InventoryItemModel))
		});
});

/*

A get store items is as such: 

{
	"storeid" : "<storeid>" // this is stored on the item's page as the item id
}

This returns a list of items based on the id of the store and all of the information that is held within the item objects. 
If there are no items with the given id, it returns null.  

*/

router.post('/get_store_items', async function(req, res, next) {
	console.log(req.body);
	await InventoryItemModel.find({storeid: req.body.storeid}, 
		function(err, InventoryItemModel) {
			res.json(JSON.stringify(InventoryItemModel))
		});
});

/*

A get all items request has no payload.  

This returns a list of all items and all of the information that is held within the item objects. 
If there are no items, it returns null. 

*/

router.post('/get_all_items', async function(req, res, next) {
	console.log(req.body);
	await InventoryItemModel.find({}, 
		function(err, InventoryItemModel) {
			res.json(JSON.stringify(InventoryItemModel))
		});
});

/*

A get item with property payload is as such: 

{
	"<property>" : "<property>" // could be something like address, etc. 
	"<value>" : "<value>" // could be something like a specific address, etc. 
}

get stores with specific properties

*/

router.post('/get_item_with_property', async function(req, res, next) {
	console.log(req.body);
	var propertyname = req.body.property;
	await InventoryItemModel.find({propertyname : req.body.value},
		function(err, InventoryItemModel) {
			res.json(JSON.stringify(InventoryItemModel))
		});
});

/*router.post('/testadd', async function(req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	var newitem = new InventoryItemModel({
				name : req.body.itemname, 
				price : req.body.itemprice, 
				storename : req.body.itemstore, 
				storeid : req.body.itemstoreid
			});
	await newitem.save();
	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));	
	mongoose.connection.close();
});*/

module.exports = router;
