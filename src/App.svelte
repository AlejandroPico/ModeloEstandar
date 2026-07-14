<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Atom, Braces, CircleHelp, Filter, Focus, Layers3, Minus, Moon, Plus, Scale, Search,
    Sparkles, Sun, SunMoon, Telescope, X
  } from '@lucide/svelte';
  import ParticleViewport from './components/ParticleViewport.svelte';
  import ParticleDetail from './components/ParticleDetail.svelte';
  import ScaleJourney from './components/ScaleJourney.svelte';
  import FormulaAtlas from './components/FormulaAtlas.svelte';
  import FilterPanel from './components/FilterPanel.svelte';
  import { compositeParticles, frontierObjects, particles, theoryParticles } from './data/particles';
  import type { Interaction, Particle, ParticleFamily } from './data/types';
  import { resolveSolarTheme } from './lib/solarTheme';

  type ThemeMode = 'auto' | 'light' | 'dark';
  type ResolvedTheme = 'light' | 'dark';
  let viewport: any;
  let selected = $state<Particle | null>(null);
  let selectedMirror = $state(false);
  let zoomPercent = $state(100);
  let showTheory = $state(false);
  let antimatter = $state(false);
  let showScale = $state(false);
  let showFormula = $state(false);
  let showFilters = $state(false);
  let showGuide = $state(false);
  let themeMode = $state<ThemeMode>('auto');
  let resolvedTheme = $state<ResolvedTheme>('dark');
  let solarSource = $state<'solar' | 'system'>('system');
  let coordinates = $state<{ latitude: number; longitude: number } | null>(null);
  let themeTimer = 0;
  let systemTheme: MediaQueryList | null = null;
  let displayedCount = $state(21);
  let uniqueCount = $state(21);
  let query = $state('');
  let family = $state<ParticleFamily | 'all'>('all');
  let interaction = $state<Interaction | 'all'>('all');

  const activeNodes = $derived([...compositeParticles, ...particles, ...(showTheory ? [...theoryParticles, ...frontierObjects] : [])]);
  const selectedKey = $derived(selected ? `${selectedMirror ? 'anti:' : ''}${selected.id}` : '');
  const filtering = $derived(Boolean(query.trim()) || family !== 'all' || interaction !== 'all');
  const matches = $derived(new Set(activeNodes.filter((particle) => {
    const normalized = query.trim().toLocaleLowerCase('es').normalize('NFD').replace(/\p{Diacritic}/gu, '');
    const haystack = [particle.name, particle.englishName, particle.symbol, particle.summary, particle.discovered, particle.spin, particle.mass]
      .join(' ').toLocaleLowerCase('es').normalize('NFD').replace(/\p{Diacritic}/gu, '');
    return (!normalized || haystack.includes(normalized))
      && (family === 'all' || particle.family === family)
      && (interaction === 'all' || particle.interactions.includes(interaction));
  }).map((particle) => particle.id)));

  function selectParticle(particle: Particle, mirror = false): void {
    selected = particle;
    selectedMirror = mirror;
  }

  function applyTheme(): void {
    if (themeMode === 'auto') {
      const result = resolveSolarTheme(new Date(), coordinates?.latitude, coordinates?.longitude);
      resolvedTheme = result.dark ? 'dark' : 'light';
      solarSource = result.source;
    } else {
      resolvedTheme = themeMode;
    }
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.dataset.themeMode = themeMode;
  }

  function requestLocation(): void {
    if (!navigator.geolocation || coordinates) { applyTheme(); return; }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coordinates = { latitude: position.coords.latitude, longitude: position.coords.longitude };
        applyTheme();
      },
      () => { coordinates = null; applyTheme(); },
      { maximumAge: 86_400_000, timeout: 8_000 }
    );
  }

  function cycleTheme(): void {
    themeMode = themeMode === 'auto' ? 'light' : themeMode === 'light' ? 'dark' : 'auto';
    try { localStorage.setItem('modelo-estandar-theme', themeMode); } catch (_) {}
    if (themeMode === 'auto') requestLocation(); else applyTheme();
  }

  function toggleAntimatter(): void {
    antimatter = !antimatter;
    window.setTimeout(() => viewport?.focusZone?.('standard'), 40);
  }

  function toggleTheory(): void {
    showTheory = !showTheory;
    if (!showTheory && selected && (selected.family === 'theory' || selected.family === 'string')) selected = null;
    window.setTimeout(() => viewport?.focusZone?.(showTheory ? 'beyond' : 'standard'), 40);
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
    if (saved === 'auto' || saved === 'light' || saved === 'dark') themeMode = saved;
    systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const systemListener = (): void => { if (themeMode === 'auto' && !coordinates) applyTheme(); };
    systemTheme.addEventListener('change', systemListener);
    themeTimer = window.setInterval(() => { if (themeMode === 'auto') applyTheme(); }, 60_000);
    if (themeMode === 'auto') requestLocation(); else applyTheme();
    return () => {
      systemTheme?.removeEventListener('change', systemListener);
      window.clearInterval(themeTimer);
    };
  });
</script>

<svelte:window onkeydown={handleKeydown} />
<svelte:head><title>Modelo Estándar · Atlas de partículas</title></svelte:head>

<main class="app-shell">
  <ParticleViewport
    bind:this={viewport}
    {particles}
    {compositeParticles}
    {theoryParticles}
    {frontierObjects}
    {showTheory}
    {antimatter}
    {selectedKey}
    {matches}
    {filtering}
    onselect={selectParticle}
    onzoom={(value) => zoomPercent = value}
    oncount={(count, unique) => { displayedCount = count; uniqueCount = unique; }}
  />

  <header class="brand-panel">
    <div class="brand-mark"><Atom size={21} strokeWidth={1.65} /></div>
    <div><h1>Modelo Estándar</h1><p>atlas interactivo de partículas</p></div>
  </header>

  <button class="scale-entry" type="button" onclick={() => showScale = true}>
    <span class="scale-entry-icon"><Telescope size={19}/></span>
    <span><small>¿DE DÓNDE SALE ESTA TABLA?</small><b>Viaja del átomo a los quarks</b></span>
    <span class="scale-entry-value">10⁻¹⁰ → 10⁻³⁵ m</span>
  </button>

  <div class="legend-panel" aria-label="Leyenda de familias">
    <span><i class="legend-quark"></i>quarks</span>
    <span><i class="legend-lepton"></i>leptones</span>
    <span><i class="legend-gauge"></i>mediadores</span>
    <span><i class="legend-scalar"></i>Higgs</span>
    <span><i class="legend-composite"></i>compuestos</span>
    {#if showTheory}<span><i class="legend-theory"></i>hipótesis</span>{/if}
  </div>

  <nav class="scale-rail" aria-label="Navegación por escalas">
    <button type="button" onclick={() => viewport?.focusZone?.('atom')}><span>10⁻¹⁰</span><b>Átomo</b></button>
    <button type="button" onclick={() => viewport?.focusZone?.('composite')}><span>10⁻¹⁵</span><b>Nucleones</b></button>
    <button type="button" onclick={() => viewport?.focusZone?.('standard')}><span>10⁻¹⁹</span><b>Elementales</b></button>
    {#if showTheory}<button type="button" onclick={() => viewport?.focusZone?.('beyond')}><span>?</span><b>Hipótesis</b></button>{/if}
    {#if showTheory}<button type="button" onclick={() => viewport?.focusZone?.('planck')}><span>10⁻³⁵</span><b>Planck</b></button>{/if}
    <button type="button" onclick={() => viewport?.fitAll?.()}><span>↕</span><b>Todo</b></button>
  </nav>

  <div class:expanded={antimatter} class="particle-count" aria-live="polite">
    <span class="count-orb"><b>{displayedCount}</b></span>
    <span><small>FICHAS EN EL LIENZO</small><strong>{uniqueCount} estructuras {antimatter ? '× materia y espejo' : 'visibles'}</strong></span>
  </div>

  {#if filtering}
    <div class="results-badge"><Search size={14}/><b>{matches.size}</b> de {activeNodes.length} fichas <button type="button" onclick={resetFilters} aria-label="Quitar filtros"><X size={13}/></button></div>
  {/if}

  <nav class="main-toolbar" aria-label="Herramientas del lienzo">
    <div class="tool-group">
      <button class:active={showFilters} type="button" data-tooltip="Buscar y filtrar" aria-label="Buscar y filtrar" onclick={() => showFilters = !showFilters}><Filter size={18}/></button>
      <button type="button" data-tooltip="Guía científica" aria-label="Abrir guía científica" onclick={() => showGuide = true}><CircleHelp size={18}/></button>
      <button type="button" data-tooltip="Fórmulas" aria-label="Abrir capa matemática" onclick={() => showFormula = true}><Braces size={19}/></button>
    </div>
    <span class="toolbar-divider"></span>
    <div class="tool-group mode-group">
      <button class:active={antimatter} type="button" data-tooltip="Desplegar el universo espejo" aria-label="Alternar antimateria" onclick={toggleAntimatter}><Scale size={18}/><span>Antimateria</span></button>
      <button class:active={showTheory} type="button" data-tooltip="Mostrar hipótesis, cuerdas y branas" aria-label="Alternar partículas hipotéticas" onclick={toggleTheory}><Sparkles size={18}/><span>Más allá</span></button>
    </div>
    <span class="toolbar-divider"></span>
    <div class="tool-group zoom-group">
      <button type="button" data-tooltip="Alejar" aria-label="Alejar" onclick={() => viewport?.zoomOut?.()}><Minus size={17}/></button>
      <button class="zoom-readout" type="button" data-tooltip="Restablecer vista" aria-label="Restablecer vista" onclick={() => viewport?.resetView?.()}><Focus size={15}/><b>{zoomPercent}%</b></button>
      <button type="button" data-tooltip="Acercar" aria-label="Acercar" onclick={() => viewport?.zoomIn?.()}><Plus size={17}/></button>
      <button class:active={themeMode === 'auto'} type="button" data-tooltip={themeMode === 'auto' ? `Automático · ${solarSource === 'solar' ? 'anochecer local' : 'preferencia del sistema'}` : `Tema ${themeMode}`} aria-label="Cambiar tema: automático, claro u oscuro" onclick={cycleTheme}>
        {#if themeMode === 'auto'}<SunMoon size={17}/>{:else if themeMode === 'dark'}<Moon size={17}/>{:else}<Sun size={17}/>{/if}
      </button>
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
    <ParticleDetail particle={selected} antimatter={selectedMirror} onclose={() => selected = null}/>
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
          <article><span>05</span><h3>Antimateria</h3><p>El modo espejo despliega una segunda estructura completa. Los estados autoconjugados se repiten para comparar, pero se identifican como la misma especie física.</p></article>
          <article><span>06</span><h3>Composición</h3><p>Selecciona deuterio, protón o neutrón: sus constituyentes se iluminan y quedan unidos mediante rutas animadas.</p></article>
          <article><span>07</span><h3>Frontera</h3><p>“Más allá” separa partículas hipotéticas, supersimetría y objetos de cuerdas de todo aquello que ya ha sido observado.</p></article>
          <article><span>08</span><h3>Tema automático</h3><p>Con permiso de ubicación, el tema cambia según el amanecer y el anochecer locales. Sin permiso, respeta la preferencia del sistema.</p></article>
        </div>
        <footer><Layers3 size={16}/><p>Las alturas expresan órdenes de escala y relaciones conceptuales. Las fichas y objetos no están dibujados a tamaño relativo real.</p></footer>
      </div>
    </div>
  {/if}
</main>
