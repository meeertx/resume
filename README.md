# Mert Ürper — Portfolio

A single-page developer portfolio: a scroll-driven intro where a network of the core stack
converges on a central hub — which then becomes the masthead — hands off into a plain, readable
dark brutalist résumé. One page, one eased scroll value, no `<video>`, no third-party UI framework.

Stack: React 19, TypeScript, Tailwind CSS v4, Vite.

## Getting started

```bash
npm install
npm run dev
```

No asset pipeline, no external services — everything renders from code.

## Editing content

All résumé copy — masthead, projects, "everything else" table, "how I work" blocks — lives in one
file: [`src/data/resume.ts`](src/data/resume.ts), typed against [`src/types/resume.ts`](src/types/resume.ts).
The 8 intro network nodes (tag + label) live in [`src/data/techStack.ts`](src/data/techStack.ts).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run the Vitest unit suite (timeline/scroll math) |

## Architecture notes

- **One `requestAnimationFrame` loop** ([`src/lib/masterLoop.ts`](src/lib/masterLoop.ts)) drives the
  scroll ease, the hub's scale and glyph→masthead crossfade, all 8 tech nodes and their SVG
  connector lines, the résumé's scroll-reveals, the spine, and the progress bar — nothing here uses
  React state for animation; DOM nodes are written to directly via refs.
- **Real scrollbar, faked motion** — [`src/lib/smoothScroll.ts`](src/lib/smoothScroll.ts) puts the
  true page height on `document.body` and eases a `translate3d` on a fixed content wrapper. Under
  `prefers-reduced-motion: reduce` this is skipped entirely — the wrapper returns to normal flow and
  the browser scrolls it natively, 1:1.
- **Intro timeline math** ([`src/lib/networkTimeline.ts`](src/lib/networkTimeline.ts)) is pure and
  unit-tested: node stagger/fly-out, the hub's ease-*in* scale curve (apparent size grows as
  1/distance, so growth has to accelerate toward the end, not decelerate), and a same-value
  complementary crossfade between the hub's `ROOT_SYS` glyph and the real masthead (guarantees no
  dead gap and no double-exposure).
- **Responsive by construction, not by breakpoint patching** — node positions come from
  `nodeTargetOffset`, computed from live viewport dimensions every frame (not fixed px), and
  `hubScale` caps the hub at 85% of the smaller viewport dimension so it can never overflow a
  narrow phone screen. Node labels hide below `sm` since 8 full text labels don't fit a 375px
  column no matter how you place them.
- **Real easing, not `steps()`** — hover/press micro-interactions use `ease-out`/`ease-in-out`,
  overridden in `src/index.css`'s `@theme` block to a proper expo-out cubic-bezier
  (`cubic-bezier(0.16, 1, 0.3, 1)`), so plain Tailwind `ease-out` classes pick it up sitewide. No
  global `cursor: crosshair`, no forced stepped transitions — those read as retro/glitchy, the
  opposite of the fluid, physical motion this aims for.
- **`#050505`** is the page background everywhere (intro and résumé alike) — since there's no video
  footage to colour-match anymore, there's no seam to hide in the first place.
