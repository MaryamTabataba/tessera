import { useEffect, useState } from 'react';

// Hash routing (#/c/button, #/brand/northgrid/c/button) works on any static host.
//
// Accessibility side:  #/  #/category/:id  #/c/:id
// Branding side:       #/brand  #/brand/:brand  #/brand/:brand/dashboard
//                      #/brand/:brand/category/:id  #/brand/:brand/c/:id
// Shared:              #/checklist  #/wcag/:sc?  #/disabilities/:id?  #/about
export function parseRoute(path) {
  const parts = path.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean).map(decodeURIComponent);
  switch (parts[0]) {
    case undefined: return { name: 'home', side: 'a11y' };
    case 'category': return { name: 'category', id: parts[1], side: 'a11y' };
    case 'c': return { name: 'component', id: parts[1], side: 'a11y' };
    case 'checklist': return { name: 'checklist' };
    case 'wcag': return { name: 'wcag', id: parts[1] };
    case 'disabilities': return { name: 'disabilities', id: parts[1] };
    case 'about': return { name: 'about' };
    case 'standards': return { name: 'standards' };
    case 'brand': {
      const brand = parts[1];
      if (!brand) return { name: 'brands', side: 'brand' };
      switch (parts[2]) {
        case undefined: return { name: 'brandOverview', brand, side: 'brand' };
        case 'dashboard': return { name: 'dashboard', brand, side: 'brand' };
        case 'components': return { name: 'home', brand, side: 'brand' };
        case 'category': return { name: 'category', brand, id: parts[3], side: 'brand' };
        case 'c': return { name: 'component', brand, id: parts[3], side: 'brand' };
        default: return { name: 'notFound' };
      }
    }
    default: return { name: 'notFound' };
  }
}

function currentPath() {
  if (typeof window === 'undefined') return '/';
  const h = window.location.hash.slice(1);
  return h.startsWith('/') ? h : '/';
}

/** Current hash path. `fixed` pins the path (used for server rendering in tests). */
export function useHashPath(fixed) {
  const [path, setPath] = useState(() => fixed ?? currentPath());
  useEffect(() => {
    if (fixed != null) return undefined;
    const onChange = () => {
      const h = window.location.hash.slice(1);
      if (h === '' || h.startsWith('/')) setPath(h || '/');
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, [fixed]);
  return path;
}

const b = (brand) => (brand ? `#/brand/${brand}` : '#');

export const href = {
  home: (brand) => (brand ? `${b(brand)}/components` : '#/'),
  category: (id, brand) => `${b(brand)}/category/${id}`,
  component: (id, brand) => `${b(brand)}/c/${id}`,
  brands: () => '#/brand',
  brand: (brand) => b(brand),
  dashboard: (brand) => `${b(brand)}/dashboard`,
  checklist: () => '#/checklist',
  wcag: (id) => (id ? `#/wcag/${id}` : '#/wcag'),
  disabilities: (id) => (id ? `#/disabilities/${id}` : '#/disabilities'),
  about: () => '#/about',
  standards: () => '#/standards',
};

/** Set before a navigation that should keep focus where it is (the brand picker). */
export const navIntent = { keepFocus: false };

/** Same page, different brand: used by the brand picker. */
export function swapBrand(route, brand) {
  switch (route.name) {
    case 'brandOverview': return href.brand(brand);
    case 'dashboard': return href.dashboard(brand);
    case 'home': return href.home(brand);
    case 'category': return href.category(route.id, brand);
    case 'component': return href.component(route.id, brand);
    default: return href.brand(brand);
  }
}
