/******************************************************************************
 * Name: Benjamin Salzberg													 *
 * Date: 7/2/2020															 *
 * Version: 1.0.0															 *
 * Description: This file is the schema for the store object. It contains 	 *
 * information about the store such as name, address, email, inventory, etc. *
 * The inventory information will be kept within the store as an array.		 *
 ******************************************************************************/

const mongoose = require('mongoose');
var Schema = mongoose.Schema; 
const Stores = new Schema({
	Schema_Type : {type : String, default: "STORE"}, // Identifies this as a store item. 
	Name : String, // The name of the store, defined by user
	//StoreID : Number, // The ID of the store, defined by program based upon the name and the number of elements already labeled STORE
	OwnerUserID : String, // the id of the store owners account. 
	Address: String,
	City: String,
	State: String,
	Zipcode: Number,   //This does not verify if the zipcode is strictly XXXXX format
	Email: String, // email address of the store, defined by user (a method to communicate with the store. Potentially an identifier for the store. )
	Inventory : { // A list of items. The item is added to this list to connect it with the database. More data on items is found in the Item_Schema. 
		type: [{ // contains the item ID, the items name, the date the item is added, and the number in the inventory. 
			ItemID: String , ItemName: String, Date: Date, NumberInInventory: Number 
		}], 
		default : [] // starts as an empty list
	}, 
	Categories : {type : [], default : []}, 
	Comments : { // if we want to add comments to the store. 
		type: [{
		 Body: String, Date: Date, UserID: String, Username: String
		}], 
		default : [] // starts as an empty list
	},

	Description : String, // Description of store, provided by user
	Date : { type: Date, default: Date.now }, // The date that this was added to the database
	Hidden : { type: Boolean, default: false } // determine if the object is hidden, if someone does not want their store hosted, etc. 
});

module.exports = mongoose.model('Stores', Stores);