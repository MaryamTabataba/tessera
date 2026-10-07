import { config } from '../config.js';
import { href } from '../router.js';
import { ExtLink } from '../components/Icon.jsx';

export function About() {
  return (
    <article className="prose">
      <header className="page-head">
        <p className="eyebrow">About</p>
        <h1 id="page-title" tabIndex={-1}>About this playbook</h1>
        <p className="lead">
          {config.appName} turns accessibility requirements into short, testable acceptance criteria for each component,
          so the whole team agrees on what “accessible” means before work starts.
        </p>
      </header>

      <section aria-labelledby="a-sides">
        <h2 id="a-sides">What each component includes</h2>
        <dl className="roles">
          <div><dt>Acceptance criteria</dt><dd>Plain-language, testable criteria to copy into stories and check off.</dd></div>
          <div><dt>WCAG and Disabilities</dt><dd>The success criteria involved, and who is affected and why.</dd></div>
          <div>
            <dt>Branding</dt>
            <dd>
              A live preview in the selected brand, contrast checked for that brand, token specs and brand rules. Switch
              brands at the top of the page, or see the <a href={href.dashboard('default')}>sample dashboard</a>.
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="a-written">
        <h2 id="a-written">How the criteria are written</h2>
        <ul className="bullets">
          <li>Each criterion is one testable statement in plain language.</li>
          <li>Criteria are grouped the same way everywhere: name, role, state, keyboard and focus, visual and behaviour.</li>
          <li>Each criterion is tagged with the WCAG 2.2 success criteria it supports. Tags marked <strong>Best practice</strong> are not required by WCAG but prevent common problems.</li>
          <li>The Disabilities tab explains who is affected, which helps when you need to justify the work.</li>
        </ul>
      </section>

      <section aria-labelledby="a-standards">
        <h2 id="a-standards">Standards we design to</h2>
        <dl className="roles">
          <div><dt>{config.baseline}</dt><dd>Our baseline for all work. It meets or exceeds the requirements below.</dd></div>
          <div><dt>AODA (Ontario)</dt><dd>The Integrated Accessibility Standards Regulation requires public websites of designated public-sector organizations and organizations with 50 or more employees to meet WCAG 2.0 Level AA.</dd></div>
          <div><dt>ADA Title II (United States)</dt><dd>The 2024 Department of Justice rule sets WCAG 2.1 Level AA for state and local government websites and apps, including municipally owned utilities.</dd></div>
        </dl>
        <p className="muted small">Check compliance dates with the client’s legal team before quoting them. This is not legal advice.</p>
      </section>

      <section aria-labelledby="a-limits">
        <h2 id="a-limits">What checklists cannot do</h2>
        <p>
          Criteria catch most problems early, but they do not replace testing with assistive technology or with disabled
          people. Plan at least one round of usability testing with participants from the{' '}
          <a href={href.disabilities()}>groups we design for</a>.
        </p>
        <p>
          Read the official sources:{' '}
          <ExtLink href="https://www.w3.org/TR/WCAG22/">WCAG 2.2</ExtLink> and the{' '}
          <ExtLink href="https://www.w3.org/WAI/ARIA/apg/">ARIA Authoring Practices Guide</ExtLink>.
        </p>
      </section>
    </article>
  );
}

export function NotFound() {
  return (
    <header className="page-head">
      <p className="eyebrow">404</p>
      <h1 id="page-title" tabIndex={-1}>Page not found</h1>
      <p className="lead">
        That page does not exist. <a href={href.home()}>Go to all checklists</a>.
      </p>
    </header>
  );
}
