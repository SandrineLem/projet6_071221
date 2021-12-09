"use strict";

var express = require('express');

var router = express.Router();

var sauceCtrl = require('../controllers/Sauce');

var auth = require('../middleware/auth'); //route post pour recuperer les information de la sauce 


router.post('/', sauceCtrl.createSauce); //route put pour modifier un objet existant 

router.put('/:id', sauceCtrl.modifySauce); //route pour supprimer une sauce 

router["delete"]('/:id'); //renvoyer l'identifiant dans url 

router.get('/:id', function (req, res, next) {
  //acces grace au params.id
  Sauce.findOne({
    _id: req.params.id
  }).then(function (sauce) {
    return res.status(200).json(sauce);
  })["catch"](function (error) {
    return res.status(404).json({
      error: error
    });
  });
}); //route pour recuperer des objet 

router.get('/', function (req, res, next) {
  Sauce.find().then(function (sauces) {
    return res.status(200).json(sauces);
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
});
module.exports = router;