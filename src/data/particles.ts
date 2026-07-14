import type { Particle, SourceLink, TheoryParticle } from './types';

const PDG: SourceLink = { label: 'Particle Data Group · Review 2026', url: 'https://pdg.lbl.gov/' };
const CERN_SM: SourceLink = { label: 'CERN · The Standard Model', url: 'https://home.cern/science/physics/standard-model/' };
const CERN_HIGGS: SourceLink = { label: 'CERN · The Higgs boson', url: 'https://home.cern/science/physics/higgs-boson/' };
const CERN_SUSY: SourceLink = { label: 'CERN · Supersymmetry', url: 'https://home.cern/science/physics/supersymmetry/' };
const NIST_PLANCK: SourceLink = { label: 'NIST · CODATA Planck length', url: 'https://physics.nist.gov/cgi-bin/cuu/Value?plkl=' };
const CERN_EXTRA_DIMENSIONS: SourceLink = { label: 'CERN · Extra dimensions and Kaluza–Klein states', url: 'https://home.cern/science/physics/extra-dimensions-gravitons-and-tiny-black-holes/' };
const CERN_EXOTIC_HADRONS: SourceLink = { label: 'CERN · Bestiary of exotic hadrons', url: 'https://home.cern/bestiary-exotic-hadrons/' };
const ATLAS_LEPTOQUARK: SourceLink = { label: 'ATLAS · Direct searches for leptoquarks', url: 'https://atlas.cern/Tags/leptoquarks' };
const CMS_HNL: SourceLink = { label: 'CMS · Search for heavy neutral leptons', url: 'https://arxiv.org/abs/2403.00100' };
const ATLAS_HEAVY: SourceLink = { label: 'ATLAS · Searches for new high-mass particles', url: 'https://atlas.cern/Updates/Briefing/Search-High-Mass-Particles' };
const ATLAS_DARK_MESONS: SourceLink = { label: 'ATLAS · Direct search for dark mesons', url: 'https://atlas.cern/Updates/Briefing/Dark-Mesons' };
const ATLAS_LHCP2024: SourceLink = { label: 'ATLAS · Exotic new-physics searches at LHCP 2024', url: 'https://atlas.cern/Updates/News/Summary-LHCP-2024' };
const CERN_MOEDAL: SourceLink = { label: 'CERN · MoEDAL-MAPP exotic-particle programme', url: 'https://home.cern/science/experiments/moedal-mapp/' };
const NATURE_ATOMIC_TRANSISTOR: SourceLink = { label: 'Nature Communications · Atomic transistors', url: 'https://www.nature.com/articles/s41467-022-32582-9' };

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
  },
  {
    id: 'chargino', symbol: 'χ̃±', name: 'chargino', englishName: 'chargino', family: 'theory', row: 2, column: 1,
    mass: 'Desconocida', charge: '±1 e', spin: '½', interactions: ['electromagnetic', 'weak', 'higgs'], evidence: 'hypothetical', discovered: 'No observado', lifetime: 'Depende del modelo',
    antiparticle: 'χ̃∓', antiparticleName: 'chargino de carga opuesta', summary: 'Estado cargado supersimétrico formado por winos e higgsinos cargados.', composition: 'Mezcla hipotética del sector electrodébil supersimétrico.',
    role: 'Completaría el sector de electroweakinos junto a los neutralinos.', decays: 'Depende del espectro supersimétrico.', formula: '\\tilde\\chi_i^\\pm=V_{ij}\\psi_j^\\pm',
    theory: 'Supersimetría (MSSM)', confidence: 'Sin evidencia experimental', sources: [CERN_SUSY, PDG]
  },
  {
    id: 'axion', symbol: 'a?', name: 'axión', englishName: 'axion', family: 'theory', row: 2, column: 2,
    mass: 'Muy pequeña; desconocida', charge: '0', spin: '0', interactions: ['electromagnetic'], evidence: 'hypothetical', discovered: 'No observado', lifetime: 'Potencialmente estable',
    antiparticle: 'a?', antiparticleName: 'axión', selfConjugate: true, summary: 'Partícula hipotética propuesta para resolver el problema CP fuerte y posible candidata a materia oscura.', composition: 'Bosón pseudoescalar hipotético.',
    role: 'Conectaría física de partículas, cosmología y materia oscura.', decays: 'Dependientes de la masa y los acoplamientos.', formula: '\\mathcal L\\supset-\\frac14g_{a\\gamma\\gamma}aF\\tilde F',
    theory: 'Peccei–Quinn / axiones', confidence: 'Búsquedas activas; sin detección confirmada', sources: [PDG]
  },
  {
    id: 'sterile-neutrino', symbol: 'νₛ?', name: 'neutrino estéril', englishName: 'sterile neutrino', family: 'theory', row: 2, column: 3,
    mass: 'Desconocida', charge: '0', spin: '½', interactions: ['higgs'], evidence: 'hypothetical', discovered: 'No observado', lifetime: 'Depende del modelo',
    antiparticle: 'ν̄ₛ?', antiparticleName: 'antineutrino estéril', summary: 'Neutrino hipotético que no participaría directamente en la interacción débil ordinaria.', composition: 'Fermión neutro adicional; podría mezclarse con neutrinos activos.',
    role: 'Posible origen de masas de neutrinos y candidato cosmológico.', decays: 'Dependientes de su masa y mezcla.', formula: '\\nu_\\alpha=\\sum_iU_{\\alpha i}\\nu_i',
    theory: 'Extensiones del sector neutrino', confidence: 'Sin evidencia concluyente', sources: [PDG]
  },
  {
    id: 'dark-photon', symbol: 'A′?', name: 'fotón oscuro', englishName: 'dark photon', family: 'theory', row: 2, column: 4,
    mass: 'Desconocida', charge: '0', spin: '1', interactions: ['electromagnetic'], evidence: 'hypothetical', discovered: 'No observado', lifetime: 'Depende del modelo',
    antiparticle: 'A′?', antiparticleName: 'fotón oscuro', selfConjugate: true, summary: 'Bosón gauge hipotético de un sector oscuro que podría mezclarse débilmente con el fotón.', composition: 'Mediador vectorial hipotético de una simetría U(1) adicional.',
    role: 'Portal posible entre materia ordinaria y materia oscura.', decays: 'Dependientes de masa y mezcla cinética.', formula: '\\mathcal L\\supset-\\frac{\\varepsilon}{2}F_{\\mu\\nu}F^{\\prime\\mu\\nu}',
    theory: 'Sectores oscuros', confidence: 'Sin detección confirmada', sources: [PDG]
  },
  {
    id: 'monopole', symbol: 'M?', name: 'monopolo magnético', englishName: 'magnetic monopole', family: 'theory', row: 2, column: 5,
    mass: 'Desconocida', charge: 'Carga magnética', spin: 'Depende del modelo', interactions: ['electromagnetic'], evidence: 'hypothetical', discovered: 'No observado', lifetime: 'Potencialmente estable',
    antiparticle: 'M̄?', antiparticleName: 'antimonopolo magnético', summary: 'Objeto hipotético con un único polo magnético, predicho por varias teorías de gran unificación.', composition: 'Solitón o partícula, según la teoría.',
    role: 'Explicaría la cuantización de la carga eléctrica.', decays: 'No establecido.', formula: 'eg=\\frac{n\\hbar c}{2}',
    theory: 'Gran unificación / Dirac', confidence: 'Sin detección experimental', sources: [PDG]
  },
  {
    id: 'leptoquark', symbol: 'LQ?', name: 'leptoquark', englishName: 'leptoquark', family: 'theory', zone: 'beyond', layer: 'collider-candidates', row: 3, column: 1,
    mass: 'Desconocida; límites dependen del modelo', charge: 'Fraccionaria según el estado', spin: '0 o 1', interactions: ['strong', 'electromagnetic', 'weak', 'higgs'], evidence: 'hypothetical', discovered: 'Buscado en ATLAS y CMS · no observado', lifetime: 'Dependiente del acoplamiento',
    antiparticle: 'LQ̄?', antiparticleName: 'antileptoquark', colorCharge: true, summary: 'Bosón hipotético que conectaría directamente los sectores de quarks y leptones.', composition: 'Partícula elemental o compuesta según el modelo; transportaría simultáneamente números cuánticos leptónicos y de color.',
    role: 'Aparece en teorías de gran unificación y en explicaciones de posibles anomalías de sabor.', decays: 'Se buscaría en pares quark–leptón y firmas resonantes.', formula: '\\mathcal L\\supset\\lambda\\,LQ\\,\\bar q\\ell',
    theory: 'Gran unificación / extensiones del sabor', confidence: 'Búsquedas directas activas; sin señal confirmada', sources: [ATLAS_LEPTOQUARK, PDG]
  },
  {
    id: 'heavy-neutral-lepton', symbol: 'N?', name: 'leptón neutro pesado', englishName: 'heavy neutral lepton', family: 'theory', zone: 'beyond', layer: 'collider-candidates', row: 3, column: 2,
    mass: 'Desde MeV hasta TeV según el modelo', charge: '0', spin: '½', interactions: ['weak', 'higgs'], evidence: 'hypothetical', discovered: 'Buscado por CMS y otros experimentos · no observado', lifetime: 'Puede ser larga si la mezcla es pequeña',
    antiparticle: 'N̄?', antiparticleName: 'antileptón neutro pesado', summary: 'Estado neutro pesado, de tipo Dirac o Majorana, que podría mezclarse con los neutrinos conocidos.', composition: 'Fermión adicional; generaliza la idea de neutrino estéril a regímenes de masa accesibles a colisionadores.',
    role: 'Podría explicar masas de neutrinos y contribuir a la asimetría materia–antimateria.', decays: 'Podría producir vértices desplazados o estados con varios leptones.', formula: '\\nu_\\alpha=U_{\\alpha i}\\nu_i+V_{\\alpha N}N',
    theory: 'Mecanismos seesaw / sector neutrino', confidence: 'CMS no observa evidencia y publica límites sobre la mezcla', sources: [CMS_HNL, PDG]
  },
  {
    id: 'z-prime', symbol: 'Z′?', name: 'bosón Z prima', englishName: 'Z-prime boson', family: 'theory', zone: 'beyond', layer: 'collider-candidates', row: 3, column: 3,
    mass: 'Desconocida; típicamente alta en búsquedas LHC', charge: '0', spin: '1', interactions: ['weak', 'higgs'], evidence: 'hypothetical', discovered: 'Buscado en resonancias y jets oscuros · no observado', lifetime: 'Dependiente del modelo',
    antiparticle: 'Z′?', antiparticleName: 'bosón Z prima', selfConjugate: true, summary: 'Bosón gauge neutro adicional asociado a una posible nueva simetría U(1).', composition: 'Mediador vectorial elemental hipotético.',
    role: 'Podría conectar el sector visible con materia oscura o revelar una fuerza adicional.', decays: 'Se busca en pares de leptones, quarks o chorros oscuros.', formula: '\\mathcal L\\supset g_{Z^\\prime}Z^\\prime_\\mu J^\\mu',
    theory: 'Simetrías gauge extendidas / sectores oscuros', confidence: 'Sin resonancia confirmada', sources: [ATLAS_HEAVY, ATLAS_DARK_MESONS]
  },
  {
    id: 'w-prime', symbol: 'W′?', name: 'bosón W prima', englishName: 'W-prime boson', family: 'theory', zone: 'beyond', layer: 'collider-candidates', row: 3, column: 4,
    mass: 'Desconocida; típicamente alta en búsquedas LHC', charge: '±1 e', spin: '1', interactions: ['electromagnetic', 'weak', 'higgs'], evidence: 'hypothetical', discovered: 'Buscado como bosón vectorial pesado · no observado', lifetime: 'Dependiente del modelo',
    antiparticle: 'W′∓?', antiparticleName: 'bosón W prima de carga opuesta', summary: 'Bosón cargado pesado adicional, análogo extendido del W.', composition: 'Mediador vectorial hipotético de grupos gauge ampliados.',
    role: 'Probaría nuevas simetrías electrodébiles o sectores de bosones vectoriales pesados.', decays: 'Se busca en leptón–neutrino, quarks y pares de bosones.', formula: '\\mathcal L\\supset g^\\prime W_\\mu^{\\prime}J^\\mu',
    theory: 'Gauge extendido / tripletes vectoriales pesados', confidence: 'Sin señal confirmada', sources: [ATLAS_HEAVY, PDG]
  },
  {
    id: 'vector-like-quark', symbol: 'T/B?', name: 'quark vectorial pesado', englishName: 'vector-like quark', family: 'theory', zone: 'beyond', layer: 'collider-candidates', row: 3, column: 5,
    mass: 'Desconocida; búsquedas en el régimen TeV', charge: 'Según el estado', spin: '½', interactions: ['strong', 'electromagnetic', 'weak', 'higgs'], evidence: 'hypothetical', discovered: 'Buscado por ATLAS y CMS · no observado', lifetime: 'Dependiente de mezcla y masa',
    antiparticle: 'T̄/B̄?', antiparticleName: 'antiquark vectorial pesado', colorCharge: true, summary: 'Quark hipotético cuyos componentes quirales transformarían igual bajo la interacción electrodébil.', composition: 'Fermión coloreado adicional, no una cuarta generación ordinaria.',
    role: 'Aparece en modelos de Higgs compuesto, dimensiones extra y soluciones al problema de naturalidad.', decays: 'Podría decaer a quarks junto con W, Z o Higgs.', formula: '\\mathcal L\\supset-M_Q\\bar QQ',
    theory: 'Quarks vectoriales / Higgs compuesto', confidence: 'Búsquedas directas activas; sin detección', sources: [ATLAS_LHCP2024, PDG]
  },
  {
    id: 'dark-higgs', symbol: 'hᴅ?', name: 'Higgs oscuro', englishName: 'dark Higgs boson', family: 'theory', zone: 'beyond', layer: 'dark-sector', row: 4, column: 1,
    mass: 'Desconocida', charge: 'Habitualmente 0', spin: '0', interactions: ['higgs'], evidence: 'hypothetical', discovered: 'No observado', lifetime: 'Dependiente de los portales',
    antiparticle: 'hᴅ?', antiparticleName: 'Higgs oscuro', selfConjugate: true, summary: 'Escalar hipotético que rompería una simetría en un sector oscuro y podría mezclarse con el Higgs conocido.', composition: 'Bosón escalar elemental hipotético.',
    role: 'Daría masa a partículas oscuras y proporcionaría un portal con el Modelo Estándar.', decays: 'Canales visibles o invisibles según la mezcla.', formula: '\\mathcal L\\supset\\lambda_{HS}|H|^2|S|^2',
    theory: 'Portal del Higgs / sectores oscuros', confidence: 'Sin detección confirmada', sources: [ATLAS_LHCP2024, PDG]
  },
  {
    id: 'dark-meson', symbol: 'πᴅ?', name: 'mesón oscuro', englishName: 'dark meson', family: 'theory', zone: 'beyond', layer: 'dark-sector', row: 4, column: 2,
    mass: 'Desconocida', charge: 'Bajo una fuerza oscura', spin: '0 o 1', interactions: ['higgs'], evidence: 'hypothetical', discovered: 'Primera búsqueda directa de ATLAS en 2024 · no observado', lifetime: 'Puede ser larga',
    antiparticle: 'π̄ᴅ?', antiparticleName: 'antimesón oscuro', summary: 'Estado compuesto hipotético de constituyentes oscuros, análogo a piones o rho de QCD.', composition: 'Partícula compuesta dentro de una posible fuerza confinante oscura.',
    role: 'Proporcionaría una estructura interna para parte de la materia oscura.', decays: 'Podría producir chorros oscuros o decaer a quarks pesados mediante un portal.', formula: '\\pi_D\\sim\\bar q_Dq_D',
    theory: 'QCD oscura / valle oculto', confidence: 'ATLAS no observa señal y establece límites', sources: [ATLAS_DARK_MESONS]
  },
  {
    id: 'q-ball', symbol: 'Q?', name: 'Q-ball', englishName: 'Q-ball', family: 'theory', zone: 'beyond', layer: 'collider-candidates', row: 4, column: 3,
    mass: 'Macroscópica o subatómica según el modelo', charge: 'Conservada; puede ser grande', spin: 'Solitón escalar', interactions: ['electromagnetic', 'higgs'], evidence: 'hypothetical', discovered: 'Buscado por detectores de exóticas · no observado', lifetime: 'Potencialmente estable',
    antiparticle: 'Q̄?', antiparticleName: 'anti-Q-ball', summary: 'Solitón no topológico hipotético formado por un campo escalar con una carga global conservada.', composition: 'Configuración colectiva de campo, no una partícula puntual elemental.',
    role: 'Candidato en cosmología, materia oscura y algunos escenarios supersimétricos.', decays: 'Dependiente del potencial y de la carga.', formula: 'Q=\\int d^3x\\,j^0',
    theory: 'Solitones no topológicos', confidence: 'Programa de búsqueda reconocido; sin detección', sources: [CERN_MOEDAL, PDG]
  },
  {
    id: 'dyon', symbol: 'Dᵍ?', name: 'dyon', englishName: 'dyon', family: 'theory', zone: 'beyond', layer: 'collider-candidates', row: 4, column: 4,
    mass: 'Desconocida', charge: 'Eléctrica y magnética', spin: 'Dependiente del modelo', interactions: ['electromagnetic'], evidence: 'hypothetical', discovered: 'Buscado por MoEDAL-MAPP · no observado', lifetime: 'Potencialmente estable',
    antiparticle: 'D̄ᵍ?', antiparticleName: 'antidyon', summary: 'Objeto hipotético que portaría simultáneamente carga eléctrica y magnética.', composition: 'Partícula o solitón según el marco teórico.',
    role: 'Extiende la idea del monopolo y aparece en teorías gauge y dualidades.', decays: 'No establecido.', formula: '(q,g)\\neq(0,0)',
    theory: 'Teorías gauge / dualidad eléctrica-magnética', confidence: 'Sin detección experimental', sources: [CERN_MOEDAL, PDG]
  },
  {
    id: 'micro-black-hole', symbol: 'μBH?', name: 'microagujero negro', englishName: 'microscopic black hole', family: 'theory', zone: 'beyond', layer: 'quantum-gravity', row: 4, column: 5,
    mass: 'Dependiente de la escala de gravedad', charge: 'Variable', spin: 'Variable', interactions: ['gravity'], evidence: 'hypothetical', discovered: 'Buscado en escenarios de dimensiones extra · no observado', lifetime: 'Hipotéticamente muy breve',
    antiparticle: 'μBH?', antiparticleName: 'microagujero negro', selfConjugate: true, summary: 'Objeto gravitatorio microscópico que podría producirse a energías accesibles sólo en ciertos modelos de dimensiones extra.', composition: 'Estado de curvatura extrema, no partícula elemental ordinaria.',
    role: 'Señal espectacular de una escala de gravedad efectiva mucho menor que la de Planck convencional.', decays: 'Se esperaría evaporación o estados finales múltiples, dependiendo del modelo.', formula: 'r_s^{(4+n)}\\sim M_D^{-1}(M/M_D)^{1/(n+1)}',
    theory: 'Dimensiones extra / gravedad cuántica', confidence: 'Escenario especulativo con búsquedas directas y sin señal', sources: [CERN_EXTRA_DIMENSIONS]
  },
  {
    id: 'kk-excitation', symbol: 'KK?', name: 'estado Kaluza–Klein', englishName: 'Kaluza–Klein state', family: 'theory', zone: 'beyond', layer: 'quantum-gravity', row: 5, column: 1,
    mass: 'Torre discreta dependiente de la compactificación', charge: 'Como el campo original', spin: 'Como el modo original', interactions: ['gravity', 'weak'], evidence: 'hypothetical', discovered: 'Buscado en resonancias de alta masa · no observado', lifetime: 'Dependiente del modelo',
    antiparticle: 'KK̄?', antiparticleName: 'antiestado Kaluza–Klein', summary: 'Excitación pesada que aparecería si campos o gravedad se propagaran por dimensiones espaciales compactas.', composition: 'Modo de momento cuantizado en una dimensión adicional.',
    role: 'Convertiría dimensiones extra en una torre observable de copias pesadas.', decays: 'Podría decaer a partículas del Modelo Estándar.', formula: 'm_n^2=m_0^2+n^2/R^2',
    theory: 'Kaluza–Klein / dimensiones extra', confidence: 'CERN describe firmas buscadas; sin detección', sources: [CERN_EXTRA_DIMENSIONS, ATLAS_HEAVY]
  },
  {
    id: 'radion', symbol: 'φʀ?', name: 'radion', englishName: 'radion', family: 'theory', zone: 'beyond', layer: 'quantum-gravity', row: 5, column: 2,
    mass: 'Desconocida', charge: '0', spin: '0', interactions: ['higgs', 'gravity'], evidence: 'hypothetical', discovered: 'Buscado por ATLAS en resonancias · no observado', lifetime: 'Dependiente del modelo',
    antiparticle: 'φʀ?', antiparticleName: 'radion', selfConjugate: true, summary: 'Campo escalar hipotético asociado al tamaño o separación de dimensiones extra.', composition: 'Modo geométrico efectivo de una compactificación.',
    role: 'Estabilizaría la geometría de modelos tipo Randall–Sundrum y podría mezclarse con el Higgs.', decays: 'Podría decaer a pares de bosones o Higgs.', formula: '\\phi_R\\propto\\delta R(x)',
    theory: 'Dimensiones extra de Randall–Sundrum', confidence: 'Sin resonancia confirmada', sources: [ATLAS_HEAVY, CERN_EXTRA_DIMENSIONS]
  }
];

export const compositeParticles: Particle[] = [
  {
    id: 'atom', symbol: 'A', name: 'átomo', englishName: 'atom', family: 'composite', zone: 'atom', layer: 'composites', row: 1, column: 3,
    mass: 'Depende del elemento y del isótopo', charge: '0 en un átomo neutro', spin: 'Depende del estado', interactions: ['strong', 'electromagnetic', 'weak', 'higgs'], evidence: 'observed', discovered: '1803–1932 · de Dalton al neutrón', lifetime: 'Estable o radiactivo según el núcleo',
    antiparticle: 'Ā', antiparticleName: 'antiátomo', visual: 'atom', scale: '≈10⁻¹⁰ m', constituents: ['proton', 'neutron', 'electron'],
    constituentSummary: 'Z protones + N neutrones + Z electrones en el estado neutro', summary: 'Ficha didáctica general que representa un átomo con núcleo y nube electrónica, sin limitarse a un elemento concreto.',
    composition: 'El núcleo contiene protones y neutrones; los electrones ocupan estados cuánticos ligados por electromagnetismo. El número de neutrones varía entre isótopos y algunos núcleos no contienen ninguno.',
    role: 'Punto de partida para recorrer desde la materia química hasta nucleones, quarks, leptones y campos.', decays: 'El átomo puede ser estable, ionizarse o sufrir transformaciones nucleares según el isótopo.',
    formula: 'A=Z+N,\\qquad {}^A_ZX', note: 'No representa un elemento real concreto: reúne deliberadamente protón, neutrón y electrón para mostrar el árbol completo de composición.', sources: [PDG, CERN_SM]
  },
  {
    id: 'proton', symbol: 'p', name: 'protón', englishName: 'proton', family: 'composite', zone: 'composite', layer: 'composites', row: 1, column: 2,
    mass: '938,272 MeV/c²', charge: '+1 e', spin: '½', interactions: ['strong', 'electromagnetic', 'weak', 'higgs'], evidence: 'observed', discovered: '1917–1919 · Rutherford', lifetime: 'Estable en las medidas actuales',
    antiparticle: 'p̄', antiparticleName: 'antiprotón', visual: 'proton', scale: '≈0,84 fm', constituents: ['up', 'up', 'down', 'gluon'],
    constituentSummary: 'uud de valencia + mar de quarks y gluones', summary: 'Barión estable que forma los núcleos atómicos y posee estructura interna dinámica.', composition: 'Dos quarks arriba y uno abajo de valencia, inmersos en gluones y pares quark–antiquark.',
    role: 'Junto con el neutrón construye los núcleos; su número define el elemento químico.', decays: 'No se ha observado su decaimiento.', formula: '|p\\rangle=|uud+g+q\\bar q\\rangle',
    note: 'La imagen de tres bolitas es didáctica: el protón real es un sistema cuántico dinámico.', sources: [PDG, CERN_SM]
  },
  {
    id: 'neutron', symbol: 'n', name: 'neutrón', englishName: 'neutron', family: 'composite', zone: 'composite', layer: 'composites', row: 1, column: 3,
    mass: '939,565 MeV/c²', charge: '0', spin: '½', interactions: ['strong', 'weak', 'higgs'], evidence: 'observed', discovered: '1932 · Chadwick', lifetime: '≈879,4 s cuando está libre',
    antiparticle: 'n̄', antiparticleName: 'antineutrón', visual: 'neutron', scale: '≈0,8 fm', constituents: ['up', 'down', 'down', 'gluon'],
    constituentSummary: 'udd de valencia + mar de quarks y gluones', summary: 'Barión neutro que estabiliza muchos núcleos y decae cuando permanece libre.', composition: 'Un quark arriba y dos abajo de valencia, además de gluones y pares virtuales.',
    role: 'Estructura nuclear, radiactividad beta y nucleosíntesis.', decays: 'n → p + e⁻ + ν̄ₑ.', formula: 'n\\rightarrow p+e^-+\\bar\\nu_e', sources: [PDG, CERN_SM]
  },
  {
    id: 'pion-plus', symbol: 'π⁺', name: 'pión positivo', englishName: 'positive pion', family: 'composite', zone: 'composite', layer: 'composites', row: 1, column: 4,
    mass: '139,570 MeV/c²', charge: '+1 e', spin: '0', interactions: ['strong', 'electromagnetic', 'weak', 'higgs'], evidence: 'observed', discovered: '1947 · rayos cósmicos', lifetime: '≈2,60 × 10⁻⁸ s',
    antiparticle: 'π⁻', antiparticleName: 'pión negativo', visual: 'field', scale: '<1 fm', constituents: ['up', 'down'],
    constituentSummary: 'u + d̄', summary: 'Partícula subatómica compuesta: es el mesón cargado más ligero y ayuda a describir la fuerza nuclear residual entre nucleones.', composition: 'Un quark arriba y un antiquark abajo en un estado ligado. No forma parte de las 17 partículas elementales porque tiene estructura interna.',
    role: 'Interacción nuclear residual, rayos cósmicos y cascadas de partículas.', decays: 'π⁺ → μ⁺ + νμ.', formula: '\\pi^+=u\\bar d', note: '“Mesón” significa un hadrón formado, en su descripción de valencia, por un quark y un antiquark.', sources: [PDG]
  },
  {
    id: 'deuteron', symbol: 'd', name: 'deuterón', englishName: 'deuteron', family: 'composite', zone: 'composite', layer: 'composites', row: 2, column: 2,
    mass: '1875,613 MeV/c²', charge: '+1 e', spin: '1', interactions: ['strong', 'electromagnetic', 'weak', 'higgs'], evidence: 'observed', discovered: '1931–1932 · deuterio', lifetime: 'Estable',
    antiparticle: 'd̄', antiparticleName: 'antideuterón', visual: 'field', scale: '≈2 fm', constituents: ['proton', 'neutron'], constituentSummary: '1 protón + 1 neutrón',
    summary: 'Núcleo del deuterio: el sistema nuclear ligado más sencillo.', composition: 'Un protón y un neutrón ligados por la interacción nuclear residual.', role: 'Fusión, nucleosíntesis y pruebas de fuerzas nucleares.',
    decays: 'Estable.', formula: 'd=p+n-2{,}224\\;\\mathrm{MeV}', sources: [PDG]
  },
  {
    id: 'alpha-particle', symbol: 'α', name: 'partícula alfa', englishName: 'alpha particle', family: 'composite', zone: 'composite', layer: 'composites', row: 2, column: 3,
    mass: '3727,38 MeV/c²', charge: '+2 e', spin: '0', interactions: ['strong', 'electromagnetic', 'weak', 'higgs'], evidence: 'observed', discovered: '1899–1908 · Rutherford', lifetime: 'Estable',
    antiparticle: 'ᾱ', antiparticleName: 'antipartícula alfa', visual: 'field', scale: '≈1,7 fm', constituents: ['proton', 'neutron'], constituentSummary: '2 protones + 2 neutrones',
    summary: 'Núcleo de helio-4 emitido en ciertas desintegraciones radiactivas.', composition: 'Dos protones y dos neutrones fuertemente ligados.', role: 'Radiactividad alfa, nucleosíntesis y estructura nuclear.',
    decays: 'Estable como núcleo aislado.', formula: '\\alpha={}^4_2\\mathrm{He}^{2+}', sources: [PDG]
  },
  {
    id: 'pion-zero', symbol: 'π⁰', name: 'pión neutro', englishName: 'neutral pion', family: 'composite', zone: 'composite', layer: 'composites', row: 2, column: 4,
    mass: '134,977 MeV/c²', charge: '0', spin: '0', interactions: ['strong', 'electromagnetic', 'weak', 'higgs'], evidence: 'observed', discovered: '1950 · aceleradores', lifetime: '≈8,4 × 10⁻¹⁷ s',
    antiparticle: 'π⁰', antiparticleName: 'pión neutro', selfConjugate: true, visual: 'field', scale: '<1 fm', constituents: ['up', 'down'], constituentSummary: 'superposición uū y dd̄',
    summary: 'Mesón neutro muy breve relacionado con la interacción nuclear residual.', composition: 'Superposición cuántica de pares quark–antiquark ligeros.', role: 'Física hadrónica y producción de fotones.',
    decays: 'Casi siempre π⁰ → γγ.', formula: '|\\pi^0\\rangle\\simeq\\frac{|u\\bar u\\rangle-|d\\bar d\\rangle}{\\sqrt2}', sources: [PDG]
  },
  {
    id: 'kaon-plus', symbol: 'K⁺', name: 'kaón positivo', englishName: 'positive kaon', family: 'composite', zone: 'composite', layer: 'composites', row: 2, column: 5,
    mass: '493,677 MeV/c²', charge: '+1 e', spin: '0', interactions: ['strong', 'electromagnetic', 'weak', 'higgs'], evidence: 'observed', discovered: '1947 · rayos cósmicos', lifetime: '≈1,24 × 10⁻⁸ s',
    antiparticle: 'K⁻', antiparticleName: 'kaón negativo', visual: 'field', scale: '<1 fm', constituents: ['up', 'strange'], constituentSummary: 'u + s̄',
    summary: 'Mesón extraño que reveló nuevas reglas de conservación y ayudó a construir el modelo de quarks.', composition: 'Un quark arriba y un antiquark extraño.', role: 'Física del sabor, violación CP y estudios de interacción débil.',
    decays: 'Posee varios canales débiles, entre ellos K⁺ → μ⁺νμ.', formula: 'K^+=u\\bar s', sources: [PDG]
  },
  {
    id: 'tetraquark', symbol: 'T₄q', name: 'tetraquarks', englishName: 'tetraquarks', family: 'composite', zone: 'composite', layer: 'composites', row: 3, column: 2,
    mass: 'Depende del estado; varios GeV en estados con encanto', charge: 'Variable', spin: 'Variable', interactions: ['strong', 'electromagnetic', 'weak', 'higgs'], evidence: 'observed', discovered: '2003–2022 · familia exótica establecida', lifetime: 'Muy breve',
    antiparticle: 'T̄₄q', antiparticleName: 'antitetraquarks', visual: 'field', scale: '≈10⁻¹⁵ m', constituents: ['charm', 'up', 'down', 'strange'], constituentSummary: 'Dos quarks + dos antiquarks; contenido variable',
    summary: 'Familia de hadrones exóticos con cuatro constituyentes de valencia, observada en múltiples estados.', composition: 'Puede organizarse como estado compacto de cuatro quarks o como molécula de dos mesones; la estructura precisa de varios candidatos continúa en debate.',
    role: 'Amplía la clasificación tradicional de bariones y mesones y somete QCD no perturbativa a nuevas pruebas.', decays: 'Cada estado posee canales y anchuras propios.', formula: 'T\\sim qq\\bar q\\bar q', note: '“Observado” se refiere a resonancias experimentales; su geometría interna puede seguir siendo discutida.', sources: [CERN_EXOTIC_HADRONS, PDG]
  },
  {
    id: 'pentaquark', symbol: 'P₅q', name: 'pentaquarks', englishName: 'pentaquarks', family: 'composite', zone: 'composite', layer: 'composites', row: 3, column: 3,
    mass: 'Depende del estado; varios GeV en estados con encanto', charge: 'Variable', spin: 'Variable', interactions: ['strong', 'electromagnetic', 'weak', 'higgs'], evidence: 'observed', discovered: '2015–2022 · LHCb', lifetime: 'Muy breve',
    antiparticle: 'P̄₅q', antiparticleName: 'antipentaquarks', visual: 'field', scale: '≈10⁻¹⁵ m', constituents: ['charm', 'up', 'down'], constituentSummary: 'Cuatro quarks + un antiquark; contenido variable',
    summary: 'Familia de hadrones exóticos de cinco constituyentes de valencia observada por LHCb.', composition: 'Las señales pueden corresponder a configuraciones compactas o a moléculas hadrónicas; distintos estados pueden tener estructuras diferentes.',
    role: 'Demuestra que QCD permite agregados más allá de los mesones y bariones convencionales.', decays: 'Se reconstruyen mediante cadenas de decaimiento de hadrones pesados.', formula: 'P\\sim qqqq\\bar q', note: 'No existe un único pentaquark universal: la ficha representa una familia de resonancias.', sources: [CERN_EXOTIC_HADRONS, PDG]
  },
  {
    id: 'glueball', symbol: 'Gᵦ?', name: 'bola de gluones', englishName: 'glueball', family: 'composite', zone: 'composite', layer: 'composites', row: 3, column: 4,
    mass: 'Predicha en el régimen GeV', charge: '0', spin: 'Estados 0, 2…', interactions: ['strong', 'higgs'], evidence: 'hypothetical', discovered: 'Predicha por QCD; candidatos sin identificación inequívoca', lifetime: 'Inestable',
    antiparticle: 'Gᵦ?', antiparticleName: 'bola de gluones', selfConjugate: true, visual: 'field', scale: '≈10⁻¹⁵ m', constituents: ['gluon'], constituentSummary: 'Estado ligado dominado por gluones',
    summary: 'Hadrón exótico predicho por la auto-interacción de los gluones, todavía sin identificación experimental inequívoca.', composition: 'Estado globalmente sin color construido principalmente a partir de campos gluónicos, con posible mezcla con mesones ordinarios.',
    role: 'Sería una manifestación directa de que los gluones también se acoplan entre sí.', decays: 'Decaería a hadrones más ligeros y se mezclaría con estados escalares.', formula: 'G_{glue}\\sim\\mathrm{Tr}(F_{\\mu\\nu}F^{\\mu\\nu})', theory: 'Cromodinámica cuántica no perturbativa', confidence: 'Predicción sólida de QCD; asignación experimental aún discutida', sources: [PDG, CERN_EXOTIC_HADRONS]
  }
];

export const technologyObjects: Particle[] = [
  {
    id: 'subnanometre-transistor', symbol: '<1 nm', name: 'transistor subnanométrico', englishName: 'sub-nanometre transistor', family: 'technology', zone: 'technology', layer: 'technology', row: 1, column: 3,
    mass: 'No aplica: dispositivo colectivo', charge: 'Controla portadores eléctricos', spin: 'No aplica', interactions: ['electromagnetic'], evidence: 'observed', discovered: '2016–2022 · demostraciones experimentales', lifetime: 'Prototipo de laboratorio',
    antiparticle: '<1 nm', antiparticleName: 'transistor subnanométrico', selfConjugate: true, visual: 'field', scale: 'Puerta física <1 nm; dispositivo completo mayor', constituents: ['electron'], constituentSummary: 'Material 2D + puerta atómica + contactos',
    summary: 'Referencia tecnológica experimental para comparar la escala atómica con una puerta de transistor de longitud inferior a un nanómetro.', composition: 'Utiliza materiales bidimensionales y electrodos atómicamente finos. La dimensión subnanométrica corresponde a la puerta o longitud efectiva, no al tamaño completo del transistor ni a un nodo comercial.',
    role: 'Sirve como comparador de escala y muestra cómo la ingeniería se aproxima a dimensiones atómicas.', decays: 'No decae como una partícula; conmuta corriente mediante control electrostático y transporte cuántico.',
    formula: 'L_g<1\\,\\mathrm{nm}', note: 'Los nombres comerciales de nodos no equivalen directamente a una dimensión física. Esta ficha representa resultados de laboratorio, no producción industrial general.', sources: [NATURE_ATOMIC_TRANSISTOR]
  }
];

export const frontierObjects: Particle[] = [
  {
    id: 'open-string', symbol: '⌁', name: 'cuerda abierta', englishName: 'open string', family: 'string', zone: 'planck', row: 1, column: 1,
    mass: 'Depende del modo vibracional', charge: 'En sus extremos, según el modelo', spin: 'Emergente del modo', interactions: ['gravity'], evidence: 'hypothetical', discovered: 'No observada', lifetime: 'Concepto teórico',
    antiparticle: '⌁', antiparticleName: 'cuerda abierta', selfConjugate: true, visual: 'open-string', scale: 'Escala próxima a Planck', summary: 'Objeto unidimensional hipotético con dos extremos.',
    composition: 'No se considera hecha de partículas más pequeñas dentro de la teoría de cuerdas.', role: 'Sus modos de vibración se interpretarían como partículas diferentes.', decays: 'Puede dividirse o unirse en descripciones perturbativas.',
    formula: 'S=-T\\int d^2\\sigma\\sqrt{-\\det h}', theory: 'Teoría de cuerdas', confidence: 'Marco matemático sin confirmación experimental', mirrorNote: 'No posee una “anticuerda” distinta por antimateria.', sources: [CERN_SM, NIST_PLANCK]
  },
  {
    id: 'closed-string', symbol: '◯', name: 'cuerda cerrada', englishName: 'closed string', family: 'string', zone: 'planck', row: 1, column: 2,
    mass: 'Depende del modo vibracional', charge: 'Variable', spin: 'Incluye modo spin 2', interactions: ['gravity'], evidence: 'hypothetical', discovered: 'No observada', lifetime: 'Concepto teórico',
    antiparticle: '◯', antiparticleName: 'cuerda cerrada', selfConjugate: true, visual: 'closed-string', scale: 'Escala próxima a Planck', summary: 'Bucle unidimensional hipotético sin extremos.',
    composition: 'Objeto fundamental de la teoría de cuerdas.', role: 'Contiene naturalmente un modo con propiedades de gravitón.', decays: 'Puede separarse y recombinarse.', formula: 'X^\\mu(\\sigma+2\\pi)=X^\\mu(\\sigma)',
    theory: 'Teoría de cuerdas', confidence: 'Sin evidencia experimental', mirrorNote: 'No equivale a antimateria; se refleja solo para mantener la comparación.', sources: [CERN_SM, NIST_PLANCK]
  },
  {
    id: 'd-brane', symbol: 'Dₚ', name: 'D-brana', englishName: 'D-brane', family: 'string', zone: 'planck', row: 1, column: 3,
    mass: 'Tensión dependiente del modelo', charge: 'Cargas extendidas', spin: 'No es una partícula puntual', interactions: ['gravity'], evidence: 'hypothetical', discovered: 'No observada', lifetime: 'Objeto teórico',
    antiparticle: 'D̄ₚ', antiparticleName: 'anti-D-brana', visual: 'brane', scale: 'p dimensiones espaciales', summary: 'Superficie extendida sobre la que pueden terminar cuerdas abiertas.',
    composition: 'Objeto no perturbativo de teorías de supercuerdas.', role: 'Organiza campos gauge, dualidades y geometrías de dimensiones extra.', decays: 'Brana y antibrana pueden aniquilarse en ciertos modelos.', formula: 'S_{DBI}=-T_p\\int d^{p+1}\\xi\\sqrt{-\\det(G+F)}',
    theory: 'Supercuerdas', confidence: 'Sin evidencia experimental', sources: [NIST_PLANCK]
  },
  {
    id: 'm2-brane', symbol: 'M2', name: 'membrana M2', englishName: 'M2-brane', family: 'string', zone: 'planck', row: 1, column: 4,
    mass: 'Tensión teórica', charge: 'Extendida', spin: 'Objeto 2D', interactions: ['gravity'], evidence: 'hypothetical', discovered: 'No observada', lifetime: 'Objeto teórico',
    antiparticle: 'M̄2', antiparticleName: 'anti-M2', visual: 'brane', scale: '2 dimensiones espaciales', summary: 'Membrana bidimensional fundamental propuesta en teoría M.', composition: 'Objeto extendido en un espacio-tiempo de once dimensiones.',
    role: 'Relaciona límites de distintas teorías de supercuerdas.', decays: 'Dependiente de la compactificación.', formula: 'S_{M2}=-T_{M2}\\int d^3\\xi\\sqrt{-g}', theory: 'Teoría M', confidence: 'Sin confirmación experimental', sources: [NIST_PLANCK]
  },
  {
    id: 'm5-brane', symbol: 'M5', name: 'cinco-brana M5', englishName: 'M5-brane', family: 'string', zone: 'planck', row: 1, column: 5,
    mass: 'Tensión teórica', charge: 'Extendida', spin: 'Objeto 5D', interactions: ['gravity'], evidence: 'hypothetical', discovered: 'No observada', lifetime: 'Objeto teórico',
    antiparticle: 'M̄5', antiparticleName: 'anti-M5', visual: 'brane', scale: '5 dimensiones espaciales', summary: 'Objeto de cinco dimensiones espaciales propuesto en teoría M.', composition: 'Brana extendida en once dimensiones.',
    role: 'Aparece en dualidades y compactificaciones de teoría M.', decays: 'Dependiente del fondo teórico.', formula: 'T_{M5}\\propto l_P^{-6}', theory: 'Teoría M', confidence: 'Sin confirmación experimental', sources: [NIST_PLANCK]
  },
  {
    id: 'cosmic-string', symbol: '〰', name: 'cuerda cósmica', englishName: 'cosmic string', family: 'string', zone: 'planck', row: 2, column: 3,
    mass: 'Energía por unidad de longitud', charge: 'Depende del modelo', spin: 'Defecto extendido', interactions: ['gravity'], evidence: 'hypothetical', discovered: 'No observada', lifetime: 'Potencialmente cosmológica',
    antiparticle: '〰', antiparticleName: 'cuerda cósmica', selfConjugate: true, visual: 'cosmic-string', scale: 'Macroscópica, grosor microscópico', summary: 'Defecto topológico hipotético que podría atravesar distancias cosmológicas.',
    composition: 'No debe confundirse automáticamente con una cuerda fundamental de teoría de cuerdas.', role: 'Podría producir lentes gravitacionales y ondas gravitacionales.', decays: 'Los bucles podrían radiar energía.',
    formula: 'G\\mu/c^2', theory: 'Defectos topológicos / cosmología', confidence: 'Sin detección confirmada', mirrorNote: 'No tiene un equivalente de antimateria ordinario.', sources: [NIST_PLANCK]
  }
];

export const interactionLabels = {
  strong: 'fuerte', electromagnetic: 'electromagnética', weak: 'débil', higgs: 'Higgs', gravity: 'gravedad'
} as const;
