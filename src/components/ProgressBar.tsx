import type { RefObject } from 'react'

interface ProgressBarProps {
  progressBarRef: RefObject<HTMLDivElement | null>
}

/**
 * Thin fixed bar reflecting whole-page scroll fraction (0..1), driven every
 * frame by masterLoop via a scaleX transform on the fill — the same eased
 * scroll value that drives everything else on the page.
 */
export function ProgressBar({ progressBarRef }: ProgressBarProps) {
  return (
    <div className="fixed inset-x-0 top-0 z-40 h-[2px] bg-line" aria-hidden="true">
      <div
        ref={progressBarRef}
        className="h-full origin-left bg-cyan shadow-[0_0_8px_var(--color-cyan)]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
