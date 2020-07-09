/******************************************************************************
 * Name: Kyle Enchill														  *
 * Date: 7/9/2020															  *
 * Version: 1.0.0															  *
 * Description: This file is the schema fo the user object. It contains useful*
 * information about the user such as name, address, email, cart, etc.		  *
 * The cart information will be kept within the user as an array.             *
 ******************************************************************************/

const mongoose = require('mongoose');

const User = new mongoose.Schema({
    Schema_Type: { type: String, default: "USER" }, // Identifies this as a store item. 
    //UserID: String, // use the _id value
    Username: String,
    Password: String,
    FirstName: String,
    LastName: String,
    Email: String,
    Address: String,
    City: String,
    State: String,
    Zipcode: Number,   //This does not verify if the zipcode is strictly XXXXX format
    UserType: String, // This is either user or store. 
    Cart: {
        type: [{
            ItemID: String, // uses the _id property of the item
            ItemName: String,
            Description: String,
            Quantity: Number,
            Price: Number,
            Date_Ordered: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    }

});

module.exports = User;
