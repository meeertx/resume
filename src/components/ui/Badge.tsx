interface BadgeProps {
  children: string
  variant?: 'outline' | 'filled'
}

/**
 * `outline` — small transparent tech-stack chip (cyan border).
 * `filled` — solid cyan category badge with void text, used on project cards.
 */
export function Badge({ children, variant = 'outline' }: BadgeProps) {
  if (variant === 'filled') {
    return (
      <span className="inline-block bg-cyan px-2.5 py-1 font-mono text-[10px] font-bold tracking-label text-void uppercase">
        {children}
      </span>
    )
  }

  return (
    <span className="inline-block border border-cyan px-2.5 py-1 font-mono text-[10px] tracking-label text-cyan uppercase transition-colors duration-200 ease-brutal">
      {children}
    </span>
  )
}
