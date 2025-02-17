// var express = require('./node_modules/express');

const express = require('express');
// IMPORTAMOS LOS MODELOS
const Pais = require('../../models/localizacion/pais');

// PARA VERIFICAR TOKEN Y CAPTAR USUARIO
const { verificaToken } = require('../../middlewares/autenticacion')
const app = express();
//======================================================
//                OBTENER TODOS LOS PAISES
//======================================================

app.get('/', verificaToken, (req, res, next) => {

    Pais.find({})
        .exec(
            (err, paises) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Paises',
                        errors: err
                    });
                }

                Pais.collection.countDocuments({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        paises: paises,
                        total: conteo
                    });
                });
            })
});


//======================================================
//                CREAR UN NUEVO PAIS
//======================================================

app.post('/', verificaToken, (req, res, next) => {
    var body = req.body;


    var pais = new Pais({
        nombre: body.nombre,
        activo: body.activo,
        codigotelf: body.codigotelf,
        provincias: body.provincias// Esto es un Array
    });


    pais.save((err, paisGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: ' Error al crear Pais',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            pais: paisGuardado
        });

    });
});

//======================================================
//                ACTUALIZAR UN  PAIS
//======================================================

app.put('/:id', verificaToken, (req, res, next) => {
    var id = req.params.id;
    var body = req.body;


    Pais.findById(id, (err, pais) => {

        if (!pais) {
            return res.status(400).json({
                ok: false,
                mensaje: ' El pais con el id' + id + ' no existe ',
                errors: { mesage: 'No existe un Pais con ese ID' }
            });
        }

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: ' Error al buscar Pais',
                errors: err
            });
        }


        pais.nombre = body.nombre;
        pais.activo = body.activo;
        pais.codigotelf = body.codigotelf;
        pais.provincias = body.provincias;


        pais.save((err, paisGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: ' Error al actualizar pais',
                    errors: err
                });
            }
            res.status(201).json({
                ok: true,
                estado: paisGuardado

            });
        });


    });
});

//======================================================
//      BUSCAR  SEGUIMIENTO PAIS POR ID
//======================================================

app.get('/:id', verificaToken, (req, res, next) => {

    var id = req.params.id;
    Pais.findById(id, (err, pais) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al encontrar Pais',
                erros: err
            });
        }
        if (!pais) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El pais con  el id' + id + 'no Existe',
                errors: { message: 'No existe ese pais' }
            })
        }

        res.status(200).json({
            ok: true,
            pais: pais
        })
    })
});



module.exports = app;