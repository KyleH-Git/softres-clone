const express = require("express");
const router = express.Router();
const Account = require("../models/account.js");
const bcrypt = require("bcrypt");

router.post('/sign-in', async(req, res) => {
    const accountExists = await Account.findOne({ accountName: req.body.accountName})
    if(!accountExists) {
        return res.render('/',);
    }

    console.log(accountExists)
    const validPassword = bcrypt.compareSync(
        req.body.password,
        accountExists.password
    );
    if(!validPassword){
        return res.render('/');
    }

    req.session.user = {
        username: accountExists.accountName,
        _id: accountExists._id
    }
    
    // console.log(req.session.user)
    res.redirect('/');
});

router.post('/sign-up', async (req, res) => {
    const accountExists = await Account.findOne({ accountName: req.body.accountName});
    if(accountExists){
        res.render('/');
    }
    if(req.body.password !== req.body.confirmPassword){
        res.render('/');
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    const account = await Account.create(req.body);

    req.session.user = {
        username: account.accountName,
        _id: account._id,
    }

    res.redirect('/');
});

router.get('/sign-out', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;