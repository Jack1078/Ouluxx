const mongoose = require('mongoose');



const Inventory_Item = new mongoose.Schema({
	name: String,
	price: String, 
	storename: String, 
	storeid: String,
	comments: {type: [{ body: String, date: Date }], default : []},
	date: { type: Date, default: Date.now },
	hidden: {type: Boolean, default: false}
});


module.exports = Inventory_Item;