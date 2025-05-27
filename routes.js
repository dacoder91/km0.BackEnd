const express = require('express');
const router = express.Router();
const path = require('path'); // Para producción


// ** Rutas para los usuarios **
router.use('/user/register', require('./routes/user/register/register2'));// Para registrar un usuario
router.use('/user/verify', require('./routes/user/register/verify')); // Para actualizar un usuario
router.use('/user/login', require('./routes/user/login/login')); // Para iniciar sesión
router.use('/user/user_list', require('./routes/user/user_utils/user_list')); // Para listar usuarios
router.use('/user/user_update', require('./routes/user/user_utils/user_update')); // Para actualizar un usuario
router.use('/user/user_filter', require('./routes/user/user_utils/user_filter')); // Para actualizar un usuario

// ** Rutas para los clubs **
router.use('/club/club_register', require('./routes/club/club_register'));
router.use('/club/club_list', require('./routes/club/club_list'));
router.use('/club/club_update', require('./routes/club/club_update'));
// router.use('/club/membership-request', require('./routes/club/memberShipClub_requests'));

// ** Rutas para las Rutas **
// router.use('/route/route_register', require('./routes/motoRoute/route_register'));
// router.use('/route/route_list', require('./routes/motoRoute/route_list'));
// router.use('/route/route_update', require('./routes/motoRoute/route_update'));

// ** Rutas para las Motocicletas **
router.use('/motorcycle/motorcycle_register', require('./routes/motorcycle/motorcycle_register'));
router.use('/motorcycle/motorcycle_list', require('./routes/motorcycle/motorcycle_list'));
router.use('/motorcycle/motorcycle_update', require('./routes/motorcycle/motorcycle_update'));
router.use('/motorcycle/motorcycle_filter', require('./routes/motorcycle/motorcycle_filter'));

// ** Rutas para las rutas de los avisos **
router.use('/aviso/aviso_list', require('./routes/aviso/aviso_list'));
router.use('/aviso/aviso_register', require('./routes/aviso/aviso_register')); // Para registrar un aviso
router.use('/aviso/aviso_update', require('./routes/aviso/aviso_update')); // Para actualizar un aviso

// ** Rutas para las revisiones **
router.use('/service/service_list',    require('./routes/motorcycleServiceBook/motoservice_list'));
router.use('/service/service_update',   require('./routes/motorcycleServiceBook/motoservice_update')); // Para registrar un aviso
router.use('/service/service_register', require('./routes/motorcycleServiceBook/motoservice_register')); // Para actualizar un aviso
router.use('/service/service_filter',   require('./routes/motorcycleServiceBook/motoservice_filter')); // Para actualizar un aviso





// Ruta para desarrollo / producción
router.use('/', express.static('client', { redirect: false }));


// esta ruta es para que cuando se recargue la página no de error 404 en las rutas de angular que no existen en el servidor 
router.get('*', function (req, res, next) {
    res.sendFile(path.resolve('client/index.html'));
});

module.exports = router;