<script lang="ts">
  import { BookOpen, Search, X } from '@lucide/svelte';
  import { encyclopediaTopics } from '../data/science';
  let { onclose }: { onclose: () => void } = $props();
  let query = $state('');
  let category = $state('Todas');
  const categories = ['Todas', ...new Set(encyclopediaTopics.map((topic) => topic.category))];
  const visible = $derived(encyclopediaTopics.filter((topic) => {
    const needle = query.trim().toLocaleLowerCase('es');
    return (category === 'Todas' || topic.category === category) && (!needle || `${topic.title} ${topic.text} ${topic.category}`.toLocaleLowerCase('es').includes(needle));
  }));
</script>

<div class="modal-backdrop" role="presentation" onclick={(event) => event.target === event.currentTarget && onclose()}>
  <div class="encyclopedia-modal" role="dialog" aria-modal="true" aria-label="Enciclopedia del atlas de partículas">
    <header>
      <div><span class="eyebrow">ENCICLOPEDIA · 50 CLAVES</span><h2>Del átomo a los campos cuánticos</h2><p>Una guía general para interpretar el lienzo sin conocimientos previos.</p></div>
      <button class="icon-button" type="button" aria-label="Cerrar enciclopedia" onclick={onclose}><X size={19}/></button>
    </header>
    <div class="encyclopedia-tools">
      <label><Search size={16}/><input bind:value={query} placeholder="Buscar fuerza, pión, escala…"/></label>
      <nav aria-label="Categorías de la enciclopedia">
        {#each categories as item}<button class:active={category === item} type="button" onclick={() => category = item}>{item}</button>{/each}
      </nav>
    </div>
    <div class="encyclopedia-summary"><BookOpen size={17}/><span><b>{visible.length}</b> de 50 entradas · lo observado y lo hipotético aparecen separados.</span></div>
    <div class="encyclopedia-grid">
      {#each visible as topic}
        <article><span>{String(topic.number).padStart(2, '0')}</span><small>{topic.category}</small><h3>{topic.title}</h3><p>{topic.text}</p></article>
      {/each}
    </div>
  </div>
</div>
