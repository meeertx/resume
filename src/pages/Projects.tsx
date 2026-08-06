import { ProjectCard } from '../components/projects/ProjectCard'
import { projects } from '../data/projects'

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <div className="mx-auto flex max-w-350 flex-col gap-16 px-6 py-16 sm:px-10 sm:py-24">
      <header className="flex flex-col gap-3 border-b-[3px] border-cyan pb-6">
        <h1 className="font-display text-3xl tracking-display text-paper uppercase sm:text-5xl">Project_Archive</h1>
        <p className="font-mono text-sm text-dim">Real systems, shipped and running.</p>
      </header>

      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-[11px] tracking-label text-cyan uppercase">// Flagship</h2>
        {/* Bento layout — the 4 flagship projects get 2 columns of breathing room instead
            of being flattened into the same uniform grid as everything else. */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-[11px] tracking-label text-cyan uppercase">// Everything Else</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}
