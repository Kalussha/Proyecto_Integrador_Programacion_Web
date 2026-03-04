/* ================================================================
   validaciones.js
   Validación del formulario de contacto con Bootstrap 5
   ================================================================ */

'use strict';

/* ---------- Expresiones regulares ---------- */
const REGEX_EMAIL    = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const REGEX_TELEFONO = /^\d{10}$/;                 // exactamente 10 dígitos
const REGEX_NOMBRE   = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{3,80}$/; // letras y espacios

/* ---------- Helpers ---------- */
function setValid(input) {
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
}

function setInvalid(input, mensajeId, mensaje) {
  input.classList.remove('is-valid');
  input.classList.add('is-invalid');
  const el = document.getElementById(mensajeId);
  if (el) { el.textContent = mensaje; el.style.display = 'block'; }
}

function limpiarEstado(input, mensajeId) {
  input.classList.remove('is-valid', 'is-invalid');
  const el = document.getElementById(mensajeId);
  if (el) el.style.display = 'none';
}

/* ---------- Validadores individuales ---------- */
function validarNombre(valor) {
  if (!valor.trim()) return { ok: false, msg: 'El nombre es obligatorio.' };
  if (!REGEX_NOMBRE.test(valor.trim())) return { ok: false, msg: 'El nombre solo puede contener letras y espacios (mín. 3 caracteres).' };
  return { ok: true };
}

function validarCorreo(valor) {
  if (!valor.trim()) return { ok: false, msg: 'El correo electrónico es obligatorio.' };
  if (!REGEX_EMAIL.test(valor.trim())) return { ok: false, msg: 'Ingresa un correo electrónico válido (ej. usuario@dominio.com).' };
  return { ok: true };
}

function validarTelefono(valor) {
  const limpio = valor.replace(/\D/g, ''); // quitar no-dígitos
  if (!valor.trim()) return { ok: false, msg: 'El teléfono es obligatorio.' };
  if (!REGEX_TELEFONO.test(limpio)) return { ok: false, msg: 'El teléfono debe contener exactamente 10 dígitos numéricos.' };
  return { ok: true };
}

function validarArea(valor) {
  if (!valor) return { ok: false, msg: 'Selecciona un área de interés.' };
  return { ok: true };
}

function validarComentarios(valor) {
  if (!valor.trim()) return { ok: false, msg: 'Los comentarios son obligatorios.' };
  if (valor.trim().length < 10) return { ok: false, msg: 'Los comentarios deben tener al menos 10 caracteres.' };
  if (valor.trim().length > 1000) return { ok: false, msg: 'Los comentarios no pueden superar 1000 caracteres.' };
  return { ok: true };
}

/* ---------- Validación de un campo en tiempo real ---------- */
function validarCampo(inputId, mensajeId, validador) {
  const input = document.getElementById(inputId);
  if (!input) return true;

  const resultado = validador(input.value);
  if (resultado.ok) {
    setValid(input);
  } else {
    setInvalid(input, mensajeId, resultado.msg);
  }
  return resultado.ok;
}

/* ---------- Mostrar alerta Bootstrap en el formulario ---------- */
function mostrarAlerta(tipo, mensaje) {
  const contenedor = document.getElementById('form-alert');
  if (!contenedor) return;

  const iconos = {
    success: '<i class="bi bi-check-circle-fill me-2"></i>',
    danger:  '<i class="bi bi-x-circle-fill me-2"></i>',
    warning: '<i class="bi bi-exclamation-triangle-fill me-2"></i>',
    info:    '<i class="bi bi-info-circle-fill me-2"></i>',
  };

  contenedor.className = `alert alert-${tipo} alert-dismissible fade show`;
  contenedor.innerHTML = `
    ${iconos[tipo] || ''}
    ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  contenedor.style.display = 'block';
  contenedor.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function ocultarAlerta() {
  const contenedor = document.getElementById('form-alert');
  if (contenedor) contenedor.className = 'd-none';
}

/* ---------- Simulación de envío (POST a la API) ---------- */
async function enviarFormulario(datos) {
  const btn = document.getElementById('btn-enviar');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';
  }

  try {
    // Intenta enviar a la API real
    const res = await fetch('http://localhost:3000/api/contacto', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(datos),
    });

    if (res.ok) {
      const json = await res.json();
      mostrarAlerta('success',
        `✅ <strong>¡Mensaje enviado correctamente!</strong><br>
         Hola <strong>${datos.nombre}</strong>, tu consulta sobre
         <em>${datos.area}</em> fue registrada. Te contactaremos a <em>${datos.correo}</em>.`
      );
      document.getElementById('formContacto').reset();
      limpiarTodosLosEstados();
    } else {
      throw new Error('Error del servidor: ' + res.status);
    }
  } catch (err) {
    // Si la API no está disponible, simula éxito para el demo
    console.warn('API no disponible, modo demo:', err.message);
    mostrarAlerta('success',
      `✅ <strong>¡Mensaje recibido!</strong><br>
       Hola <strong>${datos.nombre}</strong>, gracias por contactarnos.
       Tu consulta sobre <em>${datos.area}</em> fue registrada.
       <span class="badge bg-warning text-dark ms-2">Modo Demo</span>`
    );
    document.getElementById('formContacto').reset();
    limpiarTodosLosEstados();
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-send me-2"></i>Enviar Mensaje';
    }
  }
}

/* ---------- Limpiar estados de validación ---------- */
function limpiarTodosLosEstados() {
  const campos = [
    ['nombre', 'error-nombre'],
    ['correo', 'error-correo'],
    ['telefono', 'error-telefono'],
    ['area', 'error-area'],
    ['comentarios', 'error-comentarios'],
  ];
  campos.forEach(([id, msgId]) => {
    const el = document.getElementById(id);
    if (el) limpiarEstado(el, msgId);
  });
}

/* ---------- Inicialización ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formContacto');
  if (!form) return;

  /* Validación en tiempo real */
  const campos = [
    { id: 'nombre',      msgId: 'error-nombre',      fn: validarNombre },
    { id: 'correo',      msgId: 'error-correo',      fn: validarCorreo },
    { id: 'telefono',    msgId: 'error-telefono',    fn: validarTelefono },
    { id: 'area',        msgId: 'error-area',        fn: validarArea },
    { id: 'comentarios', msgId: 'error-comentarios', fn: validarComentarios },
  ];

  campos.forEach(({ id, msgId, fn }) => {
    const input = document.getElementById(id);
    if (!input) return;

    input.addEventListener('input', () => {
      ocultarAlerta();
      validarCampo(id, msgId, fn);
    });

    input.addEventListener('change', () => {
      validarCampo(id, msgId, fn);
    });

    input.addEventListener('blur', () => {
      if (input.value.trim() !== '') {
        validarCampo(id, msgId, fn);
      }
    });
  });

  /* Envío del formulario */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    ocultarAlerta();

    let formValido = true;
    campos.forEach(({ id, msgId, fn }) => {
      const ok = validarCampo(id, msgId, fn);
      if (!ok) formValido = false;
    });

    if (!formValido) {
      mostrarAlerta('danger',
        '⚠️ <strong>Formulario incompleto.</strong> Por favor, revisa los campos marcados en rojo.'
      );
      // Scroll al primer error
      const primerError = form.querySelector('.is-invalid');
      if (primerError) primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const datos = {
      nombre:      document.getElementById('nombre').value.trim(),
      correo:      document.getElementById('correo').value.trim(),
      telefono:    document.getElementById('telefono').value.replace(/\D/g, ''),
      area:        document.getElementById('area').value,
      comentarios: document.getElementById('comentarios').value.trim(),
      fecha:       new Date().toISOString(),
    };

    await enviarFormulario(datos);
  });

  /* Reset: limpiar estados de validación */
  form.addEventListener('reset', () => {
    setTimeout(limpiarTodosLosEstados, 10);
    ocultarAlerta();
  });
});
