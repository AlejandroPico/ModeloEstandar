<script lang="ts">
  import { Braces, X } from '@lucide/svelte';
  import FormulaBlock from './FormulaBlock.svelte';
  let { onclose }: { onclose: () => void } = $props();
  let active = $state(0);
  const chapters = [
    { label: 'Mapa completo', title: 'La lagrangiana como índice', formula: '\\mathcal L_{SM}=\\mathcal L_{gauge}+\\mathcal L_{fermiones}+\\mathcal L_{Higgs}+\\mathcal L_{Yukawa}', text: 'No es una sola “fórmula mágica”, sino la suma compacta de los sectores que describen campos, fuerzas, Higgs y acoplamientos de materia.' },
    { label: 'Simetría gauge', title: 'Las tres interacciones incluidas', formula: 'SU(3)_C\\times SU(2)_L\\times U(1)_Y', text: 'SU(3) describe la fuerza fuerte. SU(2) y U(1) construyen la teoría electrodébil, que tras la ruptura de simetría produce fotón, W y Z.' },
    { label: 'Higgs', title: 'El potencial del campo de Higgs', formula: 'V(\\Phi)=-\\mu^2\\Phi^\\dagger\\Phi+\\lambda(\\Phi^\\dagger\\Phi)^2', text: 'La forma del potencial permite un valor no nulo del campo en el vacío y rompe espontáneamente la simetría electrodébil.' },
    { label: 'Masa', title: 'Acoplamiento de Yukawa', formula: 'm_f=\\frac{y_f v}{\\sqrt 2}', text: 'Cada fermión se acopla con intensidad y_f al campo de Higgs. El Modelo Estándar mide esos acoplamientos, pero no explica por qué poseen valores tan distintos.' }
  ];
</script>

<div class="modal-backdrop" role="presentation" onclick={(event) => event.target === event.currentTarget && onclose()}>
  <div class="formula-modal" role="dialog" aria-modal="true" aria-label="Atlas de fórmulas del Modelo Estándar">
    <header><div><span class="eyebrow">CAPA MATEMÁTICA</span><h2>La teoría bajo las fichas</h2></div><button class="icon-button" type="button" aria-label="Cerrar" onclick={onclose}><X size={19}/></button></header>
    <nav>{#each chapters as chapter, index}<button class:active={active === index} type="button" onclick={() => active = index}>{chapter.label}</button>{/each}</nav>
    <div class="formula-atlas-content">
      <span class="formula-icon"><Braces size={24}/></span><h3>{chapters[active].title}</h3>
      <FormulaBlock formula={chapters[active].formula} label="Expresión simplificada" />
      <p>{chapters[active].text}</p>
      <aside>Las convenciones y términos gauge completos se desarrollarán en niveles posteriores del proyecto.</aside>
    </div>
  </div>
</div>
