const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
var moment = require('moment');
var methodOverride = require('method-override');
app.use(methodOverride('_method'));


//Auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});


//Get routes

app.get("/", (req, res) => {

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

app.get('/user/add.html', (req, res) => {
    res.render('user/add');
});


app.get("/", (req, res) => {

    User.find()
        .then((result) => {
            res.render('index', { arr: result, moment: moment });
        })
        .catch((err) => {
            res.render('index', { arr: [] });
        });
});

app.get('/edit/:id', (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.render('user/edit', { obj: result, moment: moment });
        })
        .catch((err) => {
            res.send('User not found');
        });
});

app.get('/view/:id', (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.render('user/view', { obj: result, moment: moment });
        })
        .catch((err) => {
            res.send('User not found');
        });
});

//Post routes
app.post('/user/add.html', (req, res) => {

    User.create(req.body)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.error('Error saving user to MongoDB:', err);
        });
});

app.delete('/edit/:id', (req, res) => {
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
app.put('/edit/:id', (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.error('Error updating user in MongoDB:', err);
            res.send('Error updating user');
        });
});
//Connexion à la base de données
const mongoose = require('mongoose');
const User = require('./models/customerSchema');
mongoose.connect('mongodb+srv://nodeJS:qYz4ZtwKW6gJRluj@cluster0.udxide4.mongodb.net/all-data?appName=Cluster0')

    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use('/static', express.static(__dirname + '/static'));

app.post('/user/add.html', (req, res) => {
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