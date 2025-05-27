var express = require('express');
var Motorcycle = require('../../models/motorcycle/motorcycle'); // Importa el modelo de motorcycle

var app = express();
app.use(express.json());

// Ruta para actualizar una motocicleta
app.put('/', async (req, res) => {
    const { _id, ...updateData } = req.body;

    try {
        // Verificar que la motocicleta existe
        const motorcycle = await Motorcycle.findById(_id);
        if (!motorcycle) {
            return res.status(404).json({
                ok: false,
                message: 'Motocicleta no encontrada'
            });
        }

        // Actualizar los campos de la motocicleta
        Object.keys(updateData).forEach(key => {
            motorcycle[key] = updateData[key];
        });

        // Guardar los cambios en la base de datos
        await motorcycle.save();

        res.status(200).json({
            ok: true,
            message: 'Motocicleta actualizada correctamente',
            motorcycle: motorcycle
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Error al actualizar la motocicleta',
            errors: err
        });
    }
});

module.exports = app;