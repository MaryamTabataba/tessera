import { href } from '../router.js';
import { criteriaCount, wcagFor } from '../data/categories.js';
import { StarToggle } from './StarButton.jsx';
import { Icon } from './Icon.jsx';

/** One component in a browse list: link, summary, counts and a star toggle. */
export function ComponentRow({ component, brandId, showSummary = true }) {
  return (
    <li className="row">
      <a className="row__link" href={href.component(component.id, brandId)}>
        <span className="row__name">
          {component.name}
          <Icon name="chevron" className="row__chev" />
        </span>
        {showSummary && <span className="row__summary">{component.summary}</span>}
        <span className="row__meta">
          {criteriaCount([component])} criteria · {wcagFor(component).length} WCAG
        </span>
      </a>
      <StarToggle component={component} />
    </li>
  );
}
