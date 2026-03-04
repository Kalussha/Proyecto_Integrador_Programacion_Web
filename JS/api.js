/* ================================================================
   api.js
   Consumo de la Web API y del Microservicio desde el Frontend
   ================================================================ */

'use strict';

/* ---------- Configuración de endpoints ---------- */
const API_BASE       = 'http://localhost:3000';
const MICRO_BASE     = 'http://localhost:4000';

const ENDPOINTS = {
  mecanica:   `${API_BASE}/api/mecanica`,
  historia:   `${API_BASE}/api/historia`,
  ingenieros: `${API_BASE}/api/ingenieros`,
  datos:      `${API_BASE}/api/datos`,
  contacto:   `${API_BASE}/api/contacto`,
  kenyi:      `${MICRO_BASE}/api/kenyi`,
  destacados: `${MICRO_BASE}/api/ingenieros`,
};

/* ---------- Datos de fallback (modo demo sin servidor) ---------- */
const DEMO_DATA = {
  ingenieros: [
    {
      id: 1,
      nombre: 'Kenyi Nakamura',
      especialidad: 'Mecatrónica e Industria 4.0',
      pais: 'México',
      publicaciones: 24,
      patentes: 3,
      proyectos: ['RoboArm X1', 'ThermoSense IoT', 'FluidSim Pro'],
    },
    {
      id: 2,
      nombre: 'James Watt',
      especialidad: 'Máquinas de Vapor',
      pais: 'Escocia',
      publicaciones: 12,
      patentes: 6,
      proyectos: ['Máquina de Vapor Mejorada', 'Indicador de Presión'],
    },
    {
      id: 3,
      nombre: 'Nikola Tesla',
      especialidad: 'Electromecánica',
      pais: 'Serbia / EE.UU.',
      publicaciones: 45,
      patentes: 300,
      proyectos: ['Motor AC', 'Bobina Tesla', 'Torre de Wardenclyffe'],
    },
    {
      id: 4,
      nombre: 'Rudolf Diesel',
      especialidad: 'Motores de Combustión',
      pais: 'Alemania',
      publicaciones: 8,
      patentes: 15,
      proyectos: ['Motor Diesel', 'Ciclo Diesel', 'Bomba de Inyección'],
    },
  ],
  datos: [
    { parametro: 'Resistencia del Acero AISI 1020', valor: '420 MPa', unidad: 'Tensión última' },
    { parametro: 'Módulo de Young (Acero)',          valor: '200 GPa', unidad: 'Elasticidad' },
    { parametro: 'Temperatura de Fusión (Aluminio)', valor: '660 °C',  unidad: 'Termopropiedades' },
    { parametro: 'Eficiencia Ciclo de Carnot',       valor: '~60%',    unidad: 'Termodinámica' },
    { parametro: 'Velocidad del sonido en acero',    valor: '5960 m/s',unidad: 'Propagación' },
    { parametro: 'Coeficiente de Poisson (acero)',   valor: '0.30',    unidad: 'Deformación lateral' },
  ],
  kenyi: {
    nombre: 'Kenji Nakamura',
    titulo: 'Creador de Contenido | Cultura JDM & Tuning — Nocturna Performance',
    pais: 'México / Japón',
    experiencia: 'Más de 8 años en contenido automotriz',
    suscriptores: '2.9M+',
    videos: '500+',
    idiomas: ['Español', 'Japonés'],
    especializaciones: ['Cultura JDM', 'Tuning & Modificaciones', 'Drift', 'Importación de autos JDM', 'Vlogging automotriz'],
    proyectos: [
      { nombre: 'Nocturna Performance', descripcion: 'Equipo y marca automotriz fundada por Kenji, enfocada en tuning, builds y cultura JDM en México' },
      { nombre: 'Toyota Supra MKIV Build', descripcion: 'Restauración y modificación de un icónico Supra MKIV importado directamente de Japón' },
      { nombre: 'Mazda RX-7 FC/FD Project', descripcion: 'Proyecto de build de RX-7 con motor rotativo, sorteo de unidades entre su comunidad' },
      { nombre: 'Nissan Silvia S15 Drift', descripcion: 'Auto de drift completamente preparado para competencias y exhibiciones en México' },
      { nombre: 'Canal de YouTube — Kenji Nakamura', descripcion: 'Canal con más de 2.9M suscriptores donde documenta builds, viajes a Japón y la cultura del automovilismo JDM' },
    ],
    contacto: {
      youtube: 'youtube.com/@KenjiNakamura',
      instagram: '@kenjinakamura',
    },
  },
};

/* ================================================================
   UTILITARIOS
   ================================================================ */

/**
 * Fetch con timeout y manejo de errores
 */
async function fetchConTimeout(url, opciones = {}, ms = 4000) {
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { ...opciones, signal: controller.signal });
    clearTimeout(tid);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    clearTimeout(tid);
    throw err;
  }
}

/**
 * Muestra un estado de error en un contenedor
 */
function mostrarError(containerId, mensaje) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <div class="d-flex align-items-center gap-2 p-2 text-warning small">
      <i class="bi bi-exclamation-triangle-fill text-warning"></i>
      <span>${mensaje}</span>
      <span class="badge bg-warning text-dark ms-auto">Modo Demo</span>
    </div>
  `;
}

/**
 * Muestra spinner de carga
 */
function mostrarCargando(containerId, texto = 'Cargando...') {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <div class="text-center py-3">
      <div class="spinner-border spinner-border-sm text-accent" role="status"></div>
      <span class="text-muted ms-2 small">${texto}</span>
    </div>
  `;
}

/* ================================================================
   RENDERIZADO DE INGENIEROS
   ================================================================ */
function renderIngenieros(ingenieros, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  if (!ingenieros || ingenieros.length === 0) {
    el.innerHTML = '<p class="text-muted small p-2">Sin datos disponibles.</p>';
    return;
  }

  const html = ingenieros.map((ing, i) => `
    <div class="d-flex align-items-start gap-3 p-2 mb-2 rounded"
         style="background:rgba(255,255,255,0.02);border:1px solid #30363d;">
      <div class="flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle"
           style="width:38px;height:38px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.2);">
        <i class="bi bi-person-fill text-accent small"></i>
      </div>
      <div class="flex-grow-1 overflow-hidden">
        <strong class="text-light d-block" style="font-size:0.88rem;">${ing.nombre}</strong>
        <span class="text-muted" style="font-size:0.78rem;">${ing.especialidad}</span>
        <div class="mt-1 d-flex flex-wrap gap-1">
          <span class="badge" style="background:rgba(0,212,255,0.08);color:#00d4ff;border:1px solid rgba(0,212,255,0.2);font-size:0.65rem;">
            <i class="bi bi-geo-alt me-1"></i>${ing.pais}
          </span>
          <span class="badge" style="background:rgba(57,211,83,0.08);color:#39d353;border:1px solid rgba(57,211,83,0.2);font-size:0.65rem;">
            <i class="bi bi-journal me-1"></i>${ing.publicaciones} publicaciones
          </span>
        </div>
      </div>
    </div>
  `).join('');

  el.innerHTML = html;
}

/* ================================================================
   RENDERIZADO DE DATOS TÉCNICOS
   ================================================================ */
function renderDatos(datos, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  if (!datos || datos.length === 0) {
    el.innerHTML = '<p class="text-muted small p-2">Sin datos disponibles.</p>';
    return;
  }

  const html = `
    <table style="width:100%;font-size:0.8rem;border-collapse:collapse;">
      <thead>
        <tr style="border-bottom:1px solid #30363d;">
          <th style="color:#00d4ff;padding:4px 8px;text-align:left;">Parámetro</th>
          <th style="color:#00d4ff;padding:4px 8px;text-align:center;">Valor</th>
          <th style="color:#00d4ff;padding:4px 8px;text-align:left;">Tipo</th>
        </tr>
      </thead>
      <tbody>
        ${datos.map(d => `
          <tr style="border-bottom:1px solid rgba(48,54,61,0.5);">
            <td style="color:#8b949e;padding:5px 8px;">${d.parametro}</td>
            <td style="color:#e6edf3;font-weight:700;padding:5px 8px;text-align:center;font-family:monospace;">${d.valor}</td>
            <td style="color:#58a6ff;padding:5px 8px;font-size:0.72rem;">${d.unidad}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  el.innerHTML = html;
}

/* ================================================================
   RENDERIZADO DE KENYI NAKAMURA (sección y modal)
   ================================================================ */
function renderKenyi(kenyi, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
    <div class="p-1" style="font-size:0.82rem;">
      <div class="d-flex justify-content-between mb-2">
        <span class="text-muted">Experiencia</span>
        <strong class="text-light">${kenyi.experiencia || 'Más de 8 años'}</strong>
      </div>
      <div class="d-flex justify-content-between mb-2">
        <span class="text-muted">Suscriptores</span>
        <strong class="text-accent">${kenyi.suscriptores || '2.9M+'}</strong>
      </div>
      <div class="d-flex justify-content-between mb-2">
        <span class="text-muted">Videos</span>
        <strong class="text-accent">${kenyi.videos || '500+'}</strong>
      </div>
      <div class="mb-2">
        <span class="text-muted d-block mb-1">Idiomas</span>
        <div class="d-flex flex-wrap gap-1">
          ${(kenyi.idiomas || []).map(i =>
            `<span style="background:rgba(0,212,255,0.08);color:#00d4ff;border:1px solid rgba(0,212,255,0.2);padding:2px 8px;border-radius:4px;font-size:0.72rem;">${i}</span>`
          ).join('')}
        </div>
      </div>
      <div>
        <span class="text-muted d-block mb-1">Proyectos destacados</span>
        ${(kenyi.proyectos || []).map(p =>
          `<div class="mb-1" style="background:rgba(255,255,255,0.02);padding:4px 8px;border-radius:4px;border-left:2px solid #00d4ff;">
             <strong class="text-light" style="font-size:0.8rem;">${p.nombre}</strong>
             <span class="text-muted d-block" style="font-size:0.72rem;">${p.descripcion}</span>
           </div>`
        ).join('')}
      </div>
    </div>
  `;
}

function renderModalMicroservicio(kenyi) {
  const el = document.getElementById('modal-microservicio-data');
  if (!el) return;

  el.innerHTML = `
    <div style="font-size:0.85rem;">
      <div class="d-flex align-items-center gap-3 mb-3 p-2 rounded" style="background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.15);">
        <i class="bi bi-person-circle text-accent fs-3"></i>
        <div>
          <strong class="text-light">${kenyi.nombre}</strong>
          <p class="text-muted mb-0 small">${kenyi.titulo}</p>
        </div>
        <span class="ms-auto badge" style="background:rgba(0,212,255,0.1);color:#00d4ff;border:1px solid rgba(0,212,255,0.3);">
          Puerto 4000
        </span>
      </div>
      <div class="row g-2">
        <div class="col-sm-6">
          <div class="p-2 rounded" style="background:#010409;border:1px solid #30363d;">
            <pre style="margin:0;font-size:0.75rem;color:#79c0ff;">${JSON.stringify({
              nombre: kenyi.nombre,
              suscriptores: kenyi.suscriptores,
              videos: kenyi.videos
            }, null, 2)}</pre>
          </div>
        </div>
        <div class="col-sm-6">
          <p class="text-muted small mb-2">Proyectos del microservicio:</p>
          ${(kenyi.proyectos || []).map(p =>
            `<div class="mb-1 p-2 rounded" style="background:rgba(0,212,255,0.04);border:1px solid #30363d;">
               <strong class="text-light small">${p.nombre}</strong>
               <span class="text-muted d-block" style="font-size:0.72rem;">${p.descripcion}</span>
             </div>`
          ).join('')}
        </div>
      </div>
    </div>
  `;
}

/* ================================================================
   CARGA PRINCIPAL
   ================================================================ */

/**
 * Carga ingenieros desde la API (con fallback a datos demo)
 */
async function cargarIngenieros() {
  mostrarCargando('ingenieros-container', 'Cargando ingenieros de la API...');
  try {
    const data = await fetchConTimeout(ENDPOINTS.ingenieros);
    renderIngenieros(data.data || data, 'ingenieros-container');
  } catch (err) {
    console.warn('API de ingenieros no disponible, usando datos demo:', err.message);
    mostrarError('ingenieros-container', 'API desconectada — mostrando datos de demostración');
    setTimeout(() => renderIngenieros(DEMO_DATA.ingenieros, 'ingenieros-container'), 500);
  }
}

/**
 * Carga datos técnicos desde la API (con fallback)
 */
async function cargarDatos() {
  mostrarCargando('datos-container', 'Cargando datos técnicos...');
  try {
    const data = await fetchConTimeout(ENDPOINTS.datos);
    renderDatos(data.data || data, 'datos-container');
  } catch (err) {
    console.warn('API de datos no disponible, usando datos demo:', err.message);
    mostrarError('datos-container', 'API desconectada — mostrando datos de demostración');
    setTimeout(() => renderDatos(DEMO_DATA.datos, 'datos-container'), 500);
  }
}

/**
 * Carga datos de Kenyi desde el microservicio (con fallback)
 */
async function cargarKenyi() {
  try {
    const data = await fetchConTimeout(ENDPOINTS.kenyi);
    const kenyi = data.data || data;
    renderKenyi(kenyi, 'kenyi-datos');
    renderModalMicroservicio(kenyi);
  } catch (err) {
    console.warn('Microservicio no disponible, usando datos demo:', err.message);
    renderKenyi(DEMO_DATA.kenyi, 'kenyi-datos');
    renderModalMicroservicio(DEMO_DATA.kenyi);
  }
}

/* ================================================================
   MODAL — cargar datos al abrir
   ================================================================ */
function iniciarModal() {
  const modal = document.getElementById('modalMicroservicio');
  if (!modal) return;

  modal.addEventListener('show.bs.modal', () => {
    const el = document.getElementById('modal-microservicio-data');
    if (el && el.innerHTML.includes('spinner')) {
      // ya fue cargado al inicio, no recargar
    }
  });
}

/* ================================================================
   ANIMACIONES SCROLL (Intersection Observer)
   ================================================================ */
function iniciarAnimaciones() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.card-custom, .academic-block, .kenyi-card, .timeline-item')
    .forEach((el) => {
      el.classList.add('fade-in-up');
      observer.observe(el);
    });
}

/* ================================================================
   NAVBAR — cambio de estilo en scroll
   ================================================================ */
function iniciarNavbarScroll() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(7, 11, 16, 0.98)';
    } else {
      navbar.style.background = 'rgba(13, 17, 23, 0.95)';
    }
  }, { passive: true });
}

/* ================================================================
   SMOOTH SCROLL para anclas
   ================================================================ */
function iniciarSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // altura del navbar
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ================================================================
   INIT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Cargar datos de la API y microservicio en paralelo
  Promise.allSettled([
    cargarIngenieros(),
    cargarDatos(),
    cargarKenyi(),
  ]).then(() => {
    console.log('%cMecánicaTec API — Carga completada', 'color:#00d4ff;font-weight:bold;');
  });

  // Funcionalidades de UI
  iniciarModal();
  iniciarAnimaciones();
  iniciarNavbarScroll();
  iniciarSmoothScroll();
});
