var express = require('express');

// para encriptar y comparar contraseñas encriptadas
// var bcrypt = require('bcrypt'); // No me creo que este sea el error.
var bcrypt = require('bcryptjs');

// Para comparar los tokens
// npm i jsonwebtoken --save
const { verificaToken } = require('../../../middlewares/autenticacion')


var app = express();
// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());


var app = express();

// IMPORTAMOS LOS MODELOS
var User = require('../../../models/user/user');


//======================================================
//       CREAR UN NUEVO USUARIO VIA REGISTER
//======================================================

app.post('/', (req, res, next) => {
    var body = req.body; // Extraemos el body
    console.log('body', req.body);
    if (!body.password) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Password is required' ,body
        });
    }

    var user = new User({
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), // Encriptamos la contraseña
    });

    // Guardamos el usuario recogiendo si ha sido con éxito o con error
    user.save((err, userSave) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: ' Error al crear usuario',
                errors: err
            });
        }

        // Recogemos el exito
        res.status(200).json({
            ok: true,
            user: userSave
        });

    });
});


module.exports = app;