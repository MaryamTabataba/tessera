import { DISABILITIES, disabilityAnchor } from '../data/disabilities.js';
import { componentsForDisability } from '../data/categories.js';
import { href } from '../router.js';

export function DisabilitiesPage({ focusId }) {
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Reference</p>
        <h1 id="page-title" tabIndex={-1}>Disabilities and assistive technology</h1>
        <p className="lead">
          Who our criteria protect, the tools they use, and which components matter most to them. Use this to
          explain the “why” to stakeholders, or to plan who to recruit for usability testing.
        </p>
      </header>

      <nav aria-label="Disability groups" className="jump">
        <ul>
          {DISABILITIES.map((d) => (
            <li key={d.id}><a href={href.disabilities(d.id)}>{d.short}</a></li>
          ))}
        </ul>
      </nav>

      <div className="dis-list">
        {DISABILITIES.map((d) => {
          const comps = componentsForDisability(d.id);
          return (
            <section
              key={d.id}
              id={disabilityAnchor(d.id)}
              tabIndex={-1}
              className={`dis${focusId === d.id ? ' is-target' : ''}`}
              aria-labelledby={`${disabilityAnchor(d.id)}-h`}
            >
              <h2 id={`${disabilityAnchor(d.id)}-h`}>{d.name}</h2>
              <p className="dis__desc">{d.description}</p>
              <div className="dis__cols">
                <div>
                  <h3>Assistive technology</h3>
                  <ul className="bullets">{d.tech.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
                <div>
                  <h3>What helps</h3>
                  <ul className="bullets">{d.needs.map((n) => <li key={n}>{n}</li>)}</ul>
                </div>
              </div>
              <h3>Components to review <span className="muted">({comps.length})</span></h3>
              <ul className="chips" aria-label={`Components that affect ${d.name.toLowerCase()}`}>
                {comps.map((c) => (
                  <li key={c.id}><a className="chip" href={href.component(c.id)}>{c.name}</a></li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
