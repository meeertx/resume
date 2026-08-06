import { progressFromRect, type ProgressFromRectOptions } from './progress'

export interface RevealOptions extends ProgressFromRectOptions {
  /** Vertical travel distance in px at amount=0. Default 24. */
  travelPx?: number
}

interface Entry {
  el: HTMLElement
  options: RevealOptions
}

const entries = new Set<Entry>()

const reducedMotionQuery =
  typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null

/** Register an element for per-frame reveal updates. Returns an unregister fn. */
export function register(el: HTMLElement, options: RevealOptions = {}): () => void {
  const entry: Entry = { el, options }
  entries.add(entry)
  return () => {
    entries.delete(entry)
  }
}

/**
 * Called once per frame by the global scroll loop. Reads every registered
 * element's current rect (batched before any writes, to avoid layout
 * thrashing), then writes opacity/transform directly — no CSS transition
 * involved, so the amount is always a pure function of current position.
 *
 * Under reduced motion, content is just immediately visible — no
 * scroll-tied slide, which is a "parallax"-shaped effect the OS-level
 * setting exists specifically to suppress.
 */
export function update(viewportH: number): void {
  if (entries.size === 0) return

  if (reducedMotionQuery?.matches) {
    for (const { el } of entries) {
      el.style.opacity = '1'
      el.style.transform = 'none'
    }
    return
  }

  const list = Array.from(entries)
  const amounts = list.map((entry) => progressFromRect(entry.el.getBoundingClientRect(), viewportH, entry.options))

  for (let i = 0; i < list.length; i++) {
    const { el, options } = list[i]
    const amount = amounts[i]
    const travelPx = options.travelPx ?? 24
    el.style.opacity = String(amount)
    el.style.transform = `translate3d(0, ${(1 - amount) * travelPx}px, 0)`
  }
}
