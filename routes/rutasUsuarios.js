

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar.campos');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/controllers.usuario');
const {validarToken, varlidarADMIN_ROLE,
    varlidarADMIN_ROLE_o_MismoUsuario} = require('../middleware/validar.token');

const router = Router();


router.get('/', validarToken ,getUsuarios);
router.post('/', 
[
    check('nombre', ' El nombre es obligatorio').not().isEmpty(),
    check('password', 'El pass es obligatorio').not().isEmpty(),
    check('email', 'Email es obligatorio').isEmail(),
    validarCampos,
], 
crearUsuario
);

router.put('/:id', 
[
    validarToken,
    varlidarADMIN_ROLE_o_MismoUsuario,
    check('nombre', ' El nombre es obligatorio').not().isEmpty(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    check('email', 'Email es obligatorio').isEmail(),
    validarCampos,

], 
actualizarUsuario
);

router.delete( '/:id',
    [validarToken,varlidarADMIN_ROLE],
    borrarUsuario
);

module.exports = router;