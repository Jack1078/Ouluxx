/******************************************************************************
 * Name: Kyle Enchill														  *
 * Date: 7/9/2020															  *
 * Version: 1.1.0															  *
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
router.post('/register', async function(req, res) { // add and register a user, hashes password
	//console.log(req.body);
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
		UserType : UserTypeSet
	});
	await UserModel.register(user, req.body.password, async function(err) 
	{
		//console.log("HI");
		if (err)
		{
			console.log("Error: ", err);
			res.json({success:false, message:"Your account could not be saved. Error: ", err}) 
		}
		else
		{
			//console.log("No error");
			// login to the new account
/*			const secretkey = "7BA9089A4146368B9257498CE6DE27C2ABB095B8AA77C4018322F1AB43AB9103";
			const token = jwt.sign({userId : user._id, username:user.username}, secretkey, {expiresIn: '72h'});
			res.cookie("username", req.body.username, { expire: new Date() + 259200000 });
			res.cookie("Token", token, { expire: new Date() + 259200000 });
*/			res.json({success:true, message:"Authentication successful"/*, token: token */});
		} 
	}); 
}); 



router.post('/login_testing', function(req, res) {
	console.log(req.body);
	res.json({success:true});
});

router.post('/login', passport.authenticate('local', { failureFlash: true }), function(req, res) {
	res.json({success:true, message:"LOGIN SUCCESS"});
});

router.post('/logout', function(req, res) {
	req.logout();
	res.json({success:true, message:"LOGOUT SUCCESS"});
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
	await UserModel.findOne({ _id: mongoose.Types.ObjectId(req.body.userid) },
		function (err, InventoryItemModel) {
			res.json(JSON.stringify(UserModel))
		});
});

//updates user information
router.post('/update', async function (req, res, next) {
	console.log(req.body);

	for (const [key, value] of Object.entries(req.body)) {
		if (key.toString().toUpperCase().includes("ID") || key.toString().toUpperCase().includes("NAME")) {
			console.log(key); // cannot be changed
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
		}
	}
});

//delete user from database
router.post('/delete', async function (req, res, next) {
	console.log(req.body);

	await UserModel.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.body.userid) });

	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));

});

/************************** CART FUNCTIONS *************************************/

//adds an item to the user's cart
router.post('/add_to_cart', async function (req, res, next) {
	console.log(req, body);

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


});

//retrieves the items in the user's cart
router.post('get_cart', async function (req, res, next) {
	console.log(req, body);

	await UserModel.find({ UserID: req.body.userid, Cart: {} },
		function (err, UserModel) {
			res.json(JSON.stringify(UserModel))
		});


});

//updates the quantity of an object in the user's cart
router.post('update_cart', async function (req, res, next) {
	console.log(req, body);

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

});

//removes an item from the user's cart
router.post('remove_from_cart', async function (req, res, next) {
	console.log(req.body);

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
