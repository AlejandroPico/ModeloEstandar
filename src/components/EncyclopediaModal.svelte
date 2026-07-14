<script lang="ts">
  import { BookOpenText, ChevronRight, Search, X } from '@lucide/svelte';
  import { encyclopediaChapters } from '../data/science';

  let { onclose }: { onclose: () => void } = $props();
  let activeId = $state(encyclopediaChapters[0].id);
  let query = $state('');
  const active = $derived(encyclopediaChapters.find((chapter) => chapter.id === activeId) ?? encyclopediaChapters[0]);
  const navigation = $derived(encyclopediaChapters.filter((chapter) => {
    const needle = query.trim().toLocaleLowerCase('es');
    return !needle || `${chapter.title} ${chapter.subtitle} ${chapter.sections.map((section) => `${section.title} ${section.text}`).join(' ')}`.toLocaleLowerCase('es').includes(needle);
  }));
</script>

<div class="modal-backdrop" role="presentation" onclick={(event) => event.target === event.currentTarget && onclose()}>
  <div class="encyclopedia-modal manual-modal" role="dialog" aria-modal="true" aria-label="Manual general del atlas de partículas">
    <header class="manual-header">
      <div class="manual-title"><BookOpenText size={22}/><div><span class="eyebrow">MANUAL GENERAL</span><h2>Cómo leer el universo de las partículas</h2><p>Conceptos, escalas, fuerzas, evidencia y fronteras teóricas.</p></div></div>
      <button class="icon-button" type="button" aria-label="Cerrar información" onclick={onclose}><X size={20}/></button>
    </header>

    <div class="manual-layout">
      <aside class="manual-index" aria-label="Índice del manual">
        <label><Search size={15}/><input bind:value={query} placeholder="Buscar en el índice…"/></label>
        <small class="manual-index-label">CONTENIDOS</small>
        <nav>
          {#each navigation as chapter, index}
            <button class:active={active.id === chapter.id} type="button" onclick={() => activeId = chapter.id}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span><b>{chapter.title}</b><small>{chapter.subtitle}</small></span>
              <ChevronRight size={14}/>
            </button>
          {/each}
        </nav>
        <footer><b>{encyclopediaChapters.length} capítulos</b><span>El índice permanece fijo; sólo cambia la lectura de la derecha.</span></footer>
      </aside>

      <article class="manual-reader" aria-live="polite">
        <header>
          <span class="manual-chapter-number">{String(encyclopediaChapters.findIndex((item) => item.id === active.id) + 1).padStart(2, '0')}</span>
          <span class="eyebrow">{active.kicker}</span>
          <h2>{active.title}</h2>
          <p class="manual-intro">{active.intro}</p>
        </header>
        {#if active.formula}
          <div class="manual-formula"><small>RELACIÓN DE REFERENCIA</small><strong>{active.formula}</strong><p>{active.formulaNote}</p></div>
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
        <footer><span>Fin del capítulo</span><button type="button" onclick={() => {
          const index = encyclopediaChapters.findIndex((item) => item.id === active.id);
          activeId = encyclopediaChapters[(index + 1) % encyclopediaChapters.length].id;
          document.querySelector('.manual-reader')?.scrollTo({ top: 0, behavior: 'smooth' });
        }}>Siguiente capítulo <ChevronRight size={14}/></button></footer>
      </article>
    </div>
  </div>
</div>
