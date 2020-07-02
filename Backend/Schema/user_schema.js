/******************************************************************************
 * Name: Kyle Enchill														 *
 * Date: 7/2/2020															 *
 * Version: 1.0.0															 *
 * Description: This file is the schema fo the user object. It contains useful*
 * information about the user such as name, address, email, cart, etc.		*
 * The cart information will be kept within the user as an array.
 ******************************************************************************/

const mongoose = require('mongoose');

const User = new mongoose.Schema({
	Schema_Type : {type : String, default: "USER"}, // Identifies this as a store item. 
	UserID: Uint32Array,
	Username : String, 
	Password : String, 
	FirstName: String,
	LastName: String,
	Email: String,
	Address: String,
	City: String,
	State: String,
	Zipcode: Uint32Array,   //This does not verify if the zipcode is strictly XXXXX format
	Cart: {
		type: [{
			ItemID: Uint32Array,
			ItemName: String,
			Description: String,
			Quantity: Uint16Array,
			Price: Float32Array,
			Date_Ordered: {
				type: Date,
				default: Date.now
			}
		}],
		default: []
	}

});
	
module.exports = User;
