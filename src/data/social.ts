export interface SocialLink {
  label: string
  href: string
}

// Real handles only — confirmed from the GitHub profile audit (meeertx),
// not invented. No Instagram here since the spec only asks for these three.
export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/meeertx' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/mert-urper' },
  { label: 'Twitter', href: 'https://x.com/meert_urper' },
]
