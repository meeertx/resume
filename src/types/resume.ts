export interface Masthead {
  name: string
  role: string
  city: string
}

export interface StatusLine {
  label: string
  isActive: boolean
}

export interface ContactLink {
  label: string
  href: string
}

export interface ContactLinks {
  email: string
  links: ContactLink[]
}

export interface ProjectMetric {
  value: string
  label: string
}

export interface Project {
  index: number
  name: string
  metric: ProjectMetric
  description: [string, string]
  stack: string[]
  year: string
  role: string
}

export interface EverythingElseRow {
  name: string
  description: string
  stack: string[]
  year: string
}

export interface HowIWorkBlock {
  title: string
  body: string
}

export interface ResumeData {
  masthead: Masthead
  status: StatusLine
  summary: string
  contact: ContactLinks
  selectedWork: Project[]
  everythingElse: EverythingElseRow[]
  howIWork: HowIWorkBlock[]
  footer: { line: string }
}
