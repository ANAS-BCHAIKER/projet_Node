const express = require('express');
const router = express.Router();
const moment = require('moment');
const User = require('../models/customerSchema');


//Get routes

router.get("/", (req, res) => {

    User.find()
        .then((result) => {
            console.log('Users fetched from MongoDB:', result);
            res.render('index', { arr: result, moment: moment });
        })
        .catch((err) => {
            console.log('Error fetching users from MongoDB:', err);
            res.render('index', { arr: [] });
        });
});



router.get("/", (req, res) => {

    User.find()
        .then((result) => {
            res.render('index', { arr: result, moment: moment });
        })
        .catch((err) => {
            res.render('index', { arr: [] });
        });
});

router.get('/edit/:id', (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.render('user/edit', { obj: result, moment: moment });
        })
        .catch((err) => {
            res.send('User not found');
        });
});

router.get('/view/:id', (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.render('user/view', { obj: result, moment: moment });
        })
        .catch((err) => {
            res.send('User not found');
        });
});

//Post routes
router.post('/user/add.html', (req, res) => {

    User.create(req.body)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.error('Error saving user to MongoDB:', err);
        });
});

router.post('/search', (req, res) => {

    User.find({
        $or: [{ fireName: { $regex: req.body.search.trim(), $options: 'i' } },
        { lastName: { $regex: req.body.search.trim(), $options: 'i' } }]
    })
        .then((result) => {
            console.log('Search results from MongoDB:', result);
            res.render('index', { arr: result, moment: moment });
        })
        .catch((err) => {
            console.error('Error searching users in MongoDB:', err);
            res.render('index', { arr: [] });
        });

});

router.delete('/edit/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.error('Error deleting user from MongoDB:', err);
            res.send('Error deleting user');
        });
});

// Update route
router.put('/edit/:id', (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.error('Error updating user in MongoDB:', err);
            res.send('Error updating user');
        });
});




module.exports = router;