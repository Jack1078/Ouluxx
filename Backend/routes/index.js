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
	var emailaddress = req.body.email;
	mailchimp.get('/lists').then(function(results){
		if(results.lists.length === 0)
		{
			//create a new list
			mailchimp.post('/lists', {name : "Email_List"}).then(function(results){
				// add user to the list
				var list_id = results.id;
				mailchimp.post('/lists/'+list_id+'/members', {email_address: emailaddress, status: "subscribed", "merge_fields": {}}).then(function(){
					res.send("Success");
				}).catch(function(err){
					console.log(err);
					res.send(err);
				})
			})
		}
		else
		{
			//add to the list the user. 
			var list_id = results.lists[0].id;
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
