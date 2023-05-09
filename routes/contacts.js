const express = require('express');
const router = express.Router();
const geo = require('node-geocoder');
const geocoder = geo({ provider: 'openstreetmap' });

const logged_in = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send("Not authorized");
    }
}

const home_page = async (req, res) => {
    const contacts = await req.db.getContacts();
    res.render('home',{title: 'Contact List', contacts: contacts, user: req.session.user});
};

router.get('/contacts', async (req,res) => {
    const contacts = await req.db.getContacts();
    res.json({contacts: contacts, user: req.session.user})
});

const add_contact = async(req, res) => {
    const contact = req.body; 
    const result = await geocoder.geocode({
        streetName: contact.street,
        city: contact.city,
        state: contact.state,
        country: contact.country,
        zipcode: contact.zip
    });
    //const result = await geocoder.geocode(String(req.body.street) + ", " + String(req.body.city) + " " + String(req.body.state));
    if(result.length > 0) {
        console.log('Result', result);
        console.log(`The location of ${result[0].formattedAddress} is ${result[0].latitude}/${result[0].longitude}`)
        const id = await req.db.createContact(req.body, result[0].formattedAddress, result[0].latitude, result[0].longitude);
        res.redirect('/');
    }
    else{
        console.log('No address', result);
        res.render('create_contact',{error: 'Address not found! Try Again.'});
    }
}

const create_contact_page = async (req, res) => {
    res.render('create_contact',{title: 'Create Contact', user: req.session.user});
};

const open_contact_page = async (req, res) => {
    if(Number.isInteger(Number.parseInt(req.params.id))){
        const contact = await req.db.getContactByID(req.params.id);
        res.render('contact_info',{title: "Contact Info", contact: contact[0], user: req.session.user});
    }
};

const update_contact = async (req, res) => {
    const contact = req.body;
    await req.db.updateContact(contact, req.params.id);
    res.redirect('/');
}

const remove_contact = async (req, res) => {
    const contact = await req.db.getContactByID(req.params.id);
    await req.db.deleteContact(contact[0]);
    res.redirect('/');
}

router.get('/', home_page);
router.get('/create', create_contact_page);
router.post('/add_contact', add_contact);
router.get('/:id', open_contact_page);
router.post('/:id/update_contact', logged_in, update_contact);
router.post('/:id/remove_contact', logged_in, remove_contact);

module.exports = router;