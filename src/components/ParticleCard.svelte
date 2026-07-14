<script lang="ts">
  import { Atom, CircleGauge, Sparkles } from '@lucide/svelte';
  import type { Particle } from '../data/types';
  import { interactionLabels } from '../data/particles';
  import NodeVisual from './NodeVisual.svelte';

  let {
    particle,
    zoom = 1,
    selected = false,
    dimmed = false,
    related = false,
    constituent = false,
    antimatter = false,
    onselect
  }: {
    particle: Particle;
    zoom?: number;
    selected?: boolean;
    dimmed?: boolean;
    related?: boolean;
    constituent?: boolean;
    antimatter?: boolean;
    onselect: (particle: Particle) => void;
  } = $props();

  const visibleSymbol = $derived(antimatter && !particle.selfConjugate ? particle.antiparticle : particle.symbol);
  const visibleName = $derived(antimatter && !particle.selfConjugate ? particle.antiparticleName : particle.name);
  const detailLevel = $derived(zoom < 0.95 ? 0 : zoom < 1.35 ? 1 : zoom < 1.9 ? 2 : 3);
  const symbolWide = $derived(visibleSymbol.length > 1);
</script>

<button
  type="button"
  class:selected
  class:dimmed
  class:related
  class:constituent
  class:antimatter-card={antimatter}
  class:theory={particle.family === 'theory'}
  class={`particle-card family-${particle.family}`}
  style={`--card-accent: var(--${particle.family});`}
  aria-label={`Abrir ficha de ${visibleName}`}
  aria-pressed={selected}
  onclick={() => onselect(particle)}
>
  <span class="card-topline">
    <span>{particle.evidence === 'observed' ? particle.discovered.split('·')[0].trim() : 'NO OBSERVADA'}</span>
    <span class="family-dot">{#if particle.family === 'force'}<CircleGauge size={12} strokeWidth={1.8}/>{:else}<Atom size={12} strokeWidth={1.8} />{/if}</span>
  </span>

  {#if particle.visual}<NodeVisual type={particle.visual}/>{/if}
  <span class={`particle-symbol${symbolWide ? ' symbol-wide' : ''}`}>{visibleSymbol}</span>
  <span class="particle-name">{visibleName}</span>

  {#if detailLevel >= 1}
    <span class="quick-stats">
      {#if particle.family === 'force'}
        <span><small>alcance</small>{particle.scale}</span>
        <span><small>campo</small>{particle.constituents?.length ?? 0}</span>
        <span><small>estado</small>{particle.id === 'gravity-force' ? 'fuera SM' : 'SM'}</span>
      {:else}
        <span><small>masa</small>{particle.mass}</span>
        <span><small>carga</small>{particle.charge}</span>
        <span><small>spin</small>{particle.spin}</span>
      {/if}
    </span>
  {/if}

  {#if detailLevel >= 2 && particle.family !== 'force'}
    <span class="interaction-row">
      {#each particle.interactions as interaction}
        <i class={`interaction-chip interaction-${interaction}`} title={interactionLabels[interaction]}>{interactionLabels[interaction][0].toUpperCase()}</i>
      {/each}
    </span>
  {/if}

  {#if particle.evidence === 'hypothetical'}
    <span class="theory-mark"><Sparkles size={12} /> hipótesis</span>
  {:else if antimatter}
    <span class="theory-mark antimatter-mark">{particle.selfConjugate ? 'autoconjugada' : 'antimateria'}</span>
  {/if}
</button>
