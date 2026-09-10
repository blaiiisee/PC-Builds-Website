import { BuildCollection } from "../components/BuildCollection";
import { getBuildsByCategory, type BuildCategory } from "../data/builds";

type BuildListingPageProps = {
  category?: BuildCategory;
  eyebrow: string;
  title: string;
  description: string;
};

export function BuildListingPage({
  category,
  eyebrow,
  title,
  description,
}: BuildListingPageProps) {
  const builds = getBuildsByCategory(category);

  return (
    <main className="catalog-page section-shell" id="main-content">
      <header className="page-intro page-enter">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <p>{description}</p>
      </header>

      <section aria-label={`${title} recommendations`}>
        <BuildCollection builds={builds} />
      </section>
    </main>
  );
}
