//--importer le package de cryptage pour les mdp
const bcrypt = require('bcrypt');
//importer le package de creer des token et de les verifier
const jwt = require('jsonwebtoken');
//--recuperer le model User
const User = require('../models/User');
require('dotenv').config();

//--preparation de nouveaux utilisateurs
//--fonction signup ---Enregistrement de nx utilisateur 
exports.signup = (req, res, next)=>{
    //hacher le mdp methode hash()
    bcrypt.hash(req.body.password, 10)
    //enregistrer dans la base de donnée
    .then(hash =>{
        const user = new User({
            email: req.body.email,
            password: hash
        });
        //enregistrement
        user.save()
            //code 201 pr creation de ressource
            .then(() => res.status(201).json({message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
    })
    //renvoie code (500) erreur serveur
    .catch(error => res.status(500).json({ error }));
};


//--Fonction login pour connecter les utilisateurs existant
exports.login = (req, res, next) =>{
    //--utiliser la methode findOne pour chercher l'utilisateur
  User.findOne({ email: req.body.email })
    .then(user => {
        //si user existe pas code 401 non autoriser
        if (!user){
            return res.status(401).json ({ error: 'Utilisateur non trouvé !'});
        }
        //comparer le mdp trouvé de l'utilisateur avec le hash dans user
        bcrypt.compare(req.body.password, user.password)
            .then(valid =>{
               //si la comparaison est pas valable 
               if (!valid) {
                return res.status(401).json ({ error: 'Mot de passe incorrect !'});   
               }
               //sinon renvoyer ok (200) et renvoyer l'obej avec userId 
               res.status(200).json({
                   userId: user._id,
                   //--appele la fonction sign 
                   token: jwt.sign(
                    //données que l'on souhaite encoder 
                    { userId: user._id },
                    //ajout du secret token via dotenv
                    process.env.secret_token,
                    //expiration
                    { expiresIn: '24h' }
                   )
                });
                /*/req.session.token = newToken;
                res.status(200).json({
                    userId: user._id,
                    token: newToken
                })*/
            })    
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};