const express = require("express");
var cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = 8080;
    this.usuariosPath = "/api/usuarios";

    //Conectar a base de datos
    this.conectarDB();
    // Middlewares
    this.middlewares();
    // Rutas de mi aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //lectura y parseo del body
    this.app.use(express.json());
    //Directorio publico - que usuario pueden acceder que lugares
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios.route"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor coriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
