import { useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useGlobalScrollLoop } from '../../hooks/useGlobalScrollLoop'
import { ProgressBar } from '../ProgressBar'
import { Footer } from './Footer'
import { Header } from './Header'

/**
 * Grid overlay is here (site-wide, fixed, z-0) rather than per-page — the
 * spec calls for it visible on every route. `key={pathname}` on <main>
 * forces a remount on every navigation, which replays the page-enter
 * fade-in/slide-up each time (a CSS animation doesn't restart on its own
 * just because route content changed under the same DOM node). The global
 * scroll loop (reveals + progress bar) lives here too since Layout is the
 * one thing that persists across every route.
 */
export function Layout() {
  const location = useLocation()
  const progressBarRef = useRef<HTMLDivElement | null>(null)

  useGlobalScrollLoop(progressBarRef)

  // React Router doesn't reset scroll on navigation the way a real page
  // load does — without this, a new route opens wherever the previous
  // page's scrollbar happened to be. useLayoutEffect (not useEffect) so
  // this runs before paint — no visible flash of the new page rendered at
  // the old scroll position first.
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <div className="grid-overlay" aria-hidden="true" />
      <Header />
      <ProgressBar progressBarRef={progressBarRef} />
      <main key={location.pathname} className="page-enter relative z-10 min-h-screen pt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
