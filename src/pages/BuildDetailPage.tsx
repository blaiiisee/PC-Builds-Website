import { Link, useParams } from "react-router-dom";
import { SpecGrid } from "../components/SpecGrid";
import { getBuildBySlug } from "../data/builds";

export function BuildDetailPage() {
  const { slug } = useParams();
  const build = getBuildBySlug(slug);

  if (!build) {
    return (
      <main className="not-found-page section-shell page-enter" id="main-content">
        <p className="eyebrow">Build not found</p>
        <h1>That recommendation is not on the bench.</h1>
        <p>The link may be outdated, or the build may still be in research.</p>
        <Link className="button" to="/builds">
          Browse available builds
        </Link>
      </main>
    );
  }

  return (
    <main className="build-detail section-shell page-enter" id="main-content">
      <div className="build-detail__layout">
        <div className="build-detail__visual">
          <img src={build.image} alt={build.imageAlt} />
          <span className="asset-label">Placeholder image</span>
        </div>

        <div className="build-detail__copy">
          <Link className="back-link" to="/builds">
            ← All builds
          </Link>
          <p className="build-target">{build.target}</p>
          <h1>{build.name}</h1>
          <p className="build-detail__price">
            <span>Approximate build budget</span>
            {build.price}
          </p>
          <p className="build-detail__description">{build.reasoning}</p>
        </div>
      </div>

      <section className="build-detail__specs" aria-labelledby="core-specs-title">
        <div className="detail-section-heading">
          <p className="eyebrow">Component overview</p>
          <h2 id="core-specs-title">Core specification</h2>
          <p>{build.summary}</p>
        </div>
        <SpecGrid components={build.components} />
      </section>

      <aside className="placeholder-notice" aria-label="Placeholder data notice">
        <span>Before you buy</span>
        <p>
          This is placeholder content for evaluating the recommendation
          experience. Confirmed parts, current Philippine pricing, and optional
          affiliate links will be added after final research.
        </p>
      </aside>
    </main>
  );
}
