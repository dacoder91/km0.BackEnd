var express = require('express');
var Aviso = require('../../models/aviso/aviso');

var app = express();
app.use(express.json());

// Función para formatear fechas desde DD/MM/YYYY a un formato válido para Date
function parseDate(dateString) {
    // Verificar si la fecha viene en formato DD/MM/YYYY
    if (dateString && dateString.includes('/')) {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    }
    // Si no viene en ese formato, intentamos parsear directamente
    return new Date(dateString);
}

// Función para formatear fechas de Date a DD/MM/YYYY para la respuesta
function formatDate(date) {
    if (!date) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
}

// Ruta para actualizar un aviso existente
app.put('/', async (req, res) => {
    const { _id, ...updateData } = req.body;

    try {
        // Verificar que el aviso existe
        const aviso = await Aviso.findById(_id);
        if (!aviso) {
            return res.status(404).json({
                ok: false,
                message: 'Aviso no encontrado'
            });
        }

        // Convertir fechas si están presentes
        if (updateData.fechaInicio) {
            updateData.fechaInicio = parseDate(updateData.fechaInicio);
        }
        
        if (updateData.fechaFin) {
            updateData.fechaFin = parseDate(updateData.fechaFin);
        }

        // Actualizar solo los campos que se enviaron
        Object.keys(updateData).forEach(key => {
            aviso[key] = updateData[key];
        });

        // Guardar los cambios en la base de datos
        await aviso.save();

        // Formatear las fechas para la respuesta
        const avisoFormatted = aviso.toObject();
        if (avisoFormatted.fechaInicio) avisoFormatted.fechaInicio = formatDate(aviso.fechaInicio);
        if (avisoFormatted.fechaFin) avisoFormatted.fechaFin = formatDate(aviso.fechaFin);
        // if (avisoFormatted.fechaCreacion) avisoFormatted.fechaCreacion = formatDate(aviso.fechaCreacion);

        res.status(200).json({
            ok: true,
            message: 'Aviso actualizado correctamente',
            aviso: avisoFormatted
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: 'Error al actualizar el aviso',
            errors: err
        });
    }
});

module.exports = app;