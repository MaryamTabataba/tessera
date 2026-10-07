import { useApp } from '../state.jsx';
import { BRANDS, COLOR_ROLES, fontName, getBrand } from '../data/brands.js';
import { getComponent } from '../data/components.js';
import { brandHealth, chartHealth, contrast, fmtRatio } from '../lib/contrast.js';
import { cssVar, toCss, toTailwind, toTokens } from '../lib/tokens.js';
import { href } from '../router.js';
import { Tabs } from '../components/Tabs.jsx';
import { CodeBlock } from '../components/CodeBlock.jsx';
import { CopyPanel } from '../components/CopyPanel.jsx';
import { BrandMark, ContrastTable } from '../components/BrandBits.jsx';
import { Icon } from '../components/Icon.jsx';
import { BarList, BrandFrame, FilterBar, OutageTable, StatCard, STATS, Badge } from '../brand/Previews.jsx';
import { ChartSwatches } from './ComponentPage.jsx';

/* ---------------- All brands ---------------- */
export function BrandsHome() {
  const { lastBrand } = useApp();
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Branding</p>
        <h1 id="page-title" tabIndex={-1}>Brand kits</h1>
        <p className="lead">
          Pick a brand to see every component in its colours and type, with contrast checked live. Start from the
          Tessera default, or switch to a client.
        </p>
      </header>
      <ul className="brand-grid">
        {BRANDS.map((b) => {
          const h = brandHealth(b);
          return (
            <li key={b.id} className={`brand-card${b.id === lastBrand ? ' is-current' : ''}`}>
              <div className="brand-card__top">
                <BrandMark brand={b} size={44} />
                <div>
                  <h2 className="brand-card__name"><a href={href.brand(b.id)}>{b.name}</a></h2>
                  <p className="brand-card__meta">{b.sector}</p>
                </div>
                {b.isDefault && <span className="tag tag--bp">Default</span>}
              </div>
              <span className="brand-card__strip" aria-hidden="true">
                {['primary', 'secondary', 'accent', 'surfaceAlt', 'text'].map((k) => <span key={k} style={{ background: b.colors[k] }} />)}
                {b.chart.map((c) => <span key={c} style={{ background: c }} />)}
              </span>
              <p className={`health ${h.fails.length ? 'health--warn' : 'health--ok'}`}>
                <Icon name={h.fails.length ? 'alert' : 'check'} />
                {h.passCount} of {h.results.length} colour pairings pass
              </p>
              <p className="brand-card__links">
                <a href={href.home(b.id)}>Components<span className="sr-only"> in {b.name}</span></a>
                <a href={href.dashboard(b.id)}>Sample dashboard<span className="sr-only"> in {b.name}</span></a>
              </p>
            </li>
          );
        })}
      </ul>
      <section className="section" aria-labelledby="add-client">
        <h2 id="add-client">Adding a client</h2>
        <ol className="steps-list">
          <li>Copy an entry in <code>src/data/brands.js</code> and change the colours, fonts, radius and chart palette.</li>
          <li>Map the client’s palette to our colour roles. Keep their raw marketing colour as <code>brand</code>, and choose a <code>primary</code> that passes 4.5:1 on surface.</li>
          <li>Add combinations the client wants to use to <code>extraPairings</code>, so the team sees a verdict instead of guessing.</li>
          <li>Open the brand kit. Fix any failure with an accessible variant and record it as a brand rule.</li>
        </ol>
      </section>
    </>
  );
}

/* ---------------- One brand ---------------- */
export function BrandOverview({ brandId }) {
  const brand = getBrand(brandId);
  const h = brandHealth(brand);
  const roles = new Map(COLOR_ROLES);
  return (
    <>
      <header className="page-head page-head--brand">
        <p className="eyebrow">Brand kit{brand.isDefault ? ' · Default' : ''}</p>
        <div className="title-row">
          <BrandMark brand={brand} size={56} />
          <div>
            <h1 id="page-title" tabIndex={-1}>{brand.name}</h1>
            <p className="lead">{brand.sector}. {brand.tagline}</p>
          </div>
        </div>
        <p className="head-actions">
          <a className="btn btn--primary" href={href.home(brand.id)}><Icon name="grid" />Browse components</a>
          <a className="btn" href={href.dashboard(brand.id)}><Icon name="bolt" />Sample dashboard</a>
        </p>
      </header>

      <section className="section section--first" aria-labelledby="bk-health">
        {h.fails.length ? (
          <div className="callout callout--warn">
            <Icon name="alert" />
            <div>
              <h2 id="bk-health" className="callout__title">{h.passCount} of {h.results.length} colour pairings pass</h2>
              <p>Do not use these combinations in any {brand.name} deliverable:</p>
              <ul>{h.fails.map((f) => <li key={f.label}><strong>{f.label}</strong>: {fmtRatio(f.ratio)}, needs {f.required}:1</li>)}</ul>
            </div>
          </div>
        ) : (
          <div className="callout callout--ok">
            <Icon name="check" />
            <div>
              <h2 id="bk-health" className="callout__title">All {h.results.length} colour pairings pass WCAG 2.2 AA</h2>
              <p>This palette is safe to use as documented below.</p>
            </div>
          </div>
        )}
      </section>

      <section className="section" aria-labelledby="bk-colors">
        <h2 id="bk-colors">Colour tokens</h2>
        <p className="section__lead">Every component uses these roles. Ratios are against the surface colour.</p>
        <ul className="swatches">
          {Object.entries(brand.colors).map(([k, v]) => (
            <li key={k} className="swatch">
              <span className="swatch__chip" style={{ background: v }} aria-hidden="true" />
              <span className="swatch__body">
                <span className="swatch__name">{k}</span>
                <code className="swatch__var">{cssVar(k)}</code>
                <span className="swatch__desc">{roles.get(k)}</span>
                <span className="swatch__meta"><code>{v}</code><span>{fmtRatio(contrast(v, brand.colors.surface))}</span></span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="bk-pairs">
        <h2 id="bk-pairs">Approved colour pairings</h2>
        <p className="section__lead">Checked live against WCAG contrast ratios. Ratios are rounded down, so a borderline result never shows as a pass.</p>
        <ContrastTable id="bk-pairs-t" results={h.results} brand={brand} caption={`${brand.name} colour pairings`} />
      </section>

      <section className="section" aria-labelledby="bk-chart">
        <h2 id="bk-chart">Chart palette</h2>
        <p className="section__lead">Use in order. Every colour must reach 3:1 on surface, and every series needs a label or pattern too.</p>
        <div className="two-col">
          <ChartSwatches brand={brand} />
          <BrandFrame brand={brand} className="bprev--stage" label={`Chart example in ${brand.name}`}>
            <BarList />
          </BrandFrame>
        </div>
      </section>

      <section className="section" aria-labelledby="bk-type">
        <h2 id="bk-type">Typography</h2>
        <p className="section__lead">Typeface: <strong>{fontName(brand.fonts.heading)}</strong>. Body text is never smaller than 16px in production.</p>
        <BrandFrame brand={brand} className="bprev--stage" label={`Type specimen in ${brand.name}`}>
          <ul className="type-scale">
            {[['Display', '2.5rem', 700, 'Power back by 4:30 p.m.'], ['Heading 1', '2rem', 700, 'Your September bill'], ['Heading 2', '1.5rem', 600, 'Ways to save this winter'], ['Body', '1.125rem', 400, 'Most outages are fixed within four hours. We will text you when a crew is assigned.'], ['Small', '0.9375rem', 400, 'Account 4021 556 789 · Due October 15']].map(([n, s, w, t]) => (
              <li key={n} className="type-row">
                <span className="type-row__meta">{n}<br /><code>{s} / {w}</code></span>
                <span className="type-row__sample" style={{ fontSize: s, fontWeight: w }}>{t}</span>
              </li>
            ))}
          </ul>
        </BrandFrame>
      </section>

      <div className="two-col section">
        <section aria-labelledby="bk-voice">
          <h2 id="bk-voice">Voice and content</h2>
          <ul className="bullets bullets--spaced">{brand.voice.map((v) => <li key={v}>{v}</li>)}</ul>
        </section>
        <section aria-labelledby="bk-rules">
          <h2 id="bk-rules">Brand rules</h2>
          <dl className="rules">
            {brand.rules.map((r) => <div key={r.title}><dt>{r.title}</dt><dd>{r.body}</dd></div>)}
          </dl>
        </section>
      </div>

      <section className="section" aria-labelledby="bk-export">
        <h2 id="bk-export">Export tokens</h2>
        <p className="section__lead">Drop these into the project repo or import them into Figma, so design and code use the same values.</p>
        <Tabs
          key={brand.id}
          label="Token export format"
          tabs={[
            { id: 'css', label: 'CSS variables', content: <CodeBlock filename={`${brand.id}-tokens.css`} code={toCss(brand)} mime="text/css" /> },
            { id: 'tw', label: 'Tailwind', content: <CodeBlock filename={`tailwind.${brand.id}.js`} code={toTailwind(brand)} mime="text/javascript" /> },
            { id: 'json', label: 'Design tokens JSON', content: <CodeBlock filename={`${brand.id}.tokens.json`} code={toTokens(brand)} mime="application/json" /> },
          ]}
        />
      </section>
    </>
  );
}

/* ---------------- Sample dashboard ---------------- */
const DASH_COMPONENTS = ['filter-bar', 'stat-card', 'figure', 'status-badge', 'data-table', 'alert', 'loading-state'];

export function DashboardTemplate({ brandId }) {
  const brand = getBrand(brandId);
  const { addStars, announce } = useApp();
  const comps = DASH_COMPONENTS.map(getComponent);
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Template · {brand.name}</p>
        <h1 id="page-title" tabIndex={-1}>Sample dashboard</h1>
        <p className="lead">
          An outage operations dashboard built only from playbook components. Switch brands at the top of the page to
          re-theme it. Sort the table and remove filters to try the announcements with a screen reader.
        </p>
      </header>

      <div className="dash-layout">
        <BrandFrame brand={brand} className="bprev--dash" label={`Sample dashboard in ${brand.name}`}>
          <div className="bp-dash">
            <div className="bp-dash__top">
              <span className="bp-dash__brand"><BrandMark brand={brand} size={30} /><span>{brand.name}</span></span>
              <h2 className="bp-dash__title">Outage operations</h2>
              <p className="bp-muted bp-dash__updated"><Icon name="clock" /> Last updated 2:45 p.m.</p>
            </div>
            <div className="bp-alert bp-alert--warning">
              <Icon name="clock" />
              <p><strong>Warning:</strong> Storm warning for North Shore until 11 p.m. Expect more outages.</p>
            </div>
            <FilterBar />
            <section aria-labelledby="dash-kpi">
              <h3 id="dash-kpi" className="sr-only">Key figures</h3>
              <div className="bp-stats">{STATS.map((s) => <StatCard key={s.label} {...s} />)}</div>
            </section>
            <div className="bp-dash__grid">
              <section className="bp-panel" aria-labelledby="dash-cause">
                <h3 id="dash-cause" className="bp-h3">Causes</h3>
                <BarList title="Active outages by cause" />
              </section>
              <section className="bp-panel" aria-labelledby="dash-crews">
                <h3 id="dash-crews" className="bp-h3">Crew status</h3>
                <ul className="bp-crew">
                  <li><span>North depot</span><Badge type="danger">2 crews short</Badge></li>
                  <li><span>Harbour depot</span><Badge type="warning">At capacity</Badge></li>
                  <li><span>Pine Ridge depot</span><Badge type="success">Available</Badge></li>
                  <li><span>Contractors</span><Badge type="neutral">On call</Badge></li>
                </ul>
              </section>
            </div>
            <section className="bp-panel" aria-labelledby="dash-table">
              <h3 id="dash-table" className="bp-h3">Outages</h3>
              <OutageTable caption="Active outages, largest first" />
            </section>
          </div>
        </BrandFrame>

        <aside className="dash-aside" aria-label="Components in this template">
          <div className="panel">
            <h2 className="panel__title">Built from</h2>
            <ul className="chips">
              {comps.map((c) => <li key={c.id}><a className="chip" href={href.component(c.id, brand.id)}>{c.name}</a></li>)}
            </ul>
            <button
              type="button"
              className="btn btn--block"
              onClick={() => { addStars(DASH_COMPONENTS); announce(`Added ${comps.length} dashboard components to your checklist.`); }}
            >
              <Icon name="star" />
              Add all to my checklist
            </button>
            <CopyPanel components={comps} title={`${brand.name} operations dashboard`} heading="Copy dashboard criteria" level={3} brand={brand} />
          </div>
        </aside>
      </div>
    </>
  );
}
