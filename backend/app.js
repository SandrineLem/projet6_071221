//importer express
const express = require('express');
//creer l'appli Express 
const app = express();
//pour avoir acces au cors de la requête (intercept ttes les requête qui ont contenttypejson)
app.use(express.json());

//importer Mongoose --
const mongoose = require('mongoose');

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
app.post('/api/sauces', (req, res, next)=>{
  //enlever le id du champ de la requête
  delete req.body._Id;
  const sauce = new Sauce({
    ...req.body
  });
  //enregistrer l'objet ds la base de donnée methode save()
  sauce.save()
  //reponse 201 good creation 
  .then(()=> res.status(201).json({message: 'Objet enregistré !'}))
  //renvoie 400 pour error
  .catch(error => res.status(400).json({ error }));
});
app.get('/api/sauces', (req, res, next)=>{
   Sauce.find()
   
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

app.use('/api/auth', userRoutes);
//--fin Middleware--


//exporter l'appli
module.exports = app;