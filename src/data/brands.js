// Brand kits. "default" is the house style used when a client has no brand of its own,
// and for internal tools. To add a client, copy one entry and change the values.
//
// colors: the semantic roles every component uses (see COLOR_ROLES below).
// chart:  categorical data colours, in order. Each must reach 3:1 against surface.
// extraPairings: combinations the client wants to use beyond the standard set.
// rules:  brand rules; `applies` lists the component ids they matter for (empty = all).

export const COLOR_ROLES = [
  ['brand', 'Raw brand colour from the client guidelines. May be decorative only.'],
  ['primary', 'Main actions, links, selected states and the first data series.'],
  ['primaryHover', 'Hover and pressed state for primary.'],
  ['onPrimary', 'Text and icons on primary.'],
  ['secondary', 'Secondary actions and highlights.'],
  ['onSecondary', 'Text and icons on secondary.'],
  ['accent', 'Decorative accents and illustrations.'],
  ['surface', 'Page and card background.'],
  ['surfaceAlt', 'Panels, table stripes, selected rows.'],
  ['text', 'Body text and headings.'],
  ['textMuted', 'Hints, captions, secondary text.'],
  ['border', 'Input and control borders.'],
  ['focus', 'Keyboard focus ring.'],
  ['success', 'Success text, icons and badges.'],
  ['warning', 'Warning text, icons and badges.'],
  ['danger', 'Error text, icons and badges.'],
];

export const BRANDS = [
  {
    id: 'default',
    name: 'Tessera default',
    isDefault: true,
    sector: 'House style for internal tools and clients without a brand',
    tagline: 'A neutral, high-contrast base that every client theme builds on.',
    mark: 'TS',
    fonts: { heading: "'IBM Plex Sans', system-ui, sans-serif", body: "'IBM Plex Sans', system-ui, sans-serif" },
    radius: '8px',
    colors: {
      brand: '#1B1B19', primary: '#2C43C4', primaryHover: '#2236A3', onPrimary: '#FFFFFF',
      secondary: '#E8EBFA', onSecondary: '#1F2E8C', accent: '#F2B627',
      surface: '#FFFFFF', surfaceAlt: '#F6F5F1', text: '#1B1B19', textMuted: '#5A5952',
      border: '#85827A', focus: '#C2410C', success: '#1D6B37', warning: '#8A5300', danger: '#B42318',
    },
    chart: ['#2C43C4', '#C2410C', '#0F766E', '#7E22CE'],
    extraPairings: [],
    voice: [
      'Plain, direct and calm. Write for someone checking a dashboard between tasks.',
      'Lead with the number or the state, then the context: “37 active outages, down 5 since 9 a.m.”',
      'Use sentence case for headings, buttons and labels.',
    ],
    rules: [
      { title: 'Blue is for action', body: 'Primary blue marks things people can click or select. Do not use it for decoration.', applies: ['button', 'link', 'tabs', 'nav'] },
      { title: 'Yellow is decorative', body: 'Signal yellow fails contrast as text. Use it only for highlights such as the logo tick or a starred state.', applies: [] },
      { title: 'Orange focus ring', body: 'Focus is orange so it stands apart from blue buttons and links on every surface.', applies: ['button', 'link', 'input-text', 'checkbox', 'radio', 'select', 'toggle-switch'] },
      { title: 'Charts start with blue', body: 'Use chart colours in order. Pair every colour with a label or pattern so series never depend on colour alone.', applies: ['figure', 'stat-card'] },
    ],
  },
  {
    id: 'northgrid',
    name: 'Northgrid Power',
    sector: 'Electric distribution utility',
    tagline: 'Keeping 1.2 million homes and businesses powered across the north shore.',
    mark: 'NG',
    fonts: { heading: "'Source Sans 3', system-ui, sans-serif", body: "'Source Sans 3', system-ui, sans-serif" },
    radius: '6px',
    colors: {
      brand: '#0B4F8A', primary: '#0B4F8A', primaryHover: '#083B68', onPrimary: '#FFFFFF',
      secondary: '#FFC23D', onSecondary: '#1B1B1B', accent: '#0E7C86',
      surface: '#FFFFFF', surfaceAlt: '#F2F5F9', text: '#14202E', textMuted: '#4F5D6E',
      border: '#7D8A99', focus: '#C2410C', success: '#1C7A3A', warning: '#8F5200', danger: '#B3261E',
    },
    chart: ['#0B4F8A', '#C2410C', '#0E7C86', '#6B4FA0'],
    extraPairings: [
      { fg: 'accent', bg: 'surfaceAlt', use: 'text', label: 'Teal tags on panels' },
      { fg: 'onSecondary', bg: 'secondary', use: 'large-text', label: 'Outage banner headline on yellow' },
    ],
    voice: [
      'Write at a grade 6 to 8 reading level. Customers often read us during an outage, on a phone, stressed.',
      'Lead with what is happening and when it will be fixed, then explain why.',
      'Say “power outage”, never “service interruption event”.',
      'Use numerals for times and amounts: “back by 4:30 p.m.”, “$142.18”.',
    ],
    rules: [
      { title: 'Yellow is for alerts only', body: 'Signal yellow marks outages and safety notices. Never use it for decoration, and always put dark text on it.', applies: ['alert', 'status-badge', 'button'] },
      { title: 'Orange focus ring', body: 'Focus uses orange so it stays visible on both blue buttons and white pages.', applies: ['button', 'link', 'input-text', 'checkbox', 'radio', 'select', 'toggle-switch'] },
      { title: 'One primary action per screen', body: 'Customers in an outage need one obvious next step, such as “Report an outage”.', applies: ['button', 'form', 'dialog-modal'] },
    ],
  },
  {
    id: 'lakeshore',
    name: 'Lakeshore Water',
    sector: 'Municipal water and wastewater',
    tagline: 'Clean, safe water for the city of Lakeshore since 1912.',
    mark: 'LW',
    fonts: { heading: "'Nunito Sans', system-ui, sans-serif", body: "'Nunito Sans', system-ui, sans-serif" },
    radius: '12px',
    colors: {
      brand: '#2BB3C0', primary: '#00707A', primaryHover: '#005860', onPrimary: '#FFFFFF',
      secondary: '#E3F3F4', onSecondary: '#004249', accent: '#2BB3C0',
      surface: '#FFFFFF', surfaceAlt: '#F1F7F8', text: '#0F2A2E', textMuted: '#4A5F63',
      border: '#7A9296', focus: '#6B3FA0', success: '#1F7A44', warning: '#8A5300', danger: '#B42318',
    },
    chart: ['#00707A', '#B4530A', '#3F5BA9', '#8A3B8F'],
    extraPairings: [
      { fg: 'brand', bg: 'surface', use: 'text', label: 'Brand teal as link or body text' },
      { fg: 'accent', bg: 'surface', use: 'ui', label: 'Brand teal as chart fill or icon' },
    ],
    voice: [
      'Warm and civic: we are the city’s water, not a vendor.',
      'For boil-water advisories, put the action first: “Boil tap water for 1 minute before drinking.”',
      'Avoid jargon like “potable”. Say “drinking water” and “water main break”.',
    ],
    rules: [
      { title: 'Brand teal is decorative only', body: 'Brand teal #2BB3C0 fails contrast on white for text and graphics. Use primary #00707A for links, buttons and chart data.', applies: ['button', 'link', 'figure', 'stat-card', 'status-badge', 'image', 'image-decorative'] },
      { title: 'Rounded and friendly', body: 'A 12px radius on cards, buttons and inputs, so forms feel consistent.', applies: ['button', 'card', 'input-text', 'select', 'textarea', 'input-number', 'stat-card', 'dialog-modal'] },
      { title: 'Purple focus ring', body: 'Focus is purple so it stands apart from the teal palette on every surface.', applies: ['button', 'link', 'input-text', 'checkbox', 'radio', 'select', 'toggle-switch'] },
    ],
  },
  {
    id: 'summit',
    name: 'Summit Gas & Energy',
    sector: 'Natural gas and energy services',
    tagline: 'Heating homes and powering industry across the Summit region.',
    mark: 'SG',
    fonts: { heading: "'Work Sans', system-ui, sans-serif", body: "'Work Sans', system-ui, sans-serif" },
    radius: '2px',
    colors: {
      brand: '#C8102E', primary: '#A50E26', primaryHover: '#820B1E', onPrimary: '#FFFFFF',
      secondary: '#1D2433', onSecondary: '#FFFFFF', accent: '#F28C28',
      surface: '#FFFDF9', surfaceAlt: '#F6F1EA', text: '#1D2433', textMuted: '#585F6B',
      border: '#857F76', focus: '#1D4ED8', success: '#2E7D32', warning: '#8C5A00', danger: '#A50E26',
    },
    chart: ['#A50E26', '#1D4ED8', '#0F766E', '#6D28D9'],
    extraPairings: [
      { fg: 'brand', bg: 'surface', use: 'large-text', label: 'Brand red in large headlines' },
      { fg: 'accent', bg: 'surface', use: 'text', label: 'Flame orange as text' },
    ],
    voice: [
      'Calm and direct. Gas safety messages are instructions, not marketing.',
      'Safety copy always says what to do and who to call: “Leave the building, then call 1-800-555-0199.”',
      'Prefer “you” and “we”. Avoid passive voice in billing messages.',
    ],
    rules: [
      { title: 'Red means brand, so errors need more than red', body: 'Primary and error are both red. Every error carries an icon and the word “Error:” so it is never signalled by colour alone.', applies: ['alert', 'form', 'input-text', 'status-badge', 'button', 'textarea', 'input-number'] },
      { title: 'Flame orange is a graphic accent', body: 'Use orange only for illustrations and large decorative shapes. It fails as text on cream.', applies: ['figure', 'image-decorative'] },
      { title: 'Square corners', body: 'A 2px radius keeps the industrial, engineered feel. Do not round buttons into pills.', applies: ['button', 'card', 'stat-card', 'status-badge'] },
    ],
  },
];

const BY_ID = new Map(BRANDS.map((b) => [b.id, b]));
export const getBrand = (id) => BY_ID.get(id);
export const DEFAULT_BRAND = 'default';

/** CSS custom properties for a preview wrapper: style={brandVars(brand)} */
export function brandVars(brand) {
  const vars = {};
  Object.entries(brand.colors).forEach(([k, v]) => { vars[`--b-${k}`] = v; });
  brand.chart.forEach((c, i) => { vars[`--b-chart-${i + 1}`] = c; });
  vars['--b-font-heading'] = brand.fonts.heading;
  vars['--b-font-body'] = brand.fonts.body;
  vars['--b-radius'] = brand.radius;
  return vars;
}

export const fontName = (stack) => stack.split(',')[0].replace(/['"]/g, '').trim();
