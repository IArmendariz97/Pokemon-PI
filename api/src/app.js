const cookieParser = require("cookie-parser"); // Middleware para analizar cookies en las solicitudes
const bodyParser = require("body-parser"); // Middleware para analizar datos de solicitud (URL-encoded y JSON)
const morgan = require("morgan"); // Middleware para registrar detalles de las solicitudes en la consola

// Router
const routes = require("./routes/index.js"); // Importar rutas definidas
// DB
require("./db.js"); // Importa y ejecuta el archivo ./db.js para establecer la conexión

// Express
const express = require("express"); // Importar
const server = express(); // Crear instancia de la app
server.name = "API"; // Define el nombre

//  Configuracion de middlewars
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); // Analiza datos URL-encoded con límite de tamaño
server.use(bodyParser.json({ limit: "50mb" })); // Analiza datos JSON con límite de tamaño
server.use(cookieParser()); // Analiza y convierte cookies en un objeto JavaScript
server.use(morgan("dev")); // Registra detalles de las solicitudes en la consola en formato 'dev'
// Configuracion de CORS (encabezados de respuestas) Permisos sobre quien puede hacer solicitudes
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Montado de rutas
server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
