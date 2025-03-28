const express = require("express");
const router = express.Router();
const Account = require("../models/account.js");
const bcrypt = require("bcrypt");

router.post('/sign-in', async(req, res) => {
    const accountExists = await Account.findOne({ accountName: req.body.accountName})
    if(!accountExists) {
        return res.redirect('/');
    }

    console.log(accountExists)
    const validPassword = bcrypt.compareSync(
        req.body.password,
        accountExists.password
    );
    console.log('afer pass check')
    if(!validPassword){
        return res.redirect('/');
    }

   

    req.session.user = {
        username: accountExists.accountName,
        _id: accountExists._id,
    }
    
    // console.log(req.session.user)
    res.redirect('/');
});

router.post('/sign-up', async (req, res) => {
    const accountExists = await Account.findOne({ accountName: req.body.accountName});
    console.log(accountExists)
    if(accountExists){
        return res.redirect('/');
    }

    console.log('passwordcheck')
    if(req.body.password !== req.body.confirmPassword){
        return res.redirect('/');
    }

    console.log('hasing password')
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    const account = await Account.create(req.body);

    console.log('made user')
    
    
    req.session.user = {
        username: account.accountName,
        _id: account._id,
    }
    console.log('saved sessionid')
    res.redirect('/');
});

router.get('/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;