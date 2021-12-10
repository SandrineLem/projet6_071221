const Sauce = require('../models/Sauce');
//importer le package de node "filesysteme" pr avoir acces aux operations lié 
//au système de fichier  
const fs = require('fs');

//---recuperer toutes les sauces ------

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error })); 
 };

//------recuperer une sauce id 

exports.getOneSauce = (req, res, next)=> {
    //--acces grace au params.id
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json ({ error }));
  };

//---------créé une sauce ------

exports.createSauce = (req, res, next) => {
    //analyser la chaine et trransformer en objet 
    const sauceObjet = JSON.parse(req.body.sauce);
    //enlever le id de mongooDB du champ de la requête
    delete sauceObjet._Id;
    const sauce = new Sauce({
      ...sauceObjet,
      //générer url de l'image envoyé par multer
      imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0
    });
    //enregistrer l'objet ds la base de donnée methode save()
    sauce.save()
    //reponse 201 good creation 
    .then(()=> res.status(201).json({message: 'Sauce enregistrée !'}))
    //renvoie 400 pour error
    .catch(error => res.status(400).json({ error }));
  };

//---------modifier une sauce-------- 

  exports.modifySauce = (req, res, next)=>{
    //si il y a une nouvelle image req.file
    const sauceObjet = req.file ?
    {
      //recup la chaine de caractere qu'on transf en Objet 
      ...JSON.parse(req.body.sauce),
      //modif l'url image
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
     } : { ...req.body };
    //utilisation de la fonction updateOne = mettre a jour un objet recuperation id 
    Sauce.updateOne({ _id: req.params.id }, {...sauceObjet, _id: req.params.id })
    .then(()=>res.status(200).json ({ message: 'Sauce modifié !'}))
    .catch(error => res.status(400).json({ error }));
  };

  //-------supprimer une sauce 

  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        //extraire le nom et donc prendre le 2eme elmt du tab
      const filename = sauce.imageUrl.split('/images/')[1];
      //utiliser la fonction unlink pour supprimer un fichier
      fs.unlink(`images/${filename}`, () => {
      //supprimer la sauce 
      Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
      .catch(error => res.status(400).json({ error }));
      })
    })
    .catch(error => res.status(500).json({ error }));
  };
  

  

