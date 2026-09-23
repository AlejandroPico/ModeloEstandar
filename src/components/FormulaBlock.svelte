<script lang="ts">
  let { formula, label = 'Relación característica' }: { formula: string; label?: string } = $props();
  let rendered = $state('');
  $effect(() => {
    const source = formula;
    let cancelled = false;
    import('../lib/format').then(({ renderFormula }) => {
      if (!cancelled) rendered = renderFormula(source);
    });
    return () => { cancelled = true; };
  });
</script>

<figure class="formula-block">
  <figcaption>{label}</figcaption>
  <div class="formula-render" aria-label={formula}>{@html rendered}</div>
</figure>
