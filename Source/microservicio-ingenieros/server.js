// ================================================================
// microservicio-ingenieros/server.js
// Microservicio independiente — Puerto 4000
// Proporciona información de Kenyi Nakamura e ingenieros destacados
// ================================================================

const express = require('express');
const cors    = require('cors');

const app  = express();
const PORT = process.env.PORT || 4000;

/* ----------------------------------------------------------------
   BASE DE DATOS EN MEMORIA
   ---------------------------------------------------------------- */
const KENYI_NAKAMURA = {
  id: 1,
  nombre: 'Kenyi Nakamura',
  titulo: 'Ingeniero Mecánico — Mecatrónica e Industria 4.0',
  pais: 'México',
  ciudad: 'Ciudad de México',
  experiencia: '15 años',
  publicaciones: 24,
  patentes: 3,
  premios: [
    'Premio Nacional de Innovación en Manufactura 2022',
    'Reconocimiento ASME International Congress 2021',
    'Mejor Tesis Doctoral en Mecatrónica 2015',
  ],
  idiomas: ['Español', 'Inglés', 'Japonés'],
  especializaciones: [
    'Diseño CAD/CAE (SolidWorks, ANSYS)',
    'Robótica Industrial',
    'Mecatrónica e IoT',
    'Manufactura Avanzada (CNC, Impresión 3D)',
    'Termodinámica Aplicada',
    'Industria 4.0',
  ],
  proyectos: [
    {
      nombre: 'RoboArm X1',
      anio: 2021,
      descripcion: 'Brazo robótico colaborativo de 6 ejes con percepción háptica para ensamble de precisión.',
      tecnologias: ['ROS2', 'Python', 'SolidWorks'],
      estado: 'Producción',
    },
    {
      nombre: 'ThermoSense IoT',
      anio: 2022,
      descripcion: 'Sistema de monitoreo térmico industrial en tiempo real con alertas predictivas basadas en IA.',
      tecnologias: ['IoT', 'MQTT', 'Node.js', 'Machine Learning'],
      estado: 'Activo',
    },
    {
      nombre: 'FluidSim Pro',
      anio: 2023,
      descripcion: 'Software de simulación CFD (dinámica de fluidos computacional) orientado a la enseñanza universitaria.',
      tecnologias: ['C++', 'OpenFOAM', 'React'],
      estado: 'Beta',
    },
  ],
  educacion: [
    { grado: 'Doctorado', institucion: 'UNAM', area: 'Mecatrónica', anio: 2015 },
    { grado: 'Maestría',  institucion: 'IPN',  area: 'Ingeniería Mecánica', anio: 2011 },
    { grado: 'Ingeniería',institucion: 'ITESM',area: 'Ingeniería Mecánica', anio: 2009 },
  ],
  contacto: {
    email: 'kenyi.nakamura@mecanicatec.edu.mx',
    linkedin: 'linkedin.com/in/kenyinakamura',
    researchgate: 'researchgate.net/profile/kenyi-nakamura',
  },
};

const INGENIEROS_DESTACADOS = [
  KENYI_NAKAMURA,
  {
    id: 2,
    nombre: 'María González Torres',
    titulo: 'Ingeniera Mecánica — Energías Renovables',
    pais: 'México',
    publicaciones: 18,
    patentes: 2,
    especializaciones: ['Turbinas Eólicas', 'Termodinámica Solar', 'Eficiencia Energética'],
  },
  {
    id: 3,
    nombre: 'Carlos Reyes Medina',
    titulo: 'Ingeniero Mecánico — Manufactura',
    pais: 'México',
    publicaciones: 11,
    patentes: 4,
    especializaciones: ['Manufactura CNC', 'Control de Calidad', 'Lean Manufacturing'],
  },
  {
    id: 4,
    nombre: 'Ana Lucía Pérez',
    titulo: 'Ingeniera Mecánica — Biomedicina',
    pais: 'México',
    publicaciones: 20,
    patentes: 1,
    especializaciones: ['Prótesis Biomecánicas', 'Implantes Ortopédicos', 'Biomecánica Computacional'],
  },
];

/* ----------------------------------------------------------------
   MIDDLEWARES
   ---------------------------------------------------------------- */
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use((req, res, next) => {
  console.log(`[MICROSERVICIO ${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

/* ----------------------------------------------------------------
   RUTAS DEL MICROSERVICIO
   ---------------------------------------------------------------- */

// Raíz — información del microservicio
app.get('/', (req, res) => {
  res.json({
    servicio: 'Microservicio de Ingenieros Destacados',
    version: '1.0.0',
    puerto: PORT,
    endpoints: [
      'GET /api/kenyi',
      'GET /api/ingenieros',
      'GET /api/ingenieros/:id',
    ],
    timestamp: new Date().toISOString(),
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'UP', servicio: 'microservicio-ingenieros', uptime: process.uptime() });
});

// GET /api/kenyi — Perfil completo de Kenyi Nakamura
app.get('/api/kenyi', (req, res) => {
  res.json({
    status: 'success',
    mensaje: 'Perfil de Kenyi Nakamura — Ingeniero Mecánico Innovador',
    data: KENYI_NAKAMURA,
    timestamp: new Date().toISOString(),
  });
});

// GET /api/ingenieros — Lista de ingenieros destacados
app.get('/api/ingenieros', (req, res) => {
  res.json({
    status: 'success',
    mensaje: `Ingenieros destacados (${INGENIEROS_DESTACADOS.length} registros)`,
    data: INGENIEROS_DESTACADOS,
    timestamp: new Date().toISOString(),
  });
});

// GET /api/ingenieros/:id — Ingeniero por ID
app.get('/api/ingenieros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const ing = INGENIEROS_DESTACADOS.find(i => i.id === id);
  if (!ing) {
    return res.status(404).json({
      status: 'error',
      mensaje: `Ingeniero con id ${id} no encontrado`,
    });
  }
  res.json({
    status: 'success',
    data: ing,
    timestamp: new Date().toISOString(),
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    mensaje: `Ruta ${req.method} ${req.url} no encontrada en el microservicio`,
  });
});

/* ----------------------------------------------------------------
   INICIAR SERVIDOR
   ---------------------------------------------------------------- */
app.listen(PORT, () => {
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║  MecánicaTec — Microservicio Ingenieros      ║');
  console.log(`║  Puerto: ${PORT}                               ║`);
  console.log('╚══════════════════════════════════════════════╝');
  console.log(`📦 Microservicio en: http://localhost:${PORT}`);
  console.log(`👤 Kenyi Nakamura:   http://localhost:${PORT}/api/kenyi`);
});

module.exports = app;
