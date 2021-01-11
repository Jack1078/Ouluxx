var express = require('express');
var router = express.Router();

var secrets = require("../secrets");

var Mailchimp = require('mailchimp-api-v3');
var mailchimp = new Mailchimp(secrets.MailChimpApiKey);



/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
	console.log(req.body);
	console.log("Hello");
});

router.post('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

/*
	pass as the body mail = the email of the user we are adding. 
*/

router.post('/mailchimp', function(req, res, next) {
	// get the email address as a variable
	//console.log(req.body);
	const emailaddress = req.body.Email;
	//console.log(emailaddress);
	// first get a list of all the lists in the game. 
	// this function works by calling the "get" function on the mailchimp object with the parameter '/lists'
	// the get function tells us we are using a get call, this is often used for retrieving data. 
	// this method can act as a callback, or as a promise. 
	// the .then function works off of the promise concept. a promise is us telling the code that this happens asynchroneously, and we want something to happen afterwards. 
	// here we create the anonymous function (a function without a name and can be called no where else) with the parameter of results, which is the return value from the promise. 
	mailchimp.get('/lists').then(function(results){
		// check if any list exists
		// if there is no list, we need to create one to store people to it. this checks the list of lists returned and if it is empty (has length of 0), it then goes to create a new list. 
		if(results.lists.length === 0)
		{
			//create a new list
			// this uses the post method rather than the get method. this is siply a different type of request for data. 
			// the first param is path, the second is the dictionary of the list creation parameters, in this case name and what it will be. 
			mailchimp.post('/lists', {name : "Email_List"}).then(function(results){
				// add user to the list
				// this gets the id of the recently created list
				var list_id = results.id;
				// this adds the user to the just created list. 
				mailchimp.post('/lists/'+list_id+'/members', {email_address: emailaddress, status: "subscribed", "merge_fields": {}}).then(function(){
					// this tells the client that it was successful. 
					res.send("Success");
				// the catch function is similar to the then function call. The difference is, catch only happens if there is an error, it occurs after then fails. 
				}).catch(function(err){
					// this is the logging of the error, both printing it server side and sending it to the client. 
					console.log(err);
					res.send(err);
				})
			})
		}
		else
		{
			//add to the list the user. 
			// we have a list, but we need its ID. the ID is sent to us from the results, so we can easily get it. 
			var list_id = results.lists[0].id;
			// this is the same as the add user call before. 
			mailchimp.post('/lists/'+list_id+'/members', {email_address: emailaddress, status: "subscribed", "merge_fields": {}}).then(function(){
					res.send("Success");
				}).catch(function(err){
				console.log(err);
				res.send(err);	
			})
		}
	})
});

module.exports = router;
