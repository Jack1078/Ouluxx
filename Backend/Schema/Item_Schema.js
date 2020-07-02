const mongoose = require('mongoose');

const Inventory_Item = new mongoose.Schema({
	Schema_Type : {type : String, default: "ITEM"}, // Identifies this as an Inventory item. 
	name : String, // name of the item, defined by user
	price : String, // price of the item, defined by user
	storename : String, // name of the store this belongs to
	storeid : String, // id of the store this belongs to
	comments : { // comments on the item
		type: [{
			 Body: String, Date: Date, UserID: String, Username: String
		}], 
		default : [] //starts as an empty list
	}, 
	date : { type: Date, default: Date.now }, // date item added to database 
	hidden : {type: Boolean, default: false} // whether or not item is hidden, such as removed from store or out of stock 
});

module.exports = Inventory_Item;