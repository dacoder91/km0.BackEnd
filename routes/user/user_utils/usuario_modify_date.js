const express = require('express');

const app = express();
// const { verificaToken } = require('../../../middlewares/autenticacion')
let Usuario = require('../../models/usuario/usuarios');


//======================================================
//  ** PARA MODIFICAR LAS FECHAS DE FIRMA DE PROYECTOS
//======================================================

app.put('/', (req, res) => {
    // console.log('ha entrado en modifityDate. EL BOY QUE NOS LLEGA ES:',body);
    let body = req.body;
    Usuario.findById(body.id_usuario).exec((err, usuario) => {
        // console.log('LA RESPUESTA QUE NOS LLEGA AL BUSCAR POR ID ES: QUE NOS LLEGA ES:',usuario);
        let encontrado = usuario.proyectosFirmados.findIndex(f=>f.proyecto_id===body.proyectoFirmado);
        // console.log('ENCONTRADO EN ESE PROYECTO FIRMADO?:', encontrado);

        if(encontrado<0){
            // Si no se ha encontrado, tomamos los valores existendes d eproyectos firmados y agregamos el nuestro para después actualizar
            let actualizar = usuario.proyectosFirmados;
            actualizar.push({proyecto_id: body.proyectoFirmado, firmaFicha: body.firmaFicha, firmaDeclaracion: body.firmaDeclaracion }); 
            let options = {new: true, upsert: true, useFindAndModify: true};
            Usuario.findOneAndUpdate({_id:body.id_usuario},{proyectosFirmados: actualizar},options).exec((err, usuario) => {
                if (err) {console.log('error'),err} else {
                    // console.log('CUANDO ACTUALIZAMOS LOS PROYECTO SFIRMADOS NOS RESPONDE:',usuario);
                    res.status(200).json({
                        ok: true,
                        usuario
                    });
                };
            });
        }else{
            let actualizado = usuario.proyectosFirmados;
            actualizado[encontrado]= {proyecto_id: body.proyectoFirmado, firmaFicha: body.firmaFicha, firmaDeclaracion: body.firmaDeclaracion};
            let options = {new: true, upsert: true, useFindAndModify: true};
            Usuario.findOneAndUpdate({_id:body.id_usuario},{proyectosFirmados: actualizado},options).exec((err, usuario) => {
                if (err) {console.log('error'),err} else {
                    // console.log('CUANDO ACTUALIZAMOS LOS PROYECTO SFIRMADOS NOS RESPONDE:',usuario);
                    res.status(200).json({
                        ok: true,
                        usuario
                    });
                };
            });
            
        }
        
    })
    // if(!body._id){body._id = 25} // Esto es para poner algo que no lo encuentre y así no da error ( algo provisional, como todo :)
    // console.log(body._id);
    // let options = {new: true, upsert: true, useFindAndModify: false};
    // Usuario.findOneAndUpdate({_id:body._id},body,options).exec((err, usuario) => {
    //     if (err) {console.log('error'),err} else {
    //         res.status(200).json({
    //             ok: true,
    //             usuario
    //         });
    //     };
    // });

    })


module.exports = app;