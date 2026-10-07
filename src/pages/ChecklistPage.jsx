import { useEffect, useRef, useState } from 'react';
import { useApp, progressFor } from '../state.jsx';
import { getComponent } from '../data/components.js';
import { STARTER_SETS } from '../data/categories.js';
import { href } from '../router.js';
import { CriteriaChecklist } from '../components/CriteriaChecklist.jsx';
import { CopyPanel } from '../components/CopyPanel.jsx';
import { Progress } from '../components/Progress.jsx';
import { Icon } from '../components/Icon.jsx';
import { BRANDS, getBrand } from '../data/brands.js';

const focusTitle = () => window.setTimeout(() => document.getElementById('page-title')?.focus(), 0);

export function ChecklistPage() {
  const { starred, toggleStar, clearStars, checked, resetChecks, project, setProject, announce, lastBrand } = useApp();
  const [brandId, setBrandId] = useState(lastBrand);
  const brand = brandId ? getBrand(brandId) : null;
  const comps = starred.map(getComponent);
  const { done, total } = progressFor(comps, checked);

  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Your feature</p>
        <h1 id="page-title" tabIndex={-1}>My checklist</h1>
        <p className="lead">
          Every starred component in one list. Check criteria off as you go, then copy them into your story or test plan.
          Your list is saved in this browser.
        </p>
      </header>

      {comps.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__text">
            <h2>Your checklist is empty</h2>
            <p>
              Star components while you <a href={href.home()}>browse the checklists</a>, or start with a set that matches
              what you are building.
            </p>
          </div>
          <StarterSets heading="Start from a set" />
        </div>
      ) : (
        <div className="checklist">
          <div className="checklist__main">
            <div className="field field--wide">
              <label htmlFor="project-name">Feature or story name</label>
              <input
                id="project-name"
                className="input"
                type="text"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                aria-describedby="project-name-hint"
                autoComplete="off"
              />
              <p id="project-name-hint" className="hint">Used as the title of the copied criteria, such as “Outage reporting flow”.</p>
            </div>

            <div className="overall">
              <Progress done={done} total={total} label={`criteria checked across ${comps.length} components`} />
            </div>

            {comps.map((c) => {
              const p = progressFor([c], checked);
              return (
                <section key={c.id} className="cl-comp" aria-labelledby={`cl-${c.id}`}>
                  <div className="cl-comp__head">
                    <div>
                      <h2 id={`cl-${c.id}`}><a href={href.component(c.id)}>{c.name}</a></h2>
                      <p className="cl-comp__progress">{p.done} of {p.total} checked</p>
                    </div>
                    <button
                      type="button"
                      className="btn btn--quiet"
                      onClick={() => {
                        toggleStar(c.id);
                        announce(`${c.name} removed from your checklist.`);
                        focusTitle();
                      }}
                    >
                      <Icon name="close" />
                      Remove<span className="sr-only"> {c.name}</span>
                    </button>
                  </div>
                  <CriteriaChecklist component={c} headingLevel={3} />
                </section>
              );
            })}
          </div>

          <aside className="checklist__aside" aria-label="Checklist actions">
            <div className="panel">
              <CopyPanel components={comps} title={project.trim()} heading="Copy all criteria" brand={brand}>
                <div className="field">
                  <label htmlFor="copy-brand">Brand</label>
                  <select id="copy-brand" className="select" value={brandId} onChange={(e) => setBrandId(e.target.value)}>
                    <option value="">None: accessibility only</option>
                    {BRANDS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                  <p className="hint">Adds that brand’s tokens and contrast results to each component.</p>
                </div>
              </CopyPanel>
            </div>
            <div className="panel">
              <StarterSets heading="Add a set" level={2} />
            </div>
            <div className="panel">
              <h2 className="panel__title">Start over</h2>
              <div className="stack">
                <button
                  type="button"
                  className="btn btn--block"
                  aria-disabled={done === 0}
                  onClick={() => {
                    if (done === 0) return;
                    resetChecks(comps);
                    announce('All checks cleared.');
                  }}
                >
                  <Icon name="reset" />
                  Uncheck everything
                </button>
                <ClearChecklist count={comps.length} onClear={() => { clearStars(); announce('Checklist cleared.'); focusTitle(); }} />
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

/** Two-step confirmation built into the page (browser confirm dialogs are avoided). */
function ClearChecklist({ count, onClear }) {
  const [confirming, setConfirming] = useState(false);
  const cancelRef = useRef(null);
  const openRef = useRef(null);
  const wasConfirming = useRef(false);

  useEffect(() => {
    if (confirming) cancelRef.current?.focus();
    else if (wasConfirming.current) openRef.current?.focus();
    wasConfirming.current = confirming;
  }, [confirming]);

  if (!confirming) {
    return (
      <button ref={openRef} type="button" className="btn btn--block btn--danger" onClick={() => setConfirming(true)}>
        Clear checklist
      </button>
    );
  }
  return (
    <div className="confirm" role="group" aria-labelledby="confirm-clear-text">
      <p id="confirm-clear-text">Remove all {count} components from your checklist? Your checks are kept.</p>
      <div className="confirm__actions">
        <button ref={cancelRef} type="button" className="btn" onClick={() => setConfirming(false)}>Cancel</button>
        <button type="button" className="btn btn--danger" onClick={onClear}>Yes, clear it</button>
      </div>
    </div>
  );
}

function StarterSets({ heading, level = 2 }) {
  const { starred, addStars, announce } = useApp();
  const H = `h${level}`;
  return (
    <section className="sets" aria-labelledby="starter-sets-h">
      <H id="starter-sets-h" className="panel__title">{heading}</H>
      <ul className="sets__list">
        {STARTER_SETS.map((set) => {
          const missing = set.items.filter((id) => !starred.includes(id));
          const all = missing.length === 0;
          return (
            <li key={set.id} className="sets__item">
              <div>
                <p className="sets__name">{set.name}</p>
                <p className="sets__meta">{set.items.map((id) => getComponent(id).name).join(', ')}</p>
              </div>
              <button
                type="button"
                className="btn btn--small"
                aria-disabled={all}
                onClick={() => {
                  if (all) return;
                  addStars(set.items);
                  announce(`Added ${missing.length} components from ${set.name}.`);
                }}
              >
                <Icon name={all ? 'check' : 'plus'} />
                {all ? 'Added' : 'Add'}
                <span className="sr-only"> {set.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
