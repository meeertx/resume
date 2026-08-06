import { useEffect, useRef } from 'react'
import { progressFromRect } from '../lib/progress'
import { register, type RevealOptions } from '../lib/revealRegistry'

/**
 * Registers the returned ref's element with the shared revealRegistry, which
 * the single master rAF loop polls every frame. Not a subscription — the
 * element just sits in a module-level list and gets its style written
 * directly each tick. Unregisters automatically on unmount.
 */
export function useScrollReveal<T extends HTMLElement>(options?: RevealOptions) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Set the correct initial state synchronously so there's no flash of
    // fully-opaque content before the next rAF tick runs.
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      el.style.opacity = '1'
      el.style.transform = 'none'
    } else {
      const amount = progressFromRect(el.getBoundingClientRect(), window.innerHeight, options)
      const travelPx = options?.travelPx ?? 24
      el.style.opacity = String(amount)
      el.style.transform = `translate3d(0, ${(1 - amount) * travelPx}px, 0)`
    }

    return register(el, options)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
