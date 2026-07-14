import type { Particle, SourceLink } from './types';

const CERN_FORCES: SourceLink = { label: 'CERN · The Standard Model and fundamental forces', url: 'https://home.cern/science/physics/standard-model/' };
const CERN_UNIFICATION: SourceLink = { label: 'CERN · Unified forces', url: 'https://home.cern/science/physics/unified-forces/' };

export const forceEntities: Particle[] = [
  {
    id: 'strong-force', symbol: 'SU(3)꜀', name: 'interacción fuerte', englishName: 'strong interaction', family: 'force', zone: 'forces', layer: 'forces', row: 1, column: 1,
    mass: 'No aplica: es una interacción', charge: 'Carga de color', spin: 'Mediador: 1', interactions: ['strong'], evidence: 'observed', discovered: 'Décadas de 1960–1970 · QCD', lifetime: 'Alcance partónico; confinamiento',
    antiparticle: 'SU(3)꜀', antiparticleName: 'interacción fuerte', selfConjugate: true, colorCharge: true, scale: 'Confinamiento ≈10⁻¹⁵ m', visual: 'field',
    constituents: ['gluon'], constituentSummary: 'Campo de gluones · simetría gauge SU(3)C',
    summary: 'La interacción que mantiene unidos los quarks dentro de los hadrones. Su versión residual contribuye a ligar protones y neutrones en los núcleos.',
    composition: 'No es una partícula ni una sustancia: es la dinámica del campo de color descrita por la cromodinámica cuántica.',
    role: 'Confinamiento, hadrones, núcleos y la mayor parte de la masa de protones y neutrones.',
    decays: 'No decae. Su intensidad cambia con la energía y los gluones se acoplan entre sí.', formula: '\mathcal L_{QCD}=-\frac14G^a_{\mu\nu}G^{a\mu\nu}+\bar q(i\!\not\!D-m)q',
    note: 'El pión participa en la descripción efectiva de la fuerza nuclear residual, pero el mediador fundamental de QCD es el gluón.', sources: [CERN_FORCES, CERN_UNIFICATION]
  },
  {
    id: 'electromagnetic-force', symbol: 'U(1)ₑₘ', name: 'electromagnetismo', englishName: 'electromagnetic interaction', family: 'force', zone: 'forces', layer: 'forces', row: 1, column: 2,
    mass: 'No aplica: es una interacción', charge: 'Carga eléctrica', spin: 'Mediador: 1', interactions: ['electromagnetic'], evidence: 'observed', discovered: 'Siglo XIX · unificación; QED en el XX', lifetime: 'Alcance infinito',
    antiparticle: 'U(1)ₑₘ', antiparticleName: 'electromagnetismo', selfConjugate: true, scale: 'Alcance infinito', visual: 'field',
    constituents: ['photon'], constituentSummary: 'Campo electromagnético · fotón',
    summary: 'Interacción entre partículas con carga eléctrica. Explica la luz, la electricidad, el magnetismo, los átomos y la química.',
    composition: 'En la descripción cuántica es una teoría gauge U(1) cuyo cuanto es el fotón.', role: 'Estructura atómica y molecular, radiación y casi todos los fenómenos cotidianos salvo gravedad.',
    decays: 'No decae. El campo puede transferir energía y momento mediante fotones.', formula: '\partial_\mu F^{\mu\nu}=\mu_0J^\nu', sources: [CERN_FORCES, CERN_UNIFICATION]
  },
  {
    id: 'weak-force', symbol: 'SU(2)ₗ', name: 'interacción débil', englishName: 'weak interaction', family: 'force', zone: 'forces', layer: 'forces', row: 1, column: 3,
    mass: 'No aplica: es una interacción', charge: 'Isospín débil', spin: 'Mediadores: 1', interactions: ['weak'], evidence: 'observed', discovered: '1930–1983 · teoría y W/Z', lifetime: 'Alcance ≈10⁻¹⁸ m',
    antiparticle: 'SU(2)ₗ', antiparticleName: 'interacción débil', selfConjugate: true, scale: '≈10⁻¹⁸ m', visual: 'field',
    constituents: ['w-boson', 'z-boson'], constituentSummary: 'Bosones W± y Z⁰ · sector electrodébil',
    summary: 'Interacción de corto alcance que cambia sabores de quarks y leptones y hace posibles la desintegración beta y la fusión solar.',
    composition: 'Forma parte de la teoría electrodébil SU(2)L × U(1)Y; a bajas energías se distingue del electromagnetismo.',
    role: 'Radiactividad beta, neutrinos, producción de energía estelar y transformación de partículas.',
    decays: 'No decae. Produce transiciones mediadas por W y Z masivos.', formula: '\mathcal L_F=-\frac{G_F}{\sqrt2}J^\mu J^\dagger_\mu', sources: [CERN_FORCES, CERN_UNIFICATION]
  },
  {
    id: 'gravity-force', symbol: 'Gμν', name: 'gravedad', englishName: 'gravitation', family: 'force', zone: 'forces', layer: 'forces', row: 1, column: 4,
    mass: 'No aplica: curvatura/interacción', charge: 'Energía–momento', spin: 'Gravitón: 2 (hipótesis)', interactions: ['gravity'], evidence: 'observed', discovered: '1687–1915 · Newton y Einstein', lifetime: 'Alcance infinito',
    antiparticle: 'Gμν', antiparticleName: 'gravedad', selfConjugate: true, scale: 'Macroscópica; sin escala única', visual: 'field',
    constituents: ['graviton'], constituentSummary: 'Relatividad general observada · gravitón no observado',
    summary: 'Interacción fundamental observada que domina a gran escala. La relatividad general la describe como geometría del espacio-tiempo.',
    composition: 'No pertenece al Modelo Estándar. No existe todavía una teoría cuántica de la gravedad confirmada experimentalmente.',
    role: 'Órbitas, estrellas, galaxias, agujeros negros, expansión cosmológica y estructura del universo.',
    decays: 'No decae. Las perturbaciones se propagan como ondas gravitacionales.', formula: 'G_{\mu\nu}+\Lambda g_{\mu\nu}=\frac{8\pi G}{c^4}T_{\mu\nu}',
    note: 'La gravedad está confirmada; lo hipotético es su cuanto, el gravitón, y la teoría que la unifique con el Modelo Estándar.', sources: [CERN_FORCES]
  }
];
