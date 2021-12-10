/* 
var error = new Error("The error message");
error.http_code = 404;
console.log(error);*/


//--------middleware pour enregistrer les images du fronted dans le dossier image--

//configuration multer pour les affichages images 
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg':'jpg',
    'image/png': 'png'
};
//objet de confi pour multer avec diskStorage() pour l'enregistrer sur le disque 
const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, 'images')
    },
    //expliquer quel nom de fichier utiliser 
    filename: (req, file, callback)=>{
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});
//exporter le fichier unique d'image 
module.exports = multer ({ storage }).single('image');