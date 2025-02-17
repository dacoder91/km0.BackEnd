// Requires, son librerias pesonalizadas o de terceros

var express = require('express');
var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
var bodyParser = require('body-parser');

var cors = require('cors'); // Lo he desahilitado, mirar nueva forma para habilitar
// ==========Para controlar los Emails  ======
// instalamos npm install nodemailer
const nodemailer = require("nodemailer");

// =========== PARA PRODUCCION ==========
var path = require('path');
// =======================================

// Inicializar Variables
var app = express();

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

// =====================================================================
//                                   IMPORTAR RUTAS                                  
//======================================================================

// **  AUTH  
let loginRoutes = require('./routes/user/login/login');
let registerRoutes = require('./routes/user/register/register');

//   *** USER  
let usersRoutes = require('./routes/user/user_utils/user_list');
let clubRoutes = require('./routes/club/proyecto');

//=================================================================================================================================
//                                   CREAMOS LAS RUTAS
//================================================================================================================================
app.use('/users', usersRoutes); 
app.use('/club', clubRoutes);

//  ===================== USERS  =======================
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);

// ================================         ESTO ES PARA PRODUCCION                 =====================
app.use('/', express.static('client', { redirect: false }));

app.get('*', function (req, res, next) {
    res.sendFile(path.resolve('client/index.html'));
});

// ========================================================================

// Escuchar peticiones
app.listen(3016, () => {
    console.log('Express server puerto 3016: \x1b[32m%s\x1b[0m', 'online');
});

