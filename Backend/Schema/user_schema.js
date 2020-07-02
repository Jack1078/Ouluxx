/******************************************************************************
 * Name: Kyle Enchill                                                         *
 * Date: 7/2/2020                                                             *
 * Version: 1.0.0                                                             *
 * Description: This file is the schema fo the user object. It contains useful*
 * information about the user such as name, address, email, cart, etc.        *
 * The cart information will be kept within the user as an array.
 ******************************************************************************/

const mongoose = require('mongoose');

const User = new mongoose.Schema({
    user_id: Uint32Array,
    first_name: String,
    last_name: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zipcode: Uint32Array,   //This does not verify if the zipcode is strictly XXXXX format
    cart: {
        type: [{
            item_id: Uint32Array,
            item_name: String,
            description: String,
            quantity: Uint16Array,
            price: Float32Array,
            date_ordered: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    }

});

module.exports = User;
