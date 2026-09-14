import { useState } from "react";
import { BuildCollection } from "../components/BuildCollection";
import { buildRecommendations } from "../data/builds";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const featuredBuilds = buildRecommendations.filter((build) => build.featured);
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
  const visibleBuilds = featuredBuilds.filter((build) =>
    build.name.toLocaleLowerCase().includes(normalizedQuery),
  );

  return (
    <main className="catalog-page section-shell" id="main-content">
      <header className="page-intro page-enter">
        <div>
          <p className="eyebrow">Built for the Philippine Market</p>
          <h1>Featured PC Builds</h1>
        </div>
        <form
          className="build-search"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="sr-only" htmlFor="home-build-name-search">
            Search builds by name
          </label>
          <input
            id="home-build-name-search"
            type="search"
            value={searchQuery}
            placeholder="Search builds by name"
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </form>
      </header>

      <section aria-label="Featured PC build recommendations" aria-live="polite">
        <BuildCollection
          builds={visibleBuilds}
          emptyMessage={`No builds match “${searchQuery.trim()}”.`}
        />
      </section>

      <p className="data-note">
        Placeholder configurations for interface review. Final parts and prices
        will be researched before publication.
      </p>
    </main>
  );
}
