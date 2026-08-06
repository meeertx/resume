import { clamp01, remap } from './math'

/** The intro occupies this many viewport-heights of scroll. */
export const INTRO_VH = 350

export const NODE_COUNT = 8
/** Each node starts NODE_STAGGER later than the previous one. */
const NODE_STAGGER = 0.045
/** How much of whole-intro progress each node's own fly-out animation spans. */
const NODE_WINDOW = 0.22

/** p at which the last node has fully arrived and connected. */
export const NODES_DONE_P = (NODE_COUNT - 1) * NODE_STAGGER + NODE_WINDOW

/** The opening status hint fades out almost immediately — it's done its job once scrolling starts. */
const HINT_RANGE = [0, 0.06] as const satisfies readonly [number, number]

/** The glyph fades in quickly at the start, then holds — no later crossfade. */
const GLYPH_FADE_RANGE = [0, 0.08] as const satisfies readonly [number, number]

/**
 * Height of the fixed Header (see Header.tsx's `h-16`), in px. The Skills
 * page's sticky section starts *below* this rather than under it — the
 * network diagram is vertically centred within its own (viewport-minus-
 * header) box, so a node travelling to 12 o'clock never ends up half
 * hidden behind the header bar the way it would if centred on the full
 * viewport.
 */
export const HEADER_HEIGHT_PX = 64

/** Convert an eased scrollY (px) into whole-intro progress p, 0→1. */
export function pFromScrollY(scrollY: number, introHeightPx: number): number {
  if (introHeightPx <= 0) return 1
  return clamp01(scrollY / introHeightPx)
}

/**
 * 0→1 fly-out/connect progress for node `index` (0-based). Nodes start in a
 * staggered sequence and each travels its own window — brutalist, not
 * bouncy: this is a straight ramp, the spring feel comes from the CSS
 * transition each node is drawn with (see TechNode.tsx), not from this math.
 */
export function nodeProgress(p: number, index: number): number {
  const threshold = index * NODE_STAGGER
  return remap(p, [threshold, threshold + NODE_WINDOW])
}

/** The hub's base (unscaled) size in px — shared with Hub.tsx so the two never drift apart. */
export const HUB_BASE_SIZE = 160

/**
 * Hub scale grows smoothly across the whole intro — the hub is the one
 * element that's "always there," so its motion reads as continuous travel
 * rather than a staged reveal. Eased with a power ease-IN (slow start,
 * accelerating finish): apparent size grows as 1/distance, so a camera
 * closing in on a fixed-size object covers most of its visual growth right
 * at the end, not the start — an ease-out here would read backwards, most
 * of the "arrival" already spent before the nodes have even finished
 * connecting.
 *
 * Capped so the hub never exceeds 85% of the smaller viewport dimension —
 * on a narrow phone the fixed 1.6x growth would otherwise blow the box
 * wider than the screen itself.
 */
export function hubScale(p: number, vw: number, vh: number): number {
  const raw = 1 + Math.pow(p, 2.2) * 1.6
  const maxScale = (Math.min(vw, vh) * 0.85) / HUB_BASE_SIZE
  return Math.min(raw, maxScale)
}

/**
 * Hub border-radius morphs square → circle across the whole intro:
 * 0% at p=0, 25% at p=0.5, 50% (a true circle, since the box is always
 * square) at p=1 — linear in p by design, a literal, deliberate spec
 * requirement rather than left to brutalist "always sharp corners" taste.
 */
export function hubBorderRadius(p: number): number {
  return p * 50
}

/** 0→1 over the first 8% of scroll, then holds — the glyph is the hub's only content, no later crossfade. */
export function hubGlyphOpacity(p: number): number {
  return remap(p, GLYPH_FADE_RANGE)
}

/** The opening "AWAITING_SCROLL" hint — present at load, gone almost immediately. */
export function hintOpacity(p: number): number {
  return 1 - remap(p, HINT_RANGE)
}

/**
 * Node angles are evenly distributed around a circle rather than
 * hand-placed — precise, repeatable geometry fits the brutalist "exposed
 * system" language better than eyeballed offsets, and it's inherently
 * responsive (see nodeTargetOffset). Starts at 12 o'clock, goes clockwise.
 */
export function nodeAngle(index: number): number {
  const step = (Math.PI * 2) / NODE_COUNT
  return -Math.PI / 2 + step * index
}

/** Target x/y offset (px) from the hub centre for node `index`, scaled to viewport. */
export function nodeTargetOffset(index: number, vw: number, vh: number): { x: number; y: number } {
  const radius = Math.min(vw, vh) * 0.42
  const angle = nodeAngle(index)
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }
}
