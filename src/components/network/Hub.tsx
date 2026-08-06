import type { RefObject } from 'react'
import { HUB_BASE_SIZE } from '../../lib/networkTimeline'

interface HubProps {
  hubRef: RefObject<HTMLDivElement | null>
  glyphRef: RefObject<HTMLDivElement | null>
}

/**
 * The central node of the Skills page's scroll animation. Morphs square →
 * circle (useNetworkAnimation drives both scale and border-radius every
 * frame; text inside grows for free since it's all one `transform:
 * scale()` on the box) while holding a single terminal glyph the whole
 * time — no crossfade to an identity card. That reveal read as broken
 * once the box became a true circle (wide name/role/email text doesn't
 * sit cleanly inside a circular silhouette), and his name is already in
 * the header on every page, so repeating it here added nothing.
 */
export function Hub({ hubRef, glyphRef }: HubProps) {
  return (
    <div
      ref={hubRef}
      className="absolute top-1/2 left-1/2 border-4 border-cyan bg-void shadow-[8px_8px_0_0_rgba(0,245,255,0.2)]"
      style={{ zIndex: 30, width: HUB_BASE_SIZE, height: HUB_BASE_SIZE, transform: 'translate(-50%, -50%) scale(1)' }}
    >
      <div ref={glyphRef} className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-cyan opacity-0">
        <span className="font-display text-3xl leading-none">&gt;_</span>
        <span className="font-mono text-[10px] tracking-label">ROOT_SYS</span>
      </div>
    </div>
  )
}
