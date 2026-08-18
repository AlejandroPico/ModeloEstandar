<script lang="ts">
  import { Atom, Boxes, CircleGauge, Cpu, Dna, MoonStar, Orbit, Radar, Sparkles, Split, Waves, X } from '@lucide/svelte';
  import type { LayerId } from '../data/types';

  let { layers, ontoggle, onclose }: { layers: Record<LayerId, boolean>; ontoggle: (layer: LayerId) => void; onclose: () => void } = $props();
  const groups = [
    { title: 'Estructura observada', items: [
      { id: 'composites' as const, label: 'Átomo y hadrones', detail: 'Átomo, nucleones, mesones y exóticos', icon: Atom },
      { id: 'forces' as const, label: 'Cuatro interacciones', detail: 'Fuerte, electromagnética, débil y gravedad', icon: CircleGauge },
      { id: 'antimatter' as const, label: 'Antimateria', detail: 'Antipartículas y estados conjugados', icon: Split }
    ]},
    { title: 'Más allá · no observado', items: [
      { id: 'susy' as const, label: 'Supersimetría', detail: 'Neutralinos, charginos, gluinos y sfermiones', icon: Sparkles },
      { id: 'dark-sector' as const, label: 'Sectores oscuros', detail: 'Axión, fotón, Higgs y mesones oscuros', icon: MoonStar },
      { id: 'collider-candidates' as const, label: 'Candidatos de colisionador', detail: 'Leptoquarks, HNL, Z′/W′, VLQ, dyones y Q-balls', icon: Radar },
      { id: 'quantum-gravity' as const, label: 'Gravedad y dimensiones extra', detail: 'Gravitón, KK, radion, monopolos y microagujeros', icon: Orbit },
      { id: 'strings' as const, label: 'Cuerdas y branas', detail: 'Cuerdas, D-branas, M2, M5 y defectos', icon: Waves }
    ]},
    { title: 'Referencias de escala', items: [
      { id: 'technology' as const, label: 'Nanoelectrónica experimental', detail: 'Comparador tecnológico de escala', icon: Cpu },
      { id: 'biology' as const, label: 'Referencias biológicas', detail: 'ADN, proteínas, virus y células', icon: Dna }
    ]}
  ];
</script>

<aside class="hud-panel layers-panel" aria-label="Capas científicas">
  <header><div><span class="eyebrow">CAPAS</span><h2>Capas del lienzo</h2></div><button class="icon-button layers-close-button" type="button" aria-label="Cerrar capas" title="Cerrar" onclick={onclose}><X size={17}/></button></header>
  <p class="panel-intro">Activa estructuras, hipótesis y referencias sin alterar la base del Modelo Estándar.</p>
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
  <footer><Boxes size={15}/><span>Borde discontinuo: hipótesis. Tecnología y biología: referencias de escala.</span></footer>
</aside>
