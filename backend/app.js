/*--m'informer des erreurs*/ 
var error = new Error("The error message");
error.http_code = 404;
console.log(error);

//importer express
const express = require('express');
const bodyParser = require('body-parser');
//creer l'appli Express 
const app = express();
//importer Mongoose --
const mongoose = require('mongoose');
//donner accès au chemin du syteme de fichier
const path = require('path');
//pour avoir acces au cors de la requête (intercept ttes les requête qui ont contenttypejson)
app.use(express.json());


const sauceRoutes = require('./routes/Sauce');
//importer les routes pour les utilisateurs
const userRoutes = require('./routes/user');

//connect Mongoose --
mongoose.connect('mongodb+srv://sand:abcde@cluster0.9rb3f.mongodb.net/testretryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//-----Middleware (fonction)----
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Parse le body des requêtes en json
app.use(bodyParser.json());
//importer l'acces au syteme du fichier image 
app.use('/images', express.static(path.join(__dirname, 'images')));
//importation des routers qui contiennent les routes 
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

//exporter l'appli
module.exports = app;