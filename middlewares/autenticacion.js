
var jwt = require('jsonwebtoken');

// Vamos a recuperar la variable SEED que ocupa en config
var SEED = require('../config/config').SEED;
//======================================================
//                VERIFICAR TOKEN
//======================================================
let verificaToken = function (req, res, next) {
    let token = req.get('Authorization');
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }
        req.usuario = decoded.usuario; // Informa que el usuario tiene un token correcto
        next();
    });
};

module.exports = {
    verificaToken
}