import { useEffect, useRef, useState } from 'react';
import { useApp } from '../state.jsx';
import { canDownload, copyText, downloadText } from '../lib/clipboard.js';
import { Icon } from './Icon.jsx';

/** Code sample with Copy (and Download outside embedded previews). */
export function CodeBlock({ filename, code, mime = 'text/plain' }) {
  const { announce } = useApp();
  const [copied, setCopied] = useState(false);
  const [downloadable, setDownloadable] = useState(false);
  const timer = useRef(0);
  useEffect(() => setDownloadable(canDownload()), []);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <div className="code">
      <div className="code__bar">
        <span className="code__name">{filename}</span>
        <div className="code__actions">
          <button
            type="button"
            className="btn btn--small btn--on-dark"
            onClick={async () => {
              const ok = await copyText(code);
              announce(ok ? `${filename} copied to clipboard.` : 'Copy failed. Select the code and copy it manually.');
              if (ok) {
                setCopied(true);
                window.clearTimeout(timer.current);
                timer.current = window.setTimeout(() => setCopied(false), 2000);
              }
            }}
          >
            <Icon name={copied ? 'check' : 'copy'} />
            {copied ? 'Copied' : 'Copy'}<span className="sr-only"> {filename}</span>
          </button>
          {downloadable && (
            <button type="button" className="btn btn--small btn--on-dark" onClick={() => { downloadText(filename, code, mime); announce(`Downloading ${filename}.`); }}>
              <Icon name="download" />
              Download<span className="sr-only"> {filename}</span>
            </button>
          )}
        </div>
      </div>
      <pre tabIndex={0} aria-label={`${filename} contents`}><code>{code}</code></pre>
    </div>
  );
}
