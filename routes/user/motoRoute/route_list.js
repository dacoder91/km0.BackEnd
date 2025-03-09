var express = require('express');
var User = require('../../../models/user/user'); // Importa el modelo del usuario

var app = express();
app.use(express.json());

// Ruta para listar todas las rutas completadas por los usuarios
app.get('/', (req, res) => {
    User.find({}, 'completedRoutes', (err, users) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al listar las rutas completadas',
                errors: err
            });
        }

        // Extraer todas las rutas completadas de los usuarios
        let completedRoutes = [];
        users.forEach(user => {
            completedRoutes = completedRoutes.concat(user.completedRoutes);
        });

        res.status(200).json({
            ok: true,
            completedRoutes: completedRoutes
        });
    });
});

module.exports = app;