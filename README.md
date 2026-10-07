# Tessera: accessible UI playbook

A frontend-only React app that turns accessibility and brand requirements into copy-ready specs for 39 UI components.

Pick a brand (the Tessera default or a client brand) and open any component to get four tabs: **Acceptance criteria**, **WCAG**, **Disabilities** and **Branding** (live themed preview, contrast checked for that brand, token specs and brand rules). A **Standards** page covers Figma conventions and the design-to-development workflow.

There is no backend. Starred components, checks and the last brand you used are saved in the browser.

## What's in it

| Area | What it does |
| --- | --- |
| **Checklists** | 39 components in 7 categories: Page view, Header, Navigation, Main content, Form, Footer and Dashboard. Search covers names, criteria, WCAG numbers (try `2.4.7`) and disabilities. Press `/` to search. |
| **Component page** | Tabs for Acceptance criteria (checkable, WCAG-tagged), WCAG, Disabilities and, on the Branding side, Branding. Has a copy panel and previous/next links. |
| **Branding tab** | Live preview in the brand's colours, fonts and radius, plus contrast checks for the exact colour pairings the component uses, a token spec table, and usage guidance with the relevant brand rules. |
| **Brand kit** | Colour roles, approved pairings, chart palette (each colour checked at 3:1), typography, voice, brand rules, and token exports (CSS variables, Tailwind, W3C design tokens JSON). |
| **Sample dashboard** | An outage operations dashboard built from playbook components (filters, KPI cards, chart, status badges, sortable table, alert) that re-themes per brand. |
| **My checklist** | Starred components with progress tracking, starter sets, and one copy action that can include a chosen brand's specs. |
| **WCAG / Disabilities** | Reference pages that link back to the components that rely on each item. |

**Copy formats:** Markdown checklist, Jira or plain text. You can optionally include WCAG references, "who this affects" and branding specs.

## Quick look (no install)

Double-click **`tessera-standalone.html`**. It is the whole app in one file and works straight from your computer.

Do not open `index.html` directly: it is the Vite source page and only works through `npm run dev`. Opening it shows just “Loading Tessera…”.

## Front-end standards

The **Standards** page (`#/standards`, data in `src/data/standards.js`) holds the team process in two copyable tabs:
Figma (libraries, naming, variables as brand modes, components, accessibility annotations, handoff) and Workflow
(stages, Definition of Ready and Done, rituals). The Figma tab exports any brand as a Figma variables import file
(DTCG colour objects): Variables panel → right-click the brand's mode → Import.

## Run it

You need Node.js 20.19 or newer.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # static site in dist/
npm run standalone  # rebuild tessera-standalone.html after editing
```

## Deploy

The build is a static site with hash routing, so no server configuration is needed.

- **Netlify:** run `npm run build`, then drag `dist` onto app.netlify.com/drop.
- **Vercel:** import the repo. Vite is detected automatically.
- **GitHub Pages:** publish `dist`. `base: './'` lets it run from a sub-path.

## Edit the content

All content lives in `src/data/`:

| File | Holds |
| --- | --- |
| `components.js` | Criteria per component: `[text, 'WCAG ids']`, with `''` for best practice |
| `categories.js` | Category membership and starter sets |
| `wcag.js` | Success criteria, plain-language summaries and W3C links |
| `disabilities.js` | Disability groups, assistive technology and needs |
| `brands.js` | Brand kits: colour roles, chart palette, fonts, radius, voice, rules |
| `branding.js` | Per-component token specs, colour pairings to check, and usage guidance |

### Add a client brand

1. Copy an entry in `src/data/brands.js` and change the values.
2. Keep the client's raw marketing colour as `brand`, and choose a `primary` that passes 4.5:1 on `surface`.
3. List combinations the client wants to use in `extraPairings`. The brand kit shows the verdict.
4. Add rules, with `applies` listing the component ids each rule matters for, so they appear on those Branding tabs.

The brand appears in the picker, the brand kit, every Branding tab and the sample dashboard automatically.

### Add a component

Add it to `components.js`, list it in a category, add its entry to `branding.js`, and optionally add a live preview in `src/brand/Previews.jsx`.

## Project structure

```
src/
  App.jsx              Routes for both sides, focus management, skip link
  router.js            Hash router: #/c/button  #/brand/northgrid/c/button
  state.jsx            Starred, checks, copy options, last brand, announcements
  data/                All content (see above)
  lib/                 Contrast maths, token exports, brand specs, copy text, search
  brand/Previews.jsx   Live branded specimens of each component
  components/          Header (brand picker), sidebar, tabs, copy panel
  pages/               Browse, component, brand kit, sample dashboard, checklist, WCAG, disabilities
  styles.css           App UI (light/dark) plus brand preview styles (--b-* tokens)
```

## Accessibility of the app itself

- Skip link, unique named landmarks, and focus moved to the page heading on navigation.
- The brand picker re-themes in place: focus stays on the picker and the change is announced.
- ARIA tabs with arrow keys, a sortable table with `aria-sort`, and live-region announcements.
- Contrast checked in light and dark mode, plus reduced-motion and forced-colours support.
- Works at 320px wide.

Criteria are original plain-language guidance based on WCAG 2.2. The three client brands are fictional.
