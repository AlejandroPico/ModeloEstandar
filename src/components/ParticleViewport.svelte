<script lang="ts">
  import { onMount } from 'svelte';
  import type { Particle, Interaction, ParticleZone } from '../data/types';
  import ParticleCard from './ParticleCard.svelte';
  import { clamp } from '../lib/format';

  let {
    particles,
    compositeParticles = [],
    forceEntities = [],
    technologyObjects = [],
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
    onlayout = () => {},
    oncount
  }: {
    particles: Particle[];
    compositeParticles?: Particle[];
    forceEntities?: Particle[];
    technologyObjects?: Particle[];
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
    onlayout?: (positions: number[], breakWorldY: number) => void;
    oncount: (count: number, unique: number) => void;
  } = $props();

  let viewport: HTMLDivElement;
  let camera = $state({ x: 0, y: 0, scale: 1 });
  let dragging = $state(false);
  let pointer = { x: 0, y: 0 };
  let resizeObserver: ResizeObserver | undefined;

  const sideWidth = 1420;
  const mirrorGap = 180;
  const cardWidth = 208;
  const cardHeight = 152;
  const xStart = 130;
  const columnGap = 245;
  const rowGap = 182;
  const zoneGap = 70;
  const cardTopPadding = 76;
  const standardCardTopPadding = 150;
  const zoneBottomPadding = 54;
  const technologyTop = 50;
  const zoneHeight = (rows: number, topPadding = cardTopPadding): number => topPadding + (Math.max(1, rows) - 1) * rowGap + cardHeight + zoneBottomPadding;
  const maxRow = (items: Particle[]): number => Math.max(1, ...items.map((item) => item.row));
  const worldWidth = $derived(antimatter ? sideWidth * 2 + mirrorGap : sideWidth);
  const hasBeyond = $derived(theoryParticles.length > 0);
  const hasStrings = $derived(frontierObjects.length > 0);
  const hasComposites = $derived(compositeParticles.length > 0);
  const hasForces = $derived(forceEntities.length > 0);
  const hasTechnology = $derived(technologyObjects.length > 0);
  const technologyHeight = $derived(hasTechnology ? zoneHeight(maxRow(technologyObjects)) : 0);
  const atomItems = $derived(compositeParticles.filter((particle) => particle.zone === 'atom'));
  const compositeItems = $derived(compositeParticles.filter((particle) => particle.zone === 'composite'));
  const atomHeight = $derived(atomItems.length ? zoneHeight(maxRow(atomItems)) : 0);
  const compositeHeight = $derived(compositeItems.length ? zoneHeight(maxRow(compositeItems)) : 0);
  const forcesHeight = $derived(hasForces ? zoneHeight(maxRow(forceEntities)) : 0);
  const standardHeight = zoneHeight(4, standardCardTopPadding);
  const beyondHeight = $derived(hasBeyond ? zoneHeight(maxRow(theoryParticles)) : 0);
  const planckHeight = $derived(hasStrings ? zoneHeight(maxRow(frontierObjects)) : 0);
  const atomTop = $derived(hasTechnology ? technologyTop + technologyHeight + zoneGap : 70);
  const compositeTop = $derived(atomTop + (atomHeight ? atomHeight + zoneGap : 0));
  const forcesTop = $derived(compositeTop + (compositeHeight ? compositeHeight + zoneGap : 0));
  const standardTop = $derived(forcesTop + (forcesHeight ? forcesHeight + zoneGap : 0));
  const beyondTop = $derived(standardTop + standardHeight + zoneGap);
  const planckTop = $derived(beyondTop + (hasBeyond ? beyondHeight + zoneGap : 0));
  const worldHeight = $derived(hasStrings ? planckTop + planckHeight + 40 : hasBeyond ? beyondTop + beyondHeight + 40 : standardTop + standardHeight + 40);
  const visibleNodes = $derived([
    ...technologyObjects,
    ...compositeParticles,
    ...forceEntities,
    ...particles,
    ...(showTheory ? [...theoryParticles, ...frontierObjects] : [])
  ]);
  const mirrorNodes = $derived(visibleNodes.filter((particle) => particle.family !== 'technology'));
  const selectedMirror = $derived(selectedKey.startsWith('anti:'));
  const selectedId = $derived(selectedKey.replace(/^anti:/, ''));
  const selected = $derived(visibleNodes.find((item) => item.id === selectedId));

  $effect(() => {
    oncount(visibleNodes.length + (antimatter ? mirrorNodes.length : 0), visibleNodes.length);
  });

  $effect(() => {
    const atomicBase = hasComposites ? atomTop + 105 : standardTop - 590;
    const hadronBase = hasComposites ? compositeTop + 90 : standardTop - 330;
    const elementalBase = standardTop + standardCardTopPadding + 30;
    const planckBase = hasStrings ? planckTop + 110 : worldHeight + 420;
    const positions = [
      hasTechnology ? technologyTop + technologyHeight / 2 : atomicBase - 120,
      atomicBase,
      atomicBase + 62,
      atomicBase + 124,
      atomicBase + 186,
      hadronBase,
      hadronBase + 92,
      hadronBase + 184,
      elementalBase,
      elementalBase + 155,
      elementalBase + 310,
      planckBase
    ];
    onlayout(positions, (positions[10] + positions[11]) / 2);
  });

  function keyFor(particle: Particle, mirror: boolean): string {
    return `${mirror ? 'anti:' : ''}${particle.id}`;
  }

  function positionFor(particle: Particle, mirror = false): { x: number; y: number } {
    const offset = mirror ? sideWidth + mirrorGap : 0;
    const x = offset + xStart + (particle.column - 1) * columnGap;
    if (particle.zone === 'technology') return { x, y: technologyTop + cardTopPadding + (particle.row - 1) * rowGap };
    if (particle.zone === 'atom') return { x, y: atomTop + cardTopPadding + (particle.row - 1) * rowGap };
    if (particle.zone === 'composite') return { x, y: compositeTop + cardTopPadding + (particle.row - 1) * rowGap };
    if (particle.family === 'force' || particle.zone === 'forces') return { x, y: forcesTop + cardTopPadding + (particle.row - 1) * rowGap };
    if (particle.family === 'theory' || particle.zone === 'beyond') return { x, y: beyondTop + cardTopPadding + (particle.row - 1) * rowGap };
    if (particle.family === 'string' || particle.zone === 'planck') return { x, y: planckTop + cardTopPadding + (particle.row - 1) * rowGap };
    return { x, y: standardTop + standardCardTopPadding + (particle.row - 1) * rowGap };
  }

  function boundsFor(zone: ParticleZone | 'all'): { y: number; height: number } {
    if (zone === 'technology') return { y: technologyTop, height: technologyHeight || 250 };
    if (zone === 'atom') return { y: atomTop, height: atomHeight };
    if (zone === 'composite') return { y: compositeTop, height: compositeHeight };
    if (zone === 'forces') return { y: forcesTop, height: forcesHeight };
    if (zone === 'standard') return { y: standardTop, height: standardHeight };
    if (zone === 'beyond') return { y: beyondTop, height: beyondHeight || 300 };
    if (zone === 'planck') return { y: planckTop, height: planckHeight || 300 };
    return { y: 0, height: worldHeight };
  }

  function focusZone(zone: ParticleZone | 'all' = 'standard', animated = true): void {
    if (!viewport) return;
    const bounds = boundsFor(zone);
    const rect = viewport.getBoundingClientRect();
    const rulerWidth = rect.width > 780 ? 96 : 74;
    const availableWidth = Math.max(160, rect.width - rulerWidth - 34);
    const availableHeight = rect.height - 118;
    const targetHeight = zone === 'all' ? worldHeight : Math.min(bounds.height, worldHeight - bounds.y);
    const scale = clamp(Math.min(availableWidth / worldWidth, availableHeight / targetHeight), 0.28, 1.45);
    camera = {
      scale,
      x: rulerWidth + (availableWidth - worldWidth * scale) / 2,
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
        <header class="universe-heading" style="top:12px;"><span>{mirror ? 'UNIVERSO ESPEJO' : 'ESTRUCTURA DE LA MATERIA'}</span><strong>{mirror ? 'antimateria y equivalentes autoconjugados' : 'de lo compuesto a lo elemental'}</strong></header>

        {#if hasTechnology && !mirror}<div class="zone-panel technology-zone" style={`top:${technologyTop}px;height:${technologyHeight}px;`}><span class="zone-scale">≈10⁻⁹–10⁻¹⁰ m</span><b>REFERENCIAS TECNOLÓGICAS</b><small>dispositivos experimentales para comparar escalas; no son partículas</small></div>{/if}
        {#if hasComposites}<div class="zone-panel atom-zone" style={`top:${atomTop}px;height:${atomHeight}px;`}><span class="zone-scale">≈10⁻¹⁰ m</span><b>ÁTOMO</b><small>estructura didáctica general: protones, neutrones y electrones</small></div>{/if}
        {#if hasComposites}<div class="zone-panel composite-zone" style={`top:${compositeTop}px;height:${compositeHeight}px;`}><span class="zone-scale">≈10⁻¹⁴–10⁻¹⁵ m</span><b>NÚCLEOS, NUCLEONES Y HADRONES</b><small>bariones, mesones y familias exóticas ligadas por la interacción fuerte</small></div>{/if}
        {#if hasForces}<div class="zone-panel forces-zone" style={`top:${forcesTop}px;height:${forcesHeight}px;`}><span class="zone-scale">CAMPO / ALCANCE</span><b>LAS CUATRO INTERACCIONES FUNDAMENTALES</b><small>tres dentro del Modelo Estándar; gravedad fuera de él</small></div>{/if}
        <div class="zone-panel standard-zone" style={`top:${standardTop}px;height:${standardHeight}px;`}><span class="zone-scale">&lt;10⁻¹⁹ m</span><b>MODELO ESTÁNDAR · PARTÍCULAS ELEMENTALES</b><small>sin estructura interna observada</small></div>

        <div class="world-heading matter-heading" style={`top:${standardTop + 54}px;`}><span>PARTÍCULAS DE MATERIA</span><strong>fermiones · spin ½</strong></div>
        <div class="world-heading force-heading" style={`top:${standardTop + 54}px;`}><span>MEDIADORES</span><strong>bosones gauge · spin 1</strong></div>
        <div class="generation-label g1" style={`top:${standardTop + 96}px;`}><small>GENERACIÓN</small><b>I</b><span>materia estable</span></div>
        <div class="generation-label g2" style={`top:${standardTop + 96}px;`}><small>GENERACIÓN</small><b>II</b><span>más pesada</span></div>
        <div class="generation-label g3" style={`top:${standardTop + 96}px;`}><small>GENERACIÓN</small><b>III</b><span>muy masiva</span></div>
        <div class="family-label quarks" style={`top:${standardTop + 272}px;`}>QUARKS</div><div class="family-label leptons" style={`top:${standardTop + 637}px;`}>LEPTONES</div><div class="family-label gauge" style={`top:${standardTop + 300}px;`}>FUERZAS</div><div class="family-label scalar" style={`top:${standardTop + 390}px;`}>CAMPO</div>

        {#if hasBeyond}
          <div class="zone-panel beyond-zone" style={`top:${beyondTop}px;height:${beyondHeight}px;`}><span class="zone-scale">NO OBSERVADO</span><b>MÁS ALLÁ DEL MODELO ESTÁNDAR</b><small>supersimetría, sectores oscuros, búsquedas de colisionadores y gravedad cuántica</small></div>
        {/if}
        {#if hasStrings}
          <div class="zone-panel planck-zone" style={`top:${planckTop}px;height:${planckHeight}px;`}><span class="zone-scale">ℓₚ = 1,616255 × 10⁻³⁵ m</span><b>FRONTERA DE PLANCK</b><small>cuerdas, branas y teoría M · marcos teóricos</small></div>
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
        {#if antimatter && selected.family !== 'technology'}
          {@const origin = positionFor(selected, selectedMirror)}
          {@const counterpart = positionFor(selected, !selectedMirror)}
          <path class="mirror-link" d={`M ${origin.x + cardWidth / 2} ${origin.y + cardHeight / 2} C ${sideWidth + mirrorGap / 2} ${origin.y - 70}, ${sideWidth + mirrorGap / 2} ${counterpart.y - 70}, ${counterpart.x + cardWidth / 2} ${counterpart.y + cardHeight / 2}`} />
        {/if}
      </svg>
    {/if}

    {#each antimatter ? [false, true] : [false] as mirror}
      {#each mirror ? mirrorNodes : visibleNodes as particle (keyFor(particle, mirror))}
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
