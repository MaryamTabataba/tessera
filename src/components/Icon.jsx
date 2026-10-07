// Decorative icons. They are always hidden from assistive technology and paired with text
// or an accessible name on their control.
const PATHS = {
  star: <path d="M12 3.6l2.55 5.17 5.7.83-4.12 4.02.97 5.68L12 16.62 6.9 19.3l.97-5.68L3.75 9.6l5.7-.83L12 3.6z" />,
  copy: (<><rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2" /><path d="M15.5 8.5V5.8A1.8 1.8 0 0 0 13.7 4H5.8A1.8 1.8 0 0 0 4 5.8v7.9a1.8 1.8 0 0 0 1.8 1.8h2.7" /></>),
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
  download: <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  chevron: <path d="M9 6l6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  search: (<><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></>),
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v4.2A1.8 1.8 0 0 1 16.2 20H5.8A1.8 1.8 0 0 1 4 18.2V7.8A1.8 1.8 0 0 1 5.8 6H10" />,
  list: <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />,
  reset: <path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  alert: (<><path d="M12 3.5L2.5 20h19L12 3.5z" /><path d="M12 10v4.5M12 17.2v.3" /></>),
  info: (<><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.8v.3" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  up: <path d="M7 17L17 7M9 7h8v8" />,
  down: <path d="M7 7l10 10M17 9v8H9" />,
  play: <path d="M8 5l11 7-11 7V5z" />,
  pause: <path d="M8 5v14M16 5v14" />,
  volume: (<><path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16.5 8.5a5 5 0 0 1 0 7" /></>),
  sort: <path d="M8 9l4-4 4 4M8 15l4 4 4-4" />,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  palette: (<><path d="M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.9 1.5-2-.3-1.2.5-2 1.7-2H18a3 3 0 0 0 3-3c0-6-4-11-9-11z" /><circle cx="7.5" cy="11" r="1" /><circle cx="10.5" cy="7.5" r="1" /><circle cx="15" cy="7.5" r="1" /></>),
  grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
};

export function Icon({ name, filled = false, className = '' }) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  );
}

export function Logo() {
  return (
    <svg className="logo__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="8" className="logo__bg" />
      <path d="M8 11h16M8 16h16M8 21h16M11 8v16M16 8v16M21 8v16" className="logo__grid" />
      <path d="M9.5 16.5l3.6 3.6 9-9" className="logo__tick" />
    </svg>
  );
}

/** External link that warns it opens in a new tab. */
export function ExtLink({ href, children, className = '' }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`ext ${className}`}>
      {children}
      <Icon name="external" className="icon--sm" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
