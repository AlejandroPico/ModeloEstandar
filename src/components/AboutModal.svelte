<script lang="ts">
  import { ExternalLink, GitFork, Globe2, Info, Layers3, Scale, X } from '@lucide/svelte';

  let { onclose }: { onclose: () => void } = $props();

  const links = [
    {
      label: 'Portfolio de Alejandro Pico',
      detail: 'Proyectos, experimentos visuales y trabajo de desarrollo',
      url: 'https://alejandropico.github.io/Portfolio/',
      icon: Globe2
    },
    {
      label: 'Repositorio del proyecto',
      detail: 'Código fuente, historial y documentación en GitHub',
      url: 'https://github.com/AlejandroPico/ModeloEstandar',
      icon: GitFork
    }
  ];
</script>

<div class="modal-backdrop full-screen-on-mobile" role="presentation" onclick={(event) => event.target === event.currentTarget && onclose()}>
  <div class="about-modal" role="dialog" aria-modal="true" aria-label="Acerca del proyecto Modelo Estándar">
    <header class="about-header">
      <div class="about-mark"><img src="./favicon.svg" alt=""/></div>
      <div><span class="eyebrow">ACERCA DEL PROYECTO</span><h2>Modelo Estándar · Atlas de partículas</h2><p>Una cartografía visual y documental de la materia, sus interacciones y las hipótesis que intentan ampliar nuestra descripción de la naturaleza.</p></div>
      <button class="icon-button" type="button" aria-label="Cerrar acerca del proyecto" onclick={onclose}><X size={20}/></button>
    </header>

    <div class="about-body">
      <section class="about-statement">
        <span>PROPÓSITO</span>
        <h3>Ver la física como un sistema conectado</h3>
        <p>Este proyecto organiza las partículas elementales del Modelo Estándar, las estructuras que forman, las cuatro interacciones fundamentales y una selección rigurosa de candidatos teóricos. El lienzo combina escala, relaciones, fórmulas y fichas documentales para que cada concepto pueda explorarse sin perder su contexto.</p>
        <p>Lo observado, lo hipotético y las referencias comparativas se distinguen de forma explícita. Las ilustraciones son didácticas: ayudan a orientarse, pero no pretenden convertir campos cuánticos, cargas o escalas experimentales en objetos clásicos.</p>
      </section>

      <div class="about-principles">
        <article><Scale size={19}/><span><b>Escala continua</b><small>Del micrómetro biológico a la frontera de Planck, con saltos señalados cuando no existe una estructura intermedia.</small></span></article>
        <article><Layers3 size={19}/><span><b>Lectura por capas</b><small>La base permanece limpia y cada familia adicional se activa sólo cuando se necesita.</small></span></article>
        <article><Info size={19}/><span><b>Trazabilidad científica</b><small>Fichas, capítulos, fórmulas y fuentes enlazadas para ampliar o contrastar cada lectura.</small></span></article>
      </div>

    </div>

    <section class="about-links" aria-label="Enlaces del proyecto">
      <span>PROYECTO Y AUTORÍA</span>
      <h3>Creado por Alejandro Pico</h3>
      <div>
        {#each links as link}
          <a href={link.url} target="_blank" rel="noreferrer">
            <span class="about-link-icon"><link.icon size={19}/></span>
            <span><b>{link.label}</b><small>{link.detail}</small></span>
            <ExternalLink size={16}/>
          </a>
        {/each}
      </div>
    </section>

    <footer><span>Proyecto divulgativo interactivo</span><span>Modelo Estándar · v1.0.2 · 2026</span></footer>
  </div>
</div>
