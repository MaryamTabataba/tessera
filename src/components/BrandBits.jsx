import { fmtRatio, USE_LABEL } from '../lib/contrast.js';
import { Icon } from './Icon.jsx';

/** Brand monogram. Decorative: always next to the brand name in text. */
export function BrandMark({ brand, size = 32 }) {
  return (
    <span
      className="bmark"
      aria-hidden="true"
      style={{
        width: size, height: size, background: brand.colors.primary, color: brand.colors.onPrimary,
        borderRadius: brand.radius, fontFamily: brand.fonts.heading, fontSize: Math.round(size * 0.38),
      }}
    >
      {brand.mark}
    </span>
  );
}

export function Result({ pass }) {
  return pass ? (
    <span className="result result--pass"><Icon name="check" />Pass</span>
  ) : (
    <span className="result result--fail"><Icon name="close" />Fail</span>
  );
}

/** Table of contrast checks. Failing rows sort first. */
export function ContrastTable({ results, caption, brand, id }) {
  const rows = [...results].sort((a, b) => a.pass - b.pass);
  return (
    <div className="table-wrap" role="region" aria-labelledby={id} tabIndex={0}>
      <table className="table">
        <caption id={id}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">Sample</span></th>
            <th scope="col">Pairing</th>
            <th scope="col" className="num">Ratio</th>
            <th scope="col">Needs</th>
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.fg}-${r.bg}-${r.label}`} className={r.pass ? undefined : 'is-fail'}>
              <td>
                <span className={`sample${r.use === 'large-text' ? ' sample--lg' : ''}`} style={{ color: r.fgHex, background: r.bgHex, fontFamily: brand.fonts.body }} aria-hidden="true">
                  {r.use === 'ui' ? <span className="sample__ui" style={{ borderColor: r.fgHex }} /> : 'Aa'}
                </span>
              </td>
              <th scope="row">
                {r.label}
                {r.extra && <span className="tag tag--bp">Client request</span>}
                <span className="cell-sub"><code>{r.fg}</code> on <code>{r.bg}</code></span>
              </th>
              <td className="num">{fmtRatio(r.ratio)}</td>
              <td className="nowrap">{USE_LABEL[r.use]}</td>
              <td><Result pass={r.pass} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Spec table: element → token → value for a brand. */
export function SpecTable({ specs, caption, id }) {
  return (
    <div className="table-wrap" role="region" aria-labelledby={id} tabIndex={0}>
      <table className="table">
        <caption id={id}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Element</th>
            <th scope="col">Token</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {specs.map((s) => (
            <tr key={s.label}>
              <th scope="row">
                {s.label}
                {s.note && <span className="cell-sub">{s.note}</span>}
              </th>
              <td>{s.cssVar ? <code>{s.cssVar}</code> : <span className="muted">Fixed</span>}</td>
              <td>
                <span className="spec-val">
                  {s.swatch && <span className="inline-sw" style={{ background: s.swatch }} aria-hidden="true" />}
                  {s.swatches && (
                    <span className="inline-sws" aria-hidden="true">
                      {s.swatches.map((c) => <span key={c} className="inline-sw" style={{ background: c }} />)}
                    </span>
                  )}
                  <code style={s.font ? { fontFamily: s.font } : undefined}>{s.value}</code>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
