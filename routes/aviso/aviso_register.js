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

// Ruta para registrar un nuevo aviso
app.post('/', (req, res) => {
    // Extraer los datos del cuerpo de la petición
    var body = req.body;
    
    // Verificar que los campos requeridos estén presentes
    // if (!body.titulo || !body.descripcion || !body.tipo || !body.fechaInicio || !body.fechaFin) {
    //     return res.status(400).json({
    //         ok: false,
    //         mensaje: 'Todos los campos son obligatorios',
    //         body: body
    //     });
    // }
    
    try {
        // Formatear las fechas
        const fechaInicio = parseDate(body.fechaInicio);
        const fechaFin = parseDate(body.fechaFin);
        
        // Verificar que las fechas sean válidas
        if (isNaN(fechaInicio) || isNaN(fechaFin)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Formato de fecha inválido. Use DD/MM/YYYY',
                body: body
            });
        }
        
        // Crear un nuevo objeto Aviso con los datos recibidos
        var aviso = new Aviso({
            titulo: body.titulo,
            descripcion: body.descripcion,
            tipo: body.tipo,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            activo: body.activo !== undefined ? body.activo : true
        });
        
        // Guardar el aviso en la base de datos
        aviso.save((err, avisoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al crear el aviso',
                    errors: err
                });
            }
            
            // Responder con el aviso creado
            res.status(201).json({
                ok: true,
                mensaje: 'Aviso creado correctamente',
                aviso: avisoGuardado
            });
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al procesar la solicitud',
            errors: error
        });
    }
});

module.exports = app;