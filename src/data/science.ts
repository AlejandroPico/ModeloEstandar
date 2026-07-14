import type { Particle } from './types';
import { interactionLabels } from './particles';

export interface ScalePoint {
  exponent: string;
  metres: string;
  title: string;
  description: string;
  kind: 'object' | 'transition' | 'limit';
}

export const scalePoints: ScalePoint[] = [
  { exponent: '10⁻¹⁰', metres: '0,1 nm', title: 'Escala atómica', description: 'Radio típico de un átomo y extensión de la nube electrónica.', kind: 'object' },
  { exponent: '10⁻¹¹', metres: '10 pm', title: 'Interior electrónico', description: 'Escala de átomos compactos e interiores de nubes electrónicas; no aparece una nueva partícula universal.', kind: 'transition' },
  { exponent: '10⁻¹²', metres: '1 pm', title: 'Escala de Compton electrónica', description: 'Orden asociado a la longitud de onda de Compton del electrón; es una escala cuántica, no su radio.', kind: 'transition' },
  { exponent: '10⁻¹³', metres: '100 fm', title: 'Transición átomo–núcleo', description: 'Intervalo sin un nivel estructural universal estable: separa ampliamente la nube del núcleo.', kind: 'transition' },
  { exponent: '10⁻¹⁴', metres: '10 fm', title: 'Núcleos grandes', description: 'Diámetros de núcleos pesados y alcance de algunos procesos nucleares.', kind: 'object' },
  { exponent: '10⁻¹⁵', metres: '1 fm', title: 'Nucleones y hadrones', description: 'Protones, neutrones, mesones y dinámica de la fuerza nuclear residual.', kind: 'object' },
  { exponent: '10⁻¹⁶', metres: '0,1 fm', title: 'Estructura hadrónica', description: 'Sondas de dispersión resuelven el interior dinámico de protones y neutrones.', kind: 'transition' },
  { exponent: '10⁻¹⁷', metres: '0,01 fm', title: 'Altas energías', description: 'Régimen de colisiones donde se prueban interacciones electrodébiles y estructura partónica.', kind: 'transition' },
  { exponent: '10⁻¹⁸', metres: '1 am', title: 'Alcance débil', description: 'Orden de alcance de la interacción débil debido a las grandes masas de W y Z.', kind: 'object' },
  { exponent: '10⁻¹⁹', metres: '0,1 am', title: 'Límite elemental', description: 'No se ha observado estructura interna de quarks, leptones ni bosones elementales a estas resoluciones.', kind: 'limit' },
  { exponent: '10⁻³⁵', metres: 'ℓₚ', title: 'Longitud de Planck', description: 'Frontera natural de gravedad cuántica; no demuestra que existan cuerdas ni objetos de ese tamaño.', kind: 'limit' }
];

export interface EncyclopediaTopic { number: number; category: string; title: string; text: string; }

const topicRows: Array<[string, string, string]> = [
  ['Mapa general', 'Qué estudia la física de partículas', 'Busca describir los constituyentes elementales, los campos cuánticos y las reglas mediante las que interactúan.'],
  ['Mapa general', 'Qué es el Modelo Estándar', 'Es la teoría cuántica que organiza quarks, leptones, bosones gauge y el sector de Higgs. No incluye una descripción cuántica confirmada de la gravedad.'],
  ['Mapa general', 'Partícula y campo', 'En teoría cuántica de campos, una partícula es una excitación cuantizada de un campo; no debe imaginarse siempre como una esfera rígida.'],
  ['Mapa general', 'Elemental no significa diminuta', 'Significa que los experimentos no han resuelto estructura interna, dentro de la sensibilidad disponible.'],
  ['Mapa general', 'Materia compuesta', 'Átomos, núcleos y hadrones emergen al ligar entidades más elementales mediante interacciones.'],
  ['Fermiones', 'Quarks', 'Seis sabores con carga de color. Permanecen confinados y forman hadrones.'],
  ['Fermiones', 'Leptones cargados', 'Electrón, muón y tau comparten carga y spin, pero tienen masas y vidas muy distintas.'],
  ['Fermiones', 'Neutrinos', 'Son neutros, interactúan débilmente y oscilan porque los estados de sabor y masa no coinciden.'],
  ['Fermiones', 'Tres generaciones', 'Cada generación repite el patrón de cargas; las generaciones segunda y tercera son más masivas e inestables.'],
  ['Fermiones', 'Antimateria', 'Cada fermión posee una antipartícula con números cuánticos opuestos; algunas partículas neutras son autoconjugadas.'],
  ['Interacciones', 'Las cuatro fuerzas fundamentales', 'Son interacción fuerte, electromagnetismo, interacción débil y gravedad. Las tres primeras tienen descripción cuántica dentro del Modelo Estándar.'],
  ['Interacciones', 'Interacción fuerte', 'La cromodinámica cuántica describe quarks y gluones mediante la simetría gauge SU(3)C.'],
  ['Interacciones', 'Fuerza nuclear residual', 'La unión entre nucleones es un efecto residual de QCD; los piones son útiles en su descripción efectiva, pero no son mediadores fundamentales de QCD.'],
  ['Interacciones', 'Electromagnetismo', 'La electrodinámica cuántica describe la interacción de cargas eléctricas mediante fotones.'],
  ['Interacciones', 'Interacción débil', 'W y Z median procesos que cambian sabor, desintegraciones beta e interacciones de neutrinos.'],
  ['Interacciones', 'Gravedad', 'Está experimentalmente confirmada y se describe clásicamente con relatividad general, pero queda fuera del Modelo Estándar.'],
  ['Interacciones', 'Electrodébil', 'A energías altas, electromagnetismo e interacción débil son aspectos de una estructura unificada.'],
  ['Interacciones', 'Acoplamientos', 'La intensidad efectiva de una interacción depende de la escala de energía; no es un único número universal fijo.'],
  ['Bosones', 'Gluones', 'Ocho estados de gluón transportan color y se acoplan entre sí.'],
  ['Bosones', 'Fotón', 'Es el cuanto del campo electromagnético, sin masa en reposo y con alcance infinito.'],
  ['Bosones', 'Bosones W y Z', 'Su gran masa limita el alcance de la interacción débil y permite procesos cargados y neutros.'],
  ['Bosones', 'Campo de Higgs', 'Llena el vacío y permite masas para partículas elementales mediante el mecanismo de Brout–Englert–Higgs.'],
  ['Bosones', 'Bosón de Higgs', 'Es una excitación observable del campo de Higgs, descubierta por ATLAS y CMS en 2012.'],
  ['Bosones', 'El Higgs no es una quinta fuerza', 'El sector de Higgs es esencial, pero no se enumera entre las cuatro interacciones fundamentales habituales.'],
  ['Hadrones', 'Bariones', 'Son hadrones cuyo contenido de valencia tiene tres quarks; protón y neutrón son los ejemplos cotidianos.'],
  ['Hadrones', 'Mesones', 'Son estados ligados con contenido de valencia quark–antiquark, como piones y kaones.'],
  ['Hadrones', 'Protón', 'Contiene uud de valencia dentro de un sistema dinámico de gluones y pares quark–antiquark.'],
  ['Hadrones', 'Neutrón', 'Contiene udd de valencia; libre decae débilmente, pero puede ser estable dentro de ciertos núcleos.'],
  ['Hadrones', 'Pión positivo', 'Es el mesón π+ con contenido de valencia u y anti-d; es subatómico, compuesto e inestable.'],
  ['Hadrones', 'Confinamiento', 'Los quarks y gluones con color no aparecen aislados en condiciones ordinarias; se hadronizan.'],
  ['Átomos y núcleos', 'Átomo de hidrógeno', 'Un protón y un electrón forman el átomo neutro más sencillo.'],
  ['Átomos y núcleos', 'Deuterio', 'Añade un neutrón al núcleo del hidrógeno y permite mostrar una estructura nuclear ligada.'],
  ['Átomos y núcleos', 'Núcleos', 'Agrupaciones de protones y neutrones ligadas por la interacción nuclear residual.'],
  ['Átomos y núcleos', 'Escalas no continuas', 'No existe necesariamente una nueva partícula en cada potencia de diez; algunos intervalos expresan transición o resolución experimental.'],
  ['Escalas', 'Femtómetro', '10⁻¹⁵ m es el orden característico de nucleones y muchos fenómenos hadrónicos.'],
  ['Escalas', 'Alcance débil', 'El intercambio de W y Z masivos produce un alcance del orden de 10⁻¹⁸ m.'],
  ['Escalas', 'Límite de estructura', 'Las cotas experimentales no equivalen a afirmar que una partícula tenga radio exactamente cero.'],
  ['Escalas', 'Energía y distancia', 'En dispersión, mayor transferencia de momento permite investigar distancias menores de forma aproximada.'],
  ['Escalas', 'Planck', 'La longitud de Planck combina G, ħ y c; marca una frontera teórica, no una observación de granularidad.'],
  ['Experimentos', 'Cómo se descubre una partícula', 'Se infiere mediante patrones estadísticos, productos de decaimiento, conservación de cantidades y comparación con modelos.'],
  ['Experimentos', 'Detectores', 'Capas especializadas reconstruyen trayectorias, energía, momento, carga y partículas invisibles mediante balance.'],
  ['Experimentos', 'Colisionadores', 'Concentran energía para producir estados pesados y estudiar interacciones a distancias muy pequeñas.'],
  ['Experimentos', 'Rayos cósmicos', 'Permitieron descubrir muones, piones, kaones y otras partículas antes de los grandes aceleradores modernos.'],
  ['Experimentos', 'Incertidumbre', 'Toda cifra física precisa requiere método, unidad, incertidumbre y, a veces, esquema de renormalización.'],
  ['Más allá', 'Por qué buscar nueva física', 'Materia oscura, masas de neutrinos, asimetría materia–antimateria y gravedad cuántica señalan límites del modelo actual.'],
  ['Más allá', 'Supersimetría', 'Propone compañeros con spin desplazado media unidad; no se ha confirmado experimentalmente.'],
  ['Más allá', 'Sectores oscuros', 'Introducen campos o mediadores nuevos que podrían comunicarse débilmente con el sector conocido.'],
  ['Más allá', 'Gravitón', 'Sería un cuanto de spin 2 de la gravedad; no ha sido observado. La gravedad misma sí está observada.'],
  ['Más allá', 'Cuerdas y branas', 'Son objetos de marcos matemáticos de gravedad cuántica; no pertenecen al inventario experimental de partículas.'],
  ['Lectura crítica', 'Tres etiquetas imprescindibles', 'Cada ficha debe distinguir observado, inferido dentro de una teoría confirmada e hipotético sin detección.']
];

export const encyclopediaTopics: EncyclopediaTopic[] = topicRows.map(([category, title, text], index) => ({ number: index + 1, category, title, text }));

export interface DossierPoint { number: number; category: string; label: string; value: string; }

const familyLabel: Record<Particle['family'], string> = {
  quark: 'quark elemental', lepton: 'leptón elemental', gauge: 'bosón gauge', scalar: 'bosón escalar', composite: 'sistema compuesto', force: 'interacción fundamental', theory: 'entidad hipotética', string: 'objeto extendido teórico'
};

export function particleDossier(particle: Particle): DossierPoint[] {
  const participates = (key: keyof typeof interactionLabels): string => particle.interactions.includes(key) ? `Sí · ${interactionLabels[key]}` : 'No participa directamente';
  const sources = particle.sources.map((source) => source.label);
  const values: Array<[string, string, string]> = [
    ['Identidad', 'Nombre', particle.name], ['Identidad', 'Nombre internacional', particle.englishName], ['Identidad', 'Símbolo', particle.symbol], ['Identidad', 'Clasificación', familyLabel[particle.family]],
    ['Identidad', 'Zona del atlas', particle.zone ?? 'Modelo Estándar'], ['Identidad', 'Estado', particle.evidence === 'observed' ? 'Observada o interacción confirmada' : 'Hipotética; no observada'],
    ['Identidad', 'Marco', particle.theory ?? 'Modelo Estándar / física establecida'], ['Identidad', 'Escala', particle.scale ?? 'Sin tamaño propio asignado'],
    ['Identidad', 'Estructura', particle.constituents?.length ? 'Compuesta o relacionada con constituyentes' : particle.family === 'force' ? 'Interacción/campo, no partícula material' : 'Sin estructura interna observada'],
    ['Identidad', 'Resumen', particle.summary],
    ['Propiedades', 'Masa o parámetro', particle.mass], ['Propiedades', 'Carga', particle.charge], ['Propiedades', 'Spin', particle.spin], ['Propiedades', 'Generación', particle.generation?.toString() ?? 'No aplica'],
    ['Propiedades', 'Carga de color', particle.colorCharge ? 'Sí' : 'No'], ['Propiedades', 'Vida o alcance', particle.lifetime], ['Propiedades', 'Estabilidad', /estable/i.test(particle.lifetime) ? particle.lifetime : 'Inestable, confinada o dependiente del modelo'],
    ['Antimateria', 'Antipartícula', `${particle.antiparticle} · ${particle.antiparticleName}`], ['Antimateria', 'Autoconjugación', particle.selfConjugate ? 'Es su propia antipartícula' : 'Posee estado de antimateria distinto'],
    ['Interacciones', 'Número de sectores indicados', particle.interactions.length.toString()], ['Interacciones', 'Fuerte', participates('strong')], ['Interacciones', 'Electromagnética', participates('electromagnetic')],
    ['Interacciones', 'Débil', participates('weak')], ['Interacciones', 'Higgs', participates('higgs')], ['Interacciones', 'Gravedad', participates('gravity')],
    ['Composición', 'Constituyentes enlazados', particle.constituents?.join(', ') ?? 'Ninguno conocido o no aplica'], ['Composición', 'Lectura de valencia', particle.constituentSummary ?? 'No aplica'],
    ['Composición', 'Descripción', particle.composition], ['Composición', 'Función física', particle.role], ['Composición', 'Proceso característico', particle.decays],
    ['Matemáticas', 'Relación principal', particle.formula], ['Matemáticas', 'Unidades', 'Las masas se expresan habitualmente en eV/c² y las escalas en metros o femtómetros.'],
    ['Matemáticas', 'Interpretación del spin', `Spin ${particle.spin}; es un número cuántico, no una rotación clásica de una esfera.`],
    ['Matemáticas', 'Campo y cuanto', particle.family === 'force' ? 'La ficha representa una interacción; sus mediadores aparecen enlazados.' : 'La partícula se interpreta como excitación de uno o varios campos cuánticos.'],
    ['Historia', 'Descubrimiento', particle.discovered], ['Historia', 'Tipo de evidencia', particle.evidence === 'observed' ? 'Evidencia experimental aceptada' : 'Predicción o candidato sin detección confirmada'],
    ['Historia', 'Confianza', particle.confidence ?? 'Integrada en la física experimental establecida'], ['Historia', 'Teoría asociada', particle.theory ?? 'Modelo Estándar, QED, QCD o teoría electrodébil según el sector'],
    ['Fuentes', 'Número de fuentes', sources.length.toString()], ['Fuentes', 'Fuente principal', sources[0] ?? 'Sin fuente enlazada'], ['Fuentes', 'Fuente adicional', sources[1] ?? 'No añadida todavía'],
    ['Visualización', 'Modo espejo', particle.mirrorNote ?? (particle.selfConjugate ? 'El espejo repite la misma especie para comparar.' : `El espejo muestra ${particle.antiparticleName}.`)],
    ['Visualización', 'Relaciones', particle.constituents?.length ? 'Al seleccionar, se iluminan constituyentes y estructuras que la contienen.' : 'Al seleccionar, se iluminan mediadores e interacciones relacionadas.'],
    ['Visualización', 'Escala gráfica', 'La posición expresa orden de magnitud; el dibujo no reproduce tamaños relativos exactos.'],
    ['Visualización', 'Iconografía', particle.visual ? `Representación didáctica: ${particle.visual}.` : 'Símbolo tipográfico; no implica forma geométrica real.'],
    ['Preguntas abiertas', 'Límite conocido', particle.evidence === 'hypothetical' ? 'No existe detección confirmada.' : 'Las medidas futuras pueden aumentar precisión o revelar desviaciones.'],
    ['Preguntas abiertas', 'Dependencia del modelo', particle.theory ? `Sus propiedades dependen de ${particle.theory}.` : 'Los parámetros medidos se interpretan dentro de teorías y convenciones concretas.'],
    ['Preguntas abiertas', 'Matiz científico', particle.note ?? 'No debe confundirse la ilustración con una fotografía ni con una esfera clásica.'],
    ['Lectura', 'Criterio editorial', 'Se separan observación, interpretación teórica e hipótesis para no presentar especulación como hecho.'],
    ['Lectura', 'Siguiente paso', sources.length ? `Consultar ${sources[0]} para valores, incertidumbres y bibliografía técnica.` : 'Consultar revisiones experimentales especializadas.']
  ];
  return values.map(([category, label, value], index) => ({ number: index + 1, category, label, value }));
}
