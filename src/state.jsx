import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { load, save } from './lib/storage.js';
import { getComponent } from './data/components.js';
import { getBrand } from './data/brands.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [starred, setStarred] = useState(() => load('starred', []).filter((id) => getComponent(id)));
  const [checked, setChecked] = useState(() => load('checked', {}));
  const [copyOpts, setCopyOptsState] = useState(() => ({ format: 'md', wcag: true, disabilities: false, branding: true, ...load('copyOpts', {}) }));
  const [project, setProject] = useState(() => load('project', ''));
  const [lastBrand, setLastBrand] = useState(() => {
    const id = load('lastBrand', 'default');
    return getBrand(id) ? id : 'default';
  });
  const [message, setMessage] = useState('');

  useEffect(() => save('lastBrand', lastBrand), [lastBrand]);
  useEffect(() => save('starred', starred), [starred]);
  useEffect(() => save('checked', checked), [checked]);
  useEffect(() => save('copyOpts', copyOpts), [copyOpts]);
  useEffect(() => save('project', project), [project]);

  // Polite live region: clearing first makes repeated messages re-announce.
  const announce = useCallback((text) => {
    setMessage('');
    window.setTimeout(() => setMessage(text), 60);
  }, []);

  const toggleStar = useCallback((id) => {
    setStarred((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }, []);
  const addStars = useCallback((ids) => {
    setStarred((s) => [...s, ...ids.filter((id) => !s.includes(id))]);
  }, []);
  const clearStars = useCallback(() => setStarred([]), []);

  const toggleCheck = useCallback((key) => {
    setChecked((c) => {
      const next = { ...c };
      if (next[key]) delete next[key];
      else next[key] = true;
      return next;
    });
  }, []);
  const resetChecks = useCallback((components) => {
    setChecked((c) => {
      const next = { ...c };
      components.forEach((comp) => comp.groups.forEach((g) => g.items.forEach((i) => delete next[i.key])));
      return next;
    });
  }, []);

  const setCopyOpts = useCallback((patch) => setCopyOptsState((o) => ({ ...o, ...patch })), []);

  const value = useMemo(
    () => ({ starred, toggleStar, addStars, clearStars, checked, toggleCheck, resetChecks, copyOpts, setCopyOpts, project, setProject, lastBrand, setLastBrand, announce }),
    [starred, toggleStar, addStars, clearStars, checked, toggleCheck, resetChecks, copyOpts, setCopyOpts, project, lastBrand, announce],
  );

  return (
    <AppContext.Provider value={value}>
      {children}
      <div className="sr-only" role="status" aria-live="polite">{message}</div>
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

export function progressFor(components, checked) {
  let total = 0;
  let done = 0;
  components.forEach((c) => c.groups.forEach((g) => g.items.forEach((i) => {
    total += 1;
    if (checked[i.key]) done += 1;
  })));
  return { total, done };
}
