import { resumeData } from '../../data/resume'
import { SocialLinks } from '../ui/SocialLinks'

export function Footer() {
  return (
    <footer className="relative z-10 border-t-2 border-cyan px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-350 flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="font-mono text-[11px] tracking-label text-dim uppercase">{resumeData.footer.line}</p>
        <SocialLinks />
      </div>
    </footer>
  )
}
