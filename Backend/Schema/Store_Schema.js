const mongoose = require('mongoose');

const Store_Schema = new mongoose.Schema({
	Schema_Type : {type : String, default: "STORE"}, // Identifies this as a store item. 
	Name : String, // The name of the store, defined by user
	Storeid : String, // The ID of the store, defined by program based upon the name and the number of elements already labeled STORE
	Inventory : { // A list of items. The item is added to this list to connect it with the database. More data on items is found in the Item_Schema. 
		type: [{ // contains the item ID, the items name, the date the item is added, and the number in the inventory. 
			ItemID: String , ItemName: String, Date: {Type : Date, default : Date.now}, NumberInInventory: Number 
		}], 
		default : [] // starts as an empty list
	}, 
	Comments : { // if we want to add comments to the store. 
		type: [{
		 Body: String, Date: Date, UserID: String, Username: String
		}], 
		default : [] // starts as an empty list
	},
	Location : {type : {Country : String, State : String, Address : String, Zip : Number}}, // the location of the store, defined by user.  
	Description : String, // Description of store, provided by user
	date : { type: Date, default: Date.now }, // The date that this was added to the database
	hidden : { type: Boolean, default: false } // determine if the object is hidden, if someone does not want their store hosted, etc. 
});

module.exports = Store_Schema;