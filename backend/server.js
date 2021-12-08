//creation du programme qui va ecouter et repondre 
const http = require('http');
const { type } = require('os');
//importer le fichier app.js 
const app = require('./app');
//--fonction qui renvoie un port valide ( en numero/chaine ) 
const normalizePort = val =>{
    const port = parseInt(val, 10);

    if (isNaN(port)){
        return val;
    }
    if (port >=0){
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set ('port', port);
//--Fonction qui recherche les errors et les geres puis enregistre dans le server
//--Ajout d'un ecouteur d'evenement 'listening' pour voir sur quel canal/ server s'exécute la console 
const errorHandler = error => {
    if (error.syscall !== 'listen'){
        throw error;
    };
    const address = server.address();
    const bind = typeof address ==='string' ? 'pipe' + address : 'port: ' + port;
    switch(error.code){
        case 'EACCES':
            console.log(bind + 'requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind +' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};


const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () =>{
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console .log('listening on ' + bind); 
});
// ecoute et attente du serrver
server.listen(port);