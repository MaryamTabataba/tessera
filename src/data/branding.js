// How each component is branded.
// specs:     [label, token, note?] where token is a colour role, 'radius', 'font.heading',
//            'font.body', 'chart' (all chart colours) or '=fixed value'.
// pairings:  [fg, bg, use, label] colour combinations this component relies on; checked live per brand.
// usage:     brand-agnostic guidance for applying the brand to this component.

const T = (fg, bg, use, label) => [fg, bg, use, label];

const FIELD = {
  specs: [['Label', 'text', '600 weight'], ['Hint text', 'textMuted'], ['Field border', 'border', '1.5px; 2px when invalid'], ['Field background', 'surface'], ['Error text and border', 'danger'], ['Focus ring', 'focus', '3px outline'], ['Corner radius', 'radius'], ['Minimum height', '=44px'], ['Font', 'font.body']],
  pairings: [T('text', 'surface', 'text', 'Label and typed text'), T('textMuted', 'surface', 'text', 'Hint text'), T('border', 'surface', 'ui', 'Field border'), T('danger', 'surface', 'text', 'Error message'), T('focus', 'surface', 'ui', 'Focus ring')],
  usage: ['Keep labels above fields, never inside them.', 'Use the brand radius on every field so forms feel consistent.', 'Errors use the danger colour plus an icon and the word “Error”.'],
};

const PAGE = {
  specs: [['Page background', 'surface'], ['Panels and sections', 'surfaceAlt'], ['Body text', 'text'], ['Secondary text', 'textMuted'], ['Headings', 'font.heading'], ['Body', 'font.body'], ['Focus ring', 'focus']],
  pairings: [T('text', 'surface', 'text', 'Body text'), T('text', 'surfaceAlt', 'text', 'Text on panels'), T('textMuted', 'surface', 'text', 'Secondary text'), T('primary', 'surface', 'text', 'Links'), T('focus', 'surface', 'ui', 'Focus ring')],
  usage: ['Use surface for the page and surfaceAlt to group regions. Do not invent new greys.', 'One typeface family per brand: heading and body tokens only.'],
};

export const BRANDING = {
  'android-view': { ...PAGE, usage: [...PAGE.usage, 'Map brand tokens to Material colour roles: primary → primary, surfaceAlt → surface container.'] },
  html: PAGE,
  'ios-view': { ...PAGE, usage: [...PAGE.usage, 'Map brand tokens to iOS semantic colours and supply dark-mode values for each.'] },

  header: {
    specs: [['Bar background', 'surface'], ['Bottom border', 'border', '1px'], ['Logo mark', 'primary'], ['Nav links', 'text'], ['Current page marker', 'primary', '3px underline'], ['Height', '=64px']],
    pairings: [T('text', 'surface', 'text', 'Nav link text'), T('primary', 'surface', 'ui', 'Current page marker'), T('focus', 'surface', 'ui', 'Focus ring')],
    usage: ['Keep the header on surface so the logo and links meet contrast on every brand.', 'The current page uses an underline in primary, not colour change alone.'],
  },
  nav: {
    specs: [['Link text', 'text'], ['Current page text', 'primary', '600 weight'], ['Current page marker', 'primary', '3px underline'], ['Hover background', 'surfaceAlt']],
    pairings: [T('text', 'surface', 'text', 'Link text'), T('primary', 'surface', 'text', 'Current page text'), T('text', 'surfaceAlt', 'text', 'Link text on hover')],
    usage: ['Show the current page with weight and an underline as well as colour.'],
  },
  search: { ...FIELD, specs: [...FIELD.specs, ['Search button fill', 'primary'], ['Search button icon', 'onPrimary']], pairings: [...FIELD.pairings, T('onPrimary', 'primary', 'ui', 'Search button icon')] },

  breadcrumbs: {
    specs: [['Links', 'primary'], ['Current page', 'textMuted'], ['Separator', 'textMuted', 'Decorative']],
    pairings: [T('primary', 'surface', 'text', 'Breadcrumb links'), T('textMuted', 'surface', 'text', 'Current page')],
    usage: ['Underline breadcrumb links so they read as links on every brand.'],
  },
  button: {
    specs: [['Primary fill', 'primary'], ['Primary fill, hover', 'primaryHover'], ['Primary label', 'onPrimary'], ['Secondary fill', 'secondary'], ['Secondary label', 'onSecondary'], ['Outline border and label', 'primary'], ['Focus ring', 'focus', '3px outline, 2px offset'], ['Corner radius', 'radius'], ['Minimum height', '=44px'], ['Font', 'font.body', '600 weight']],
    pairings: [T('onPrimary', 'primary', 'text', 'Primary label'), T('onPrimary', 'primaryHover', 'text', 'Primary label, hover'), T('onSecondary', 'secondary', 'text', 'Secondary label'), T('primary', 'surface', 'text', 'Outline label'), T('primary', 'surface', 'ui', 'Outline border'), T('focus', 'surface', 'ui', 'Focus ring')],
    usage: ['One primary button per view. Use secondary or outline for the rest.', 'Write labels in sentence case, starting with a verb.', 'Never use the raw brand colour as a fill unless it passes the label check.'],
  },
  link: {
    specs: [['Link text', 'primary', 'Underlined'], ['Visited and hover', 'primaryHover'], ['Focus ring', 'focus']],
    pairings: [T('primary', 'surface', 'text', 'Link on page'), T('primary', 'surfaceAlt', 'text', 'Link on panels'), T('primaryHover', 'surface', 'text', 'Link hover')],
    usage: ['Links in body text are always underlined.', 'Use primary, never accent or the raw brand colour, for link text.'],
  },
  'nav-button': {
    specs: [['Button border', 'border'], ['Icon and label', 'text'], ['Open state fill', 'surfaceAlt'], ['Corner radius', 'radius']],
    pairings: [T('text', 'surface', 'text', 'Menu label'), T('border', 'surface', 'ui', 'Button border')],
    usage: ['Always show the word “Menu” next to the icon.'],
  },

  animation: {
    specs: [['Standard duration', '=150–250ms'], ['Easing', '=ease-out'], ['Reduced motion', '=Fade or no motion']],
    pairings: [],
    usage: ['Brand motion is subtle: fades and short slides only. No parallax.', 'Every animation has a reduced-motion alternative.'],
  },
  audio: {
    specs: [['Control bar', 'surfaceAlt'], ['Play button fill', 'primary'], ['Play icon', 'onPrimary'], ['Progress track', 'border'], ['Progress fill', 'primary']],
    pairings: [T('onPrimary', 'primary', 'ui', 'Play icon on button'), T('primary', 'surfaceAlt', 'ui', 'Progress fill'), T('border', 'surfaceAlt', 'ui', 'Progress track')],
    usage: ['Put the transcript link directly under the player in primary.'],
  },
  card: {
    specs: [['Card background', 'surface'], ['Card border', 'border', '1px'], ['Heading', 'text', 'font.heading'], ['Body', 'textMuted'], ['Link', 'primary'], ['Corner radius', 'radius']],
    pairings: [T('text', 'surface', 'text', 'Card heading'), T('textMuted', 'surface', 'text', 'Card body'), T('primary', 'surface', 'text', 'Card link'), T('border', 'surfaceAlt', 'ui', 'Card edge on panel')],
    usage: ['Cards use the brand radius and a 1px border, not heavy shadows.', 'Keep card headings in the heading font.'],
  },
  carousel: {
    specs: [['Control buttons', 'surface', 'With text border'], ['Control icons', 'text'], ['Current dot', 'primary'], ['Other dots', 'border']],
    pairings: [T('text', 'surface', 'ui', 'Control icon'), T('primary', 'surface', 'ui', 'Current slide dot'), T('border', 'surface', 'ui', 'Other dots')],
    usage: ['Place controls below the slide, not on top of images, so contrast never depends on the photo.'],
  },
  'image-decorative': {
    specs: [['Illustration accent', 'accent'], ['Icon colour', 'textMuted']],
    pairings: [],
    usage: ['Decorative art can use the raw brand and accent colours, even when they fail contrast, because it carries no information.'],
  },
  'dialog-modal': {
    specs: [['Dialog background', 'surface'], ['Title', 'text', 'font.heading'], ['Body', 'text'], ['Confirm button', 'primary'], ['Backdrop', '=rgba(0,0,0,0.55)'], ['Corner radius', 'radius', '+4px']],
    pairings: [T('text', 'surface', 'text', 'Dialog text'), T('onPrimary', 'primary', 'text', 'Confirm label'), T('primary', 'surface', 'text', 'Cancel label')],
    usage: ['The least destructive action gets focus first.', 'Destructive confirmations use danger, not primary.'],
  },
  expander: {
    specs: [['Trigger text', 'text', '600 weight'], ['Chevron', 'primary'], ['Divider', 'border'], ['Open panel', 'surfaceAlt']],
    pairings: [T('text', 'surface', 'text', 'Trigger label'), T('primary', 'surface', 'ui', 'Chevron icon'), T('border', 'surface', 'ui', 'Divider')],
    usage: ['Use a chevron in primary that rotates when open.'],
  },
  heading: {
    specs: [['Heading colour', 'text'], ['Heading font', 'font.heading'], ['H1', '=2rem / 700'], ['H2', '=1.5rem / 600'], ['H3', '=1.2rem / 600']],
    pairings: [T('text', 'surface', 'large-text', 'Headings on page'), T('text', 'surfaceAlt', 'large-text', 'Headings on panels')],
    usage: ['Headings use the text colour, not the brand colour, unless the brand colour passes 4.5:1.'],
  },
  image: {
    specs: [['Caption text', 'textMuted'], ['Image border', 'border', 'Only on white images'], ['Corner radius', 'radius']],
    pairings: [T('textMuted', 'surface', 'text', 'Caption')],
    usage: ['Diagrams use the chart palette so they match dashboards.'],
  },
  figure: {
    specs: [['Series colours', 'chart', 'In order'], ['Gridlines', 'border', 'Dashed, 1px'], ['Axis labels', 'textMuted'], ['Title', 'text', 'font.heading']],
    pairings: [T('textMuted', 'surface', 'text', 'Axis labels'), T('text', 'surface', 'text', 'Chart title')],
    chart: true,
    usage: ['Use chart colours in order and never skip to the raw brand colour.', 'Pair every series with a direct label, pattern or marker shape.', 'Use the success, warning and danger colours only for status, not as series colours.'],
  },
  popover: {
    specs: [['Background', 'surface'], ['Border', 'border'], ['Text', 'text'], ['Corner radius', 'radius']],
    pairings: [T('text', 'surface', 'text', 'Popover text'), T('border', 'surface', 'ui', 'Popover edge')],
    usage: ['Popovers use a border as well as a shadow, so their edge is visible on every surface.'],
  },
  tabs: {
    specs: [['Tab label', 'textMuted'], ['Selected label', 'text', '600 weight'], ['Selected marker', 'primary', '3px underline'], ['Tab list divider', 'border']],
    pairings: [T('textMuted', 'surface', 'text', 'Unselected tab'), T('text', 'surface', 'text', 'Selected tab'), T('primary', 'surface', 'ui', 'Selected marker')],
    usage: ['Mark the selected tab with an underline in primary as well as a weight change.'],
  },
  video: {
    specs: [['Control bar', '=rgba(0,0,0,0.75)'], ['Controls', '=#FFFFFF'], ['Progress fill', 'primary'], ['Captions', '=White on black, 80% opacity']],
    pairings: [],
    usage: ['Keep player controls white on a dark bar so they pass over any frame.', 'Use the brand only for the progress fill and the play button.'],
  },

  alert: {
    specs: [['Panel background', 'surfaceAlt'], ['Text', 'text'], ['Success accent', 'success', '6px left bar + icon'], ['Warning accent', 'warning'], ['Error accent', 'danger'], ['Info accent', 'primary'], ['Corner radius', 'radius']],
    pairings: [T('text', 'surfaceAlt', 'text', 'Alert text'), T('success', 'surfaceAlt', 'ui', 'Success icon and bar'), T('warning', 'surfaceAlt', 'ui', 'Warning icon and bar'), T('danger', 'surfaceAlt', 'ui', 'Error icon and bar'), T('primary', 'surfaceAlt', 'ui', 'Info icon and bar')],
    usage: ['Every alert has an icon and a text label: “Success:”, “Warning:”, “Error:”.', 'Status colours are never used for decoration elsewhere.'],
  },
  checkbox: {
    specs: [['Box border', 'border', '1.5px'], ['Checked fill', 'primary'], ['Checkmark', 'onPrimary'], ['Label', 'text'], ['Focus ring', 'focus']],
    pairings: [T('border', 'surface', 'ui', 'Unchecked box'), T('primary', 'surface', 'ui', 'Checked box'), T('onPrimary', 'primary', 'ui', 'Checkmark'), T('text', 'surface', 'text', 'Label')],
    usage: ['Checked boxes fill with primary and show a white checkmark.'],
  },
  form: { ...FIELD, specs: [...FIELD.specs, ['Section heading', 'text', 'font.heading'], ['Error summary border', 'danger', '3px']], usage: [...FIELD.usage, 'Group sections on surfaceAlt panels to make long forms scannable.'] },
  'input-number': FIELD,
  radio: {
    specs: [['Circle border', 'border', '1.5px'], ['Selected dot', 'primary'], ['Label', 'text'], ['Focus ring', 'focus']],
    pairings: [T('border', 'surface', 'ui', 'Unselected circle'), T('primary', 'surface', 'ui', 'Selected dot'), T('text', 'surface', 'text', 'Label')],
    usage: ['Selected radios show a primary dot inside a primary ring.'],
  },
  select: FIELD,
  'input-text': FIELD,
  textarea: FIELD,
  'toggle-switch': {
    specs: [['Track, off', 'border'], ['Track, on', 'primary'], ['Thumb', '=#FFFFFF'], ['State text', 'textMuted', '“On” / “Off”'], ['Label', 'text']],
    pairings: [T('border', 'surface', 'ui', 'Track, off'), T('primary', 'surface', 'ui', 'Track, on'), T('textMuted', 'surface', 'text', 'On/Off text')],
    usage: ['Always show “On” or “Off” next to the switch.'],
  },
  tooltip: {
    specs: [['Background', 'text'], ['Text', 'surface'], ['Corner radius', 'radius'], ['Max width', '=280px']],
    pairings: [T('surface', 'text', 'text', 'Tooltip text')],
    usage: ['Tooltips invert the brand: surface text on a text-colour background.'],
  },

  'stat-card': {
    specs: [['Card background', 'surface'], ['Card border', 'border'], ['Label', 'textMuted'], ['Value', 'text', 'font.heading, 2rem / 700'], ['Good change', 'success'], ['Bad change', 'danger'], ['Sparkline', 'chart', 'First chart colour'], ['Corner radius', 'radius']],
    pairings: [T('textMuted', 'surface', 'text', 'Metric label'), T('text', 'surface', 'large-text', 'Metric value'), T('success', 'surface', 'text', 'Good change text'), T('danger', 'surface', 'text', 'Bad change text')],
    usage: ['The value uses the text colour, not the brand colour, so it always passes.', 'Change text pairs colour with an arrow and words.'],
  },
  'data-table': {
    specs: [['Header text', 'textMuted', 'Uppercase, 600'], ['Cell text', 'text'], ['Row divider', 'border'], ['Selected or striped row', 'surfaceAlt'], ['Sort indicator', 'primary']],
    pairings: [T('textMuted', 'surface', 'text', 'Header text'), T('text', 'surface', 'text', 'Cell text'), T('text', 'surfaceAlt', 'text', 'Text on striped row'), T('primary', 'surface', 'ui', 'Sort icon')],
    usage: ['Right-align numbers and use tabular figures.', 'Stripe with surfaceAlt only; never tint rows with status colours.'],
  },
  'status-badge': {
    specs: [['Success badge', 'success', 'Text + icon on tinted fill'], ['Warning badge', 'warning'], ['Error badge', 'danger'], ['Neutral badge', 'textMuted'], ['Corner radius', '=999px or brand radius']],
    pairings: [T('success', 'surface', 'text', 'Success badge text'), T('warning', 'surface', 'text', 'Warning badge text'), T('danger', 'surface', 'text', 'Error badge text'), T('textMuted', 'surfaceAlt', 'text', 'Neutral badge text')],
    usage: ['Badges use a light tint of the status colour with the full status colour for text and icon.', 'Every status has its own icon so badges work in greyscale.'],
  },
  'filter-bar': {
    ...FIELD,
    specs: [...FIELD.specs.slice(0, 7), ['Applied filter chip', 'secondary'], ['Chip text', 'onSecondary']],
    pairings: [...FIELD.pairings.slice(0, 3), T('onSecondary', 'secondary', 'text', 'Filter chip text')],
    usage: ['Applied filters appear as chips in secondary, each with a remove button.'],
  },
  'loading-state': {
    specs: [['Skeleton shapes', 'surfaceAlt'], ['Progress track', 'border'], ['Progress fill', 'primary'], ['Empty state text', 'textMuted']],
    pairings: [T('primary', 'surface', 'ui', 'Progress fill'), T('textMuted', 'surface', 'text', 'Empty state text')],
    usage: ['Skeletons use surfaceAlt and pulse slowly, or not at all with reduced motion.'],
  },

  footer: {
    specs: [['Background', 'surfaceAlt'], ['Links', 'text', 'Underlined'], ['Legal text', 'textMuted']],
    pairings: [T('text', 'surfaceAlt', 'text', 'Footer links'), T('textMuted', 'surfaceAlt', 'text', 'Legal text')],
    usage: ['Footer text often ends up the palest on the page; keep it at textMuted or darker.'],
  },
};

export const getBranding = (id) => {
  const b = BRANDING[id];
  if (!b) return null;
  return { ...b, pairings: b.pairings.map(([fg, bg, use, label]) => ({ fg, bg, use, label })) };
};
