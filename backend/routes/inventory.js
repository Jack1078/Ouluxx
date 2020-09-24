const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const InventoryItemModel = require('../models/Item_Model');
const StoreModel = require('../models/Store_Model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
  console.log(req.body);
  console.log('Hello');
});

/*

An item JSON is structured as this:

{
  "itemname" : "<Item's Name>",
  "itemprice" : "<Item's Price>",
  "itemstore" : "<The name of the store the item belongs to>",
  "categories" : ["<catagory 1>", "<category 2>", ...],
  "inventory" : <Integer> // this is an optional parameter
  "TrueIdentifier" : <TrueIdentifier>, // this is something like the serial number of the product
  "Image" : <base64 Image>
}

Add a single item to the DB.

*/

const markup = 0.07;
const MDtaxrate = 0.06;

router.post('/add', async function(req, res, next) {
  // add an item to the db, and add it to the store.
  if (req.user && req.user.UserType === 'STORE') {
    const itemprice = parseFloat(req.body.itemprice);
    const taxprice = itemprice * (1.0 + MDtaxrate);
    const markupprice = itemprice * (1.0 + markup);
    const totalprice = itemprice + itemprice * markup + itemprice * MDtaxrate;
    const newitem = new InventoryItemModel({
      Name: req.body.itemname,
      Price: itemprice,
      StoreName: req.body.itemstore,
      StoreID: req.user.StoreId,
      Category: req.body.categories,
      IdentifierName: req.body.TrueIdentifier,
      img: req.body.Image,
      totalprice: totalprice,
      taxprice: taxprice,
      markupprice: markupprice,
    });
    let number_In_Inventory = -1;
    if (req.body.inventory != null) {
      number_In_Inventory = req.body.inventory;
    }
    const StoreItem = {
      // create inventory item to add to inventory array
      ItemID: newitem._id,
      ItemName: req.body.itemname,
      NumberInInventory: number_In_Inventory,
    };
    await StoreModel.findOneAndUpdate(
        // update the model by adding the new item to inventory
        {_id: mongoose.Types.ObjectId(req.user.StoreId)},
        {$push: {Inventory: StoreItem}},
    );
    await newitem.save();
    res.status(200).json({message: 'Success'});
  } else {
    res.status(200).json({message: 'Not logged in'});
  }
});

/*
Send image as base64 to server

{
  "Image" : <base64 image>
}

*/

router.post('/Image', async function(req, res, next) {
  if (req.user && req.user.UserType === 'STORE') {
    await InventoryItemModel.findOneAndUpdate(
        {_id: mongoose.Types.ObjectId(req.body.itemid)},
        {img: req.body.Image},
    );
    res.status(200).json({message: 'Sucess'});
  } else {
    res.status(401).json({message: 'not allowed'});
  }
});

/*

An add comment JSON is structured as this:

{
  "itemid" : "<The ID of the item>", // This should be stored on the page.
  "comment" : "<comment string>",
  "userid" : "The users id, from logged in cookie"
  "username" : "The users username, from logged in cookie"
}

Add a comment to an item.

*/

router.post('/add_comment', async function(req, res, next) {
  // add an item to the db, and add it to the store.
  if (req.user && req.user.UserType === 'USER') {
    const commentitem = {
      // create inventory item to add to inventory array
      Body: req.body.comment,
      userID: req.user._id.toString(),
      Username: req.body.username,
    };
    await InventoryItemModel.findOneAndUpdate(
        // update the model by adding the new item to inventory
        {_id: mongoose.Types.ObjectId(req.body.itemid)},
        {$push: {Comments: commentitem}},
    );
    res.status(200).json({message: 'Success'});
  } else {
    res.status(200).json({message: 'Not logged in'});
  }
});

/*

A list of many items to be added looks like this

{
  "Item_1" :
  {
    "itemname" : "<Item's Name>",
    "itemprice" : "<Item's Price>",
    "categories" : ["<catagory 1>", "<category 2>", ...],
    "inventory" : <Integer> // this is an optional parameter
  },
  "Item_2" :
  {
    "itemname" : "<Item's Name>",
    "itemprice" : "<Item's Price>",
    "categories" : ["<catagory 1>", "<category 2>", ...],
    "inventory" : <Integer> // this is an optional parameter
  },
  ...
}

Adds many entries to the database. Is designed for information to be parsed on the frontend.

*/

router.post('/add_many', async function(req, res, next) {
  // add an item to the db, and add it to the store.
  if (req.user && req.user.UserType === 'STORE') {
    for (const [key, value] of Object.entries(req.body.items)) {
      const itemprice = parseFloat(value.itemprice);
      const newitem = new InventoryItemModel({
        Name: value.itemname,
        Price: itemprice,
        StoreName: value.itemstore,
        StoreID: req.user.StoreID,
        Category: value.categories,
        IdentifierName: req.body.TrueIdentifier,
      });
      let number_In_Inventory = -1;
      if (req.body.inventory != null) {
        number_In_Inventory = value.inventory;
      }
      const StoreItem = {
        // create inventory item to add to inventory array
        ItemID: newitem._id,
        ItemName: value.itemname,
        NumberInInventory: number_In_Inventory,
      };
      await StoreModel.findOneAndUpdate(
          // update the model by adding the new item to inventory
          {_id: mongoose.Types.ObjectId(req.user.StoreId)},
          {$push: {Inventory: StoreItem}},
      );
      await newitem.save();
    }
    res.status(200).json({message: 'Success'});
  } else {
    res.status(401).json({message: 'Not allowed'});
  }
});

/*

A delete payload is as such:

{
  "itemid" : "<itemid>" // this is stored on the page as the item id
}

Removes item from database.

*/

router.post('/delete', async function(req, res, next) {
  // add an item to the db, and add it to the store.
  if (req.user && req.user.UserType === 'STORE') {
    await InventoryItemModel.findOneAndRemove({
      _id: mongoose.Types.ObjectId(req.body.itemid),
    });
    await StoreModel.findOneAndUpdate(
        // update the model by adding the new item to inventory
        {_id: mongoose.Types.ObjectId(req.user.StoreId)},
        {$pull: {Inventory: {ItemID: req.body.itemid}}},
    );
    res.status(200).send('Success');
  } else {
    res.status(401).json({message: 'Not allowed'});
  }
});

/*

This appears as such, all params except the id are optional:

{
  "itemID" : "<The Item's ID>", // stored on the page when the item is retrieved from the DB
  "PRICE" : "<Item's Price>",
  "HIDDEN" : <boolean>,
  "Add_Category_1" : "<Category>",
  "Add_Category_2" : "<Category>",
  "Add_Category_..." : "<Category>",
  "Remove_Category_1" : "<Category>",
  "Remove_Category_2" : "<Category>",
  "Remove_Category_..." : "<Category>"
}

Updates entries in the MongoDB database.

*/

router.post('/update', async function(req, res, next) {
  // add an item to the db, and add it to the store.
  if (req.user && req.user.StoreID) {
    for (const [key, value] of Object.entries(req.body)) {
      if (
        (key.toString().toUpperCase().includes('ID') &&
          !(key.toString().toUpperCase() === 'HIDDEN')) ||
        key.toString().toUpperCase().includes('Name')
      ) {
        console.log(key); // cannot be changed
      } else if (key.toString().toUpperCase() === 'PRICE') {
        await InventoryItemModel.findOneAndUpdate(
            // update the model by adding the new item to inventory
            {_id: mongoose.Types.ObjectId(req.body.itemid)},
            {Price: parseFloat(value.toString())},
        );
      } else if (key.toString().toUpperCase() === 'HIDDEN') {
        console.log(key);
        console.log(value);
        await InventoryItemModel.findOneAndUpdate(
            // update the model by adding the new item to inventory
            {_id: mongoose.Types.ObjectId(req.body.itemid)},
            {Hidden: value.toString() === 'true'},
        );
      } else if (key.toString().includes('Add_Category')) {
        await InventoryItemModel.findOneAndUpdate(
            // update the model by adding the new item to inventory
            {_id: mongoose.Types.ObjectId(req.body.itemid)},
            {$push: {Category: value.toString()}},
        );
      } else if (key.toString().includes('Remove_Category')) {
        await InventoryItemModel.findOneAndUpdate(
            // update the model by adding the new item to inventory
            {_id: mongoose.Types.ObjectId(req.body.itemid)},
            {$pull: {Category: value.toString()}},
        );
      } else {
        // console.log("other"); //ignore
      }
    }
    res.status(200).send('Success');
  } else {
    res.status(401).json({message: 'Not allowed'});
  }
});

/*

A get item payload is as such:

{
  "itemid" : "<itemid>" // this is stored on the item's page as the item id
}

This returns a single item based on the id and all of the information that is held within the item object.
If there is no item with the given id, it returns null.

*/

router.post('/get_item', async function(req, res, next) {
  await InventoryItemModel.findOne(
      {_id: mongoose.Types.ObjectId(req.body.itemid)},
      function(err, InventoryItemModel) {
        res.json(JSON.stringify(InventoryItemModel));
      },
  );
});

/*

A get store items is as such:

{
  "storeid" : "<storeid>" // this is stored on the item's page as the item id
}

This returns a list of items based on the id of the store and all of the information that is held within the item objects.
If there are no items with the given id, it returns null.

*/

router.post('/get_store_items', async function(req, res, next) {
  await InventoryItemModel.find({storeid: req.body.storeid}, function(
      err,
      InventoryItemModel,
  ) {
    res.json(JSON.stringify(InventoryItemModel));
  });
});

/*

A get all items request has no payload.

This returns a list of all items and all of the information that is held within the item objects.
If there are no items, it returns null.

*/

router.post('/get_all_items', async function(req, res, next) {
  await InventoryItemModel.find({}, function(err, InventoryItemModel) {
    res.json(JSON.stringify(InventoryItemModel));
  });
});

/*

A get item with property payload is as such:

{
  "<property>" : "<property>" // could be something like address, etc.
  "<value>" : "<value>" // could be something like a specific address, etc.
}

get stores with specific properties

*/

router.post('/get_item_with_property', async function(req, res, next) {
  const propertyname = req.body.property;
  await InventoryItemModel.find({propertyname: req.body.value}, function(
      err,
      InventoryItemModel,
  ) {
    res.json(JSON.stringify(InventoryItemModel));
  });
});

module.exports = router;
