import { useState } from 'react';
import { useApp } from '../state.jsx';
import { PRINCIPLES, WCAG, scAnchor } from '../data/wcag.js';
import { componentsForSc, wcagFor } from '../data/categories.js';
import { getComponent } from '../data/components.js';
import { href } from '../router.js';
import { ExtLink } from '../components/Icon.jsx';

const LEVELS = [
  { id: 'all', label: 'All levels' },
  { id: 'A', label: 'A' },
  { id: 'AA', label: 'AA' },
  { id: 'AAA', label: 'AAA' },
];

export function WcagPage({ focusId }) {
  const { starred } = useApp();
  const [level, setLevel] = useState('all');
  const [mine, setMine] = useState(false);

  const mineSet = new Set(starred.flatMap((id) => wcagFor(getComponent(id))));
  const visible = WCAG.filter((sc) => (level === 'all' || sc.level === level) && (!mine || mineSet.has(sc.id)));

  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Reference</p>
        <h1 id="page-title" tabIndex={-1}>WCAG 2.2 reference</h1>
        <p className="lead">
          The {WCAG.length} success criteria our checklists map to, in plain language. Each one links to the components
          that rely on it and to the official W3C guidance.
        </p>
      </header>

      <div className="filters">
        <fieldset className="seg">
          <legend>Conformance level</legend>
          <div className="seg__options">
            {LEVELS.map((l) => (
              <span key={l.id} className="seg__opt">
                <input type="radio" id={`lvl-${l.id}`} name="level" value={l.id} checked={level === l.id} onChange={() => setLevel(l.id)} />
                <label htmlFor={`lvl-${l.id}`}>{l.label}</label>
              </span>
            ))}
          </div>
        </fieldset>
        <div className="check">
          <input type="checkbox" id="only-mine" checked={mine} onChange={(e) => setMine(e.target.checked)} />
          <label htmlFor="only-mine">Only criteria used by my checklist ({starred.length} starred)</label>
        </div>
        <p role="status" className="filters__status">
          Showing {visible.length} of {WCAG.length} success criteria.
        </p>
      </div>

      {visible.length === 0 && (
        <div className="empty">
          <p>No success criteria match these filters.{mine && starred.length === 0 && <> Your checklist is empty, so <a href={href.home()}>star some components</a> first.</>}</p>
        </div>
      )}

      {PRINCIPLES.map((p) => {
        const items = visible.filter((sc) => sc.principle === p.id);
        if (!items.length) return null;
        return (
          <section key={p.id} className="principle" aria-labelledby={`pr-${p.id}`}>
            <div className="principle__head">
              <h2 id={`pr-${p.id}`}><span className="principle__n">{p.id}</span>{p.name}</h2>
              <p>{p.blurb}</p>
            </div>
            <div className="sc-list">
              {items.map((sc) => {
                const comps = componentsForSc(sc.id);
                return (
                  <article key={sc.id} id={scAnchor(sc.id)} tabIndex={-1} className={`sc${focusId === sc.id ? ' is-target' : ''}`} aria-labelledby={`${scAnchor(sc.id)}-h`}>
                    <div className="sc__head">
                      <h3 id={`${scAnchor(sc.id)}-h`}><span className="sc__id">{sc.id}</span> {sc.name}</h3>
                      <span className={`level level--${sc.level.toLowerCase()}`}>Level {sc.level}</span>
                    </div>
                    <p className="sc__summary">{sc.summary}</p>
                    <p className="sc__label">Used in {comps.length} {comps.length === 1 ? 'component' : 'components'}</p>
                    <ul className="chips" aria-label={`Components that use ${sc.id}`}>
                      {comps.map((c) => (
                        <li key={c.id}><a className={`chip${starred.includes(c.id) ? ' chip--starred' : ''}`} href={href.component(c.id)}>{c.name}</a></li>
                      ))}
                    </ul>
                    <ExtLink href={sc.url} className="sc__ext">Understanding {sc.id} on W3C</ExtLink>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
