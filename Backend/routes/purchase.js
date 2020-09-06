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
		var price = 0;
		var current_time = new Date();
		var itemlist = [];
		var StoreItemSeperation = {};
		// TODO
		for(var Item of Object.entries(req.user.Cart))
		{
			//console.log(Item[1]);
			price+=Item[1].Subtotal;
			// get item by ID
			await InventoryItem.findById(mongoose.Types.ObjectId(Item[1].ItemID), function(err, item){
				//console.log(item)
				if (!StoreItemSeperation[item.StoreID]) {
					StoreItemSeperation[item.StoreID] = [];
				}
				StoreItemSeperation[item.StoreID].push({itemid: item._id.toString(), Quantity:Item[1].Quantity, baseprice:item.price,totalprice:item.totalprice,Subtotal:Item[1].Subtotal});
				itemlist.push({
					ItemID : Item[1].ItemID,
					ItemName : item.Name,
					Quantity: Item[1].Quantity,
					Price: Item[1].Price,
					Subtotal: Item[1].Subtotal
				});
			});
			
		}
		console.log(StoreItemSeperation);
		var newTransaction = new TransactionModel({
			Transaction_ID : req.user.username+current_time.toString(), 
			Total : price, 
			USERID : req.user._id.toString(), 
			Items : itemlist, 
			IDList : StoreItemSeperation
		});
		await newTransaction.save();
		// TODO contact the seller and inform them of the purchase 

		// Perform the purchase
		var confirm_purchase = true; // confirm with the vendor that the purchase was possible. 
		if(confirm_purchase) // perform the purchase
		{
			var price = 0.0;
			var baseprice = 0.0;
			var totalprice = 0.0;
			var StorePriceSeperation = {};
			for(var storeID in StoreItemSeperation)
			{
				if (!StorePriceSeperation[storeID]) {
					StorePriceSeperation[storeID] = [];
				}
				for (var item in StoreItemSeperation[storeID]) {
					price+=(StoreItemSeperation[storeID][item].totalprice)*(StoreItemSeperation[storeID][item].Quantity);
					baseprice+=(StoreItemSeperation[storeID][item].baseprice)*(StoreItemSeperation[storeID][item].Quantity);
				}
				StorePriceSeperation[storeID] = baseprice;
				totalprice+=price;
				price = 0.0;
				tempprice = 0.0;
			}
			const paymentIntent = await stripe.paymentIntents.create({
				amount: totalprice*100,
				currency: "usd" 
			});
			for(var key in StorePriceSeperation)
			{
				var transactionfee = 99;
				var stripeoverhead = ((StorePriceSeperation[key]*0.03)+30)
				await UserModel.find({StoreID : key}, async function(err, store){
					console.log(StorePriceSeperation[key])
					const transfer = await stripe.transfers.create({
						amount: (StorePriceSeperation[key]-stripeoverhead-transactionfee), 
						currency: 'usd',
						destination: store[0].ConnectedStripeAccountID,
						transfer_group: newTransaction._id.toString()
					});
				});
			}
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