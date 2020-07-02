/******************************************************************************
 * Name: Benjamin Salzberg													 *
 * Date: 7/2/2020															 *
 * Version: 1.0.0															 *
 * Description: This file is the schema for the item object. It contains 	 *
 * information about the item such as name, price, store, etc.				 *
 * The category information will be kept within the item as an array.		 *
 ******************************************************************************/

const mongoose = require('mongoose');

const Inventory_Item = new mongoose.Schema({
	Schema_Type : {type : String, default: "ITEM"}, // Identifies this as an Inventory item. 
	ItemID : Uint32Array, // The id of the item
	name : String, // name of the item, defined by user
	price : String, // price of the item, defined by user
	storename : String, // name of the store this belongs to
	StoreID : Uint32Array, // id of the store this belongs to
	comments : { // comments on the item
		type: [{
			 Body: String, Date: Date, UserID: String, Username: String
		}], 
		default : [] //starts as an empty list
	}, 
	category : {type : [], default : []}, // type of item, such as tool etc. 
	date : { type: Date, default: Date.now }, // date item added to database 
	hidden : {type: Boolean, default: false} // whether or not item is hidden, such as removed from store or out of stock 
});

module.exports = Inventory_Item;