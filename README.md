# Modelo Estándar

Atlas científico e interactivo para explorar las partículas elementales, las interacciones fundamentales descritas por el Modelo Estándar, la antimateria y algunas propuestas más allá de la teoría confirmada.

> **Estado:** primera versión funcional · `0.1.0`  
> **Tecnologías:** Svelte 5 · TypeScript · Vite · KaTeX  
> **Despliegue:** GitHub Pages mediante GitHub Actions  
> **Arquitectura:** aplicación estática, sin backend

## Objetivo

La mayoría de las personas reconoce un átomo, pero la imagen escolar del núcleo rodeado por electrones no muestra dónde termina la materia compuesta y dónde comienza la física de partículas elementales.

Este proyecto presenta el Modelo Estándar como un lienzo ampliable. La vista general conserva la claridad de una tabla; al acercarse aparecen masa, carga, spin e interacciones; al abrir una ficha se accede a explicaciones, propiedades, decaimientos, fórmulas y fuentes.

La ruta de escala integrada conecta cuatro niveles:

```text
átomo → núcleo → protón/neutrón → quarks, gluones y leptones
```

## Funcionalidades

### Lienzo científico

- 12 fermiones de materia organizados en tres generaciones.
- 4 bosones gauge: gluón, fotón, Z y W.
- Bosón de Higgs diferenciado como bosón escalar.
- Zoom alrededor del cursor.
- Desplazamiento por arrastre.
- Niveles de información progresivos según la ampliación.
- Conexiones visuales entre una partícula seleccionada y sus mediadores.

### Fichas documentales

Cada partícula incluye:

- resumen divulgativo;
- masa, carga y spin;
- generación y familia;
- vida media o estado experimental;
- antipartícula;
- interacciones en las que participa;
- comportamiento o decaimientos característicos;
- fórmula renderizada con KaTeX;
- enlaces a fuentes científicas.

### Antimateria

El modo **Antimateria** conjuga las partículas del tablero y conserva como propias antipartículas a los estados autoconyugados. La interfaz distingue entre una transformación conceptual del tablero y la existencia experimental de antipartículas.

### Más allá del Modelo Estándar

Una banda separada y discontinua presenta ejemplos no observados:

- gravitón;
- neutralino;
- gluino;
- squarks y sleptones;
- gravitino.

Estas fichas utilizan la etiqueta **hipótesis / no observada**. No se mezclan con las partículas confirmadas.

### Capa matemática

La guía de fórmulas introduce:

- la descomposición por sectores de la lagrangiana;
- el grupo gauge `SU(3)C × SU(2)L × U(1)Y`;
- el potencial de Higgs;
- el acoplamiento de Yukawa y las masas fermiónicas.

### Exploración y accesibilidad

- búsqueda por nombre, símbolo, resumen, fecha y propiedades visibles;
- filtros por familia e interacción;
- tema claro y oscuro;
- controles con nombre accesible y ayuda contextual;
- navegación de fichas por pestañas;
- adaptación a escritorio, tableta y móvil;
- reducción de animaciones según las preferencias del sistema.

## Principios científicos

- **Elemental no significa “la bolita más pequeña”**: significa que no se ha observado estructura interna hasta la resolución experimental disponible.
- Los quarks no se observan aislados debido al confinamiento de color.
- Los neutrinos de sabor son combinaciones de estados de masa; por ello no se les asigna una masa simple en el tablero.
- El campo de Higgs participa en el origen de las masas elementales, pero la mayor parte de la masa de protones y neutrones procede de la dinámica de la interacción fuerte.
- La gravedad no forma parte del Modelo Estándar.
- Las masas de quarks dependen del esquema y de la escala de renormalización. Los valores mostrados son referencias divulgativas redondeadas.

## Fuentes principales

- [Particle Data Group · Review of Particle Physics](https://pdg.lbl.gov/)
- [CERN · The Standard Model](https://home.cern/science/physics/standard-model/)
- [CERN · The Higgs boson](https://home.cern/science/physics/higgs-boson/)
- [CERN · Antimatter](https://home.cern/science/physics/antimatter/)

Los valores científicos se versionan en `src/data/particles.ts`. No se consultan APIs externas durante la navegación.

## Arquitectura

```text
src/
├─ components/
│  ├─ ParticleViewport.svelte   # cámara, zoom, arrastre y conexiones
│  ├─ ParticleCard.svelte       # ficha progresiva del lienzo
│  ├─ ParticleDetail.svelte     # documentación de cada partícula
│  ├─ FilterPanel.svelte        # búsqueda y filtros
│  ├─ FormulaAtlas.svelte       # capa matemática
│  └─ ScaleJourney.svelte       # átomo → partículas elementales
├─ data/
│  ├─ particles.ts              # dataset científico local
│  └─ types.ts
├─ lib/
│  └─ format.ts                 # KaTeX y utilidades
├─ styles/
│  └─ global.css
├─ App.svelte
└─ main.ts
```

## Desarrollo local

Requiere Node.js 24 o una versión compatible reciente.

```bash
npm install
npm run dev
```

Validación y producción:

```bash
npm run check
npm run build
npm run preview
```

## GitHub Pages

El workflow `.github/workflows/deploy.yml` valida el proyecto, genera `dist/` y lo publica al hacer `push` a `main`.

En GitHub debe estar seleccionada la fuente:

```text
Settings → Pages → Build and deployment → GitHub Actions
```

La dirección prevista es:

**https://alejandropico.github.io/ModeloEstandar/**

## Próximos niveles

La arquitectura deja preparados varios desarrollos posteriores:

1. recorrido continuo de potencias de diez;
2. construcción visual de protones, neutrones, mesones y átomos;
3. diagramas de Feynman interactivos;
4. mezclas CKM y PMNS;
5. historia experimental y detectores;
6. comparación de masas en escala logarítmica;
7. desarrollo completo de la lagrangiana del Modelo Estándar.

## Licencia

El repositorio no incluye todavía una licencia explícita. Hasta que se añada, no debe asumirse una licencia abierta concreta para el código o el contenido.
