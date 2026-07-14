import katex from 'katex';

export function renderFormula(source: string, displayMode = true): string {
  return katex.renderToString(source, {
    displayMode,
    throwOnError: false,
    strict: 'warn',
    trust: false
  });
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
