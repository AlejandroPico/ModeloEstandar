import { mount } from 'svelte';
import 'katex/dist/katex.min.css';
import './styles/global.css';
import App from './App.svelte';

const target = document.getElementById('app');
if (!target) throw new Error('No se encontró el contenedor principal #app.');

mount(App, { target });

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}service-worker.js`, { scope: import.meta.env.BASE_URL })
      .catch((error) => console.warn('No se pudo activar el modo sin conexión:', error));
  });
}
