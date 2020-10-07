const { Router } = require('express');

const { getTodo, getDocumentosColeccion} = require('../controllers/controllers.busquedas');
const {validarToken} = require('../middleware/validar.token');

const router = Router();

router.get('/:busquedas', validarToken , getTodo)
router.get('/coleccion/:tabla/:busqueda', validarToken , getDocumentosColeccion );

module.exports = router;