var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Store_Schema = require('../Schema/Store_Schema'); 

const url = 'mongodb://127.0.0.1:27017/Ouluxx'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(req.body);
  console.log("Hello");
});

const StoreModel = mongoose.model('StoreModel', Store_Schema);

router.post('/add', async function(req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	var newStore = new StoreModel({
				Name : req.body.storename, 
				Address : req.body.storeaddress, 
				City : req.body.storecity, 
				State : req.body.storestate, 
				Zipcode : req.body.storezipcode, 
				Email : req.body.email, 
				Description : req.body.description
			});
	await newStore.save();
	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));
	mongoose.connection.close();
});

module.exports = router;
