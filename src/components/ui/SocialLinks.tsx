import { socialLinks } from '../../data/social'

interface SocialLinksProps {
  className?: string
}

export function SocialLinks({ className = '' }: SocialLinksProps) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="border border-line px-4 py-2 font-mono text-[11px] tracking-label text-dim uppercase transition-all duration-200 ease-brutal hover:scale-105 hover:border-cyan hover:text-cyan"
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}
