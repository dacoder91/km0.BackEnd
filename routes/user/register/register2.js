var express = require('express');

// para encriptar y comparar contraseñas encriptadas
var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var nodemailer = require('nodemailer');

var path = require('path'); // Asegúrate de importar el módulo path

// Para comparar los tokens
// npm i jsonwebtoken --save
const { verificaToken } = require('../../../middlewares/autenticacion');
const { generateEmailTemplate } = require('./verify_email_design');

var app = express();
app.use(express.json());

// IMPORTAMOS LOS MODELOS
var User = require('../../../models/user/user');

// Configurar Nodemailer
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'km.cero2025@gmail.com',
        pass: 'xmdyeqsydulyeolb'
    }
});

//======================================================
//     COMPRUEBA Y ENVIA EL CORREO DE VERIFICACION
//======================================================

app.post('/', (req, res, next) => {
    var body = req.body; // Extraemos el body
    console.log('body', req.body);
    if (!body.password) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Password is required',
            body
        });
    }
    if (!body.email) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Email is required',
            body
        });
    }

    // Generar un token de verificación con los datos del usuario
    var token = jwt.sign({ email: body.email, password: body.password }, 'secretKey', { expiresIn: '1h' });

    // Generar el contenido del correo electrónico utilizando la plantilla
    var emailContent = generateEmailTemplate(token);

    // Enviar el correo electrónico de verificación
    var mailOptions = {
        from: 'km.cero2025@gmail.com',
        to: body.email,
        subject: 'Verificación de cuenta',
        html: emailContent, // Asegúrate de usar el campo html
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al enviar el correo de verificación',
                errors: error
            });
        } else {
            res.status(200).json({
                ok: true,
                mensaje: 'Correo de verificación enviado. Por favor, verifica tu correo electrónico.'
            });
        }
    });
});

module.exports = app;