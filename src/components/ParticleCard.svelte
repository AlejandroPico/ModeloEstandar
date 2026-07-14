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
  const detailLevel = $derived(zoom < 1.38 ? 0 : zoom < 1.72 ? 1 : zoom < 2.15 ? 2 : 3);
  const symbolWide = $derived(visibleSymbol.length > 1);
  const statusLabel = $derived(
    antimatter && !particle.selfConjugate
      ? 'ANTIMATERIA'
      : particle.evidence === 'hypothetical'
        ? 'HIPÓTESIS'
        : particle.family === 'force'
          ? 'INTERACCIÓN'
          : 'OBSERVADA'
  );
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
    <span>{statusLabel}</span>
    <span class="family-dot">{#if particle.family === 'force'}<CircleGauge size={12} strokeWidth={1.8}/>{:else}<Atom size={12} strokeWidth={1.8} />{/if}</span>
  </span>

  {#if particle.visual}<NodeVisual type={particle.visual}/>{/if}
  <span class="particle-name">{visibleName}</span>
  <span class={`particle-symbol${symbolWide ? ' symbol-wide' : ''}`}>{visibleSymbol}</span>

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

  {#if detailLevel >= 3 && particle.evidence === 'hypothetical'}
    <span class="card-certainty"><Sparkles size={11}/> no observada</span>
  {:else if detailLevel >= 3 && antimatter && particle.selfConjugate}
    <span class="card-certainty antimatter-mark">autoconjugada</span>
  {/if}
</button>
