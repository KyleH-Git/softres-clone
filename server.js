// ***** Require node modules that will be used for the server *****
//dotenv for creating a way to use .env variables to securely use MongoDB password
const dotenv = require('dotenv');
//run config on our dotenv object to allow us to use .env variables
dotenv.config();
//express to handle routes/paths/endpoints when HTTP requests are made to the server
const express = require('express');
//mongoose to connect to MongoDB to have persistent data
const mongoose = require('mongoose');
//require express-session to store account info in secure cookies
const session = require('express-session');
//methodOverrids to use PUT and DELETE HTTP routes, extended from only READ / CREATE
const methodOverride = require('method-override');
//morgan to display HTTP requests in the terminal as they happen for debugging
const morgan = require('morgan');
//path ?? must be used for express.statc(path.join) but why
const path = require('path');

//require controllers to gain access to their routes
const softresCtrl = require('./controllers/softres.js');
const authCtrl = require('./controllers/auth.js');

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
//telling express app to use session to store account info in the session object
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

// ***** Database Connection + Requiring Models *****
//connecting mongoose object to MongoDB using the .env variable from dotenv
mongoose.connect(process.env.MONGODB_URI);

//print msg to terminal when connection is successful
mongoose.connection.on('connected', () =>{
    console.log(`Connected to MonogoDB ${mongoose.connection.name}`);
});

// ***** Routes *****
// GET / - calls the controller index function
app.get('/', softresCtrl.index);

// GET /users/:userId - calls the controller show function
app.get('/user/:userId', softresCtrl.show);

// POST /users/newSR - calls controller create function
app.post('/createSR', softresCtrl.create);

// GET /users/:userId/edit - calls controller edit function
app.get('/users/:userId/edit', softresCtrl.edit);

// PUT /users/:userId - calls controller update function
app.put('/users/:userId', softresCtrl.update);

// DELETE /users/:userId - calls controller delete function
app.delete('/users/:userId', softresCtrl.destroy);

//tell app to use the authCtrl linked file for any routes starting with /auth
app.use('/auth', authCtrl);

// turn express server on, listening for HTTPS requests made to port 3000 on the host machine
app.listen(3000, () => {
    console.log('Listening on port 3000.');
});