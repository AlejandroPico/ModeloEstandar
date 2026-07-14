<script lang="ts">
  import { BookOpenText, ChevronRight, ExternalLink, Search, X } from '@lucide/svelte';
  import { informationChapters, informationStats } from '../data/information';
  import FormulaBlock from './FormulaBlock.svelte';

  let { onclose }: { onclose: () => void } = $props();
  let activeId = $state(informationChapters[0].id);
  let query = $state('');
  const active = $derived(informationChapters.find((chapter) => chapter.id === activeId) ?? informationChapters[0]);
  const navigation = $derived(informationChapters.filter((chapter) => {
    const needle = query.trim().toLocaleLowerCase('es').normalize('NFD').replace(/\p{Diacritic}/gu, '');
    const haystack = `${chapter.title} ${chapter.subtitle} ${chapter.group} ${chapter.formula ?? ''} ${chapter.sections.map((section) => `${section.title} ${section.text}`).join(' ')}`.toLocaleLowerCase('es').normalize('NFD').replace(/\p{Diacritic}/gu, '');
    return !needle || haystack.includes(needle);
  }));
  const groupOrder = ['Fundamentos', 'Partículas elementales', 'Interacciones', 'Materia compuesta', 'Hipótesis y candidatos', 'Cuerdas y branas', 'Antimateria'];
  const groupedNavigation = $derived(groupOrder.map((group) => ({ group, chapters: navigation.filter((chapter) => chapter.group === group) })).filter((entry) => entry.chapters.length));
  const activeNumber = $derived(informationChapters.findIndex((chapter) => chapter.id === active.id) + 1);

  function openChapter(id: string): void {
    activeId = id;
    document.querySelector('.manual-reader')?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function nextChapter(): void {
    activeId = informationChapters[activeNumber % informationChapters.length].id;
    document.querySelector('.manual-reader')?.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<div class="modal-backdrop" role="presentation" onclick={(event) => event.target === event.currentTarget && onclose()}>
  <div class="encyclopedia-modal manual-modal" role="dialog" aria-modal="true" aria-label="Enciclopedia técnica del atlas de partículas">
    <header class="manual-header">
      <div class="manual-title"><BookOpenText size={22}/><div><span class="eyebrow">ENCICLOPEDIA TÉCNICA</span><h2>Biblioteca de partículas, materia e interacciones</h2><p>{informationStats.total} capítulos · {informationStats.entities} entidades · {informationStats.antimatter} informes específicos de antimateria</p></div></div>
      <button class="icon-button" type="button" aria-label="Cerrar información" onclick={onclose}><X size={20}/></button>
    </header>

    <div class="manual-layout">
      <aside class="manual-index" aria-label="Índice de la enciclopedia">
        <label><Search size={15}/><input bind:value={query} placeholder="Buscar protón, QCD, positrón, fórmula…"/></label>
        <small class="manual-index-label">{navigation.length} CAPÍTULOS EN EL ÍNDICE</small>
        <nav>
          {#each groupedNavigation as entry}
            <span class="manual-group-label">{entry.group}</span>
            {#each entry.chapters as chapter}
              <button class:active={active.id === chapter.id} type="button" onclick={() => openChapter(chapter.id)}>
                <span>{chapter.symbol ?? String(informationChapters.findIndex((item) => item.id === chapter.id) + 1).padStart(2, '0')}</span>
                <span><b>{chapter.title}</b><small>{chapter.subtitle}</small></span>
                <ChevronRight size={14}/>
              </button>
            {/each}
          {/each}
        </nav>
        <footer><b>Índice documental permanente</b><span>Cada entidad tiene un informe propio; materia y antimateria no se contabilizan como la misma lectura.</span></footer>
      </aside>

      <article class="manual-reader" aria-live="polite">
        <header>
          <span class="manual-chapter-number">{String(activeNumber).padStart(2, '0')}</span>
          <span class="eyebrow">{active.group} · {active.kicker}</span>
          {#if active.symbol}<span class="manual-entity-symbol">{active.symbol}</span>{/if}
          <h2>{active.title}</h2>
          <p class="manual-intro">{active.intro}</p>
        </header>
        {#if active.formula}
          <div class="manual-formula"><FormulaBlock formula={active.formula} label="Relación de referencia"/><p>{active.formulaNote}</p></div>
        {/if}
        <div class="manual-sections">
          {#each active.sections as section}
            <section>
              <span>{section.eyebrow}</span>
              <h3>{section.title}</h3>
              {#each section.text.split('\n\n') as paragraph}<p>{paragraph}</p>{/each}
              {#if section.key}<aside><b>Idea esencial</b><p>{section.key}</p></aside>{/if}
            </section>
          {/each}
        </div>
        {#if active.sources?.length}
          <section class="manual-references"><span>REFERENCIAS DEL INFORME</span><h3>Fuentes para profundizar y comprobar valores</h3><div>{#each active.sources as source}<a href={source.url} target="_blank" rel="noreferrer"><span>{source.label}</span><ExternalLink size={14}/></a>{/each}</div></section>
        {/if}
        <footer><span>Capítulo {activeNumber} de {informationChapters.length}</span><button type="button" onclick={nextChapter}>Siguiente capítulo <ChevronRight size={14}/></button></footer>
      </article>
    </div>
  </div>
</div>

