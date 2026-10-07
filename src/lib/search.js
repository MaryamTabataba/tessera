import { getComponent } from '../data/components.js';
import { ORDER, categoriesFor } from '../data/categories.js';
import { getSc } from '../data/wcag.js';
import { getDisability } from '../data/disabilities.js';

// Build one lowercase haystack per component, once.
const INDEX = ORDER.map((id) => {
  const c = getComponent(id);
  const parts = [c.name, c.summary, ...categoriesFor(id).map((cat) => cat.name)];
  c.groups.forEach((g) => {
    parts.push(g.name);
    g.items.forEach((i) => {
      parts.push(i.text);
      i.sc.forEach((s) => parts.push(s, getSc(s).name));
    });
  });
  c.affects.forEach((a) => parts.push(getDisability(a.id).name));
  return { c, name: c.name.toLowerCase(), hay: parts.join(' ').toLowerCase() };
});

/** Returns components matching every word in the query, best name matches first. */
export function searchComponents(query) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return INDEX
    .filter((e) => words.every((w) => e.hay.includes(w)))
    .map((e) => ({ c: e.c, score: words.reduce((s, w) => s + (e.name.includes(w) ? 2 : 0), 0) }))
    .sort((a, b) => b.score - a.score)
    .map((r) => r.c);
}
