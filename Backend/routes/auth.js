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