import { useEffect, useState } from 'react';
import { CATEGORIES, ORDER, categoriesFor } from '../data/categories.js';
import { getComponent } from '../data/components.js';
import { getBrand } from '../data/brands.js';
import { href } from '../router.js';
import { Icon } from './Icon.jsx';
import { BrandMark } from './BrandBits.jsx';

/** Category navigation for either side. The current category expands to show its components. */
export function Sidebar({ route }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [route]);
  const brand = route.brand ? getBrand(route.brand) : null;
  const bid = brand?.id;

  let currentCat = null;
  if (route.name === 'category') currentCat = route.id;
  if (route.name === 'component') currentCat = categoriesFor(route.id)[0]?.id ?? null;
  const here = (name, extra = true) => (route.name === name && extra ? 'page' : undefined);

  return (
    <div className="sidebar">
      <button type="button" className="btn sidebar__toggle" aria-expanded={open} aria-controls="cat-nav" onClick={() => setOpen((o) => !o)}>
        <Icon name="list" />
        {brand ? `${brand.name} menu` : 'Browse categories'}
        <Icon name="chevron" className={`sidebar__chev${open ? ' is-open' : ''}`} />
      </button>
      <nav id="cat-nav" aria-label={brand ? 'Brand and components' : 'Component categories'} className={`sidebar__nav${open ? ' is-open' : ''}`}>
        {brand && (
          <>
            <p className="sidebar__brand"><BrandMark brand={brand} size={26} /><span>{brand.name}</span></p>
            <ul className="sidebar__group">
              <li><a href={href.brand(bid)} aria-current={here('brandOverview')}><span><Icon name="palette" /> Brand kit</span></a></li>
              <li><a href={href.dashboard(bid)} aria-current={here('dashboard')}><span><Icon name="bolt" /> Sample dashboard</span></a></li>
            </ul>
            <p className="sidebar__label">Components</p>
          </>
        )}
        <ul>
          <li>
            <a href={href.home(bid)} aria-current={here('home')}>
              All components <span className="sidebar__n">{ORDER.length}</span>
            </a>
          </li>
          {CATEGORIES.map((cat) => {
            const expanded = cat.id === currentCat;
            return (
              <li key={cat.id}>
                <a
                  href={href.category(cat.id, bid)}
                  aria-current={here('category', route.id === cat.id)}
                  className={expanded ? 'is-section' : undefined}
                >
                  {cat.name} <span className="sidebar__n">{cat.items.length}</span>
                </a>
                {expanded && (
                  <ul className="sidebar__sub">
                    {cat.items.map((id) => (
                      <li key={id}>
                        <a href={href.component(id, bid)} aria-current={here('component', route.id === id)}>
                          {getComponent(id).name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
