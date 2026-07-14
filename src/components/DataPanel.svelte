<script lang="ts">
  import { Database, X } from '@lucide/svelte';
  let { displayed, unique, observed, hypothetical, antimatter, onclose }: { displayed: number; unique: number; observed: number; hypothetical: number; antimatter: boolean; onclose: () => void } = $props();
</script>

<aside class="hud-panel data-panel" aria-label="Datos del lienzo">
  <header><div><span class="eyebrow">DATOS</span><h2>Estado de la visualización</h2></div><button class="icon-button" type="button" aria-label="Cerrar datos" onclick={onclose}><X size={18}/></button></header>
  <div class="data-metrics">
    <article><span>{displayed}</span><b>fichas dibujadas</b><small>incluye el espejo</small></article>
    <article><span>{unique}</span><b>entidades distintas</b><small>antes de duplicar</small></article>
    <article><span>{observed}</span><b>confirmadas</b><small>partículas, compuestos o fuerzas</small></article>
    <article><span>{hypothetical}</span><b>hipotéticas</b><small>sin detección confirmada</small></article>
  </div>
  <footer><Database size={15}/><span>{antimatter ? 'El espejo está activo y replica todas las capas visibles.' : 'El universo espejo está plegado.'}</span></footer>
</aside>
