import { CATEGORIES } from '../data/categories.js';
import { href } from '../router.js';
import { config } from '../config.js';
import { ExtLink, Logo } from './Icon.jsx';
import { BRANDS } from '../data/brands.js';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <a className="logo" href={href.home()}>
            <Logo />
            <span className="logo__text">
              {config.appName}
              <span className="logo__tag">{config.product}</span>
            </span>
          </a>
          <p>
            Plain-language acceptance criteria for designers, developers and QA, mapped to {config.baseline} and to the
            people each component affects.
          </p>
        </div>

        <nav aria-label="Footer" className="footer__col">
          <h2 className="footer__h">Playbook</h2>
          <ul>
            <li><a href={href.home()}>Components</a></li>
            <li><a href={href.standards()}>Front-end standards</a></li>
            <li><a href={href.checklist()}>My checklist</a></li>
            <li><a href={href.wcag()}>WCAG 2.2 reference</a></li>
            <li><a href={href.disabilities()}>Disabilities</a></li>
            <li><a href={href.about()}>About</a></li>
          </ul>
        </nav>

        <nav aria-label="Footer branding" className="footer__col">
          <h2 className="footer__h">Branding</h2>
          <ul>
            <li><a href={href.brands()}>All brand kits</a></li>
            {BRANDS.map((b) => (
              <li key={b.id}><a href={href.brand(b.id)}>{b.name}</a></li>
            ))}
            <li><a href={href.dashboard('default')}>Sample dashboard</a></li>
          </ul>
        </nav>

        <nav aria-label="Footer categories" className="footer__col">
          <h2 className="footer__h">Categories</h2>
          <ul>
            {CATEGORIES.map((c) => (
              <li key={c.id}><a href={href.category(c.id)}>{c.name}</a></li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__h">Standards</h2>
          <ul>
            <li><ExtLink href="https://www.w3.org/TR/WCAG22/">WCAG 2.2</ExtLink></li>
            <li><ExtLink href="https://www.w3.org/WAI/WCAG22/Understanding/">Understanding WCAG 2.2</ExtLink></li>
            <li><ExtLink href="https://www.w3.org/WAI/ARIA/apg/">ARIA Authoring Practices</ExtLink></li>
          </ul>
        </div>
      </div>
      <p className="footer__legal">
        © {config.year} {config.appName}. For internal use. Criteria support, but do not replace, testing with disabled people.
      </p>
    </footer>
  );
}
