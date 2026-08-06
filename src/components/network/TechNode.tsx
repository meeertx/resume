import type { TechStackItem } from '../../data/techStack'

interface TechNodeProps {
  item: TechStackItem
  nodeRef: (el: HTMLDivElement | null) => void
}

/**
 * A node's outer element is driven imperatively every frame by masterLoop
 * (position/scale from scroll progress — never a CSS transition, it has to
 * track the eased scroll value exactly). The inner element is a separate
 * layer that owns its own hover feedback via a real CSS transition — the
 * two never fight over the same `transform` property.
 */
export function TechNode({ item, nodeRef }: TechNodeProps) {
  return (
    <div
      ref={nodeRef}
      className="absolute top-1/2 left-1/2"
      style={{ zIndex: 10, transform: 'translate(-50%, -50%) scale(0.5)', opacity: 0 }}
    >
      <div className="flex flex-col items-center transition-transform duration-200 ease-out hover:-translate-y-1.5">
        <div className="flex h-12 w-12 items-center justify-center border-2 border-cyan bg-void font-display text-sm text-cyan shadow-[4px_4px_0_0_rgba(0,245,255,0.25)] transition-shadow duration-200 ease-out hover:shadow-[10px_10px_0_0_rgba(0,245,255,0.35)] sm:h-20 sm:w-20 sm:text-lg sm:shadow-[6px_6px_0_0_rgba(0,245,255,0.25)]">
          {item.tag}
        </div>
        {/* Labels only above sm — on a phone the full text would collide between adjacent nodes long before the boxes do. */}
        <span className="mt-3 hidden border border-line bg-void px-1.5 py-0.5 font-mono text-[10px] tracking-label text-cyan uppercase whitespace-nowrap sm:block">
          {item.label}
        </span>
      </div>
    </div>
  )
}
