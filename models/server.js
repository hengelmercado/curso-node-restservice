const express = require('express')
const cors = require('cors');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.userPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y lectura de el body
        this.app.use( express.json() );

        //Directorio público
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use( this.userPath, require('../routes/usuarios'));   
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }

}


module.exports = Server;