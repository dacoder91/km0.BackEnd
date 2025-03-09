var express = require('express');
var MotoRoute = require('../../../models/motoRoutes'); // Importa el modelo de motoRoutes

var app = express();
app.use(express.json());

// Ruta para actualizar una ruta completada
app.put('/', async (req, res) => {
    const { _id, ...updateData } = req.body;

    try {
        // Verificar que la ruta existe
        const route = await MotoRoute.findById(_id);
        if (!route) {
            return res.status(404).json({
                ok: false,
                message: 'Ruta no encontrada'
            });
        }

        // Actualizar los campos de la ruta
        Object.keys(updateData).forEach(key => {
            route[key] = updateData[key];
        });

        // Guardar los cambios en la base de datos
        await route.save();

        res.status(200).json({
            ok: true,
            message: 'Ruta actualizada correctamente',
            route: route
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Error al actualizar la ruta',
            errors: err
        });
    }
});

module.exports = app;