var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const InventoryItem = require('../Models/Item_Model'); 
const StoreModel = require('../Models/Store_Model'); 
const UserModel = require('../Models/User_Model');
const TransactionModel = require('../Models/Transaction_Model');

var nodemailer = require('nodemailer');
const secrets = require('../secrets/secrets'); 
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const stripe = require("stripe")("sk_test_51H9FkuAbZ4xKEbr326AkRBlO00kQIzg85LhxLvbJbNtBA9pwNgMTuB8LGRSD8cbbMWmHtkgnwlvwDJv8lr1fQCqM00sqtb6R2D");

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('stripetest');
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
		var current_time = new Date();
		var itemlist = [];
		//built the start of the reciept
		// TODO
		for(var Item of Object.entries(req.user.Cart))
		{
			//console.log(Item[1]);
			price+=Item[1].Subtotal;
			// get item by ID
			await InventoryItem.findById(mongoose.Types.ObjectId(Item[1].ItemID), function(err, item){
				//console.log(item)
				// generate the receipt
				reciept_text+=Item[1].Quantity+" of "+item.Name+" with an individual price of "+Item[1].Price+" for a total of "+Item[1].Subtotal;
				//prep for next item
				reciept_text+="\n\n";
				// generate the html version of the reciept. 
				reciept_text_html+=Item[1].Quantity+" of "+item.Name+" with an individual price of "+Item[1].Price+" for a total of "+Item[1].Subtotal;
				//prep for next item
				reciept_text_html+="<br><br>";
				itemlist.push({
					ITemID : Item[1].ItemID,
					ItemName : item.Name,
					Quantity: Item[1].Quantity,
					Price: Item[1].Price,
					Subtotal: Item[1].Subtotal
				});
			});
			
		}
		//build the rest of the reciept
		// TODO

		var newTransaction = new TransactionModel({
			Transaction_ID : req.user.Name+current_time.toString(), 
			Total : price, 
			USERID : req.user._id.toString(), 
			Items : itemlist
		});
		await newTransaction.save();
		// TODO contact the seller and inform them of the purchase 

		// TODO Perform the purchase
		console.log(newTransaction.Total*100);
		var confirm_purchase = true; // confirm with the vendor that the purchase was possible. 
		if(confirm_purchase) // perform the purchase
		{
			const paymentIntent = await stripe.paymentIntents.create({
				amount: newTransaction.Total*100,
				currency: "usd"
			});
			// TODO contact driver and inform them of the purchase and route location. 
			res.send({
				clientSecret: paymentIntent.client_secret, 
				clientemail: req.user.Email
			});

		}
		else
		{
			//error, vendor cannot perform the purchase
		}


		//res.status(200).json({Total:price, Reciept: reciept_text, Reciept_HTML: reciept_text_html});
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