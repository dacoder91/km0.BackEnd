var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var User = require('../../../models/user/user');

var app = express();

// URLs de redirección para el frontend
const FRONTEND_BASE_URL = "https://km0.tuaplicacionweb.es";
const SUCCESS_REDIRECT = `${FRONTEND_BASE_URL}`;
const ERROR_REDIRECT = `${FRONTEND_BASE_URL}/verification-error`;
const INVALID_TOKEN_REDIRECT = `${FRONTEND_BASE_URL}/verification-failed`;

// Ruta para verificar el token y activar la cuenta del usuario
app.get('/:token', async (req, res) => {
    var token = req.params.token;
    console.log('Procesando token de verificación:', token);
    
    try {
        // Verificar y decodificar el token
        var decoded = jwt.verify(token, 'secretKey');
        console.log('Email verificado:', decoded.email);
        
        // Crear nuevo usuario con el email y contraseña decodificados
        var user = new User({
            email: decoded.email,
            password: bcrypt.hashSync(decoded.password, 10), // Encriptamos la contraseña
            active: true // Activamos la cuenta automáticamente
        });

        // Guardar el usuario en la base de datos
        user.save((err, userSave) => {
            if (err) {
                console.error('Error al crear usuario:', err);
                
                // Si es un error de duplicado (email ya registrado)
                if (err.code === 11000) {
                    console.log('El usuario ya existe, posiblemente ya verificado');
                    return res.redirect(SUCCESS_REDIRECT); // Redirigir como si fuera exitoso
                }
                
                // Para otros tipos de errores
                return res.redirect(ERROR_REDIRECT);
            }

            console.log('Usuario creado y verificado correctamente:', userSave.email);
            
            // Redireccionar al frontend tras verificación exitosa
            return res.redirect(SUCCESS_REDIRECT);
        });
        
    } catch (err) {
        console.error('Token inválido o expirado:', err);
        
        // Redirigir a página de token inválido
        return res.redirect(INVALID_TOKEN_REDIRECT);
    }
});

module.exports = app;