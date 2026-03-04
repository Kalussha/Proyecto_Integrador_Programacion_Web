# ⚙️ MecánicaTec — Sitio Web de Ingeniería Mecánica

> Proyecto Integrador de Programación Web — Instituto Tecnológico

Sitio web informativo profesional sobre **Ingeniería Mecánica**, con arquitectura completa:
Frontend (Bootstrap 5) + Web API REST (Node.js/Express) + Microservicio Dockerizado.

---

## 📋 Descripción del Proyecto

MecánicaTec es un sitio web académico que cubre:

- 📖 **Historia** de la Ingeniería Mecánica
- 🔬 **Fundamentos**: Estática, Dinámica, Termodinámica, Mecánica de Fluidos y Materiales
- 🏭 **Aplicaciones Industriales**: Aeroespacial, Automotriz, Energía, Manufactura, Biomedicina
- 👤 **Sección especial** — Kenyi Nakamura (Ingeniero Mecánico Innovador)
- 📡 **Contenido académico** sobre Web APIs, Microservicios, Docker y Cloud Computing
- 📝 **Formulario de contacto** con validaciones JavaScript
- 🗺️ **Google Maps** embebido y video de YouTube
- 🐳 **Microservicio Docker** independiente en el puerto 4000

---

## 🛠️ Tecnologías Usadas

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5, CSS3, JavaScript ES6+, Bootstrap 5.3 |
| Iconos | Bootstrap Icons |
| Fuentes | Google Fonts (Rajdhani + Inter) |
| Backend | Node.js 18, Express 4 |
| CORS | cors 2.8 |
| Contenedores | Docker, Docker Compose |
| Arquitectura | MVC (Model - View - Controller) |

---

## 📂 Estructura del Proyecto

```
Proyecto Integrador/
│
├── Main/
│   └── index.html                  ← Frontend principal
│
├── CSS/
│   └── styles.css                  ← Estilos personalizados
│
├── JS/
│   ├── validaciones.js             ← Validaciones del formulario
│   └── api.js                      ← Consumo de la Web API con fetch()
│
├── Source/                         ← Web API REST (Puerto 3000)
│   ├── server.js                   ← Entrada del servidor Express
│   ├── package.json
│   ├── Dockerfile
│   ├── models/
│   │   └── mecanicaModel.js        ← Datos / Modelo
│   ├── controllers/
│   │   └── mecanicaController.js   ← Lógica de negocio
│   ├── routes/
│   │   └── mecanicaRoutes.js       ← Definición de rutas
│   └── microservicio-ingenieros/   ← Microservicio (Puerto 4000)
│       ├── server.js
│       ├── package.json
│       └── Dockerfile
│
├── docker-compose.yml              ← Orquestación Docker
└── README.md
```

---

## 🚀 Cómo Ejecutar

### Opción 1 — Con Docker (Recomendado)

**Requisito:** Tener [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado.

```bash
# 1. Clonar / abrir el proyecto
cd "Proyecto Integrador"

# 2. Construir y levantar todos los servicios
docker-compose up --build

# 3. Verificar servicios activos
docker-compose ps
```

Servicios disponibles:

| Servicio | URL |
|----------|-----|
| 🌐 Frontend | Abrir `Main/index.html` en el navegador |
| ⚙️ API Principal | http://localhost:3000 |
| 📦 Microservicio | http://localhost:4000 |

---

### Opción 2 — Sin Docker (Node.js local)

**Requisito:** Tener [Node.js 18+](https://nodejs.org/) instalado.

**Terminal 1 — API Principal:**
```bash
cd Source
npm install
npm start
# → http://localhost:3000
```

**Terminal 2 — Microservicio:**
```bash
cd Source/microservicio-ingenieros
npm install
npm start
# → http://localhost:4000
```

**Frontend:**
Abrir `Main/index.html` con la extensión **Live Server** de VS Code o directamente en el navegador.

---

## 🐳 Comandos Docker

```bash
# Construir y levantar (primera vez)
docker-compose up --build

# Levantar servicios ya construidos
docker-compose up

# Levantar en modo background
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Ver estado de los servicios
docker-compose ps

# Detener y eliminar contenedores
docker-compose down

# Detener y eliminar contenedores + imágenes
docker-compose down --rmi all

# Construir solo la API principal
docker build -t mecanica-api:1.0 ./Source

# Construir solo el microservicio
docker build -t microservicio-ingenieros:1.0 ./Source/microservicio-ingenieros

# Ejecutar contenedor de la API manualmente
docker run -p 3000:3000 mecanica-api:1.0

# Ver logs de un contenedor específico
docker logs mecanica-api
docker logs microservicio-ingenieros
```

---

## 📡 Endpoints de la API

### Web API Principal — `http://localhost:3000`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/` | Información general de la API |
| `GET` | `/health` | Estado de salud |
| `GET` | `/api/mecanica` | Información general de la disciplina |
| `GET` | `/api/historia` | Historia de la Ingeniería Mecánica |
| `GET` | `/api/ingenieros` | Lista de ingenieros destacados |
| `GET` | `/api/ingenieros/:id` | Ingeniero por ID |
| `GET` | `/api/datos` | Datos técnicos de referencia |
| `POST` | `/api/contacto` | Recibir formulario de contacto |

**Ejemplo de petición POST `/api/contacto`:**
```json
{
  "nombre": "Juan García",
  "correo": "juan@correo.com",
  "telefono": "5512345678",
  "area": "robotica",
  "comentarios": "Me interesa aprender sobre robótica industrial."
}
```

---

### Microservicio — `http://localhost:4000`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/` | Información del microservicio |
| `GET` | `/health` | Estado de salud |
| `GET` | `/api/kenyi` | Perfil completo de Kenyi Nakamura |
| `GET` | `/api/ingenieros` | Lista de ingenieros del microservicio |
| `GET` | `/api/ingenieros/:id` | Ingeniero por ID |

---

## ✅ Lista de Cotejo — Cumplimiento Académico

- [x] Diseño moderno con paleta industrial (azul oscuro / gris)
- [x] Mínimo 3 componentes Bootstrap (Navbar, Carrusel, Cards, Accordion, Modal)
- [x] Formulario validado con JavaScript (regex email, teléfono numérico, campos obligatorios)
- [x] Multimedia: video YouTube embebido + Google Maps
- [x] Web API REST funcional (Node.js + Express)
- [x] Estructura MVC (models, controllers, routes)
- [x] Endpoints GET y POST
- [x] Consumo con `fetch()` desde el frontend
- [x] Manejo de errores en la API y el frontend
- [x] CORS habilitado
- [x] Microservicio Dockerizado independiente (puerto 4000)
- [x] Dockerfile para cada servicio
- [x] docker-compose.yml con red compartida
- [x] Responsive (Bootstrap 5 + Media Queries)
- [x] Contenido académico completo (Web APIs, Microservicios, Docker, Cloud)
- [x] Sección de Kenyi Nakamura
- [x] Footer profesional
- [x] Listo para GitHub y deploy en hosting

---

## 🌐 Deploy en Hosting

Para subir a producción recomendamos:

- **Frontend:** [GitHub Pages](https://pages.github.com/) o [Netlify](https://netlify.com/)
- **API + Microservicio:** [Render](https://render.com/), [Railway](https://railway.app/) o [Fly.io](https://fly.io/)

---

## 👤 Sobre Kenyi Nakamura

Kenji Nakamura (también conocido como Kenyi Nakamura) es un creador de contenido mexicano con raíces japonesas,
popular en redes sociales por su pasión por la cultura automovilística JDM (Japanese Domestic Market),
el drift y las modificaciones de autos. Conocido como "El Siemprependientín" o "Japo-Gto",
conecta la cultura de México y Japón a través de sus videos.

---

*© 2026 MecánicaTec — Proyecto Integrador de Programación Web*
