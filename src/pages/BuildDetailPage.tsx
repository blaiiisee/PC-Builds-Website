import { Link, useParams } from "react-router-dom";
import { ComponentTable } from "../components/ComponentTable";
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
        <div className="build-detail__media">
          <div className="build-detail__visual">
            <img src={build.image} alt={build.imageAlt} />
            {build.image.split("?")[0].endsWith("/placeholder.svg") && (
              <span className="asset-label">Placeholder image</span>
            )}
          </div>
          <p className="build-detail__image-note">Image generated with AI.</p>
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
          <ComponentTable components={build.components} />
        </div>
      </div>

      <aside className="placeholder-notice" aria-label="Placeholder data notice">
        <span>Before you buy</span>
        <p>
          Prices may vary among stores. Displayed image may not accurately reflect
          the components listed. I recommend finding the best deals yourself.
        </p>
      </aside>
    </main>
  );
}
