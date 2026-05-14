const express = require('express');
const router = express.Router();
const moment = require('moment');
const User = require('../models/customerSchema');
const userController = require('../controllers/userController');



//Get routes

router.get("/", userController.user_index_get);

router.get("/edit/:id", userController.user_edit_get);

router.get('/view/:id', userController.user_view_get);

//Post routes
router.post('/search', userController.user_search_post);

router.delete('/edit/:id', userController.user_delete);

// Update route
router.put('/edit/:id', userController.user_put);



module.exports = router;