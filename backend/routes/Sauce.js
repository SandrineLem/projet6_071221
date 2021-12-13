 
var error = new Error("The error message");
error.http_code = 404;
console.log(error);

const express = require('express');
const router = express.Router();

const sauceCtrl = require ('../controllers/Sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


//---les routes pour le sauces en lien avec les controlers ----




//recuperer toutes les sauces
router.get('/', auth, multer, sauceCtrl.getAllSauces);
//renvoyer l'identifiant dans url 
router.get('/:id', auth, sauceCtrl.getOneSauce);
//recuperer les information de la sauce 
router.post('/', auth, multer, sauceCtrl.createSauce);
//route put pour modifier une sauce 
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
//route pour supprimer une sauce 
router.delete('/:id', auth, sauceCtrl.deleteSauce);
//route pour ( like / Dislike ) avis aime ou aime pas la sauce 
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;