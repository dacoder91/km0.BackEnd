const express = require('express');
// var mongoose = require('mongoose');

const app = express();
// IMPORTAMOS LOS MODELOS
var User = require('../../../models/user/user');

//======================================================
//                  LISTADO DE USUARIOS
//======================================================

app.get('/', (req, res) => {
    User.find({})
        .exec((err, user) => {
            if (err) {
                console.log('ERROR AL CARGAR USUARIOS',err)
                return res.status(500).json({
                    ok: false,
                    message: 'Error al cargar los Usuarios',
                    err
                });
            };
            res.json({
                ok: true,
                user
            });
        });

});


module.exports = app;


         
