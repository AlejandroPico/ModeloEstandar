<script lang="ts">
  import { onMount } from 'svelte';
  import {
    BookOpen, Braces, Database, Filter, Focus, Layers3, Moon, Search,
    Sun, SunMoon, Telescope, Tags, X
  } from '@lucide/svelte';
  import ParticleViewport from './components/ParticleViewport.svelte';
  import ParticleDetail from './components/ParticleDetail.svelte';
  import ScaleJourney from './components/ScaleJourney.svelte';
  import FormulaAtlas from './components/FormulaAtlas.svelte';
  import FilterPanel from './components/FilterPanel.svelte';
  import LayersPanel from './components/LayersPanel.svelte';
  import LegendPanel from './components/LegendPanel.svelte';
  import DataPanel from './components/DataPanel.svelte';
  import EncyclopediaModal from './components/EncyclopediaModal.svelte';
  import { compositeParticles, frontierObjects, particles, theoryParticles } from './data/particles';
  import { forceEntities } from './data/forces';
  import type { Interaction, LayerId, Particle, ParticleFamily } from './data/types';
  import { resolveSolarTheme } from './lib/solarTheme';

  type ThemeMode = 'auto' | 'light' | 'dark';
  type ResolvedTheme = 'light' | 'dark';
  let viewport: any;
  let selected = $state<Particle | null>(null);
  let selectedMirror = $state(false);
  let zoomPercent = $state(100);
  let layers = $state<Record<LayerId, boolean>>({ composites: true, forces: true, antimatter: false, susy: false, 'dark-sector': false, 'quantum-gravity': false, strings: false });
  let showScale = $state(false);
  let showFormula = $state(false);
  let hudPanel = $state<'search' | 'legend' | 'data' | 'filter' | 'layers' | null>(null);
  let showEncyclopedia = $state(false);
  let themeMode = $state<ThemeMode>('auto');
  let resolvedTheme = $state<ResolvedTheme>('dark');
  let solarSource = $state<'solar' | 'system'>('system');
  let themeTimer = 0;
  let displayedCount = $state(21);
  let uniqueCount = $state(21);
  let query = $state('');
  let family = $state<ParticleFamily | 'all'>('all');
  let interaction = $state<Interaction | 'all'>('all');

  const visibleComposites = $derived(layers.composites ? compositeParticles : []);
  const visibleForces = $derived(layers.forces ? forceEntities : []);
  const visibleTheory = $derived(theoryParticles.filter((particle) => {
    if (['neutralino', 'gluino', 'sfermions', 'chargino'].includes(particle.id)) return layers.susy;
    if (['axion', 'sterile-neutrino', 'dark-photon'].includes(particle.id)) return layers['dark-sector'];
    return layers['quantum-gravity'];
  }));
  const visibleFrontier = $derived(layers.strings ? frontierObjects : []);
  const showTheory = $derived(visibleTheory.length > 0 || visibleFrontier.length > 0);
  const antimatter = $derived(layers.antimatter);
  const activeNodes = $derived([...visibleComposites, ...visibleForces, ...particles, ...visibleTheory, ...visibleFrontier]);
  const observedCount = $derived(activeNodes.filter((particle) => particle.evidence === 'observed').length);
  const hypotheticalCount = $derived(activeNodes.filter((particle) => particle.evidence === 'hypothetical').length);
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

  $effect(() => {
    if (selected && !activeNodes.some((particle) => particle.id === selected?.id)) selected = null;
  });

  function selectParticle(particle: Particle, mirror = false): void {
    selected = particle;
    selectedMirror = mirror;
  }

  function applyTheme(): void {
    if (themeMode === 'auto') {
      const result = resolveSolarTheme(new Date(), 41.3874, 2.1686);
      resolvedTheme = result.dark ? 'dark' : 'light';
      solarSource = result.source;
    } else {
      resolvedTheme = themeMode;
    }
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.dataset.themeMode = themeMode;
  }

  function cycleTheme(): void {
    themeMode = themeMode === 'auto' ? 'light' : themeMode === 'light' ? 'dark' : 'auto';
    try { localStorage.setItem('modelo-estandar-theme', themeMode); } catch (_) {}
    applyTheme();
  }

  function toggleLayer(layer: LayerId): void {
    layers[layer] = !layers[layer];
    window.setTimeout(() => {
      if (layer === 'strings' && layers[layer]) viewport?.focusZone?.('planck');
      else if (['susy', 'dark-sector', 'quantum-gravity'].includes(layer) && layers[layer]) viewport?.focusZone?.('beyond');
      else if (layer === 'forces' && layers[layer]) viewport?.focusZone?.('forces');
      else viewport?.focusZone?.('standard');
    }, 40);
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
    else if (showEncyclopedia) showEncyclopedia = false;
    else if (hudPanel) hudPanel = null;
  }

  onMount(() => {
    const saved = localStorage.getItem('modelo-estandar-theme');
    if (saved === 'auto' || saved === 'light' || saved === 'dark') themeMode = saved;
    themeTimer = window.setInterval(() => { if (themeMode === 'auto') applyTheme(); }, 60_000);
    applyTheme();
    return () => {
      window.clearInterval(themeTimer);
    };
  });
</script>

<svelte:window onkeydown={handleKeydown} />
<svelte:head><title>Modelo Estándar · Atlas de partículas</title></svelte:head>

<main class:detail-open={Boolean(selected)} class="app-shell">
  <ParticleViewport
    bind:this={viewport}
    {particles}
    compositeParticles={visibleComposites}
    forceEntities={visibleForces}
    theoryParticles={visibleTheory}
    frontierObjects={visibleFrontier}
    {showTheory}
    {antimatter}
    {selectedKey}
    {matches}
    {filtering}
    onselect={selectParticle}
    onzoom={(value) => zoomPercent = value}
    oncount={(count, unique) => { displayedCount = count; uniqueCount = unique; }}
  />

  {#if filtering}
    <div class="results-badge"><Search size={14}/><b>{matches.size}</b> de {activeNodes.length} fichas <button type="button" onclick={resetFilters} aria-label="Quitar filtros"><X size={13}/></button></div>
  {/if}

  <nav class="hud-toolbar" aria-label="Herramientas científicas">
    <button type="button" data-tooltip="Restablecer vista" aria-label={`Zoom ${zoomPercent}%. Restablecer vista`} onclick={() => viewport?.resetView?.()}><Focus size={16}/><b>{zoomPercent}%</b></button>
    <button class:active={themeMode === 'auto'} type="button" data-tooltip={themeMode === 'auto' ? 'Tema automático · ciclo solar de Barcelona' : `Tema ${themeMode}`} aria-label="Cambiar tema: automático, claro u oscuro" onclick={cycleTheme}>{#if themeMode === 'auto'}<SunMoon size={17}/>{:else if themeMode === 'dark'}<Moon size={17}/>{:else}<Sun size={17}/>{/if}</button>
    <button class:active={hudPanel === 'search'} type="button" data-tooltip="Buscar" aria-label="Buscar" onclick={() => hudPanel = hudPanel === 'search' ? null : 'search'}><Search size={17}/></button>
    <button class:active={hudPanel === 'legend'} type="button" data-tooltip="Leyenda" aria-label="Abrir leyenda" onclick={() => hudPanel = hudPanel === 'legend' ? null : 'legend'}><Tags size={17}/></button>
    <button class:active={hudPanel === 'data'} type="button" data-tooltip="Datos del lienzo" aria-label="Abrir datos del lienzo" onclick={() => hudPanel = hudPanel === 'data' ? null : 'data'}><Database size={17}/></button>
    <button class:active={hudPanel === 'filter'} type="button" data-tooltip="Filtros" aria-label="Abrir filtros" onclick={() => hudPanel = hudPanel === 'filter' ? null : 'filter'}><Filter size={17}/></button>
    <button type="button" data-tooltip="Enciclopedia · 50 claves" aria-label="Abrir enciclopedia" onclick={() => showEncyclopedia = true}><BookOpen size={17}/></button>
    <button type="button" data-tooltip="Escalas" aria-label="Abrir recorrido de escalas" onclick={() => showScale = true}><Telescope size={17}/></button>
    <button type="button" data-tooltip="Fórmulas" aria-label="Abrir capa matemática" onclick={() => showFormula = true}><Braces size={18}/></button>
    <button class:active={hudPanel === 'layers'} type="button" data-tooltip="Capas" aria-label="Abrir capas" onclick={() => hudPanel = hudPanel === 'layers' ? null : 'layers'}><Layers3 size={18}/></button>
  </nav>

  {#if hudPanel === 'search' || hudPanel === 'filter'}
    <FilterPanel
      {query} {family} {interaction}
      mode={hudPanel}
      onquery={(value) => query = value}
      onfamily={(value) => family = value}
      oninteraction={(value) => interaction = value}
      onreset={resetFilters}
      onclose={() => hudPanel = null}
    />
  {/if}
  {#if hudPanel === 'legend'}<LegendPanel onclose={() => hudPanel = null}/>{/if}
  {#if hudPanel === 'data'}<DataPanel displayed={displayedCount} unique={uniqueCount} observed={observedCount} hypothetical={hypotheticalCount} {antimatter} onclose={() => hudPanel = null}/>{/if}
  {#if hudPanel === 'layers'}<LayersPanel {layers} ontoggle={toggleLayer} onclose={() => hudPanel = null}/>{/if}

  {#if selected}
    <ParticleDetail particle={selected} antimatter={selectedMirror} onclose={() => selected = null}/>
  {/if}
  {#if showScale}<ScaleJourney onclose={() => showScale = false}/>{/if}
  {#if showFormula}<FormulaAtlas onclose={() => showFormula = false}/>{/if}
  {#if showEncyclopedia}<EncyclopediaModal onclose={() => showEncyclopedia = false}/>{/if}
</main>
