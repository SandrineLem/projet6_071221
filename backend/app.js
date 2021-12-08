//importer express
const express = require('express');
//creer l'appli Express 
const app = express();
//importer Mongoose --
const mongoose = require('mongoose');


//connect Mongoose --
mongoose.connect('mongodb+srv://sand:abcde@cluster0.9rb3f.mongodb.net/testretryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
//-----Middleware (fonction)----
app.use((req, res, next)=>{
    console.log('Requête recue!');
    next();//pour passer à la requete suivante 
});
//modification du code de la reponse status 
app.use((req, res, next)=>{
    res.status(201);
    next();
});
//methode app.use (creer une route reponse avec un type de requete  )
app.use((req, res, next)=>{
    res.json({message: 'votre requête à bien été recue!'});
    next();
});
app.use ((req, res)=>{
    console.log('La réponse à été envoyée avec succès !');
});
//exporter l'appli
module.exports = app;