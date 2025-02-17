

const express = require('express');
const bcrypt = require('bcryptjs');
// Para crear los tokens
// npm install jsonwebtoken --save
const jwt = require('jsonwebtoken');

// Vamos a recuperar la variable SEED que ocupa en config
var SEED = require('../../../config/config').SEED;


// Levantar las variables.
const app = express();


// Ocupar el modelo del usuario
let User = require('../../../models/user/user');


//======================================================
//                LOGIN
//======================================================


app.post('/', (req, res) => {
    let body = req.body;

    User.findOne({$or: [
        {email: body.user},
        {nick: body.user}
    ]}, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error en base de Datos',
                errors: err
            });
        }
        // Ver si existe el correo en la Base de Datos
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                message: 'Email incorrectas',
                errors: err
            });
        }

        //Ver si coincide la contraseña
        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                message: 'Pasword incorrecto',
                errors: err
            });
        }
        // Entramos a la condicion de tod correcto
        usuarioDB.password = 'a$kji8jjdnns90'; // Es unfake, paa que se rompan la cabeza

        // CREAMOS UN TOKEN !!!!!
        // la variable SEED proviene de config
        let token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 43200000 }); // 12h

        res.status(200).json({
            ok: true,
            message: 'Login correcto',
            user: usuarioDB,
            token: token,
            id: userDB._id
        });
    })
});

module.exports = app;
