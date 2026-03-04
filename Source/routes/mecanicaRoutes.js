// ================================================================
// routes/mecanicaRoutes.js
// Definición de rutas (capa Router del patrón MVC)
// ================================================================

const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/mecanicaController');

// GET /api/mecanica      — Información general de la disciplina
router.get('/mecanica', controller.getInfoMecanica);

// GET /api/historia      — Historia de la ingeniería mecánica
// Query: ?periodo=1769
router.get('/historia', controller.getHistoria);

// GET /api/ingenieros    — Lista de ingenieros destacados
// Query: ?destacado=true
router.get('/ingenieros', controller.getIngenieros);

// GET /api/ingenieros/:id — Ingeniero por ID
router.get('/ingenieros/:id', controller.getIngenieroById);

// GET /api/datos         — Datos técnicos
// Query: ?categoria=Materiales
router.get('/datos', controller.getDatos);

// POST /api/contacto     — Recibir formulario de contacto
router.post('/contacto', controller.postContacto);

module.exports = router;
