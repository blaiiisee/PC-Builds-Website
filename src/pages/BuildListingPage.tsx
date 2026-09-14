import { useState } from "react";
import { BuildCollection } from "../components/BuildCollection";
import { getBuildsByCategory, type BuildCategory } from "../data/builds";

type BuildListingPageProps = {
  category?: BuildCategory;
  eyebrow: string;
  title: string;
  description?: string;
  enableNameSearch?: boolean;
};

export function BuildListingPage({
  category,
  eyebrow,
  title,
  description,
  enableNameSearch = false,
}: BuildListingPageProps) {
  const builds = getBuildsByCategory(category);
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
  const visibleBuilds = enableNameSearch
    ? builds.filter((build) =>
        build.name.toLocaleLowerCase().includes(normalizedQuery),
      )
    : builds;

  return (
    <main className="catalog-page section-shell" id="main-content">
      <header className="page-intro page-enter">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        {enableNameSearch ? (
          <form
            className="build-search"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="sr-only" htmlFor="build-name-search">
              Search builds by name
            </label>
            <input
              id="build-name-search"
              type="search"
              value={searchQuery}
              placeholder="Search builds by name"
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </form>
        ) : (
          description && <p>{description}</p>
        )}
      </header>

      <section aria-label={`${title} recommendations`} aria-live="polite">
        <BuildCollection
          builds={visibleBuilds}
          emptyMessage={
            enableNameSearch
              ? `No builds match “${searchQuery.trim()}”.`
              : undefined
          }
        />
      </section>
    </main>
  );
}
