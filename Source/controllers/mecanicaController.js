// ================================================================
// controllers/mecanicaController.js
// Controladores MVC — lógica de negocio de cada endpoint
// ================================================================

const { historia, ingenieros, datosTecnicos, infoMecanica } = require('../models/mecanicaModel');

// Respuesta estándar de éxito
const ok = (res, data, mensaje = 'OK') =>
  res.json({ status: 'success', mensaje, data, timestamp: new Date().toISOString() });

// Respuesta de error
const error = (res, codigo, mensaje) =>
  res.status(codigo).json({ status: 'error', mensaje, timestamp: new Date().toISOString() });

/* -------- GET /api/mecanica -------- */
exports.getInfoMecanica = (req, res) => {
  ok(res, infoMecanica, 'Información general de Ingeniería Mecánica');
};

/* -------- GET /api/historia -------- */
exports.getHistoria = (req, res) => {
  const { periodo } = req.query;
  let resultado = historia;
  if (periodo) {
    resultado = historia.filter(h =>
      h.periodo.toLowerCase().includes(periodo.toLowerCase())
    );
  }
  ok(res, resultado, `Historia de la Ingeniería Mecánica (${resultado.length} registros)`);
};

/* -------- GET /api/ingenieros -------- */
exports.getIngenieros = (req, res) => {
  const { destacado } = req.query;
  let resultado = ingenieros;
  if (destacado === 'true') {
    resultado = ingenieros.filter(i => i.destacado);
  }
  ok(res, resultado, `Ingenieros mecánicos destacados (${resultado.length} registros)`);
};

/* -------- GET /api/ingenieros/:id -------- */
exports.getIngenieroById = (req, res) => {
  const id = parseInt(req.params.id);
  const ing = ingenieros.find(i => i.id === id);
  if (!ing) return error(res, 404, `Ingeniero con id ${id} no encontrado`);
  ok(res, ing, `Ingeniero: ${ing.nombre}`);
};

/* -------- GET /api/datos -------- */
exports.getDatos = (req, res) => {
  const { categoria } = req.query;
  let resultado = datosTecnicos;
  if (categoria) {
    resultado = datosTecnicos.filter(d =>
      d.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }
  ok(res, resultado, `Datos técnicos de Ingeniería Mecánica (${resultado.length} registros)`);
};

/* -------- POST /api/contacto -------- */
exports.postContacto = (req, res) => {
  const { nombre, correo, telefono, area, comentarios } = req.body;

  // Validaciones básicas del lado del servidor
  if (!nombre || !correo || !telefono || !area || !comentarios) {
    return error(res, 400, 'Todos los campos son obligatorios: nombre, correo, telefono, area, comentarios');
  }

  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(correo)) {
    return error(res, 400, 'El correo electrónico no tiene un formato válido');
  }

  const telRegex = /^\d{10}$/;
  if (!telRegex.test(telefono.replace(/\D/g, ''))) {
    return error(res, 400, 'El teléfono debe contener exactamente 10 dígitos numéricos');
  }

  // En producción: guardar en base de datos
  const registro = {
    id: Date.now(),
    nombre: nombre.trim(),
    correo: correo.trim().toLowerCase(),
    telefono: telefono.replace(/\D/g, ''),
    area,
    comentarios: comentarios.trim(),
    fechaRegistro: new Date().toISOString(),
    ip: req.ip,
  };

  console.log('📧 Nuevo contacto registrado:', { nombre: registro.nombre, correo: registro.correo, area: registro.area });

  res.status(201).json({
    status: 'success',
    mensaje: `Mensaje recibido correctamente. Hola ${nombre}, te contactaremos pronto.`,
    data: { id: registro.id, fechaRegistro: registro.fechaRegistro },
    timestamp: new Date().toISOString(),
  });
};
