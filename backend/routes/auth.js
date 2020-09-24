const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const flash = require('connect-flash')
const jwt = require('jsonwebtoken')

const nodemailer = require('nodemailer')
const secrets = require('../secrets/secrets')
const { google } = require('googleapis')
const { OAuth2 } = google.auth

const bcrypt = require('bcrypt')
const saltRounds = 10

const stripe = require('stripe')(
  'sk_test_51H9FkuAbZ4xKEbr326AkRBlO00kQIzg85LhxLvbJbNtBA9pwNgMTuB8LGRSD8cbbMWmHtkgnwlvwDJv8lr1fQCqM00sqtb6R2D'
)
const uuidv4 = require('uuid').v4

const UserModel = require('../models/User_Model')
const ItemModel = require('../models/Item_Model')

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Auth' })
  console.log(req.body)
  console.log('Hello')
})

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'
const url = 'http://localhost:8000/auth/verify?token='
const reseturl = 'http://localhost:8000/auth/reset_password?token='
const supportemail = 'email@email.com'
const secretkey =
  '7BA9089A4146368B9257498CE6DE27C2ABB095B8AA77C4018322F1AB43AB9103'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    clientId: secrets.googleclientid,
    clientSecret: secrets.googlesecretid
  }
})

router.get('/stripesignuptest', function (req, res, next) {
  res.render('stripeonboardtest')
})

router.get('/get-oauth-link', async (req, res) => {
  const state = uuidv4()
  req.session.state = state
  const args = new URLSearchParams({
    state,
    client_id: 'ca_HplvuRXdF4jKizaHRd205mMDXrn5KKQ2',
    scope: 'read_write',
    response_type: 'code'
  })
  const url = 'https://connect.stripe.com/oauth/authorize?' + args.toString()
  return res.send({ url })
})

router.get('/authorize-oauth', async (req, res) => {
  const { code, state } = req.query

  // Assert the state matches the state you provided in the OAuth link (optional).
  if (req.session.state !== state) {
    return res
      .status(403)
      .json({ error: 'Incorrect state parameter: ' + state })
  }

  // Send the authorization code to Stripe's API.
  stripe.oauth
    .token({
      grant_type: 'authorization_code',
      code
    })
    .then(
      async response => {
        const connected_account_id = response.stripe_user_id
        await UserModel.findOneAndUpdate(
          { _id: req.user._id },
          { ConnectedStripeAccountID: connected_account_id }
        )

        // Render some HTML or redirect to a different page.
        return res.redirect(301, '/success.html')
      },
      err => {
        if (err.type === 'StripeInvalidGrantError') {
          return res
            .status(400)
            .json({ error: 'Invalid authorization code: ' + code })
        } else {
          return res.status(500).json({ error: 'An unknown error occurred.' })
        }
      }
    )
})

/*
  Must be logged in to function, the query is the url constant above + the token generated in register
  This verifies the user's email.
*/

router.get('/verify', async function (req, res, next) {
  if (!req.user.verifiedemail) {
    bcrypt.compare(req.query.token, req.user.VerifyEmailToken, async function (
      err,
      result
    ) {
      if (result) {
        await UserModel.findOneAndUpdate(
          { _id: req.user._id },
          { verifiedemail: req.user.VerifyEmailToken === req.query.token }
        )
        await UserModel.findOneAndUpdate(
          { _id: req.user._id },
          { VerifyEmailToken: '' }
        )
        res.json({
          success: true,
          message: 'Verification successful',
          User: req.user
        })
      } else {
        res.json({ success: false, message: 'Verification unsuccessful' })
      }
    })
  } else {
    res.json({
      success: false,
      message: 'Email has already been verified. ',
      User: req.user
    })
  }
})

/*
  Requires email be included in request.

  JSON of the form
  {
    "Email":"<email>"
  }
*/

router.post('/request_reset', async function (req, res, next) {
  await UserModel.findOne({ Email: req.body.Email }, async function (
    err,
    user
  ) {
    if (err) {
      console.log(err)
      res.status(500).json({ message: 'This user does not exist' })
    } else {
      await UserModel.findOneAndUpdate(
        { _id: user._id },
        { resetPasswordExpires: Date.now() + 3600000 }
      )
      const token = jwt.sign(
        { userId: user._id, Email: req.body.email, password: user.password },
        secretkey,
        { expiresIn: '1h' }
      )
      bcrypt.genSalt(saltRounds, async function (err, salt) {
        bcrypt.hash(token, salt, async function (err, hash) {
          await UserModel.findOneAndUpdate(
            { _id: user._id },
            { resetPasswordTokenSalt: salt }
          )
          await UserModel.findOneAndUpdate(
            { _id: user._id },
            { resetPasswordToken: hash }
          )
        })
      })
      const info = await transporter.sendMail({
        from: '"Ouluxx!" <Team@ouluxx.com>', // sender address
        to: user.Email, // list of receivers
        subject: 'Password Reset Request', // Subject line
        text:
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n' +
          reseturl +
          token +
          '\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n',
        html:
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.<br><a href = "' +
          reseturl +
          token +
          '">Please click on this link</a><br><br>If you did not request this, please ignore this email and your password will remain unchanged.<hr><br><h9>You may copy this link and paste it into your browser ' +
          reseturl +
          token +
          '</h9><br>', // html body
        auth: {
          user: 'Team@ouluxx.com',
          refreshToken: secrets.googleoauth2refreshtoken
        }
      })
      res.status(200).json({ message: 'Success' })
    }
  })
})

/*
  This link is auto-generated by the post request /auth/request_reset
*/

router.get('/reset_password', async function (req, res, next) {
  UserModel.findOne(
    {
      resetPasswordToken: req.query.token,
      resetPasswordExpires: { $gt: Date.now() }
    },
    function (err, user) {
      if (!user) {
        res.status(500).json({
          message:
            'This user does not exist, or the password reset token has expired'
        })
      } else {
        res.render('Password_reset', {
          title: 'Password Reset',
          token: req.query.token
        })
      }
    }
  )
})

/*
  does not need to be logged in.
  Gets from a form with 3 parts, password, confirmpassword, and token. The token should not be alterable and should be included from the get request.
  TODO, change to require the email of the user.
  See current form in backend/views/Password_reset.ejs
*/

router.post('/reset_password', async function (req, res, next) {
  console.log(req.body)

  UserModel.findOne(
    { Email: req.body.Email, resetPasswordExpires: { $gt: Date.now() } },
    async function (err, user) {
      if (!user) {
        res.status(500).json({
          message: 'This user does not exist, or the token has expired'
        })
      } else {
        bcrypt.compare(req.body.token, user.resetPasswordToken, async function (
          err,
          result
        ) {
          if (result && req.body.new_password === req.body.confirm_password) {
            await user.setPassword(req.body.new_password)
            await user.save()
            req.login(user, async function (err) {
              if (err) {
                console.log(err)
                res.status(500).json({ message: err + ' error' })
              } else {
                const info = await transporter.sendMail({
                  from: '"Ouluxx!" <Team@ouluxx.com>', // sender address
                  to: user.Email, // list of receivers
                  subject: 'Password Reset', // Subject line
                  text:
                    'You are receiving this because you (or someone else) has reset the password associated with this email account. If this was in error, please reach out to us at ' +
                    supportemail +
                    '. Otherwise, you may ignore this email. \n',
                  html:
                    '<p>You are receiving this because you (or someone else) has reset the password associated with this email account. If this was in error, please reach out to us at <a href = "mailto:' +
                    supportemail +
                    '">' +
                    supportemail +
                    '</a>. Otherwise, you may ignore this email. </p>', // html body
                  auth: {
                    user: 'Team@ouluxx.com',
                    refreshToken: secrets.googleoauth2refreshtoken
                  }
                })
                res.render('index', {
                  title: 'Password Reset'
                }) /* this is effectivcely a redirect*/
              }
            })
          } else {
            res.render('Password_reset', {
              title: 'Password Reset',
              token: req.body.token
            })
          }
        })
      }
    }
  )
})

/*
requires being logged in

requires old password, requires new password, and requires a confirmation password

JSON looks like
{
  "new_password":"<new password>",
  "confirm_password": "<new password>",
  "old_password":"<old password>" // This is optional, it only needs to exist if the password did not already exist.
}

*/

router.post('/change_password', async function (req, res, next) {
  console.log(req.body)
  if (req.user) {
    // logged in
    if (req.body.new_password === req.body.confirm_password) {
      if (req.user.Created_Password) {
        req.user.changePassword(
          req.body.old_password,
          req.body.new_password,
          async function (err) {
            if (err) {
              res.status(500).json({ message: 'Error: ' + err })
            }
            const info = await transporter.sendMail({
              from: '"Ouluxx!" <Team@ouluxx.com>', // sender address
              to: user.Email, // list of receivers
              subject: 'Password Changed', // Subject line
              text:
                'You are receiving this because you (or someone else) has changed the password associated with this email account. If this was in error, please reach out to us at ' +
                supportemail +
                '. Otherwise, you may ignore this email. \n',
              html:
                '<p>You are receiving this because you (or someone else) has reset the password associated with this email account. If this was in error, please reach out to us at <a href = "mailto:' +
                supportemail +
                '">' +
                supportemail +
                '</a>. Otherwise, you may ignore this email. </p>', // html body
              auth: {
                user: 'Team@ouluxx.com',
                refreshToken: secrets.googleoauth2refreshtoken
              }
            })
            res.status(200).json({
              message: 'Password changed'
            }) /* redirect('index', {title:"Password Changed"})*/
          }
        )
      } else {
        await user.setPassword(req.body.new_password)
        await UserModel.findOneAndUpdate(
          { _id: user._id },
          { Created_Password: true }
        )
        await user.save()
        const info = await transporter.sendMail({
          from: '"Ouluxx!" <Team@ouluxx.com>', // sender address
          to: user.Email, // list of receivers
          subject: 'Password Changed', // Subject line
          text:
            'You are receiving this because you (or someone else) has changed the password associated with this email account. If this was in error, please reach out to us at ' +
            supportemail +
            '. Otherwise, you may ignore this email. \n',
          html:
            '<p>You are receiving this because you (or someone else) has reset the password associated with this email account. If this was in error, please reach out to us at <a href = "mailto:' +
            supportemail +
            '">' +
            supportemail +
            '</a>. Otherwise, you may ignore this email. </p>', // html body
          auth: {
            user: 'Team@ouluxx.com',
            refreshToken: secrets.googleoauth2refreshtoken
          }
        })
        res.status(200).json({
          message: 'Password changed'
        }) /* redirect('index', {title:"Password Changed"})*/
      }
    } else {
      res.status(200).json({ message: 'Passwords do not match' })
    }
  } else {
    // not logged in
  }
})

/*
Register a new user, no one may be logged in for this. This is a local login and set up strategy.

JSON request looks like this.
{
"Email": "<email>",
"username": "<Username>",
"password":"<Password>",
"FirstName": "<FirstName>",
"LastName": "<LastName>",
"Address": "<address>",
"City": "<City>",
"State": "<State>",
"Zipcode": "<Zip code>",
"isstore" : <boolean>
}
*/

router.post('/register', async function (req, res) {
  // add and register a user, hashes password
  console.log(req.body)
  if (req.user) {
    res.status(403)
  } else {
    let UserTypeSet = 'USER'
    if (req.body.isstore) {
      UserTypeSet = 'STORE'
    }
    const email = req.body.Email.toLowerCase()
    user = new UserModel({
      Email: email,
      username: req.body.username,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Address: req.body.Address,
      City: req.body.City,
      State: req.body.State,
      Zipcode: req.body.Zipcode,
      UserType: UserTypeSet
    })
    const token = jwt.sign({ userId: user._id, email: email }, secretkey, {
      expiresIn: '672h'
    }) // give 4 weeks for authorizing email
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(token, salt, function (err, hash) {
        user.VerifyEmailTokenSalt = salt
        user.VerifyEmailToken = hash
      })
    })

    await UserModel.register(user, req.body.password, async function (err) {
      if (err) {
        console.log('Error: ', err)
        // res.redirect(303, '/signup'); //! need to add a message along with redirecting back to original page
        res.json({
          success: false,
          message: 'Your account could not be saved. Error: ',
          err
        })
      } else {
        const info = await transporter.sendMail({
          from: '"Ouluxx!" <Team@ouluxx.com>', // sender address
          to: user.Email, // list of receivers
          subject: 'Welcome to Ouluxx!', // Subject line
          text:
            'Welcome to Ouluxx! We hope you have a good time making use of our services. Please use this address to verify your email ' +
            url +
            token, // plain text body
          html:
            '<p>Welcome to Ouluxx! We hope you have a good time making use of our services. Please press this link to verify your email address <a href = "' +
            url +
            token +
            '">HERE</a></p><br><hr><br><h9>Or click here: ' +
            url +
            token +
            '</h9>', // html body
          auth: {
            user: 'Team@ouluxx.com',
            refreshToken: secrets.googleoauth2refreshtoken
          }
        })
        req.login(user, function (err) {
          // TODO
          // if store add redirect for funding details
          res.redirect(303, '/stores') // ! need to add a message along with redirecting back to original page
          // res.json({ success: true, message: "Authentication successful", User: req.user });
        })
      }
    })
  }
})

/*
Log the user in with a local strategy. It returns unauthorized if it fails.
*/

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect(303, '/stores')
    // res.json({ success: true, message: "LOGIN SUCCESS", User: req.user });
  }
)

/*
Logs out the user, does nothing if no user logged in.
*/

router.post('/logout', function (req, res) {
  req.logout()
  res.redirect(303, '/')
  // res.json({ success: true, message: "LOGOUT SUCCESS" });
})

/*
facebook authentication, registers a user and authenticates a user if using the facebook authentication. Also links the accounts if a user is already logged in.
*/

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))

/*
facebook callback login helper.
*/

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:8000/'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log('user.req =', req.user)
    console.log('user.req.email =', req.user.Email)
    // res.json({success:true, message:"Authentication successful", User:req.user});
    // res.redirect('http://localhost:4000/SUCCESS');
    if (!req.user.Email || req.user.Email.includes('@fakemail')) {
      res.redirect('http://localhost:3000/accountpage')
    } else res.redirect('http://localhost:3000/stores')
  }
)

/*
Google authentication, registers a user and authenticates a user if using the Google authentication. Also links the accounts if a user is already logged in.
*/

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

/*
 TODO redirect to frontend address page.
*/

/*
Google authentication helper.
*/

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:8000/'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.body)
    // res.json({success:true, message:"Authentication successful", User:req.user});
    // res.redirect('http://localhost:4000/SUCCESS');
    res.redirect('http://localhost:3000/stores')
  }
)

module.exports = router
