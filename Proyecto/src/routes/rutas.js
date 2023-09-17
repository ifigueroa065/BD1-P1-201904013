const express = require('express');
const router = express.Router();




// * IMPORTS DE PROYECTO

const { modeloTSE } = require('../controllers/TSE_CREATE');
const { borrarTSE } = require('../controllers/TSE_DELETE');
const { crearTabtemp } = require('../controllers/TSE_TEMP');
const { query1 } = require('../controllers/QUERY1');
const { query2 } = require('../controllers/QUERY2');
const { query3 } = require('../controllers/QUERY3');
const { query4 } = require('../controllers/QUERY4');
const { query5 } = require('../controllers/QUERY5');
const { query6 } = require('../controllers/QUERY6');
const { query7 } = require('../controllers/QUERY7');
const { query8 } = require('../controllers/QUERY8');
const { query9 } = require('../controllers/QUERY9');
const { query10 } = require('../controllers/QUERY10');
const { query11 } = require('../controllers/QUERY11');



//* RUTAS DEL PROYECTO
router.get('/crearmodelo',modeloTSE)
router.get('/borrarmodelo',borrarTSE)
router.get('/cargartabtemp',crearTabtemp)
router.get('/cargartabtemp',crearTabtemp)
router.get('/consulta1',query1)
router.get('/consulta2',query2)
router.get('/consulta3',query3)
router.get('/consulta4',query4)
router.get('/consulta5',query5)
router.get('/consulta6',query6)
router.get('/consulta7',query7)
router.get('/consulta8',query8)
router.get('/consulta9',query9)
router.get('/consulta10',query10)
router.get('/consulta11',query11)


module.exports = router;
