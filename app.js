const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

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

    res.render('index', {});

});

app.get('/user/add.html', (req, res) => {
    res.render('user/add');
});

app.get('/user/view.html', (req, res) => {
    res.render('user/view');
});

app.get('/user/edit.html', (req, res) => {
    res.render('user/edit');
});

//Post routes
app.post('/', (req, res) => {

    const user = new User(req.body);
    user.save()
        .then(() => {
            console.log('User saved to MongoDB');
        })
        .catch((err) => {
            console.error('Error saving user to MongoDB:', err);
        });
    res.redirect('/user/add.html');
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