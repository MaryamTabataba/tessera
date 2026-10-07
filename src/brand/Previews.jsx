// Live, brand-themed specimens of each component. Everything reads --b-* custom
// properties set on the .bprev wrapper, so switching brand re-themes instantly.
// Specimens are real, accessible markup, but they never create page landmarks.
import { useId, useState } from 'react';
import { brandVars } from '../data/brands.js';
import { Icon } from '../components/Icon.jsx';
import { Tabs } from '../components/Tabs.jsx';

const noNav = (e) => e.preventDefault();
function SLink({ children, current }) {
  return <a href="#preview" onClick={noNav} aria-current={current ? 'page' : undefined}>{children}</a>;
}

/** Wrapper that applies a brand to everything inside it. */
export function BrandFrame({ brand, children, className = '', label }) {
  return (
    <div className={`bprev ${className}`} style={brandVars(brand)} role={label ? 'group' : undefined} aria-label={label}>
      {children}
    </div>
  );
}

/* ---------- Shared dashboard pieces (also used by the dashboard template) ---------- */

export const CAUSES = [
  { label: 'Weather', value: 18 },
  { label: 'Equipment failure', value: 9 },
  { label: 'Tree contact', value: 6 },
  { label: 'Animal contact', value: 4 },
];

export function BarList({ title = 'Active outages by cause', data = CAUSES, unit = 'outages' }) {
  const id = useId();
  const max = Math.max(...data.map((d) => d.value));
  const total = data.reduce((s, d) => s + d.value, 0);
  const top = data.reduce((a, b) => (b.value > a.value ? b : a));
  return (
    <figure className="bp-chart" aria-labelledby={`${id}-t`}>
      <figcaption>
        <span id={`${id}-t`} className="bp-chart__title">{title}</span>
        <span className="bp-chart__sum">{total} {unit} in total. {top.label} causes the most, with {top.value}.</span>
      </figcaption>
      <ul className="bp-bars">
        {data.map((d, i) => (
          <li key={d.label} className="bp-bars__row">
            <span className="bp-bars__label">{d.label}</span>
            <span className="bp-bars__track" aria-hidden="true">
              <span className={`bp-bars__bar bp-pat-${(i % 4) + 1}`} style={{ width: `${(d.value / max) * 100}%`, '--c': `var(--b-chart-${(i % 4) + 1})` }} />
            </span>
            <span className="bp-bars__val">{d.value}<span className="sr-only"> {unit}</span></span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

function Spark({ points }) {
  const w = 96; const h = 28; const max = Math.max(...points); const min = Math.min(...points);
  const d = points.map((p, i) => `${i ? 'L' : 'M'}${((i / (points.length - 1)) * w).toFixed(1)},${(h - 2 - ((p - min) / (max - min || 1)) * (h - 4)).toFixed(1)}`).join(' ');
  return (
    <svg className="bp-spark" viewBox={`0 0 ${w} ${h}`} aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );
}

export function StatCard({ label, value, change, good, dir, spark }) {
  return (
    <div className="bp-stat">
      <p className="bp-stat__label">{label}</p>
      <p className="bp-stat__value">{value}</p>
      <p className={`bp-stat__change ${good ? 'is-good' : 'is-bad'}`}>
        <Icon name={dir === 'up' ? 'up' : 'down'} />
        {change}
      </p>
      {spark && <Spark points={spark} />}
    </div>
  );
}

export const STATS = [
  { label: 'Customers affected', value: '12,480', change: 'Up 18% from yesterday', dir: 'up', good: false, spark: [6, 7, 5, 8, 9, 11, 12] },
  { label: 'Active outages', value: '37', change: 'Down 5 since 9:00 a.m.', dir: 'down', good: true, spark: [44, 46, 42, 41, 40, 38, 37] },
  { label: 'Average restore time', value: '2 h 14 min', change: 'Down 11 min from last week', dir: 'down', good: true, spark: [160, 150, 152, 141, 139, 136, 134] },
  { label: 'Crews dispatched', value: '58', change: 'Up 6 since 9:00 a.m.', dir: 'up', good: true, spark: [40, 44, 49, 50, 53, 55, 58] },
];

const STATUS = {
  danger: { icon: 'alert' },
  warning: { icon: 'clock' },
  success: { icon: 'check' },
  neutral: { icon: 'info' },
};
export function Badge({ type, children }) {
  return (
    <span className={`bp-badge bp-badge--${type}`}>
      <Icon name={STATUS[type].icon} />
      {children}
    </span>
  );
}

export const OUTAGES = [
  { id: 'OUT-5821', area: 'North Shore', customers: 4210, cause: 'Weather', status: ['danger', 'Crew needed'], eta: 180 },
  { id: 'OUT-5817', area: 'Harbourview', customers: 2875, cause: 'Equipment failure', status: ['warning', 'Crew en route'], eta: 95 },
  { id: 'OUT-5809', area: 'Pine Ridge', customers: 1640, cause: 'Tree contact', status: ['warning', 'Crew on site'], eta: 40 },
  { id: 'OUT-5802', area: 'Mill Creek', customers: 312, cause: 'Animal contact', status: ['success', 'Restored'], eta: 0 },
];

export function OutageTable({ caption = 'Active outages' }) {
  const id = useId();
  const [sort, setSort] = useState({ key: 'customers', dir: 'descending' });
  const rows = [...OUTAGES].sort((a, b) => (sort.dir === 'ascending' ? a[sort.key] - b[sort.key] : b[sort.key] - a[sort.key]));
  const [status, setStatus] = useState('');
  const cols = [
    { key: 'customers', label: 'Customers', num: true },
    { key: 'eta', label: 'Est. restore (min)', num: true },
  ];
  const toggle = (key, label) => {
    const dir = sort.key === key && sort.dir === 'descending' ? 'ascending' : 'descending';
    setSort({ key, dir });
    setStatus(`Sorted by ${label.toLowerCase()}, ${dir === 'descending' ? 'highest' : 'lowest'} first.`);
  };
  return (
    <>
      <div className="bp-table-wrap" role="region" aria-labelledby={`${id}-cap`} tabIndex={0}>
        <table className="bp-table">
          <caption id={`${id}-cap`}>{caption}</caption>
          <thead>
            <tr>
              <th scope="col">Outage</th>
              <th scope="col">Area</th>
              {cols.map((c) => (
                <th key={c.key} scope="col" className="bp-num" aria-sort={sort.key === c.key ? sort.dir : undefined}>
                  <button type="button" className="bp-sort" onClick={() => toggle(c.key, c.label)}>
                    {c.label}
                    <Icon name={sort.key === c.key ? (sort.dir === 'descending' ? 'down' : 'up') : 'sort'} />
                  </button>
                </th>
              ))}
              <th scope="col">Cause</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <th scope="row">{r.id}</th>
                <td>{r.area}</td>
                <td className="bp-num">{r.customers.toLocaleString('en-CA')}</td>
                <td className="bp-num">{r.eta ? r.eta : 'None'}</td>
                <td>{r.cause}</td>
                <td><Badge type={r.status[0]}>{r.status[1]}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="sr-only" role="status">{status}</p>
    </>
  );
}

export function FilterBar() {
  const id = useId();
  const [chips, setChips] = useState(['Region: North Shore', 'Status: Active']);
  const [msg, setMsg] = useState('');
  const remove = (c) => {
    const next = chips.filter((x) => x !== c);
    setChips(next);
    setMsg(`Filter removed. Showing ${37 + (4 - next.length * 2) * 3} outages.`);
  };
  return (
    <div className="bp-filters" role="group" aria-label="Filter outages">
      <div className="bp-filters__row">
        <div className="bp-field">
          <label htmlFor={`${id}-r`}>Region</label>
          <select id={`${id}-r`} className="bp-input" defaultValue="north">
            <option value="all">All regions</option>
            <option value="north">North Shore</option>
            <option value="harbour">Harbourview</option>
          </select>
        </div>
        <div className="bp-field">
          <label htmlFor={`${id}-s`}>Status</label>
          <select id={`${id}-s`} className="bp-input" defaultValue="active">
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="restored">Restored</option>
          </select>
        </div>
        <div className="bp-field">
          <label htmlFor={`${id}-d`}>From date</label>
          <input id={`${id}-d`} className="bp-input" type="text" inputMode="numeric" defaultValue="2026-10-01" aria-describedby={`${id}-dh`} />
          <p id={`${id}-dh`} className="bp-hint">YYYY-MM-DD</p>
        </div>
      </div>
      {chips.length > 0 && (
        <ul className="bp-chips" aria-label="Applied filters">
          {chips.map((c) => (
            <li key={c}>
              <span className="bp-chip">
                {c}
                <button type="button" aria-label={`Remove filter: ${c}`} onClick={() => remove(c)}><Icon name="close" /></button>
              </span>
            </li>
          ))}
          <li><button type="button" className="bp-btn bp-btn--text" onClick={() => { setChips([]); setMsg('All filters cleared. Showing 52 outages.'); }}>Clear all filters</button></li>
        </ul>
      )}
      <p className="sr-only" role="status">{msg}</p>
    </div>
  );
}

/* ---------- Simple specimens ---------- */

function Buttons() {
  return (
    <div className="bp-row">
      <button type="button" className="bp-btn bp-btn--primary">Report an outage</button>
      <button type="button" className="bp-btn bp-btn--secondary">View usage</button>
      <button type="button" className="bp-btn bp-btn--outline">Cancel</button>
      <button type="button" className="bp-btn bp-btn--icon" aria-label="Download September report (PDF)"><Icon name="download" /></button>
    </div>
  );
}

function Field({ label, hint, error, children }) {
  const id = useId();
  return (
    <div className={`bp-field${error ? ' is-invalid' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {hint && <p className="bp-hint" id={`${id}-h`}>{hint}</p>}
      {error && <p className="bp-error" id={`${id}-e`}><Icon name="alert" /><span><span className="sr-only">Error: </span>{error}</span></p>}
      {children({ id, describedBy: [hint && `${id}-h`, error && `${id}-e`].filter(Boolean).join(' ') || undefined })}
    </div>
  );
}

function TextInputs({ withError = true }) {
  return (
    <div className="bp-stack bp-narrow">
      <Field label="Account number" hint="The 10 digits at the top of your bill.">
        {({ id, describedBy }) => <input id={id} className="bp-input" type="text" inputMode="numeric" defaultValue="4021 556 789" aria-describedby={describedBy} />}
      </Field>
      {withError && (
        <Field label="Email" error="Enter an email address like name@example.com.">
          {({ id, describedBy }) => <input id={id} className="bp-input" type="email" defaultValue="sam@" aria-invalid="true" aria-describedby={describedBy} autoComplete="email" />}
        </Field>
      )}
    </div>
  );
}

function Choices({ type }) {
  const id = useId();
  if (type === 'switch') {
    return <Switch />;
  }
  const opts = type === 'radio' ? ['Paper bill', 'Email bill', 'Both'] : ['Outage alerts', 'Billing reminders', 'Conservation tips'];
  return (
    <fieldset className="bp-fieldset">
      <legend>{type === 'radio' ? 'How should we send your bill?' : 'Text me about'}</legend>
      {opts.map((o, i) => (
        <div key={o} className="bp-choice">
          <input type={type} id={`${id}-${i}`} name={`${id}-g`} defaultChecked={i === 1 || (type === 'checkbox' && i === 0)} />
          <label htmlFor={`${id}-${i}`}>{o}</label>
        </div>
      ))}
    </fieldset>
  );
}

function Switch() {
  const id = useId();
  const [on, setOn] = useState(true);
  return (
    <div className="bp-switch-row">
      <span id={`${id}-l`} className="bp-switch-label">Paperless billing</span>
      <button type="button" role="switch" aria-checked={on} aria-labelledby={`${id}-l`} className="bp-switch" onClick={() => setOn(!on)}>
        <span className="bp-switch__thumb" aria-hidden="true" />
      </button>
      <span className="bp-switch-state" aria-hidden="true">{on ? 'On' : 'Off'}</span>
    </div>
  );
}

function Alerts() {
  const items = [
    ['success', 'check', 'Success:', 'Payment of $142.18 received.'],
    ['warning', 'clock', 'Warning:', 'Planned maintenance Sunday, 2 to 4 a.m.'],
    ['danger', 'alert', 'Error:', 'We could not load outage data. Try again.'],
    ['info', 'info', 'Info:', 'Crews are working in your area.'],
  ];
  return (
    <div className="bp-stack">
      {items.map(([t, ic, title, body]) => (
        <div key={t} className={`bp-alert bp-alert--${t}`}>
          <Icon name={ic} />
          <p><strong>{title}</strong> {body}</p>
        </div>
      ))}
    </div>
  );
}

function Expander() {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <div className="bp-exp">
      <h3 className="bp-exp__h">
        <button type="button" aria-expanded={open} aria-controls={`${id}-p`} onClick={() => setOpen(!open)}>
          What should I do during a power outage?
          <Icon name="chevron" className={open ? 'is-open' : ''} />
        </button>
      </h3>
      <div id={`${id}-p`} hidden={!open} className="bp-exp__panel">
        <p>Unplug sensitive electronics, keep fridge doors closed, and stay 10 metres away from downed lines.</p>
      </div>
    </div>
  );
}

function PageFrame({ kind }) {
  return (
    <div className={`bp-page bp-page--${kind}`}>
      <div className="bp-page__bar">
        <span className="bp-page__mark" aria-hidden="true" />
        <span className="bp-page__title">{kind === 'web' ? 'Account overview' : 'My account'}</span>
      </div>
      <div className="bp-page__body">
        <p className="bp-h2">Your September bill</p>
        <p className="bp-muted">Due October 15 · Account 4021 556 789</p>
        <div className="bp-panel"><p className="bp-big">$142.18</p><p className="bp-muted">Up 4% from August</p></div>
        <button type="button" className="bp-btn bp-btn--primary">Pay bill</button>
      </div>
    </div>
  );
}

function Illustration({ informative }) {
  return (
    <figure className="bp-figure">
      <svg viewBox="0 0 240 120" className="bp-illus" {...(informative ? { role: 'img', 'aria-label': 'Diagram: power flows from the substation along the feeder line to homes.' } : { 'aria-hidden': 'true', focusable: 'false' })}>
        <rect x="10" y="50" width="50" height="50" rx="4" className="bp-ill-a" />
        <path d="M60 70 H180" className="bp-ill-line" />
        <rect x="180" y="55" width="22" height="45" className="bp-ill-b" />
        <rect x="208" y="65" width="22" height="35" className="bp-ill-b" />
        <circle cx="35" cy="30" r="12" className="bp-ill-c" />
      </svg>
      {informative && <figcaption>Power flows from the substation along the feeder line to homes.</figcaption>}
    </figure>
  );
}

const PREVIEWS = {
  button: () => <Buttons />,
  link: () => (
    <p className="bp-text">
      Rates change on November 1. <SLink>Read the 2026 rate notice (PDF, 2 MB)</SLink> or <SLink>compare rate plans</SLink>.
    </p>
  ),
  header: () => (
    <div className="bp-header">
      <span className="bp-header__logo"><span className="bp-page__mark" aria-hidden="true" />Customer portal</span>
      <ul className="bp-header__nav">
        <li><SLink current>Overview</SLink></li>
        <li><SLink>Outages</SLink></li>
        <li><SLink>Billing</SLink></li>
      </ul>
    </div>
  ),
  nav: () => (
    <ul className="bp-header__nav bp-header__nav--solo">
      <li><SLink current>Overview</SLink></li>
      <li><SLink>Outages</SLink></li>
      <li><SLink>Billing</SLink></li>
      <li><SLink>Usage</SLink></li>
    </ul>
  ),
  search: () => {
    const Search = () => {
      const id = useId();
      return (
        <div className="bp-search">
          <label htmlFor={id}>Search the site</label>
          <div className="bp-search__row">
            <input id={id} type="search" className="bp-input" defaultValue="outage map" />
            <button type="button" className="bp-btn bp-btn--primary bp-btn--square" aria-label="Search"><Icon name="search" /></button>
          </div>
        </div>
      );
    };
    return <Search />;
  },
  breadcrumbs: () => (
    <ol className="bp-crumbs">
      <li><SLink>Home</SLink></li>
      <li><SLink>Outages</SLink></li>
      <li><span aria-current="page">Report an outage</span></li>
    </ol>
  ),
  'nav-button': () => (
    <button type="button" className="bp-btn bp-btn--outline" aria-expanded="false"><Icon name="menu" />Menu</button>
  ),
  heading: () => (
    <div className="bp-stack bp-stack--tight">
      <p className="bp-h1">Power back by 4:30 p.m.</p>
      <p className="bp-h2">Ways to save this winter</p>
      <p className="bp-h3">Before a storm</p>
      <p className="bp-text">Most outages are fixed within four hours. We will text you as soon as a crew is assigned.</p>
    </div>
  ),
  card: () => (
    <ul className="bp-cards">
      {[['Time-of-use pricing', 'Pay less when you run appliances after 7 p.m.'], ['Home energy audit', 'Book a free visit to find drafts and leaks.']].map(([t, b]) => (
        <li key={t} className="bp-card">
          <h3 className="bp-card__h"><SLink>{t}</SLink></h3>
          <p className="bp-muted">{b}</p>
        </li>
      ))}
    </ul>
  ),
  alert: () => <Alerts />,
  checkbox: () => <Choices type="checkbox" />,
  radio: () => <Choices type="radio" />,
  'toggle-switch': () => <Switch />,
  select: () => (
    <div className="bp-narrow">
      <Field label="Province">
        {({ id }) => (
          <select id={id} className="bp-input" defaultValue="on">
            <option value="bc">British Columbia</option>
            <option value="on">Ontario</option>
            <option value="qc">Quebec</option>
          </select>
        )}
      </Field>
    </div>
  ),
  'input-text': () => <TextInputs />,
  'input-number': () => (
    <div className="bp-narrow">
      <Field label="Meter reading (kWh)" hint="Up to 6 digits. Ignore any red digits.">
        {({ id, describedBy }) => <input id={id} className="bp-input" type="text" inputMode="numeric" defaultValue="048213" aria-describedby={describedBy} />}
      </Field>
    </div>
  ),
  textarea: () => (
    <div className="bp-narrow">
      <Field label="Describe the problem" hint="Up to 500 characters.">
        {({ id, describedBy }) => <textarea id={id} className="bp-input bp-textarea" rows={3} defaultValue="Lights flickering on the whole street since 6 p.m." aria-describedby={describedBy} />}
      </Field>
    </div>
  ),
  form: () => (
    <div className="bp-stack">
      <div className="bp-errsum">
        <p className="bp-h3"><Icon name="alert" />There is 1 problem with your request</p>
        <ul><li><SLink>Email: Enter an email address like name@example.com.</SLink></li></ul>
      </div>
      <TextInputs />
      <button type="button" className="bp-btn bp-btn--primary">Submit request</button>
    </div>
  ),
  tooltip: () => {
    const Tip = () => {
      const id = useId();
      return (
        <div className="bp-tip-wrap">
          <button type="button" className="bp-btn bp-btn--icon" aria-describedby={id} aria-label="SAIDI"><Icon name="info" /></button>
          <span role="tooltip" id={id} className="bp-tip">System Average Interruption Duration Index</span>
        </div>
      );
    };
    return <Tip />;
  },
  popover: () => (
    <div className="bp-pop-wrap">
      <button type="button" className="bp-btn bp-btn--outline" aria-expanded="true">Notification settings</button>
      <div className="bp-pop" role="group" aria-label="Notification settings">
        <Switch />
      </div>
    </div>
  ),
  'dialog-modal': () => {
    const Dlg = () => {
      const id = useId();
      return (
        <div className="bp-dialog" role="group" aria-labelledby={id}>
          <p className="bp-h3" id={id}>Report a power outage?</p>
          <p className="bp-text">We will alert the repair crew for 42 Lakeview Avenue and text you updates.</p>
          <div className="bp-row bp-row--end">
            <button type="button" className="bp-btn bp-btn--outline">Cancel</button>
            <button type="button" className="bp-btn bp-btn--primary">Report outage</button>
          </div>
        </div>
      );
    };
    return <Dlg />;
  },
  expander: () => <Expander />,
  tabs: () => (
    <Tabs
      label="Usage period"
      tabs={[
        { id: 'day', label: 'Day', content: <p className="bp-text">Today: 18.4 kWh, 6% below your average.</p> },
        { id: 'month', label: 'Month', content: <p className="bp-text">September: 612 kWh.</p> },
        { id: 'year', label: 'Year', content: <p className="bp-text">Last 12 months: 8,809 kWh.</p> },
      ]}
    />
  ),
  figure: () => <BarList />,
  'stat-card': () => (
    <div className="bp-stats">
      {STATS.slice(0, 3).map((s) => <StatCard key={s.label} {...s} />)}
    </div>
  ),
  'data-table': () => <OutageTable />,
  'status-badge': () => (
    <ul className="bp-row" aria-label="Status examples">
      <li><Badge type="danger">Crew needed</Badge></li>
      <li><Badge type="warning">Crew en route</Badge></li>
      <li><Badge type="success">Restored</Badge></li>
      <li><Badge type="neutral">Scheduled</Badge></li>
    </ul>
  ),
  'filter-bar': () => <FilterBar />,
  'loading-state': () => (
    <div className="bp-stack">
      <div className="bp-skel" aria-hidden="true"><span /><span /><span /></div>
      <div className="bp-progress-row">
        <span id="bp-load-l" className="bp-muted">Loading outage data</span>
        <div className="bp-progress" role="progressbar" aria-labelledby="bp-load-l" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}>
          <span style={{ width: '60%' }} />
        </div>
      </div>
      <div className="bp-empty">
        <p className="bp-text"><strong>No outages in Mill Creek.</strong> Try another region or show all regions.</p>
        <button type="button" className="bp-btn bp-btn--outline">Show all regions</button>
      </div>
    </div>
  ),
  carousel: () => (
    <div className="bp-carousel" role="group" aria-roledescription="carousel" aria-label="Featured programs">
      <div className="bp-carousel__slide" role="group" aria-roledescription="slide" aria-label="2 of 4">
        <p className="bp-h3">Winter rebate program</p>
        <p className="bp-muted">Save up to $500 on a heat pump.</p>
      </div>
      <div className="bp-row">
        <button type="button" className="bp-btn bp-btn--outline bp-btn--square" aria-label="Previous slide"><Icon name="arrowLeft" /></button>
        <button type="button" className="bp-btn bp-btn--outline"><Icon name="pause" />Pause</button>
        <button type="button" className="bp-btn bp-btn--outline bp-btn--square" aria-label="Next slide"><Icon name="arrowRight" /></button>
        <span className="bp-dots" aria-hidden="true"><span /><span className="is-on" /><span /><span /></span>
      </div>
    </div>
  ),
  audio: () => <Player kind="audio" />,
  video: () => <Player kind="video" />,
  image: () => <Illustration informative />,
  'image-decorative': () => <Illustration />,
  html: () => <PageFrame kind="web" />,
  'android-view': () => <PageFrame kind="android" />,
  'ios-view': () => <PageFrame kind="ios" />,
  footer: () => (
    <div className="bp-footer">
      <ul>
        <li><SLink>Contact us</SLink></li>
        <li><SLink>Accessibility</SLink></li>
        <li><SLink>Privacy</SLink></li>
      </ul>
      <p className="bp-muted">© 2026 Customer portal. All rights reserved.</p>
    </div>
  ),
};

function Player({ kind }) {
  return (
    <div className={`bp-player bp-player--${kind}`}>
      {kind === 'video' && <div className="bp-player__screen" aria-hidden="true"><Icon name="play" /></div>}
      <div className="bp-player__bar">
        <button type="button" className="bp-player__play" aria-label={kind === 'video' ? 'Play storm safety video' : 'Play episode'}><Icon name="play" /></button>
        <span className="bp-player__track" aria-hidden="true"><span style={{ width: '35%' }} /></span>
        <span className="bp-player__time">1:12 / 3:30</span>
        <button type="button" className="bp-player__btn" aria-label="Mute"><Icon name="volume" /></button>
        {kind === 'video' && <button type="button" className="bp-player__btn bp-player__cc" aria-pressed="true">CC</button>}
      </div>
      <p className="bp-text"><SLink>Read the transcript</SLink></p>
    </div>
  );
}

export const hasPreview = (id) => Boolean(PREVIEWS[id]);
export function ComponentPreview({ id }) {
  const P = PREVIEWS[id];
  return P ? <P /> : null;
}
