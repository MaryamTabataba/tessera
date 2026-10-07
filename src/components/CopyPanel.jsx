import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useApp } from '../state.jsx';
import { buildCopyText, FORMATS } from '../lib/copyText.js';
import { canDownload, copyText, downloadText, slugify } from '../lib/clipboard.js';
import { criteriaCount } from '../data/categories.js';
import { Icon } from './Icon.jsx';

/**
 * Copy options + Copy/Download actions + a preview of exactly what will be copied.
 * Pass `brand` to offer branding specs in the copied text.
 */
export function CopyPanel({ components, title = '', heading = 'Copy criteria', level = 2, brand = null, children }) {
  const { copyOpts, setCopyOpts, announce } = useApp();
  const id = useId();
  const H = `h${level}`;
  const [copied, setCopied] = useState(false);
  const [downloadable, setDownloadable] = useState(false);
  const timer = useRef(0);

  useEffect(() => setDownloadable(canDownload()), []);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const text = useMemo(() => buildCopyText(components, { ...copyOpts, brand, title }), [components, copyOpts, brand, title]);
  const count = criteriaCount(components);
  const format = FORMATS.find((f) => f.id === copyOpts.format) || FORMATS[0];
  const empty = components.length === 0;

  const onCopy = async () => {
    if (empty) {
      announce('Nothing to copy yet. Star a component first.');
      return;
    }
    const ok = await copyText(text);
    announce(ok ? `Copied ${count} criteria as ${format.label}.` : 'Copy failed. Open the preview, select the text and copy it manually.');
    if (ok) {
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const onDownload = () => {
    const base = title || (components.length === 1 ? components[0].name : 'accessibility-criteria');
    const name = `${slugify(brand && copyOpts.branding ? `${base} ${brand.name}` : base)}.${format.ext}`;
    downloadText(name, text, format.ext === 'md' ? 'text/markdown' : 'text/plain');
    announce(`Downloading ${name}.`);
  };

  return (
    <section className="copy" aria-labelledby={`${id}-h`}>
      <H id={`${id}-h`} className="copy__heading">{heading}</H>
      <p className="copy__meta">
        {empty ? 'No components selected' : `${count} criteria from ${components.length} component${components.length === 1 ? '' : 's'}`}
      </p>

      {children}

      <div className="field">
        <label htmlFor={`${id}-format`}>Format</label>
        <select id={`${id}-format`} className="select" value={copyOpts.format} onChange={(e) => setCopyOpts({ format: e.target.value })}>
          {FORMATS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
        </select>
        <p className="hint">{format.hint}</p>
      </div>

      <fieldset className="field">
        <legend>Include</legend>
        <div className="check">
          <input type="checkbox" id={`${id}-wcag`} checked={copyOpts.wcag} onChange={(e) => setCopyOpts({ wcag: e.target.checked })} />
          <label htmlFor={`${id}-wcag`}>WCAG references</label>
        </div>
        <div className="check">
          <input type="checkbox" id={`${id}-dis`} checked={copyOpts.disabilities} onChange={(e) => setCopyOpts({ disabilities: e.target.checked })} />
          <label htmlFor={`${id}-dis`}>Who this affects</label>
        </div>
        {brand && (
          <div className="check">
            <input type="checkbox" id={`${id}-brand`} checked={copyOpts.branding} onChange={(e) => setCopyOpts({ branding: e.target.checked })} />
            <label htmlFor={`${id}-brand`}>Branding specs for {brand.name}</label>
          </div>
        )}
      </fieldset>

      <div className="copy__actions">
        <button type="button" className="btn btn--primary btn--block" onClick={onCopy} aria-disabled={empty}>
          <Icon name={copied ? 'check' : 'copy'} />
          {copied ? 'Copied' : 'Copy to clipboard'}
        </button>
        {downloadable && !empty && (
          <button type="button" className="btn btn--block" onClick={onDownload}>
            <Icon name="download" />
            Download .{format.ext}
          </button>
        )}
      </div>

      {!empty && (
        <details className="copy__preview">
          <summary>Preview text</summary>
          <pre tabIndex={0} aria-label="Text that will be copied">{text}</pre>
        </details>
      )}
    </section>
  );
}
