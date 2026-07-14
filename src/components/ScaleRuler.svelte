<script lang="ts">
  import { ChevronRight, Ruler } from '@lucide/svelte';
  import { scalePoints } from '../data/science';
  import type { ParticleZone } from '../data/types';

  let { onfocus }: { onfocus: (zone: ParticleZone | 'all') => void } = $props();

  function zoneFor(exponent: string): ParticleZone {
    if (['10⁻¹⁰', '10⁻¹¹', '10⁻¹²', '10⁻¹³'].includes(exponent)) return 'atom';
    if (['10⁻¹⁴', '10⁻¹⁵', '10⁻¹⁶'].includes(exponent)) return 'composite';
    if (['10⁻¹⁷', '10⁻¹⁸', '10⁻¹⁹'].includes(exponent)) return 'standard';
    return 'planck';
  }
</script>

<aside class="fixed-scale-ruler" aria-label="Regla permanente de escalas físicas">
  <header>
    <span class="scale-ruler-icon"><Ruler size={17}/></span>
    <div><small>ESCALA DE LONGITUD</small><strong>Del átomo a Planck</strong></div>
  </header>
  <div class="scale-ruler-list">
    {#each scalePoints as point}
      <button class={`kind-${point.kind}`} type="button" onclick={() => onfocus(zoneFor(point.exponent))} aria-label={`Centrar ${point.title}`}>
        <span class="ruler-value"><b>{point.exponent}</b><small>m</small></span>
        <span class="ruler-copy"><strong>{point.title}</strong><small>{point.metres} · {point.description}</small></span>
        <ChevronRight size={13}/>
      </button>
      {#if point.exponent === '10⁻¹⁹'}
        <div class="scale-break" aria-label="Intervalo no representado entre diez a la menos diecinueve y la longitud de Planck"><i></i><span>salto teórico · 16 órdenes</span><i></i></div>
      {/if}
    {/each}
  </div>
  <footer><i></i><span>objeto o estructura</span><i></i><span>transición</span><i></i><span>límite</span></footer>
</aside>
