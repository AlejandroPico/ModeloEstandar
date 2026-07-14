<script lang="ts">
  import { Braces, ChevronRight, ExternalLink, Search, X } from '@lucide/svelte';
  import FormulaBlock from './FormulaBlock.svelte';
  import { formulaChapters, formulaGroups } from '../data/formulae';

  let { onclose }: { onclose: () => void } = $props();
  let activeId = $state(formulaChapters[0].id);
  let query = $state('');
  const active = $derived(formulaChapters.find((chapter) => chapter.id === activeId) ?? formulaChapters[0]);
  const visible = $derived(formulaChapters.filter((chapter) => {
    const needle = query.trim().toLocaleLowerCase('es');
    return !needle || `${chapter.label} ${chapter.title} ${chapter.group} ${chapter.formula} ${chapter.meaning} ${chapter.symbols} ${chapter.use}`.toLocaleLowerCase('es').includes(needle);
  }));
  const groups = $derived(formulaGroups.map((group) => ({ group, chapters: visible.filter((chapter) => chapter.group === group) })).filter((item) => item.chapters.length));
</script>

<div class="modal-backdrop" role="presentation" onclick={(event) => event.target === event.currentTarget && onclose()}>
  <div class="formula-library-modal" role="dialog" aria-modal="true" aria-label="Atlas matemático del Modelo Estándar">
    <header class="formula-library-header"><div><Braces size={22}/><span><small>ATLAS MATEMÁTICO</small><h2>Fórmulas de partículas, campos e interacciones</h2><p>{formulaChapters.length} capítulos, desde cinemática relativista hasta gravedad y cuerdas.</p></span></div><button class="icon-button" type="button" aria-label="Cerrar fórmulas" onclick={onclose}><X size={20}/></button></header>
    <div class="formula-library-layout">
      <aside class="formula-library-index"><label><Search size={15}/><input bind:value={query} placeholder="Buscar QCD, Higgs, mezcla, Planck…"/></label><nav>{#each groups as entry}<span>{entry.group}</span>{#each entry.chapters as chapter}<button class:active={active.id === chapter.id} type="button" onclick={() => { activeId = chapter.id; document.querySelector('.formula-library-reader')?.scrollTo({top:0,behavior:'smooth'}); }}><span><b>{chapter.label}</b><small>{chapter.title}</small></span><ChevronRight size={14}/></button>{/each}{/each}</nav><footer>{visible.length} fórmulas en el índice</footer></aside>
      <article class="formula-library-reader">
        <header><span>{active.group}</span><h2>{active.label}</h2><p>{active.title}</p></header>
        <FormulaBlock formula={active.formula} label="Expresión de referencia"/>
        <div class="formula-report-grid">
          <section><small>01 · SIGNIFICADO</small><h3>Qué expresa</h3><p>{active.meaning}</p></section>
          <section><small>02 · NOTACIÓN</small><h3>Símbolos y magnitudes</h3><p>{active.symbols}</p></section>
          <section><small>03 · APLICACIÓN</small><h3>Cómo se utiliza</h3><p>{active.use}</p></section>
          <section><small>04 · ORIGEN</small><h3>De dónde procede</h3><p>{active.derivation}</p></section>
          <section><small>05 · LÍMITES</small><h3>Qué no debe inferirse</h3><p>{active.limits}</p></section>
        </div>
        <section class="formula-related"><small>CONEXIONES MATEMÁTICAS</small><h3>Continuar por</h3><div>{#each active.related as id}{#if formulaChapters.find((chapter) => chapter.id === id)}<button type="button" onclick={() => activeId = id}>{formulaChapters.find((chapter) => chapter.id === id)?.label}</button>{/if}{/each}</div></section>
        <section class="formula-references"><small>REFERENCIAS</small><div>{#each active.sources as source}<a href={source.url} target="_blank" rel="noreferrer"><span>{source.label}</span><ExternalLink size={14}/></a>{/each}</div></section>
      </article>
    </div>
  </div>
</div>

