import { useScrollReveal } from '../../hooks/useScrollReveal'

interface StatCardProps {
  value: string
  label: string
}

export function StatCard({ value, label }: StatCardProps) {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <div ref={ref} className="flex flex-col gap-2 border-2 border-cyan px-6 py-8 text-center">
      <span className="font-display text-4xl text-cyan sm:text-5xl">{value}</span>
      <span className="font-mono text-[11px] tracking-label text-dim uppercase">{label}</span>
    </div>
  )
}
