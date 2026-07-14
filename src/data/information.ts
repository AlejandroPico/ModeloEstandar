import { compositeParticles, frontierObjects, interactionLabels, particles, theoryParticles } from './particles';
import { forceEntities } from './forces';
import { encyclopediaChapters, type ManualChapter, type ManualSection } from './science';
import type { Interaction, Particle } from './types';

export const catalogParticles: Particle[] = [
  ...particles,
  ...forceEntities,
  ...compositeParticles,
  ...theoryParticles,
  ...frontierObjects
];

const familyName: Record<Particle['family'], string> = {
  quark: 'quark elemental',
  lepton: 'leptón elemental',
  gauge: 'bosón gauge',
  scalar: 'bosón escalar',
  composite: 'sistema compuesto',
  force: 'interacción fundamental',
  theory: 'entidad hipotética',
  string: 'objeto extendido teórico'
};

const groupName: Record<Particle['family'], string> = {
  quark: 'Partículas elementales',
  lepton: 'Partículas elementales',
  gauge: 'Partículas elementales',
  scalar: 'Partículas elementales',
  composite: 'Materia compuesta',
  force: 'Interacciones',
  theory: 'Hipótesis y candidatos',
  string: 'Cuerdas y branas'
};

const interactionExplanation: Record<Interaction, string> = {
  strong: 'La interacción fuerte responde a la carga de color. En el nivel fundamental está descrita por QCD y sus mediadores son los gluones; en nucleones y núcleos aparece además una interacción residual efectiva.',
  electromagnetic: 'La interacción electromagnética responde a la carga eléctrica. Está descrita por QED, tiene al fotón como cuanto y conserva la carga eléctrica en todos los procesos conocidos.',
  weak: 'La interacción débil permite cambios de sabor y desintegraciones. Sus mediadores W y Z son masivos, lo que limita su alcance y hace que sus procesos sean poco frecuentes a baja energía.',
  higgs: 'El acoplamiento con el campo de Higgs relaciona esta entidad con el mecanismo de generación de masas elementales. El valor concreto del acoplamiento es un parámetro experimental del modelo.',
  gravity: 'La masa-energía participa en gravedad. A escalas subatómicas el efecto es extremadamente pequeño y no existe una descripción cuántica confirmada integrada en el Modelo Estándar.'
};

function interactionReport(particle: Particle): string {
  const active = particle.interactions.map((interaction) => interactionExplanation[interaction]);
  const absent = (Object.keys(interactionExplanation) as Interaction[]).filter((interaction) => !particle.interactions.includes(interaction)).map((interaction) => interactionLabels[interaction]);
  return `${active.join('\n\n')}\n\nEn esta representación no se marca un acoplamiento directo con ${absent.length ? absent.join(', ') : 'ninguna interacción adicional'}. Una ausencia en la ficha no excluye efectos indirectos dentro de procesos más complejos.`;
}

function detectionReport(particle: Particle): string {
  if (particle.evidence === 'hypothetical') return `No se ha reconstruido una señal aceptada para ${particle.name}. Los experimentos buscan productos visibles, energía o momento faltantes, resonancias, desviaciones angulares o alteraciones de tasas compatibles con ${particle.theory ?? 'el modelo que la predice'}. Cuando no aparece una señal, se publican límites sobre masas, vidas medias y acoplamientos.\n\nLa ausencia de detección no demuestra que toda versión de la idea sea imposible: restringe una región concreta de parámetros y depende de la energía, luminosidad, aceptación del detector y supuestos usados en el análisis.`;
  if (particle.family === 'composite') return `Los sistemas compuestos se identifican mediante masa invariante, carga, spin, vida media, productos de reacción y patrones espectroscópicos. La dispersión con sondas de longitud de onda pequeña permite medir factores de forma y resolver distribuciones internas.\n\nLa composición no se obtiene abriendo físicamente el objeto, sino comprobando que un modelo con constituyentes reproduce simultáneamente las secciones eficaces, los cocientes de desintegración y la dependencia con la transferencia de momento.`;
  if (particle.family === 'force') return `Una interacción no se descubre como una pieza aislada. Se establece a partir de regularidades entre procesos, leyes de conservación, dependencias angulares, alcance efectivo y variación del acoplamiento con la energía.\n\nLa evidencia más fuerte procede de que una misma estructura matemática explique numerosos experimentos distintos y anticipe nuevos mediadores o relaciones cuantitativas que después son observadas.`;
  return `Los detectores reconstruyen trayectorias, curvatura magnética, depósitos de energía, tiempos de vuelo y productos de decaimiento. ${particle.name} se identifica estadísticamente por una firma compatible con sus números cuánticos, no por una fotografía directa.\n\nLa colaboración compara datos con simulaciones de señal y de fondo, controla incertidumbres y exige una significación elevada. Las propiedades se refinan posteriormente combinando canales, experimentos y revisiones globales.`;
}

function historyReport(particle: Particle): string {
  const status = particle.evidence === 'observed'
    ? 'La aceptación científica no depende de una sola observación: requiere consistencia, controles de fondo, repetición y compatibilidad con otras medidas.'
    : `La fecha asociada suele señalar la formulación o el desarrollo del marco, no un descubrimiento experimental. Estado actual: ${particle.confidence ?? 'sin confirmación experimental'}.`;
  return `Referencia cronológica de la ficha: ${particle.discovered}. La historia completa distingue propuesta conceptual, primeras indicaciones, identificación experimental y medidas de precisión posteriores.\n\n${status}`;
}

function compositionReport(particle: Particle): string {
  if (particle.constituents?.length) return `${particle.composition}\n\nEl atlas resume la relación como “${particle.constituentSummary ?? particle.constituents.join(' + ')}”. Es una notación didáctica: los constituyentes forman un sistema cuántico dinámico con energía de interacción, polarización del vacío y, cuando corresponde, componentes adicionales más allá del contenido de valencia.`;
  if (particle.family === 'force') return `${particle.composition}\n\nUna interacción no debe imaginarse como materia compuesta. Se representa mediante campos, simetrías, cargas y mediadores. La ficha enlaza estos elementos para mostrar la relación entre el concepto de fuerza y los cuantos observables del campo.`;
  if (particle.family === 'string') return `${particle.composition}\n\nEl objeto es extendido por construcción matemática. Su dimensionalidad, tensión, modos permitidos y espacio de fondo determinan el espectro efectivo; ninguna visualización del atlas constituye una observación microscópica.`;
  return `${particle.composition}\n\nHasta la resolución experimental disponible no se ha encontrado subestructura interna. “Elemental” significa precisamente esa ausencia de estructura resuelta, no que se haya medido un radio absolutamente nulo.`;
}

function antimatterReport(particle: Particle, mirror: boolean): string {
  if (mirror) return `${particle.antiparticleName} posee la misma masa y el mismo spin que ${particle.name}, mientras se invierten las cargas aditivas pertinentes. Su símbolo en el atlas es ${particle.antiparticle}.\n\nNo es una copia decorativa: corresponde a un estado físico distinto siempre que la partícula no sea autoconjugada. Sus canales deben respetar las mismas leyes de conservación bajo conjugación de carga, con las asimetrías permitidas por violación CP.`;
  if (particle.selfConjugate) return `${particle.name} se trata en el atlas como estado autoconjugado: su antipartícula no constituye una especie separada. Esto no significa que carezca de todos los números cuánticos, sino que la operación partícula–antipartícula devuelve el mismo tipo de cuanto.\n\nEn el universo espejo se repite para conservar la correspondencia visual, pero no debe contarse como una entidad física adicional.`;
  return `La antipartícula asociada es ${particle.antiparticleName}, con símbolo ${particle.antiparticle}. Conserva masa y spin, mientras invierte las cargas aditivas apropiadas.\n\nEl atlas puede desplegar este estado en la estructura espejo. Materia y antimateria no significan masa positiva y negativa: ambas transportan energía positiva y responden gravitatoriamente según las pruebas disponibles.`;
}

function formulaReport(particle: Particle): string {
  const caveat = particle.evidence === 'hypothetical'
    ? 'Los parámetros pueden variar entre realizaciones del modelo y la expresión no constituye evidencia experimental.'
    : 'Una predicción de precisión requiere especificar unidades, escala de energía, incertidumbres, correcciones radiativas y convenciones.';
  return `La relación característica seleccionada es ${particle.formula}. Sirve como entrada al formalismo asociado con ${particle.name}, pero no reemplaza el lagrangiano ni la dinámica completa.\n\nEn física de altas energías se emplean habitualmente unidades naturales, c = ℏ = 1. ${caveat}`;
}

function openQuestions(particle: Particle): string {
  if (particle.evidence === 'hypothetical') return `La cuestión principal es si existe en la naturaleza. También deben determinarse masa, acoplamientos, estabilidad, mecanismo de producción y compatibilidad cosmológica. ${particle.confidence ?? ''}\n\nUna futura señal tendría que distinguirse de fondos conocidos y producir predicciones coherentes en más de un canal. Hasta entonces la ficha permanece visualmente separada del inventario confirmado.`;
  if (particle.family === 'composite') return 'Las preguntas abiertas se centran en calcular su estructura desde QCD, separar contribuciones de quarks y gluones, mejorar radios y factores de forma y comprender estados ligados o exóticos relacionados.\n\nIncluso una entidad cotidiana puede conservar problemas de precisión: “conocida” no significa “agotada científicamente”.';
  return `Se siguen buscando desviaciones diminutas en masa, acoplamientos, momentos, vidas medias y cocientes de desintegración. Una discrepancia reproducible podría revelar campos nuevos o estructura no resuelta.\n\nEl objetivo actual no es sólo confirmar que ${particle.name} existe, sino someter su descripción a pruebas cada vez más exigentes.`;
}

function sectionsFor(particle: Particle, mirror: boolean): ManualSection[] {
  const name = mirror ? particle.antiparticleName : particle.name;
  const symbol = mirror ? particle.antiparticle : particle.symbol;
  return [
    { eyebrow: 'INFORME · 01', title: `Definición de ${name}`, text: `${particle.summary}\n\n${name} se representa mediante ${symbol} y se clasifica como ${mirror ? `estado de antimateria de ${familyName[particle.family]}` : familyName[particle.family]}. ${particle.role}`, key: `Clasificación: ${familyName[particle.family]}. Evidencia: ${particle.evidence === 'observed' ? 'observada o establecida' : 'hipotética'}.` },
    { eyebrow: 'INFORME · 02', title: 'Propiedades físicas y números cuánticos', text: `Masa o parámetro característico: ${particle.mass}. Carga eléctrica: ${mirror && !particle.selfConjugate ? 'opuesta a la indicada para la partícula cuando la carga es aditiva' : particle.charge}. Spin: ${particle.spin}. ${particle.generation ? `Pertenece a la generación ${particle.generation}.` : 'La clasificación por generaciones no se aplica.'}\n\nCarga de color: ${particle.colorCharge ? 'sí; participa en la dinámica de color' : 'no indicada'}. Vida media, estabilidad o alcance: ${particle.lifetime}. El spin es una propiedad cuántica intrínseca y no una rotación clásica de una esfera.` },
    { eyebrow: 'INFORME · 03', title: 'Campo, composición y estructura interna', text: compositionReport(particle) },
    { eyebrow: 'INFORME · 04', title: 'Interacciones fundamentales', text: interactionReport(particle), key: `Interacciones señaladas: ${particle.interactions.map((item) => interactionLabels[item]).join(', ')}.` },
    { eyebrow: 'INFORME · 05', title: 'Antimateria y conjugación', text: antimatterReport(particle, mirror) },
    { eyebrow: 'INFORME · 06', title: 'Estabilidad, procesos y decaimientos', text: `${particle.decays}\n\nLa descripción de un decaimiento debe incluir productos finales, leyes de conservación, probabilidad o anchura y condiciones cinemáticas. Una vida media finita expresa una distribución estadística exponencial para una población, no un reloj interno que determine el instante individual.` },
    { eyebrow: 'INFORME · 07', title: 'Escala física y representación', text: `Escala orientativa: ${particle.scale ?? 'no se asigna un tamaño geométrico propio'}. La posición vertical del atlas expresa un orden de magnitud o un régimen físico, no un diámetro exacto dibujado a escala.\n\nEn partículas elementales, una cota experimental de estructura no equivale a demostrar un radio matemáticamente cero. En sistemas compuestos, radio de carga, radio de masa y extensión del estado pueden ser conceptos diferentes.` },
    { eyebrow: 'INFORME · 08', title: 'Historia del descubrimiento o de la propuesta', text: historyReport(particle) },
    { eyebrow: 'INFORME · 09', title: 'Cómo se detecta y qué se mide', text: detectionReport(particle) },
    { eyebrow: 'INFORME · 10', title: 'Descripción matemática', text: formulaReport(particle), key: particle.formula },
    { eyebrow: 'INFORME · 11', title: 'Papel dentro de la física', text: `${particle.role}\n\nSu importancia se entiende conectando la ficha con las entidades iluminadas en el lienzo. Esas conexiones expresan composición, mediación o participación en una interacción; no representan trayectorias espaciales literales.` },
    { eyebrow: 'INFORME · 12', title: 'Estado de la evidencia', text: `${particle.evidence === 'observed' ? 'La entidad o interacción cuenta con evidencia experimental aceptada.' : 'La entidad no ha sido observada y se presenta como hipótesis, candidato o construcción teórica.'} ${particle.confidence ?? ''}\n\nLa etiqueta epistemológica tiene prioridad sobre la estética: ninguna animación, fórmula o simetría visual convierte una predicción en observación.` },
    { eyebrow: 'INFORME · 13', title: 'Preguntas abiertas y medidas futuras', text: openQuestions(particle) },
    { eyebrow: 'INFORME · 14', title: 'Cómo leer esta ficha en el atlas', text: `${particle.note ?? 'El símbolo y la ilustración son convenciones didácticas; no constituyen una fotografía ni fijan una forma clásica.'}\n\nAl aumentar el zoom aparecen propiedades y marcadores de interacción. Al seleccionar la ficha se resaltan constituyentes, estructuras que la contienen o mediadores relacionados. El modo espejo añade ${particle.selfConjugate ? 'la misma especie autoconjugada' : particle.antiparticleName}.` },
    { eyebrow: 'INFORME · 15', title: 'Fuentes, precisión y trazabilidad', text: `La ficha enlaza ${particle.sources.length} fuente${particle.sources.length === 1 ? '' : 's'} de referencia. Los valores se muestran de forma divulgativa y pueden estar redondeados.\n\nPara trabajo técnico deben consultarse la definición del observable, la incertidumbre, el esquema de renormalización cuando proceda, la fecha de la revisión y las tablas originales de la colaboración o del Particle Data Group.` }
  ];
}

function chapterFor(particle: Particle, mirror = false): ManualChapter {
  const name = mirror ? particle.antiparticleName : particle.name;
  const symbol = mirror ? particle.antiparticle : particle.symbol;
  return {
    id: `${mirror ? 'anti-' : 'entidad-'}${particle.id}`,
    entityId: particle.id,
    mirror,
    group: mirror ? 'Antimateria' : groupName[particle.family],
    kicker: mirror ? 'INFORME DE ANTIMATERIA' : 'INFORME DE ENTIDAD',
    title: name,
    subtitle: `${symbol} · ${familyName[particle.family]} · ${particle.evidence === 'observed' ? 'evidencia aceptada' : 'no observada'}`,
    intro: `${particle.summary} Este capítulo integra propiedades, estructura, interacciones, historia, métodos de detección, formalismo, preguntas abiertas y fuentes en una lectura continua.`,
    symbol,
    formula: particle.formula,
    formulaNote: `Relación característica asociada con ${name}. La sección matemática explica su alcance y sus limitaciones.`,
    sources: particle.sources,
    sections: sectionsFor(particle, mirror)
  };
}

export const entityChapters: ManualChapter[] = catalogParticles.map((particle) => chapterFor(particle));
export const antimatterChapters: ManualChapter[] = catalogParticles.filter((particle) => !particle.selfConjugate).map((particle) => chapterFor(particle, true));

export const informationChapters: ManualChapter[] = [
  ...encyclopediaChapters,
  ...entityChapters,
  ...antimatterChapters
];

export const informationStats = {
  entities: catalogParticles.length,
  antimatter: antimatterChapters.length,
  total: informationChapters.length
};
