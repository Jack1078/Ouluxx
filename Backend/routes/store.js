var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Item_Schema = require('../Schema/Item_Schema'); 
var Store_Schema = require('../Schema/Store_Schema'); 

const url = 'mongodb://127.0.0.1:27017/Ouluxx'

const InventoryItemModel = mongoose.model('InventoryItemModel', Item_Schema);
const StoreModel = mongoose.model('StoreModel', Store_Schema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(req.body);
  console.log("Hello");
});

/*

The JSON looks like: 

{
	"storename" : "<name>",
	"storeaddress" : "<address>",
	"storecity" : "<city>",
	"storestate" : "<state>",
	"storezipcode" : "<zipcode>",
	"email" : "<email>",
	"description" : "<description>"
}

*/

router.post('/add', async function(req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
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

/*

A delete payload is as such: 

{
	"storeid" : "<storeid>" // this is stored on the store's page as the store id
}

*/

router.post('/delete', async function(req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
	await StoreModel.findOneAndRemove({_id: mongoose.Types.ObjectId(req.body.storeid)});
	await InventoryItemModel.deleteMany({StoreID:req.body.storeid});
	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));
	mongoose.connection.close();
});

/*

A get store payload is as such: 

{
	"storeid" : "<storeid>" // this is stored on the store's page as the store id
}

*/

router.post('/get_store', async function(req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
	
	await StoreModel.findOne({_id: mongoose.Types.ObjectId(req.body.storeid)}, 
		function(err, StoreModel) {
			res.json(JSON.stringify(StoreModel))
		});
	/*var obj = new Object();
	obj.status = "Success";*/
	//res.json(JSON.stringify(obj));
	mongoose.connection.close();
});

router.post('/all_stores', async function(req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
	
	await StoreModel.find({},
		function(err, StoreModel) {
			res.json(JSON.stringify(StoreModel))
		});
	/*var obj = new Object();
	obj.status = "Success";*/
	//res.json(JSON.stringify(obj));
	mongoose.connection.close();
});

module.exports = router;