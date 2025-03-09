const express = require('express');

const app = express();
// const { verificaToken } = require('../../../middlewares/autenticacion')
let Proyecto = require('../../models/proyecto/proyecto');

//======================================================
//                  LISTADO DE PROYECTOS
//======================================================

app.get('/', (req, res) => {
    Proyecto.find({})
        .exec((err, proyectos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar los Proyectos', //es --> en, mensaje --> message
                    err
                });
            };

            res.json({
                ok: true,
                proyectos
            });
        })
});

//======================================================
//                  BORRAR USUARIOS
//======================================================

// app.delete('/', (req, res) => {
//     console.log('HA ENTRADO BORRAR');
//     Usuario.deleteMany({},(err, pbDb) => {
//         if (err) {
//             return res.status(500).json({
//                 ok: false,
//                 mensaje: 'Ha surgido un error al tratar de crear una nueva actuacion Marco',
//                 err
//             });
//         };
//     });
// });


//======================================================
//       ** ESTO HAY QUE HACERLO BIEN    REGISTRO NUEVO PROYECTO
//======================================================

// app.post('/', (req, res) => {
//     let body = req.body;
//     var i = 0;
//     var v = 0;
//     for (let item of req.body) {
//         let options = {new: true, upsert: true, useFindAndModify: false};
//         Proyecto.findOneAndUpdate({Actuacion:item.Actuacion},item,options).exec((err, audiences) => {
//                     if (err) {console.log('error'),err}
//                 });
//         i = i + 1
//         // if (i >=body.length){
//         //     console.log('SE TERMINO')
//         // }
//     } 
// });

app.post('/', (req, res, next) => {
    var body = req.body;


    var proyecto = new Proyecto({
        nombre: body.nombre,
        abreviatura: body.abreviatura,
        observaciones: body.observaciones,
        expediente:body.expediente,
        user: body.user,
        fRegistro: body.fRegistro,
        activo: body.activo,
    });


    proyecto.save((err, proyectoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: ' Error al crear proyecto', //es --> en, mensaje --> message
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            proyecto: proyectoGuardado
        });

    });
});

app.put('/', (req, res) => {
    let body = req.body;
    let options = {new: true, upsert: true, useFindAndModify: false};
    Proyecto.findOneAndUpdate({_id:body._id},body,options).exec((err, proyectoActualizado) => {
        if (err) {console.log('error'),err};
        res.status(200).json({
            ok: true,
            proyecto: proyectoActualizado
        });
    });
})

module.exports = app;