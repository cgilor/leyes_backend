const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/controllers.auth');
const {validarCampos} = require('../middleware/validar.campos');

const router = Router();

router.post('/',
[
    check ('email','El email es opbligatorio').isEmail(),
    check('password','El pass es obligarorio').not().isEmpty(),
    validarCampos
],
login
);




module.exports = router;