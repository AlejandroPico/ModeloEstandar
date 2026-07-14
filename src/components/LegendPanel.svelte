<script lang="ts">
  import { X } from '@lucide/svelte';
  let { onclose }: { onclose: () => void } = $props();
  const families = [
    ['composite','Estructuras compuestas','Átomos, núcleos y hadrones'], ['force','Interacciones','Las cuatro fuerzas fundamentales'],
    ['quark','Quarks','Fermiones con carga de color'], ['lepton','Leptones','Electrón, muón, tau y neutrinos'],
    ['gauge','Bosones gauge','Mediadores de las interacciones'], ['scalar','Higgs','Sector escalar'],
    ['theory','Hipótesis','Predicciones no observadas'], ['string','Cuerdas y branas','Objetos extendidos teóricos'],
    ['technology','Referencia tecnológica','Comparación de escala; no es una partícula']
  ];
</script>

<aside class="hud-panel legend-drawer" aria-label="Leyenda científica">
  <header><div><span class="eyebrow">LEYENDA</span><h2>Cómo leer el atlas</h2></div><button class="icon-button" type="button" aria-label="Cerrar leyenda" onclick={onclose}><X size={18}/></button></header>
  <div class="legend-list">
    {#each families as family}
      <div><i style={`--legend-color:var(--${family[0]})`}></i><span><b>{family[1]}</b><small>{family[2]}</small></span></div>
    {/each}
  </div>
  <dl class="legend-keys">
    <div><dt>Borde continuo</dt><dd>Observado o interacción confirmada</dd></div>
    <div><dt>Borde discontinuo</dt><dd>Hipótesis sin detección</dd></div>
    <div><dt>Flecha turquesa</dt><dd>Composición o relación estructural</dd></div>
    <div><dt>Escala vertical</dt><dd>Orden de magnitud, no tamaño gráfico real</dd></div>
  </dl>
</aside>
