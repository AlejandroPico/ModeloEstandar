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

export interface ManualSection { eyebrow: string; title: string; text: string; key?: string; }
export interface ManualChapter {
  id: string;
  group?: string;
  kicker: string;
  title: string;
  subtitle: string;
  intro: string;
  symbol?: string;
  entityId?: string;
  mirror?: boolean;
  formula?: string;
  formulaNote?: string;
  sources?: Array<{ label: string; url: string }>;
  sections: ManualSection[];
}

const chapterMeta: Record<string, Omit<ManualChapter, 'sections'>> = {
  'Mapa general': {
    id: 'mapa', kicker: 'ORIENTACIÓN', title: 'El mapa de la materia', subtitle: 'Campos, partículas y estructura',
    intro: 'Antes de interpretar una ficha hay que distinguir tres ideas: una partícula elemental no es una bolita clásica, una estructura compuesta no es la simple suma de piezas inmóviles y el Modelo Estándar no pretende describir toda la física conocida.',
    formula: 'E^2=p^2c^2+m^2c^4', formulaNote: 'La energía de una partícula depende de su momento y de su masa en reposo; para un fotón, m = 0.'
  },
  Fermiones: {
    id: 'fermiones', kicker: 'CONSTITUYENTES', title: 'Fermiones: la materia elemental', subtitle: 'Quarks, leptones y generaciones',
    intro: 'Los fermiones elementales conocidos se organizan en quarks y leptones. Aparecen en tres generaciones con el mismo patrón de números cuánticos, pero masas y estabilidades radicalmente distintas.',
    formula: 's=\\frac{1}{2}', formulaNote: 'Todos los fermiones elementales del Modelo Estándar tienen spin semientero y obedecen el principio de exclusión de Pauli.'
  },
  Interacciones: {
    id: 'interacciones', kicker: 'DINÁMICA', title: 'Las cuatro interacciones fundamentales', subtitle: 'Qué fuerza actúa y mediante qué campo',
    intro: 'Fuerte, electromagnética, débil y gravedad constituyen la clasificación habitual. El Modelo Estándar incorpora descripciones cuánticas de las tres primeras; la gravedad se describe con enorme éxito mediante relatividad general, pero no forma parte de ese marco cuántico.',
    formula: 'SU(3)_C\\times SU(2)_L\\times U(1)_Y', formulaNote: 'Ésta es la estructura de simetrías gauge del Modelo Estándar antes de la ruptura electrodébil.'
  },
  Bosones: {
    id: 'bosones', kicker: 'CAMPOS', title: 'Bosones y mediadores', subtitle: 'Gluón, fotón, W, Z y Higgs',
    intro: 'Los bosones gauge permiten describir cómo los campos intercambian energía, momento y números cuánticos. El bosón de Higgs pertenece al sector escalar: es esencial para el mecanismo de masas, pero no es una quinta fuerza fundamental.',
    formula: 'm_W=\\frac{gv}{2}', formulaNote: 'La masa del W está ligada al acoplamiento débil g y al valor esperado del campo de Higgs v.'
  },
  Hadrones: {
    id: 'hadrones', kicker: 'COMPOSICIÓN', title: 'Hadrones: quarks confinados', subtitle: 'Bariones, mesones y fuerza residual',
    intro: 'Protones, neutrones, piones y kaones no son elementales. Son estados ligados de quarks, antiquarks y gluones cuya masa y comportamiento emergen mayoritariamente de la dinámica de la cromodinámica cuántica.',
    formula: '\\pi^+=u\\bar d', formulaNote: 'El contenido de valencia del pión positivo es un quark arriba y un antiquark abajo.'
  },
  'Átomos y núcleos': {
    id: 'atomos', kicker: 'EMERGENCIA', title: 'Del nucleón al átomo', subtitle: 'Núcleos, electrones e isótopos',
    intro: 'Los átomos aparecen varios niveles por encima de las partículas elementales. Electromagnetismo liga electrones y núcleos; la interacción nuclear residual permite que protones y neutrones formen núcleos.',
    formula: 'r\\approx r_0 A^{1/3}', formulaNote: 'El radio nuclear crece aproximadamente con la raíz cúbica del número másico A, con r₀ del orden de 1,2 fm.'
  },
  Escalas: {
    id: 'escalas', kicker: 'RESOLUCIÓN', title: 'Tamaño, energía y distancia', subtitle: 'Cómo se interpreta la regla izquierda',
    intro: 'La escala del atlas representa órdenes de magnitud, no fotografías a escala. Entre dos potencias de diez puede no existir una nueva capa estable de materia: a menudo cambia el régimen experimental o la teoría efectiva más útil.',
    formula: '\\lambda\\approx\\frac{h}{p}', formulaNote: 'Una sonda con mayor momento tiene menor longitud de onda asociada y puede resolver estructuras más pequeñas.'
  },
  Experimentos: {
    id: 'experimentos', kicker: 'EVIDENCIA', title: 'Cómo sabemos que una partícula existe', subtitle: 'Detectores, colisiones y estadística',
    intro: 'Los detectores no fotografían partículas como objetos cotidianos. Registran ionización, luz, depósitos de energía y trayectorias; después se reconstruyen procesos y se comparan distribuciones con predicciones y fondos.',
    formula: 'Z\\approx5\\sigma', formulaNote: 'En física de partículas suele exigirse una significación cercana a cinco desviaciones estándar antes de hablar de descubrimiento.'
  },
  'Más allá': {
    id: 'mas-alla', kicker: 'FRONTERA', title: 'Más allá del Modelo Estándar', subtitle: 'Supersimetría, sector oscuro y gravedad cuántica',
    intro: 'Una teoría puede ser matemáticamente atractiva y, aun así, carecer de confirmación. Las capas opcionales del atlas separan deliberadamente candidatos, extensiones y objetos teóricos del inventario observado.',
    formula: '\\ell_P=\\sqrt{\\frac{\\hbar G}{c^3}}', formulaNote: 'La longitud de Planck combina constantes fundamentales; no constituye una prueba de que el espacio sea granular ni de que existan cuerdas.'
  },
  'Lectura crítica': {
    id: 'lectura', kicker: 'MÉTODO', title: 'Cómo leer una afirmación científica', subtitle: 'Observado, inferido e hipotético',
    intro: 'El atlas usa el diseño para comunicar certeza epistemológica. Color, borde y capa nunca deben transformar una posibilidad teórica en un hecho experimental.',
    formula: '\\text{dato}\\rightarrow\\text{modelo}\\rightarrow\\text{inferencia}', formulaNote: 'Una medición adquiere significado al interpretarse con un modelo, sus supuestos y sus incertidumbres.'
  }
};

const manualDetails: Record<string, string> = {
  'Qué estudia la física de partículas': 'El objetivo no es sólo enumerar entidades. También se determinan simetrías, leyes de conservación, probabilidades de transición y condiciones bajo las que una descripción deja de ser válida. El atlas conecta por ello fichas, campos, fuerzas, escalas y sistemas compuestos.',
  'Qué es el Modelo Estándar': 'Combina cromodinámica cuántica y teoría electrodébil en una teoría de campos contrastada con enorme precisión. Sus parámetros se miden experimentalmente: el modelo no predice por sí solo todos sus valores.',
  'Partícula y campo': 'El campo existe en todo el espacio y admite excitaciones cuantizadas. La imagen de una esfera puede ayudar como icono, pero falla al explicar interferencia, creación y aniquilación o el hecho de que partículas idénticas sean indistinguibles.',
  'Elemental no significa diminuta': 'Los experimentos de dispersión buscan desviaciones respecto al comportamiento puntual. Cuando no aparecen, se establece una cota sobre posibles tamaños o subestructuras; esa cota puede mejorar con nuevos aceleradores.',
  'Materia compuesta': 'La composición es dinámica. Un protón no contiene tres quarks inmóviles: contiene campos de quarks y gluones, pares virtuales y energía de interacción. Del mismo modo, la nube electrónica de un átomo es un estado cuántico, no una órbita planetaria.',
  Quarks: 'Arriba, abajo, encanto, extraño, cima y fondo poseen cargas eléctricas fraccionarias y carga de color. Nunca se observan aislados en condiciones ordinarias; al intentar separarlos, la energía del campo produce nuevos hadrones.',
  'Leptones cargados': 'El electrón es estable; muón y tau decaen mediante la interacción débil. Que compartan carga y spin pero difieran tanto en masa constituye parte del problema abierto del sabor.',
  Neutrinos: 'Los tres sabores se producen y detectan en procesos débiles. La oscilación demuestra que tienen masa no nula, un hecho que exige extender la formulación mínima original del Modelo Estándar.',
  'Tres generaciones': 'La materia cotidiana estable usa casi exclusivamente la primera generación. Las otras aparecen en rayos cósmicos y colisiones de alta energía y decaen rápidamente hacia estados más ligeros.',
  Antimateria: 'La antipartícula conserva la masa y el spin, pero invierte cargas aditivas. Materia y antimateria pueden aniquilarse en estados permitidos por las leyes de conservación; esto no significa que toda partícula neutra sea automáticamente su propia antipartícula.',
  'Las cuatro fuerzas fundamentales': 'La palabra fuerza es una simplificación útil. En el nivel fundamental hablamos de interacciones entre campos. El alcance, la intensidad y las partículas afectadas dependen del mediador, las cargas y la energía del proceso.',
  'Interacción fuerte': 'Los gluones transportan carga de color y se acoplan entre sí. Esta auto-interacción está detrás del confinamiento y de la libertad asintótica: a distancias muy pequeñas los quarks se comportan como si interactuaran más débilmente.',
  'Fuerza nuclear residual': 'Entre protones y neutrones aparece un remanente de la interacción fuerte, comparable conceptualmente a cómo fuerzas intermoleculares emergen de átomos eléctricamente neutros. El intercambio de piones es una descripción efectiva útil a bajas energías.',
  Electromagnetismo: 'Actúa sobre partículas con carga eléctrica y tiene alcance macroscópico porque el fotón no posee masa en reposo. QED permite calcular observables como el momento magnético del electrón con precisión extraordinaria.',
  'Interacción débil': 'Puede transformar sabores y permite la desintegración beta. Como W y Z son masivos, su propagación está fuertemente limitada a distancias pequeñas; los neutrinos constituyen una de sus sondas principales.',
  Gravedad: 'A escala de partículas es extremadamente débil frente a las otras interacciones. No obstante, domina estructuras astronómicas porque siempre es atractiva y la masa-energía no se neutraliza como la carga eléctrica.',
  Electrodébil: 'Fotón y Z emergen de una mezcla de campos electrodébiles después de que el campo de Higgs adopte un valor no nulo en el vacío. A energías suficientemente altas la separación cotidiana entre electromagnetismo y débil deja de ser fundamental.',
  Acoplamientos: 'La polarización del vacío modifica los valores efectivos al cambiar la energía. Por eso comparar “la fuerza más intensa” sin indicar escala y proceso puede inducir a error.',
  Gluones: 'Existen ocho combinaciones de color independientes. Permanecen confinados dentro de hadrones y pueden contribuir a estados exóticos, chorros y una parte esencial del momento y la masa del protón.',
  Fotón: 'Transporta energía y momento aunque su masa en reposo sea cero. El fotón real de la radiación y el lenguaje de intercambio en diagramas perturbativos no deben interpretarse siempre como pequeñas bolas viajando entre cargas.',
  'Bosones W y Z': 'W± cambia la carga eléctrica de los participantes; Z media corrientes neutras. Sus descubrimientos en 1983 confirmaron de manera decisiva la estructura electrodébil.',
  'Campo de Higgs': 'El acoplamiento con el vacío de Higgs genera masas para W, Z y fermiones elementales. La mayor parte de la masa de protones y neutrones, sin embargo, procede de la energía de QCD, no directamente del Higgs.',
  'Bosón de Higgs': 'Observar el bosón fue observar una excitación del campo y verificar el mecanismo. Sus canales de producción y decaimiento siguen midiéndose para buscar pequeñas desviaciones respecto al Modelo Estándar.',
  'El Higgs no es una quinta fuerza': 'Puede mediar interacciones y posee acoplamientos, pero la clasificación tradicional de cuatro fuerzas responde a otra organización conceptual. En el atlas aparece como sector escalar para evitar esa confusión.',
  Bariones: 'El número bariónico y la estructura de tres quarks de valencia permiten agrupar protón, neutrón y resonancias. QCD admite además estados con contenido más complejo, siempre globalmente sin color observable.',
  Mesones: 'Suelen ser inestables y desempeñan papeles distintos según su masa y sabores. Piones son los más ligeros; kaones introdujeron históricamente el concepto de extrañeza.',
  Protón: 'Su contenido de valencia es uud, pero el reparto real de momento incluye gluones y un mar de pares quark-antiquark. Su estabilidad experimental es extraordinaria y la posible desintegración del protón sigue buscándose.',
  Neutrón: 'Fuera del núcleo decae a protón, electrón y antineutrino electrónico. Dentro de un núcleo, balances de energía y números cuánticos pueden impedir o permitir transformaciones diferentes.',
  'Pión positivo': 'Tiene carga +1, spin 0 y vida breve. Al decaer produce normalmente un muón positivo y un neutrino muónico; su papel nuclear es efectivo, mientras que el mediador fundamental de QCD es el gluón.',
  Confinamiento: 'La energía almacenada en el tubo de flujo de color crece al separar quarks. Antes de obtener un quark libre resulta energéticamente favorable crear un nuevo par y formar hadrones sin color.',
  'Átomo de hidrógeno': 'Su sencillez lo convierte en laboratorio de espectros, QED y constantes fundamentales. El protón es compuesto; el electrón no presenta subestructura observada.',
  Deuterio: 'Su núcleo, el deuterón, liga un protón y un neutrón débilmente. Es un sistema esencial para estudiar fuerzas nucleares y nucleosíntesis primordial.',
  Núcleos: 'La estabilidad resulta de la competencia entre atracción nuclear, repulsión eléctrica, niveles cuánticos y proporción entre protones y neutrones. No todos los agregados posibles forman estados ligados.',
  'Escalas no continuas': 'La regla lateral explicita los huecos para no sugerir niveles inventados. Las etiquetas “transición” indican cambios de resolución o régimen, no nuevos ladrillos de materia.',
  Femtómetro: 'Un femtómetro equivale a 10⁻¹⁵ m. En esta escala el lenguaje de nucleones, mesones y estructura hadrónica resulta natural.',
  'Alcance débil': 'La relación entre masa del mediador y alcance explica por qué los procesos débiles son raros a baja energía. No es un borde geométrico exacto, sino un decaimiento característico de la propagación.',
  'Límite de estructura': 'Decir “puntual hasta 10⁻¹⁹ m” resume una ausencia de desviaciones en los experimentos disponibles. No constituye una medición directa de radio cero.',
  'Energía y distancia': 'La correspondencia es aproximada y depende de la transferencia de momento. Un acelerador más energético no mejora automáticamente toda medida: luminosidad, detectores y fondos también importan.',
  Planck: 'A esa combinación de constantes se espera que efectos cuánticos de la gravedad sean relevantes. La enorme separación con las escalas experimentales explica por qué las propuestas son difíciles de contrastar.',
  'Cómo se descubre una partícula': 'Se define una firma, se modelan fondos, se analizan controles y se estima la probabilidad de una fluctuación. Después se requieren comprobaciones sistemáticas y, con frecuencia, confirmación independiente.',
  Detectores: 'Seguidores, calorímetros y cámaras de muones aportan mediciones complementarias. Neutrinos y candidatos invisibles se infieren por desequilibrios de energía y momento, no porque el detector los vea directamente.',
  Colisionadores: 'La energía cinética puede convertirse en masa de nuevas partículas. La luminosidad determina cuántas colisiones se producen y, junto a las secciones eficaces, cuántos eventos útiles se esperan.',
  'Rayos cósmicos': 'La naturaleza proporcionó energías extremas antes de los aceleradores. Su flujo y energía inicial son menos controlables, pero continúan siendo fundamentales para neutrinos y física de astropartículas.',
  Incertidumbre: 'Hay incertidumbres estadísticas y sistemáticas, además de dependencias teóricas. Una cifra sin intervalo, definición y método es insuficiente para una comparación de precisión.',
  'Por qué buscar nueva física': 'El éxito del modelo no elimina sus límites. No explica la materia oscura, la gravedad cuántica ni por qué el universo observable contiene mucha más materia que antimateria.',
  Supersimetría: 'Relaciona bosones y fermiones e introduce compañeros supersimétricos. Las versiones simples están muy restringidas por los experimentos, pero el espacio completo de modelos es amplio.',
  'Sectores oscuros': 'Pueden contener nuevas fuerzas y partículas neutras bajo las interacciones conocidas. Los portales del Higgs, vectorial o neutrínico describen posibles conexiones con el sector visible.',
  Gravitón: 'En una cuantización perturbativa sería un bosón sin masa de spin 2. Mostrarlo como ficha hipotética no implica que la relatividad general necesite esa partícula para funcionar como teoría clásica.',
  'Cuerdas y branas': 'En estos marcos los objetos fundamentales son extendidos y sus modos de vibración se interpretan como partículas. Las escalas y compactificaciones dependen del modelo y no se han observado directamente.',
  'Tres etiquetas imprescindibles': '“Observado” describe evidencia aceptada; “inferido” puede depender de un marco bien contrastado; “hipotético” designa una predicción aún no detectada. Mantener estas categorías separadas es parte del contenido científico, no sólo del diseño.'
};

export const encyclopediaChapters: ManualChapter[] = Object.entries(chapterMeta).map(([category, meta]) => ({
  ...meta,
  group: 'Fundamentos',
  sections: encyclopediaTopics.filter((topic) => topic.category === category).map((topic, index) => ({
    eyebrow: `${meta.kicker} · ${String(index + 1).padStart(2, '0')}`,
    title: topic.title,
    text: `${topic.text}\n\n${manualDetails[topic.title] ?? ''}`,
    key: index === 0 ? topic.text : undefined
  }))
}));
