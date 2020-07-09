var express = require('express');
var router = express.Router();



/*
https://github.com/mysqljs/mysql#escaping-query-values


input sanitization
var userId = 'some user provided value';
var sql    = 'SELECT * FROM users WHERE id = ' + connection.escape(userId);
connection.query(sql, function (error, results, fields) {
  if (error) throw error;
  // ...
});


*/

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
/**/
// TODO work on get and post requests
router.get('/', function(req, res, next) {
	//this processes the GET request. 
	//this needs to be converted to sanitize the inputs.
	//this also needs to parse the inputs
	//this needs to implement prepared statements for the query
	//console.log(req);
	//console.log(res);
	//console.log(next);
	//console.log("Hello World");
 	/*connection.query('SELECT * from transactions', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});*/
	console.log(req.body);
	res.send("Hello World");
});


router.post('/', function(req, res, next) {
	//this processes the POST request. 
	//this needs to be converted to sanitize the inputs.
	//this also needs to parse the inputs
	//this needs to implement prepared statements for the query
	//console.log(req);
	//console.log(res);
	//console.log(next);
	//console.log("Hello World");
 	/*connection.query('SELECT * from transactions', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify(results));
	});*/
	console.log(req.body);
	var obj = new Object();
	obj.hello = "World";
	console.log(JSON.stringify(obj));
	res.send(JSON.stringify(obj));
});

router.post('/test', function(req, res, next) {
	console.log(req.body);
	console.log("aaaaaaaaaaaaaaa");
	var obj = new Object();
	obj.hello = "World";
	res.json(JSON.stringify(obj));
});





/**/


module.exports = router;
