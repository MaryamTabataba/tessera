/** Progress text plus a decorative bar. The text carries the meaning. */
export function Progress({ done, total, label = 'checked' }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="progress">
      <p className="progress__text">
        <strong>{done}</strong> of {total} {label}
        {done === total && total > 0 && <span className="progress__done"> · Complete</span>}
      </p>
      <div className="progress__bar" aria-hidden="true">
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
