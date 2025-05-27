const express = require('express');
const Club = require('../../models/club/club');
const dateUtils = require('../../utils/dateUtils'); // Importar utilidades de fecha

const app = express();
app.use(express.json());

// Ruta para actualizar un club
app.put('/', async (req, res) => {
    const { _id, ...updateData } = req.body;

    try {
        // Verificar que el club existe
        const club = await Club.findById(_id);
        if (!club) {
            return res.status(404).json({
                ok: false,
                message: 'Club no encontrado'
            });
        }
        
        // Parsear la fecha de fundación si viene en formato DD/MM/YYYY
        if (updateData.foundationDate) {
            updateData.foundationDate = dateUtils.parseDate(updateData.foundationDate);
        }

        // Actualizar los campos del club
        Object.keys(updateData).forEach(key => {
            club[key] = updateData[key];
        });

        // Guardar los cambios en la base de datos
        await club.save();
        
        // Formatear la fecha para la respuesta
        const clubObj = club.toObject();
        if (clubObj.foundationDate) {
            clubObj.foundationDate = dateUtils.formatDate(club.foundationDate);
        }

        res.status(200).json({
            ok: true,
            message: 'Club actualizado correctamente',
            club: clubObj
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Error al actualizar el club',
            errors: err
        });
    }
});

module.exports = app;