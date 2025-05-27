var express = require('express');
var ServiceRecord = require('../../models/motorcycle/serviceRecordSchema');
var mongoose = require('mongoose');
var dateUtils = require('../../utils/dateUtils'); // Importamos las utilidades de fecha

var app = express();
app.use(express.json());

// Ruta para actualizar un registro de servicio existente
app.put('/', async (req, res) => {
    try {
        // Obtener el ID del servicio desde el cuerpo de la petición
        const serviceId = req.body._id;
        
        // Verificar que se proporcionó un ID
        if (!serviceId) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Es necesario proporcionar el ID del servicio'
            });
        }
        
        // Validar que el ID sea válido
        if (!mongoose.Types.ObjectId.isValid(serviceId)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'ID de servicio inválido'
            });
        }
        
        // Verificar que el servicio existe
        const serviceRecord = await ServiceRecord.findById(serviceId);
        if (!serviceRecord) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Registro de servicio no encontrado'
            });
        }
        
        // Actualizar los campos que vienen en la petición
        if (req.body.serviceDate) {
            // Parsear la fecha si viene en formato DD/MM/YYYY
            serviceRecord.serviceDate = dateUtils.parseDate(req.body.serviceDate);
        }
        if (req.body.odometer !== undefined) serviceRecord.odometer = req.body.odometer;
        if (req.body.serviceType) serviceRecord.serviceType = req.body.serviceType;
        if (req.body.appointmentReminder !== undefined) serviceRecord.appointmentReminder = req.body.appointmentReminder;
        
        // Guardar los cambios
        const updatedService = await serviceRecord.save();
        
        // Formatear la fecha para la respuesta
        const formattedService = updatedService.toObject();
        if (formattedService.serviceDate) {
            formattedService.serviceDate = dateUtils.formatDate(updatedService.serviceDate);
        }
        
        res.status(200).json({
            ok: true,
            mensaje: 'Registro de servicio actualizado correctamente',
            serviceRecord: formattedService
        });
        
    } catch (err) {
        console.log('Error al actualizar servicio:', err);
        
        // Error de validación (por ejemplo, tipo de servicio no válido)
        if (err.name === 'ValidationError') {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error de validación',
                errors: err.errors
            });
        }
        
        res.status(500).json({
            ok: false,
            mensaje: 'Error al actualizar el registro de servicio',
            errors: err
        });
    }
});

module.exports = app;