var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Item_Schema = require('../Schema/Item_Schema'); 
var Store_Schema = require('../Schema/Store_Schema'); 

const url = 'mongodb://127.0.0.1:27017/Ouluxx'

const InventoryItemModel = mongoose.model('InventoryItemModel', Item_Schema);
const StoreModel = mongoose.model('StoreModel', Store_Schema);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(req.body);
  console.log("Hello");
});

router.post('/add', async function(req, res, next) {// add an item to the db, and add it to the store. 
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
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
	mongoose.connection.close();
});

router.post('/delete', async function(req, res, next) {// add an item to the db, and add it to the store. 
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
	await InventoryItemModel.findOneAndRemove({_id: mongoose.Types.ObjectId(req.body.itemid)});
	await StoreModel.findOneAndUpdate( // update the model by adding the new item to inventory
		{_id:mongoose.Types.ObjectId(req.body.storeid)}, 
		{ $pull: { Inventory: {ItemID : req.body.itemid} } }
	);
	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));
	mongoose.connection.close();
});

router.post('/update', async function(req, res, next) {// add an item to the db, and add it to the store. 
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
	for (const [key, value] of Object.entries(req.body)) {
		//console.log(key, value);
		if ((key.toString().toUpperCase().includes("ID") && !(key.toString().toUpperCase() === "HIDDEN")) 
			|| key.toString().toUpperCase().includes("Name")) {
			console.log(key); // cannot be changed
		}
		else if (key.toString().toUpperCase() === "PRICE") {
			await InventoryItemModel.findOneAndUpdate( // update the model by adding the new item to inventory
				{_id : mongoose.Types.ObjectId(req.body.itemid) }, 
				{ "Price" : parseFloat(value.toString()) }
			);
		}
		else if (key.toString().toUpperCase() === "HIDDEN") {
			console.log(key);
			console.log(value);
			await InventoryItemModel.findOneAndUpdate( // update the model by adding the new item to inventory
				{_id : mongoose.Types.ObjectId(req.body.itemid) }, 
				{ "Hidden" : value.toString()==="true" }
			);
		}
		else if (key.toString().includes("Add_Category")) 
		{
			await InventoryItemModel.findOneAndUpdate( // update the model by adding the new item to inventory
				{ _id : mongoose.Types.ObjectId(req.body.itemid) }, 
				{ $push: { "Category" : value.toString() } }
			); 
		}
		else if (key.toString().includes("Remove_Category")) 
		{
			await InventoryItemModel.findOneAndUpdate( // update the model by adding the new item to inventory
				{ _id : mongoose.Types.ObjectId(req.body.itemid) }, 
				{ $pull: { "Category" : value.toString() } }
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
	mongoose.connection.close();
});


/*router.post('/testadd', async function(req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	var newitem = new InventoryItemAddModel({
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
