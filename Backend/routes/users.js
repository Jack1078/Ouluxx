/******************************************************************************
 * Name: Kyle Enchill														  *
 * Date: 7/16/2020															  *
 * Version: 1.2.0															  *
 * Description: This file contains the functions for the users on our platform*
 * There are functions for the user and the user's cart. So far there is the  *
 * basic create, retrieve, update, and delete for both items in the cart and  *
 * users.																	  *
 ******************************************************************************/
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

const UserModel = require('../Models/User_Model');
const ItemModel = require('../Models/Item_Model');

const url = 'mongodb://127.0.0.1:27017/Ouluxx'

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
router.post('/register', async function (req, res) { // add and register a user, hashes password
	//console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
	var UserTypeSet = "USER";
	if (req.body.isstore) {
		UserTypeSet = "STORE"
	}
	user = new UserModel({
		Email: req.body.Email,
		username: req.body.username,
		FirstName: req.body.FirstName,
		LastName: req.body.LastName,
		Address: req.body.Address,
		City: req.body.City,
		State: req.body.State,
		Zipcode: req.body.Zipcode,
		UserType: UserTypeSet
	});
	await UserModel.register(user, req.body.password, async function (err) {
		//console.log("HI");
		if (err) {
			console.log("Error: ", err);
			res.json({ success: false, message: "Your account could not be saved. Error: ", err })
		}
		else {
			//console.log("No error");
			res.json({ success: true, message: "Authentication successful", token: token });
		}
	});
	// mongoose.connection.close(); //Why do i get an error when I close the connection after a user is added?
});

router.post('/login', passport.authenticate('local', { failureFlash: true }), function (req, res) {
	res.json({ success: true, message: "LOGIN SUCCESS" });
});

router.post('/logout', function (req, res) {
	req.logout();
});

//creates a new user in the database
/*router.post('/add', async function (req, res, next) { // add a user to the db
	//this processes the POST request. 
	//this needs to be converted to sanitize the inputs.
	//this also needs to parse the inputs
	//this needs to implement prepared statements for the query
	console.log(req.body);

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

});
*/
//retrieve user
router.post('/get_user', async function (req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

	await UserModel.findOne({ _id: mongoose.Types.ObjectId(req.body.userid) },
		function (err, UserModel) {
			res.json(JSON.stringify(UserModel))
		});

	mongoose.connection.close();
});

//updates user information
router.post('/update', async function (req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
	for (const [key, value] of Object.entries(req.body)) {
		if (key.toString().toUpperCase().includes("ID")) {
			console.log(key); // cannot be changed
		} else if (key.toString().toUpperCase() === "EMAIL") { //usually has a process to change emails
			await UserModel.findOneAndUpdate(
				{ _id: mongoose.Types.ObjectId(req.body.userid) },
				{ "Email": value.toString() }
			);
		} else if (key.toString().toUpperCase() === "USERNAME") { //need to verify if the username is already taken
			await UserModel.findOneAndUpdate(
				{ _id: mongoose.Types.ObjectId(req.body.userid) },
				{ "username": value.toString() }
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
		} else {
			//ignore
		}
	}

	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));

	mongoose.connection.close();
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
/*
{
	"userid":"<The ID of the User>",
	"ItemID":"<The ID of the Item being added to cart>",
	"ItemName": "<Name of item>",
	"Price": <Float>, //price of item
	"Description": "<Description of the Item>",
	"Quantity":"<Integer>" //The quantity of the item being added
}
*/
//adds an item to the user's cart
router.post('/add_to_cart', async function (req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

	var itemprice = parseFloat(req.body.Price);

	var CartItem = {
		UserID: req.body.userid,
		ItemID: req.body.ItemID,
		ItemName: req.body.ItemName,
		Description: req.body.Description,
		Quantity: req.body.Quantity,
		Price: itemprice,
		Subtotal: (req.body.Price * req.body.Quantity)
	};

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
router.post('/get_cart', async function (req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

	await UserModel.find({ _id: mongoose.Types.ObjectId(req.body.userid) }, { Cart: 1 },
		function (err, UserModel) {
			res.json(JSON.stringify(UserModel))
		});

	// var obj = new Object();
	// obj.status = "Success";
	// res.json(JSON.stringify(obj));

	mongoose.connection.close();

});

//updates the quantity of an object in the user's cart
router.post('/update_cart', async function (req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

	await UserModel.findOneAndUpdate(
		// { _id: mongoose.Types.ObjectId(req.body.userid) },
		{
			_id: mongoose.Types.ObjectId(req.body.userid),
			'Cart.ItemID': req.body.ItemID
		},
		{
			$set: {
				'Cart.$.Quantity': req.body.Quantity
			}
		}
	);

	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));

	mongoose.connection.close();
});

//removes an item from the user's cart
router.post('/remove_from_cart', async function (req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

	await UserModel.findOneAndUpdate(
		{
			_id: mongoose.Types.ObjectId(req.body.userid)
		},
		{ $pull: { Cart: { ItemID: req.body.ItemID } } }
	);

	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));

	mongoose.connection.close();
});

module.exports = router;
