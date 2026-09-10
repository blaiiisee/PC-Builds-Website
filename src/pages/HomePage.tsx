import { BuildCollection } from "../components/BuildCollection";
import { buildRecommendations } from "../data/builds";

export function HomePage() {
  const featuredBuilds = buildRecommendations.filter((build) => build.featured);

  return (
    <main className="catalog-page section-shell" id="main-content">
      <header className="page-intro page-enter">
        <div>
          <p className="eyebrow">Curated for the Philippines</p>
          <h1>Recommended PC Builds</h1>
        </div>
        <p>Curated builds for different budgets and workloads.</p>
      </header>

      <section aria-label="Featured PC build recommendations">
        <BuildCollection builds={featuredBuilds} />
      </section>

      <p className="data-note">
        Placeholder configurations for interface review. Final parts and prices
        will be researched before publication.
      </p>
    </main>
  );
}
