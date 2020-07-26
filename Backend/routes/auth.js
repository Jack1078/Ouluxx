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
const url = "http://localhost:4000/auth/verify?token=";
const reseturl = "http://localhost:4000/auth/reset_password?token=";
const supportemail = "email@email.com";
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
	Must be logged in to function, the query is the url constant above + the token generated in register
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
	Requires email be included in request. 
*/

router.post('/request_reset', async function (req, res, next)
{
	await UserModel.findOne({Email: req.body.Email}, async function(err, user){
		if (err) {
			console.log(err);
			res.status(500).json({message: 'This user does not exist'});
		}
		else
		{
			console.log(user);
			await UserModel.findOneAndUpdate(
				{ _id: mongoose.Types.ObjectId(user._id) },
				{ "resetPasswordExpires": Date.now() + 3600000 }
			);
			const token = jwt.sign({userId : user._id, Email:req.body.email, password:user.password}, secretkey, {expiresIn: '1h'});
			await UserModel.findOneAndUpdate(
				{ _id: mongoose.Types.ObjectId(user._id) },
				{ "resetPasswordToken": token }
			);
			let info = await transporter.sendMail({
				from: '"Ouluxx!" <software@ouluxx.com>', // sender address
				to: user.Email, // list of receivers
				subject: "Password Reset Request", // Subject line
				text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n' + reseturl + token + '\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n',
				html: "You are receiving this because you (or someone else) have requested the reset of the password for your account.<br><a href = \""+reseturl+token+"\">Please click on this link</a><br><br>If you did not request this, please ignore this email and your password will remain unchanged.<hr><br><h9>You may copy this link and paste it into your browser " + reseturl + token + "</h9><br>", // html body
				auth: {
					user: 'software@ouluxx.com',
					refreshToken: secrets.googleoauth2refreshtoken
				}
			});
			res.status(200).json({message:"Success"});
		}
	})
});

/*
TODO once this confirms that the page is correct, it then needs a form that has a post request to /reset password. This will enable the user to add a password to reset 
*/

router.get("/reset_password", async function(req, res, next){
	UserModel.findOne({ resetPasswordToken: req.query.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
		if (!user) {
			res.status(500).json({message: 'This user does not exist, or the password reset token has expired'});
		}
		else
		{
			res.render('Password_reset', { title: 'Password Reset', token:req.query.token });
		}
	});
});

/*
	gets from a form with 3 parts, password, confirmpassword, and token. The token should not be alterable and should be included from the get request. 
*/

router.post("/reset_password", async function(req, res, next){
	console.log(req.body);
	UserModel.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, async function(err, user) {
		if (!user) {
			res.status(500).json({message: 'This user does not exist, or the token has expired'});
		}
		else
		{
			if (req.body.new_password === req.body.confirm_password) {
				await user.setPassword(req.body.new_password);
				await user.save();
				req.login(user, async function(err){
					if(err)
					{
						console.log(err);
						res.status(500).json({message:err+" error"});
					}
					else
					{
						let info = await transporter.sendMail({
							from: '"Ouluxx!" <software@ouluxx.com>', // sender address
							to: user.Email, // list of receivers
							subject: "Password Reset", // Subject line
							text: "You are receiving this because you (or someone else) has reset the password associated with this email account. If this was in error, please reach out to us at "+supportemail+". Otherwise, you may ignore this email. \n",
							html: "You are receiving this because you (or someone else) has reset the password associated with this email account. If this was in error, please reach out to us at <a href = \"mailto:"+supportemail+"\">"+supportemail+"</a>. Otherwise, you may ignore this email. ", // html body
							auth: {
								user: 'software@ouluxx.com',
								refreshToken: secrets.googleoauth2refreshtoken
							}
						});
						res.render('index', { title: 'Password Reset'}); /*this is effectivcely a redirect*/
					}
				});
			}
			else
			{
				res.render('Password_reset', { title: 'Password Reset', token:req.body.token });
			}
		}
	});
});

/*
requires being logged in

requires old password, requires new password, and requires a confirmation password

*/

router.post("/change_password", async function(req, res, next){
	console.log(req.body);
	if (req.user) {
		// logged in
		if (req.body.new_password === req.body.confirm_password) {
			req.user.changePassword(req.body.old_password, req.body.new_password, function(err){
				if (err) {
					res.status(500).json({message:"Error: "+err});
				}
				res.status(200).json({message:"Password changed"});/*redirect('index', {title:"Password Changed"})*/
			});
		}
		else
		{
			res.status(200).json({message: "Passwords do not match"});
		}
	} else {
		// not logged in
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