//importer express
const express = require('express');
//creer l'appli Express 
const app = express();
//methode app.use (creer une route reponse avec un type de requete  )
app.use((req, res)=>{
    res.json({message: 'votre requête à bien été recue!'})
})
//exporter l'appli
module.exports = app;