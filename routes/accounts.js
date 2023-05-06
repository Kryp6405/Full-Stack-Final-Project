const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const sign_up_page = async (req, res) => {
    res.render('sign_up',{title: 'Sign Up'});
}

const add_user = async (req, res) => {
    const username = req.body.username.trim();
    const pass = req.body.password.trim();
    const conf_pass = req.body.confirm_password.trim();

    if(pass != conf_pass){
        res.render('sign_up',{title: 'Sign Up', message: 'Passwords do not match!'});
        return;
    }
    
    const user = await req.db.getUserByUsername(username);
    if(user){
        res.render('sign_up',{title: 'Sign Up', message: 'This username/account already exists!'});
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(pass, salt);
    const id = await req.db.createUser(req.body, username, hashPass);
    req.session.user = await req.db.getUserByID(id);

    res.redirect('/');
}

const login_page = async (req, res) => {
    res.render('login',{title: 'Login'});
}

const login_user = async (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const user = await req.db.getUserByUsername(username);
    if(user && bcrypt.compareSync(password, user.password)){
        req.session.user = user;
        res.redirect('/');
        return;
    }

    else{
        res.render('login', {title: 'Login', message: 'Invalid account credentials, try again!'});
        return;
    }
}

const logout_user = async(req, res) => {
    req.session.user = undefined;
    res.redirect('/');
}

router.post('/add_user', add_user);
router.post('/login_user', login_user);
router.get('/login', login_page);
router.get('/sign_up', sign_up_page);
router.get('/logout', logout_user);

module.exports = router;