const Sauce = require('../models/Sauce');


//---------créé une sauce 

exports.createSauce = (req, res, next)=>{
    //enlever le id de mongooDB du champ de la requête
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
  };

//---------modifier une sauce 

  exports.modifySauce = (req, res, next)=>{
    //utilisation de la fonction updateOne = mettre a jour un objet recuperation id 
    Sauce.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
    .then(()=>res.status(200).json ({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
  };

  //-------supprimer une sauce 

  exports.deleteSauce = (req, res ,next) =>{
    //utilisation deleteOne
    Sauce.deleteOne({ _id: req.params.id})
    .then(()=> res.status(200).json ({ message: ' Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
  };
  //------recuperer une sauce id 

  exports.getOneSauce = (req, res, next)=>{
    //--acces grace au params.id
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json ({ error }));
  };

  //---recuperer toutes les sauces

  exports.getAllSauces = (req, res, next)=>{
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error })); 
 };

