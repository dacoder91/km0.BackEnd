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
    
    if(body.email !=undefined){
        var log = { email: body.email };
    }
    if(body.nick != undefined && body.email == undefined){
        var log = { nick: body.nick };  
    }
    if(body.email == undefined && body.nick == undefined){
        return res.status(400).json({
            ok: false,
            message: 'No se de quien hablas',
            errors: { message: 'No se de quien hablas' }
        });
    }


    User.findOne(log, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error en base de datos',
                errors: err
            });
        }
        // Ver si existe el correo en la base de datos
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario o contraseña incorrectos',
                errors: { message: 'Usuario no encontrado' }
            });
        }

        // Ver si coincide la contraseña
        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario o contraseña incorrectos',
                errors: { message: 'Contraseña incorrecta' }
            });
        }

        // Entramos a la condición de todo correcto
        

        // CREAMOS UN TOKEN !!!!!!
        // la variable SEED proviene de config
        let token = jwt.sign({ usuario: userDB }, SEED, { expiresIn: 43200000 }); // 12h
        User.findByIdAndUpdate(userDB._id, { lastAccessDate: new Date() }, { new: true }, (err, userDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error en base de datos',
                    errors: err
                });
            }
            userDB.password = 'a$kji8jjdnns90'; // Es un fake, para que se rompan la cabeza los hackers
            res.status(200).json({
                ok: true,
                message: 'Login correcto',
                user: userDB,
                token: token,
                id: userDB._id
            });
        });
        
    });
});

module.exports = app;
