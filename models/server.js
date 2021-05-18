const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.userPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Conectar a base de datos
        this.connectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    async connectarDB(){
        await dbConnection();
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
        this.app.use( this.authPath, require('../routes/auth'));   
        this.app.use( this.userPath, require('../routes/usuarios'));   
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }

}


module.exports = Server;