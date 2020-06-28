var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(req.body);
  console.log("Hello");
});


router.post('/testadd', function(req, res, next) {
	console.log(req.body);
	var obj = new Object();
	obj.hello = "World";
	res.json(JSON.stringify(obj));
});

module.exports = router;
