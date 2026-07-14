<script lang="ts">
  import { RotateCcw, Search, X } from '@lucide/svelte';
  import type { Interaction, ParticleFamily } from '../data/types';

  let {
    query, family, interaction, mode = 'all', onquery, onfamily, oninteraction, onreset, onclose
  }: {
    query: string;
    family: ParticleFamily | 'all';
    interaction: Interaction | 'all';
    mode?: 'all' | 'search' | 'filter';
    onquery: (value: string) => void;
    onfamily: (value: ParticleFamily | 'all') => void;
    oninteraction: (value: Interaction | 'all') => void;
    onreset: () => void;
    onclose: () => void;
  } = $props();
</script>

<aside class="filter-panel" aria-label="Filtros de partículas">
  <header><div><span class="eyebrow">EXPLORAR</span><h2>{mode === 'search' ? 'Buscar en el atlas' : 'Filtrar el modelo'}</h2></div><button class="icon-button" type="button" aria-label="Cerrar filtros" onclick={onclose}><X size={18}/></button></header>
  {#if mode !== 'filter'}<label class="search-field"><Search size={16}/><input value={query} oninput={(e) => onquery(e.currentTarget.value)} placeholder="electrón, spin, 1983…" /></label>{/if}
  {#if mode !== 'search'}<fieldset><legend>Familia</legend><div class="choice-grid">
    {#each [['all','Todas'],['composite','Compuestas'],['force','Interacciones'],['quark','Quarks'],['lepton','Leptones'],['gauge','Bosones gauge'],['scalar','Higgs'],['theory','Hipotéticas'],['string','Cuerdas y branas']] as option}
      <button class:active={family === option[0]} type="button" onclick={() => onfamily(option[0] as ParticleFamily | 'all')}>{option[1]}</button>
    {/each}
  </div></fieldset>
  <fieldset><legend>Interacción</legend><div class="choice-grid forces">
    {#each [['all','Todas'],['strong','Fuerte'],['electromagnetic','Electromagnética'],['weak','Débil'],['higgs','Higgs'],['gravity','Gravedad']] as option}
      <button class:active={interaction === option[0]} type="button" onclick={() => oninteraction(option[0] as Interaction | 'all')}>{option[1]}</button>
    {/each}
  </div></fieldset>
  <button class="reset-filter" type="button" onclick={onreset}><RotateCcw size={15}/> Restablecer filtros</button>{/if}
</aside>
