const express = require('express');
// var mongoose = require('mongoose');

const app = express();
// IMPORTAMOS LOS MODELOS
var User = require('../../../models/user/user');
var Motorcycle = require('../../../models/motorcycle/motorcycle'); // Importamos el modelo de motocicleta

//======================================================
//                  LISTADO DE USUARIOS
//======================================================

app.get('/', async (req, res) => {
    try {
        // Primero obtenemos todos los usuarios
        const users = await User.find({}).exec();
        
        // Preparamos un array para almacenar los usuarios con sus motos
        const usersWithMotorcycles = [];
        
        // Para cada usuario, buscamos sus motocicletas
        for (let user of users) {
            // Buscar las motocicletas donde el owner coincide con el id del usuario
            const motorcycles = await Motorcycle.find({ owner: user._id }).exec();
            
            // Convertimos el usuario a un objeto plano para poder añadir nuevas propiedades
            const userObj = user.toObject();
            
            // Añadimos las motocicletas al objeto del usuario
            userObj.motorcycles = motorcycles;
            
            // Añadimos el usuario con sus motocicletas al array
            usersWithMotorcycles.push(userObj);
        }
        
        // Devolvemos la respuesta con los usuarios y sus motocicletas
        res.status(200).json({
            ok: true,
            users: usersWithMotorcycles
        });
    } catch (err) {
        console.log('ERROR AL CARGAR USUARIOS', err);
        return res.status(500).json({
            ok: false,
            message: 'Error al cargar los Usuarios',
            err
        });
    }
});

module.exports = app;



