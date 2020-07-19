const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../Models/User_Model');
const mongoose = require('mongoose'); 
const secrets = require('../secrets/secrets'); 

var Google_Strategy = new GoogleStrategy({
		clientID: secrets.googleclientid,
		clientSecret: secrets.googlesecretid,
		callbackURL: "http://localhost:4000/auth/google/callback"
	}, 
	function (accessToken, refreshToken, profile, done) {
		let profileInfo = profile._json;
		process.nextTick(() => {
			UserModel.findOne({'Email': profile.emails[0].value}, 
			async (err, user) => {
				if (err)
					return done(err);
				if (user) {
					if (profileInfo.sub == user.googleid) {
						return done(null, user);
					}
					else if (!user.googleid)
					{
						await UserModel.findOneAndUpdate(
							{ _id: user._id },
							{ "googleid": profileInfo.sub }
						);
						await UserModel.findOneAndUpdate(
							{ _id: user._id },
							{ "verifiedemail": profileInfo.email_verified }
						);
						return done(null, user);
					}
					else
					{
						console.log("Error: Mismatch between recorded Google ID and recieved Google ID");
						return done(err);
					}
				} else {
					user = new UserModel({
						Email: profile.emails[0].value,
						username: profileInfo.displayName,
						FirstName: profileInfo.name.given_name,
						LastName: profileInfo.name.family_name,
						googleid: profileInfo.sub, //unique google id
						verifiedemail: profileInfo.email_verified,
						UserType : "USER"
					});
					var password           = '';
					var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-/\\,.<>|\'\"';
					var charactersLength = characters.length;
					for ( var i = 0; i < 36; i++ ) {
						password += characters.charAt(Math.floor(Math.random() * charactersLength));
					}
					await UserModel.register(user, password, async function(err) 
					{
						if (err)
						{
							console.log("Error: ", err);
							//res.json({success:false, message:"Your account could not be saved. Error: ", err}) 
						}
						else
						{
							//res.json({success:true, message:"Authentication successful", User:req.user});
							//res.redirect('http://localhost:4000/SUCCESS');
							return done(null, user);
						} 
					});
				}
			});
		});
	}
)

module.exports=Google_Strategy;