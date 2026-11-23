# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
bun x sv@0.17.1 create --template minimal --types ts --add tailwindcss="plugins:forms" --install bun arschis-computers
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Phase 1 UI foundation

The application retains its existing routes, Sanity schemas and integrations. Phase 1 is local work on `feature/phase-1-ui-foundation`; it does not deploy the site.

- `src/app.css` defines Tailwind v4 `@theme` tokens for colors, system typography, responsive section spacing, content width and cards. The existing logo remains unchanged.
- `src/lib/components/ui/` provides Button, Card, SectionHeading and Dialog. ProductCard, ConditionBadge and ContactActions share catalog and contact presentation.
- The root layout owns the only Footer. Page components keep their own main landmark, metadata and structured data.
- Dialog uses native `showModal()` for top-layer rendering and background inertness. `src/lib/overlays.ts` owns each mounted dialog separately, locks scrolling until the last owner closes, traps focus, and restores focus/scroll/styles on teardown. Components must not write body scroll styles themselves.
- Booking preserves its fields and drafts, validates input, and offers a WhatsApp handoff with same-tab/copy/phone fallbacks. It does not store or confirm bookings.
- Product category/condition comparisons normalize whitespace and case in the frontend without changing CMS documents.

### Local checks

Use Node 24 (the version used for Phase 1 QA). No new dependencies were added.

```sh
npm run check
npm run test:foundation
npm run build
```

For route/API checks, start a local development server with the existing read-only CMS configuration, then run:

```sh
npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
npm run test:routes
```

`test:routes` compares rendered titles, descriptions and canonical URLs to the current Git HEAD and verifies structured data, the sitemap, robots rules, category fallbacks and 404 behavior. `QA_BASE_URL` overrides the local server address.

`npm run test:browser` additionally needs an existing Chrome instance with remote debugging on port 9222. It runs against the local development server, uses synthetic booking inputs, stubs WhatsApp window opening, and mounts local gallery/catalog fixtures. It sends no messages and writes no CMS content. Native mobile keyboards and Safari/WebKit still require device testing.

Browser artifacts and before/after screenshots are stored under ignored `.qa/`. The fixture module is imported only by QA and is not included in the production application. Run checks/builds separately from browser QA, because SvelteKit synchronization and Vite reloads can interrupt browser interactions.

## Phase 2 homepage

Implemented on `feature/phase-2-premium-homepage`, carrying the existing Phase 1 work. The verified GitHub deployment branch is `dev`.

The homepage combines retail and service sections with the original logo, a navy/blue hero, category navigation, actual Sanity product cards, the service center, business strengths, Google Reviews, service process, recent gallery entries, About and contact/map sections. Existing routes, metadata and booking/overlay foundations remain in place. The header search submits `q` to the existing `/store` route.

Homepage data is read-only: four latest products, one image per category, and three recent gallery entries. Empty/error states do not substitute sample products, project photos or reviews. Google reviews use the existing server endpoint, with loading/error/retry states and a two-minute browser cache.

Run `npm run test:homepage` against the same local server and Chrome setup as browser QA. It checks homepage structure, search, live reviews, review failure states, catalog enquiries, layouts, recent-work fixtures and original-logo hashes. Screenshots are saved under `.qa/screenshots/phase2-home-*.png`.

Hero assets `static/premium-hero-{600,900,1200}.webp` are generic illustrative imagery produced with the built-in image-generation tool and optimized with the already-installed Sharp dependency. They do not depict a specific inventory item. Product/category photography comes from Sanity. The hero generation prompt is retained in `.qa/premium-hero-prompt.txt` with the local review artifacts.

Development deployment uses the existing GitHub integration: push only to `dev`, then verify the Cloudflare Pages check for that exact commit and the branch preview at `https://dev.arschis-computers.pages.dev`. Before the Phase 2 push, Cloudflare's GitHub check for `fa67210` explicitly identified that branch URL and project `arschis-computers`; its deployment version matched the development alias. The separate `main` deployment version matched `https://arschiscomputers.in`. Recheck this mapping if the integration changes. Do not use a manual Cloudflare deployment command, push or merge to `main`, or modify production settings.
