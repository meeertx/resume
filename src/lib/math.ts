/** Clamp a number to the 0–1 range. */
export function clamp01(value: number): number {
  if (value < 0) return 0
  if (value > 1) return 1
  return value
}

/** Clamp a number to an arbitrary [min, max] range. */
export function clamp(value: number, min: number, max: number): number {
  if (value < min) return min
  if (value > max) return max
  return value
}

/**
 * Remap `p` from the sub-range [start, end] to 0→1, clamped outside it.
 * This is the core operation behind every intro sub-timeline: "what fraction
 * of *this* range has whole-page progress `p` crossed so far".
 */
export function remap(p: number, [start, end]: readonly [number, number]): number {
  if (start === end) return p >= end ? 1 : 0
  return clamp01((p - start) / (end - start))
}

/** Linear interpolation between a and b at t (not clamped — t may exceed 0..1). */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/**
 * One step of exponential easing: nudge `current` toward `target` by `factor`
 * per call. Used identically by the Scrubber (easeFactor 0.14), the smooth
 * scroll engine (0.085), and nowhere else — the same primitive throughout.
 */
export function easeTowards(current: number, target: number, factor: number): number {
  return current + (target - current) * factor
}
