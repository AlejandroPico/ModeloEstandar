<script lang="ts">
  import { ArrowRight, Box, CircleDot, Info, X } from '@lucide/svelte';
  let { onclose }: { onclose: () => void } = $props();
  let active = $state(0);
  const steps = [
    { scale: '10⁻¹⁰ m', title: 'Átomo', subtitle: 'Nube electrónica + núcleo', text: 'Un átomo no es una bolita maciza. Casi todo su volumen corresponde a la distribución cuántica de electrones.' },
    { scale: '10⁻¹⁴ m', title: 'Núcleo', subtitle: 'Protones + neutrones', text: 'El núcleo concentra casi toda la masa del átomo, aunque ocupa una fracción diminuta de su tamaño.' },
    { scale: '10⁻¹⁵ m', title: 'Nucleón', subtitle: 'Protón o neutrón', text: 'Protones y neutrones no son elementales: contienen quarks, antiquarks y gluones en un estado dinámico.' },
    { scale: '<10⁻¹⁹ m', title: 'Elementales', subtitle: 'Quarks, leptones y campos', text: 'Aquí comienza el territorio confirmado del Modelo Estándar: no se ha observado estructura interna en estas partículas.' },
    { scale: 'desconocida', title: 'Más allá', subtitle: 'Hipótesis y nuevas simetrías', text: 'Supersimetría, axiones o sectores oscuros amplían la teoría, pero ninguna de sus nuevas partículas ha sido confirmada.' },
    { scale: '1,616 × 10⁻³⁵ m', title: 'Planck', subtitle: 'Cuerdas, branas y gravedad cuántica', text: 'La longitud de Planck marca una frontera natural para nuestras teorías actuales. No prueba que existan cuerdas ni que posean exactamente ese tamaño.' }
  ];
</script>

<div class="modal-backdrop" role="presentation" onclick={(event) => event.target === event.currentTarget && onclose()}>
  <div class="scale-modal" role="dialog" aria-modal="true" aria-label="Del átomo al Modelo Estándar">
    <header>
      <div><span class="eyebrow">RUTA DE ESCALA</span><h2>Del átomo a la frontera de Planck</h2><p>Seis paradas para separar lo observado de lo hipotético.</p></div>
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
