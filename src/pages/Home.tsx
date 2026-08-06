import { Link } from 'react-router-dom'
import { ProjectCard } from '../components/projects/ProjectCard'
import { Button } from '../components/ui/Button'
import { projects } from '../data/projects'
import { resumeData } from '../data/resume'
import { techStack } from '../data/techStack'

// Every number here is directly traceable elsewhere on the site — the
// project count is projects.length (Projects page), the tech count matches
// the 8 nodes shown on Skills. No invented stats.
const STATS = [
  { value: String(projects.length), label: 'Completed Projects' },
  { value: `${techStack.length}+`, label: 'Core Technologies' },
  { value: '2+', label: 'Years Experience' },
]

const FEATURED_SLUGS = ['sermayex', 'helios-ic-portal', 'helios-science-technology']
const featuredProjects = FEATURED_SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter((p) => p !== undefined)

export default function Home() {
  return (
    <div className="mx-auto flex max-w-350 flex-col px-6 py-16 sm:px-10 sm:py-24">
      {/* Hero — asymmetric: headline/bio on the left, a live-status panel on
          the right, instead of one centred column. */}
      <section className="grid grid-cols-1 gap-12 border-b-[3px] border-cyan pb-16 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <span className="font-mono text-[11px] tracking-label text-cyan uppercase">[SYSTEM_INITIATED]</span>
          <h1 className="font-display text-4xl leading-[1.05] tracking-display text-paper uppercase sm:text-6xl md:text-7xl">
            Software Engineer
          </h1>
          <p className="max-w-xl font-mono text-lg text-paper sm:text-xl">
            Turning complex systems into simple, shippable solutions.
          </p>
          <p className="max-w-xl text-[15px] leading-relaxed text-fog sm:text-base">{resumeData.summary}</p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button to="/projects" variant="primary">
              Projects
            </Button>
            <Button to="/contact" variant="accent">
              Contact
            </Button>
          </div>
        </div>

        <div className="flex flex-col border-2 border-cyan lg:col-span-5">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <span className="font-mono text-[10px] tracking-label text-dim uppercase">Status</span>
            <span className="flex items-center gap-2 font-mono text-[10px] tracking-label text-cyan uppercase">
              <span className={`h-1.5 w-1.5 ${resumeData.status.isActive ? 'bg-cyan' : 'bg-dim'}`} />
              {resumeData.status.label}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <span className="font-mono text-[10px] tracking-label text-dim uppercase">Location</span>
            <span className="font-mono text-xs text-paper">{resumeData.masthead.city}</span>
          </div>
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <span className="font-mono text-[10px] tracking-label text-dim uppercase">Currently</span>
            <span className="font-mono text-xs text-paper">sermayex + freelance</span>
          </div>
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex items-center justify-between px-5 py-4 ${i < STATS.length - 1 ? 'border-b border-line' : ''}`}
            >
              <span className="font-mono text-[10px] tracking-label text-dim uppercase">{stat.label}</span>
              <span className="font-display text-xl text-cyan">{stat.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured work — Home shouldn't be a dead end, it should preview real substance. */}
      <section className="flex flex-col gap-10 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-[3px] border-cyan pb-4">
          <h2 className="font-display text-2xl tracking-display text-paper uppercase sm:text-3xl">Featured Work</h2>
          <Link
            to="/projects"
            className="font-mono text-xs tracking-label text-cyan uppercase transition-colors duration-200 ease-brutal hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} showDemo={false} />
          ))}
        </div>
      </section>
    </div>
  )
}
