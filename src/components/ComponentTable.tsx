import { useId } from "react";
import type { BuildComponent } from "../data/builds";

type ComponentTableProps = {
  components: BuildComponent[];
};

export function ComponentTable({ components }: ComponentTableProps) {
  const tooltipId = useId();

  return (
    <div className="component-table-wrap">
      <table className="component-table">
        <caption className="sr-only">
          Full component list with estimated prices and Shopee affiliate links
        </caption>
        <colgroup>
          <col className="component-table__component-column" />
          <col className="component-table__price-column" />
          <col className="component-table__link-column" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Component</th>
            <th scope="col">Estimated Price (₱)</th>
            <th scope="col">
              <span className="affiliate-heading">
                Shopee Link
                <span className="affiliate-help">
                  <button
                    type="button"
                    className="affiliate-help__trigger"
                    aria-label="About Shopee affiliate links"
                    aria-describedby={tooltipId}
                  >
                    ?
                  </button>
                  <span className="affiliate-tooltip" id={tooltipId} role="tooltip">
                    Affiliate link. Prices may vary.
                  </span>
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {components.map((component) => (
            <tr key={component.key}>
              <th scope="row">
                <span>{component.label}</span>
                <strong>{component.value}</strong>
              </th>
              <td>{component.estimatedPrice}</td>
              <td>
                <a
                  href={component.affiliateUrl}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  aria-label={`View ${component.label} on Shopee (affiliate link)`}
                >
                  View on Shopee <span aria-hidden="true">↗</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
