const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
const Mydata = require('./models/mydataSchema');
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    Mydata.find()
        .then((result) => {
            res.render('home', { mytitle : "Home Page", arr : result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/index.html', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
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

    res.redirect('/index.html');
});
