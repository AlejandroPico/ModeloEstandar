export type ParticleFamily = 'quark' | 'lepton' | 'gauge' | 'scalar' | 'theory';
export type Interaction = 'strong' | 'electromagnetic' | 'weak' | 'higgs' | 'gravity';
export type Evidence = 'observed' | 'hypothetical';

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
  sources: SourceLink[];
}

export interface TheoryParticle extends Particle {
  theory: string;
  confidence: string;
}
