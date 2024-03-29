

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar.campos');
const { getLeyes,
    getArtByLeyId,
    crearLeyes,
    actualizarLeyes,
    borrarLeyes } = require('../controllers/controllers.leyes');

const {validarToken} = require('../middleware/validar.token');

const router = Router();


router.get('/' ,getLeyes);


router.get('/:id/articulos', getArtByLeyId);

router.post('/', 
[
    validarToken,
    check('nombre','El nombre del leyes es necesario').not().isEmpty(),
    validarCampos
], 
crearLeyes
);

router.put('/:id', 
[
    validarToken,
    check('nombre','El nombre del leyes es necesario').not().isEmpty(),
    validarCampos

], 
actualizarLeyes
);


router.delete('/:id',
    validarToken,
    borrarLeyes
);

module.exports = router;