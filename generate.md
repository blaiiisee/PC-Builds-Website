# PC Builds Website — Project Specification

## Project Purpose

This website provides curated PC build recommendations for users in the Philippines. Its primary job is to help someone quickly answer:

> What PC should I build for my budget and use case?

Recommendations are organized around practical budgets and workloads such as esports, 1080p gaming, 1440p gaming, AAA games, editing, and productivity. The builds should explain why their parts make sense together instead of acting as a random parts generator.

This is an editorial and recommendation product, not an online PC store.

## Product Principles

- Put PC recommendations and their important specifications ahead of marketing content.
- Make price, target workload, CPU, GPU, memory, and storage visible without opening a detail page.
- Use Philippine peso pricing and write for users sourcing parts in the Philippines.
- Explain the reasoning behind each build in clear, direct language.
- Keep pages focused. Use separate routes instead of one long landing page.
- Treat prices and component choices as researched recommendations once real data replaces the current placeholders.
- Preserve the project's existing Arial/Helvetica typography.
- Favor a deliberate enthusiast/developer aesthetic over a generic SaaS or e-commerce appearance.

## Explicit Non-Goals

Do not add the following unless the product requirements are intentionally changed:

- Shopping cart or checkout
- Financing
- Inventory or shipping status
- User accounts or authentication
- Database, backend service, or CMS
- Complex filtering or state-management libraries
- Fake purchasing controls
- Store-specific functionality copied from another website

Component affiliate links are presented as transparent recommendations and must not turn the website into a simulated storefront.

## Current Features

- Compact global navigation with desktop and accessible mobile layouts
- Dedicated pages for all builds, gaming recommendations, productivity recommendations, and project information
- Three structured placeholder build recommendations
- Reusable build cards with visible target, price, summary, and featured specifications
- Individual build detail routes
- Full eight-row component tables with placeholder estimated prices and Shopee affiliate links
- Hover- and keyboard-accessible affiliate disclosure
- Friendly unknown-build state
- Shared header and compact footer
- TikTok link for `@iblaise_`: <https://www.tiktok.com/@iblaise_>
- Local placeholder PC artwork with descriptive alternative text
- Responsive one-, two-, and three-column layouts
- Horizontal card treatment on ultrawide displays through container queries
- Subtle page, card, image, and navigation transitions
- `prefers-reduced-motion` support
- Keyboard-accessible mobile menu with Escape-to-close behavior

## Route Structure

| Route | Purpose |
| --- | --- |
| `/` | Featured/recommended builds shown immediately below a compact heading |
| `/builds` | Complete collection of available build recommendations |
| `/gaming` | Builds categorized for gaming workloads |
| `/productivity` | Builds categorized for productivity workloads |
| `/builds/:slug` | Individual build overview and component specification |
| `/about` | Project purpose and recommendation methodology |

TikTok is linked from the shared navigation and footer rather than having a dedicated social page.

## Current Placeholder Builds

The existing build names, prices, components, explanations, and images are placeholders for interface development. They are not final purchasing advice.

1. **Starter Gaming** — approximately ₱35,000; intended for 1080p and esports.
2. **1440p Gaming** — approximately ₱60,000; intended for 1440p and AAA gaming.
3. **Gaming + Creator** — approximately ₱100,000; intended for gaming, editing, and productivity.

Before publishing real recommendations, verify complete component compatibility, current Philippine pricing, availability, performance expectations, upgrade paths, and PSU/cooling requirements.

## Build Data Model

Build content lives in `src/data/builds.ts` and is the single source of truth for homepage cards, listing pages, category pages, and detail pages.

Each `BuildRecommendation` contains:

- `slug` — stable route identifier
- `name` — public recommendation name
- `price` — approximate total budget displayed to the user
- `categories` — workload/category identifiers used by route filtering
- `target` — concise display label such as `1440p / AAA Gaming`
- `summary` — short card explanation
- `reasoning` — longer detail-page explanation
- `image` and `imageAlt` — replaceable visual asset and descriptive alternative text
- `featured` — whether the build appears on the homepage
- `components` — ordered component records

Each component record contains a typed key, display label, value, whether it appears on summary cards, a required `estimatedPrice`, and a required `affiliateUrl`.

Supported component keys are CPU, GPU, motherboard, RAM, storage, PSU, case, and cooling. Records are ordered CPU, GPU, motherboard, memory, storage, PSU, case, and cooling. Summary cards expose only the four records marked as featured; detail pages show all eight records.

## Component Architecture

- `SiteLayout` owns the shared header, responsive navigation, footer, skip link, and TikTok links.
- `HomePage` selects featured builds and keeps the homepage focused on recommendations.
- `BuildListingPage` is the shared page template used by all, gaming, and productivity routes.
- `BuildCollection` renders an array of recommendations and owns the responsive grid and empty state.
- `BuildCard` presents the image, target, approximate price, explanation, featured specifications, and detail link.
- `SpecGrid` renders the four featured component records on compact cards.
- `ComponentTable` renders the complete component, estimated-price, and affiliate-link catalog on detail pages.
- `BuildDetailPage` resolves the route slug and renders the image beside an overview whose complete component table follows the description, plus a placeholder-data notice.
- `Reveal` provides the limited native Intersection Observer entrance effect.

Keep build data separate from presentation. Add or update a recommendation in the data module instead of duplicating page markup.

## Visual System

The interface uses flat, technical catalog styling:

- Off-white page background
- Black and near-black typography
- Charcoal header and footer
- Dark navy and muted blue accents
- Thin neutral borders
- Mostly square corners with only subtle radius where useful
- Strong typographic hierarchy
- Dense but readable specification layouts
- Large enough PC imagery to understand each recommendation visually

Avoid introducing:

- Red, cherry, or amber accent themes
- Bright royal blue as a dominant color
- Glassmorphism or backdrop-heavy surfaces
- Gradient blobs and decorative glows
- Giant rounded cards
- Bento-grid layouts
- Dramatic shadows
- Excessive pills or badges
- Oversized marketing headlines or hero sections
- Large areas of empty introductory whitespace

Visual inspiration may be taken from <https://zttbuilds.com/> for general hierarchy, density, PC presentation, navigation quality, and restrained interactions. Do not copy its branding, content, product names, photography, or commerce features.

## Responsive Requirements

- Use fluid horizontal gutters rather than a restrictive centered `max-width` shell.
- Around 375–430px: one-column cards, compact navigation, visible two-by-two summary specs, practical image ratios, and no horizontal scrolling.
- Tablet: two-column build grids where space permits.
- Standard desktop and 16:9 displays: three-column recommendation grids with builds visible near the first viewport.
- Ultrawide and 21:9 displays: use the available width; current cards become image-and-content layouts when their containers are wide enough.
- Build-detail pages above 860px keep the image in the left column and place the title, budget, description, and complete component table together in the right column. At 860px and below, those columns stack with the image first.
- Keep paragraph line lengths readable even when the overall layout is fluid.
- Maintain tap targets of approximately 44px or larger.

Do not hard-code the interface around only three specific viewport widths. Prefer grid, `minmax()`, `clamp()`, and container queries.

## Accessibility Requirements

- Use semantic headings, landmarks, lists, and definition lists.
- Keep the skip link functional on every route.
- All meaningful images require descriptive `alt` text.
- All interactive controls must be keyboard accessible and have visible focus states.
- Mobile navigation must expose its expanded state and close with Escape.
- Do not rely on hover to expose essential build information.
- Maintain accessible contrast across light and dark surfaces.
- Respect `prefers-reduced-motion` and show content immediately when motion is reduced.

## Affiliate Link Requirements

- Every build-detail table contains eight ordered rows: CPU, GPU, motherboard, memory, storage, PSU, case, and cooling.
- The three columns are Component, Estimated Price, and Shopee Link.
- The circled question-mark help control is keyboard focusable and shows an accessible tooltip reading “Affiliate link. Prices may vary.” on hover or focus.
- Affiliate destinations open in a new tab and use `rel="sponsored noopener noreferrer"`.
- Until real recommendations are researched, every estimated price is `Price TBD` and every destination is <https://shopee.ph/>.
- Component names, prices, and destinations must remain explicitly identified as placeholders while temporary data is in use.

## Animation Guidelines

Animations should be restrained and functional:

- Short opacity and small vertical entrance transitions
- Very small image scale on card hover
- Minor card translation and border-color feedback
- Simple navigation underline movement
- Compact mobile-menu transitions

Avoid bounce, spring effects, large parallax, or animating every element. Do not add an animation dependency unless future requirements clearly justify one.

## Future Build Detail Expansion

The existing detail architecture should evolve to support:

- Total approximate price
- Intended use cases and performance targets
- Compatibility and upgrade reasoning
- Researched motherboard, PSU, case, and cooling details
- Product-specific affiliate destinations and estimated prices
- Pricing and recommendation last-reviewed date

Affiliate links are attached to component data through the required URL field. Real product URLs and researched Philippine prices should replace the current placeholders together and must not replace the build reasoning or turn cards into purchase widgets.

## Technology and Engineering Constraints

- React 19
- React Router 7
- TypeScript with strict compiler settings
- Vite
- Global CSS in `src/index.css`
- No UI framework or animation library

Follow DRY, KISS, semantic HTML, accessible interactions, responsive design, and existing project conventions. Prefer extending the existing components and data model over adding abstractions or dependencies.

## Quality Checks

Before considering frontend changes complete:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Check the homepage and every route listed above.
4. Test valid and invalid build slugs.
5. Test keyboard navigation and the mobile menu.
6. Check mobile, tablet, standard desktop, and ultrawide layouts.
7. Confirm there is no horizontal overflow.
8. Check `prefers-reduced-motion` behavior.
9. Verify the browser console has no warnings or errors.
10. Confirm placeholder content is still clearly identified until real research replaces it.
11. Confirm each valid detail route has eight component rows and that every affiliate link has the required URL, new-tab behavior, and sponsored-link attributes.
12. Test the affiliate disclosure with both pointer hover and keyboard focus.
