const express = require('express');
const router = express.Router();

const sauceCtrl = require ('../controllers/Sauce');
const auth = require('../middleware/auth');

//---les routes pour le sauces en lien avec les controlers ----
//route post pour recuperer les information de la sauce 
router.post('/', sauceCtrl.createSauce);
//route put pour modifier un objet existant 
  router.put('/:id', sauceCtrl.modifySauce);
//route pour supprimer une sauce 
  router.delete('/:id', sauceCtrl.deleteSauce);
//renvoyer l'identifiant dans url 
  router.get('/:id', sauceCtrl.getOneSauce);
//route pour recuperer toutes les sauces
 router.get('/', sauceCtrl.getAllSauces);

module.exports = router;