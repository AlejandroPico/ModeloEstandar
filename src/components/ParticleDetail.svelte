<script lang="ts">
  import { BookOpen, ExternalLink, FlaskConical, Network, Scale, X } from '@lucide/svelte';
  import type { Particle } from '../data/types';
  import { interactionLabels } from '../data/particles';
  import FormulaBlock from './FormulaBlock.svelte';

  let { particle, antimatter = false, onclose }: { particle: Particle; antimatter?: boolean; onclose: () => void } = $props();
  let tab = $state<'summary' | 'properties' | 'interactions' | 'formula' | 'sources'>('summary');
  const visibleSymbol = $derived(antimatter && !particle.selfConjugate ? particle.antiparticle : particle.symbol);
  const visibleName = $derived(antimatter && !particle.selfConjugate ? particle.antiparticleName : particle.name);
  const tabs = [
    { id: 'summary', label: 'Resumen', icon: BookOpen },
    { id: 'properties', label: 'Propiedades', icon: Scale },
    { id: 'interactions', label: 'Interacciones', icon: Network },
    { id: 'formula', label: 'Fórmula', icon: FlaskConical },
    { id: 'sources', label: 'Fuentes', icon: ExternalLink }
  ] as const;
</script>

<aside class={`detail-panel family-${particle.family}`} aria-label={`Ficha científica de ${visibleName}`}>
  <header class="detail-header">
    <div class="detail-identity">
      <span class="detail-symbol">{visibleSymbol}</span>
      <div>
        <span class="eyebrow">{particle.evidence === 'observed' ? 'PARTÍCULA OBSERVADA' : 'HIPÓTESIS · NO OBSERVADA'}</span>
        <h2>{visibleName}</h2>
        <p>{particle.englishName}</p>
      </div>
    </div>
    <button class="icon-button" type="button" aria-label="Cerrar ficha" title="Cerrar" onclick={onclose}><X size={19} /></button>
  </header>

  <nav class="detail-tabs" aria-label="Secciones de la ficha">
    {#each tabs as item}
      <button class:active={tab === item.id} type="button" onclick={() => tab = item.id}>
        <item.icon size={14} /> <span>{item.label}</span>
      </button>
    {/each}
  </nav>

  <div class="detail-content">
    {#if tab === 'summary'}
      <section class="detail-section summary-section">
        <p class="detail-lead">{particle.summary}</p>
        <div class="hero-metrics">
          <div><span>Masa</span><strong>{particle.mass}</strong></div>
          <div><span>Carga eléctrica</span><strong>{particle.charge}</strong></div>
          <div><span>Spin</span><strong>{particle.spin}</strong></div>
        </div>
        <article><h3>¿Qué es?</h3><p>{particle.composition}</p></article>
        <article><h3>Por qué importa</h3><p>{particle.role}</p></article>
        {#if particle.note}<aside class="science-note"><b>Matiz importante</b><p>{particle.note}</p></aside>{/if}
      </section>
    {:else if tab === 'properties'}
      <section class="detail-section">
        <dl class="property-list">
          <div><dt>Familia</dt><dd>{particle.family}</dd></div>
          {#if particle.generation}<div><dt>Generación</dt><dd>{particle.generation}</dd></div>{/if}
          <div><dt>Masa</dt><dd>{particle.mass}</dd></div>
          <div><dt>Carga</dt><dd>{particle.charge}</dd></div>
          <div><dt>Spin</dt><dd>{particle.spin}</dd></div>
          <div><dt>Vida media / estado</dt><dd>{particle.lifetime}</dd></div>
          <div><dt>Antipartícula</dt><dd>{particle.selfConjugate ? 'Es su propia antipartícula' : `${particle.antiparticle} · ${particle.antiparticleName}`}</dd></div>
          <div><dt>Observación</dt><dd>{particle.discovered}</dd></div>
          <div><dt>Carga de color</dt><dd>{particle.colorCharge ? 'Sí' : 'No'}</dd></div>
        </dl>
      </section>
    {:else if tab === 'interactions'}
      <section class="detail-section">
        <p class="section-intro">Una partícula solo responde a las interacciones asociadas a sus números cuánticos.</p>
        <div class="interaction-detail-grid">
          {#each ['strong', 'electromagnetic', 'weak', 'higgs', 'gravity'] as interaction}
            <article class:active={particle.interactions.includes(interaction as never)}>
              <span class={`force-orb interaction-${interaction}`}></span>
              <div><h3>{interactionLabels[interaction as keyof typeof interactionLabels]}</h3><p>{particle.interactions.includes(interaction as never) ? 'Participa en esta interacción.' : 'No participa directamente.'}</p></div>
            </article>
          {/each}
        </div>
        <article class="decay-card"><h3>Decaimiento o comportamiento</h3><p>{particle.decays}</p></article>
      </section>
    {:else if tab === 'formula'}
      <section class="detail-section">
        <p class="section-intro">Una relación útil vinculada con esta partícula. La fórmula es una puerta de entrada, no una definición completa.</p>
        <FormulaBlock formula={particle.formula} />
        <article class="notation-card"><h3>Lectura técnica</h3><p>Las magnitudes se expresan habitualmente en electronvoltios y unidades naturales, donde <em>c = ℏ = 1</em>. La ficha conserva <em>c²</em> en las masas para facilitar la lectura inicial.</p></article>
      </section>
    {:else}
      <section class="detail-section">
        <p class="section-intro">Valores de referencia redondeados para divulgación. Las cifras de precisión deben consultarse con su incertidumbre y esquema de medida.</p>
        <div class="source-list">
          {#each particle.sources as source}
            <a href={source.url} target="_blank" rel="noreferrer"><span>{source.label}</span><ExternalLink size={15} /></a>
          {/each}
        </div>
        <div class="source-method"><span>CRITERIO</span><p>“Observada” significa que existe evidencia experimental aceptada. “Hipotética” indica una predicción o candidato sin detección confirmada.</p></div>
      </section>
    {/if}
  </div>
</aside>
