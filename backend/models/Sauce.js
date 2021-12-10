//--importer mongoose
const mongoose = require('mongoose');
//--creer un shema de donnée sauces
const sauceSchema = mongoose.Schema({
    userId:{type: String, required: true},
    name:{type: String, required: true },
    manufacturer:{type: String, required: true },
    description:{type: String, required: true },
    mainPepper:{type: String, required: true },
    imageUrl:{type: String, required: true },
    heat:{type: Number, required: true },
    likes:{type: Number, required: true },
    dislikes:{type: Number, required: true },
    usersLiked:{type: Array, required: true },
    usersDisliked:{type: Array, required: true }
});
//exporter le model methode exports
module.exports = mongoose.model('Sauce', sauceSchema);