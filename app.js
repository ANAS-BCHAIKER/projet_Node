const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
const allRoutes = require('./routes/allroutes');
const addUserRoutes = require('./routes/addUser');
const userController = require('./controllers/userController');



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



app.use('/', allRoutes);
app.use("/user/add.html",addUserRoutes);