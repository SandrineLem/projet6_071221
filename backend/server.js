//creation du programme qui va ecouter et repondre 
const http = require('http');
//importer le fichier app.js 
const app = require('./app');
//informer sur quel port app doit fonctionner enviro ou 3000
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);
// ecoute et attente du serrver
server.listen(process.env.PORT || 3000);