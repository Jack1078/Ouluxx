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
const flash = require('connect-flash');
const jwt = require("jsonwebtoken");

const UserModel = require('../Models/User_Model');

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
//used for getting a not logged in user. To get a logged in user, use req.user. 
router.post('/get_user', async function (req, res, next) {
	await UserModel.findOne({ _id: mongoose.Types.ObjectId(req.body.userid) }, function (err, UserModel) {
		res.json(JSON.stringify(UserModel))
	});
});

//updates user information in the database
/* JSON Request looks like this:
	All fields except userid are optional
{
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
	if (req.user && req.user.usertype === "USER") {
		// logged in
		for (const [key, value] of Object.entries(req.body)) {
			if (key.toString().toUpperCase().includes("ID")) {
				console.log(key); // cannot be changed
				//not currently changing emails
			/*} else if (key.toString().toUpperCase() === "EMAIL") { //usually has a process to change emails
				await UserModel.findOneAndUpdate(
					{ _id: req.user._id) },
					{ "Email": value.toString() }
				);*/
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
		res.json(JSON.stringify(obj));
	}
	else
	{
		res.status(401).json({message: "Authentication required"});
	}
	
});

//delete user from database
/* 
must be logged in. 
*/

router.post('/delete', async function (req, res, next) {
	if (req.user) {
		await UserModel.findOneAndRemove({ _id: req.user._id });
		var obj = new Object();
		obj.status = "Success";
		res.json(JSON.stringify(obj));
	}
	else
	{
		res.status(401).json({message: "Authentication required"});
	}
});

/************************** CART FUNCTIONS *************************************/
/*
JSON is structured like this:
{
	"ItemID":"<Item ID to add>",
	"ItemName": "<Name of Item to add>",
	"Description": "<Description of item to add>",
	"Quantity": Integer, //Number of items to add to cart
	"Price": Float		//Price of item to add to cart
}
*/
//adds an item to the user's cart
router.post('/add_to_cart', async function (req, res, next) {
	if (req.user && req.user.usertype === "USER") 
	{
		//must be logged in
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
			{ _id: req.user._id },
			{ $push: { Cart: CartItem } }
		);
		var obj = new Object();
		obj.status = "Success";
		res.json(JSON.stringify(obj));
	}
	else
	{
		res.status(401).json({message: "Authentication required"});
	}
});

//retrieves the items in the user's cart
/* JSON Request looks like this:
{
}
*/
router.post('/get_cart', async function (req, res, next) {
	if (user.req && req.user.usertype === "USER") {
		await UserModel.find({ _id: req.user._id }, { Cart: 1 },function (err, UserModel) {
			res.json(JSON.stringify(UserModel))
		});
	}
	else
	{
		res.status(401).json({message: "Authentication required"});
	}
});

//updates the quantity of an object in the user's cart

/*
JSON looks like: 
{
	ItemID: "<ItemID>",
	Quantity: "<Value>"
}
*/

router.post('/update_cart', async function (req, res, next) {
	if (req.user && req.user.usertype === "USER") {
		await UserModel.findOneAndUpdate(
			{
				_id: req.user._id,
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
	}
	else
	{
		res.status(401).json({message: "Authentication required"});
	}
});

//removes an item from the user's cart
/* JSON Request looks like this:
{
	"userid": "<The Users ID>"
	"ItemID": "<The Item's ID to be removed>"
}
*/
router.post('/remove_from_cart', async function (req, res, next) {
	if (user.req && req.user.usertype === "USER") {
		await UserModel.findOneAndUpdate(
			{
				_id: req.user._id
			},
			{ $pull: { Cart: { ItemID: req.body.ItemID } } }
		);

		var obj = new Object();
		obj.status = "Success";
		res.json(JSON.stringify(obj));
	}
	else
	{
		res.status(401).json({message: "Authentication required"});
	}
});

module.exports = router;
