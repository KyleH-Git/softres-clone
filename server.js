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


//Import the item DB to use in routes

// ***** Define Controllers for Routes/HTTPS Requests *****

// GET / - display the homepage for site, getting all users who have a stored SR
app.get('/', async (req, res) => {
    const allUsers = await User.find();
    const allItems = await Item.find();
    for(specUser of allUsers){
        specUser.class = specUser.class.charAt(0).toUpperCase() + specUser.class.slice(1);
    }
    res.render('index.ejs', {users: allUsers, items: allItems});
});

// GET /users/:userId - display the specified users information
app.get('/user/:userId', async (req, res) => {
    const specifiedUSer = await User.findById(req.params.userId);
    res.render('mySoftRes.ejs', {user: specifiedUSer});
});

// POST /users/newSR - store the data from the req obj in the DB and redirect user to homepage
app.post('/createSR', async (req,res) => {
    let tempItems = [];
    const allItems = await Item.find();
    for(item of allItems){
        if(req.body.softresd.includes(item._id)){
            tempItems.push(item.name);
            console.log(req.body.username)
            await Item.findByIdAndUpdate(item._id, {
                $push: { softresdby: req.body.username}
            });
        }
    }
    req.body.softresd = tempItems;
    await User.create(req.body);
    res.redirect('/');
});

// GET /users/:userId/edit - show form to user with data pre filled with their current dB values
app.get('/users/:userId/edit', async (req, res) => {
    const specifiedUser = await User.findById(req.params.userId);
    const allItems = await Item.find();
    res.render('edit.ejs', {user: specifiedUser, items: allItems});
});

// PUT /users/:userId - update users information in DB
app.put('/users/:userId', async (req, res) => {
    let tempItems = [];
    const specifiedUser = await User.findById(req.params.userId);
    const allItems = await Item.find();
    for(item of allItems){
        if(item.softresdby.includes(specifiedUser.username)){
            await Item.findByIdAndUpdate(item._id, {
                $pull: {softresdby: specifiedUser.username}
            })
        }
    }
    for(item of allItems){
        if(req.body.softresd.includes(item._id)){
            tempItems.push(item.name);
            await Item.findByIdAndUpdate(item._id, {
                $push: { softresdby: req.body.username}
            });
        }
    }
    req.body.softresd = tempItems;
    await User.findByIdAndUpdate(req.params.userId, req.body);
    res.redirect('/');
});

// DELETE /users/:userId - remove specified user from DB
app.delete('/users/:userId', async (req, res) => {
    const specifiedUser = await User.findById(req.params.userId);
    const allItems = await Item.find();
    for(item of allItems){
        if(item.softresdby.includes(specifiedUser.username)){
            await Item.findByIdAndUpdate(item._id, {
                $pull: {softresdby: specifiedUser.username}
            })
        }
    }
    await User.deleteOne({_id: specifiedUser._id});
    res.redirect('/');
});

// turn express server on, listening for HTTPS requests made to port 3000 on the host machine
app.listen(3000, () => {
    console.log('Listening on port 3000.');
});