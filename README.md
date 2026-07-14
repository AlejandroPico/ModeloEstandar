# Modelo Estándar

Atlas científico e interactivo para explorar las partículas elementales, las interacciones fundamentales descritas por el Modelo Estándar, la antimateria y algunas propuestas más allá de la teoría confirmada.

> **Estado:** enciclopedia visual · `0.5.0`  
> **Tecnologías:** Svelte 5 · TypeScript · Vite · KaTeX  
> **Despliegue:** GitHub Pages mediante GitHub Actions  
> **Arquitectura:** aplicación estática, sin backend

## Objetivo

La mayoría de las personas reconoce un átomo, pero la imagen escolar del núcleo rodeado por electrones no muestra dónde termina la materia compuesta y dónde comienza la física de partículas elementales.

Este proyecto presenta el Modelo Estándar como un lienzo ampliable. La vista general conserva la claridad de una tabla; al acercarse aparecen masa, carga, spin e interacciones; al abrir una ficha se accede a explicaciones, propiedades, decaimientos, fórmulas y fuentes.

La ruta de escala integrada conecta seis niveles y diferencia explícitamente evidencia y especulación:

```text
átomo → núcleo → nucleón → partículas elementales → nuevas hipótesis → frontera de Planck
```

## Funcionalidades

### Lienzo científico

- 12 fermiones de materia organizados en tres generaciones.
- 4 bosones gauge: gluón, fotón, Z y W.
- Bosón de Higgs diferenciado como bosón escalar.
- Hidrógeno, deuterio, núcleos, nucleones y mesones como sistemas compuestos.
- Las cuatro interacciones fundamentales como fichas: fuerte, electromagnetismo, débil y gravedad.
- Zoom alrededor del cursor.
- Desplazamiento por arrastre.
- Eje vertical permanente de `10⁻¹⁰` a `10⁻¹⁹ m`, más la discontinuidad hasta Planck.
- El eje ocupa el borde de la pantalla como en una gráfica: su línea queda fija y sus valores se desplazan y escalan con la cámara.
- Niveles de información progresivos según la ampliación.
- Conexiones visuales animadas entre una estructura y sus constituyentes o mediadores.

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

El modo **Antimateria** despliega una segunda estructura completa a la derecha, en lugar de sustituir las fichas existentes. El universo espejo replica dinámicamente todas las capas que estén activas. Los estados autoconjugados se conservan y quedan identificados como tales.

### HUD, capas y enciclopedia técnica

- barra rectangular superior derecha con búsqueda desplegable en línea, filtros, información, leyenda, datos, fórmulas, capas, tema y zoom restablecible;
- capas independientes para compuestos, cuatro fuerzas, antimateria, supersimetría, sector oscuro, gravedad cuántica y cuerdas;
- buscador de catálogo por nombre, símbolo, antimateria, propiedades, teoría, fecha, interacción, composición y fuentes;
- enciclopedia con diez capítulos generales, un informe de quince apartados para cada una de las 46 entidades científicas y capítulos propios para las antipartículas no autoconjugadas;
- eje gráfico permanente a la izquierda, único para materia y antimateria y sincronizado con zoom y desplazamiento;
- fichas sin listados numéricos artificiales: los datos se integran en resumen, propiedades, interacciones, historia, fórmula y fuentes;
- historia, evidencia, interpretación matemática y propiedades físicas desarrolladas por separado.

### Más allá del Modelo Estándar

Dos zonas separadas y discontinuas presentan ejemplos no observados:

- gravitón;
- candidatos supersimétricos: neutralino, chargino, gluino, sfermiones y gravitino;
- axión, neutrino estéril, fotón oscuro y monopolo magnético;
- cuerda abierta, cuerda cerrada, D-brana, M2-brana, M5-brana y cuerda cósmica.

Estas fichas utilizan la etiqueta **hipótesis / no observada** y declaran su marco teórico. No se mezclan con las partículas confirmadas ni se presentan las cuerdas como partículas ya descubiertas.

### Atlas matemático

El lector matemático reúne 47 fórmulas agrupadas y buscables. Cada entrada desarrolla significado, notación, uso, procedencia, límites, relaciones y fuentes. Incluye, entre otros bloques:

- la descomposición por sectores de la lagrangiana;
- el grupo gauge `SU(3)C × SU(2)L × U(1)Y`;
- el potencial de Higgs;
- el acoplamiento de Yukawa y las masas fermiónicas;
- QED, QCD, teoría electrodébil, estructura hadrónica y mezcla de sabores;
- cinemática relativista, decaimientos, resonancias y magnitudes de colisionadores;
- gravedad clásica, longitud de Planck y acciones de cuerdas.

### Exploración y accesibilidad

- búsqueda ampliada por nombres de materia y antimateria, símbolos, resumen, masa, carga, spin, fecha, fórmula, teoría, composición, interacciones y fuentes;
- filtros por familia e interacción;
- tema claro, oscuro y automático según el ciclo solar estacional de Barcelona;
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
- [CERN · Supersymmetry](https://home.cern/science/physics/supersymmetry/)
- [NIST · Planck length](https://physics.nist.gov/cgi-bin/cuu/Value?plkl=)

Los valores científicos se versionan en `src/data/particles.ts`. No se consultan APIs externas durante la navegación.

## Arquitectura

```text
src/
├─ components/
│  ├─ ParticleViewport.svelte   # cámara, zoom, arrastre y conexiones
│  ├─ ParticleCard.svelte       # ficha progresiva del lienzo
│  ├─ NodeVisual.svelte         # átomo, hadrones, cuerdas y branas en SVG
│  ├─ ParticleDetail.svelte     # documentación de cada partícula
│  ├─ FilterPanel.svelte        # filtros científicos
│  ├─ FormulaAtlas.svelte       # capa matemática
│  ├─ ScaleAxis.svelte          # eje fijo sincronizado con la cámara
│  ├─ LayersPanel.svelte        # capas observadas e hipotéticas
│  ├─ LegendPanel.svelte        # código visual del atlas
│  ├─ DataPanel.svelte          # métricas del lienzo
│  └─ EncyclopediaModal.svelte  # manual con índice y capítulos
├─ data/
│  ├─ particles.ts              # dataset científico local
│  ├─ forces.ts                 # cuatro interacciones fundamentales
│  ├─ science.ts                # escalas y capítulos fundamentales
│  ├─ information.ts            # informes de entidades y antimateria
│  ├─ formulae.ts               # atlas de 47 fórmulas documentadas
│  └─ types.ts
├─ lib/
│  ├─ format.ts                 # KaTeX y utilidades
│  └─ solarTheme.ts             # tema solar local y respaldo del sistema
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
2. más átomos, hadrones y estados ligados;
3. diagramas de Feynman interactivos;
4. mezclas CKM y PMNS;
5. historia experimental y detectores;
6. comparación de masas en escala logarítmica;
7. desarrollo completo de la lagrangiana del Modelo Estándar.

## Licencia

El repositorio no incluye todavía una licencia explícita. Hasta que se añada, no debe asumirse una licencia abierta concreta para el código o el contenido.
