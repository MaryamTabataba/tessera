/** Breadcrumb trail. The last item is the current page and is not a link. */
export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      <ol>
        {items.map((item, i) =>
          i === items.length - 1 ? (
            <li key={item.label}><span aria-current="page">{item.label}</span></li>
          ) : (
            <li key={item.label}><a href={item.to}>{item.label}</a></li>
          ),
        )}
      </ol>
    </nav>
  );
}
