/******************************************************************************
 * Name: Kyle Enchill														  *
 * Date: 7/9/2020															  *
 * Version: 1.1.0															  *
 * Description: This file contains the functions for the users on our platform*
 * There are functions for the user and the user's cart. So far there is the  *
 * basic create, retrieve, update, and delete for both items in the cart and  *
 * users.																	  *
 ******************************************************************************/
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var user_schema = require('../Schema/user_schema');
var Item_Schema = require('../Schema/Item_Schema');

const url = 'mongodb://127.0.0.1:27017/Ouluxx'

const UserModel = mongoose.model('UserAddModel', user_schema);
const ItemModel = mongoose.model('ItemModel', Item_Schema);

router.get('/', function (req, res, next) {
	//this processes the GET request. 
	//this needs to be converted to sanitize the inputs.
	//this also needs to parse the inputs
	//this needs to implement prepared statements for the query

	res.render('index', { title: 'Express' });
	console.log(req.body);
	console.log("Hello");
});

/************************** USER FUNCTIONS *************************************/
//creates a new user in the database
router.post('/add', async function (req, res, next) { // add a user to the db
	//this processes the POST request. 
	//this needs to be converted to sanitize the inputs.
	//this also needs to parse the inputs
	//this needs to implement prepared statements for the query
	console.log(req.body);

	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	var newuser = new UserModel({
		Username: req.body.Username,
		FirstName: req.body.FirstName,
		LastName: req.body.LastName,
		Email: req.body.Email,
		Address: req.body.Address,
		City: req.body.City,
		State: req.body.State,
		Zipcode: req.body.Zipcode,
		UserID: newuser._id

	});

	await newuser.save();

	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));

	mongoose.connection.close();
});

//retrieve user
router.post('/get_user', async function (req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
	await UserModel.findOne({ _id: mongoose.Types.ObjectId(req.body.userid) },
		function (err, InventoryItemModel) {
			res.json(JSON.stringify(UserModel))
		});
	mongoose.connection.close();
});

//updates user information
router.post('/update', async function (req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

	for (const [key, value] of Object.entries(req.body)) {
		if (key.toString().toUpperCase().includes("ID") || key.toString().toUpperCase().includes("Name")) {
			console.log(key); // cannot be changed
		} else if (key.toString().toUpperCase() === "USERNAME") { //need to verify if the username is already taken
			await UserModel.findOneAndUpdate(
				{ _id: mongoose.Types.ObjectId(req.body.userid) },
				{ "Username": value.toString() }
			);
		} else if (key.toString().toUpperCase() === "FIRSTNAME") {
			await UserModel.findOneAndUpdate(
				{ _id: mongoose.Types.ObjectId(req.body.userid) },
				{ "FirstName": value.toString() }
			);
		} else if (key.toString().toUpperCase() === "LASTNAME") {
			await UserModel.findOneAndUpdate(
				{ _id: mongoose.Types.ObjectId(req.body.userid) },
				{ "LastName": value.toString() }
			);
		} else if (key.toString().toUpperCase() === "ADDRESS") {
			await UserModel.findOneAndUpdate(
				{ _id: mongoose.Types.ObjectId(req.body.userid) },
				{ "Address": value.toString() }
			);
		} else if (key.toString().toUpperCase() === "CITY") {
			await UserModel.findOneAndUpdate(
				{ _id: mongoose.Types.ObjectId(req.body.userid) },
				{ "City": value.toString() }
			);
		} else if (key.toString().toUpperCase() === "STATE") {
			await UserModel.findOneAndUpdate(
				{ _id: mongoose.Types.ObjectId(req.body.userid) },
				{ "State": value.toString() }
			);
		} else if (key.toString().toUpperCase() === "ZIPCODE") {
			await UserModel.findOneAndUpdate(
				{ _id: mongoose.Types.ObjectId(req.body.userid) },
				{ "Zipcode": value.toString() }
			);
		}
	}
});

//delete user from database
router.post('/delete', async function (req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

	await UserModel.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.body.userid) });

	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));

	mongoose.connection.close();
});

/************************** CART FUNCTIONS *************************************/

//adds an item to the user's cart
router.post('/add_to_cart', async function (req, res, next) {
	console.log(req, body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

	var itemprice = parseFloat(req.body.itemprice);

	var newItem = new ItemModel({
		Name: req.body.itemname,
		Price: itemprice,
		StoreName: req.body.itemstore,
		StoreID: req.body.storeid,
		Category: req.body.categories,
		Quantity: req.body.quantity
	});

	var CartItem = {
		ItemID: newItem._id,
		UserID: req.body.userid,
		ItemName: req.body.itemname,
		NumberInCart: req.body.number_in_cart
	}

	await UserModel.findOneAndUpdate(
		{ _id: mongoose.Types.ObjectId(req.body.userid) },
		{ $push: { Cart: CartItem } }
	);

	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));

	mongoose.connection.close();

});

//retrieves the items in the user's cart
router.post('get_cart', async function (req, res, next) {
	console.log(req, body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

	await UserModel.find({ UserID: req.body.userid, Cart: {} },
		function (err, UserModel) {
			res.json(JSON.stringify(UserModel))
		});


	mongoose.connection.close();
});

//updates the quantity of an object in the user's cart
router.post('update_cart', async function (req, res, next) {
	console.log(req, body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

	await UserModel.findOneAndUpdate(
		{
			_id: mongoose.Types.ObjectId(req.body.userid),
			Cart: { _id: mongoose.Types.ObjectId(req.body.ItemID) }
		},
		{ "Quantity": value.toString() }
	);

	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));
	mongoose.connection.close();

});

//removes an item from the user's cart
router.post('remove_from_cart', async function (req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

	await UserModel.findOneAndUpdate(
		{
			_id: mongoose.Types.ObjectId(req.body.userid),
			Cart: { _id: mongoose.Types.ObjectId(req.body.ItemID) }
		},
		{ $pull: { Cart: { ItemID: req.body.itemid } } }
	);

	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));
	mongoose.connection.close();
});


/* router.post('/testadd', function (req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	var newuser = new UserModel({
		Username: req.body.Username,
		FirstName: req.body.FirstName,
		LastName: req.body.LastName,
		Email: req.body.Email,
		Address: req.body.Address,
		City: req.body.City,
		State: req.body.State,
		Zipcode: req.body.Zipcode

	});

await newuser.save();

var obj = new Object();
obj.hello = "World";
res.json(JSON.stringify(obj));

mongoose.connection.close();
}); */

module.exports = router;
