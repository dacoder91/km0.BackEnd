var express = require('express');
var User = require('../../../models/user/user');
var Motorcycle = require('../../../models/motorcycle/motorcycle'); // Añadir esta línea

var app = express();
app.use(express.json());

/**
 * Ruta para filtrar usuarios según criterios
 * El body de la petición debe contener un objeto con los criterios de filtrado
 * Ejemplo: 
 * {
 *   "email": "usuario@ejemplo.com",
 *   "role": "USER_ROLE",
 *   "active": true
 * }
 */
app.post('/', async (req, res) => {
    try {
        console.log('Filtrando usuarios con criterios:', req.body);
        
        // Obtenemos el filtro del cuerpo de la petición
        const filter = req.body || {};
        
        // Si el filtro está vacío, devolvemos un error
        if (Object.keys(filter).length === 0) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Es necesario especificar al menos un criterio de filtrado'
            });
        }
        
        // Realizamos la búsqueda utilizando el filtro
        const users = await User.find(filter)
            .select('name email img role active') // Seleccionar campos específicos para no exponer datos sensibles
            .exec();
        
        // Opcionalmente, podemos buscar las motocicletas de cada usuario
        const usersWithData = [];
        
        for (let user of users) {
            try {
                // Verificar que el usuario existe y tiene un método toObject
                if (!user) continue;
                
                // Convertir a objeto de forma segura
                const userObj = user.toObject ? user.toObject() : {...user};
                
                // Si quieres incluir las motocicletas, asegurándonos que user._id existe
                if (user._id) {
                    try {
                        const motorcycles = await Motorcycle.find({ owner: user._id }).exec();
                        userObj.motorcycles = motorcycles || [];
                    } catch (motorcycleError) {
                        console.log('Error al buscar motocicletas:', motorcycleError);
                        userObj.motorcycles = [];
                    }
                } else {
                    // Si no hay ID, establecer un array vacío
                    userObj.motorcycles = [];
                }
                
                usersWithData.push(userObj);
            } catch (error) {
                console.log('Error procesando usuario:', error);
                // Continuar con el siguiente usuario sin interrumpir el bucle
                continue;
            }
        }
        
        // Devolvemos los usuarios que coinciden con el filtro
        res.status(200).json({
            ok: true,
            total: users.length,
            users: usersWithData
        });
    } catch (err) {
        console.log('Error al filtrar usuarios:', err);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al filtrar usuarios',
            errors: err
        });
    }
});

module.exports = app;