import { clamp01 } from './math'

export interface ProgressFromRectOptions {
  /** Fraction of viewport height at which amount = 0 (element's top edge). Default 0.85. */
  startAt?: number
  /** Fraction of viewport height at which amount = 1. Default 0.55. */
  endAt?: number
}

/**
 * Pure function of an element's *current* position: 0 when its top edge is
 * at `startAt` of the viewport height, 1 by the time it reaches `endAt`.
 * No memory of past frames — recomputed fresh every tick, so a stopped
 * scroll always lands in the exact right visual state instantly. This is
 * the entire reason IntersectionObserver is not used for reveals: an
 * IO-driven CSS transition runs on its own clock and can't do this.
 */
export function progressFromRect(
  rect: DOMRect,
  viewportH: number,
  opts: ProgressFromRectOptions = {},
): number {
  const startAt = opts.startAt ?? 0.85
  const endAt = opts.endAt ?? 0.55
  const startY = viewportH * startAt
  const endY = viewportH * endAt
  if (startY === endY) return rect.top <= endY ? 1 : 0
  return clamp01((startY - rect.top) / (startY - endY))
}

/**
 * 0→1 progress through a `position: sticky` pinned section, measured off
 * the *outer* (tall) container's own rect rather than whole-document
 * scroll. This is what lets the Skills page's network animation live
 * inside an ordinary routed page — sandwiched between a fixed Header and a
 * normal-flow Footer — instead of needing to own the whole document's
 * scroll height the way the old single-page site's intro did.
 *
 * p=0 the instant the container's top reaches the viewport top (sticky
 * engages); p=1 the instant its bottom reaches the viewport bottom
 * (sticky disengages and normal content below takes over).
 */
export function progressFromStickySection(containerRect: DOMRect, viewportH: number): number {
  const scrollableDistance = containerRect.height - viewportH
  if (scrollableDistance <= 0) return containerRect.top <= 0 ? 1 : 0
  return clamp01(-containerRect.top / scrollableDistance)
}
