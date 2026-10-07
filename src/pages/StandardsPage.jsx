import { useEffect, useId, useRef, useState } from 'react';
import { useApp } from '../state.jsx';
import { STANDARDS, STANDARDS_VERSION, standardsText } from '../data/standards.js';
import { BRANDS, getBrand } from '../data/brands.js';
import { FORMATS } from '../lib/copyText.js';
import { copyText } from '../lib/clipboard.js';
import { toFigmaVariables } from '../lib/tokens.js';
import { Tabs } from '../components/Tabs.jsx';
import { CodeBlock } from '../components/CodeBlock.jsx';
import { Icon } from '../components/Icon.jsx';

export function StandardsPage() {
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Standards · Version {STANDARDS_VERSION}</p>
        <h1 id="page-title" tabIndex={-1}>Front-end standards</h1>
        <p className="lead">
          How we design in Figma, hand off to development and keep every client brand consistent and accessible. Each tab
          can be copied into Confluence, Notion or a ticket.
        </p>
      </header>
      <Tabs
        label="Standards"
        tabs={STANDARDS.map((tab) => ({
          id: tab.id,
          label: tab.label,
          content: <StandardsTab tab={tab} />,
        }))}
      />
    </>
  );
}

function StandardsTab({ tab }) {
  return (
    <div className="std">
      <div className="std__top">
        <p className="std__summary">{tab.summary}</p>
        <CopyTab tab={tab} />
      </div>
      {tab.sections.map((s, i) => {
        const hid = `std-${tab.id}-${i}`;
        return (
          <section key={s.title} className="std__sec" aria-labelledby={hid}>
            <h2 id={hid}>{s.title}</h2>
            {s.intro && <p className="std__intro">{s.intro}</p>}
            {s.list && (
              <ul className="std__list">
                {s.list.map((t) => <li key={t}><Icon name="check" />{t}</li>)}
              </ul>
            )}
            {s.steps && (
              <ol className="std__steps">
                {s.steps.map(([t, b], n) => (
                  <li key={t}>
                    <span className="std__n" aria-hidden="true">{n + 1}</span>
                    <span><strong>{t}.</strong> {b}</span>
                  </li>
                ))}
              </ol>
            )}
            {s.table && (
              <div className="table-wrap" role="region" aria-labelledby={hid} tabIndex={0}>
                <table className="table">
                  <caption className="sr-only">{s.title}</caption>
                  <thead><tr>{s.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
                  <tbody>
                    {s.table.rows.map((r) => (
                      <tr key={r[0]}>
                        <th scope="row">{r[0]}</th>
                        {r.slice(1).map((c, ci) => <td key={ci}>{ci === 0 && tab.id === 'figma' && s.title === 'Naming' ? <code>{c}</code> : c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        );
      })}
      {tab.id === 'figma' && <FigmaExport />}
    </div>
  );
}

function CopyTab({ tab }) {
  const { announce } = useApp();
  const id = useId();
  const [format, setFormat] = useState('md');
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return (
    <div className="std__copy">
      <label htmlFor={`${id}-f`} className="std__label">Format</label>
      <select id={`${id}-f`} className="select select--compact" value={format} onChange={(e) => setFormat(e.target.value)}>
        {FORMATS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
      </select>
      <button
        type="button"
        className="btn btn--primary"
        onClick={async () => {
          const ok = await copyText(standardsText(tab, format));
          announce(ok ? `${tab.label} standards copied.` : 'Copy failed. Select the text and copy it manually.');
          if (ok) {
            setCopied(true);
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(false), 2000);
          }
        }}
      >
        <Icon name={copied ? 'check' : 'copy'} />
        {copied ? 'Copied' : 'Copy'}<span className="sr-only"> {tab.label} standards</span>
      </button>
    </div>
  );
}

function FigmaExport() {
  const { lastBrand } = useApp();
  const [brandId, setBrandId] = useState(lastBrand);
  const brand = getBrand(brandId);
  return (
    <section className="std__sec" aria-labelledby="figma-export">
      <h2 id="figma-export">Export for Figma</h2>
      <p className="std__intro">
        Each brand as a Figma variables file. In Figma, open the Variables panel, right-click the mode for this brand in the
        Brand collection, choose Import, and pick this file. Repeat for each brand.
      </p>
      <div className="field field--inline">
        <label htmlFor="figma-brand">Brand</label>
        <select id="figma-brand" className="select select--compact" value={brandId} onChange={(e) => setBrandId(e.target.value)}>
          {BRANDS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>
      <CodeBlock filename={`${brand.id}.figma-variables.json`} code={toFigmaVariables(brand)} mime="application/json" />
    </section>
  );
}
