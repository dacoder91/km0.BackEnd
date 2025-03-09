var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var User = require('../../../models/user/user');

var app = express();

// Ruta para verificar el token y activar la cuenta del usuario
app.get('/:token', async (req, res) => {
    var token = req.params.token;
    console.log('token', token);
    var decoded = jwt.verify(token, 'secretKey');
    // En la variable decoded tenemos desencriptado el email y la contraseña del usuario
    // console.log('req.body.email:', decoded.email);
    // console.log('req.body.password:', decoded.password);

    try {
        var user = new User({
            email: decoded.email,
            password: bcrypt.hashSync(decoded.password, 10), // Encriptamos la contraseña
        });

        // Guardamos el usuario recogiendo si ha sido con éxito o con error
        user.save((err, userSave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: ' Error al crear usuario',
                    errors: err
                });
            }
            userSave.password = ':)'; // Para no mostrar la contraseña en la respuesta

            // Recogemos el exito
            res.status(200).json({
                ok: true,
                mensaje: ' Usuario creado con éxito',
                user: userSave
            });

        });
    } catch (err) {
        res.status(400).json({
            ok: false,
            mensaje: 'Token inválido o expirado',
            errors: err
        });
    }
});

module.exports = app;