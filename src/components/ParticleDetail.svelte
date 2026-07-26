<script lang="ts">
  import { BookOpen, CalendarDays, ExternalLink, FlaskConical, Layers3, Network, Scale, X } from '@lucide/svelte';
  import type { ColorState, ConstituentDetail, Interaction, Particle } from '../data/types';
  import { interactionLabels } from '../data/particles';
  import FormulaBlock from './FormulaBlock.svelte';

  let { particle, antimatter = false, onclose }: { particle: Particle; antimatter?: boolean; onclose: () => void } = $props();
  let tab = $state<'summary' | 'properties' | 'structure' | 'interactions' | 'history' | 'formula' | 'sources'>('summary');
  const visibleSymbol = $derived(antimatter && !particle.selfConjugate ? particle.antiparticle : particle.symbol);
  const visibleName = $derived(antimatter && !particle.selfConjugate ? particle.antiparticleName : particle.name);
  const familyLabels = { quark: 'quark elemental', lepton: 'leptón elemental', gauge: 'bosón gauge', scalar: 'bosón escalar', composite: 'partícula compuesta', force: 'interacción fundamental', theory: 'partícula hipotética', string: 'objeto extendido teórico', technology: 'referencia tecnológica' } as const;
  const tabs = [
    { id: 'summary', label: 'Resumen', icon: BookOpen },
    { id: 'properties', label: 'Propiedades', icon: Scale },
    { id: 'structure', label: 'Estructura', icon: Layers3 },
    { id: 'interactions', label: 'Interacciones', icon: Network },
    { id: 'history', label: 'Historia', icon: CalendarDays },
    { id: 'formula', label: 'Fórmula', icon: FlaskConical },
    { id: 'sources', label: 'Fuentes', icon: ExternalLink }
  ] as const;

  const colorStateLabels: Record<ColorState, string> = {
    triplet: 'Triplete de color 3',
    antitriplet: 'Antitriplete de color 3̄',
    octet: 'Octete de color 8',
    singlet: 'Singlete: color neto nulo',
    'representation-dependent': 'Depende de la representación',
    none: 'No porta carga de color'
  };
  const effectiveColorState = $derived(
    antimatter && particle.colorState === 'triplet'
      ? 'antitriplet'
      : antimatter && particle.colorState === 'antitriplet'
        ? 'triplet'
        : (particle.colorState ?? (particle.colorCharge ? 'representation-dependent' : 'none'))
  );
  const colorSwatches = $derived(
    effectiveColorState === 'triplet'
      ? [
          { label: 'rojo', tone: 'red' },
          { label: 'verde', tone: 'green' },
          { label: 'azul', tone: 'blue' }
        ]
      : effectiveColorState === 'antitriplet'
        ? [
            { label: 'antirrojo', tone: 'antired' },
            { label: 'antiverde', tone: 'antigreen' },
            { label: 'antiazul', tone: 'antiblue' }
          ]
        : effectiveColorState === 'octet'
          ? Array.from({ length: 8 }, (_, index) => ({ label: `g${index + 1}`, tone: `octet-${(index % 3) + 1}` }))
          : effectiveColorState === 'singlet' && ['proton', 'neutron', 'pentaquark'].includes(particle.id)
            ? [
                { label: antimatter ? 'antirrojo' : 'rojo', tone: antimatter ? 'antired' : 'red' },
                { label: antimatter ? 'antiverde' : 'verde', tone: antimatter ? 'antigreen' : 'green' },
                { label: antimatter ? 'antiazul' : 'azul', tone: antimatter ? 'antiblue' : 'blue' }
              ]
            : effectiveColorState === 'singlet' && ['pion-plus', 'pion-zero', 'kaon-plus', 'tetraquark'].includes(particle.id)
              ? [
                  { label: 'color', tone: 'red' },
                  { label: 'anticolor', tone: 'antired' }
                ]
              : []
  );

  function displayedColorDetail(): string {
    if (particle.colorDetail) {
      if (antimatter && particle.colorState === 'triplet') {
        return 'La antipartícula ocupa la representación conjugada: puede etiquetarse antirrojo, antiverde o antiazul. Son nombres de una carga cuántica, no colores visibles.';
      }
      return particle.colorDetail;
    }
    return 'Esta entidad no porta una carga de color libre. “Sin color” no significa transparente: significa que transforma como singlete o que la carga de color no se aplica.';
  }

  function constituentLabel(detail: ConstituentDetail): string {
    if (!antimatter) return detail.label;
    const labels: Record<string, string> = {
      up: 'antiquark arriba',
      down: 'antiquark abajo',
      proton: 'antiprotón',
      neutron: 'antineutrón',
      electron: 'positrón',
      gluon: 'gluones',
      sea: 'mar de antiquarks y quarks'
    };
    return labels[detail.id] ?? `anti-${detail.label}`;
  }

  function constituentSymbol(detail: ConstituentDetail): string {
    if (!antimatter) return detail.symbol;
    const symbols: Record<string, string> = { up: 'ū', down: 'd̄', proton: 'p̄', neutron: 'n̄', electron: 'e⁺' };
    return symbols[detail.id] ?? detail.symbol;
  }

  function valenceFormula(): string | undefined {
    if (!antimatter) return particle.valenceFormula;
    const conjugated: Record<string, string> = {
      atom: String.raw`{}^A_Z\bar X:\quad Z\bar p+N\bar n+Z e^+`,
      proton: String.raw`\bar p:\quad \bar u\bar u\bar d`,
      neutron: String.raw`\bar n:\quad \bar u\bar d\bar d`,
      'pion-plus': String.raw`\pi^- = d\bar u`,
      deuteron: String.raw`\bar d=\bar p+\bar n`,
      'alpha-particle': String.raw`\bar\alpha=2\bar p+2\bar n`
    };
    return conjugated[particle.id] ?? particle.valenceFormula;
  }

  const forceExplanations: Record<Interaction, string> = {
    strong: 'Responde a la carga de color. En quarks y gluones actúa mediante QCD; en hadrones y núcleos puede manifestarse como interacción fuerte residual.',
    electromagnetic: 'Responde a la carga eléctrica. El campo electromagnético conserva la carga y su cuanto es el fotón.',
    weak: 'Puede transformar el sabor y participa en desintegraciones. Sus mediadores W y Z son masivos, por lo que su alcance es muy corto.',
    higgs: 'Su acoplamiento con el campo de Higgs contribuye a la masa de partículas elementales; no debe confundirse con una quinta fuerza fundamental.',
    gravity: 'Toda masa-energía contribuye gravitatoriamente. A escala de partículas su efecto es diminuto y no existe una teoría cuántica confirmada integrada en el Modelo Estándar.'
  };

  function interactionText(interaction: Interaction): string {
    if (!particle.interactions.includes(interaction)) return `No se le asigna un acoplamiento directo relevante en esta representación. Esto no significa que quede fuera de cualquier proceso indirecto relacionado con ${interactionLabels[interaction].toLocaleLowerCase('es')}.`;
    return forceExplanations[interaction];
  }

  function historyContext(): string {
    if (particle.family === 'technology') return 'Esta referencia procede de demostraciones experimentales de dispositivos. Se incluye para comparar órdenes de magnitud, sin convertir una estructura fabricada en una partícula ni en una capa fundamental de materia.';
    if (particle.evidence === 'hypothetical') return `La ficha procede de ${particle.theory ?? 'un marco teórico todavía no confirmado'}. Sus propiedades son predicciones dependientes del modelo y los experimentos buscan firmas compatibles, no una imagen directa del objeto.`;
    if (particle.family === 'composite') return 'Su identificación combina espectros, productos de reacción y medidas de dispersión. La comprensión moderna de su estructura llegó por etapas: primero se reconoció el estado compuesto y después se resolvió su dinámica interna.';
    if (particle.family === 'force') return 'La interacción se estableció observando regularidades, conservaciones y probabilidades de procesos. Su descripción moderna se consolidó al identificar la simetría y los campos que reproducen los resultados experimentales.';
    return 'La existencia se deduce reconstruyendo eventos y comparando distribuciones con una predicción cuantitativa. Descubrimiento, medida de propiedades y confirmación independiente suelen corresponder a etapas diferentes.';
  }

  function measurementText(): string {
    if (particle.family === 'technology') return 'Se distinguen dimensiones funcionales concretas —por ejemplo, longitud de puerta, canal o transferencia— del tamaño total del dispositivo. El dato tampoco equivale automáticamente al nombre comercial de un nodo de fabricación.';
    if (particle.evidence === 'hypothetical') return `No existe detección confirmada. El estado actual se expresa mediante límites experimentales y regiones de parámetros excluidas: ${particle.confidence ?? particle.lifetime}.`;
    if (particle.family === 'composite') return 'Se miden masa, carga, spin, vida media, radios efectivos, factores de forma y canales de desintegración o reacción. La dispersión permite sondear constituyentes y distribuciones internas.';
    if (particle.family === 'force') return 'Se miden secciones eficaces, tasas de transición, dependencias angulares y variación de los acoplamientos con la energía. El acuerdo simultáneo de muchos procesos es la evidencia decisiva.';
    return 'Los detectores combinan trayectorias, curvatura en campos magnéticos, depósitos de energía y productos de decaimiento. Las partículas invisibles se infieren mediante balances de energía y momento.';
  }

  function formulaReading(): string {
    if (particle.family === 'technology') return 'La relación resume una magnitud de ingeniería del dispositivo. Su escala sirve como comparación visual, pero no describe una partícula elemental ni una nueva ley fundamental.';
    if (particle.family === 'composite') return 'La expresión resume el contenido de valencia o una relación característica. No reemplaza la dinámica completa del estado ligado, que incluye campos, energía de enlace y fluctuaciones cuánticas.';
    if (particle.id === 'strong-force') return 'Es la densidad lagrangiana de QCD. El primer término describe la dinámica y auto-interacción del campo gluónico; la suma describe cada sabor de quark, su masa y su acoplamiento mediante la derivada covariante.';
    if (particle.id === 'electromagnetic-force') return 'Es una de las ecuaciones de Maxwell en forma covariante. La derivada parcial del tensor electromagnético queda determinada por la corriente de carga. En el límite cuántico, QED añade los campos de materia y la cuantización del fotón.';
    if (particle.id === 'weak-force') return 'Es la interacción efectiva de Fermi entre dos corrientes débiles. Resume procesos de baja energía como el decaimiento beta, pero no sustituye a la teoría electrodébil completa cuando la energía se aproxima a las masas de W y Z.';
    if (particle.id === 'gravity-force') return 'Es la ecuación de campo de Einstein: la geometría del espacio-tiempo del lado izquierdo responde al tensor de energía–momento del lado derecho. Es una ecuación clásica y no una teoría cuántica de gravitones.';
    if (particle.family === 'force') return 'La fórmula identifica la simetría, el campo o el régimen matemático de la interacción. Para predecir un proceso concreto hacen falta el lagrangiano, los acoplamientos y las condiciones cinemáticas.';
    if (particle.evidence === 'hypothetical') return 'Es una relación del modelo que motiva la ficha. Sus parámetros no están fijados necesariamente por la observación y pueden variar entre versiones de la teoría.';
    return 'La relación conecta una propiedad medible con la descripción cuántica de la partícula. En cálculos de altas energías se usan a menudo unidades naturales, c = ℏ = 1.';
  }

  function formulaSymbols(): string {
    if (particle.id === 'strong-force') return 'ℒQCD es la densidad lagrangiana; Gaμν es el tensor de campo gluónico; a recorre ocho direcciones de color; qf es el campo de cada sabor; Dμ es la derivada covariante y mf su masa.';
    if (particle.id === 'electromagnetic-force') return '∂μ —escrito \\partial_\\mu en LaTeX— es una derivada espacio-temporal; Fμν reúne los campos eléctrico y magnético; Jν es la cuatro-corriente y μ₀ la permeabilidad del vacío en unidades SI.';
    if (particle.id === 'weak-force') return 'GF es la constante de Fermi; Jμ y J†μ son corrientes débiles conjugadas. El factor 1/√2 es convencional y la expresión presupone energías mucho menores que la masa del W.';
    if (particle.id === 'gravity-force') return 'Gμν es el tensor de Einstein; gμν la métrica; Λ la constante cosmológica; Tμν el tensor de energía–momento; G la constante gravitatoria y c la velocidad de la luz.';
    if (particle.valenceFormula) return `La pestaña Estructura muestra además la relación de composición ${particle.valenceFormula}, separada de esta fórmula característica.`;
    return 'Los subíndices suelen identificar componentes, sabores o coordenadas; los superíndices pueden indicar componentes contravariantes, cargas o potencias. La definición exacta depende de la convención indicada por la teoría.';
  }
</script>

<aside class={`detail-panel family-${particle.family}`} aria-label={`Ficha científica de ${visibleName}`}>
  <header class="detail-header">
    <div class="detail-identity">
      <span class="detail-symbol">{visibleSymbol}</span>
      <div><span class="eyebrow">{particle.evidence === 'observed' ? (antimatter ? 'ESTADO DE ANTIMATERIA' : 'ESTRUCTURA OBSERVADA') : 'HIPÓTESIS · NO OBSERVADA'}</span><h2>{visibleName}</h2><p>{particle.englishName}</p></div>
    </div>
    <button class="icon-button" type="button" aria-label="Cerrar ficha" title="Cerrar" onclick={onclose}><X size={19}/></button>
  </header>

  <nav class="detail-tabs" aria-label="Secciones de la ficha">
    {#each tabs as item}<button class:active={tab === item.id} type="button" onclick={() => tab = item.id}><item.icon size={14}/><span>{item.label}</span></button>{/each}
  </nav>

  <div class="detail-content">
    {#if tab === 'summary'}
      <section class="detail-section summary-section">
        <p class="detail-lead">{particle.summary}</p>
        <div class="hero-metrics"><div><span>Masa</span><strong>{particle.mass}</strong></div><div><span>Carga eléctrica</span><strong>{particle.charge}</strong></div><div><span>Spin</span><strong>{particle.spin}</strong></div></div>
        <article><span class="section-kicker">IDENTIDAD FÍSICA</span><h3>Qué representa</h3><p>{particle.composition}</p><p>Se clasifica como <b>{familyLabels[particle.family]}</b>{particle.generation ? ` de la generación ${particle.generation}` : ''}. {particle.evidence === 'observed' ? 'Su presencia se apoya en evidencia experimental aceptada.' : 'Permanece como predicción o candidato sin observación confirmada.'}</p></article>
        <article><span class="section-kicker">PAPEL EN EL MODELO</span><h3>Por qué importa</h3><p>{particle.role}</p><p>{particle.decays}</p></article>
        {#if particle.constituents?.length}<article class="composition-card"><span class="composition-label">COMPOSICIÓN Y RELACIONES</span><h3>{particle.constituentSummary}</h3><div class="constituent-chips">{#if particle.constituentDetails?.length}{#each particle.constituentDetails as detail}<span><b>{detail.count}×</b> {constituentLabel(detail)}</span>{/each}{:else}{#each particle.constituents as constituent}<span>{constituent.replaceAll('-', ' ')}</span>{/each}{/if}</div><p>La cantidad se muestra explícitamente cuando es un contenido discreto de valencia. Gluones y pares del mar forman un campo cuántico dinámico y no tienen un recuento clásico fijo.</p></article>{/if}
        {#if particle.note}<aside class="science-note"><b>Matiz científico</b><p>{particle.note}</p></aside>{/if}
      </section>
    {:else if tab === 'properties'}
      <section class="detail-section property-sections">
        <p class="section-intro">Las propiedades se agrupan por significado; una cifra sólo es interpretable junto a su unidad, definición y estado de evidencia.</p>
        <article><span class="section-kicker">CLASIFICACIÓN</span><h3>Identidad y estado</h3><dl class="property-list"><div><dt>Familia</dt><dd>{familyLabels[particle.family]}</dd></div>{#if particle.generation}<div><dt>Generación</dt><dd>{particle.generation}</dd></div>{/if}<div><dt>Marco</dt><dd>{particle.theory ?? 'Modelo Estándar / física establecida'}</dd></div><div><dt>Evidencia</dt><dd>{particle.evidence === 'observed' ? 'Observada o interacción confirmada' : 'Hipotética · no observada'}</dd></div></dl></article>
        <article><span class="section-kicker">NÚMEROS CUÁNTICOS</span><h3>Magnitudes fundamentales</h3><dl class="property-list"><div><dt>Masa o parámetro</dt><dd>{particle.mass}</dd></div><div><dt>Carga eléctrica</dt><dd>{particle.charge}</dd></div><div><dt>Spin</dt><dd>{particle.spin}</dd></div><div><dt>Color en QCD</dt><dd>{colorStateLabels[effectiveColorState]}</dd></div></dl><p class="property-explainer">El spin es un número cuántico intrínseco; no describe una esfera girando sobre sí misma. El color tampoco es una tonalidad visible: es una carga de la interacción fuerte.</p></article>
        <article><span class="section-kicker">COMPORTAMIENTO</span><h3>Vida, escala y antimateria</h3><dl class="property-list"><div><dt>Vida media / estado</dt><dd>{particle.lifetime}</dd></div>{#if particle.scale}<div><dt>Escala orientativa</dt><dd>{particle.scale}</dd></div>{/if}<div><dt>Antipartícula</dt><dd>{particle.selfConjugate ? 'Es su propia antipartícula' : `${particle.antiparticle} · ${particle.antiparticleName}`}</dd></div><div><dt>Referencia histórica</dt><dd>{particle.discovered}</dd></div></dl></article>
        {#if particle.confidence}<aside class="science-note"><b>Estado de la evidencia</b><p>{particle.confidence}</p></aside>{/if}
        {#if antimatter && particle.mirrorNote}<aside class="science-note"><b>Sobre el reflejo</b><p>{particle.mirrorNote}</p></aside>{/if}
      </section>
    {:else if tab === 'structure'}
      <section class="detail-section structure-section">
        <p class="section-intro">Esta vista separa tres ideas que suelen confundirse: contenido de valencia, componentes dinámicos y carga de color.</p>
        <article class="structure-report">
          <span class="section-kicker">COMPOSICIÓN CUANTITATIVA</span>
          <h3>{particle.constituentSummary ?? (particle.family === 'quark' ? 'Partícula elemental sin subestructura observada' : 'No se asigna una composición interna discreta')}</h3>
          {#if valenceFormula()}<FormulaBlock formula={valenceFormula() ?? ''} label="Contenido o relación de composición"/>{/if}
          {#if particle.constituentDetails?.length}
            <div class="composition-ledger">
              {#each particle.constituentDetails as detail}
                <div>
                  <strong>{detail.count}</strong>
                  <span class="ledger-symbol">{constituentSymbol(detail)}</span>
                  <span><b>{constituentLabel(detail)}</b><small>{antimatter ? 'Constituyente conjugado con las cargas aditivas invertidas.' : detail.role}</small></span>
                </div>
              {/each}
            </div>
          {:else}
            <p>{particle.composition}</p>
          {/if}
          {#if particle.family === 'composite'}<p class="structure-caveat"><b>Valencia no significa contenido total.</b> En un hadrón, gluones y pares quark–antiquark contribuyen al momento, al spin y a la energía. La fórmula corta identifica números cuánticos netos, no una fotografía de tres bolas inmóviles.</p>{/if}
        </article>

        <article class="color-report">
          <span class="section-kicker">CARGA DE COLOR · QCD</span>
          <h3>{colorStateLabels[effectiveColorState]}</h3>
          {#if colorSwatches.length}
            <div class="color-state-visual" aria-label={`Estados de color de ${visibleName}`}>
              {#each colorSwatches as color}<span class={`color-swatch color-${color.tone}`}><i></i><b>{color.label}</b></span>{/each}
              {#if effectiveColorState === 'singlet'}<em>= color neto nulo</em>{/if}
            </div>
          {/if}
          <p>{displayedColorDetail()}</p>
          {#if particle.colorFormula}<FormulaBlock formula={particle.colorFormula} label="Representación de color"/>{/if}
          {#if particle.id === 'gluon'}<aside class="science-note"><b>Por qué son ocho y no nueve</b><p>Color × anticolor produce nueve combinaciones algebraicas, pero se descompone en un octete y un singlete. Los gluones de QCD corresponden a las ocho combinaciones independientes del octete; las etiquetas g1…g8 de este dibujo son una base didáctica, no ocho pigmentos.</p></aside>{/if}
        </article>
      </section>
    {:else if tab === 'interactions'}
      <section class="detail-section">
        <p class="section-intro">La iluminación del lienzo muestra relaciones; esta sección explica qué significa físicamente cada acoplamiento.</p>
        <div class="interaction-detail-grid expanded">
          {#each ['strong', 'electromagnetic', 'weak', 'higgs', 'gravity'] as interaction}
            <article class:active={particle.interactions.includes(interaction as Interaction)}><span class={`force-orb interaction-${interaction}`}></span><div><span class="interaction-state">{particle.interactions.includes(interaction as Interaction) ? 'INTERACCIÓN ACTIVA' : 'SIN ACOPLAMIENTO DIRECTO'}</span><h3>{interactionLabels[interaction as Interaction]}</h3><p>{interactionText(interaction as Interaction)}</p></div></article>
          {/each}
        </div>
        <article class="decay-card"><span class="section-kicker">PROCESO CARACTERÍSTICO</span><h3>Decaimiento o comportamiento</h3><p>{particle.decays}</p></article>
      </section>
    {:else if tab === 'history'}
      <section class="detail-section history-section">
        <span class="composition-label">CRONOLOGÍA Y EVIDENCIA</span><h3 class="history-title">{particle.discovered}</h3>
        <p class="detail-lead">{historyContext()}</p>
        <div class="history-timeline"><article><span>01</span><div><small>MARCO CONCEPTUAL</small><h3>Predicción e interpretación</h3><p>{particle.theory ? `La interpretación se formula en ${particle.theory}.` : particle.composition}</p></div></article><article><span>02</span><div><small>EVIDENCIA</small><h3>Qué observan los experimentos</h3><p>{measurementText()}</p></div></article><article><span>03</span><div><small>LECTURA ACTUAL</small><h3>Qué sabemos hoy</h3><p>{particle.confidence ?? `${particle.role} Las medidas continúan refinando sus parámetros y posibles desviaciones.`}</p></div></article></div>
        <aside class="science-note"><b>Una fecha no cuenta toda la historia</b><p>Propuesta teórica, primera señal, descubrimiento y confirmación independiente pueden pertenecer a años distintos.</p></aside>
      </section>
    {:else if tab === 'formula'}
      <section class="detail-section formula-explanation">
        <p class="section-intro">La fórmula se presenta como una entrada a la teoría, acompañada de su lectura y de sus límites.</p>
        <FormulaBlock formula={particle.formula}/>
        <article><span class="section-kicker">QUÉ EXPRESA</span><h3>Interpretación física</h3><p>{formulaReading()}</p></article>
        <article><span class="section-kicker">SÍMBOLOS</span><h3>Qué significa cada parte</h3><p>{formulaSymbols()}</p></article>
        <article><span class="section-kicker">CÓMO LEERLA</span><h3>Convenciones y unidades</h3><p>Las masas se expresan habitualmente en electronvoltios divididos por c². En teoría de campos y física de altas energías es frecuente adoptar unidades naturales, donde <em>c = ℏ = 1</em>, para que masa, energía y momento compartan unidad.</p></article>
        <aside class="science-note"><b>Límite de la expresión</b><p>Una sola igualdad no contiene toda la teoría ni todas las correcciones cuánticas. Para una predicción de precisión hacen falta definiciones de parámetros, escala de energía, incertidumbres y esquema de cálculo.</p></aside>
      </section>
    {:else}
      <section class="detail-section"><p class="section-intro">Fuentes de referencia para ampliar valores, incertidumbres, métodos experimentales y bibliografía técnica.</p><div class="source-list">{#each particle.sources as source}<a href={source.url} target="_blank" rel="noreferrer"><span>{source.label}</span><ExternalLink size={15}/></a>{/each}</div><div class="source-method"><span>CRITERIO EDITORIAL</span><p>“Observada” significa que existe evidencia aceptada. “Hipotética” identifica una predicción o candidato sin detección confirmada. Las ilustraciones no representan una forma geométrica literal.</p></div></section>
    {/if}
  </div>
</aside>
