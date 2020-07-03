var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
	console.log(req.body);
});

router.post('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
	console.log(req.body);
	console.log("Hello_POST");
	var obj = new Object();
	obj.hello = "World";
	console.log(JSON.stringify(obj));
});

module.exports = router;
