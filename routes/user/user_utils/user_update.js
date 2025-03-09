const express = require('express');
const User = require('../../../models/user/user');

const app = express();

// Ruta para actualizar un usuario
app.put('/', async (req, res) => {
    const { _id, ...updateData } = req.body;

    try {
        // Verificar que el usuario existe
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado'
            });
        }

        // Actualizar los campos del usuario
        Object.keys(updateData).forEach(key => {
            user[key] = updateData[key];
        });

        // Guardar los cambios en la base de datos
        await user.save();

        res.status(200).json({
            ok: true,
            message: 'Usuario actualizado correctamente',
            user: user
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Error al actualizar el usuario',
            errors: err
        });
    }
});

module.exports = app;