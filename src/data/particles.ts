import type { Particle, SourceLink, TheoryParticle } from './types';

const PDG: SourceLink = { label: 'Particle Data Group · Review 2026', url: 'https://pdg.lbl.gov/' };
const CERN_SM: SourceLink = { label: 'CERN · The Standard Model', url: 'https://home.cern/science/physics/standard-model/' };
const CERN_HIGGS: SourceLink = { label: 'CERN · The Higgs boson', url: 'https://home.cern/science/physics/higgs-boson/' };

const common = { evidence: 'observed' as const, sources: [PDG, CERN_SM] };

export const particles: Particle[] = [
  {
    ...common, id: 'up', symbol: 'u', name: 'quark arriba', englishName: 'up quark', family: 'quark', generation: 1, row: 1, column: 1,
    mass: '2,16 MeV/c²', massEv: 2.16e6, charge: '+⅔ e', spin: '½', interactions: ['strong', 'electromagnetic', 'weak', 'higgs'],
    discovered: '1968 · evidencia partónica', lifetime: 'Confinado; no se observa libre', antiparticle: 'ū', antiparticleName: 'antiquark arriba', colorCharge: true,
    summary: 'El quark ligero de carga positiva que, junto con el quark abajo, construye protones y neutrones.',
    composition: 'Elemental en el Modelo Estándar. Un protón contiene dos quarks arriba de valencia y uno abajo.', role: 'Materia ordinaria y estructura de los nucleones.',
    decays: 'No posee un decaimiento libre medible: la interacción fuerte lo mantiene confinado en hadrones.', formula: 'Q_u=+\\frac{2}{3}e'
  },
  {
    ...common, id: 'charm', symbol: 'c', name: 'quark encanto', englishName: 'charm quark', family: 'quark', generation: 2, row: 1, column: 2,
    mass: '1,273 GeV/c²', massEv: 1.273e9, charge: '+⅔ e', spin: '½', interactions: ['strong', 'electromagnetic', 'weak', 'higgs'],
    discovered: '1974 · revolución de noviembre', lifetime: 'Confinado; hadrones ~10⁻¹³ s', antiparticle: 'c̄', antiparticleName: 'antiquark encanto', colorCharge: true,
    summary: 'Quark de segunda generación cuya observación confirmó una estructura más rica de la materia.', composition: 'Elemental; aparece ligado en mesones D, charmonio y bariones encantados.',
    role: 'Pruebas de cromodinámica cuántica y física del sabor.', decays: 'Decae por interacción débil dentro de hadrones, normalmente hacia quarks extraños.', formula: 'Q_c=+\\frac{2}{3}e'
  },
  {
    ...common, id: 'top', symbol: 't', name: 'quark cima', englishName: 'top quark', family: 'quark', generation: 3, row: 1, column: 3,
    mass: '≈172,57 GeV/c²', massEv: 172.57e9, charge: '+⅔ e', spin: '½', interactions: ['strong', 'electromagnetic', 'weak', 'higgs'],
    discovered: '1995 · CDF y DØ', lifetime: '≈5 × 10⁻²⁵ s', antiparticle: 't̄', antiparticleName: 'antiquark cima', colorCharge: true,
    summary: 'La partícula elemental más masiva conocida; decae antes de poder formar un hadrón.', composition: 'Elemental. Su vida extremadamente breve permite estudiar un quark casi desnudo.',
    role: 'Sonda privilegiada del Higgs y de nueva física a escalas altas.', decays: 'Casi siempre t → Wb.', formula: 't\\rightarrow W^+b'
  },
  {
    ...common, id: 'down', symbol: 'd', name: 'quark abajo', englishName: 'down quark', family: 'quark', generation: 1, row: 2, column: 1,
    mass: '4,67 MeV/c²', massEv: 4.67e6, charge: '−⅓ e', spin: '½', interactions: ['strong', 'electromagnetic', 'weak', 'higgs'],
    discovered: '1968 · evidencia partónica', lifetime: 'Confinado; no se observa libre', antiparticle: 'd̄', antiparticleName: 'antiquark abajo', colorCharge: true,
    summary: 'El compañero del quark arriba en la primera generación y una pieza esencial de protones y neutrones.', composition: 'Elemental. Un neutrón contiene dos quarks abajo de valencia y uno arriba.',
    role: 'Materia ordinaria, estabilidad nuclear y desintegración beta.', decays: 'En la desintegración beta, un d puede convertirse en u mediante un W⁻ virtual.', formula: 'd\\rightarrow u+W^-'
  },
  {
    ...common, id: 'strange', symbol: 's', name: 'quark extraño', englishName: 'strange quark', family: 'quark', generation: 2, row: 2, column: 2,
    mass: '≈93,4 MeV/c²', massEv: 93.4e6, charge: '−⅓ e', spin: '½', interactions: ['strong', 'electromagnetic', 'weak', 'higgs'],
    discovered: '1947–1968 · extrañeza y quarks', lifetime: 'Confinado; hadrones ~10⁻¹⁰ s', antiparticle: 's̄', antiparticleName: 'antiquark extraño', colorCharge: true,
    summary: 'Quark de segunda generación asociado históricamente a las partículas “extrañas”.', composition: 'Elemental; forma kaones, hiperones y otros hadrones extraños.',
    role: 'Física del sabor, plasmas de quarks y gluones y materia densa.', decays: 'Decae por interacción débil hacia quarks arriba.', formula: 'S(s)=-1'
  },
  {
    ...common, id: 'bottom', symbol: 'b', name: 'quark fondo', englishName: 'bottom quark', family: 'quark', generation: 3, row: 2, column: 3,
    mass: '≈4,183 GeV/c²', massEv: 4.183e9, charge: '−⅓ e', spin: '½', interactions: ['strong', 'electromagnetic', 'weak', 'higgs'],
    discovered: '1977 · Fermilab', lifetime: 'Confinado; hadrones ~10⁻¹² s', antiparticle: 'b̄', antiparticleName: 'antiquark fondo', colorCharge: true,
    summary: 'Quark pesado de tercera generación, central para estudiar la asimetría materia–antimateria.', composition: 'Elemental; forma mesones B y bariones con belleza.',
    role: 'Violación CP, mezclas de sabor y acoplamiento con el Higgs.', decays: 'Decae débilmente, con frecuencia b → c.', formula: 'Q_b=-\\frac{1}{3}e'
  },
  {
    ...common, id: 'electron', symbol: 'e⁻', name: 'electrón', englishName: 'electron', family: 'lepton', generation: 1, row: 3, column: 1,
    mass: '0,51099895 MeV/c²', massEv: 510998.95, charge: '−1 e', spin: '½', interactions: ['electromagnetic', 'weak', 'higgs'],
    discovered: '1897 · J. J. Thomson', lifetime: 'Estable (sin decaimiento observado)', antiparticle: 'e⁺', antiparticleName: 'positrón',
    summary: 'Leptón estable responsable de la electricidad, la química y la estructura electrónica de los átomos.', composition: 'Elemental; no se conoce estructura interna.',
    role: 'Átomos, enlaces químicos, corrientes eléctricas y detectores.', decays: 'No se ha observado su decaimiento.', formula: 'E^2=p^2c^2+m_e^2c^4'
  },
  {
    ...common, id: 'muon', symbol: 'μ⁻', name: 'muón', englishName: 'muon', family: 'lepton', generation: 2, row: 3, column: 2,
    mass: '105,6583755 MeV/c²', massEv: 105.6583755e6, charge: '−1 e', spin: '½', interactions: ['electromagnetic', 'weak', 'higgs'],
    discovered: '1936 · rayos cósmicos', lifetime: '2,1969811 μs', antiparticle: 'μ⁺', antiparticleName: 'antimuón',
    summary: 'Una versión pesada e inestable del electrón que atraviesa grandes espesores de materia.', composition: 'Elemental; pertenece a la segunda generación leptónica.',
    role: 'Tomografía de estructuras, rayos cósmicos y pruebas de precisión.', decays: 'μ⁻ → e⁻ + ν̄ₑ + νμ.', formula: '\\mu^-\\rightarrow e^-+\\bar\\nu_e+\\nu_\\mu'
  },
  {
    ...common, id: 'tau', symbol: 'τ⁻', name: 'tau', englishName: 'tau', family: 'lepton', generation: 3, row: 3, column: 3,
    mass: '1776,93 MeV/c²', massEv: 1.77693e9, charge: '−1 e', spin: '½', interactions: ['electromagnetic', 'weak', 'higgs'],
    discovered: '1975 · SLAC', lifetime: '2,903 × 10⁻¹³ s', antiparticle: 'τ⁺', antiparticleName: 'antitau',
    summary: 'El leptón cargado más pesado; vive tan poco que solo se reconoce a través de sus productos de decaimiento.', composition: 'Elemental; tercera generación leptónica.',
    role: 'Universalidad leptónica y estudios del Higgs.', decays: 'Puede decaer en leptones o hadrones siempre acompañado por neutrinos.', formula: '\\tau^-\\rightarrow W^{-*}+\\nu_\\tau'
  },
  {
    ...common, id: 'electron-neutrino', symbol: 'νₑ', name: 'neutrino electrónico', englishName: 'electron neutrino', family: 'lepton', generation: 1, row: 4, column: 1,
    mass: 'Muy pequeña; no nula', charge: '0', spin: '½', interactions: ['weak', 'higgs'],
    discovered: '1956 · Cowan y Reines', lifetime: 'Estable en el Modelo Estándar mínimo', antiparticle: 'ν̄ₑ', antiparticleName: 'antineutrino electrónico',
    summary: 'Neutrino asociado al electrón; atraviesa materia casi sin interactuar y cambia de sabor al propagarse.', composition: 'Estado de sabor, combinación cuántica de estados de masa.',
    role: 'Fusión solar, desintegración beta y oscilaciones de neutrinos.', decays: 'No se ha observado decaimiento; oscila entre sabores.', formula: '|\\nu_e\\rangle=\\sum_i U_{ei}|\\nu_i\\rangle',
    note: 'Los experimentos miden diferencias entre masas y límites; no una masa única del sabor νₑ.'
  },
  {
    ...common, id: 'muon-neutrino', symbol: 'νμ', name: 'neutrino muónico', englishName: 'muon neutrino', family: 'lepton', generation: 2, row: 4, column: 2,
    mass: 'Muy pequeña; no nula', charge: '0', spin: '½', interactions: ['weak', 'higgs'],
    discovered: '1962 · Brookhaven', lifetime: 'Estable en el Modelo Estándar mínimo', antiparticle: 'ν̄μ', antiparticleName: 'antineutrino muónico',
    summary: 'Neutrino asociado al muón y componente abundante de haces de aceleradores y rayos cósmicos.', composition: 'Estado de sabor, combinación cuántica de estados de masa.',
    role: 'Oscilaciones, astronomía de neutrinos y física de aceleradores.', decays: 'No se ha observado decaimiento; oscila entre sabores.', formula: '|\\nu_\\mu\\rangle=\\sum_i U_{\\mu i}|\\nu_i\\rangle'
  },
  {
    ...common, id: 'tau-neutrino', symbol: 'ντ', name: 'neutrino tauónico', englishName: 'tau neutrino', family: 'lepton', generation: 3, row: 4, column: 3,
    mass: 'Muy pequeña; no nula', charge: '0', spin: '½', interactions: ['weak', 'higgs'],
    discovered: '2000 · DONUT', lifetime: 'Estable en el Modelo Estándar mínimo', antiparticle: 'ν̄τ', antiparticleName: 'antineutrino tauónico',
    summary: 'El sabor de neutrino más difícil de observar directamente, asociado al tau.', composition: 'Estado de sabor, combinación cuántica de estados de masa.',
    role: 'Completa la tercera generación leptónica y prueba las oscilaciones.', decays: 'No se ha observado decaimiento; oscila entre sabores.', formula: '|\\nu_\\tau\\rangle=\\sum_i U_{\\tau i}|\\nu_i\\rangle'
  },
  {
    ...common, id: 'gluon', symbol: 'g', name: 'gluón', englishName: 'gluon', family: 'gauge', row: 1, column: 4,
    mass: '0', massEv: 0, charge: '0', spin: '1', interactions: ['strong'], discovered: '1979 · PETRA', lifetime: 'Estable, pero confinado',
    antiparticle: 'g', antiparticleName: 'gluón', selfConjugate: true, colorCharge: true,
    summary: 'Portador de la interacción fuerte. Hay ocho estados de color de gluón y también interactúan entre sí.', composition: 'Bosón gauge elemental de SU(3)₍C₎.',
    role: 'Mantiene unidos los quarks y domina gran parte de la masa de protones y neutrones.', decays: 'No se observa libre; produce chorros y hadroniza.', formula: 'SU(3)_C\\Rightarrow 8\\;g'
  },
  {
    ...common, id: 'photon', symbol: 'γ', name: 'fotón', englishName: 'photon', family: 'gauge', row: 2, column: 4,
    mass: '0', massEv: 0, charge: '0', spin: '1', interactions: ['electromagnetic'], discovered: '1905–1923 · cuantos de luz', lifetime: 'Estable',
    antiparticle: 'γ', antiparticleName: 'fotón', selfConjugate: true,
    summary: 'Cuanto del campo electromagnético: luz, radio, rayos X y toda radiación electromagnética.', composition: 'Bosón gauge elemental del electromagnetismo.',
    role: 'Transporta la interacción electromagnética y la energía radiante.', decays: 'No decae en el vacío.', formula: 'E=h\\nu=\\frac{hc}{\\lambda}'
  },
  {
    ...common, id: 'z-boson', symbol: 'Z⁰', name: 'bosón Z', englishName: 'Z boson', family: 'gauge', row: 3, column: 4,
    mass: '91,1876 GeV/c²', massEv: 91.1876e9, charge: '0', spin: '1', interactions: ['weak'], discovered: '1983 · UA1 y UA2', lifetime: '≈2,64 × 10⁻²⁵ s',
    antiparticle: 'Z⁰', antiparticleName: 'bosón Z', selfConjugate: true,
    summary: 'Mediador neutro de la interacción débil; puede interactuar con neutrinos sin cambiar su carga.', composition: 'Bosón gauge electrodébil elemental.',
    role: 'Corrientes neutras débiles y medidas de precisión del Modelo Estándar.', decays: 'Decae en pares fermión–antifermión permitidos.', formula: 'm_Z=\\frac{v}{2}\\sqrt{g^2+g\'^2}'
  },
  {
    ...common, id: 'w-boson', symbol: 'W±', name: 'bosón W', englishName: 'W boson', family: 'gauge', row: 4, column: 4,
    mass: '≈80,369 GeV/c²', massEv: 80.369e9, charge: '±1 e', spin: '1', interactions: ['weak', 'electromagnetic'], discovered: '1983 · UA1 y UA2', lifetime: '≈3,16 × 10⁻²⁵ s',
    antiparticle: 'W∓', antiparticleName: 'bosón W∓',
    summary: 'Mediador cargado de la interacción débil, capaz de transformar sabores de quarks y leptones.', composition: 'Par de bosones gauge electrodébiles elementales W⁺ y W⁻.',
    role: 'Desintegración beta, fusión estelar y decaimientos de partículas.', decays: 'Decae en un leptón y neutrino o en pares de quarks.', formula: 'm_W=\\frac{gv}{2}'
  },
  {
    ...common, sources: [PDG, CERN_HIGGS], id: 'higgs', symbol: 'H', name: 'bosón de Higgs', englishName: 'Higgs boson', family: 'scalar', row: 2, column: 5,
    mass: '≈125,20 GeV/c²', massEv: 125.20e9, charge: '0', spin: '0', interactions: ['higgs', 'weak'], discovered: '2012 · ATLAS y CMS', lifetime: '≈10⁻²² s',
    antiparticle: 'H', antiparticleName: 'bosón de Higgs', selfConjugate: true,
    summary: 'Excitación del campo de Higgs, responsable de la ruptura espontánea de la simetría electrodébil.', composition: 'Bosón escalar elemental; la única partícula elemental conocida con spin 0.',
    role: 'Permite que W, Z y los fermiones adquieran masa mediante sus acoplamientos al campo de Higgs.', decays: 'Se desintegra por múltiples canales; bb̄ es el más frecuente.', formula: 'm_f=\\frac{y_fv}{\\sqrt{2}}',
    note: 'La mayor parte de la masa de protones y neutrones procede de la energía de la interacción fuerte, no directamente del Higgs.'
  }
];

export const theoryParticles: TheoryParticle[] = [
  {
    id: 'graviton', symbol: 'G?', name: 'gravitón', englishName: 'graviton', family: 'theory', row: 1, column: 1,
    mass: '0 (si existe en la forma mínima)', charge: '0', spin: '2', interactions: ['gravity'], evidence: 'hypothetical', discovered: 'No observado', lifetime: 'Hipotéticamente estable',
    antiparticle: 'G?', antiparticleName: 'gravitón', selfConjugate: true, summary: 'Cuanto hipotético del campo gravitatorio en enfoques de gravedad cuántica.',
    composition: 'No pertenece al Modelo Estándar.', role: 'Mediaría la gravedad a nivel cuántico.', decays: 'No establecido.', formula: 'g_{\\mu\\nu}=\\eta_{\\mu\\nu}+\\kappa h_{\\mu\\nu}',
    theory: 'Gravedad cuántica', confidence: 'Hipótesis sin detección experimental', sources: [CERN_SM]
  },
  {
    id: 'neutralino', symbol: 'χ̃⁰', name: 'neutralino', englishName: 'neutralino', family: 'theory', row: 1, column: 2,
    mass: 'Desconocida', charge: '0', spin: '½', interactions: ['weak', 'higgs'], evidence: 'hypothetical', discovered: 'No observado', lifetime: 'Depende del modelo',
    antiparticle: 'χ̃⁰', antiparticleName: 'neutralino', selfConjugate: true, summary: 'Mezcla hipotética de compañeros supersimétricos neutros; candidato histórico a materia oscura.',
    composition: 'Combinación de bino, wino neutro e higgsinos en el MSSM.', role: 'Posible partícula supersimétrica más ligera.', decays: 'Depende de la ruptura de supersimetría.', formula: '\\tilde\\chi_i^0=N_{ij}\\psi_j^0',
    theory: 'Supersimetría (MSSM)', confidence: 'Sin evidencia experimental', sources: [PDG]
  },
  {
    id: 'gluino', symbol: 'g̃', name: 'gluino', englishName: 'gluino', family: 'theory', row: 1, column: 3,
    mass: 'Desconocida; límites en TeV dependen del modelo', charge: '0', spin: '½', interactions: ['strong'], evidence: 'hypothetical', discovered: 'No observado', lifetime: 'Depende del modelo',
    antiparticle: 'g̃', antiparticleName: 'gluino', selfConjugate: true, colorCharge: true, summary: 'Compañero supersimétrico fermiónico del gluón.',
    composition: 'Partícula elemental hipotética del MSSM.', role: 'Extendería el sector fuerte a una teoría supersimétrica.', decays: 'Canales dependientes del espectro supersimétrico.', formula: 'g\\;(1)\\leftrightarrow\\tilde g\\;(\\tfrac12)',
    theory: 'Supersimetría', confidence: 'Sin evidencia experimental', sources: [PDG]
  },
  {
    id: 'sfermions', symbol: 'q̃ / ℓ̃', name: 'squarks y sleptones', englishName: 'sfermions', family: 'theory', row: 1, column: 4,
    mass: 'Desconocida', charge: 'Según su compañero', spin: '0', interactions: ['strong', 'electromagnetic', 'weak', 'higgs'], evidence: 'hypothetical', discovered: 'No observados', lifetime: 'Depende del modelo',
    antiparticle: 'q̃* / ℓ̃*', antiparticleName: 'antisfermiones', summary: 'Compañeros escalares propuestos para quarks y leptones.', composition: 'Una familia hipotética por cada quark y leptón, con mezcla posible.',
    role: 'Cancelarían correcciones cuánticas que desestabilizan la masa del Higgs.', decays: 'Dependientes del espectro supersimétrico.', formula: 'f\\;(\\tfrac12)\\leftrightarrow\\tilde f\\;(0)',
    theory: 'Supersimetría', confidence: 'Sin evidencia experimental', sources: [PDG]
  },
  {
    id: 'gravitino', symbol: 'G̃', name: 'gravitino', englishName: 'gravitino', family: 'theory', row: 1, column: 5,
    mass: 'Dependiente del modelo', charge: '0', spin: '3/2', interactions: ['gravity'], evidence: 'hypothetical', discovered: 'No observado', lifetime: 'Depende del modelo',
    antiparticle: 'G̃', antiparticleName: 'gravitino', selfConjugate: true, summary: 'Compañero supersimétrico hipotético del gravitón en supergravedad.', composition: 'Campo de Rarita–Schwinger en formulaciones de supergravedad.',
    role: 'Conecta supersimetría local y gravedad.', decays: 'Dependientes del mecanismo de ruptura supersimétrica.', formula: 'G\\;(2)\\leftrightarrow\\tilde G\\;(\\tfrac32)',
    theory: 'Supergravedad', confidence: 'Sin evidencia experimental', sources: [CERN_SM, PDG]
  }
];

export const interactionLabels = {
  strong: 'fuerte', electromagnetic: 'electromagnética', weak: 'débil', higgs: 'Higgs', gravity: 'gravedad'
} as const;
