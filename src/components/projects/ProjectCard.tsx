import type { ProjectCard as ProjectCardData } from '../../data/projects'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { Badge } from '../ui/Badge'

interface ProjectCardProps {
  project: ProjectCardData
  className?: string
  /** Home's Featured Work preview keeps this to code links only — see Home.tsx. */
  showDemo?: boolean
}

export function ProjectCard({ project, className = '', showDemo = true }: ProjectCardProps) {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`flex flex-col gap-4 border-[3px] border-cyan p-6 transition-all duration-200 ease-brutal hover:scale-[1.02] hover:shadow-[8px_8px_0_0_rgba(0,245,255,0.25)] ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg tracking-display text-paper uppercase">{project.name}</h3>
        <Badge variant="filled">{project.category}</Badge>
      </div>

      {project.metric && (
        <p className="font-mono text-xs text-cyan">
          <span className="font-bold">{project.metric.value}</span> {project.metric.label}
        </p>
      )}

      <p className="text-[14px] leading-relaxed text-fog">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
        <span className="font-mono text-[10px] tracking-label text-dim uppercase">
          {project.year}
          {project.role ? ` · ${project.role}` : ''}
        </span>
        <div className="flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="border-2 border-line px-3 py-1.5 font-mono text-[10px] tracking-label text-dim uppercase transition-colors duration-200 ease-brutal hover:border-cyan hover:text-cyan"
            >
              View Code
            </a>
          )}
          {showDemo && project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="border-2 border-cyan px-3 py-1.5 font-mono text-[10px] tracking-label text-cyan uppercase transition-colors duration-200 ease-brutal hover:bg-cyan hover:text-void"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
