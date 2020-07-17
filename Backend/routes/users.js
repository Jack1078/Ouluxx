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

/*
JSON request looks like this. 
{
"Email": "<email>",
"username": "<Username>",
"password":"<Password>",
"FirstName": "<FirstName>",
"LastName": "<LastName>",
"Address": "<address>",
"City": "<City>",
"State": "<State>",
"Zipcode": "<Zip code>", 
"isstore" : <boolean>
}
*/

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
			// login to the new account
/*			const secretkey = "7BA9089A4146368B9257498CE6DE27C2ABB095B8AA77C4018322F1AB43AB9103";
			const token = jwt.sign({userId : user._id, username:user.username}, secretkey, {expiresIn: '72h'});
			res.cookie("username", req.body.username, { expire: new Date() + 259200000 });
			res.cookie("Token", token, { expire: new Date() + 259200000 });
*/			res.json({ success: true, message: "Authentication successful", User: req.user/*, token: token */ });
		}
	});
});

router.post('/login', passport.authenticate('local', { failureFlash: true }), function (req, res) {
	res.json({ success: true, message: "LOGIN SUCCESS", User: req.user });
});

router.post('/logout', function (req, res) {
	req.logout();
	res.json({ success: true, message: "LOGOUT SUCCESS" });
});


//retrieve user information
/* JSON Request looks like this:
{
	"userid": "<The Users ID>"
}
*/

router.post('/get_user', async function (req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

	await UserModel.findOne({ _id: mongoose.Types.ObjectId(req.body.userid) },
		function (err, UserModel) {
			res.json(JSON.stringify(UserModel))
		});

	mongoose.connection.close();

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
