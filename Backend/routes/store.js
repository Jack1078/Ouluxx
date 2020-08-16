var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const InventoryItemModel = require('../Models/Item_Model'); 
const StoreModel = require('../Models/Store_Model'); 

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
	"Categories" : ["<categories>"], 
	"description" : "<description>", 
	"Image" : <Base64 Image>
}

Add a store. Must be logged in from a store account. 

*/

router.post('/add', async function (req, res, next) {
	console.log(req.body);
	if (req.user && req.user.UserType === "STORE") {
		var newStore = new StoreModel({
			Name : req.body.storename, 
			OwnerUserID : req.user._id.toString(), 
			Address : req.body.storeaddress, 
			City : req.body.storecity, 
			State : req.body.storestate, 
			Zipcode : req.body.storezipcode, 
			Email : req.body.email, 
			Categories : req.body.categories, 
			Description : req.body.description, 
			IdentifierName : req.body.TrueIdentifier, 
			img: req.body.Image
		});
		await UserModel.findOneAndUpdate(
			{ _id: req.user._id },
			{ "StoreID": newStore._id.toString() }
		);
		await newStore.save();
		res.status(200).json({message:"Success"});
	}
	else
	{
		res.status(200).json({message: "Not logged in as a store account. "});
	}
});

/*
Send image as base64 to server updates stores image

{
	"Image" : <base64 image>
}

*/

router.post('/Image', async function(req, res, next){
	if (req.user && req.user.UserType === "STORE") {
		await StoreModel.findOneAndUpdate(
			{_id:mongoose.Types.ObjectId(req.user.StoreID)}, 
			{ img: req.body.Image}
		);
		res.status(200).json({message:"Sucess"});
	}
	else
	{
		res.status(401).json({message: "not allowed"});
	}
});

/*

A delete payload is as such: 

{
	"storeid" : "<storeid>" // this is stored on the store's page as the store id
}

// not needed if logged in as a store user. 

Remove a store. 

*/

router.post('/delete', async function(req, res, next) {
	if (req.user && req.user.UserType === "STORE") {
		await StoreModel.findOneAndRemove({_id: mongoose.Types.ObjectId(req.user.StoreID)});
		await InventoryItemModel.deleteMany({StoreID:req.user.StoreID});
		res.status(200).json({message:"Success"});
	}
	else if (req.user && req.user.UserType === "ADMIN")
	{
		await StoreModel.findOneAndRemove({_id: mongoose.Types.ObjectId(req.body.storeid)});
		await InventoryItemModel.deleteMany({StoreID:req.body.storeid});
		var obj = new Object();
		obj.status = "Success";
		res.json(JSON.stringify(obj));
	}
	else
	{
		res.status(401).json({message: "not allowed"});
	}
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
	await StoreModel.find({},
		function (err, StoreModel) {
			res.json(JSON.stringify(StoreModel))
		});
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
A search for store function. matches with the provided string as a start point. 

JSON: 
{
	"searchstring" : "<Partial string>"
}

*/

router.post('/search', async function(req, res, next) {
	console.log(req.body);
	StoreModel.find({ Name: { $regex: "^"+req.body.searchstring, $options: "i" } }, function(err, stores) {
		res.status(200).send(stores);
	});
});


/*

An add comment JSON is structured as this: 

{ 
	"storeid" : "<The ID of the store>", // This should be stored on the page. 
	"comment" : "<comment string>"
}

Add a comment to an item. 

*/

router.post('/add_comment', async function(req, res, next) {
	console.log(req.body);
	if (req.user && req.user.UserType === "USER") {
		var commentitem = { 
			Body: req.body.comment, 
			userID: req.user._id.toString(),
			Username: req.user.username
		};
		await StoreModel.findOneAndUpdate( 
			{_id:mongoose.Types.ObjectId(req.body.storeid)}, 
			{ $push: { Comments: commentitem } }
		); 
		res.status(200).json({message:"Sucess"});
	}
	else if(req.user && req.user.UserType === "STORE")
	{
		res.status(200).json({message: "Done by a store, use a user account to make comments. "});
	}
	else
	{
		res.status(401).json({message:"Not allowed"})
	}
	
});

module.exports = router;