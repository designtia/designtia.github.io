# Valentina Pashentsava — Portfolio

A single-page portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS. Pure white canvas, a twelve-column desktop composition, and illustrative neutral interface placeholders.

## Run locally

Requires Node.js 22 or newer and pnpm.

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. For a production check, run `pnpm build`. The static website is exported to `out/`.

## Edit

- `lib/projects.ts`: project copy, ordering, media variants, optional image paths, project URLs, and verified contact destinations.
- `components/portfolio/`: Header, Hero, ProjectItem, ProjectMedia, About, Contact, Footer, and viewport reveal behavior.
- `app/globals.css`: shared visual tokens, layout, interface studies, and responsive styles.
- `app/layout.tsx`: document metadata.

Put replacement images in `public/` and set a project's `image` to `/your-image.webp`. Interface studies are illustrative placeholders, not screenshots of actual work. Contact details remain unset; their controls display an honest availability message. Six source-backed case studies are registered under `/work/[slug]`; Whirlwind and Flox remain unavailable until content is supplied.

Motion respects reduced-motion preferences. Navigation uses native section anchors. Desktop uses a 3 / horizontal 2 / 3 composition; tablet uses two columns; mobile uses one column with consistent media proportions.

## Case studies

See [the content guide](content/case-studies/README.md) for the structured data model, migration source snapshots, supported section blocks, and adding future projects. Run `node scripts/check-case-studies.mjs` to verify source fidelity and asset references.

## GitHub Pages

Repository: https://github.com/Tia-P/designtia

1. In repository **Settings → Pages**, set **Source** to **GitHub Actions**.
2. Push to `main`, or run **Actions → Deploy portfolio to GitHub Pages → Run workflow**.
3. After deployment succeeds, the site is available at https://tia-p.github.io/designtia/.

The workflow installs locked dependencies, validates case-study content, builds with `NEXT_PUBLIC_BASE_PATH=/designtia`, and deploys `out/`. Local development continues at `/` without this variable. The shared `lib/site-path.ts` helper prefixes internal navigation and image URLs in the Pages build. Static routes use directory indexes for reliable direct links and refreshes.

Changing repositories or moving to a custom domain requires updating `NEXT_PUBLIC_BASE_PATH` in the workflow and rebuilding (use an empty value at a domain root).
