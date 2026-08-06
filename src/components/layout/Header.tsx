import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-cyan bg-void/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-350 items-center justify-between px-6 sm:px-10">
        <NavLink to="/" className="font-display text-lg text-paper" onClick={() => setOpen(false)}>
          MERT<span className="text-cyan">_</span>ÜRPER
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `font-mono text-xs tracking-wide uppercase transition-colors duration-200 ease-brutal ${
                  isActive ? 'text-cyan' : 'text-dim hover:text-cyan'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border-2 border-cyan md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span
            className={`h-0.5 w-5 bg-cyan transition-transform duration-200 ease-brutal ${open ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span className={`h-0.5 w-5 bg-cyan transition-opacity duration-200 ease-brutal ${open ? 'opacity-0' : ''}`} />
          <span
            className={`h-0.5 w-5 bg-cyan transition-transform duration-200 ease-brutal ${open ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col border-t-2 border-cyan bg-void md:hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `border-b border-line px-6 py-4 font-mono text-xs tracking-wide uppercase ${isActive ? 'text-cyan' : 'text-dim'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
