<script lang="ts">
  import { scalePoints } from '../data/science';

  let {
    camera,
    animated = false,
    positions = [],
    breakWorldY = 0
  }: {
    camera: { x: number; y: number; scale: number };
    animated?: boolean;
    positions?: number[];
    breakWorldY?: number;
  } = $props();

  const marks = $derived(scalePoints.map((point, index) => ({ ...point, worldY: positions[index] ?? 0 })));
</script>

<aside class:animated class="scale-axis" aria-label="Eje vertical de escala física">
  <div class="scale-axis-line"></div>
  {#each marks as mark}
    {@const screenY = camera.y + mark.worldY * camera.scale}
    <div
      class={`scale-axis-tick visible kind-${mark.kind} ${mark.exponent === '10⁻³⁵' ? 'planck' : ''}`}
      style={`top:${screenY}px;--tick-scale:${Math.max(.72, Math.min(1.2, camera.scale))};`}
    >
      <span>{mark.exponent}</span><small>m</small><i></i>
    </div>
  {/each}
  <div class="scale-axis-break" style={`top:${camera.y + breakWorldY * camera.scale}px;`}><span></span><span></span></div>
</aside>
