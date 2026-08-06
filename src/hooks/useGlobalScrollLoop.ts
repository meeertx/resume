import { useEffect, type RefObject } from 'react'
import { update as updateReveals } from '../lib/revealRegistry'

/**
 * Runs once, in Layout, for the lifetime of the app (Layout never unmounts
 * on navigation — only the routed page inside it does). Drives the two
 * things every page needs regardless of route: scroll-reveals and the
 * page-scroll progress bar. No easing here — reveal amount is a pure
 * function of current position by design (see revealRegistry), and the
 * progress bar is meant to track the real scrollbar exactly, not lag it.
 */
export function useGlobalScrollLoop(progressBarRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    let rafId = 0

    function frame() {
      const viewportH = window.innerHeight
      updateReveals(viewportH)

      const el = progressBarRef.current
      if (el) {
        const max = document.documentElement.scrollHeight - viewportH
        const fraction = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
        el.style.transform = `scaleX(${fraction})`
      }

      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafId)
  }, [progressBarRef])
}
