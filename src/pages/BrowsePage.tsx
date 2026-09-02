const purposes = [
  "Esports",
  "AAA gaming",
  "Media and creativity",
  "3D models and rendering",
];

const budgets = [
  { label: "₱30k", value: "30000" },
  { label: "₱50k", value: "50000" },
  { label: "₱75k", value: "75000" },
  { label: "₱100k", value: "100000" },
  { label: "Limitless", value: "limitless" },
];

export function BrowsePage() {
  return (
    <main className="page browse-page">
      <div className="page-heading">
        <p className="eyebrow">Curated PC builds for the Philippines</p>
        <h1>Browse builds.</h1>
      </div>

      <form className="filters" aria-label="Build filters">
        <label className="filter-field">
          <span>Purpose</span>
          <select defaultValue="all" name="purpose">
            <option value="all">All purposes</option>
            {purposes.map((purpose) => (
              <option key={purpose} value={purpose.toLowerCase().replaceAll(" ", "-")}>
                {purpose}
              </option>
            ))}
          </select>
        </label>

        <label className="filter-field">
          <span>Maximum budget</span>
          <select defaultValue="limitless" name="budget">
            {budgets.map((budget) => (
              <option key={budget.value} value={budget.value}>
                {budget.label}
              </option>
            ))}
          </select>
        </label>
      </form>

      <section className="results" aria-labelledby="results-title">
        <div className="results-heading">
          <h2 id="results-title">Available builds</h2>
          <span>00 results</span>
        </div>

        <div className="empty-state">
          <h3>No builds available.</h3>
          <p>The first curated builds will appear here soon.</p>
        </div>
      </section>
    </main>
  );
}
