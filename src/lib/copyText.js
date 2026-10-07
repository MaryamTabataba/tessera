import { getSc } from '../data/wcag.js';
import { getDisability } from '../data/disabilities.js';
import { wcagFor } from '../data/categories.js';
import { config } from '../config.js';
import { componentBrand } from './brandSpec.js';
import { fmtRatio } from './contrast.js';

export const FORMATS = [
  { id: 'md', label: 'Markdown checklist', hint: 'GitHub, Linear, Notion, Azure DevOps', ext: 'md' },
  { id: 'jira', label: 'Jira', hint: 'Jira wiki markup', ext: 'txt' },
  { id: 'plain', label: 'Plain text', hint: 'Email, Slack, Teams', ext: 'txt' },
];

/**
 * Build copy-ready acceptance criteria for one or more components.
 * opts: { format, wcag, disabilities, branding, brand (object|null), title }
 */
export function buildCopyText(components, opts = {}) {
  const { format = 'md', wcag = true, disabilities = false, branding = false, brand = null, title = '' } = opts;
  const out = [];
  const md = format === 'md';
  const jira = format === 'jira';
  const bullet = jira ? '*' : '-';
  const sub = (text) => {
    if (md) out.push('', `**${text}**`);
    else if (jira) out.push(`*${text}*`);
    else out.push('', `${text}:`);
  };

  const withHeader = Boolean(title) || components.length > 1;
  if (withHeader) {
    const t = title || 'Accessibility acceptance criteria';
    if (md) out.push(`# ${t}`);
    else if (jira) out.push(`h2. ${t}`);
    else out.push(t.toUpperCase());
    out.push(`Baseline: ${config.baseline}${branding && brand ? ` · Brand: ${brand.name}` : ''}`);
  }

  components.forEach((c, ci) => {
    if (withHeader || ci > 0) out.push('');
    if (md) out.push(`## ${c.name}`);
    else if (jira) out.push(`h3. ${c.name}`);
    else out.push(c.name.toUpperCase());

    c.groups.forEach((g) => {
      sub(g.name);
      g.items.forEach((item) => {
        const ref = wcag && item.sc.length ? ` (WCAG ${item.sc.join(', ')})` : '';
        if (md) out.push(`- [ ] ${item.text}${ref}`);
        else out.push(`${bullet} ${item.text}${ref}`);
      });
    });

    if (wcag) {
      const list = wcagFor(c).map((id) => {
        const sc = getSc(id);
        return `${sc.id} ${sc.name} (${sc.level})`;
      });
      if (md) out.push('', `**WCAG 2.2:** ${list.join('; ')}`);
      else if (jira) out.push(`*WCAG 2.2:* ${list.join('; ')}`);
      else out.push('', `WCAG 2.2: ${list.join('; ')}`);
    }

    if (disabilities) {
      sub('Who this affects');
      c.affects.forEach((a) => out.push(`${bullet} ${getDisability(a.id).name}: ${a.why}`));
    }

    if (branding && brand) {
      const cb = componentBrand(c, brand);
      sub(`Branding: ${brand.name}`);
      cb.specs.forEach((s) => {
        const v = s.cssVar ? `${s.cssVar} (${s.value})` : s.value;
        out.push(`${bullet} ${s.label}: ${v}${s.note ? `, ${s.note}` : ''}`);
      });
      cb.checks.forEach((r) => {
        out.push(`${bullet} Contrast, ${r.label.toLowerCase()}: ${fmtRatio(r.ratio)} (needs ${r.required}:1) ${r.pass ? 'Pass' : 'FAIL'}`);
      });
      cb.rules.forEach((r) => out.push(`${bullet} Brand rule, ${r.title}: ${r.body}`));
    }
  });

  return out.join('\n');
}
