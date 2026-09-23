<script lang="ts">
  import { onMount } from 'svelte';
  import {
    BookOpen, Braces, Filter, Info, Layers3, Menu, Moon, Search,
    Sun, SunMoon, Tags, X
  } from '@lucide/svelte';
  import ParticleViewport from './components/ParticleViewport.svelte';
  import ParticleDetail from './components/ParticleDetail.svelte';
  import ScaleAxis from './components/ScaleAxis.svelte';
  import FilterPanel from './components/FilterPanel.svelte';
  import LayersPanel from './components/LayersPanel.svelte';
  import LegendPanel from './components/LegendPanel.svelte';
  import AboutModal from './components/AboutModal.svelte';
  import { biologyObjects, compositeParticles, frontierObjects, particles, technologyObjects, theoryParticles } from './data/particles';
  import { forceEntities } from './data/forces';
  import type { Interaction, LayerId, Particle, ParticleFamily } from './data/types';
  import { resolveSolarTheme } from './lib/solarTheme';

  type ThemeMode = 'auto' | 'light' | 'dark';
  type ResolvedTheme = 'light' | 'dark';
  let viewport: any;
  let selected = $state<Particle | null>(null);
  let selectedMirror = $state(false);
  let zoomPercent = $state(100);
  let viewCamera = $state({ x: 0, y: 0, scale: 1 });
  let axisAnimated = $state(false);
  let axisTimer = 0;
  let axisPositions = $state<number[]>([]);
  let axisBreakY = $state(0);
  let layers = $state<Record<LayerId, boolean>>({ composites: false, forces: false, antimatter: false, susy: false, 'dark-sector': false, 'collider-candidates': false, 'quantum-gravity': false, strings: false, technology: false, biology: false });
  let showFormula = $state(false);
  let FormulaView = $state<typeof import('./components/FormulaAtlas.svelte').default | null>(null);
  let hudPanel = $state<'search' | 'legend' | 'filter' | 'layers' | null>(null);
  let showEncyclopedia = $state(false);
  let EncyclopediaView = $state<typeof import('./components/EncyclopediaModal.svelte').default | null>(null);
  let showAbout = $state(false);
  let mobileMenuOpen = $state(false);
  let mobileLayout = $state(false);
  let encyclopediaChapter = $state<string | undefined>(undefined);
  let searchInput = $state<HTMLInputElement | null>(null);
  let themeMode = $state<ThemeMode>('auto');
  let resolvedTheme = $state<ResolvedTheme>('dark');
  let solarSource = $state<'solar' | 'system'>('system');
  let solarPosition = $state<{ latitude: number; longitude: number } | null>(null);
  let themeTimer = 0;
  let displayedCount = $state(21);
  let uniqueCount = $state(21);
  let query = $state('');
  let family = $state<ParticleFamily | 'all'>('all');
  let interaction = $state<Interaction | 'all'>('all');
  let menuTouchStart = { x: 0, y: 0 };

  const visibleComposites = $derived(layers.composites ? compositeParticles : []);
  const visibleForces = $derived(layers.forces ? forceEntities : []);
  const visibleTechnology = $derived(layers.technology ? technologyObjects : []);
  const visibleBiology = $derived(layers.biology ? biologyObjects : []);
  const visibleTheory = $derived(theoryParticles.filter((particle) => {
    if (['neutralino', 'gluino', 'sfermions', 'chargino'].includes(particle.id)) return layers.susy;
    if (['axion', 'sterile-neutrino', 'dark-photon', 'dark-higgs', 'dark-meson'].includes(particle.id)) return layers['dark-sector'];
    if (['leptoquark', 'heavy-neutral-lepton', 'z-prime', 'w-prime', 'vector-like-quark', 'q-ball', 'dyon'].includes(particle.id)) return layers['collider-candidates'];
    return layers['quantum-gravity'];
  }));
  const visibleFrontier = $derived(layers.strings ? frontierObjects : []);
  const showTheory = $derived(visibleTheory.length > 0 || visibleFrontier.length > 0);
  const antimatter = $derived(layers.antimatter);
  const activeNodes = $derived([...visibleBiology, ...visibleTechnology, ...visibleComposites, ...visibleForces, ...particles, ...visibleTheory, ...visibleFrontier]);
  const catalogNodes = [...biologyObjects, ...technologyObjects, ...compositeParticles, ...forceEntities, ...particles, ...theoryParticles, ...frontierObjects];
  const observedCount = $derived(activeNodes.filter((particle) => particle.evidence === 'observed').length);
  const hypotheticalCount = $derived(activeNodes.filter((particle) => particle.evidence === 'hypothetical').length);
  const selectedKey = $derived(selected ? `${selectedMirror ? 'anti:' : ''}${selected.id}` : '');
  const filtering = $derived(Boolean(query.trim()) || family !== 'all' || interaction !== 'all');
  const hasActiveLayer = $derived(Object.values(layers).some(Boolean));
  const matches = $derived(new Set(activeNodes.filter((particle) => {
    const normalized = query.trim().toLocaleLowerCase('es').normalize('NFD').replace(/\p{Diacritic}/gu, '');
    const haystack = [particle.name, particle.englishName, particle.symbol, particle.antiparticleName, particle.antiparticle, particle.summary, particle.composition, particle.role, particle.decays, particle.discovered, particle.spin, particle.mass, particle.charge, particle.formula, particle.theory, particle.confidence, particle.colorState, particle.colorDetail, particle.colorFormula, particle.valenceFormula, particle.constituentSummary, ...(particle.constituentDetails?.flatMap((item) => [item.count, item.symbol, item.label, item.role]) ?? []), ...particle.sources.map((source) => source.label)]
      .join(' ').toLocaleLowerCase('es').normalize('NFD').replace(/\p{Diacritic}/gu, '');
    return (!normalized || haystack.includes(normalized))
      && (family === 'all' || particle.family === family)
      && (interaction === 'all' || particle.interactions.includes(interaction));
  }).map((particle) => particle.id)));
  const searchResults = $derived.by(() => {
    const needle = query.trim().toLocaleLowerCase('es').normalize('NFD').replace(/\p{Diacritic}/gu, '');
    if (!needle) return [] as Array<{ particle: Particle; mirror: boolean; name: string; symbol: string }>;
    return catalogNodes.flatMap((particle) => {
      const matterText = [particle.name, particle.englishName, particle.symbol, particle.summary, particle.composition, particle.role, particle.decays, particle.mass, particle.charge, particle.spin, particle.discovered, particle.formula, particle.theory, particle.confidence, particle.colorState, particle.colorDetail, particle.colorFormula, particle.valenceFormula, particle.constituentSummary, ...(particle.constituentDetails?.flatMap((item) => [item.count, item.symbol, item.label, item.role]) ?? [])].join(' ').toLocaleLowerCase('es').normalize('NFD').replace(/\p{Diacritic}/gu, '');
      const antiText = `${particle.antiparticleName} ${particle.antiparticle} antimateria anti ${particle.summary}`.toLocaleLowerCase('es').normalize('NFD').replace(/\p{Diacritic}/gu, '');
      const results: Array<{ particle: Particle; mirror: boolean; name: string; symbol: string }> = [];
      if (matterText.includes(needle)) results.push({ particle, mirror: false, name: particle.name, symbol: particle.symbol });
      if (!particle.selfConjugate && antiText.includes(needle)) results.push({ particle, mirror: true, name: particle.antiparticleName, symbol: particle.antiparticle });
      return results;
    }).slice(0, 16);
  });

  $effect(() => {
    if (selected && !activeNodes.some((particle) => particle.id === selected?.id)) selected = null;
  });

  function selectParticle(particle: Particle, mirror = false): void {
    selected = particle;
    selectedMirror = mirror;
  }

  function revealSearchResult(result: { particle: Particle; mirror: boolean }): void {
    const particle = result.particle;
    if (particle.layer && particle.layer !== 'antimatter') layers[particle.layer] = true;
    if (particle.family === 'composite') layers.composites = true;
    if (particle.family === 'force') layers.forces = true;
    if (particle.family === 'technology') layers.technology = true;
    if (particle.family === 'biology') layers.biology = true;
    if (['neutralino', 'gluino', 'sfermions', 'chargino'].includes(particle.id)) layers.susy = true;
    if (['axion', 'sterile-neutrino', 'dark-photon', 'dark-higgs', 'dark-meson'].includes(particle.id)) layers['dark-sector'] = true;
    if (['leptoquark', 'heavy-neutral-lepton', 'z-prime', 'w-prime', 'vector-like-quark', 'q-ball', 'dyon'].includes(particle.id)) layers['collider-candidates'] = true;
    if (particle.family === 'theory' && !['neutralino', 'gluino', 'sfermions', 'chargino', 'axion', 'sterile-neutrino', 'dark-photon', 'dark-higgs', 'dark-meson', 'leptoquark', 'heavy-neutral-lepton', 'z-prime', 'w-prime', 'vector-like-quark', 'q-ball', 'dyon'].includes(particle.id)) layers['quantum-gravity'] = true;
    if (particle.family === 'string') layers.strings = true;
    if (result.mirror) layers.antimatter = true;
    selected = particle;
    selectedMirror = result.mirror;
    hudPanel = null;
    mobileMenuOpen = false;
    window.setTimeout(() => viewport?.focusZone?.(particle.zone ?? (particle.family === 'theory' ? 'beyond' : particle.family === 'string' ? 'planck' : 'standard')), 60);
  }

  function applyTheme(): void {
    if (themeMode === 'auto') {
      const result = resolveSolarTheme(new Date(), solarPosition?.latitude, solarPosition?.longitude);
      resolvedTheme = result.dark ? 'dark' : 'light';
      solarSource = result.source;
    } else {
      resolvedTheme = themeMode;
    }
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.dataset.themeMode = themeMode;
  }

  async function openEncyclopedia(chapter?: string): Promise<void> {
    encyclopediaChapter = chapter;
    hudPanel = null;
    mobileMenuOpen = false;
    if (!EncyclopediaView) EncyclopediaView = (await import('./components/EncyclopediaModal.svelte')).default;
    showEncyclopedia = true;
  }

  async function openFormula(): Promise<void> {
    mobileMenuOpen = false;
    if (!FormulaView) FormulaView = (await import('./components/FormulaAtlas.svelte')).default;
    showFormula = true;
  }

  function openAbout(): void {
    hudPanel = null;
    mobileMenuOpen = false;
    showAbout = true;
  }

  function toggleHudPanel(panel: 'legend' | 'filter' | 'layers'): void {
    hudPanel = hudPanel === panel ? null : panel;
    if (mobileLayout) {
      mobileMenuOpen = true;
      if (hudPanel) window.setTimeout(() => document.querySelector('.mobile-inline-sections > aside')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }), 40);
    } else {
      mobileMenuOpen = false;
    }
  }

  function toggleMobileMenu(): void {
    mobileMenuOpen = !mobileMenuOpen;
    if (!mobileMenuOpen) hudPanel = null;
  }

  function closeMobileMenu(): void {
    mobileMenuOpen = false;
    hudPanel = null;
  }

  function beginMenuSwipe(event: TouchEvent): void {
    const touch = event.changedTouches[0];
    menuTouchStart = { x: touch.clientX, y: touch.clientY };
  }

  function endMenuSwipe(event: TouchEvent): void {
    const touch = event.changedTouches[0];
    const dx = touch.clientX - menuTouchStart.x;
    const dy = touch.clientY - menuTouchStart.y;
    if (dx < -55 && Math.abs(dx) > Math.abs(dy) * 1.15) {
      closeMobileMenu();
    }
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
      else if (layer === 'technology' && layers[layer]) viewport?.focusZone?.('technology');
      else if (layer === 'biology' && layers[layer]) viewport?.focusZone?.('biology');
      else if (['susy', 'dark-sector', 'collider-candidates', 'quantum-gravity'].includes(layer) && layers[layer]) viewport?.focusZone?.('beyond');
      else if (layer === 'forces' && layers[layer]) viewport?.focusZone?.('forces');
      else viewport?.focusZone?.('standard');
    }, 40);
  }

  function resetFilters(): void {
    query = '';
    family = 'all';
    interaction = 'all';
  }

  function updateViewCamera(camera: { x: number; y: number; scale: number }, animated: boolean): void {
    viewCamera = camera;
    window.clearTimeout(axisTimer);
    axisAnimated = animated;
    if (animated) axisTimer = window.setTimeout(() => axisAnimated = false, 380);
  }

  function toggleSearch(): void {
    hudPanel = hudPanel === 'search' ? null : 'search';
    if (hudPanel === 'search') window.setTimeout(() => searchInput?.focus(), 40);
  }

  function handleKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Escape') return;
    if (showFormula) showFormula = false;
    else if (showAbout) showAbout = false;
    else if (showEncyclopedia) showEncyclopedia = false;
    else if (hudPanel) hudPanel = null;
    else if (mobileMenuOpen) mobileMenuOpen = false;
    else if (selected) selected = null;
  }

  onMount(() => {
    const mobileMedia = window.matchMedia('(max-width: 900px)');
    const syncMobileLayout = () => {
      mobileLayout = mobileMedia.matches;
      if (!mobileLayout) mobileMenuOpen = false;
    };
    syncMobileLayout();
    mobileMedia.addEventListener('change', syncMobileLayout);
    const saved = localStorage.getItem('modelo-estandar-theme');
    if (saved === 'auto' || saved === 'light' || saved === 'dark') themeMode = saved;
    themeTimer = window.setInterval(() => { if (themeMode === 'auto') applyTheme(); }, 60_000);
    applyTheme();
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          solarPosition = { latitude: coords.latitude, longitude: coords.longitude };
          if (themeMode === 'auto') applyTheme();
        },
        () => {
          solarPosition = null;
          if (themeMode === 'auto') applyTheme();
        },
        { maximumAge: 3_600_000, timeout: 8_000 }
      );
    }
    return () => {
      mobileMedia.removeEventListener('change', syncMobileLayout);
      window.clearInterval(themeTimer);
      window.clearTimeout(axisTimer);
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
    biologyObjects={visibleBiology}
    technologyObjects={visibleTechnology}
    theoryParticles={visibleTheory}
    frontierObjects={visibleFrontier}
    {showTheory}
    {antimatter}
    {selectedKey}
    {matches}
    {filtering}
    onselect={selectParticle}
    onzoom={(value) => zoomPercent = value}
    oncamera={updateViewCamera}
    onlayout={(positions, breakY) => { axisPositions = positions; axisBreakY = breakY; }}
    oncount={(count, unique) => { displayedCount = count; uniqueCount = unique; }}
  />

  <ScaleAxis camera={viewCamera} animated={axisAnimated} positions={axisPositions} breakWorldY={axisBreakY}/>

  {#if filtering}
    <div class="results-badge"><Search size={14}/><b>{matches.size}</b> de {activeNodes.length} fichas <button type="button" onclick={resetFilters} aria-label="Quitar filtros"><X size={13}/></button></div>
  {/if}

  <button class:active={mobileMenuOpen} class="mobile-menu-toggle" type="button" aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={mobileMenuOpen} onclick={toggleMobileMenu}>
    {#if mobileMenuOpen}<X size={21}/>{:else}<Menu size={21}/>{/if}
  </button>
  {#if mobileMenuOpen}<button class="mobile-menu-scrim" type="button" aria-label="Cerrar menú" onclick={closeMobileMenu}></button>{/if}

  <nav class:mobile-open={mobileMenuOpen} class="hud-toolbar" aria-label="Herramientas científicas" ontouchstart={beginMenuSwipe} ontouchend={endMenuSwipe}>
    <header class="mobile-menu-header"><img src="./favicon.svg" alt=""/><span><small class="eyebrow">MODELO ESTÁNDAR</small><b>Herramientas del atlas</b><em>Desliza a la izquierda para cerrar</em></span></header>
    <div class="toolbar-action-grid">
      <div class:open={hudPanel === 'search'} class="hud-search-inline">
        <button class:active={hudPanel === 'search'} type="button" data-tooltip="Buscar" aria-label="Buscar" onclick={toggleSearch}><Search size={17}/><span class="mobile-menu-label">Buscar</span></button>
        {#if hudPanel === 'search'}
          <label><input bind:this={searchInput} value={query} oninput={(event) => query = event.currentTarget.value} placeholder="Buscar partícula, color, uud, fórmula…" aria-label="Buscar en el atlas"/>{#if query}<button type="button" aria-label="Limpiar búsqueda" onclick={() => query = ''}><X size={14}/></button>{/if}</label>
          {#if query}
            <div class="hud-search-results" aria-label="Resultados de búsqueda">
              <header><span>{searchResults.length} coincidencias directas</span><small>incluye capas ocultas y antimateria</small></header>
              {#each searchResults as result}
                <button type="button" onclick={() => revealSearchResult(result)}>
                  <span>{result.symbol}</span><span><b>{result.name}</b><small>{result.mirror ? 'antimateria' : result.particle.family} · {result.particle.evidence === 'observed' ? 'observada' : 'hipótesis'}</small></span>
                </button>
              {:else}
                <p>No hay coincidencias. Prueba con un símbolo, una masa, una fecha, una interacción o un término teórico.</p>
              {/each}
            </div>
          {/if}
        {/if}
      </div>
      <button class:active={hudPanel === 'filter'} aria-expanded={hudPanel === 'filter'} type="button" data-tooltip="Filtros" aria-label="Abrir filtros" onclick={() => toggleHudPanel('filter')}><Filter size={17}/><span class="mobile-menu-label">Filtros</span></button>
      <button type="button" data-tooltip="Enciclopedia" aria-label="Abrir enciclopedia" onclick={() => openEncyclopedia()}><BookOpen size={18}/><span class="mobile-menu-label">Enciclopedia</span></button>
      <button class:active={hudPanel === 'legend'} aria-expanded={hudPanel === 'legend'} type="button" data-tooltip="Leyenda" aria-label="Abrir leyenda" onclick={() => toggleHudPanel('legend')}><Tags size={17}/><span class="mobile-menu-label">Leyenda</span></button>
      <button type="button" data-tooltip="Fórmulas" aria-label="Abrir atlas matemático" onclick={openFormula}><Braces size={18}/><span class="mobile-menu-label">Fórmulas</span></button>
      <span class="layers-anchor">
        {#if !hasActiveLayer && hudPanel !== 'layers'}<span class="layers-coachmark">Activa capas para descubrir compuestos, fuerzas, antimateria y nuevas hipótesis.</span>{/if}
        <button class:active={hudPanel === 'layers'} aria-expanded={hudPanel === 'layers'} class="layers-button" type="button" data-tooltip="Capas" aria-label="Abrir capas" onclick={() => toggleHudPanel('layers')}><Layers3 size={18}/><span class="mobile-menu-label">Capas</span></button>
      </span>
      <button type="button" data-tooltip="Acerca del proyecto" aria-label="Abrir acerca del proyecto" onclick={openAbout}><Info size={18}/><span class="mobile-menu-label">Acerca del proyecto</span></button>
      <button class:active={themeMode === 'auto'} type="button" data-tooltip={themeMode === 'auto' ? 'Tema automático' : `Tema ${themeMode}`} aria-label="Cambiar tema: automático, claro u oscuro" onclick={cycleTheme}>{#if themeMode === 'auto'}<SunMoon size={17}/>{:else if themeMode === 'dark'}<Moon size={17}/>{:else}<Sun size={17}/>{/if}<span class="mobile-menu-label">Tema</span></button>
      <button class="zoom-readout" type="button" data-tooltip="Restablecer vista" aria-label={`Zoom ${zoomPercent}%. Restablecer vista`} onclick={() => { viewport?.resetView?.(); closeMobileMenu(); }}><b>{zoomPercent}%</b><span class="mobile-menu-label">Restablecer vista</span></button>
    </div>
    {#if mobileLayout && (hudPanel === 'filter' || hudPanel === 'legend' || hudPanel === 'layers')}
      <div class="mobile-inline-sections">
        {#if hudPanel === 'filter'}
          <FilterPanel {query} {family} {interaction} mode="filter" onquery={(value) => query = value} onfamily={(value) => family = value} oninteraction={(value) => interaction = value} onreset={resetFilters} onclose={() => hudPanel = null}/>
        {:else if hudPanel === 'legend'}
          <LegendPanel onclose={() => hudPanel = null}/>
        {:else if hudPanel === 'layers'}
          <LayersPanel {layers} ontoggle={toggleLayer} onclose={() => hudPanel = null}/>
        {/if}
      </div>
    {/if}
  </nav>

  {#if !mobileLayout && hudPanel === 'filter'}
    <FilterPanel
      {query} {family} {interaction}
      mode="filter"
      onquery={(value) => query = value}
      onfamily={(value) => family = value}
      oninteraction={(value) => interaction = value}
      onreset={resetFilters}
      onclose={() => hudPanel = null}
    />
  {/if}
  {#if !mobileLayout && hudPanel === 'legend'}<LegendPanel onclose={() => hudPanel = null}/>{/if}
  {#if !mobileLayout && hudPanel === 'layers'}<LayersPanel {layers} ontoggle={toggleLayer} onclose={() => hudPanel = null}/>{/if}

  {#if selected}
    <ParticleDetail particle={selected} antimatter={selectedMirror} onclose={() => selected = null} onopenformula={openFormula} onopenencyclopedia={openEncyclopedia}/>
  {/if}
  {#if showFormula && FormulaView}<FormulaView onclose={() => showFormula = false}/>{/if}
  {#if showEncyclopedia && EncyclopediaView}<EncyclopediaView initialId={encyclopediaChapter} onclose={() => showEncyclopedia = false}/>{/if}
  {#if showAbout}<AboutModal onclose={() => showAbout = false}/>{/if}
</main>
