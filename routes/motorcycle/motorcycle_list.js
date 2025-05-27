var express = require('express');
var Motorcycle = require('../../models/motorcycle/motorcycle'); // Importa el modelo de motorcycle

var app = express();
app.use(express.json());

// Ruta para listar todas las motocicletas con sus registros de servicio
app.get('/', async (req, res) => {
    try {
        console.log('Listando motocicletas con registros de servicio');
        
        // Usamos populate para incluir los detalles completos de motorcycleServiceBook
        const motorcycles = await Motorcycle.find({})
            .populate('motorcycleServiceBook')
            .exec();

        res.status(200).json({
            ok: true,
            total: motorcycles.length,
            motorcycles: motorcycles
        });
    } catch (err) {
        console.log('Error al listar motocicletas:', err);
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al listar las motocicletas',
            errors: err
        });
    }
});

module.exports = app;