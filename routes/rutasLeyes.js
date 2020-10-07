

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar.campos');
const { getLeyes,
    crearLeyes,
    actualizarLeyes,
    borrarLeyes } = require('../controllers/controllers.leyes');

const {validarToken} = require('../middleware/validar.token');

const router = Router();


router.get('/' ,getLeyes);

router.post('/', 
[
    validarToken,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
], 
crearLeyes
);

router.put('/', 
[
    

], 
actualizarLeyes
);


router.delete('/',
    
    borrarLeyes
);

module.exports = router;