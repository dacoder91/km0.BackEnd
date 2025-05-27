var express = require('express');
var ServiceRecord = require('../../models/motorcycle/serviceRecordSchema');
var Motorcycle = require('../../models/motorcycle/motorcycle');
var mongoose = require('mongoose');
var dateUtils = require('../../utils/dateUtils'); // Importamos las utilidades de fecha

var app = express();
app.use(express.json());

// Ruta para registrar un nuevo servicio para una motocicleta
app.post('/', async (req, res) => {
    // Verificar que los campos requeridos estén presentes
    // if (!req.body.motorcycleId || !req.body.serviceDate || !req.body.odometer || !req.body.serviceType) {
    //     return res.status(400).json({
    //         ok: false,
    //         mensaje: 'Faltan campos obligatorios',
    //         required: ['motorcycleId', 'serviceDate', 'odometer', 'serviceType']
    //     });
    // }
    
    // Validar que el ID de la motocicleta sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(req.body.motorcycleId)) {
        return res.status(400).json({
            ok: false,
            mensaje: 'El ID de la motocicleta no es válido'
        });
    }
    
    try {
        console.log('Registrando nuevo servicio de motocicleta:', req.body);

        // Verificar que la motocicleta existe
        const motorcycle = await Motorcycle.findById(req.body.motorcycleId);
        if (!motorcycle) {
            return res.status(404).json({
                ok: false,
                mensaje: 'La motocicleta no existe'
            });
        }

        // Parsear la fecha de DD/MM/YYYY a objeto Date
        const parsedServiceDate = dateUtils.parseDate(req.body.serviceDate);

        // Crear nuevo registro de servicio
        const newServiceRecord = new ServiceRecord({
            motorcycleId: req.body.motorcycleId, // Añadir el ID de la motocicleta al registro
            serviceDate: parsedServiceDate, // Usar la fecha parseada
            odometer: req.body.odometer,
            serviceType: req.body.serviceType,
            appointmentReminder: req.body.appointmentReminder || false
        });

        // Guardar el registro de servicio
        const savedService = await newServiceRecord.save();

        // Añadir el registro a la motocicleta
        motorcycle.motorcycleServiceBook.push(savedService._id);
        await motorcycle.save();

        // Formatear la fecha para la respuesta
        const serviceResponse = savedService.toObject();
        serviceResponse.serviceDate = dateUtils.formatDate(savedService.serviceDate);

        res.status(201).json({
            ok: true,
            mensaje: 'Servicio registrado correctamente',
            serviceRecord: serviceResponse,
            motorcycle: motorcycle._id
        });

    } catch (err) {
        console.log('Error al registrar servicio:', err);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al registrar el servicio',
            errors: err
        });
    }
});

module.exports = app;