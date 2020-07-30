var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var InventoryItemModel = require('../Models/Item_Model'); 
var StoreModel = require('../Models/Store_Model'); 
const UserModel = require('../Models/User_Model');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
	console.log(req.body);
	console.log("Hello");
});

router.post('/cart', function(req, res, next){
	if (req.user && req.user.UserType === "USER") {
		console.log(req.user);
		console.log(req.user.Cart);
	}
	res.status(200).json({message:"Nothing"});
});





module.exports = router;