var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const InventoryItem = require('../Models/Item_Model'); 
const StoreModel = require('../Models/Store_Model'); 
const UserModel = require('../Models/User_Model');

var nodemailer = require('nodemailer');
const secrets = require('../secrets/secrets'); 
const { google } = require('googleapis');
const { OAuth2 } = google.auth;


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
	console.log(req.body);
	console.log("Hello");
});

/*
Gets the total price of everything in the cart. 
No JSON payload. Must be logged in. 
*/

router.post('/get_cart_price', function(req, res, next){
	if (req.user && req.user.UserType === "USER") {
		var price = get_price(req);
		res.status(200).json({Total:price});
	}
	else
	{
		res.status(401).send("Unauthorized");
	}
});

/*
purchase everything in the cart
No JSON payload. Must be logged in. 
*/

router.post('/cart', async function(req, res, next){
	if (req.user && req.user.UserType === "USER") {
		var price = get_price(req);
		var reciept_text = "";
		var reciept_text_html = "";
		var Store_Items = [];
		//built the start of the reciept
		// TODO
		for(var Item of Object.entries(req.user.Cart))
		{
			//console.log(Item[1]);
			price+=Item[1].Subtotal;
			// get item by ID
			await InventoryItem.findById(mongoose.Types.ObjectId(Item[1].ItemID), function(err, item){
				console.log(item)
				// generate the receipt
				reciept_text+=Item[1].Quantity+" of "+item.Name+" with an individual price of "+Item[1].Price+" for a total of "+Item[1].Subtotal;
				Store_Items.push({StoreID: item.StoreID, ItemID:item._id, Quantity:Item[1].Quantity, });
				//prep for next item
				reciept_text+="\n\n";
				// generate the html version of the reciept. 
				reciept_text_html+=Item[1].Quantity+" of "+item.Name+" with an individual price of "+Item[1].Price+" for a total of "+Item[1].Subtotal;
				//prep for next item
				reciept_text_html+="<br><br>";
			});
		}
		//build the rest of the reciept
		// TODO

		// TODO contact the seller and inform them of the purchase 

		// TODO Perform the purchase

		// TODO contact driver and inform them of the purchase and route location. 

		res.status(200).json({Total:price, Reciept: reciept_text, Reciept_HTML: reciept_text_html, });
	}
	else
	{
		res.status(401).send("Unauthorized");
	}
	
});

function get_price(req){
	var price = 0.0;
	for(var Item of Object.entries(req.user.Cart))
	{
		price+=Item[1].Subtotal;
	}
	return price;
}



module.exports = router;