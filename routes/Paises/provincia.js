var express = require('express');

// IMPORTAMOS LOS MODELOS
var Provincia = require('../../models/localizacion/provincia');

// PARA VERIFICAR TOKEN Y CAPTAR USUARIO
const { verificaToken } = require('../../middlewares/autenticacion')

var app = express();

//======================================================
//                OBTENER TODOS LAS PROVINCIAS
//======================================================
//  verificaToken,
app.get('/', (req, res, next) => {

    Provincia.find({})
        .exec(
            (err, provincias) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Provincias',
                        errors: err
                    });
                }


                Provincia.collection.countDocuments({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        provincias: provincias,
                        total: conteo
                    });
                });
            })
});


//======================================================
//                CREAR UN NUEVA PROVINCIA
//======================================================

app.post('/', verificaToken, (req, res, next) => {
    var body = req.body;


    var provincia = new Provincia({
        nombre: body.nombre,
        pais: body.pais,
        activo: body.activo,
        municipios: body.municipios// Esto es un Array
    });


    provincia.save((err, provinciaGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: ' Error al crear provincia',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            pais: provinciaGuardado
        });

    });
});

//======================================================
//                ACTUALIZAR UN  provincia
//======================================================

app.put('/:id', verificaToken, (req, res, next) => {
    var id = req.params.id;
    var body = req.body;


    Provincia.findById(id, (err, provincia) => {

        if (!provincia) {
            return res.status(400).json({
                ok: false,
                mensaje: ' El provincia con el id' + id + ' no existe ',
                errors: { mesage: 'No existe un provincia con ese ID' }
            });
        }

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: ' Error al buscar provincia',
                errors: err
            });
        }


        provincia.nombre = body.nombre;
        provincia.activo = body.activo;
        provincia.codigotelf = body.codigotelf;
        provincia.municipios = body.municipios;


        provincia.save((err, provinciaGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: ' Error al actualizar provincia',
                    errors: err
                });
            }
            res.status(201).json({
                ok: true,
                provincias: provinciaGuardado

            });
        });


    });
});

//======================================================
//      BUSCAR  SEGUIMIENTO provincia POR ID DE PAIS
//======================================================

app.get('/:id', verificaToken, (req, res, next) => {

    var id = req.params.id;
    Provincia.find({ pais: id })
        .exec((err, provincias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al encontrar provincia',
                    erros: err
                });
            }
            if (!provincias) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El pais con  el id' + id + 'no Existe',
                    errors: { message: 'No existe ese provincia' }
                })
            }

            res.status(200).json({
                ok: true,
                provincias: provincias
            })
        })
});



module.exports = app;