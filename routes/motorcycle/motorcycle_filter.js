var express = require('express');
var Motorcycle = require('../../models/motorcycle/motorcycle'); 

var app = express();
app.use(express.json());

/**
 * Ruta para filtrar motocicletas según criterios
 * El body de la petición debe contener un objeto con los criterios de filtrado
 * Ejemplo: 
 * {
 *   "brand": "Honda",
 *   "year": 2020,
 *   "owner": "60d21b4667d0d8992e610c85"
 * }
 */
app.post('/', async (req, res) => {
    try {
        console.log('Filtrando motocicletas con criterios:', req.body);
        
        // Obtenemos el filtro del cuerpo de la petición
        const filter = req.body || {};
        
        // Si el filtro está vacío, devolvemos un error
        if (Object.keys(filter).length === 0) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Es necesario especificar al menos un criterio de filtrado'
            });
        }
        
        // Realizamos la búsqueda utilizando el filtro e incluimos los registros de servicio
        const motorcycles = await Motorcycle.find(filter)
            .populate('motorcycleServiceBook')
            .exec();
        
        // Devolvemos las motocicletas que coinciden con el filtro
        res.status(200).json({
            ok: true,
            total: motorcycles.length,
            motorcycles: motorcycles
        });
    } catch (err) {
        console.log('Error al filtrar motocicletas:', err);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al filtrar motocicletas',
            errors: err
        });
    }
});

module.exports = app;