//Import the User model defined in the user schema to gain access to it's collection
const User = require('../models/user.js');
//Import the Item model defined in the item schema to gain access to it's collection
const Item = require('../models/item.js');

// ***** Define Controllers for Routes/HTTPS Requests *****

// index - display the homepage for site, getting all users who have a stored SR
const index = async (req, res) => {
    const allUsers = await User.find();
    const allItems = await Item.find();
    for(specUser of allUsers){
        specUser.class = specUser.class.charAt(0).toUpperCase() + specUser.class.slice(1);
    }
    const banana = req.session.user;
    console.log(banana);
    res.render('index.ejs', {users: allUsers, items: allItems, loggedIn: banana, banana: 'banana'});
};

// show /users/:userId - display the specified users information
const show = async (req, res) => {
    const specifiedUSer = await User.findById(req.params.userId);
    res.render('mySoftRes.ejs', {user: specifiedUSer});
};

// create /users/newSR - store the data from the req obj in the DB and redirect user to homepage
const create = async (req,res) => {
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
};

// edit /users/:userId/edit - show form to user with data pre filled with their current dB values
const edit = async (req, res) => {
    const specifiedUser = await User.findById(req.params.userId);
    const allItems = await Item.find();
    res.render('edit.ejs', {user: specifiedUser, items: allItems});
};

// update /users/:userId - update users information in DB
const update = async (req, res) => {
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
};

// destroy /users/:userId - remove specified user from DB
const destroy = async (req, res) => {
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
};

module.exports = {
    index,
    show,
    create,
    edit,
    update,
    destroy,
}