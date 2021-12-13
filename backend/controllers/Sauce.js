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

  //-----------Liker une sauce 

  exports.likeSauce = (req, res, next) => {
    const userId = req.body.userId;
    const sauceId = req.params.id;
    const like = req.body.like;
    Sauce.findOne({ _Id: sauceId})
      .then(sauce => {
        const avisSauce = {
          usersLiked : sauce.userLiked,
          usersDisliked : sauce.usersDisliked,
          likes : 0,
          dislikes : 0
        }
        switch (avis) {
          // Ajout d' avis like (aime)
          case 1: 
            avisSauce.usersLiked.push(userId);
            break;
          // Ajout d' avis Dislike (aime pas )
          case -1:
            avisSauce.usersDisliked.push(userId);
          // Aucun des deux ni like ni dislike 
          case 0 :
          // si pas de like (aime)
            if (avisSauce.usersLiked.includes(userId)){
              const index = avisSauce.usersLiked.indexOf(userId);
              //suppression du like 
              avisSauce.usersLiked.splice(index, 1);
            }else{
            //si pas de dislike (aime pas)
              const index = avisSauce.usersDisliked.indexOf(userId);
              //suppression du dislike
              avisSauce.usersDisliked.splice(index, 1);
            }
             break;   
        };
        //Afficher le nombre total de like (aime) et de Dislike (aime pas)
        // Afficher Nbre de like 
        avisSauce.likes = avisSauce.usersLiked.length;
        // Afficher Nbre de like
        avisSauce.dislikes = avisSauce.usersDisliked.length;
        //sauvegarder l'avisSauce dans la Sauce
        Sauce.updateOne({ _id: sauceId}, avisSauce)
        .then(() => res.status(200).json ({ message: 'La Sauce a bien été notée!'}))
        .catch(error => res.status(400).json({ error }))
      })
      .catch(error => res.status(500).json ({ error}));
  };
  

  

