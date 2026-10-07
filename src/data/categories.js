import { COMPONENTS, getComponent } from './components.js';
import { compareSc } from './wcag.js';

// Categories follow where each component lives on a page. A component can appear in
// more than one category (a button belongs in navigation and in forms).
export const CATEGORIES = [
  {
    id: 'page-view',
    name: 'Page view',
    description: 'The whole screen: titles, language, landmarks and layout.',
    items: ['android-view', 'html', 'ios-view'],
  },
  {
    id: 'header',
    name: 'Header',
    description: 'What sits at the top of every page.',
    items: ['header', 'nav', 'search'],
  },
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'How people move around and take action.',
    items: ['breadcrumbs', 'button', 'link', 'nav-button', 'nav', 'search'],
  },
  {
    id: 'main-content',
    name: 'Main content',
    description: 'Content, media and interactive patterns in the body of the page.',
    items: ['animation', 'audio', 'breadcrumbs', 'card', 'carousel', 'image-decorative', 'dialog-modal', 'expander', 'heading', 'image', 'link', 'figure', 'popover', 'tabs', 'video'],
  },
  {
    id: 'form',
    name: 'Form',
    description: 'Fields, choices, feedback and validation.',
    items: ['alert', 'button', 'checkbox', 'form', 'input-number', 'radio', 'select', 'input-text', 'textarea', 'toggle-switch', 'tooltip'],
  },
  {
    id: 'footer',
    name: 'Footer',
    description: 'What sits at the bottom of every page.',
    items: ['footer', 'nav'],
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Patterns for data-heavy screens: metrics, charts, tables, statuses and filters.',
    items: ['stat-card', 'figure', 'data-table', 'status-badge', 'filter-bar', 'loading-state', 'tabs', 'alert', 'tooltip'],
  },
];

const CAT_BY_ID = new Map(CATEGORIES.map((c) => [c.id, c]));
export const getCategory = (id) => CAT_BY_ID.get(id);

// Unique components in first-appearance order: used for previous/next links.
export const ORDER = [];
CATEGORIES.forEach((cat) => cat.items.forEach((id) => { if (!ORDER.includes(id)) ORDER.push(id); }));

export const categoriesFor = (componentId) => CATEGORIES.filter((cat) => cat.items.includes(componentId));

export function wcagFor(component) {
  const set = new Set();
  component.groups.forEach((g) => g.items.forEach((i) => i.sc.forEach((s) => set.add(s))));
  return [...set].sort(compareSc);
}

export const criteriaCount = (components) =>
  components.reduce((n, c) => n + c.groups.reduce((m, g) => m + g.items.length, 0), 0);

// Reverse lookups for the WCAG and disability reference pages.
export function componentsForSc(scId) {
  return ORDER.map(getComponent).filter((c) => c.groups.some((g) => g.items.some((i) => i.sc.includes(scId))));
}
export function componentsForDisability(disId) {
  return ORDER.map(getComponent).filter((c) => c.affects.some((a) => a.id === disId));
}

// Ready-made sets for the "My checklist" empty state.
export const STARTER_SETS = [
  { id: 'account-form', name: 'Account or payment form', items: ['form', 'input-text', 'input-number', 'select', 'checkbox', 'button', 'alert'] },
  { id: 'content-page', name: 'Content page', items: ['html', 'header', 'nav', 'breadcrumbs', 'heading', 'link', 'image', 'footer'] },
  { id: 'dashboard', name: 'Operations dashboard', items: ['stat-card', 'figure', 'data-table', 'status-badge', 'filter-bar', 'loading-state', 'alert'] },
  { id: 'media', name: 'Media page', items: ['video', 'audio', 'image', 'animation', 'heading'] },
];

export const ALL = COMPONENTS;
