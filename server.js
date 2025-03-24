// ***** Require node modules that will be used for the server *****
//dotenv for creating a way to use .env variables to securely use MongoDB password
const dotenv = require('dotenv');
//run config on our dotenv object to allow us to use .env variables
dotenv.config();
//express to handle routes/paths/endpoints when HTTP requests are made to the server
const express = require('express');
//mongoose to connect to MongoDB to have persistent data
const mongoose = require('mongoose');
//methodOverrids to use PUT and DELETE HTTP routes, extended from only READ / CREATE
const methodOverride = require('method-override');
//morgan to display HTTP requests in the terminal as they happen for debugging
const morgan = require('morgan');
//path ?? must be used for express.statc(path.join) but why
const path = require('path');

//initialize a new express object called app to call express module functions
const app = express();

// ***** Middleware *****
// app.use(express.static('public')); //what is difference between this and other path?
app.use(express.urlencoded({extended: false}));
//telling express app to use methodOverride module to add PUT and DELETE routes when queried
app.use(methodOverride('_method'));
//telling express app to use morgan to display HTTP requests in terminal as they occur
app.use(morgan('dev'));
//telling express app to look in the public folder for styles, but how/why?
app.use(express.static(path.join(__dirname, 'public')));


// ***** Database Connection + Requiring Models *****
//connecting mongoose object to MongoDB using the .env variable from dotenv
mongoose.connect(process.env.MONGODB_URI);

//print msg to terminal when connection is successful
mongoose.connection.on('connected', () =>{
    console.log(`Connected to MonogoDB ${mongoose.connection.name}`);
});

//Import the User model defined in the user schema to gain access to it's collection
const User = require('./models/user.js');

//Import the Item model defined in the item schema to gain access to it's collection
const Item = require('./models/item.js');

// ***** Define Controller for Routes/HTTPS Requests *****

// GET / - display the homepage for site, getting all users who have a stored SR
app.get('/', async (req, res) => {
    const allUsers = await User.find();
    const allItems = await Item.find();
    res.render('index.ejs', {users: allUsers, items: allItems});
});


// turn express server on, listening for HTTPS requests made to port 3000 on the host machine
app.listen(3000, () => {
    console.log('Listening on port 3000.');
});