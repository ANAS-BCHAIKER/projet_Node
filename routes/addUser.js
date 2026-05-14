const express = require('express');
const router = express.Router();
const moment = require('moment');
const User = require('../models/customerSchema');





router.get('', (req, res) => {
    res.render('user/add');
});


router.post('', (req, res) => {
    const user = new User(req.body);

    user.save()
        .then(() => {
            console.log('User saved to MongoDB');
            res.redirect('/user/add.html');
        })
        .catch((err) => {
            console.error(err);
            res.send('Erreur lors de l’enregistrement');
        });
});

module.exports = router;