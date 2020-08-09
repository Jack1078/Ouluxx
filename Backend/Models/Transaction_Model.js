/******************************************************************************
 * Name: Benjamin Salzberg													 *
 * Date: 8/9/2020															 *
 * Version: 1.0.0															 *
 * Description: This file is the schema for the transaction object. It stores*
 * information about the transactions that occur							 *
 ******************************************************************************/

const mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var passportLocalMongoose = require('passport-local-mongoose'); 

const Inventory_Item = new Schema({
	Schema_Type : {type : String, default: "ITEM"}, // Identifies this as an Inventory item. 
	//ItemID : Uint32Array, // The id of the item potentially unneeded as _id exists
	Name : String, // name of the item, defined by user
	IdentifierName : String, //used if the item has a specific name that is not the same as the name it is regularly reffered to as. 
	Price : Number, // price of the item, defined by user
	StoreName : String, // name of the store this belongs to
	StoreID : String, // id of the store this belongs to
	Comments : { // comments on the item
		type: [{
			 Body: String, Date : { type: Date, default: Date.now }, UserID: String, Username: String
		}], 
		default : [] //starts as an empty list
	}, 
	Category : {type : [], default : []}, // type of item, such as tool etc. 
	Date : { type: Date, default: Date.now }, // date item added to database 
	Hidden : {type: Boolean, default: false} // whether or not item is hidden, such as removed from store or out of stock 
});

module.exports = mongoose.model("Inventory_Item", Inventory_Item);