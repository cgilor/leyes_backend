const { Router } = require('express');
const expressFileUpload = require('express-fileupload');


const { validarToken } = require('../middleware/validar.token');
const { fileUpload, retornaImagen } = require('../controllers/controllers.uploads');

const router = Router();

router.use( expressFileUpload() );

router.put('/:tipo/:id', validarToken , fileUpload );

router.get('/:tipo/:foto', retornaImagen );



module.exports = router;