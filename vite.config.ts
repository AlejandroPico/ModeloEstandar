import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const repositoryBase = process.env.GITHUB_ACTIONS ? '/ModeloEstandar/' : './';

export default defineConfig({
  plugins: [svelte()],
  base: repositoryBase,
  build: {
    target: 'es2022',
    sourcemap: true
  }
});
