/******************************************************************************
 * Name: Kyle Enchill														  *
 * Date: 7/16/2020															  *
 * Version: 1.2.1															  *
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
const jwt = require("jsonwebtoken");


const UserModel = require('../Models/User_Model');

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

//retrieve user information
/* JSON Request looks like this:
{
	"userid": "<The Users ID>"
}
*/

router.post('/get_user', async function (req, res, next) {
	console.log(JSON.stringify(req.body.userid));
	//mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
	try {
		await UserModel.findOne({ _id: req.user._id },
			function (err, UserModel) {
				if (err) {
					console.log(err);
				} else {
					//console.log(JSON.stringify(UserModel))
					res.json(JSON.stringify(UserModel));
				}
			});
	} catch (e) {
		console.log(e);
	}
	//mongoose.connection.close();

});

//updates user information in the database
/* JSON Request looks like this:
	All fields except userid are optional
{
	"userid": "<User ID>",
	"Email": "<User New Email>",
	"username": "<User's New Username>",
	"FirstName": "<User's New First Name>",
	"LastName": "<User's New Last Name>",
	"Address": "<User's New Address>",
	"City": "<User's New City>",
	"State": "<User's New State>",
	"Zipcode": "<User's New Zipcode>"
}
*/

router.post('/update', async function (req, res, next) {
	console.log(req.body);
	//mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

	for (const [key, value] of Object.entries(req.body)) {
		if (key.toString().toUpperCase().includes("ID")) {
			console.log(key); // cannot be changed
		} else if (key.toString().toUpperCase() === "EMAIL") { //usually has a process to change emails
			await UserModel.findOneAndUpdate(
				{ _id: req.user._id },
				{ "Email": value.toString() }
			);
		} else if (key.toString().toUpperCase() === "USERNAME") { //need to verify if the username is already taken
			await UserModel.findOneAndUpdate(
				{ _id: req.user._id },
				{ "username": value.toString() }
			);
		} else if (key.toString().toUpperCase() === "FIRSTNAME") {
			await UserModel.findOneAndUpdate(
				{ _id: req.user._id },
				{ "FirstName": value.toString() }
			);
		} else if (key.toString().toUpperCase() === "LASTNAME") {
			await UserModel.findOneAndUpdate(
				{ _id: req.user._id },
				{ "LastName": value.toString() }
			);
		} else if (key.toString().toUpperCase() === "ADDRESS") {
			await UserModel.findOneAndUpdate(
				{ _id: req.user._id },
				{ "Address": value.toString() }
			);
		} else if (key.toString().toUpperCase() === "CITY") {
			await UserModel.findOneAndUpdate(
				{ _id: req.user._id },
				{ "City": value.toString() }
			);
		} else if (key.toString().toUpperCase() === "STATE") {
			await UserModel.findOneAndUpdate(
				{ _id: req.user._id },
				{ "State": value.toString() }
			);
		} else if (key.toString().toUpperCase() === "ZIPCODE") {
			await UserModel.findOneAndUpdate(
				{ _id: req.user._id },
				{ "Zipcode": value.toString() }
			);
		} else {
			//ignore
		}
	}

	var obj = new Object();
	obj.status = "Success";
	//res.json(JSON.stringify(obj));
	res.redirect("/accountpage");
	//mongoose.connection.close();

});

//delete user from database
/* JSON Request looks like this:
{
	"userid": "<The Users ID>"
}
*/

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
JSON is structured like this:
{
	"userid":"<User's ID>",
	"ItemID":"<Item ID to add>",
	"ItemName": "<Name of Item to add>",
	"Description": "<Description of item to add>",
	"Quantity": Integer, //Number of items to add to cart
	"Price": Float		//Price of item to add to cart
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
/* JSON Request looks like this:
{
	"userid": "<The Users ID>"
}
*/
router.post('/get_cart', async function (req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

	await UserModel.find({ _id: mongoose.Types.ObjectId(req.body.userid) }, { Cart: 1 },
		function (err, UserModel) {
			res.json(JSON.stringify(UserModel))
		});

	mongoose.connection.close();

});

//updates the quantity of an object in the user's cart
router.post('/update_cart', async function (req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

	await UserModel.findOneAndUpdate(
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
/* JSON Request looks like this:
{
	"userid": "<The Users ID>"
	"ItemID": "<The Item's ID to be removed>"
}
*/
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
