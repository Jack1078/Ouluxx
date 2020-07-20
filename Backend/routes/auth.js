const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 
var flash = require('connect-flash');
const jwt = require("jsonwebtoken");

const UserModel = require('../Models/User_Model');
const ItemModel = require('../Models/Item_Model');

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Auth' });
	console.log(req.body);
	console.log("Hello");
});


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
			res.json({ success: true, message: "Authentication successful", User: req.user/*, token: token */ });
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

router.get('/facebook',
	passport.authenticate('facebook', { scope : ['email'] }));

router.get('/facebook/callback',
	passport.authenticate('facebook', { failureRedirect: 'http://localhost:4000/' }),
	function(req, res) {
		// Successful authentication, redirect home.
		console.log(req.body);
		//res.json({success:true, message:"Authentication successful", User:req.user});
		res.redirect('http://localhost:4000/SUCCESS');
  });

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
  }));

/*
 TODO redirect to frontend add address page. 
*/

router.get("/google/callback", passport.authenticate('google', { failureRedirect: 'http://localhost:4000/' }),
	function(req, res) {
		// Successful authentication, redirect home.
		console.log(req.body);
		//res.json({success:true, message:"Authentication successful", User:req.user});
		res.redirect('http://localhost:4000/SUCCESS');
});

module.exports = router;