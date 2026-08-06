import { useRef } from 'react'
import { NetworkIntro } from '../components/network/NetworkIntro'
import { CategoryCard } from '../components/ui/CategoryCard'
import { techStack } from '../data/techStack'
import { resumeData } from '../data/resume'
import { useNetworkAnimation } from '../hooks/useNetworkAnimation'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { INTRO_VH, NODE_COUNT } from '../lib/networkTimeline'

/**
 * Reduced-motion equivalent: the same information (the full stack),
 * presented at rest with no scroll-linked motion at all — not merely a
 * shorter version of the animation.
 */
function StaticNetworkFallback() {
  return (
    <div className="flex flex-col items-center gap-12 px-6 py-24 text-center">
      <div className="flex h-40 w-40 flex-col items-center justify-center gap-1 rounded-full border-4 border-cyan bg-void shadow-[8px_8px_0_0_rgba(0,245,255,0.2)]">
        <span className="font-display text-2xl leading-none text-cyan">&gt;_</span>
        <span className="font-mono text-[10px] tracking-label text-cyan">ROOT_SYS</span>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-6">
        {techStack.map((item) => (
          <div key={item.tag} className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center border-2 border-cyan font-display text-sm text-cyan">
              {item.tag}
            </div>
            <span className="font-mono text-[9px] tracking-label text-dim uppercase">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const reducedMotion = useReducedMotion()

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const hubRef = useRef<HTMLDivElement | null>(null)
  const hubGlyphRef = useRef<HTMLDivElement | null>(null)
  const hintRef = useRef<HTMLDivElement | null>(null)
  const nodeRefs = useRef<(HTMLDivElement | null)[]>(new Array(NODE_COUNT).fill(null))
  const lineRefs = useRef<(SVGPathElement | null)[]>(new Array(NODE_COUNT).fill(null))

  useNetworkAnimation({
    sectionEl: sectionRef,
    hubEl: hubRef,
    hubGlyphEl: hubGlyphRef,
    hintEl: hintRef,
    nodeEls: nodeRefs,
    lineEls: lineRefs,
    reducedMotion,
  })

  return (
    <div>
      {reducedMotion ? (
        <StaticNetworkFallback />
      ) : (
        <div ref={sectionRef} style={{ height: `${INTRO_VH}vh` }} className="relative">
          {/* Sticks *below* the fixed Header (top-16, not top-0) — see
              useNetworkAnimation's header-aware height for why the JS side
              has to agree with this exact offset (64px = h-16). */}
          <div className="sticky top-16 h-[calc(100vh-4rem)]">
            <NetworkIntro
              hubRef={hubRef}
              hubGlyphRef={hubGlyphRef}
              hintRef={hintRef}
              nodeRefs={nodeRefs}
              lineRefs={lineRefs}
            />
          </div>
        </div>
      )}

      <section className="mx-auto flex max-w-350 flex-col gap-10 px-6 py-20 sm:px-10">
        <h2 className="font-display text-2xl tracking-display text-paper uppercase sm:text-3xl">Stack Breakdown</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {resumeData.howIWork.slice(0, 4).map((block) => (
            <CategoryCard key={block.title} title={block.title} body={block.body} />
          ))}
        </div>
      </section>
    </div>
  )
}
