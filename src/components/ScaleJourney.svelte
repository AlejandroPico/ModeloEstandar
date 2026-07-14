<script lang="ts">
  import { ArrowRight, Box, CircleDot, Info, X } from '@lucide/svelte';
  import { scalePoints } from '../data/science';
  let { onclose }: { onclose: () => void } = $props();
  let active = $state(0);
  const steps = scalePoints.map((point) => ({ scale: `${point.exponent} m`, title: point.title, subtitle: point.kind === 'object' ? 'Estructura o alcance característico' : point.kind === 'limit' ? 'Límite físico o experimental' : 'Intervalo de transición', text: point.description }));
</script>

<div class="modal-backdrop" role="presentation" onclick={(event) => event.target === event.currentTarget && onclose()}>
  <div class="scale-modal" role="dialog" aria-modal="true" aria-label="Del átomo al Modelo Estándar">
    <header>
      <div><span class="eyebrow">RUTA DE ESCALA</span><h2>Del átomo a la frontera de Planck</h2><p>Once órdenes señalados, incluidos los intervalos sin una nueva estructura universal.</p></div>
      <button class="icon-button" type="button" aria-label="Cerrar" onclick={onclose}><X size={19} /></button>
    </header>
    <div class="scale-visual">
      <div class={`scale-object step-${active}`}>
        <div class="atom-core"><CircleDot size={44} /></div>
        <span class="orbit orbit-a"></span><span class="orbit orbit-b"></span><span class="orbit orbit-c"></span>
      </div>
      <div class="scale-reading"><b>{steps[active].scale}</b><span>escala característica aproximada</span></div>
    </div>
    <div class="scale-track">
      {#each steps as step, index}
        <button class:active={active === index} class:passed={active > index} type="button" onclick={() => active = index}>
          <span>{index + 1}</span><b>{step.title}</b><small>{step.scale}</small>
        </button>
        {#if index < steps.length - 1}<ArrowRight size={16} />{/if}
      {/each}
    </div>
    <article class="scale-explanation">
      <span><Box size={17} /> {steps[active].subtitle}</span>
      <h3>{steps[active].title}</h3><p>{steps[active].text}</p>
    </article>
    <aside class="scale-warning"><Info size={16} /><p>Las ilustraciones amplían cada nivel por separado: los tamaños no caben a escala real en una sola pantalla.</p></aside>
  </div>
</div>
