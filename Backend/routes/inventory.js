var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Item_Schema = require('../Schema/Item_Schema'); 

const url = 'mongodb://127.0.0.1:27017/Ouluxx'

//const db = mongoose.connection

/*db.once('open', _ => {
  console.log('Database connected:', url)
})
*/
/*db.on('error', err => {
  console.error('connection error:', err)
})*/

const InventoryItemAddModel = mongoose.model('InventoryItemAddModel', Item_Schema);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(req.body);
  console.log("Hello");
});

router.post('/testadd', async function(req, res, next) {
	console.log(req.body);
	mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	var newitem = new InventoryItemAddModel({
				name : req.body.itemname, 
				price : req.body.itemprice, 
				storename : req.body.itemstore, 
				storeid : req.body.itemstoreid
			});
	await newitem.save();
	var obj = new Object();
	obj.status = "Success";
	res.json(JSON.stringify(obj));	
	mongoose.connection.close();
});


module.exports = router;
