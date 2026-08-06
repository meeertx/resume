# Mert Ürper — Portfolio

A five-page developer portfolio (Home / Skills / Projects / About / Contact) in a dark brutalist
style — cyan/magenta on near-black, Space Mono + Archivo Black, hard-edged bordered cards. The
Skills page opens with a scroll-scrubbed animation: a network of the core stack converges on a
central hub that morphs square to circle as you scroll.

Stack: React 19, TypeScript, Tailwind CSS v4, Vite, React Router.

## Getting started

```bash
npm install
cp .env.example .env      # then fill in your EmailJS keys — see below
npm run dev
```

## Contact form (EmailJS)

The Contact page's form sends real email via [EmailJS](https://www.emailjs.com/) directly from the
browser — no backend of our own to run or pay for. It needs three keys in `.env` (gitignored, never
committed — `.env.example` documents the shape):

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Get these from the [EmailJS dashboard](https://dashboard.emailjs.com/admin) (Email Services /
Email Templates / Account → General). The template should expect `from_name`, `from_email`,
`subject`, and `message` variables. Without these set, the form fails with a clear inline message
pointing at direct email instead of silently doing nothing (see `EMAILJS_CONFIGURED` in
[`src/pages/Contact.tsx`](src/pages/Contact.tsx)).

**Deploying:** add the same three variables in Vercel's Project Settings → Environment Variables —
`.env` only applies locally.

## Editing content

All résumé copy — masthead, projects, "everything else" table, "how I work" blocks — lives in one
file: [`src/data/resume.ts`](src/data/resume.ts), typed against
[`src/types/resume.ts`](src/types/resume.ts). [`src/data/projects.ts`](src/data/projects.ts) derives
the Projects grid from it (adding only category + GitHub/live-demo links — demo links only where a
URL is actually confirmed live). The 8 Skills-page network nodes live in
[`src/data/techStack.ts`](src/data/techStack.ts), social links in [`src/data/social.ts`](src/data/social.ts).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run the Vitest unit suite (timeline/scroll math) |

## Architecture notes

- **Two scroll loops, not one.** [`useGlobalScrollLoop`](src/hooks/useGlobalScrollLoop.ts) runs for
  the app's whole lifetime (mounted once in `Layout`, which never unmounts on navigation) driving
  the scroll-reveal registry and the progress bar on every page. The Skills page additionally runs
  [`useNetworkAnimation`](src/hooks/useNetworkAnimation.ts), scoped to just its own `position:
  sticky` section — nothing here uses React state for animation; DOM nodes are written to directly
  via refs.
- **The Skills animation lives inside an ordinary routed page**, not a full-document takeover — the
  hub/nodes are positioned and eased off `progressFromStickySection`, measured against the sticky
  container's own rect and an *effective* height that already subtracts the fixed Header's height
  (`HEADER_HEIGHT_PX` in [`networkTimeline.ts`](src/lib/networkTimeline.ts)), so nothing drifts up
  underneath the nav bar.
- **Hub scale eases IN** (`1 + p^2.2 * 1.6`) — apparent size grows as 1/distance, so growth has to
  *accelerate* toward the end, not decelerate — and is capped at 85% of the smaller viewport
  dimension so it can't overflow a phone screen. Border-radius morphs square → circle linearly
  (0/25/50% at p=0/0.5/1). Node positions come from live viewport dimensions every frame, not fixed
  px, and labels hide below `sm` since 8 full text labels don't fit a 375px column.
- **Reveal-on-scroll has no memory of past frames** — `progressFromRect` recomputes purely from an
  element's *current* position every tick, so a fast scroll-flick always lands in the exact right
  visual state instantly instead of finishing a CSS transition on its own clock. Every card on every
  page uses this via [`useScrollReveal`](src/hooks/useScrollReveal.ts), which also checks
  `prefers-reduced-motion` directly and skips straight to full opacity, no slide.
- **`steps()` easing and a global crosshair cursor are deliberate**, not an oversight — the
  `--ease-brutal` token in `src/index.css`'s `@theme` block, applied to hover/press feedback
  sitewide. `:focus-visible` stays instant (not steps()'d) and text inputs keep a real text cursor —
  both are accessibility requirements, not aesthetic choices, so they don't get the retro treatment.
- **Scroll resets on navigation** — `Layout` calls `window.scrollTo(0, 0)` in a `useLayoutEffect`
  keyed on the route, since React Router doesn't do this itself the way a real page load does
  (`useLayoutEffect`, not `useEffect`, so it happens before paint — no flash of the new page at the
  old scroll position first).
