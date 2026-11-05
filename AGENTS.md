<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Image workflow

- Keep `output: 'export'` and `images.unoptimized: true`; local WebP assets are generated before `npm run dev`, `npm run build`, and `npm run export`.
- Keep original image paths in `src/data/systems.ts`. `AppImage` maps local raster paths to generated files in `public/images/optimized/`; SVG and remote URLs are unchanged.
- `npm run optimize:images` regenerates assets after adding or changing originals during an existing dev session. The script reads image literals in `src/data/systems.ts`, `src/config/site.ts`, and `src/components/app-image.tsx`; it does not modify originals. ICO input must contain an embedded PNG.
- Run `npm run test:images` (Node 22.6+), `npm run typecheck`, targeted ESLint, and `npm run build` to verify image changes.
