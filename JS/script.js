// Inicializar AOS
AOS.init({ duration: 1000 });

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.remove('bi-moon-stars-fill');
    themeIcon.classList.add('bi-sun-fill');
}

// Toggle theme
themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('bi-moon-stars-fill');
        themeIcon.classList.add('bi-sun-fill');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('bi-sun-fill');
        themeIcon.classList.add('bi-moon-stars-fill');
        localStorage.setItem('theme', 'light');
    }
});

// Validación del Formulario
const form = document.getElementById('contactForm');
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Limpiar mensajes previos
    document.getElementById('successAlert').classList.add('d-none');
    document.getElementById('errorAlert').classList.add('d-none');

    // Validaciones
    let isValid = true;

    // Validar Nombre
    const nombre = document.getElementById('nombre');
    if (!nombre.value.trim()) {
        document.getElementById('nombreError').textContent = 'El nombre es requerido';
        nombre.classList.add('is-invalid');
        isValid = false;
    } else {
        nombre.classList.remove('is-invalid');
        nombre.classList.add('is-valid');
    }

    // Validar Email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value || !emailRegex.test(email.value)) {
        document.getElementById('emailError').textContent = 'Ingresa un email válido';
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
    }

    // Validar Teléfono
    const telefono = document.getElementById('telefono');
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
    if (!telefono.value || !phoneRegex.test(telefono.value)) {
        document.getElementById('telefonoError').textContent = 'Ingresa un teléfono válido';
        telefono.classList.add('is-invalid');
        isValid = false;
    } else {
        telefono.classList.remove('is-invalid');
        telefono.classList.add('is-valid');
    }

    // Validar Tema
    const tema = document.getElementById('tema');
    if (!tema.value) {
        document.getElementById('temaError').textContent = 'Selecciona un tema';
        tema.classList.add('is-invalid');
        isValid = false;
    } else {
        tema.classList.remove('is-invalid');
        tema.classList.add('is-valid');
    }

    // Validar Comentarios
    const comentarios = document.getElementById('comentarios');
    if (!comentarios.value.trim()) {
        document.getElementById('comentariosError').textContent = 'Los comentarios son requeridos';
        comentarios.classList.add('is-invalid');
        isValid = false;
    } else {
        comentarios.classList.remove('is-invalid');
        comentarios.classList.add('is-valid');
    }

    // Si todo es válido, simular envío
    if (isValid) {
        document.getElementById('submitBtn').disabled = true;
        document.getElementById('submitBtn').innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';

        // Simular delay de envío
        setTimeout(() => {
            document.getElementById('successAlert').classList.remove('d-none');
            form.reset();
            document.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('submitBtn').innerHTML = '<i class="bi bi-send"></i> Enviar Mensaje';
        }, 1500);
    }
});

// Limpiar validación al escribir
document.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
        field.classList.remove('is-invalid', 'is-valid');
    });
});
