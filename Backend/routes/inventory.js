var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Item_Schema = require('../Schema/Item_Schema'); 
var Store_Schema = require('../Schema/Store_Schema'); 

const url = 'mongodb://127.0.0.1:27017/Ouluxx'

const InventoryItemModel = mongoose.model('InventoryItemAddModel', Item_Schema);
const StoreModel = mongoose.model('InventoryItemAddModel', Store_Schema);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(req.body);
  console.log("Hello");
});

router.post('/add', async function(req, res, next) {// add an item to the db, and add it to the store. 
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	var newitem = new InventoryItemAddModel({
				Name : req.body.itemname, 
				Price : req.body.itemprice, 
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
	StoreModel.Update( // update the model by adding the new item to inventory
		{_id:req.body.storeid}, 
		{ $push: { inventory: StoreItem } }, 
		done
	); 
	await newitem.save();
	/*var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));*/
	mongoose.connection.close();
});




router.post('/testadd', async function(req, res, next) {
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
});


module.exports = router;
