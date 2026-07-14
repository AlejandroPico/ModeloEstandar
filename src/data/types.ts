export type ParticleFamily = 'quark' | 'lepton' | 'gauge' | 'scalar' | 'composite' | 'force' | 'theory' | 'string';
export type Interaction = 'strong' | 'electromagnetic' | 'weak' | 'higgs' | 'gravity';
export type Evidence = 'observed' | 'hypothetical';
export type ParticleZone = 'atom' | 'composite' | 'forces' | 'standard' | 'beyond' | 'planck';
export type ParticleVisual = 'atom' | 'proton' | 'neutron' | 'open-string' | 'closed-string' | 'brane' | 'cosmic-string' | 'field';
export type LayerId = 'composites' | 'forces' | 'antimatter' | 'susy' | 'dark-sector' | 'quantum-gravity' | 'strings';

export interface SourceLink {
  label: string;
  url: string;
}

export interface Particle {
  id: string;
  symbol: string;
  name: string;
  englishName: string;
  family: ParticleFamily;
  generation?: 1 | 2 | 3;
  row: number;
  column: number;
  zone?: ParticleZone;
  layer?: LayerId;
  mass: string;
  massEv?: number;
  charge: string;
  spin: string;
  interactions: Interaction[];
  evidence: Evidence;
  discovered: string;
  lifetime: string;
  antiparticle: string;
  antiparticleName: string;
  selfConjugate?: boolean;
  colorCharge?: boolean;
  summary: string;
  composition: string;
  role: string;
  decays: string;
  formula: string;
  note?: string;
  scale?: string;
  visual?: ParticleVisual;
  constituents?: string[];
  constituentSummary?: string;
  mirrorNote?: string;
  theory?: string;
  confidence?: string;
  sources: SourceLink[];
}

export interface TheoryParticle extends Particle {
  theory: string;
  confidence: string;
}
