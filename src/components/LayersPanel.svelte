<script lang="ts">
  import { Atom, Boxes, CircleGauge, Copy, MoonStar, Orbit, Sparkles, Waves, X } from '@lucide/svelte';
  import type { LayerId } from '../data/types';

  let { layers, ontoggle, onclose }: { layers: Record<LayerId, boolean>; ontoggle: (layer: LayerId) => void; onclose: () => void } = $props();
  const groups = [
    { title: 'Estructura observada', items: [
      { id: 'composites' as const, label: 'Átomos y hadrones', detail: 'H, deuterio, núcleos, nucleones y mesones', icon: Atom },
      { id: 'forces' as const, label: 'Cuatro interacciones', detail: 'Fuerte, electromagnética, débil y gravedad', icon: CircleGauge },
      { id: 'antimatter' as const, label: 'Universo espejo', detail: 'Duplica exactamente las capas visibles', icon: Copy }
    ]},
    { title: 'Más allá · no observado', items: [
      { id: 'susy' as const, label: 'Supersimetría', detail: 'Neutralinos, charginos, gluinos y sfermiones', icon: Sparkles },
      { id: 'dark-sector' as const, label: 'Sectores oscuros', detail: 'Axión, fotón oscuro y neutrino estéril', icon: MoonStar },
      { id: 'quantum-gravity' as const, label: 'Gravedad cuántica', detail: 'Gravitón, gravitino y monopolo', icon: Orbit },
      { id: 'strings' as const, label: 'Cuerdas y branas', detail: 'Cuerdas, D-branas, M2, M5 y defectos', icon: Waves }
    ]}
  ];
</script>

<aside class="hud-panel layers-panel" aria-label="Capas científicas">
  <header><div><span class="eyebrow">CAPAS</span><h2>Contenido del lienzo</h2></div><button class="icon-button" type="button" aria-label="Cerrar capas" onclick={onclose}><X size={18}/></button></header>
  <p class="panel-intro">Las 17 partículas elementales permanecen como base. El resto se añade o se repliega sin sustituirlas.</p>
  {#each groups as group}
    <section class="layer-group">
      <h3>{group.title}</h3>
      {#each group.items as item}
        <button class:active={layers[item.id]} type="button" onclick={() => ontoggle(item.id)}>
          <span class="layer-icon"><item.icon size={17}/></span>
          <span><b>{item.label}</b><small>{item.detail}</small></span>
          <i aria-hidden="true"></i>
        </button>
      {/each}
    </section>
  {/each}
  <footer><Boxes size={15}/><span>Las capas hipotéticas utilizan borde discontinuo y una etiqueta de evidencia.</span></footer>
</aside>
