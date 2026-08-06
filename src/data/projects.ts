import { resumeData } from './resume'

export interface ProjectCard {
  slug: string
  name: string
  category: string
  featured: boolean
  metric?: { value: string; label: string }
  description: string
  stack: string[]
  year: string
  role?: string
  githubUrl?: string
  demoUrl?: string
}

interface ProjectMeta {
  /** GitHub repo slug under github.com/meeertx, if the project is public. */
  githubRepo?: string
  /** Only set when a real, confirmed-live demo URL exists — never invented. */
  demoUrl?: string
  category: string
}

const GITHUB_USER = 'meeertx'

// One place mapping each project name (from resume.ts, the single source
// of truth for the actual facts) to its links and a display category.
const META: Record<string, ProjectMeta> = {
  sermayex: { githubRepo: 'sermayex', category: 'SAAS' },
  'helios-ic-portal': { githubRepo: 'helios-ic-portal', category: 'ENTERPRISE' },
  'helios-science-technology': {
    githubRepo: 'helios-science-technology',
    demoUrl: 'https://helios-science-technology-chi.vercel.app',
    category: 'CORPORATE',
  },
  kimyaLab: { githubRepo: 'kimyaLab', category: 'ENTERPRISE' },
  'helios-portal': {
    githubRepo: 'helios-portal',
    demoUrl: 'https://helios-portal-orcin.vercel.app',
    category: 'ENTERPRISE',
  },
  'helios-tech': { githubRepo: 'helios-tech', demoUrl: 'https://helios-tech.vercel.app', category: 'MARKETING' },
  'CleanerLab (xCleaner)': { githubRepo: 'cleanerlab', demoUrl: 'https://cleanerlabapp.com', category: 'MOBILE' },
  eDoc: { githubRepo: 'doctorappointmentedoc', category: 'LOGISTICS' },
  FoodRecipeApp: { githubRepo: 'FoodRecipeApp', category: 'MOBILE' },
  MovieApp: { githubRepo: 'MovieApp', category: 'MOBILE' },
  noteApp: { githubRepo: 'noteApp-with-react-native-AsyncStorage', category: 'MOBILE' },
  'react-native-first-app': { githubRepo: 'react-native-first-app', category: 'MOBILE' },
}

function githubUrl(repo?: string): string | undefined {
  return repo ? `https://github.com/${GITHUB_USER}/${repo}` : undefined
}

/**
 * All real projects as flat cards for the Projects grid — the 4 flagship
 * ones from resume.ts's selectedWork plus the 8 from everythingElse,
 * `featured` distinguishes them for the card treatment. Derived from
 * resumeData rather than re-authored, so the facts (descriptions, stacks,
 * years, metrics) never drift from the single source of truth.
 */
export const projects: ProjectCard[] = [
  ...resumeData.selectedWork.map(
    (p): ProjectCard => ({
      slug: p.name,
      name: p.name,
      category: META[p.name]?.category ?? 'PROJECT',
      featured: true,
      metric: p.metric,
      description: p.description.join(' '),
      stack: p.stack,
      year: p.year,
      role: p.role,
      githubUrl: githubUrl(META[p.name]?.githubRepo),
      demoUrl: META[p.name]?.demoUrl,
    }),
  ),
  ...resumeData.everythingElse.map(
    (p): ProjectCard => ({
      slug: p.name,
      name: p.name,
      category: META[p.name]?.category ?? 'PROJECT',
      featured: false,
      description: p.description,
      stack: p.stack,
      year: p.year,
      githubUrl: githubUrl(META[p.name]?.githubRepo),
      demoUrl: META[p.name]?.demoUrl,
    }),
  ),
]
