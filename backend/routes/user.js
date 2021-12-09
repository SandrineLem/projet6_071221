//importer express
const express = require('express');
//--creer le router
const router = express.Router();
//importer le controleur 
const userCtrl = require('../controllers/user');

//route post front =>lemail +mdp
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;