/******************************************************************************
 * Name: Kyle Enchill															*
 * Date: 7/3/2020																*
 * Version: 1.0.0																*
 * Description: This file contains the functions for the users on our platform*
 * So far there is an add function to create new users in our database.			*
 ******************************************************************************/
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const UserModel = require('../Models/User_Model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 
const jwt = require("jsonwebtoken");
//const passportLocalMongoose = require('passport-local-mongoose');

router.post('/register', async function(req, res) { // add and register a user, hashes password
	console.log(req.body);
	var UserTypeSet = "USER";
	if (req.body.isstore) {
		UserTypeSet = "STORE"
	}
	user_details = {
		Email: req.body.Email,
		username: req.body.username,
		FirstName: req.body.FirstName,
		LastName: req.body.LastName,
		Address: req.body.Address,
		City: req.body.City,
		State: req.body.State,
		Zipcode: req.body.Zipcode, 
		UserType : UserTypeSet
	};
	await UserModel.register(new UserModel(user_details), req.body.password, async function(err) 
	{
		console.log("HI");
		if (err)
		{
			console.log("Error: ", err);
			res.json({success:false, message:"Your account could not be saved. Error: ", err}) 
		}
		else
		{
			console.log("No error");
			res.json({success: true, message: "Your account has been saved"})
		} 
	}); 
}); 

router.post('/login', function(req, res){
	if(!req.body.username){ 
		//console.log("No username");
		res.json({success: false, message: "Username was not given"}) 
	}
	else
	{ 
		if(!req.body.password){ 
			//console.log("No password");
			res.json({success: false, message: "Password was not given"}) 
		}
		else{ 
			passport.authenticate('local', function (err, user, info) {	
			if(err){ 
				//console.log("authentication error");
				res.json({success: false, message: err}) 
			}
			else{ 
				if(!user){ 
					//console.log("incorrect username or password");
					res.json({success: false, message: 'username or password incorrect'}) 
				}
				else{ 
					req.login(user, function(err){ 
						if(err){
							//console.log("login error", err);
							res.json({success: false, message: err}) 
						}
						else{
							//console.log("SUCCESS");
							const secretkey = "7BA9089A4146368B9257498CE6DE27C2ABB095B8AA77C4018322F1AB43AB9103"
							const token = jwt.sign({userId : user._id, username:user.username}, secretkey, {expiresIn: '72h'}) 
							res.json({success:true, message:"Authentication successful", token: token }); 
						} 
					}) 
				}
			} 
		})
		(req, res); 
		}
	}
});


router.get('/', function (req, res, next) {
	//this processes the GET request. 
	//this needs to be converted to sanitize the inputs.
	//this also needs to parse the inputs
	//this needs to implement prepared statements for the query

	res.render('index', { title: 'Express' });
	console.log(req.body);
	console.log("Hello");
});

/*router.post('/add', async function (req, res, next) { // add a user to the db
	//this processes the POST request. 
	//this needs to be converted to sanitize the inputs.
	//this also needs to parse the inputs
	//this needs to implement prepared statements for the query
	console.log(req.body);

	//mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
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
	obj.status = "Success";
	res.json(JSON.stringify(obj));

	//mongoose.connection.close();
});
*/
/*
router.post('/testadd', async function (req, res, next) {
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
});*/

module.exports = router;
