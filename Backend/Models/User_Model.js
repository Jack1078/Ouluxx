/******************************************************************************
 * Name: Kyle Enchill														  *
 * Date: 7/17/2020															  *
 * Version: 1.1.0															  *
 * Description: This file is the schema fo the user object. It contains useful*
 * information about the user such as name, address, email, cart, etc.		  *
 * The cart information will be kept within the user as an array.			 *
 ******************************************************************************/

const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const User = new mongoose.Schema({
	Schema_Type: { type: String, default: "USER" }, // Identifies this as a user. 
	//UserID: String, // use the _id value
	Email: String,
	username: { type: String, unique: true },
	facebookid: String,
	googleid: String, 
	verifiedemail: {type: Boolean, default: false},
	VerifyEmailTokenSalt: String, 
	VerifyEmailToken: String,
	resetPasswordToken: String,
	resetPasswordTokenSalt: String, 
	resetPasswordExpires: Date,
	Password: String,
	FirstName: String,
	LastName: String,
	Address: String,
	City: String,
	State: String,
	Created_Password: {type: Boolean, default: true},
	active: { type: Boolean, default: true },
	Zipcode: Number,   //This does not verify if the zipcode is strictly XXXXX format
	UserType: String, // This is either USER or STORE. 
	StoreID : String,  // this is only instantiated if the user is a store. it also starts out as nothing until they make a store.
	ConnectedStripeAccountID : String,  
	Cart: {
		type: [{
			ItemID: String,			 // uses the _id property of the item
			ItemName: String,
			Description: String,
			Quantity: Number,
			Price: Number,
			Subtotal: Number,
			// Date_Ordered: {		// Needs to update at checkout, not when added to cart
			// 	type: Date,
			// 	default: Date.now
			// }
		}],
		default: []
	}

});

User.plugin(passportLocalMongoose,
	{
		"usernameField": "Email"
	});

module.exports = mongoose.model('User', User);