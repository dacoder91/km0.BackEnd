// Requires, son librerias pesonalizadas o de terceros

const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
const bodyParser = require('body-parser');
const cors = require('cors'); // Lo he desahilitado, mirar nueva forma para habilitar
const nodemailer = require("nodemailer"); // Para controlar los Emails
const path = require('path'); // Para producción

// Inicializar Variables
const app = express();

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json({ limit: '100mb' })); // Para aumentar el límite del bodyparser o dará error de PayloadTooLargeError: request entity too large
app.use(express.urlencoded({ limit: '100mb', extended: true, parameterLimit: 50000 })); // Para aumentar el límite del bodyparser o dará error de PayloadTooLargeError: request entity too large

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// ===============  CORS instalar con: npm install cors ======================
app.use(cors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/km0', { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});

// Importar y usar rutas
const routes = require('./routes');
app.use(routes);

// Escuchar peticiones
app.listen(3016, () => {
    console.log('Express server puerto 3016: \x1b[32m%s\x1b[0m', 'online');
});

