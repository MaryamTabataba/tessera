import { useApp } from '../state.jsx';
import { Icon } from './Icon.jsx';

/** Compact star toggle for lists. The name stays constant; aria-pressed carries the state. */
export function StarToggle({ component }) {
  const { starred, toggleStar, announce } = useApp();
  const on = starred.includes(component.id);
  return (
    <button
      type="button"
      className={`star${on ? ' is-on' : ''}`}
      aria-pressed={on}
      aria-label={`Star ${component.name}`}
      title={on ? 'Remove from my checklist' : 'Add to my checklist'}
      onClick={() => {
        toggleStar(component.id);
        announce(on ? `${component.name} removed from your checklist.` : `${component.name} added to your checklist.`);
      }}
    >
      <Icon name="star" filled={on} />
    </button>
  );
}

/** Full-width button for the component page header. */
export function StarButton({ component }) {
  const { starred, toggleStar, announce } = useApp();
  const on = starred.includes(component.id);
  return (
    <button
      type="button"
      className={`btn ${on ? 'btn--starred' : 'btn--primary'}`}
      onClick={() => {
        toggleStar(component.id);
        announce(on ? `${component.name} removed from your checklist.` : `${component.name} added to your checklist.`);
      }}
    >
      <Icon name="star" filled={on} />
      {on ? 'Remove from my checklist' : 'Add to my checklist'}
    </button>
  );
}
