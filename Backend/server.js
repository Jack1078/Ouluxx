const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const createError = require('http-errors');
var session = require("express-session");

const mongoose = require('mongoose')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('./config/google_strategy');
var FacebookStrategy = require('./config/facebook_strategy');
const flash = require('connect-flash');

var nodemailer = require('nodemailer');
const secrets = require('./secrets/secrets'); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var storeRouter = require('./routes/store');
var inventoryRouter = require('./routes/inventory');
var authRouter = require('./routes/auth');
var purchaseRouter = require('./routes/purchase');

const User = require('./Models/User_Model');
const port = process.env.PORT || 8000;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());

// configure passport middleware
app.use(session({
  secret: '7BA9089A4146368B9257498CE6DE27C2ABB095B8AA77C4018322F1AB43AB9103', resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id); //user.id is the id from Mongo
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
    .catch((err) => done('pass')); //you should use catch like this
});

passport.deserializeUser((obj, done) => {
  User.deserializeUser();
});

passport.use(User.createStrategy()); // local strategy
passport.use(FacebookStrategy); // facebook strategy
passport.use(GoogleStrategy); // google strategy

app.use(express.static(path.join(__dirname, 'public')));

//create connection to DB

const url = 'mongodb://127.0.0.1:27017/Ouluxx'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

app.use('/', indexRouter);
app.use('/store', storeRouter);
app.use('/inventory', inventoryRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/purchase', purchaseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;