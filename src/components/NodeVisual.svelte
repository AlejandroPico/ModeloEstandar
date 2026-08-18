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
  {:else if type === 'dna'}
    <path class="bio-line" d="M24 6 C92 18 26 54 96 66 M96 6 C28 18 94 54 24 66"/>
    <path class="bio-rungs" d="M35 10 L85 10 M25 20 L95 20 M31 30 L89 30 M45 40 L75 40 M26 50 L94 50 M34 60 L86 60"/>
  {:else if type === 'protein'}
    <path class="bio-fill" d="M22 42 C12 23 34 10 51 18 C62 2 89 10 88 28 C110 34 101 59 82 59 C70 72 49 60 42 64 C22 69 11 55 22 42 Z"/>
    <path class="bio-line" d="M30 42 C43 21 58 55 72 27 C84 15 96 38 83 51 C69 62 53 36 39 54"/>
  {:else if type === 'ribosome'}
    <path class="bio-fill" d="M18 42 C18 22 38 11 62 15 C83 11 104 25 101 44 C98 61 79 65 58 60 C37 66 18 58 18 42 Z"/>
    <path class="bio-line" d="M26 38 C43 45 53 27 70 34 C82 39 89 30 96 35 M31 51 C50 40 68 56 89 47"/>
  {:else if type === 'virus'}
    <polygon class="bio-fill" points="60,8 91,25 91,50 60,66 29,50 29,25"/>
    <circle class="field-core" cx="60" cy="36" r="12"/><path class="bio-line" d="M60 8 V1 M91 25 L104 18 M91 50 L104 57 M60 66 V71 M29 50 L16 57 M29 25 L16 18"/>
  {:else if type === 'chromosome'}
    <path class="bio-line chromosome-line" d="M34 7 C48 18 54 27 60 36 C66 27 72 18 86 7 M34 65 C48 54 54 45 60 36 C66 45 72 54 86 65"/>
  {:else if type === 'bacterium'}
    <rect class="bio-fill" x="18" y="16" width="78" height="40" rx="20"/><path class="bio-line" d="M28 37 C39 23 51 51 64 31 C75 19 84 45 91 32 M96 37 C109 39 104 54 115 57"/>
  {:else}
    <circle class="field-ring r1" cx="60" cy="36" r="28"/><circle class="field-ring r2" cx="60" cy="36" r="18"/><circle class="field-core" cx="60" cy="36" r="8"/>
  {/if}
</svg>
