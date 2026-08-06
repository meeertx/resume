import { useScrollReveal } from '../../hooks/useScrollReveal'

interface CategoryCardProps {
  title: string
  body: string
}

export function CategoryCard({ title, body }: CategoryCardProps) {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <div ref={ref} className="flex flex-col gap-3 border-2 border-cyan p-6">
      <h3 className="font-display text-sm tracking-display text-cyan uppercase">{title}</h3>
      <p className="text-[14px] leading-relaxed text-fog">{body}</p>
    </div>
  )
}
