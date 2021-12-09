//--importer mongoose
const mongoose = require('mongoose');
//--creer un shema de donnée sauces
const sauceSchema = mongoose.Schema({
    userId:{type: string, required: true},
    name:{type: string, required: true },
    manufacturer:{type: string, required: true },
    description:{type: string, required: true },
    mainPepper:{type: string, required: true },
    imageUrl:{type: string, required: true },
    heat:{type: Number, required: true },
    likes:{type: Number, required: true },
    dislikes:{type: Number, required: true },
    usersLiked:{type: ["string<userId>"], required: true },
    usersDisliked:{type: ["string<userId>"], required: true },
});
//exporter le model methode exports
module.exports = mongoose.model('Sauce', sauceSchema);