const express = require('express');
const router = express.Router();




// * IMPORTS DE PROYECTO

const { modeloTSE } = require('../controllers/TSE_CREATE');
const { borrarTSE } = require('../controllers/TSE_DELETE');
const { crearTabtemp } = require('../controllers/TSE_TEMP');



//* RUTAS DEL PROYECTO
router.get('/crearmodelo',modeloTSE)
router.get('/borrarmodelo',borrarTSE)
router.get('/cargartabtemp',crearTabtemp)


module.exports = router;
