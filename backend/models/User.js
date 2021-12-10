const mongoose = require('mongoose');
//importation de l'ajout npm pour obligé a avoir un utilisateur pour une seule adresse mail 
const uniqueValidator = require('mongoose-unique-validator');
//ajout de la configuration unique pour obligé a ce que se soit pas la meme adresse mail
//
const userSchema = mongoose.Schema({
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true }
});
userSchema.plugin(uniqueValidator);
module.exports= mongoose.model('user', userSchema);