import buildFiles from "virtual:build-recommendations";

export type BuildCategory =
  | "esports"
  | "gaming"
  | "aaa-gaming"
  | "productivity"
  | "editing";

export type BuildComponentKey = string;

export type BuildComponent = {
  key: BuildComponentKey;
  label: string;
  value: string;
  featured: boolean;
  estimatedPrice: string;
  affiliateUrl: string;
};

export type BuildRecommendation = {
  slug: string;
  name: string;
  price: string;
  categories: BuildCategory[];
  target: string;
  summary: string;
  reasoning: string;
  image: string;
  imageAlt: string;
  featured: boolean;
  components: BuildComponent[];
};

const buildCategories = new Set<BuildCategory>([
  "esports",
  "gaming",
  "aaa-gaming",
  "productivity",
  "editing",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(value: unknown, field: string, fileName: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fileName}: "${field}" must be a non-empty string.`);
  }

  return value;
}

function requiredBoolean(value: unknown, field: string, fileName: string): boolean {
  if (typeof value !== "boolean") {
    throw new Error(`${fileName}: "${field}" must be a boolean.`);
  }

  return value;
}

function componentUrl(value: Record<string, unknown>, field: string, fileName: string) {
  const affiliateUrl =
    typeof value.affiliateUrl === "string" ? value.affiliateUrl.trim() : "";
  const originalUrl =
    typeof value.originalUrl === "string" ? value.originalUrl.trim() : "";

  if (!affiliateUrl && !originalUrl) {
    throw new Error(
      `${fileName}: "${field}.affiliateUrl" or "${field}.originalUrl" must be a non-empty string.`,
    );
  }

  return affiliateUrl || originalUrl;
}

function parseComponent(
  value: unknown,
  index: number,
  fileName: string,
): BuildComponent {
  const field = `components[${index}]`;

  if (!isRecord(value)) {
    throw new Error(`${fileName}: "${field}" must be an object.`);
  }

  const key = requiredString(value.key, `${field}.key`, fileName);

  return {
    key,
    label: requiredString(value.label, `${field}.label`, fileName),
    value: requiredString(value.value, `${field}.value`, fileName),
    featured: requiredBoolean(value.featured, `${field}.featured`, fileName),
    estimatedPrice: requiredString(
      value.estimatedPrice,
      `${field}.estimatedPrice`,
      fileName,
    ),
    affiliateUrl: componentUrl(value, field, fileName),
  };
}

function parseBuild(value: unknown, fileName: string): BuildRecommendation {
  if (!isRecord(value)) {
    throw new Error(`${fileName}: the build definition must be an object.`);
  }

  // Build-planner exports keep the display fields in `build` and the parts list
  // alongside it. Normalize that shape before validating the public build data.
  const buildValue: Record<string, unknown> = isRecord(value.build)
    ? { ...value.build, components: value.components }
    : value;

  if (!Array.isArray(buildValue.categories) || buildValue.categories.length === 0) {
    throw new Error(`${fileName}: "categories" must be a non-empty array.`);
  }

  const categories = buildValue.categories.map((category, index) => {
    const parsedCategory = requiredString(
      category,
      `categories[${index}]`,
      fileName,
    );

    if (!buildCategories.has(parsedCategory as BuildCategory)) {
      throw new Error(
        `${fileName}: "categories[${index}]" has an unsupported value.`,
      );
    }

    return parsedCategory as BuildCategory;
  });

  if (!Array.isArray(buildValue.components) || buildValue.components.length === 0) {
    throw new Error(`${fileName}: "components" must be a non-empty array.`);
  }

  const components = buildValue.components.map((component, index) =>
    parseComponent(component, index, fileName),
  );

  const duplicateComponentKey = components.find(
    (component, index) =>
      components.findIndex((candidate) => candidate.key === component.key) !== index,
  );
  if (duplicateComponentKey) {
    throw new Error(
      `${fileName}: component key "${duplicateComponentKey.key}" is duplicated.`,
    );
  }

  return {
    slug: requiredString(buildValue.slug, "slug", fileName),
    name: requiredString(buildValue.name, "name", fileName),
    price: requiredString(buildValue.price, "price", fileName),
    categories,
    target: requiredString(buildValue.target, "target", fileName),
    summary: requiredString(buildValue.summary, "summary", fileName),
    reasoning: requiredString(buildValue.reasoning, "reasoning", fileName),
    image: requiredString(buildValue.image, "image", fileName),
    imageAlt: requiredString(buildValue.imageAlt, "imageAlt", fileName),
    featured: requiredBoolean(buildValue.featured, "featured", fileName),
    components,
  };
}

export const buildRecommendations: BuildRecommendation[] = buildFiles.map(
  ({ fileName, data }) => parseBuild(data, fileName),
);

const duplicateSlug = buildRecommendations.find(
  (build, index) =>
    buildRecommendations.findIndex((candidate) => candidate.slug === build.slug) !==
    index,
);
if (duplicateSlug) {
  throw new Error(`Build slug "${duplicateSlug.slug}" is duplicated.`);
}

export function getBuildBySlug(slug: string | undefined) {
  return buildRecommendations.find((build) => build.slug === slug);
}

export function getBuildsByCategory(category?: BuildCategory) {
  if (!category) return buildRecommendations;
  return buildRecommendations.filter((build) => build.categories.includes(category));
}
