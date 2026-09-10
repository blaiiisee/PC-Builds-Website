export type BuildCategory =
  | "esports"
  | "gaming"
  | "aaa-gaming"
  | "productivity"
  | "editing";

export type BuildComponentKey =
  | "cpu"
  | "gpu"
  | "motherboard"
  | "ram"
  | "storage"
  | "psu"
  | "case"
  | "cooling";

export type BuildComponent = {
  key: BuildComponentKey;
  label: string;
  value: string;
  featured: boolean;
  affiliateUrl?: string;
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

export const buildRecommendations: BuildRecommendation[] = [
  {
    slug: "starter-esports",
    name: "Starter Gaming",
    price: "₱35,000",
    categories: ["esports", "gaming"],
    target: "1080p / Esports",
    summary:
      "A sharp first build for competitive games, everyday play, and the best performance where every peso counts.",
    reasoning:
      "Built around a proven six-core platform and a dedicated 1080p graphics card, this placeholder configuration prioritizes smooth competitive performance and straightforward future upgrades.",
    image: "/images/starter-esports.svg",
    imageAlt: "Compact black gaming PC build intended for esports and 1080p gaming",
    featured: true,
    components: [
      { key: "cpu", label: "CPU", value: "Ryzen 5 5600", featured: true },
      { key: "gpu", label: "GPU", value: "Radeon RX 6600", featured: true },
      { key: "ram", label: "Memory", value: "16GB DDR4", featured: true },
      { key: "storage", label: "Storage", value: "1TB NVMe SSD", featured: true },
    ],
  },
  {
    slug: "1440p-gaming",
    name: "1440p Gaming",
    price: "₱60,000",
    categories: ["gaming", "aaa-gaming"],
    target: "1440p / AAA Gaming",
    summary:
      "A GPU-first sweet spot for modern games at high settings without spending on performance you will not see.",
    reasoning:
      "This placeholder recommendation balances a modern AM5 processor with a capable 1440p graphics card, fast DDR5 memory, and a practical storage baseline for a growing game library.",
    image: "/images/1440p-gaming.svg",
    imageAlt: "White gaming PC build designed for high-refresh 1440p gaming",
    featured: true,
    components: [
      { key: "cpu", label: "CPU", value: "Ryzen 5 7500F", featured: true },
      { key: "gpu", label: "GPU", value: "Radeon RX 7700 XT", featured: true },
      { key: "ram", label: "Memory", value: "32GB DDR5", featured: true },
      { key: "storage", label: "Storage", value: "1TB NVMe SSD", featured: true },
    ],
  },
  {
    slug: "high-end-creator",
    name: "Gaming + Creator",
    price: "₱100,000",
    categories: ["gaming", "aaa-gaming", "editing", "productivity"],
    target: "Gaming / Editing / Productivity",
    summary:
      "A confident all-rounder for demanding games, heavy creative work, and workflows that cannot afford to wait.",
    reasoning:
      "The placeholder high-end build pairs an eight-core processor with an NVIDIA GPU for strong gaming performance and broad creative-app acceleration, supported by generous memory and storage.",
    image: "/images/high-end-creator.svg",
    imageAlt: "High-performance black PC build for gaming, editing, and productivity",
    featured: true,
    components: [
      { key: "cpu", label: "CPU", value: "Ryzen 7 9700X", featured: true },
      { key: "gpu", label: "GPU", value: "GeForce RTX 5070", featured: true },
      { key: "ram", label: "Memory", value: "32GB DDR5", featured: true },
      { key: "storage", label: "Storage", value: "2TB NVMe SSD", featured: true },
    ],
  },
];

export function getBuildBySlug(slug: string | undefined) {
  return buildRecommendations.find((build) => build.slug === slug);
}

export function getBuildsByCategory(category?: BuildCategory) {
  if (!category) return buildRecommendations;
  return buildRecommendations.filter((build) => build.categories.includes(category));
}
