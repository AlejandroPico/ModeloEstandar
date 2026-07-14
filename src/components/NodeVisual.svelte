<script lang="ts">
  import type { ParticleVisual } from '../data/types';
  let { type }: { type: ParticleVisual } = $props();
</script>

<svg class={`node-visual visual-${type}`} viewBox="0 0 120 72" aria-hidden="true">
  {#if type === 'atom'}
    <ellipse cx="60" cy="36" rx="48" ry="15" /><ellipse cx="60" cy="36" rx="48" ry="15" transform="rotate(60 60 36)"/><ellipse cx="60" cy="36" rx="48" ry="15" transform="rotate(-60 60 36)"/>
    <circle class="core-a" cx="56" cy="34" r="8"/><circle class="core-b" cx="66" cy="39" r="8"/><circle class="electron" cx="12" cy="36" r="4"/>
  {:else if type === 'proton' || type === 'neutron'}
    <circle class="hadron-shell" cx="60" cy="36" r="31"/>
    <path class="flux" d="M40 25 Q60 6 79 27 Q96 47 64 60 Q31 63 34 37 Q36 18 60 18 Q83 17 85 39 Q85 60 55 56 Q28 50 40 25"/>
    <circle class="quark q1" cx="45" cy="31" r="8"/><circle class="quark q2" cx="72" cy="29" r="8"/><circle class="quark q3" cx="60" cy="50" r="8"/>
  {:else if type === 'open-string'}
    <path class="string-line" d="M10 43 C24 5 38 68 52 29 S79 5 110 40"/><circle cx="10" cy="43" r="4"/><circle cx="110" cy="40" r="4"/>
  {:else if type === 'closed-string'}
    <path class="string-line" d="M22 36 C22 8 53 9 60 27 C68 49 99 58 99 34 C99 9 70 11 60 29 C50 51 22 58 22 36 Z"/>
  {:else if type === 'brane'}
    <path class="brane-surface" d="M16 49 Q34 9 61 26 T106 20 L96 57 Q70 42 49 57 T16 49 Z"/>
    <path class="brane-grid" d="M26 41 Q48 26 93 32 M22 49 Q49 38 98 44 M45 21 L38 53 M67 24 L64 51 M88 22 L84 52"/>
  {:else if type === 'cosmic-string'}
    <path class="cosmic-glow" d="M4 56 C30 4 42 70 63 28 S91 4 116 47"/><path class="string-line" d="M4 56 C30 4 42 70 63 28 S91 4 116 47"/>
  {:else}
    <circle class="field-ring r1" cx="60" cy="36" r="28"/><circle class="field-ring r2" cx="60" cy="36" r="18"/><circle class="field-core" cx="60" cy="36" r="8"/>
  {/if}
</svg>
