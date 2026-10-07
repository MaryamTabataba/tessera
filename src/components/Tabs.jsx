import { useId, useRef, useState } from 'react';

/**
 * ARIA tabs with automatic activation.
 * Tab moves to the selected tab, arrow keys / Home / End move between tabs.
 */
export function Tabs({ label, tabs, initial = 0 }) {
  const base = useId();
  const [selected, setSelected] = useState(initial);
  const refs = useRef([]);

  const onKeyDown = (event, index) => {
    const last = tabs.length - 1;
    let next = null;
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    if (next !== null) {
      event.preventDefault();
      setSelected(next);
      refs.current[next]?.focus();
    }
  };

  return (
    <div className="tabs">
      <div role="tablist" aria-label={label} className="tabs__list">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="tab"
            id={`${base}-tab-${tab.id}`}
            aria-controls={`${base}-panel-${tab.id}`}
            aria-selected={i === selected}
            tabIndex={i === selected ? 0 : -1}
            onClick={() => setSelected(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {tab.label}
            {tab.count != null && <span className="tabs__count">{tab.count}</span>}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${base}-panel-${tab.id}`}
          aria-labelledby={`${base}-tab-${tab.id}`}
          tabIndex={0}
          hidden={i !== selected}
          className="tabs__panel"
        >
          {i === selected ? tab.content : null}
        </div>
      ))}
    </div>
  );
}
