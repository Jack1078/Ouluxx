const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const UserModel = require('../models/User_Model')
const mongoose = require('mongoose')
const secrets = require('../secrets/secrets')

const Strategy = new FacebookStrategy(
  {
    clientID: secrets.facebookclientid,
    clientSecret: secrets.facebooksecretid,
    callbackURL: 'http://localhost:8000/auth/facebook/callback',
    profileFields: ['email', 'id', 'first_name', 'last_name']
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(() => {
      console.log(profile)
      const useremail = profile.email || profile.emails[0].value
      UserModel.findOne(
        {
          Email: useremail
        },
        async (err, user) => {
          if (err) return done(err)
          if (user) {
            if (profile.id == user.facebookid) {
              return done(null, user)
            } else if (!user.facebookid) {
              await UserModel.findOneAndUpdate(
                {
                  _id: user._id
                },
                {
                  facebookid: profile.id
                }
              )
              return done(null, user)
            } else {
              console.log(
                'Error: Mismatch between recorded Facebook ID and recieved Facebook ID'
              )
              return done(err)
            }
          } else {
            if (!useremail) {
              let email = ''
              var characters =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-/\\,.<>|\'"'
              var charactersLength = characters.length
              for (var i = 0; i < 36; i++) {
                email += characters.charAt(
                  Math.floor(Math.random() * charactersLength)
                )
              }
              email += '@fakemail.com'
              user = new UserModel({
                Email: email,
                facebookid: profile.id,
                FirstName: profile.name.givenName,
                LastName: profile.name.familyName,
                Created_Password: false,
                UserType: 'USER'
              })
            } else {
              user = new UserModel({
                Email: useremail,
                facebookid: profile.id,
                FirstName: profile.name.givenName,
                LastName: profile.name.familyName,
                Created_Password: false,
                UserType: 'USER'
              })
            }

            let password = ''
            var characters =
              'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-/\\,.<>|\'"'
            var charactersLength = characters.length
            for (var i = 0; i < 36; i++) {
              password += characters.charAt(
                Math.floor(Math.random() * charactersLength)
              )
            }
            await UserModel.register(user, password, async function (err) {
              if (err) {
                console.log('Error: ', err)
                // res.json({success:false, message:"Your account could not be saved. Error: ", err})
              } else {
                // res.json({success:true, message:"Authentication successful", User:req.user});
                // res.redirect('http://localhost:8000/SUCCESS');
                return done(null, user)
              }
            })
          }
        }
      )
    })
  }
)

module.exports = Strategy
