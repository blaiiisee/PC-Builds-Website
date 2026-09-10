import type { BuildRecommendation } from "../data/builds";
import { BuildCard } from "./BuildCard";
import { Reveal } from "./Reveal";

type BuildCollectionProps = {
  builds: BuildRecommendation[];
  emptyMessage?: string;
};

export function BuildCollection({
  builds,
  emptyMessage = "No recommendations are available in this category yet.",
}: BuildCollectionProps) {
  if (builds.length === 0) {
    return <p className="collection-empty">{emptyMessage}</p>;
  }

  return (
    <div className="build-collection">
      {builds.map((build, index) => (
        <Reveal className="build-card-slot" delay={index * 55} key={build.slug}>
          <BuildCard build={build} />
        </Reveal>
      ))}
    </div>
  );
}
