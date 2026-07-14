<script lang="ts">
  import { Atom, Boxes, CircleGauge, Copy, Cpu, MoonStar, Orbit, Radar, Sparkles, Waves, X } from '@lucide/svelte';
  import type { LayerId } from '../data/types';

  let { layers, ontoggle, onclose }: { layers: Record<LayerId, boolean>; ontoggle: (layer: LayerId) => void; onclose: () => void } = $props();
  const groups = [
    { title: 'Estructura observada', items: [
      { id: 'composites' as const, label: 'Átomo y hadrones', detail: 'Átomo general, nucleones, mesones y hadrones exóticos', icon: Atom },
      { id: 'forces' as const, label: 'Cuatro interacciones', detail: 'Fuerte, electromagnética, débil y gravedad', icon: CircleGauge },
      { id: 'antimatter' as const, label: 'Universo espejo', detail: 'Duplica exactamente las capas visibles', icon: Copy }
    ]},
    { title: 'Más allá · no observado', items: [
      { id: 'susy' as const, label: 'Supersimetría', detail: 'Neutralinos, charginos, gluinos y sfermiones', icon: Sparkles },
      { id: 'dark-sector' as const, label: 'Sectores oscuros', detail: 'Axión, fotón, Higgs y mesones oscuros', icon: MoonStar },
      { id: 'collider-candidates' as const, label: 'Candidatos de colisionador', detail: 'Leptoquarks, HNL, Z′/W′, VLQ, dyones y Q-balls', icon: Radar },
      { id: 'quantum-gravity' as const, label: 'Gravedad y dimensiones extra', detail: 'Gravitón, KK, radion, monopolos y microagujeros negros', icon: Orbit },
      { id: 'strings' as const, label: 'Cuerdas y branas', detail: 'Cuerdas, D-branas, M2, M5 y defectos', icon: Waves }
    ]},
    { title: 'Referencias de escala', items: [
      { id: 'technology' as const, label: 'Nanoelectrónica experimental', detail: 'Comparador opcional; no añade partículas al modelo', icon: Cpu }
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
  <footer><Boxes size={15}/><span>El borde discontinuo identifica hipótesis. La tecnología aparece como comparador, nunca como partícula.</span></footer>
</aside>
