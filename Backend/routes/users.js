var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	//this processes the GET request. 
	//this needs to be converted to sanitize the inputs.
	//this also needs to parse the inputs
	//this needs to implement prepared statements for the query
	console.log(req.body);
	res.send("Hello World");
});

router.post('/', function(req, res, next) {
	//this processes the POST request. 
	//this needs to be converted to sanitize the inputs.
	//this also needs to parse the inputs
	//this needs to implement prepared statements for the query
	console.log(req.body);
	var obj = new Object();
	obj.hello = "World";
	console.log(JSON.stringify(obj));
	res.send(JSON.stringify(obj));
});

router.post('/test', function(req, res, next) {
	console.log(req.body);
	var obj = new Object();
	obj.hello = "World";
	res.json(JSON.stringify(obj));
});

module.exports = router;
