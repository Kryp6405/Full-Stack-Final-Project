const express = require('express');
const session = require('express-session');
const app = express();

const Database = require('./database');
const db = new Database();
db.init();

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));
app.use(express.static('styles'));
app.use(express.static('images'));

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.set('view engine', 'pug');

app.use(session({
    secret: 'cmps369',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

app.use((req, res, next) =>{
    if(req.session.user){
        res.locals.user = {
            id: req.session.user.id,
            username: req.session.user.username
        }
    }
    next();
});

app.use('/', require('./routes/accounts'));
app.use('/', require('./routes/contacts'));

app.listen(6405, () => {
   console.log('Server running on port 6405.');
});