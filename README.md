# Modelo Estándar

Atlas científico interactivo para explorar las partículas elementales, las interacciones fundamentales, la antimateria, la materia compuesta y algunas de las principales propuestas situadas más allá de la teoría confirmada.

> **Versión estable:** `1.0.1`
>
> **Tecnologías:** Svelte 5 · TypeScript · Vite · KaTeX
>
> **Arquitectura:** aplicación estática, sin backend ni consultas externas durante la navegación
>
> **Despliegue:** GitHub Pages mediante GitHub Actions

**Aplicación:** https://alejandropico.github.io/ModeloEstandar/

## Propósito

La representación escolar del átomo no muestra con claridad dónde termina la materia compuesta y dónde comienza la física de partículas elementales. Este proyecto convierte esa transición en un lienzo continuo, ampliable y documentado.

La exploración conecta referencias biológicas y tecnológicas con el átomo, el núcleo, los hadrones, las partículas elementales, las hipótesis contemporáneas y la frontera de Planck. Lo observado, lo hipotético y lo meramente comparativo se distinguen expresamente.

```text
vida y biomoléculas → tecnología subnanométrica → átomo → núcleo → hadrones
→ partículas elementales → hipótesis no observadas → cuerdas y escala de Planck
```

## Versión 1.0

La versión `1.0.1` consolida el proyecto como un atlas completo y utilizable en escritorio, tableta y móvil:

- lienzo científico continuo con zoom, arrastre y niveles de detalle progresivos;
- eje vertical permanente sincronizado con la cámara;
- 17 partículas elementales del Modelo Estándar como base siempre disponible;
- capas opcionales para materia compuesta, fuerzas, antimateria, teorías y referencias de escala;
- fichas documentales extensas con propiedades, fórmulas y fuentes;
- fichas técnicas rectilíneas, con accesos directos a Fórmulas y Enciclopedia, y presentación a pantalla completa en móvil;
- Enciclopedia técnica y Atlas Matemático independientes;
- navegación móvil inspirada en el patrón de Nucleidos/Nuclei 2;
- «Acerca del proyecto» con autoría, portfolio y repositorio;
- favicon SVG disponible en la raíz del repositorio.

## Lienzo científico

### Modelo Estándar

- 6 quarks y 6 leptones organizados en tres generaciones.
- 4 bosones gauge: gluón, fotón, Z y W.
- Bosón de Higgs identificado como sector escalar.
- Masa, carga, spin, generación, estabilidad e interacciones visibles de forma progresiva.
- Relaciones animadas entre estructuras, constituyentes y mediadores.

### Materia compuesta e interacciones

- átomo didáctico general, núcleo, protones y neutrones;
- mesones y otras familias de hadrones;
- interacción fuerte, electromagnetismo, interacción débil y gravedad;
- composición de valencia de protones y neutrones;
- explicación de carga de color, representaciones de `SU(3)C` y neutralidad observable.

### Antimateria

La capa **Antimateria** representa antipartículas y estados conjugados conocidos. Se despliega como una estructura paralela y conserva los estados autoconjugados debidamente identificados.

La antimateria observada no debe confundirse con un hipotético universo o sector espejo completo. El atlas mantiene esa distinción en sus fichas y capítulos científicos.

### Más allá del Modelo Estándar

Las entidades no observadas aparecen en recintos discontinuos y con su estado experimental explícito:

- supersimetría: neutralino, chargino, gluino, sfermiones y gravitino;
- sectores oscuros: axión, neutrino estéril, fotón oscuro, Higgs oscuro y mesones oscuros;
- candidatos de colisionador: leptoquarks, leptones neutros pesados, Z′/W′, quarks vectoriales, Q-balls y dyones;
- gravedad cuántica y dimensiones extra: gravitón, excitaciones de Kaluza–Klein, radion, monopolos y microagujeros negros;
- cuerdas abiertas y cerradas, D-branas, M2, M5 y cuerdas cósmicas.

### Referencias de escala

Estas capas son comparadores y no forman parte del inventario de partículas:

- **Nanoelectrónica experimental:** referencias funcionales subnanométricas.
- **Biología:** ADN, proteínas, ribosomas, virus, cromosomas y células.

La bacteria se presenta como organismo vivo; ADN, proteínas y ribosomas no se etiquetan como seres vivos, y el caso de los virus se describe con la cautela correspondiente.

## Fichas documentales

Cada entidad puede incluir:

- resumen divulgativo y función física;
- masa, carga, spin, generación y familia;
- estabilidad, vida media o situación experimental;
- antipartícula y carácter autoconjugado;
- interacciones y decaimientos característicos;
- estructura cuantitativa de constituyentes;
- color de quark entendido como carga cuántica, no como color óptico;
- fórmula renderizada con KaTeX;
- historia, métodos de detección, límites interpretativos y preguntas abiertas;
- enlaces a fuentes científicas primarias o institucionales.

## Enciclopedia técnica

La Enciclopedia reúne fundamentos, partículas elementales, interacciones, materia compuesta, hipótesis, cuerdas, referencias de escala y antimateria.

En escritorio utiliza un índice documental lateral. En móvil adopta la navegación de la Gran Enciclopedia de Nuclei 2:

1. buscador transversal;
2. banda horizontal de áreas;
3. banda horizontal de capítulos con indicación explícita de deslizamiento;
4. artículo a toda la anchura restante;
5. desplazamiento vertical reservado al contenido.

La misma organización se mantiene al girar el teléfono, evitando que un índice vertical desperdicie la mitad del viewport.

## Atlas Matemático

El lector matemático reúne 51 fórmulas agrupadas y buscables. Cada entrada explica significado, notación, aplicación, procedencia, límites, conexiones y fuentes.

Incluye, entre otros bloques:

- lagrangiana del Modelo Estándar y separación por sectores;
- grupo gauge `SU(3)C × SU(2)L × U(1)Y`;
- potencial de Higgs y acoplamientos de Yukawa;
- QED, QCD y teoría electrodébil;
- estructura hadrónica y mezcla de sabores;
- cinemática relativista, decaimientos y resonancias;
- magnitudes de colisionadores;
- gravedad clásica, longitud de Planck y acciones de cuerdas.

En móvil utiliza el mismo patrón horizontal de áreas y fórmulas que la Enciclopedia, dejando el informe matemático a anchura completa.

## Interfaz y navegación

### Escritorio

La barra superior mantiene una secuencia compacta y sin separadores verticales entre iconos:

```text
Buscar · Filtros · Enciclopedia · Leyenda · Fórmulas · Capas
· Acerca del proyecto · Tema · Restablecer vista/zoom
```

### Móvil y tableta

- botón hamburguesa en la esquina superior izquierda;
- cabecera del menú con favicon e identidad del proyecto;
- cierre mediante el botón, pulsación fuera o deslizamiento hacia la izquierda;
- Filtros, Leyenda y Capas integrados dentro del propio menú;
- fichas técnicas a `100dvw × 100dvh`, sin márgenes exteriores;
- Enciclopedia y Fórmulas a `100dvw × 100dvh`, sin márgenes exteriores;
- «Acerca del proyecto» sin scroll interno y con enlaces anclados en la zona inferior;
- diseño específico para orientación horizontal y alturas reducidas;
- eje vertical más estrecho para conservar el ancho útil del lienzo.

## Búsqueda, filtros y capas

El buscador consulta nombres, símbolos, antimateria, propiedades, fechas, interacciones, composición, fórmulas, teorías y fuentes, incluidas entidades pertenecientes a capas ocultas.

Los filtros permiten limitar por familia e interacción. Las capas se dividen en:

- estructura observada;
- propuestas no observadas;
- referencias tecnológicas y biológicas de escala.

## Tema y accesibilidad

- modos claro, oscuro y automático;
- en modo automático se utiliza el ciclo solar local cuando el navegador permite obtener la posición;
- respaldo basado en la preferencia del sistema si no hay geolocalización;
- nombres accesibles para controles e iconos;
- navegación mediante botones semánticos;
- foco visible;
- reducción de animaciones cuando el sistema lo solicita.

## Principios científicos

- **Elemental** significa que no se ha observado estructura interna hasta la resolución experimental disponible.
- Los quarks no se observan aislados debido al confinamiento de color.
- Rojo, verde y azul son etiquetas de QCD, no colores ópticos.
- `uud` y `udd` describen el contenido de valencia de protón y neutrón, no un inventario estático de todos los gluones y pares quark–antiquark.
- Los neutrinos de sabor son combinaciones de estados de masa.
- La mayor parte de la masa de protones y neutrones procede de la dinámica de la interacción fuerte.
- La gravedad no forma parte del Modelo Estándar.
- Las masas de quarks dependen del esquema y de la escala de renormalización.
- Las ilustraciones del atlas son didácticas y no deben interpretarse como representaciones clásicas literales de campos cuánticos.

## Fuentes principales

- [Particle Data Group · Review of Particle Physics](https://pdg.lbl.gov/)
- [CERN · The Standard Model](https://home.cern/science/physics/standard-model/)
- [CERN · The Higgs boson](https://home.cern/science/physics/higgs-boson/)
- [CERN · Antimatter](https://home.cern/science/physics/antimatter/)
- [CERN · Supersymmetry](https://home.cern/science/physics/supersymmetry/)
- [CERN · Bestiary of exotic hadrons](https://home.cern/bestiary-exotic-hadrons/)
- [CERN · Extra dimensions, gravitons and tiny black holes](https://home.cern/science/physics/extra-dimensions-gravitons-and-tiny-black-holes/)
- [ATLAS · Leptoquark searches](https://atlas.cern/Tags/leptoquarks)
- [CMS · Heavy neutral lepton search](https://arxiv.org/abs/2403.00100)
- [Nature Communications · Atomic transistor](https://www.nature.com/articles/s41467-022-32582-9)
- [NIST · Planck length](https://physics.nist.gov/cgi-bin/cuu/Value?plkl=)

Los datos se versionan localmente en `src/data/`; no se consultan APIs externas durante la navegación.

## Arquitectura

```text
ModeloEstandar/
├─ favicon.svg                       # identidad SVG en la raíz
├─ public/favicon.svg                # copia servida por Vite
├─ src/
│  ├─ components/
│  │  ├─ ParticleViewport.svelte     # cámara, zoom, arrastre y conexiones
│  │  ├─ ParticleCard.svelte         # ficha progresiva del lienzo
│  │  ├─ NodeVisual.svelte           # representaciones SVG
│  │  ├─ ParticleDetail.svelte       # informe de cada entidad
│  │  ├─ ScaleAxis.svelte            # eje fijo sincronizado
│  │  ├─ FilterPanel.svelte          # filtros científicos
│  │  ├─ LayersPanel.svelte          # capas observadas, teóricas y comparativas
│  │  ├─ LegendPanel.svelte          # código visual
│  │  ├─ EncyclopediaModal.svelte    # Enciclopedia técnica
│  │  ├─ FormulaAtlas.svelte         # Atlas Matemático
│  │  ├─ FormulaBlock.svelte         # renderizado KaTeX
│  │  └─ AboutModal.svelte           # ficha y enlaces del proyecto
│  ├─ data/
│  │  ├─ particles.ts                # catálogo científico y referencias de escala
│  │  ├─ forces.ts                   # cuatro interacciones fundamentales
│  │  ├─ science.ts                  # escalas y fundamentos
│  │  ├─ information.ts              # capítulos de la Enciclopedia
│  │  ├─ formulae.ts                 # 51 informes matemáticos
│  │  └─ types.ts                    # contratos de datos
│  ├─ lib/
│  │  ├─ format.ts                   # KaTeX y utilidades
│  │  └─ solarTheme.ts               # resolución del tema automático
│  ├─ styles/global.css
│  ├─ App.svelte
│  └─ main.ts
├─ index.html
├─ package.json
└─ vite.config.ts
```

## Desarrollo local

Requiere Node.js 24 o una versión compatible reciente.

```bash
npm install
npm run dev
```

Comprobación y compilación:

```bash
npm run check
npm run build
npm run preview
```

## GitHub Pages

El workflow `.github/workflows/deploy.yml` comprueba el proyecto, genera `dist/` y lo publica tras cada actualización de `main`.

La fuente de Pages debe ser:

```text
Settings → Pages → Build and deployment → GitHub Actions
```

## Autoría

Proyecto personal, educativo y no comercial de **Alejandro Pico**.

- [Portfolio](https://alejandropico.github.io/Portfolio/)
- [Repositorio](https://github.com/AlejandroPico/ModeloEstandar)

## Licencia

El repositorio no incluye actualmente una licencia explícita. No debe asumirse una licencia abierta concreta para el código o el contenido.
