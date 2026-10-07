// WCAG 2.x contrast maths and brand checks.

function hexToRgb(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((x) => x + x).join('');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

// Round down so 4.497 never displays as a passing "4.50".
export const fmtRatio = (r) => `${(Math.floor(r * 100) / 100).toFixed(2)}:1`;

export const REQUIRED = { text: 4.5, 'large-text': 3, ui: 3 };
export const USE_LABEL = { text: 'Text 4.5:1', 'large-text': 'Large text 3:1', ui: 'UI and graphics 3:1' };

// Pairings every brand must support.
export const STANDARD_PAIRINGS = [
  { fg: 'text', bg: 'surface', use: 'text', label: 'Body text on page' },
  { fg: 'text', bg: 'surfaceAlt', use: 'text', label: 'Body text on panels' },
  { fg: 'textMuted', bg: 'surface', use: 'text', label: 'Hints and secondary text' },
  { fg: 'textMuted', bg: 'surfaceAlt', use: 'text', label: 'Secondary text on panels' },
  { fg: 'primary', bg: 'surface', use: 'text', label: 'Links and outline buttons' },
  { fg: 'onPrimary', bg: 'primary', use: 'text', label: 'Primary button label' },
  { fg: 'onPrimary', bg: 'primaryHover', use: 'text', label: 'Primary button label, hover' },
  { fg: 'onSecondary', bg: 'secondary', use: 'text', label: 'Secondary button label' },
  { fg: 'danger', bg: 'surface', use: 'text', label: 'Error messages' },
  { fg: 'success', bg: 'surface', use: 'text', label: 'Success text' },
  { fg: 'warning', bg: 'surface', use: 'text', label: 'Warning text' },
  { fg: 'border', bg: 'surface', use: 'ui', label: 'Form field borders' },
  { fg: 'focus', bg: 'surface', use: 'ui', label: 'Focus indicator' },
];

/** Evaluate a list of {fg, bg, use, label} pairings against a brand. */
export function evaluatePairings(brand, pairings) {
  return pairings
    .filter((p) => brand.colors[p.fg] && brand.colors[p.bg])
    .map((p) => {
      const ratio = contrast(brand.colors[p.fg], brand.colors[p.bg]);
      const required = REQUIRED[p.use];
      return { ...p, fgHex: brand.colors[p.fg], bgHex: brand.colors[p.bg], ratio, required, pass: ratio >= required };
    });
}

export function brandHealth(brand) {
  const results = [
    ...evaluatePairings(brand, STANDARD_PAIRINGS),
    ...evaluatePairings(brand, brand.extraPairings).map((r) => ({ ...r, extra: true })),
  ];
  const fails = results.filter((r) => !r.pass);
  return { results, fails, passCount: results.length - fails.length };
}

export function chartHealth(brand) {
  return brand.chart.map((hex, i) => {
    const ratio = contrast(hex, brand.colors.surface);
    return { hex, index: i + 1, ratio, pass: ratio >= 3 };
  });
}
