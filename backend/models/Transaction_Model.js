/** ****************************************************************************
 * Name: Benjamin Salzberg													 *
 * Date: 8/9/2020															 *
 * Version: 1.0.0															 *
 * Description: This file is the schema for the transaction object. It stores*
 * information about the transactions that occur							 *
 ******************************************************************************/

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const Transaction = new Schema({
  Schema_Type: { type: String, default: 'TRANSACTION' }, // Identifies this as a Transaction item.
  Transaction_ID: String, // name of the item, this is auto generated, shoulkd be made of a timestamp, and username.
  Total: Number,
  USERID: String,
  Items: {
    type: [
      {
        ItemID: String, // uses the _id property of the item
        ItemName: String,
        Quantity: Number,
        Price: Number,
        Subtotal: Number
      }
    ],
    default: []
  },
  Date: { type: Date, default: Date.now }, // date item added to database
  Hidden: { type: Boolean, default: false } // whether or not item is hidden, such as removed from store or out of stock
})

module.exports = mongoose.model('Transaction', Transaction)
