var express = require('express');
var ServiceRecord = require('../../models/motorcycle/serviceRecordSchema');
var mongoose = require('mongoose');

var app = express();
app.use(express.json());

/**
 * Ruta para filtrar registros de servicio según criterios
 * El body de la petición debe contener un objeto con los criterios de filtrado
 * Ejemplo: 
 * {
 *   "serviceType": "Aceite",
 *   "appointmentReminder": true
 * }
 */
app.post('/', async (req, res) => {
    try {
        console.log('Filtrando registros de servicio con criterios:', req.body);
        
        // Obtenemos el filtro del cuerpo de la petición
        const filter = req.body || {};
        
        // Si el filtro está vacío, devolvemos un error
        if (Object.keys(filter).length === 0) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Es necesario especificar al menos un criterio de filtrado'
            });
        }
        
        // Procesamos filtros especiales
        const finalFilter = { ...filter };
        
        // Filtro por rango de fechas si se proporciona
        if (filter.dateRange) {
            if (filter.dateRange.start) {
                finalFilter.serviceDate = { $gte: new Date(filter.dateRange.start) };
            }
            if (filter.dateRange.end) {
                if (!finalFilter.serviceDate) finalFilter.serviceDate = {};
                finalFilter.serviceDate.$lte = new Date(filter.dateRange.end);
            }
            delete finalFilter.dateRange;
        }
        
        // Filtro por rango de odómetro si se proporciona
        if (filter.odometerRange) {
            if (filter.odometerRange.min !== undefined) {
                finalFilter.odometer = { $gte: filter.odometerRange.min };
            }
            if (filter.odometerRange.max !== undefined) {
                if (!finalFilter.odometer) finalFilter.odometer = {};
                finalFilter.odometer.$lte = filter.odometerRange.max;
            }
            delete finalFilter.odometerRange;
        }
        
        // Realizamos la búsqueda utilizando el filtro
        const serviceRecords = await ServiceRecord.find(finalFilter).exec();
        
        // Devolvemos los registros que coinciden con el filtro
        res.status(200).json({
            ok: true,
            total: serviceRecords.length,
            serviceRecords: serviceRecords
        });
    } catch (err) {
        console.log('Error al filtrar registros de servicio:', err);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al filtrar registros de servicio',
            errors: err
        });
    }
});

// Filtrar servicios por motocicleta específica
app.post('/motorcycle/:motorcycleId', async (req, res) => {
    try {
        const motorcycleId = req.params.motorcycleId;
        
        // Validar que el ID sea válido
        if (!mongoose.Types.ObjectId.isValid(motorcycleId)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'ID de motocicleta inválido'
            });
        }
        
        // Obtenemos el filtro del cuerpo de la petición y añadimos el filtro por motorcycleId
        const filter = req.body || {};
        
        // Buscar la motocicleta y aplicar filtros adicionales a sus servicios
        const motorcycle = await Motorcycle.findById(motorcycleId)
            .populate({
                path: 'motorcycleServiceBook',
                match: filter // Aplicamos los filtros adicionales
            })
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
        console.log('Error al filtrar servicios de motocicleta:', err);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al filtrar registros de servicio',
            errors: err
        });
    }
});

module.exports = app;