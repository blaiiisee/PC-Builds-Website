import { Link } from "react-router-dom";
import type { BuildRecommendation } from "../data/builds";
import { SpecGrid } from "./SpecGrid";

type BuildCardProps = {
  build: BuildRecommendation;
};

export function BuildCard({ build }: BuildCardProps) {
  return (
    <article className="build-card">
      <div className="build-card__image-wrap">
        <img className="build-card__image" src={build.image} alt={build.imageAlt} />
        <span className="asset-label">Placeholder image</span>
      </div>

      <div className="build-card__body">
        <div className="build-card__meta">
          <span>{build.target}</span>
          <p className="build-price"><span>Approx.</span> {build.price}</p>
        </div>
        <div className="build-card__content">
          <h2>
            <Link className="build-card__link" to={`/builds/${build.slug}`}>
              {build.name}
            </Link>
          </h2>
          <p className="build-summary">{build.summary}</p>
        </div>
        <SpecGrid components={build.components} featuredOnly />

        <div className="build-card__footer" aria-hidden="true">
          <span>View build</span>
          <span>↗</span>
        </div>
      </div>
    </article>
  );
}
