# Case-study content

Each JSON file is a source-backed project. The homepage and `/work/[slug]` routes use the same registry in `index.ts`. Register an entry only when its real content is ready; unregistered projects do not get pages or homepage links.

The current six entries are faithfully migrated from the supplied Notion portfolio. Source wording, section order, image order, and existing qualitative or quantitative outcome claims are preserved. `sources/` contains credential-free snapshots for comparison. No date is inferred from Notion editing timestamps. Existing source inconsistencies are retained for the owner to review rather than silently rewritten.

## Editing

- `title`, `headline`, `role`, `scope`, optional `year`, and optional `metadata` define the hero.
- `heroImage`: local `src`, descriptive `alt`, original `width` and `height`, optional `caption`.
- `sections`: an ordered array with unique `id`, source `title`, and `blocks`. Omit sections with no source content.
- Blocks support `text` (paragraphs), `list` (items, optional ordered), `heading`, `image`, `image-pair` (two images), `image-text` (image, paragraphs, optional imageSide), and `gallery` (images, optional columns: 1 or 2).
- An optional top-level `gallery` renders final full-width screens without inventing a heading.
- `nextProject` is a registered slug; missing destinations are omitted by the renderer.
- `source` records the original Notion page URL.

Text supports **bold** and Markdown HTTPS links. Text is escaped by React; raw HTML is never injected. Source `<br>` markers are represented as line breaks.

Images live in `public/work/<slug>/`. They retain original dimensions and are losslessly encoded as WebP. Screens are uncropped, lazy-loaded below the hero, and have intrinsic dimensions to reserve space. Replace files and update dimensions/alt text together.

Add Whirlwind or Flox later by creating a JSON entry with the matching homepage `projectId`, importing it in `index.ts`, and updating the next-project sequence. No new page component or routing code is required.

Run `node scripts/check-case-studies.mjs` to verify content fidelity, image paths, optional outcomes, and navigation. Run `pnpm build` to validate and export all registered routes.

## Editorial Speiz case study

The live Speiz page now uses `speiz-editorial.json` and the registry in
`editorial.ts`. The original `speiz.json` is retained as migration source material;
edit the editorial file to change the current page.

Reusable rendering lives in `components/case-study/editorial/`:
- `CaseStudyLayout` renders ordered sections and block types.
- `CaseStudyTOC` derives desktop/mobile navigation from section data.
- `CaseStudyParts` exports the hero, metadata, section headings, annotations,
  process evolution, and sticky product gallery.
- `MediaPlaceholder` defines the illustrative interface compositions.
- `MediaRail` supplies accessible scroll controls and stacked mobile media.
- `MediaReveal` adds optional, reduced-motion-aware entrance transitions.

To replace a placeholder, put the screenshot in `public/work/speiz/` and add
an `image` property to its media entry in `speiz-editorial.json`:

```json
"search": {
  "title": "Classic Search",
  "variant": "search",
  "image": {
    "src": "/work/speiz/search.webp",
    "alt": "Speiz warehouse search with filters, property results, and a map",
    "width": 2560,
    "height": 1440
  }
}
```

Use the actual image dimensions and a descriptive alt text. Keep the path
unprefixed: the renderer adds the GitHub Pages base path automatically.
The screenshot replaces the interface drawing and its illustrative label.
Existing captions and placement stay intact. Reused entries update everywhere,
including the final gallery. Create separate entries for distinct screenshot crops.

Sections support text, media, annotated media, editorial columns, sequences,
process evolution, rails, galleries, and nested sections. Reorder the data arrays
to change pacing. Register another editorial study in `editorial.ts` to reuse the
layout; only add factual content supplied for that project.

Run `node scripts/check-case-studies.mjs` to validate both legacy migrations and
the editorial study's anchors, media references, and next-project destination.
