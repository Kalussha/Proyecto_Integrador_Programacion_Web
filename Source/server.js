// ================================================================
// server.js — MecánicaTec Web API (Puerto 3000)
// Express + CORS + Estructura MVC
// ================================================================

const express = require('express');
const cors    = require('cors');

const mecanicaRoutes = require('./routes/mecanicaRoutes');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ----------------------------------------------------------------
   MIDDLEWARES
   ---------------------------------------------------------------- */

// Parsear JSON en el body de las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS — permite peticiones desde el frontend
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:3001', '*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Logger básico de peticiones
app.use((req, res, next) => {
  const ahora = new Date().toISOString();
  console.log(`[${ahora}] ${req.method} ${req.url}`);
  next();
});

/* ----------------------------------------------------------------
   RUTAS
   ---------------------------------------------------------------- */

// Ruta raíz — información de la API
app.get('/', (req, res) => {
  res.json({
    nombre:      'MecánicaTec Web API',
    version:     '1.0.0',
    descripcion: 'API REST para el sitio informativo de Ingeniería Mecánica',
    endpoints: [
      'GET  /api/mecanica',
      'GET  /api/historia',
      'GET  /api/ingenieros',
      'GET  /api/ingenieros/:id',
      'GET  /api/datos',
      'POST /api/contacto',
    ],
    microservicio: 'http://localhost:4000',
    timestamp: new Date().toISOString(),
  });
});

// Estado de salud de la API
app.get('/health', (req, res) => {
  res.json({ status: 'UP', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// Montar rutas de la API bajo /api
app.use('/api', mecanicaRoutes);

/* ----------------------------------------------------------------
   MANEJO DE RUTAS NO ENCONTRADAS
   ---------------------------------------------------------------- */
app.use((req, res) => {
  res.status(404).json({
    status:  'error',
    mensaje: `Ruta ${req.method} ${req.url} no encontrada.`,
    rutas_disponibles: ['GET /api/mecanica', 'GET /api/historia', 'GET /api/ingenieros', 'GET /api/datos', 'POST /api/contacto'],
  });
});

/* ----------------------------------------------------------------
   MANEJO GLOBAL DE ERRORES
   ---------------------------------------------------------------- */
app.use((err, req, res, next) => {
  console.error('❌ Error inesperado:', err.message);
  res.status(500).json({
    status:  'error',
    mensaje: 'Error interno del servidor',
    detalle: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

/* ----------------------------------------------------------------
   INICIAR SERVIDOR
   ---------------------------------------------------------------- */
app.listen(PORT, () => {
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║    MecánicaTec — Web API                     ║');
  console.log(`║    Puerto: ${PORT}                               ║`);
  console.log('╚══════════════════════════════════════════════╝');
  console.log(`🚀 API disponible en: http://localhost:${PORT}`);
  console.log(`📋 Endpoints: http://localhost:${PORT}/api/mecanica`);
});

module.exports = app;
