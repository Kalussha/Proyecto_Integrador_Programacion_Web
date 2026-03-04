// ================================================================
// models/mecanicaModel.js
// Modelos de datos (capa Model del patrón MVC)
// ================================================================

const historia = [
  {
    id: 1,
    periodo: 'Antigüedad (287 a.C.)',
    titulo: 'Arquímedes y los Principios Mecánicos',
    descripcion: 'Arquímedes formula los principios de palancas, poleas y el principio de flotabilidad.',
    personajes: ['Arquímedes'],
  },
  {
    id: 2,
    periodo: 'Siglo XV',
    titulo: 'Leonardo da Vinci',
    descripcion: 'Diseña máquinas voladoras, engranajes y mecanismos. Considerado el primer ingeniero mecánico moderno.',
    personajes: ['Leonardo da Vinci'],
  },
  {
    id: 3,
    periodo: '1769',
    titulo: 'Revolución Industrial',
    descripcion: 'James Watt mejora la máquina de vapor, desencadenando la Revolución Industrial.',
    personajes: ['James Watt'],
  },
  {
    id: 4,
    periodo: '1847',
    titulo: 'Institucionalización de la Profesión',
    descripcion: 'Fundación de la Institution of Mechanical Engineers (IMechE) en Birmingham, Reino Unido.',
    personajes: ['George Stephenson'],
  },
  {
    id: 5,
    periodo: '1903',
    titulo: 'Primer Vuelo Motorizado',
    descripcion: 'Los hermanos Wright logran el primer vuelo motorizado controlado, aplicando principios de mecánica aerodinámica.',
    personajes: ['Orville Wright', 'Wilbur Wright'],
  },
  {
    id: 6,
    periodo: 'Siglo XXI',
    titulo: 'Industria 4.0 e IA',
    descripcion: 'La ingeniería mecánica se fusiona con IA, IoT, robótica y manufactura aditiva.',
    personajes: ['Kenyi Nakamura', 'Elon Musk'],
  },
];

const ingenieros = [
  {
    id: 1,
    nombre: 'Kenyi Nakamura',
    especialidad: 'Mecatrónica e Industria 4.0',
    pais: 'México',
    publicaciones: 24,
    patentes: 3,
    proyectos: ['RoboArm X1', 'ThermoSense IoT', 'FluidSim Pro'],
    destacado: true,
  },
  {
    id: 2,
    nombre: 'James Watt',
    especialidad: 'Máquinas de Vapor',
    pais: 'Escocia',
    publicaciones: 12,
    patentes: 6,
    proyectos: ['Máquina de Vapor Mejorada', 'Indicador de Presión'],
    destacado: false,
  },
  {
    id: 3,
    nombre: 'Nikola Tesla',
    especialidad: 'Electromecánica',
    pais: 'Serbia / EE.UU.',
    publicaciones: 45,
    patentes: 300,
    proyectos: ['Motor AC', 'Bobina Tesla', 'Torre de Wardenclyffe'],
    destacado: false,
  },
  {
    id: 4,
    nombre: 'Rudolf Diesel',
    especialidad: 'Motores de Combustión Interna',
    pais: 'Alemania',
    publicaciones: 8,
    patentes: 15,
    proyectos: ['Motor Diesel', 'Ciclo Diesel'],
    destacado: false,
  },
  {
    id: 5,
    nombre: 'Leonardo da Vinci',
    especialidad: 'Máquinas y Mecanismos',
    pais: 'Italia',
    publicaciones: 30,
    patentes: 0,
    proyectos: ['Máquina Voladora', 'Engranajes Helicoidales', 'Carro de Combate'],
    destacado: false,
  },
];

const datosTecnicos = [
  { id: 1, parametro: 'Resistencia a tensión del Acero AISI 1020', valor: '420 MPa', unidad: 'Tensión última', categoria: 'Materiales' },
  { id: 2, parametro: 'Módulo de Young (Acero)',                    valor: '200 GPa', unidad: 'Elasticidad',   categoria: 'Materiales' },
  { id: 3, parametro: 'Temperatura de fusión del Aluminio',         valor: '660 °C',  unidad: 'Termopropiedad',categoria: 'Termodinámica' },
  { id: 4, parametro: 'Eficiencia del Ciclo de Carnot',             valor: '~60%',    unidad: 'Rendimiento',   categoria: 'Termodinámica' },
  { id: 5, parametro: 'Velocidad del sonido en acero',              valor: '5960 m/s',unidad: 'Propagación',   categoria: 'Física' },
  { id: 6, parametro: 'Coeficiente de Poisson (acero)',             valor: '0.30',    unidad: 'Adimensional',  categoria: 'Materiales' },
  { id: 7, parametro: 'Gravedad estándar',                          valor: '9.81 m/s²',unidad: 'Aceleración',  categoria: 'Física' },
  { id: 8, parametro: 'Número de Reynolds (flujo turbulento)',      valor: '> 4000',  unidad: 'Adimensional',  categoria: 'Fluidos' },
];

const infoMecanica = {
  disciplina: 'Ingeniería Mecánica',
  descripcion: 'Rama de la ingeniería que aplica principios de física, matemáticas y ciencia de materiales para diseñar, analizar, fabricar y mantener sistemas mecánicos.',
  ramas: ['Estática', 'Dinámica', 'Termodinámica', 'Mecánica de Fluidos', 'Mecánica de Materiales', 'Diseño de Máquinas'],
  herramientas: ['SolidWorks', 'ANSYS', 'AutoCAD', 'MATLAB', 'Catia V5'],
  version: '1.0.0',
  api: 'MecánicaTec API',
};

module.exports = { historia, ingenieros, datosTecnicos, infoMecanica };
