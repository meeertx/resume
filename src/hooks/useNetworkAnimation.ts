import { useEffect, type RefObject } from 'react'
import { easeTowards } from '../lib/math'
import {
  HEADER_HEIGHT_PX,
  NODE_COUNT,
  hintOpacity,
  hubBorderRadius,
  hubGlyphOpacity,
  hubScale,
  nodeProgress,
  nodeTargetOffset,
} from '../lib/networkTimeline'
import { progressFromStickySection } from '../lib/progress'

export interface NetworkAnimationDeps {
  sectionEl: RefObject<HTMLElement | null>
  hubEl: RefObject<HTMLElement | null>
  hubGlyphEl: RefObject<HTMLElement | null>
  hintEl: RefObject<HTMLElement | null>
  nodeEls: RefObject<(HTMLElement | null)[]>
  lineEls: RefObject<(SVGPathElement | null)[]>
  reducedMotion: boolean
}

const EASE_FACTOR = 0.12

/**
 * Skills-page-only scroll animation: drives the hub/nodes/lines/hint from
 * an eased progress value read off the *sticky section's own* rect (see
 * progressFromStickySection), not global scroll or document.body height —
 * that's what lets this section live inside an ordinary routed page,
 * sandwiched between a fixed Header and normal-flow content below it,
 * instead of needing to own the page the way the old single-page site did.
 *
 * All positioning here uses the *effective* height (viewport minus the
 * fixed Header) rather than raw window.innerHeight — the sticky section
 * itself starts below the header (see Skills.tsx's `top-16`), so its own
 * box is that much shorter, and every centre/radius calculation needs to
 * agree with that or nodes travelling toward the top drift back up
 * underneath the header.
 *
 * Under reduced motion this is a no-op — Skills.tsx renders a static
 * fallback instead of mounting the sticky section at all.
 */
export function useNetworkAnimation(deps: NetworkAnimationDeps) {
  useEffect(() => {
    if (deps.reducedMotion) return

    let rafId = 0
    let current = 0

    function frame() {
      const section = deps.sectionEl.current
      if (section) {
        const viewportW = window.innerWidth
        const effectiveH = window.innerHeight - HEADER_HEIGHT_PX
        const target = progressFromStickySection(section.getBoundingClientRect(), effectiveH)
        current = easeTowards(current, target, EASE_FACTOR)
        if (Math.abs(target - current) < 0.001) current = target

        driveHub(current, viewportW, effectiveH)
        driveNetwork(current, viewportW, effectiveH)
        driveHint(current)
      }
      rafId = requestAnimationFrame(frame)
    }

    function driveHub(p: number, vw: number, vh: number): void {
      const hub = deps.hubEl.current
      if (hub) {
        hub.style.transform = `translate(-50%, -50%) scale(${hubScale(p, vw, vh)})`
        hub.style.borderRadius = `${hubBorderRadius(p)}%`
      }
      const glyph = deps.hubGlyphEl.current
      if (glyph) glyph.style.opacity = String(hubGlyphOpacity(p))
    }

    function driveNetwork(p: number, vw: number, vh: number): void {
      const nodes = deps.nodeEls.current
      const lines = deps.lineEls.current
      const centerX = vw / 2
      const centerY = vh / 2

      for (let i = 0; i < NODE_COUNT; i++) {
        const t = nodeProgress(p, i)
        const { x: ox, y: oy } = nodeTargetOffset(i, vw, vh)
        const x = ox * t
        const y = oy * t

        const node = nodes?.[i]
        if (node) {
          node.style.opacity = String(t)
          node.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${0.5 + t * 0.5})`
        }

        const line = lines?.[i]
        if (line) {
          const len = Math.hypot(x, y) || 1
          line.setAttribute('d', `M ${centerX} ${centerY} L ${centerX + x} ${centerY + y}`)
          line.setAttribute('stroke-dasharray', String(len))
          line.setAttribute('stroke-dashoffset', String(len * (1 - t)))
          line.setAttribute('opacity', String(t * 0.6))
        }
      }
    }

    function driveHint(p: number): void {
      const el = deps.hintEl.current
      if (el) el.style.opacity = String(hintOpacity(p))
    }

    rafId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafId)
    // deps' refs are stable across renders; reducedMotion is the only value that should retrigger this effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps.reducedMotion])
}
