import type { RefObject } from 'react'
import { techStack } from '../../data/techStack'
import { Hub } from './Hub'
import { TechNode } from './TechNode'

export interface NetworkRefs {
  hubRef: RefObject<HTMLDivElement | null>
  hubGlyphRef: RefObject<HTMLDivElement | null>
  hintRef: RefObject<HTMLDivElement | null>
  nodeRefs: RefObject<(HTMLDivElement | null)[]>
  lineRefs: RefObject<(SVGPathElement | null)[]>
}

/**
 * Fills its `position: sticky` parent (see Skills.tsx) — connector lines,
 * the 8 tech nodes, the hub, and the opening scroll hint. `absolute
 * inset-0` rather than `fixed`: while the sticky parent is pinned it
 * occupies exactly the viewport anyway, but `absolute` also stays
 * correctly confined (and clipped) to that parent's box before/after the
 * pinned phase, where `fixed` would bleed past it. The grid texture is
 * global (see Layout) so it isn't repeated here. Entirely aria-hidden —
 * purely decorative.
 */
export function NetworkIntro({ hubRef, hubGlyphRef, hintRef, nodeRefs, lineRefs }: NetworkRefs) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-void" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 5 }}>
        {techStack.map((_, i) => (
          <path
            key={i}
            ref={(el) => {
              lineRefs.current[i] = el
            }}
            fill="none"
            stroke={i % 3 === 2 ? 'var(--color-magenta)' : 'var(--color-cyan)'}
            strokeWidth="2"
            opacity="0"
          />
        ))}
      </svg>

      {techStack.map((item, i) => (
        <TechNode
          key={item.tag}
          item={item}
          nodeRef={(el) => {
            nodeRefs.current[i] = el
          }}
        />
      ))}

      <Hub hubRef={hubRef} glyphRef={hubGlyphRef} />

      <div
        ref={hintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 border border-line bg-panel px-3 py-1 font-mono text-[10px] tracking-wide text-dim uppercase"
        style={{ zIndex: 20 }}
      >
        System_idle: awaiting_scroll
      </div>
    </div>
  )
}
