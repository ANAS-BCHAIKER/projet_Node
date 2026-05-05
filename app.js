const express = require('express');
const app = express();
const port = 3000;

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

app.get('/', (req, res) => {
    res.sendFile('./view/home.html', { root: __dirname });
});
