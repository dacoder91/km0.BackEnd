const express = require('express');
var mongoose = require('mongoose')

const app = express();
// const { verificaToken } = require('../../../middlewares/autenticacion')
let Usuario = require('../../../models/usuario/usuarios');

//========================================================================================================
//      Realmente es un get camuflado. 
//      ESTO LO UTILIZAREMOS PARA HACER LAS BUSQUEDAS POR FILTROS QUE NOS LLEGA DESDE EL FRONT
//========================================================================================================
app.put('/', (req, res) => {
    
    var body = req.body;
    // console.log('hemos entrado en put usuario_filtrar y la data es: ',body)
    
    Usuario.find(body).populate('proyecto').populate('provincia').populate('municipio')
        .exec((err, usuario) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar los Usuarios',
                    err
                });
            };
            // console.log('LO HA ENCONTRADO',usuario)
            usuario.sort((a, b) => {
                if (a.municipio.municipio < b.municipio.municipio) return -1;
                if (a.municipio.municipio > b.municipio.municipio) return 1;
                return 0;
              });

            res.json({
                ok: true,
                usuario
            });
        });

});

module.exports = app;