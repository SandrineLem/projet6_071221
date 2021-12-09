//--importer package jsonwebtoken pour verifier les token 
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    //utiliser les bloc try et catch pour gerer les erreurs 
    try{
        //recuperer le token s'il y a la moindre erreur 
        const token = req.headers.authorization.split('')[1]
        //decoder le token utilisation du package jsonwebtoken + fonction verifier
        //Verifier le token + la clef secrete 
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        //extraire la verif si elle echoue 
        const userId = decodedToken.userId;
        //s'il y a un userid on veut verifier qu'elle correspond bien au token 
        if (req.body.userId && req.body.userId !== userId) {
           //renvoyer l'erreur avec throw
           throw 'User ID non valable !';
        }else{
            next();
        }
    }catch (error) {
        //renvoyer le catch(401) pb d'authentification
        res.status(401).json ({ error: error | 'Requête non authentifiée !' });
    }
};