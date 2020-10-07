const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewToken } = require('../controllers/controllers.auth');
const {validarCampos} = require('../middleware/validar.campos');
const{validarToken} = require('../middleware/validar.token');

const router = Router();

router.post('/',
[
    check ('email','El email es opbligatorio').isEmail(),
    check('password','El pass es obligarorio').not().isEmpty(),
    validarCampos
],
login
);

router.get('/renew', validarToken ,renewToken);




module.exports = router;