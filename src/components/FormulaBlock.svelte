<script lang="ts">
  import { renderFormula } from '../lib/format';
  let { formula, label = 'Relación característica' }: { formula: string; label?: string } = $props();
  const rendered = $derived(renderFormula(formula));
</script>

<figure class="formula-block">
  <figcaption>{label}</figcaption>
  <div class="formula-render" aria-label={formula}>{@html rendered}</div>
</figure>
