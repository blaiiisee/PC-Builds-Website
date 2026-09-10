import type { BuildComponent } from "../data/builds";

type SpecGridProps = {
  components: BuildComponent[];
  featuredOnly?: boolean;
};

export function SpecGrid({ components, featuredOnly = false }: SpecGridProps) {
  const visibleComponents = featuredOnly
    ? components.filter((component) => component.featured)
    : components;

  return (
    <dl className="spec-grid">
      {visibleComponents.map((component) => (
        <div className="spec-item" key={component.key}>
          <dt>{component.label}</dt>
          <dd>{component.value}</dd>
        </div>
      ))}
    </dl>
  );
}
