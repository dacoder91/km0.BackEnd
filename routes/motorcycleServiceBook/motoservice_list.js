var express = require('express');
var ServiceRecord = require('../../models/motorcycle/serviceRecordSchema');
var Motorcycle = require('../../models/motorcycle/motorcycle');
var mongoose = require('mongoose');

var app = express();
app.use(express.json());

// Obtener todos los registros de servicio
app.get('/', async (req, res) => {
    try {
        const serviceRecords = await ServiceRecord.find({}).exec();
        
        res.status(200).json({
            ok: true,
            total: serviceRecords.length,
            serviceRecords: serviceRecords
        });
    } catch (err) {
        console.log('Error al listar servicios:', err);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener los registros de servicio',
            errors: err
        });
    }
});

// Obtener los registros de servicio de una motocicleta específica
app.get('/motorcycle/:motorcycleId', async (req, res) => {
    try {
        const motorcycleId = req.params.motorcycleId;
        
        // Validar que el ID sea válido
        if (!mongoose.Types.ObjectId.isValid(motorcycleId)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'ID de motocicleta inválido'
            });
        }

        // Buscar la motocicleta
        const motorcycle = await Motorcycle.findById(motorcycleId)
            .populate('motorcycleServiceBook') // Importante: Usamos populate para obtener los detalles completos
            .exec();
            
        if (!motorcycle) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Motocicleta no encontrada'
            });
        }

        res.status(200).json({
            ok: true,
            motorcycle: motorcycle.brand + ' ' + motorcycle.model,
            total: motorcycle.motorcycleServiceBook.length,
            serviceRecords: motorcycle.motorcycleServiceBook
        });
    } catch (err) {
        console.log('Error al listar servicios de motocicleta:', err);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener los registros de servicio',
            errors: err
        });
    }
});

// Obtener un registro de servicio específico por ID
app.get('/:serviceId', async (req, res) => {
    try {
        const serviceId = req.params.serviceId;
        
        // Validar que el ID sea válido
        if (!mongoose.Types.ObjectId.isValid(serviceId)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'ID de servicio inválido'
            });
        }

        // Buscar el servicio
        const serviceRecord = await ServiceRecord.findById(serviceId).exec();
            
        if (!serviceRecord) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Registro de servicio no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            serviceRecord: serviceRecord
        });
    } catch (err) {
        console.log('Error al obtener servicio:', err);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener el registro de servicio',
            errors: err
        });
    }
});

module.exports = app;