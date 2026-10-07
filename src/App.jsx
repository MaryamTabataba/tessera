import { useEffect, useMemo, useRef } from 'react';
import { AppProvider, useApp } from './state.jsx';
import { navIntent, parseRoute, useHashPath } from './router.js';
import { config } from './config.js';
import { getCategory } from './data/categories.js';
import { getComponent } from './data/components.js';
import { getBrand } from './data/brands.js';
import { getSc, scAnchor } from './data/wcag.js';
import { getDisability, disabilityAnchor } from './data/disabilities.js';
import { Header } from './components/Header.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { Footer } from './components/Footer.jsx';
import { Browse } from './pages/Browse.jsx';
import { ComponentPage } from './pages/ComponentPage.jsx';
import { ChecklistPage } from './pages/ChecklistPage.jsx';
import { WcagPage } from './pages/WcagPage.jsx';
import { DisabilitiesPage } from './pages/DisabilitiesPage.jsx';
import { BrandsHome, BrandOverview, DashboardTemplate } from './pages/BrandPages.jsx';
import { About, NotFound } from './pages/About.jsx';
import { StandardsPage } from './pages/StandardsPage.jsx';

const NOT_FOUND = { title: 'Page not found', element: <NotFound /> };

function resolve(route) {
  const brand = route.brand ? getBrand(route.brand) : null;
  if (route.brand && !brand) return NOT_FOUND;
  const inBrand = (title) => (brand ? `${title} · ${brand.name}` : title);

  switch (route.name) {
    case 'home':
      return { title: inBrand(brand ? 'Components' : 'Accessibility checklists'), sidebar: true, element: <Browse key={brand?.id ?? 'a11y'} brandId={brand?.id} /> };
    case 'category': {
      const cat = getCategory(route.id);
      return cat
        ? { title: inBrand(`${cat.name} checklists`), sidebar: true, element: <Browse key={`${cat.id}-${brand?.id}`} categoryId={cat.id} brandId={brand?.id} /> }
        : NOT_FOUND;
    }
    case 'component': {
      const c = getComponent(route.id);
      return c ? { title: inBrand(`${c.name} checklist`), sidebar: true, element: <ComponentPage key={c.id} id={c.id} brandId={brand?.id} /> } : NOT_FOUND;
    }
    case 'brands':
      return { title: 'Brand kits', element: <BrandsHome /> };
    case 'brandOverview':
      return { title: `${brand.name} brand kit`, sidebar: true, element: <BrandOverview brandId={brand.id} /> };
    case 'dashboard':
      return { title: inBrand('Sample dashboard'), sidebar: true, element: <DashboardTemplate brandId={brand.id} /> };
    case 'checklist':
      return { title: 'My checklist', element: <ChecklistPage /> };
    case 'wcag': {
      const sc = route.id && getSc(route.id);
      return { title: sc ? `WCAG ${sc.id} ${sc.name}` : 'WCAG 2.2 reference', element: <WcagPage focusId={route.id} /> };
    }
    case 'disabilities': {
      const d = route.id && getDisability(route.id);
      return { title: d ? d.name : 'Disabilities', element: <DisabilitiesPage focusId={route.id} /> };
    }
    case 'about':
      return { title: 'About', element: <About /> };
    case 'standards':
      return { title: 'Front-end standards', element: <StandardsPage /> };
    default:
      return NOT_FOUND;
  }
}

function Shell({ fixedPath }) {
  const path = useHashPath(fixedPath);
  const { lastBrand, setLastBrand } = useApp();
  // Branding only: plain accessibility URLs (#/, #/c/button) open in the last-used brand.
  const route = useMemo(() => {
    const r = parseRoute(path);
    return r.side === 'a11y' ? { ...r, brand: lastBrand, side: 'brand' } : r;
  }, [path, lastBrand]);
  const page = resolve(route);
  const firstRender = useRef(true);

  useEffect(() => {
    document.title = `${page.title} · ${config.appName}`;
  }, [page.title]);

  useEffect(() => {
    if (route.brand && getBrand(route.brand)) setLastBrand(route.brand);
  }, [route.brand, setLastBrand]);

  // Focus management: deep links focus their target, the brand picker keeps focus,
  // and every other navigation moves focus to the page heading.
  useEffect(() => {
    const isFirst = firstRender.current;
    firstRender.current = false;
    if (navIntent.keepFocus) {
      navIntent.keepFocus = false;
      return;
    }
    let target = null;
    if (route.name === 'wcag' && route.id) target = document.getElementById(scAnchor(route.id));
    if (route.name === 'disabilities' && route.id) target = document.getElementById(disabilityAnchor(route.id));
    if (target) {
      target.scrollIntoView({ block: 'start' });
      target.focus({ preventScroll: true });
      return;
    }
    if (isFirst) return;
    window.scrollTo(0, 0);
    document.getElementById('page-title')?.focus({ preventScroll: true });
  }, [path]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          const main = document.getElementById('main');
          main?.focus();
          main?.scrollIntoView();
        }}
      >
        Skip to main content
      </a>
      <Header route={route} />
      <div className={`layout${page.sidebar ? ' layout--sidebar' : ''}${route.side === 'brand' ? ' layout--brand' : ''}`}>
        {page.sidebar && <Sidebar route={route} />}
        <main id="main" tabIndex={-1}>{page.element}</main>
      </div>
      <Footer />
    </>
  );
}

export default function App({ fixedPath }) {
  return (
    <AppProvider>
      <Shell fixedPath={fixedPath} />
    </AppProvider>
  );
}
