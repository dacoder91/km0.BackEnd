var express = require('express');
var Aviso = require('../../models/aviso/aviso'); // Importa el modelo de aviso

var app = express();
app.use(express.json());

// Función para formatear fechas de Date a DD/MM/YYYY
function formatDate(date) {
    if (!date) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
}

// Función para formatear los avisos antes de enviarlos
function formatAvisos(avisos) {
    return avisos.map(aviso => {
        // Convertir el documento Mongoose a un objeto plano de JavaScript
        const avisoObj = aviso.toObject();
        
        // Formatear las fechas
        avisoObj.fechaInicio = formatDate(aviso.fechaInicio);
        avisoObj.fechaFin = formatDate(aviso.fechaFin);
        avisoObj.fechaCreacion = formatDate(aviso.fechaCreacion);
        
        return avisoObj;
    });
}

// Ruta para listar todos los avisos
app.get('/', (req, res) => {
    Aviso.find({})
        .sort({ fechaInicio: -1 }) // Ordenar por fecha de inicio descendente (más recientes primero)
        .exec((err, avisos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al listar los avisos',
                    errors: err
                });
            }

            // Formatear las fechas antes de enviar la respuesta
            const avisosFormateados = formatAvisos(avisos);

            res.status(200).json({
                ok: true,
                avisos: avisosFormateados
            });
        });
});

// Ruta alternativa para listar solo avisos activos
app.get('/activos', (req, res) => {
    // Obtener la fecha actual
    const ahora = new Date();
    
    Aviso.find({ 
        activo: true,
        fechaInicio: { $lte: ahora },
        fechaFin: { $gte: ahora }
    })
    .sort({ fechaInicio: -1 })
    .exec((err, avisos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al listar los avisos activos',
                errors: err
            });
        }

        // Formatear las fechas antes de enviar la respuesta
        const avisosFormateados = formatAvisos(avisos);

        res.status(200).json({
            ok: true,
            avisos: avisosFormateados
        });
    });
});

module.exports = app;