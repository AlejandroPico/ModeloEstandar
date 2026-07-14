import { mount } from 'svelte';
import 'katex/dist/katex.min.css';
import './styles/global.css';
import App from './App.svelte';

const target = document.getElementById('app');
if (!target) throw new Error('No se encontró el contenedor principal #app.');

mount(App, { target });
