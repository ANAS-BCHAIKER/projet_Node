const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
const Mydata = require('./models/mydataSchema');
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




app.get("/", (req, res) => {

    res.render('index', { });

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

//Connexion à la base de données
const mongoose = require('mongoose');
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

app.post('/', (req, res) => {
    console.log(req.body);

    const myData = new Mydata(req.body);
    myData.save()
        .then(() => {
            console.log('Data saved to MongoDB');
        })
        .catch((err) => {
            console.error('Error saving data to MongoDB:', err);
        });

    res.redirect('/enregistrement.html');
});
