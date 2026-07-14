<script lang="ts">
  import { onMount } from 'svelte';
  import type { Particle, Interaction } from '../data/types';
  import ParticleCard from './ParticleCard.svelte';
  import { clamp } from '../lib/format';

  let {
    particles,
    theoryParticles = [],
    showTheory = false,
    antimatter = false,
    selectedId = '',
    matches = new Set<string>(),
    filtering = false,
    onselect,
    onzoom
  }: {
    particles: Particle[];
    theoryParticles?: Particle[];
    showTheory?: boolean;
    antimatter?: boolean;
    selectedId?: string;
    matches?: Set<string>;
    filtering?: boolean;
    onselect: (particle: Particle) => void;
    onzoom: (percent: number) => void;
  } = $props();

  let viewport: HTMLDivElement;
  let camera = $state({ x: 0, y: 0, scale: 1 });
  let dragging = $state(false);
  let moved = $state(false);
  let pointer = { x: 0, y: 0 };
  let resizeObserver: ResizeObserver | undefined;

  const worldWidth = 1080;
  const worldHeight = $derived(showTheory ? 970 : 710);
  const selected = $derived(particles.find((item) => item.id === selectedId));

  const positions = new Map<string, { x: number; y: number }>();
  function positionFor(particle: Particle): { x: number; y: number } {
    if (particle.family === 'theory') return { x: 52 + (particle.column - 1) * 202, y: 794 };
    return { x: 52 + (particle.column - 1) * 202, y: 112 + (particle.row - 1) * 142 };
  }

  function fit(animated = true): void {
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    const scale = clamp(Math.min((rect.width - 56) / worldWidth, (rect.height - 54) / worldHeight), 0.42, 1.2);
    camera = {
      scale,
      x: (rect.width - worldWidth * scale) / 2,
      y: (rect.height - worldHeight * scale) / 2
    };
    if (animated) viewport.dataset.animating = 'true';
    window.setTimeout(() => viewport?.removeAttribute('data-animating'), 380);
    onzoom(Math.round(scale * 100));
  }

  function zoomAt(clientX: number, clientY: number, factor: number): void {
    const rect = viewport.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const next = clamp(camera.scale * factor, 0.42, 2.65);
    const worldX = (px - camera.x) / camera.scale;
    const worldY = (py - camera.y) / camera.scale;
    camera = { scale: next, x: px - worldX * next, y: py - worldY * next };
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
    moved = false;
    pointer = { x: event.clientX, y: event.clientY };
    viewport.setPointerCapture(event.pointerId);
  }

  function pointerMove(event: PointerEvent): void {
    if (!dragging) return;
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    if (Math.abs(dx) + Math.abs(dy) > 2) moved = true;
    camera = { ...camera, x: camera.x + dx, y: camera.y + dy };
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
    if (interactions.includes('strong')) ids.add('gluon');
    if (interactions.includes('electromagnetic')) ids.add('photon');
    if (interactions.includes('weak')) { ids.add('z-boson'); ids.add('w-boson'); }
    if (interactions.includes('higgs')) ids.add('higgs');
    return particles.filter((item) => ids.has(item.id) && item.id !== selectedId);
  }

  onMount(() => {
    for (const particle of [...particles, ...theoryParticles]) positions.set(particle.id, positionFor(particle));
    resizeObserver = new ResizeObserver(() => fit(false));
    resizeObserver.observe(viewport);
    requestAnimationFrame(() => fit(false));
    return () => resizeObserver?.disconnect();
  });

  export { fit as resetView, zoomIn, zoomOut };
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
  ondblclick={(event) => { if (event.target === viewport) fit(); }}
  role="application"
  aria-label="Lienzo ampliable del Modelo Estándar. Usa la rueda para ampliar y arrastra el fondo para desplazarte."
>
  <div class="particle-world" style={`width:${worldWidth}px;height:${worldHeight}px;transform:translate3d(${camera.x}px,${camera.y}px,0) scale(${camera.scale});`}>
    <div class="world-heading matter-heading">
      <span>PARTÍCULAS DE MATERIA</span>
      <strong>fermiones · spin ½</strong>
    </div>
    <div class="world-heading force-heading">
      <span>MEDIADORES</span>
      <strong>bosones gauge · spin 1</strong>
    </div>
    <div class="generation-label g1"><small>GENERACIÓN</small><b>I</b><span>materia estable</span></div>
    <div class="generation-label g2"><small>GENERACIÓN</small><b>II</b><span>más pesada</span></div>
    <div class="generation-label g3"><small>GENERACIÓN</small><b>III</b><span>muy masiva</span></div>
    <div class="family-label quarks">QUARKS</div>
    <div class="family-label leptons">LEPTONES</div>
    <div class="family-label gauge">FUERZAS</div>
    <div class="family-label scalar">CAMPO</div>

    {#if selected}
      <svg class="interaction-lines" viewBox={`0 0 ${worldWidth} ${worldHeight}`} aria-hidden="true">
        {#each forceTargets(selected.interactions) as target}
          {@const from = positionFor(selected)}
          {@const to = positionFor(target)}
          <path d={`M ${from.x + 82} ${from.y + 60} C ${(from.x + to.x) / 2 + 82} ${from.y + 60}, ${(from.x + to.x) / 2 + 82} ${to.y + 60}, ${to.x + 82} ${to.y + 60}`} />
        {/each}
      </svg>
    {/if}

    {#each particles as particle (particle.id)}
      {@const position = positionFor(particle)}
      <div class="card-position" style={`left:${position.x}px;top:${position.y}px;`}>
        <ParticleCard
          {particle}
          zoom={camera.scale}
          selected={particle.id === selectedId}
          dimmed={filtering && !matches.has(particle.id)}
          {antimatter}
          {onselect}
        />
      </div>
    {/each}

    {#if showTheory}
      <section class="theory-zone" aria-label="Partículas hipotéticas">
        <span class="theory-zone-kicker">FUERA DEL MODELO ESTÁNDAR</span>
        <strong>Territorio hipotético</strong>
        <p>Ideas con motivación teórica, pero sin detección confirmada.</p>
      </section>
      {#each theoryParticles as particle (particle.id)}
        {@const position = positionFor(particle)}
        <div class="card-position" style={`left:${position.x}px;top:${position.y}px;`}>
          <ParticleCard {particle} zoom={camera.scale} selected={particle.id === selectedId} {antimatter} {onselect} />
        </div>
      {/each}
    {/if}
  </div>

  <div class="viewport-help" aria-hidden="true">rueda para ampliar · arrastra para recorrer · doble clic para encajar</div>
</div>
