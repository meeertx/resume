import type { MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'accent'
  to?: string
  href?: string
  onClick?: MouseEventHandler
  type?: 'button' | 'submit'
  className?: string
}

const BASE =
  'group inline-flex items-center justify-center gap-2 border-[3px] px-10 py-5 font-mono text-xs tracking-wide uppercase transition-all duration-200 ease-brutal active:translate-x-1 active:translate-y-1 active:shadow-none'

const VARIANTS: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'border-paper text-paper shadow-[6px_6px_0_0_rgba(255,255,255,0.2)] hover:translate-x-1 hover:translate-y-1 hover:bg-paper hover:text-void hover:shadow-none',
  accent:
    'border-cyan text-cyan shadow-[6px_6px_0_0_rgba(0,245,255,0.2)] hover:translate-x-1 hover:translate-y-1 hover:bg-cyan hover:text-void hover:shadow-none',
}

/** The one brutal-button implementation — every CTA on the site goes through this. */
export function Button({ children, variant = 'primary', to, href, onClick, type = 'button', className = '' }: ButtonProps) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} className={cls}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
