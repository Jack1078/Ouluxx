/******************************************************************************
 * Name: Kyle Enchill														  *
 * Date: 7/3/2020															  *
 * Version: 1.0.0															  *
 * Description: This file contains the functions for the users on our platform*
 * So far there is an add function to create new users in our database.		  *
 ******************************************************************************/
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var user_schema = require('../Schema/user_schema');

const url = 'mongodb://127.0.0.1:27017/Ouluxx'

const UserModel = mongoose.model('UserAddModel', user_schema);

router.get('/', function (req, res, next) {
	//this processes the GET request. 
	//this needs to be converted to sanitize the inputs.
	//this also needs to parse the inputs
	//this needs to implement prepared statements for the query

	res.render('index', { title: 'Express' });
	console.log(req.body);
	console.log("Hello");
});

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
		Zipcode: req.body.Zipcode

	});

	await newuser.save();

	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));

	mongoose.connection.close();
});

router.post('/testadd', function (req, res, next) {
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
});

module.exports = router;
