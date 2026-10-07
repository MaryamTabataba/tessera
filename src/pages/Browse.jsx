import { useEffect, useRef, useState } from 'react';
import { useApp } from '../state.jsx';
import { CATEGORIES, ORDER, criteriaCount, getCategory } from '../data/categories.js';
import { COMPONENTS, getComponent } from '../data/components.js';
import { searchComponents } from '../lib/search.js';
import { href } from '../router.js';
import { ComponentRow } from '../components/ComponentRow.jsx';
import { CopyPanel } from '../components/CopyPanel.jsx';
import { Breadcrumbs } from '../components/Breadcrumbs.jsx';
import { Icon } from '../components/Icon.jsx';
import { BrandMark } from '../components/BrandBits.jsx';
import { getBrand } from '../data/brands.js';

/** Home (all categories) and single-category pages. */
export function Browse({ categoryId, brandId }) {
  const cat = categoryId ? getCategory(categoryId) : null;
  const brand = brandId ? getBrand(brandId) : null;
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // "/" focuses search, unless the user is already typing somewhere.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const scope = cat ? cat.items : ORDER;
  const q = query.trim();
  const results = q ? searchComponents(q).filter((c) => scope.includes(c.id)) : null;
  const sections = cat ? [cat] : CATEGORIES;

  return (
    <>
      {(cat || brand) && (
        <Breadcrumbs
          items={[
            ...(brand ? [{ label: brand.name, to: href.brand(brand.id) }] : []),
            ...(cat ? [{ label: brand ? 'Components' : 'Checklists', to: href.home(brand?.id) }, { label: cat.name }] : [{ label: 'Components' }]),
          ]}
        />
      )}
      <header className="page-head">
        <p className="eyebrow">
          {brand ? `${brand.name} · ` : ''}
          {cat ? `Category · ${cat.items.length} components` : `${ORDER.length} components · ${criteriaCount(COMPONENTS)} criteria`}
        </p>
        <h1 id="page-title" tabIndex={-1}>{cat ? cat.name : brand ? `Components in ${brand.name}` : 'Accessibility checklists'}</h1>
        <p className="lead">
          {cat
            ? cat.description
            : brand
            ? `Every component with its acceptance criteria, WCAG mapping, disabilities and a Branding tab showing it in ${brand.name} colours, with contrast checked live.`
            : 'Plain-language acceptance criteria for common components, mapped to WCAG 2.2 and to the people each one affects. Star what is in your feature, then copy the criteria into your story.'}
        </p>
      </header>

      {!cat && !brand && (
        <ol className="how" aria-label="How to use the checklists">
          <li><span className="how__n" aria-hidden="true">1</span><span><strong>Star</strong> the components in your feature.</span></li>
          <li><span className="how__n" aria-hidden="true">2</span><span><strong>Check off</strong> criteria as you design, build and test.</span></li>
          <li><span className="how__n" aria-hidden="true">3</span><span><strong>Copy</strong> them into your story, with WCAG references.</span></li>
        </ol>
      )}

      <div className="browse">
        <div className="browse__main">
          <div className="search" role="search" aria-label={cat ? `${cat.name} components` : 'Components'}>
            <label htmlFor="component-search" className="search__label">
              Search {cat ? `${cat.name.toLowerCase()} components` : 'all components'}
            </label>
            <div className="search__box">
              <Icon name="search" />
              <input
                ref={inputRef}
                id="component-search"
                type="search"
                className="input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-describedby="component-search-hint"
                autoComplete="off"
              />
              <kbd className="search__kbd" aria-hidden="true">/</kbd>
            </div>
            <p id="component-search-hint" className="hint">
              Search names, criteria, WCAG numbers or disabilities. Try “focus”, “2.4.7” or “colour”.
            </p>
          </div>

          <p role="status" className="search__status">
            {results && (results.length
              ? `${results.length} ${results.length === 1 ? 'component matches' : 'components match'} “${q}”.`
              : `No components match “${q}”.`)}
          </p>

          {results ? (
            results.length ? (
              <ul className="rows">
                {results.map((c) => <ComponentRow key={c.id} component={c} brandId={brand?.id} />)}
              </ul>
            ) : (
              <div className="empty">
                <p>Try fewer or different words, such as a component name or a WCAG number.</p>
                <button type="button" className="btn" onClick={() => { setQuery(''); inputRef.current?.focus(); }}>
                  Clear search
                </button>
              </div>
            )
          ) : (
            sections.map((section) => (
              <section key={section.id} className="cat" aria-labelledby={`cat-${section.id}`}>
                <div className="cat__head">
                  <h2 id={`cat-${section.id}`}>{cat ? `${section.name} components` : section.name}</h2>
                  {!cat && (
                    <a className="cat__more" href={href.category(section.id, brand?.id)}>
                      {section.items.length} components<span className="sr-only"> in {section.name}</span>
                    </a>
                  )}
                </div>
                {!cat && <p className="cat__desc">{section.description}</p>}
                <ul className="rows">
                  {section.items.map((id) => (
                    <ComponentRow key={`${section.id}-${id}`} component={getComponent(id)} brandId={brand?.id} />
                  ))}
                </ul>
              </section>
            ))
          )}
        </div>

        <aside className="browse__aside" aria-label="My checklist summary">
          <StarredSummary brand={brand} />
        </aside>
      </div>
    </>
  );
}

function StarredSummary({ brand }) {
  const { starred } = useApp();
  const comps = starred.map(getComponent);
  return (
    <div className="panel">
      <h2 className="panel__title">
        <Icon name="star" filled={comps.length > 0} />
        My checklist
      </h2>
      {comps.length === 0 ? (
        <p className="panel__text">
          Star components to collect their criteria here, or <a href={href.checklist()}>start from a ready-made set</a>.
        </p>
      ) : (
        <>
          <ul className="chips" aria-label="Starred components">
            {comps.map((c) => (
              <li key={c.id}><a className="chip" href={href.component(c.id, brand?.id)}>{c.name}</a></li>
            ))}
          </ul>
          <a className="panel__link" href={href.checklist()}>
            Track progress in my checklist <Icon name="arrowRight" className="icon--sm" />
          </a>
          <CopyPanel components={comps} heading="Copy starred criteria" level={3} brand={brand} />
        </>
      )}
    </div>
  );
}
