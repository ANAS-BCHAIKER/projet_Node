const User = require('../models/customerSchema');
const moment = require('moment');

const user_index_get = (req, res) => {

    User.find()
        .then((result) => {
            console.log('Users fetched from MongoDB:', result);
            res.render('index', { arr: result, moment: moment });
        })
        .catch((err) => {
            console.log('Error fetching users from MongoDB:', err);
            res.render('index', { arr: [] });
        });
}

const user_edit_get = (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.render('user/edit', { obj: result, moment: moment });
        })
        .catch((err) => {
            console.error(err);
            res.send('User not found');
        });
}

const user_view_get = (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.render('user/view', { obj: result, moment: moment });
        })
        .catch((err) => {
            res.send('User not found');
        });
}

const user_search_post = (req, res) => {

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

}

const user_delete = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.error('Error deleting user from MongoDB:', err);
            res.send('Error deleting user');
        });
}

const user_put = (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.error('Error updating user in MongoDB:', err);
            res.send('Error updating user');
        });
}

const user_add_get = (req, res) => {
    res.render('user/add');
}

const user_post = (req, res) => {
    const user = new User(req.body);

    user.save()
        .then(() => {
            console.log('User saved to MongoDB');
            res.redirect('/');
        })
        .catch((err) => {
            console.error(err);
            res.send('Erreur lors de l’enregistrement');
        });
}

module.exports = {
    user_index_get,
    user_edit_get,
    user_view_get,
    user_search_post,
    user_delete,
    user_put,
    user_add_get,
    user_post
};