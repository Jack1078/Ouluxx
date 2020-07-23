const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 
var flash = require('connect-flash');
const jwt = require("jsonwebtoken");

var nodemailer = require('nodemailer');
const secrets = require('../secrets/secrets'); 
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const UserModel = require('../Models/User_Model');
const ItemModel = require('../Models/Item_Model');

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Auth' });
	console.log(req.body);
	console.log("Hello");
});


const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';
const url = "http://localhost:4000/auth/verify?token="
const secretkey = "7BA9089A4146368B9257498CE6DE27C2ABB095B8AA77C4018322F1AB43AB9103";

var transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		type: 'OAuth2',
		clientId: secrets.googleclientid,
		clientSecret: secrets.googlesecretid
	}
});

/*
	Must be logged in to function
*/

router.get('/verify', async function (req, res, next){
	if (!req.user.verifiedemail) {
		if(req.user.VerifyEmailToken === req.query.token)
		{
			await UserModel.findOneAndUpdate(
				{ _id: mongoose.Types.ObjectId(req.user._id) },
				{ "verifiedemail": req.user.VerifyEmailToken === req.query.token }
			);
			await UserModel.findOneAndUpdate(
				{ _id: mongoose.Types.ObjectId(req.user._id) },
				{ "VerifyEmailToken": "" }
			);
			res.json({ success: true, message: "Verification successful", User: req.user});
		}
	}
	else
	{
		res.json({ success: true, message: "Email has already been verified. ", User: req.user});
	}
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
	const token = jwt.sign({userId : user._id, username:req.body.username}, secretkey, {expiresIn: '672h'}); // give 4 weeks for authorizing email
	user.VerifyEmailToken = token;
	await UserModel.register(user, req.body.password, async function (err) {
		if (err) {
			console.log("Error: ", err);
			res.json({ success: false, message: "Your account could not be saved. Error: ", err })
		}
		else {
			let info = await transporter.sendMail({
				from: '"Ouluxx!" <software@ouluxx.com>', // sender address
				to: user.Email, // list of receivers
				subject: "Welcome to Ouluxx!", // Subject line
				text: "Welcome to Ouluxx! We hope you have a good time making use of our services. Please use this address to verify your email " + url + token, // plain text body
				html: "<p>Welcome to Ouluxx! We hope you have a good time making use of our services. Please press this link to verify your email address <a href = \"" + url + token + "\">HERE</a></p><br><hr><br><h9>Or click here: "+ url + token + "</h9>", // html body
				auth: {
					user: 'software@ouluxx.com',
					refreshToken: secrets.googleoauth2refreshtoken
				}
			});
			req.login(user, function(err) {
				res.json({ success: true, message: "Authentication successful", User: req.user});
			});
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