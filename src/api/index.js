let express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
let path = require('path');
let cors = require('cors');
let bodyParser = require('body-parser');

app.use(cookieParser());

let mongoose = require('mongoose');

const User = require('./model/user');

const listingRoute = require('./routes/listing.routes')
const authRoute = require('./routes/auth')

const jwt = require('jsonwebtoken');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// use dotenv to read .env file and config variables
if(process.env.NODE_ENV != 'production'){
  require('dotenv').config();
}


mongoose.connect(process.env.CONNECTION_STRING)
  .then((res) => {
    console.log("Connected to mongoDB");
  }).catch(() => {
    console.log("Connection to MongoDB Failed")
});

app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(cors());

// API root
app.use('/api', listingRoute)
app.use('/api/auth', authRoute )


// PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Listening on port ' + port)
})
