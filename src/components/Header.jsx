import { useEffect, useRef, useState } from 'react';
import { useApp } from '../state.jsx';
import { href, navIntent, swapBrand } from '../router.js';
import { config } from '../config.js';
import { BRANDS } from '../data/brands.js';
import { Icon, Logo } from './Icon.jsx';

/**
 * Top bar: logo, brand picker and shared reference links.
 */
export function Header({ route }) {
  const { starred } = useApp();
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const side = route.side;

  useEffect(() => setOpen(false), [route]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const util = [
    { id: 'standards', label: 'Standards', to: href.standards() },
    { id: 'checklist', label: 'My checklist', to: href.checklist(), count: starred.length },
    { id: 'wcag', label: 'WCAG', to: href.wcag(), exact: route.name === 'wcag' && !route.id, section: route.name === 'wcag' },
    { id: 'disabilities', label: 'Disabilities', to: href.disabilities(), exact: route.name === 'disabilities' && !route.id, section: route.name === 'disabilities' },
    { id: 'about', label: 'About', to: href.about() },
  ];

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <a className="logo" href={href.home()}>
          <Logo />
          <span className="logo__text">
            {config.appName}
            <span className="logo__tag">{config.product}</span>
          </span>
        </a>

        {side === 'brand' && route.brand && <BrandPicker route={route} />}

        <button
          ref={btnRef}
          type="button"
          className="btn menu-btn"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} />
          Menu
        </button>

        <nav id="main-nav" aria-label="Main" className={`mainnav${open ? ' is-open' : ''}`}>
          <ul>
            {util.map((item) => {
              const exact = item.exact ?? route.name === item.id;
              return (
                <li key={item.id}>
                  <a href={item.to} aria-current={exact ? 'page' : undefined} className={item.section || exact ? 'is-active' : undefined}>
                    {item.label}
                    {item.count != null && (
                      <span className={`count${item.count ? ' count--on' : ''}`}>
                        {item.count}
                        <span className="sr-only"> starred</span>
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function BrandPicker({ route }) {
  const { announce } = useApp();
  return (
    <div className="brand-picker">
      <label htmlFor="brand-picker">Brand</label>
      <select
        id="brand-picker"
        className="select select--compact"
        value={route.brand}
        onChange={(e) => {
          // Re-theme in place: focus stays on the picker and the change is announced.
          navIntent.keepFocus = true;
          window.location.hash = swapBrand(route, e.target.value).slice(1);
          const b = BRANDS.find((x) => x.id === e.target.value);
          announce(`Now showing ${b.name}.`);
        }}
      >
        {BRANDS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
      </select>
    </div>
  );
}
