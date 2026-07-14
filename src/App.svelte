<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Atom, Braces, CircleHelp, Filter, Focus, Layers3, Minus, Moon, Plus, RotateCcw, Scale, Search,
    Sparkles, Sun, Telescope, X
  } from '@lucide/svelte';
  import ParticleViewport from './components/ParticleViewport.svelte';
  import ParticleDetail from './components/ParticleDetail.svelte';
  import ScaleJourney from './components/ScaleJourney.svelte';
  import FormulaAtlas from './components/FormulaAtlas.svelte';
  import FilterPanel from './components/FilterPanel.svelte';
  import { particles, theoryParticles } from './data/particles';
  import type { Interaction, Particle, ParticleFamily } from './data/types';

  type Theme = 'dark' | 'light';
  let viewport: any;
  let selected = $state<Particle | null>(null);
  let zoomPercent = $state(100);
  let showTheory = $state(false);
  let antimatter = $state(false);
  let showScale = $state(false);
  let showFormula = $state(false);
  let showFilters = $state(false);
  let showGuide = $state(false);
  let theme = $state<Theme>('dark');
  let query = $state('');
  let family = $state<ParticleFamily | 'all'>('all');
  let interaction = $state<Interaction | 'all'>('all');

  const filtering = $derived(Boolean(query.trim()) || family !== 'all' || interaction !== 'all');
  const matches = $derived(new Set(particles.filter((particle) => {
    const normalized = query.trim().toLocaleLowerCase('es').normalize('NFD').replace(/\p{Diacritic}/gu, '');
    const haystack = [particle.name, particle.englishName, particle.symbol, particle.summary, particle.discovered, particle.spin, particle.mass]
      .join(' ').toLocaleLowerCase('es').normalize('NFD').replace(/\p{Diacritic}/gu, '');
    return (!normalized || haystack.includes(normalized))
      && (family === 'all' || particle.family === family)
      && (interaction === 'all' || particle.interactions.includes(interaction));
  }).map((particle) => particle.id)));

  function selectParticle(particle: Particle): void {
    selected = particle;
  }

  function toggleTheme(): void {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('modelo-estandar-theme', theme); } catch (_) {}
  }

  function resetFilters(): void {
    query = '';
    family = 'all';
    interaction = 'all';
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape') return;
    if (selected) selected = null;
    else if (showFormula) showFormula = false;
    else if (showScale) showScale = false;
    else if (showGuide) showGuide = false;
    else if (showFilters) showFilters = false;
  }

  onMount(() => {
    const saved = localStorage.getItem('modelo-estandar-theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
    document.documentElement.dataset.theme = theme;
  });
</script>

<svelte:window onkeydown={handleKeydown} />
<svelte:head><title>Modelo Estándar · Atlas de partículas</title></svelte:head>

<main class="app-shell">
  <ParticleViewport
    bind:this={viewport}
    {particles}
    {theoryParticles}
    {showTheory}
    {antimatter}
    selectedId={selected?.id ?? ''}
    {matches}
    {filtering}
    onselect={selectParticle}
    onzoom={(value) => zoomPercent = value}
  />

  <header class="brand-panel">
    <div class="brand-mark"><Atom size={21} strokeWidth={1.65} /></div>
    <div><h1>Modelo Estándar</h1><p>atlas interactivo de partículas</p></div>
  </header>

  <button class="scale-entry" type="button" onclick={() => showScale = true}>
    <span class="scale-entry-icon"><Telescope size={19}/></span>
    <span><small>¿DE DÓNDE SALE ESTA TABLA?</small><b>Viaja del átomo a los quarks</b></span>
    <span class="scale-entry-value">10⁻¹⁰ → 10⁻¹⁹ m</span>
  </button>

  <div class="legend-panel" aria-label="Leyenda de familias">
    <span><i class="legend-quark"></i>quarks</span>
    <span><i class="legend-lepton"></i>leptones</span>
    <span><i class="legend-gauge"></i>mediadores</span>
    <span><i class="legend-scalar"></i>Higgs</span>
    {#if showTheory}<span><i class="legend-theory"></i>hipótesis</span>{/if}
  </div>

  {#if filtering}
    <div class="results-badge"><Search size={14}/><b>{matches.size}</b> de {particles.length} partículas <button type="button" onclick={resetFilters} aria-label="Quitar filtros"><X size={13}/></button></div>
  {/if}

  <nav class="main-toolbar" aria-label="Herramientas del lienzo">
    <div class="tool-group">
      <button class:active={showFilters} type="button" data-tooltip="Buscar y filtrar" aria-label="Buscar y filtrar" onclick={() => showFilters = !showFilters}><Filter size={18}/></button>
      <button type="button" data-tooltip="Guía científica" aria-label="Abrir guía científica" onclick={() => showGuide = true}><CircleHelp size={18}/></button>
      <button type="button" data-tooltip="Fórmulas" aria-label="Abrir capa matemática" onclick={() => showFormula = true}><Braces size={19}/></button>
    </div>
    <span class="toolbar-divider"></span>
    <div class="tool-group mode-group">
      <button class:active={antimatter} type="button" data-tooltip="Conjugar materia / antimateria" aria-label="Alternar antimateria" onclick={() => antimatter = !antimatter}><Scale size={18}/><span>Antimateria</span></button>
      <button class:active={showTheory} type="button" data-tooltip="Mostrar hipótesis fuera del modelo" aria-label="Alternar partículas hipotéticas" onclick={() => { showTheory = !showTheory; requestAnimationFrame(() => viewport?.resetView?.()); }}><Sparkles size={18}/><span>Más allá</span></button>
    </div>
    <span class="toolbar-divider"></span>
    <div class="tool-group zoom-group">
      <button type="button" data-tooltip="Alejar" aria-label="Alejar" onclick={() => viewport?.zoomOut?.()}><Minus size={17}/></button>
      <button class="zoom-readout" type="button" data-tooltip="Restablecer vista" aria-label="Restablecer vista" onclick={() => viewport?.resetView?.()}><Focus size={15}/><b>{zoomPercent}%</b></button>
      <button type="button" data-tooltip="Acercar" aria-label="Acercar" onclick={() => viewport?.zoomIn?.()}><Plus size={17}/></button>
      <button type="button" data-tooltip="Tema claro u oscuro" aria-label="Cambiar tema" onclick={toggleTheme}>{#if theme === 'dark'}<Moon size={17}/>{:else}<Sun size={17}/>{/if}</button>
    </div>
  </nav>

  {#if showFilters}
    <FilterPanel
      {query} {family} {interaction}
      onquery={(value) => query = value}
      onfamily={(value) => family = value}
      oninteraction={(value) => interaction = value}
      onreset={resetFilters}
      onclose={() => showFilters = false}
    />
  {/if}

  {#if selected}
    <ParticleDetail particle={selected} {antimatter} onclose={() => selected = null}/>
  {/if}
  {#if showScale}<ScaleJourney onclose={() => showScale = false}/>{/if}
  {#if showFormula}<FormulaAtlas onclose={() => showFormula = false}/>{/if}

  {#if showGuide}
    <div class="modal-backdrop" role="presentation" onclick={(event) => event.target === event.currentTarget && (showGuide = false)}>
      <div class="guide-modal" role="dialog" aria-modal="true" aria-label="Guía del atlas">
        <header><div><span class="eyebrow">GUÍA CIENTÍFICA</span><h2>Cómo leer el Modelo Estándar</h2></div><button class="icon-button" type="button" aria-label="Cerrar" onclick={() => showGuide = false}><X size={19}/></button></header>
        <div class="guide-grid">
          <article><span>01</span><h3>Materia</h3><p>Quarks y leptones son fermiones de spin ½. Se repiten en tres generaciones con las mismas cargas, pero masas muy diferentes.</p></article>
          <article><span>02</span><h3>Fuerzas</h3><p>Gluón, fotón, W y Z median tres interacciones. La gravedad no forma parte de esta teoría.</p></article>
          <article><span>03</span><h3>Higgs</h3><p>El Higgs es un bosón escalar. Su campo participa en el origen de las masas elementales, pero no explica toda la masa de la materia compuesta.</p></article>
          <article><span>04</span><h3>Zoom</h3><p>Al ampliar aparecen masa, carga, spin e interacciones. Pulsa una ficha para abrir su documentación completa.</p></article>
          <article><span>05</span><h3>Antimateria</h3><p>El modo antimateria conjuga cargas y números cuánticos. Algunas partículas neutras son su propia antipartícula.</p></article>
          <article><span>06</span><h3>Frontera</h3><p>La banda “Más allá” separa claramente candidatos teóricos —como el gravitón o partículas supersimétricas— de lo observado.</p></article>
        </div>
        <footer><Layers3 size={16}/><p>La tabla no representa tamaños físicos. Es un mapa conceptual de campos y partículas elementales.</p></footer>
      </div>
    </div>
  {/if}
</main>
