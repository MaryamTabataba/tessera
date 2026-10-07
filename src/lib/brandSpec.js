import { fontName } from '../data/brands.js';
import { getBranding } from '../data/branding.js';
import { cssVar } from './tokens.js';
import { evaluatePairings } from './contrast.js';

/** Resolve one spec token to a concrete value for a brand. */
export function resolveSpec(brand, token) {
  if (token.startsWith('=')) return { value: token.slice(1), fixed: true };
  if (token === 'radius') return { value: brand.radius, cssVar: '--radius-base' };
  if (token === 'font.heading') return { value: fontName(brand.fonts.heading), cssVar: '--font-heading', font: brand.fonts.heading };
  if (token === 'font.body') return { value: fontName(brand.fonts.body), cssVar: '--font-body', font: brand.fonts.body };
  if (token === 'chart') return { value: brand.chart.join(', '), cssVar: `--chart-1 to --chart-${brand.chart.length}`, swatches: brand.chart };
  return { value: brand.colors[token], cssVar: cssVar(token), swatch: brand.colors[token] };
}

/** Everything the Branding tab and copy text need for one component in one brand. */
export function componentBrand(component, brand) {
  const branding = getBranding(component.id);
  const specs = branding.specs.map(([label, token, note]) => ({ label, token, note, ...resolveSpec(brand, token) }));
  const checks = evaluatePairings(brand, branding.pairings);
  const rules = brand.rules.filter((r) => r.applies.length === 0 || r.applies.includes(component.id));
  return { specs, checks, rules, usage: branding.usage, chart: Boolean(branding.chart) };
}
