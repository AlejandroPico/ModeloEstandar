<script lang="ts">
  import { onMount } from 'svelte';
  import type { Particle, Interaction, ParticleZone } from '../data/types';
  import ParticleCard from './ParticleCard.svelte';
  import { clamp } from '../lib/format';

  let {
    particles,
    compositeParticles = [],
    forceEntities = [],
    theoryParticles = [],
    frontierObjects = [],
    showTheory = false,
    antimatter = false,
    selectedKey = '',
    matches = new Set<string>(),
    filtering = false,
    onselect,
    onzoom,
    oncamera = () => {},
    oncount
  }: {
    particles: Particle[];
    compositeParticles?: Particle[];
    forceEntities?: Particle[];
    theoryParticles?: Particle[];
    frontierObjects?: Particle[];
    showTheory?: boolean;
    antimatter?: boolean;
    selectedKey?: string;
    matches?: Set<string>;
    filtering?: boolean;
    onselect: (particle: Particle, mirror: boolean) => void;
    onzoom: (percent: number) => void;
    oncamera?: (camera: { x: number; y: number; scale: number }, animated: boolean) => void;
    oncount: (count: number, unique: number) => void;
  } = $props();

  let viewport: HTMLDivElement;
  let camera = $state({ x: 0, y: 0, scale: 1 });
  let dragging = $state(false);
  let pointer = { x: 0, y: 0 };
  let resizeObserver: ResizeObserver | undefined;

  const sideWidth = 1260;
  const mirrorGap = 150;
  const cardWidth = 190;
  const cardHeight = 138;
  const worldWidth = $derived(antimatter ? sideWidth * 2 + mirrorGap : sideWidth);
  const hasBeyond = $derived(theoryParticles.length > 0);
  const hasStrings = $derived(frontierObjects.length > 0);
  const hasComposites = $derived(compositeParticles.length > 0);
  const hasForces = $derived(forceEntities.length > 0);
  const worldHeight = $derived(hasStrings ? 2730 : hasBeyond ? 2345 : 1980);
  const visibleNodes = $derived([
    ...compositeParticles,
    ...forceEntities,
    ...particles,
    ...(showTheory ? [...theoryParticles, ...frontierObjects] : [])
  ]);
  const selectedMirror = $derived(selectedKey.startsWith('anti:'));
  const selectedId = $derived(selectedKey.replace(/^anti:/, ''));
  const selected = $derived(visibleNodes.find((item) => item.id === selectedId));

  $effect(() => {
    oncount(visibleNodes.length * (antimatter ? 2 : 1), visibleNodes.length);
  });

  function keyFor(particle: Particle, mirror: boolean): string {
    return `${mirror ? 'anti:' : ''}${particle.id}`;
  }

  function positionFor(particle: Particle, mirror = false): { x: number; y: number } {
    const offset = mirror ? sideWidth + mirrorGap : 0;
    if (particle.zone === 'atom') return { x: offset + 300 + (particle.column - 2) * 250, y: 115 };
    if (particle.zone === 'composite') return { x: offset + 160 + (particle.column - 2) * 210, y: 600 + (particle.row - 1) * 155 };
    if (particle.family === 'force' || particle.zone === 'forces') return { x: offset + 160 + (particle.column - 1) * 250, y: 1035 };
    if (particle.family === 'theory' || particle.zone === 'beyond') return { x: offset + 160 + (particle.column - 1) * 210, y: 2020 + (particle.row - 1) * 155 };
    if (particle.family === 'string' || particle.zone === 'planck') return { x: offset + 160 + (particle.column - 1) * 210, y: 2410 + (particle.row - 1) * 155 };
    return { x: offset + 160 + (particle.column - 1) * 210, y: 1340 + (particle.row - 1) * 155 };
  }

  const zoneBounds: Record<ParticleZone | 'all', { y: number; height: number }> = {
    atom: { y: 0, height: 310 },
    composite: { y: 500, height: 420 },
    forces: { y: 930, height: 280 },
    standard: { y: 1280, height: 620 },
    beyond: { y: 1935, height: 390 },
    planck: { y: 2325, height: 380 },
    all: { y: 0, height: 2710 }
  };

  function focusZone(zone: ParticleZone | 'all' = 'standard', animated = true): void {
    if (!viewport) return;
    const bounds = zoneBounds[zone];
    const rect = viewport.getBoundingClientRect();
    const axisWidth = rect.width > 780 ? 96 : 74;
    const availableWidth = Math.max(160, rect.width - axisWidth - 28);
    const availableHeight = rect.height - 118;
    const targetHeight = zone === 'all' ? worldHeight : Math.min(bounds.height, worldHeight - bounds.y);
    const scale = clamp(Math.min(availableWidth / worldWidth, availableHeight / targetHeight), 0.28, 1.45);
    camera = {
      scale,
      x: axisWidth + (availableWidth - worldWidth * scale) / 2,
      y: (rect.height - targetHeight * scale) / 2 - bounds.y * scale
    };
    oncamera(camera, animated);
    if (animated) {
      viewport.dataset.animating = 'true';
      window.setTimeout(() => viewport?.removeAttribute('data-animating'), 470);
    }
    onzoom(Math.round(scale * 100));
  }

  function resetView(): void { focusZone('standard'); }
  function fitAll(): void { focusZone('all'); }

  function zoomAt(clientX: number, clientY: number, factor: number): void {
    const rect = viewport.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const next = clamp(camera.scale * factor, 0.25, 2.8);
    const worldX = (px - camera.x) / camera.scale;
    const worldY = (py - camera.y) / camera.scale;
    camera = { scale: next, x: px - worldX * next, y: py - worldY * next };
    oncamera(camera, false);
    onzoom(Math.round(next * 100));
  }

  function handleWheel(event: WheelEvent): void {
    event.preventDefault();
    zoomAt(event.clientX, event.clientY, Math.exp(-event.deltaY * 0.00135));
  }

  function pointerDown(event: PointerEvent): void {
    if (event.button !== 0) return;
    if (event.target instanceof Element && event.target.closest('button, a, input, [role="dialog"]')) return;
    dragging = true;
    pointer = { x: event.clientX, y: event.clientY };
    viewport.setPointerCapture(event.pointerId);
  }

  function pointerMove(event: PointerEvent): void {
    if (!dragging) return;
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    camera = { ...camera, x: camera.x + dx, y: camera.y + dy };
    oncamera(camera, false);
    pointer = { x: event.clientX, y: event.clientY };
  }

  function pointerUp(event: PointerEvent): void {
    dragging = false;
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
  }

  function zoomIn(): void {
    const r = viewport.getBoundingClientRect();
    zoomAt(r.left + r.width / 2, r.top + r.height / 2, 1.25);
  }

  function zoomOut(): void {
    const r = viewport.getBoundingClientRect();
    zoomAt(r.left + r.width / 2, r.top + r.height / 2, 0.8);
  }

  function forceTargets(interactions: Interaction[]): Particle[] {
    const ids = new Set<string>();
    if (interactions.includes('strong')) { ids.add('gluon'); ids.add('strong-force'); }
    if (interactions.includes('electromagnetic')) { ids.add('photon'); ids.add('electromagnetic-force'); }
    if (interactions.includes('weak')) { ids.add('z-boson'); ids.add('w-boson'); ids.add('weak-force'); }
    if (interactions.includes('higgs')) ids.add('higgs');
    if (interactions.includes('gravity')) { ids.add('graviton'); ids.add('gravity-force'); }
    return visibleNodes.filter((item) => ids.has(item.id) && item.id !== selectedId);
  }

  function relationTargets(): Particle[] {
    if (!selected) return [];
    if (selected.constituents?.length) {
      const ids = new Set(selected.constituents);
      return visibleNodes.filter((item) => ids.has(item.id));
    }
    const reverse = visibleNodes.filter((item) => item.constituents?.includes(selected.id));
    const forces = forceTargets(selected.interactions);
    return [...new Map([...reverse, ...forces].map((item) => [item.id, item])).values()];
  }

  function isRelated(particle: Particle, mirror: boolean): boolean {
    if (!selected) return false;
    if (mirror !== selectedMirror) return antimatter && particle.id === selected.id;
    return relationTargets().some((item) => item.id === particle.id);
  }

  onMount(() => {
    resizeObserver = new ResizeObserver(() => focusZone('standard', false));
    resizeObserver.observe(viewport);
    requestAnimationFrame(() => focusZone('standard', false));
    return () => resizeObserver?.disconnect();
  });

  export { resetView, fitAll, focusZone, zoomIn, zoomOut };
</script>

<div
  class:dragging
  class="particle-viewport"
  bind:this={viewport}
  onwheel={handleWheel}
  onpointerdown={pointerDown}
  onpointermove={pointerMove}
  onpointerup={pointerUp}
  onpointercancel={pointerUp}
  ondblclick={(event) => { if (event.target === viewport) resetView(); }}
  role="application"
  aria-label="Enciclopedia ampliable de partículas y escalas. Usa la rueda para ampliar y arrastra el fondo para desplazarte."
>
  <div class="particle-world" style={`width:${worldWidth}px;height:${worldHeight}px;transform:translate3d(${camera.x}px,${camera.y}px,0) scale(${camera.scale});`}>
    {#each antimatter ? [false, true] : [false] as mirror}
      {@const offset = mirror ? sideWidth + mirrorGap : 0}
      <section class:mirror class="matter-universe" style={`left:${offset}px;width:${sideWidth}px;height:${worldHeight}px;`} aria-label={mirror ? 'Antimateria' : 'Materia'}>
        <header class="universe-heading"><span>{mirror ? 'UNIVERSO ESPEJO' : 'ESTRUCTURA DE LA MATERIA'}</span><strong>{mirror ? 'antimateria y equivalentes autoconjugados' : 'de lo compuesto a lo elemental'}</strong></header>

        {#if hasComposites}<div class="zone-panel atom-zone"><span class="zone-scale">≈10⁻¹⁰ m</span><b>ÁTOMOS</b><small>hidrógeno mínimo y deuterio comparativo</small></div>{/if}
        {#if hasComposites}<div class="zone-panel composite-zone"><span class="zone-scale">≈10⁻¹⁴–10⁻¹⁵ m</span><b>NÚCLEOS, NUCLEONES Y MESONES</b><small>sistemas compuestos; el pión es un mesón u + d̄</small></div>{/if}
        {#if hasForces}<div class="zone-panel forces-zone"><span class="zone-scale">CAMPO / ALCANCE</span><b>LAS CUATRO INTERACCIONES FUNDAMENTALES</b><small>tres dentro del Modelo Estándar; gravedad fuera de él</small></div>{/if}
        <div class="zone-panel standard-zone"><span class="zone-scale">&lt;10⁻¹⁹ m</span><b>MODELO ESTÁNDAR · PARTÍCULAS ELEMENTALES</b><small>sin estructura interna observada</small></div>

        <div class="world-heading matter-heading"><span>PARTÍCULAS DE MATERIA</span><strong>fermiones · spin ½</strong></div>
        <div class="world-heading force-heading"><span>MEDIADORES</span><strong>bosones gauge · spin 1</strong></div>
        <div class="generation-label g1"><small>GENERACIÓN</small><b>I</b><span>materia estable</span></div>
        <div class="generation-label g2"><small>GENERACIÓN</small><b>II</b><span>más pesada</span></div>
        <div class="generation-label g3"><small>GENERACIÓN</small><b>III</b><span>muy masiva</span></div>
        <div class="family-label quarks">QUARKS</div><div class="family-label leptons">LEPTONES</div><div class="family-label gauge">FUERZAS</div><div class="family-label scalar">CAMPO</div>

        {#if hasBeyond}
          <div class="zone-panel beyond-zone"><span class="zone-scale">NO OBSERVADO</span><b>MÁS ALLÁ DEL MODELO ESTÁNDAR</b><small>supersimetría, sectores oscuros y gravedad cuántica</small></div>
        {/if}
        {#if hasStrings}
          <div class="zone-panel planck-zone"><span class="zone-scale">ℓₚ = 1,616255 × 10⁻³⁵ m</span><b>FRONTERA DE PLANCK</b><small>cuerdas, branas y teoría M · marcos teóricos</small></div>
        {/if}
      </section>
    {/each}

    {#if antimatter}
      <div class="mirror-axis" style={`left:${sideWidth + mirrorGap / 2}px;height:${worldHeight}px;`}><span>SIMETRÍA MATERIA ↔ ANTIMATERIA</span></div>
      <svg class="mirror-flow" viewBox={`0 0 ${worldWidth} ${worldHeight}`} aria-hidden="true">
        <path d={`M ${sideWidth - 54} 56 C ${sideWidth + 22} 18, ${sideWidth + mirrorGap - 22} 18, ${sideWidth + mirrorGap + 54} 56`} />
      </svg>
    {/if}

    {#if selected}
      <svg class="interaction-lines" viewBox={`0 0 ${worldWidth} ${worldHeight}`} aria-hidden="true">
        {#each relationTargets() as target}
          {@const from = positionFor(selected, selectedMirror)}
          {@const to = positionFor(target, selectedMirror)}
          <path class:composition-link={Boolean(selected.constituents?.length)} d={`M ${from.x + cardWidth / 2} ${from.y + cardHeight / 2} C ${(from.x + to.x) / 2 + cardWidth / 2} ${from.y + cardHeight / 2}, ${(from.x + to.x) / 2 + cardWidth / 2} ${to.y + cardHeight / 2}, ${to.x + cardWidth / 2} ${to.y + cardHeight / 2}`} />
        {/each}
        {#if antimatter}
          {@const origin = positionFor(selected, selectedMirror)}
          {@const counterpart = positionFor(selected, !selectedMirror)}
          <path class="mirror-link" d={`M ${origin.x + cardWidth / 2} ${origin.y + cardHeight / 2} C ${sideWidth + mirrorGap / 2} ${origin.y - 70}, ${sideWidth + mirrorGap / 2} ${counterpart.y - 70}, ${counterpart.x + cardWidth / 2} ${counterpart.y + cardHeight / 2}`} />
        {/if}
      </svg>
    {/if}

    {#each antimatter ? [false, true] : [false] as mirror}
      {#each visibleNodes as particle (keyFor(particle, mirror))}
        {@const position = positionFor(particle, mirror)}
        {@const key = keyFor(particle, mirror)}
        <div class="card-position" style={`left:${position.x}px;top:${position.y}px;width:${cardWidth}px;height:${cardHeight}px;`}>
          <ParticleCard
            {particle}
            zoom={camera.scale}
            selected={key === selectedKey}
            related={isRelated(particle, mirror)}
            constituent={Boolean(selected?.constituents?.includes(particle.id) && mirror === selectedMirror)}
            dimmed={filtering && !matches.has(particle.id)}
            antimatter={mirror}
            onselect={(item) => onselect(item, mirror)}
          />
        </div>
      {/each}
    {/each}
  </div>

  <div class="viewport-help" aria-hidden="true">rueda para ampliar · arrastra para recorrer · doble clic para volver al Modelo Estándar</div>
</div>
