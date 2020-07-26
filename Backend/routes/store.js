var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var InventoryItemModel = require('../Models/Item_Model'); 
var StoreModel = require('../Models/Store_Model'); 

/* GET home page. */
router.get('/', function(req, res, next) {
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
}

Add a store. 

*/

router.post('/add', async function(req, res, next) {
	console.log(req.body);
	var newStore = new StoreModel({
				Name : req.body.storename, 
				Address : req.body.storeaddress, 
				City : req.body.storecity, 
				State : req.body.storestate, 
				Zipcode : req.body.storezipcode, 
				Email : req.body.email, 
				Description : req.body.description
			});
	await newStore.save();
	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));
});

/*

A delete payload is as such: 

{
	"storeid" : "<storeid>" // this is stored on the store's page as the store id
}

Remove a store. 

*/

router.post('/delete', async function(req, res, next) {
	console.log(req.body);
	await StoreModel.findOneAndRemove({_id: mongoose.Types.ObjectId(req.body.storeid)});
	await InventoryItemModel.deleteMany({StoreID:req.body.storeid});
	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));
});

/*

A get store payload is as such: 

{
	"storeid" : "<storeid>" // this is stored on the store's page as the store id
}

This returns a single store based on the id and all of the information that is held within the store object. 
If there is no store with the given id, it returns null.  

*/

router.post('/get_store', async function(req, res, next) {
	console.log(req.body);
	await StoreModel.findOne({_id: mongoose.Types.ObjectId(req.body.storeid)}, 
		function(err, StoreModel) {
			res.json(JSON.stringify(StoreModel))
		});
});

/*

There is no payload for this route. 

This returns a list of all stores. 
If there are no stores, it returns null. 

*/

router.post('/get_all_stores', async function(req, res, next) {
	console.log(req.body);
	await StoreModel.find({},
		function(err, StoreModel) {
			res.json(JSON.stringify(StoreModel))
		});
});

/*

A get store with property payload is as such: 

{
	"<property>" : "<property>" // could be something like address, etc. 
	"<value>" : "<value>" // could be something like a specific address, etc. 
}

get stores with specific properties

*/

router.post('/get_store_with_property', async function(req, res, next) {
	console.log(req.body);
	var propertyname = req.body.property;
	await StoreModel.find({propertyname : req.body.value},
		function(err, StoreModel) {
			res.json(JSON.stringify(StoreModel))
		});
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

router.post('/add_comment', async function(req, res, next) {// add an item to the db, and add it to the store. 
	console.log(req.body);
	var commentitem = { // create inventory item to add to inventory array
		Body: req.body.comment, 
		userID: req.body.userid,
		Username: req.body.username
	};
	await StoreModel.findOneAndUpdate( // update the model by adding the new item to inventory
		{_id:mongoose.Types.ObjectId(req.body.storeid)}, 
		{ $push: { Comments: commentitem } }
	); 
	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));
});

module.exports = router;