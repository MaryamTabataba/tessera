import { useApp, progressFor } from '../state.jsx';
import { getComponent } from '../data/components.js';
import { ORDER, categoriesFor, wcagFor } from '../data/categories.js';
import { getSc } from '../data/wcag.js';
import { getDisability } from '../data/disabilities.js';
import { getBrand } from '../data/brands.js';
import { componentBrand } from '../lib/brandSpec.js';
import { brandHealth, chartHealth, fmtRatio } from '../lib/contrast.js';
import { href } from '../router.js';
import { Breadcrumbs } from '../components/Breadcrumbs.jsx';
import { Tabs } from '../components/Tabs.jsx';
import { Progress } from '../components/Progress.jsx';
import { CriteriaChecklist } from '../components/CriteriaChecklist.jsx';
import { CopyPanel } from '../components/CopyPanel.jsx';
import { StarButton } from '../components/StarButton.jsx';
import { ExtLink, Icon } from '../components/Icon.jsx';
import { BrandMark, ContrastTable, Result, SpecTable } from '../components/BrandBits.jsx';
import { BrandFrame, ComponentPreview, hasPreview } from '../brand/Previews.jsx';

export function ComponentPage({ id, brandId }) {
  const component = getComponent(id);
  const brand = brandId ? getBrand(brandId) : null;
  const cats = categoriesFor(id);
  const { checked, resetChecks, announce, lastBrand } = useApp();
  const { done, total } = progressFor([component], checked);
  const scs = wcagFor(component).map(getSc);

  const index = ORDER.indexOf(id);
  const prev = index > 0 ? getComponent(ORDER[index - 1]) : null;
  const next = index < ORDER.length - 1 ? getComponent(ORDER[index + 1]) : null;

  const criteriaTab = (
    <>
      <div className="crit-bar">
        <Progress done={done} total={total} />
        <button
          type="button"
          className="btn btn--quiet"
          aria-disabled={done === 0}
          onClick={() => {
            if (done === 0) return;
            resetChecks([component]);
            announce(`Checks cleared for ${component.name}.`);
          }}
        >
          <Icon name="reset" />
          Reset checks
        </button>
      </div>
      <CriteriaChecklist component={component} headingLevel={2} />
    </>
  );

  const tabs = [
    { id: 'criteria', label: 'Acceptance criteria', count: total, content: criteriaTab },
    { id: 'wcag', label: 'WCAG', count: scs.length, content: <WcagTable component={component} scs={scs} /> },
    { id: 'disabilities', label: 'Disabilities', count: component.affects.length, content: <Affects component={component} /> },
  ];
  if (brand) tabs.push({ id: 'branding', label: 'Branding', content: <BrandingTab component={component} brand={brand} /> });

  return (
    <>
      <Breadcrumbs
        items={[
          ...(brand ? [{ label: brand.name, to: href.brand(brand.id) }] : []),
          { label: brand ? 'Components' : 'Checklists', to: href.home(brand?.id) },
          { label: cats[0].name, to: href.category(cats[0].id, brand?.id) },
          { label: component.name },
        ]}
      />

      <header className="comp-head">
        <div className="comp-head__text">
          <p className="eyebrow">{cats.map((c) => c.name).join(' · ')}</p>
          <h1 id="page-title" tabIndex={-1}>{component.name}</h1>
          <p className="lead">{component.summary}</p>
          <p className="side-note">
            {brand ? (
              <>
                <BrandMark brand={brand} size={20} />
                <span>Branded for <strong>{brand.name}</strong>. Change the brand at the top of the page.</span>
              </>
            ) : (
              <>
                <Icon name="palette" />
                <a href={href.component(component.id, lastBrand)}>See {component.name.toLowerCase()} with brand specs</a>
              </>
            )}
          </p>
        </div>
        <StarButton component={component} />
      </header>

      <div className="comp">
        <div className="comp__main">
          <Tabs key={`${component.id}-${brand ? 'b' : 'a'}`} label={`${component.name} checklist`} tabs={tabs} initial={brand ? 3 : 0} />
        </div>
        <aside className="comp__aside" aria-label="Copy criteria">
          <div className="panel panel--sticky">
            <CopyPanel components={[component]} brand={brand} />
          </div>
        </aside>
      </div>

      <nav aria-label="Previous and next component" className="pager">
        {prev ? (
          <a href={href.component(prev.id, brand?.id)} className="pager__link">
            <span className="pager__dir"><Icon name="arrowLeft" className="icon--sm" />Previous</span>
            <span className="pager__name">{prev.name}</span>
          </a>
        ) : <span />}
        {next && (
          <a href={href.component(next.id, brand?.id)} className="pager__link pager__link--next">
            <span className="pager__dir">Next<Icon name="arrowRight" className="icon--sm" /></span>
            <span className="pager__name">{next.name}</span>
          </a>
        )}
      </nav>
    </>
  );
}

function BrandingTab({ component, brand }) {
  const cb = componentBrand(component, brand);
  const fails = cb.checks.filter((c) => !c.pass);
  const avoid = brandHealth(brand).fails;
  const sid = `br-${component.id}`;
  return (
    <div className="branding">
      <section aria-labelledby={`${sid}-prev`} className="branding__sec">
        <div className="sec-head">
          <h2 id={`${sid}-prev`}>Preview in {brand.name}</h2>
          <a href={href.brand(brand.id)} className="small">Open brand kit</a>
        </div>
        {hasPreview(component.id) ? (
          <BrandFrame brand={brand} className="bprev--stage" label={`${component.name} preview in ${brand.name}`}>
            <ComponentPreview id={component.id} />
          </BrandFrame>
        ) : (
          <p className="muted">This component has no visual preview. Use the specs and rules below.</p>
        )}
      </section>

      <section aria-labelledby={`${sid}-con`} className="branding__sec">
        <h2 id={`${sid}-con`}>Contrast in {brand.name}</h2>
        {cb.checks.length === 0 ? (
          <p className="muted">This component has no brand colour pairings to check.</p>
        ) : (
          <>
            <p className={`verdict ${fails.length ? 'verdict--fail' : 'verdict--pass'}`}>
              <Icon name={fails.length ? 'alert' : 'check'} />
              {fails.length
                ? `${fails.length} of ${cb.checks.length} colour pairings fail. Fix these before design starts.`
                : `All ${cb.checks.length} colour pairings this component uses pass.`}
            </p>
            <ContrastTable id={`${sid}-ct`} results={cb.checks} brand={brand} caption={`${component.name} colour pairings in ${brand.name}`} />
          </>
        )}
        {avoid.length > 0 && (
          <div className="callout callout--warn">
            <Icon name="alert" />
            <div>
              <p className="callout__title">Do not use these {brand.name} combinations</p>
              <ul>
                {avoid.map((f) => <li key={f.label}><strong>{f.label}</strong>: {fmtRatio(f.ratio)}, needs {f.required}:1</li>)}
              </ul>
            </div>
          </div>
        )}
      </section>

      {cb.chart && (
        <section aria-labelledby={`${sid}-chart`} className="branding__sec">
          <h2 id={`${sid}-chart`}>Chart colours</h2>
          <ChartSwatches brand={brand} />
        </section>
      )}

      <section aria-labelledby={`${sid}-spec`} className="branding__sec">
        <h2 id={`${sid}-spec`}>Specs</h2>
        <SpecTable id={`${sid}-st`} specs={cb.specs} caption={`${component.name} tokens in ${brand.name}`} />
      </section>

      <section aria-labelledby={`${sid}-rules`} className="branding__sec">
        <h2 id={`${sid}-rules`}>Applying the brand</h2>
        <ul className="bullets">{cb.usage.map((u) => <li key={u}>{u}</li>)}</ul>
        {cb.rules.length > 0 && (
          <dl className="rules">
            {cb.rules.map((r) => (
              <div key={r.title}><dt>{r.title}</dt><dd>{r.body}</dd></div>
            ))}
          </dl>
        )}
      </section>
    </div>
  );
}

export function ChartSwatches({ brand }) {
  return (
    <ol className="chart-sw">
      {chartHealth(brand).map((c) => (
        <li key={c.hex}>
          <span className="chart-sw__chip" style={{ background: c.hex }} aria-hidden="true" />
          <span className="chart-sw__meta">
            <span>Series {c.index} <code>--chart-{c.index}</code></span>
            <code>{c.hex}</code>
            <span>{fmtRatio(c.ratio)} on surface</span>
          </span>
          <Result pass={c.pass} />
        </li>
      ))}
    </ol>
  );
}

function WcagTable({ component, scs }) {
  const uses = (scId) => component.groups.reduce((n, g) => n + g.items.filter((i) => i.sc.includes(scId)).length, 0);
  return (
    <div className="table-wrap" role="region" aria-labelledby={`wcag-cap-${component.id}`} tabIndex={0}>
      <table className="table">
        <caption id={`wcag-cap-${component.id}`}>
          WCAG 2.2 success criteria covered by the {component.name.toLowerCase()} checklist
        </caption>
        <thead>
          <tr>
            <th scope="col">Success criterion</th>
            <th scope="col">Level</th>
            <th scope="col">What it means</th>
            <th scope="col" className="num">Criteria</th>
          </tr>
        </thead>
        <tbody>
          {scs.map((sc) => (
            <tr key={sc.id}>
              <th scope="row">
                <a href={href.wcag(sc.id)} className="sc-link">
                  <span className="sc-link__id">{sc.id}</span> {sc.name}
                </a>
              </th>
              <td><span className={`level level--${sc.level.toLowerCase()}`}>{sc.level}</span></td>
              <td>
                {sc.summary}{' '}
                <ExtLink href={sc.url} className="small">W3C guidance<span className="sr-only"> for {sc.id}</span></ExtLink>
              </td>
              <td className="num">{uses(sc.id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Affects({ component }) {
  return (
    <ul className="affects">
      {component.affects.map((a) => {
        const d = getDisability(a.id);
        return (
          <li key={a.id} className="affects__item">
            <h2 className="affects__name"><a href={href.disabilities(a.id)}>{d.name}</a></h2>
            <p>{a.why}</p>
            <p className="affects__tech"><span className="affects__label">Often uses</span> {d.tech.join(', ')}</p>
          </li>
        );
      })}
    </ul>
  );
}
