

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar.campos');
const { getArt,
    crearArt,
    actualizarArt,
    borrarArt } = require('../controllers/controllers.articulos');
const {validarToken} = require('../middleware/validar.token');

const router = Router();


router.get('/' ,getArt);
router.post('/', 
[
    validarToken,
    check('nombre','El nombre del articulo es necesario').not().isEmpty(),
    check('leyes','la id debe de ser válido').isMongoId(),
    validarCampos
], 
crearArt
);

router.put('/:id', 
[
    

], 
actualizarArt
);


router.delete('/:id',
    
borrarArt
);

module.exports = router;