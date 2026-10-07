import { useApp } from '../state.jsx';
import { getSc } from '../data/wcag.js';
import { href } from '../router.js';

/** Grouped, checkable acceptance criteria with WCAG tags. */
export function CriteriaChecklist({ component, headingLevel = 2, showTags = true }) {
  const { checked, toggleCheck } = useApp();
  const H = `h${headingLevel}`;
  return (
    <div className="crit">
      {component.groups.map((group, gi) => {
        const hid = `crit-${component.id}-${gi}`;
        return (
          <section key={group.name} className="crit__group" aria-labelledby={hid}>
            <H id={hid} className="crit__heading">{group.name}</H>
            <ul className="crit__list">
              {group.items.map((item) => {
                const id = `chk-${item.key}`;
                const done = Boolean(checked[item.key]);
                return (
                  <li key={item.key} className={`crit__item${done ? ' is-done' : ''}`}>
                    <input type="checkbox" id={id} checked={done} onChange={() => toggleCheck(item.key)} />
                    <label htmlFor={id}>{item.text}</label>
                    {showTags && (
                      <span className="crit__tags">
                        {item.sc.length === 0 && <span className="tag tag--bp">Best practice</span>}
                        {item.sc.map((s) => {
                          const sc = getSc(s);
                          return (
                            <a key={s} href={href.wcag(s)} className="tag tag--sc" aria-label={`WCAG ${s} ${sc.name}, level ${sc.level}`}>
                              {s}
                            </a>
                          );
                        })}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
