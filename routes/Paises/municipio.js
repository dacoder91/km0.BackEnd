const express = require('express');

// IMPORTAMOS LOS MODELOS
var Municipio = require('../../models/localizacion/municipio');

// PARA VERIFICAR TOKEN Y CAPTAR USUARIO
const { verificaToken } = require('../../middlewares/autenticacion')

var app = express();

//======================================================
//                OBTENER TODOS LAS MUNICIPIOS
//======================================================

app.get('/', (req, res, next) => {

    Municipio.find({})
        .exec(
            (err, municipio) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Provincias', //es --> en, mensaje --> message
                        errors: err
                    });
                }

                Municipio.collection.countDocuments({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        municipio: municipio,
                        total: conteo
                    });
                });
            })
});

//======================================================
//      BUSCAR MUNICIPIO SEGUN ID DE PROVINCIA
//======================================================

app.get('/:id',  (req, res, next) => {
    var id = req.params.id;
    Municipio.find({ provincia: id })
        .exec((err, municipios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al encontrar municipios', //es --> en, mensaje --> message
                    erros: err
                });
            }
            if (!municipios) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El pais con  el id' + id + 'no Existe', //es --> en, mensaje --> message
                    errors: { message: 'No existe ese municipio' }
                })
            }

            res.status(200).json({
                ok: true,
                municipios: municipios
            })
        })
});


//======================================================
//                CREAR UN NUEVO MUNICIPIO
//======================================================

// app.post('/', verificaToken, (req, res, next) => {
//     var body = req.body;


//     var municipio = new Municipio({
//         nombre: body.nombre,
//         provincia: body.provincia,
//         activo: body.activo,
//     });


//     municipio.save((err, municipioGuardado) => {

//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 mensaje: ' Error al crear municipio',
//                 errors: err
//             });
//         }

//         res.status(200).json({
//             ok: true,
//             municipio: municipioGuardado
//         });

//     });
// });

//======================================================
//                ACTUALIZAR UN  MUNICIPIO
//======================================================

// app.put('/:id', verificaToken, (req, res, next) => {
//     var id = req.params.id;
//     var body = req.body;


//     Provincia.findById(id, (err, municipio) => {

//         if (!municipio) {
//             return res.status(400).json({
//                 ok: false,
//                 mensaje: ' El provincia con el id' + id + ' no existe ',
//                 errors: { mesage: 'No existe un provincia con ese ID' }
//             });
//         }

//         if (err) {
//             return res.status(500).json({
//                 ok: false,
//                 mensaje: ' Error al buscar provincia',
//                 errors: err
//             });
//         }


//         municipio.nombre = body.nombre;
//         municipio.activo = body.activo;
//         municipio.provincia = body.provincia;


//         municipio.save((err, municipioGuardado) => {
//             if (err) {
//                 return res.status(400).json({
//                     ok: false,
//                     mensaje: ' Error al actualizar promunicipiovincia',
//                     errors: err
//                 });
//             }
//             res.status(201).json({
//                 ok: true,
//                 municipio: municipioGuardado

//             });
//         });


//     });
// });



//======================================================
//      BUSCAR  MUNICIPIO SEGUN ID DE PROVINCIA
//======================================================

// app.get('/:id', verificaToken, (req, res, next) => {


//     var id = req.params.id;
//     Municipio.find({ provincia: id })
//         .exec((err, municipios) => {
//             if (err) {
//                 return res.status(500).json({
//                     ok: false,
//                     mensaje: 'Error al encontrarmunicipios',
//                     erros: err
//                 });
//             }
//             if (!municipios) {
//                 return res.status(400).json({
//                     ok: false,
//                     mensaje: 'El pais con  el id' + id + 'no Existe',
//                     errors: { message: 'No existe ese municipio' }
//                 })
//             }

//             res.status(200).json({
//                 ok: true,
//                 municipios: municipios
//             })
//         })
// });



module.exports = app;