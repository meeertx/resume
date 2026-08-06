export interface TechStackItem {
  tag: string
  label: string
}

/**
 * The 8 nodes in the intro network — Mert's real, primary stack (matches
 * the Frontend/Backend/Data/Delivery blocks in HOW I WORK below), not
 * generic placeholder logos. No AWS/Kubernetes here — he doesn't use them.
 */
export const techStack: TechStackItem[] = [
  { tag: 'TS', label: 'TYPESCRIPT.TS' },
  { tag: 'RX', label: 'REACT.ENGINE' },
  { tag: 'NX', label: 'NEXT.FRAMEWORK' },
  { tag: 'ND', label: 'NODE.RUNTIME' },
  { tag: 'PG', label: 'POSTGRES.DB' },
  { tag: 'TW', label: 'TAILWIND.CSS' },
  { tag: 'DK', label: 'DOCKER.IMG' },
  { tag: 'VC', label: 'VERCEL.EDGE' },
]
