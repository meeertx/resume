import { SocialLinks } from '../components/ui/SocialLinks'
import { resumeData } from '../data/resume'

const CAREER_DIRECTIONS = [
  'Grow sermayex into a self-sustaining product, not just a portfolio piece',
  'Take on deeper backend/infrastructure ownership on freelance and Helios work',
  'Keep the same bar solo as on a team typed end to end, tested, deployed on day one',
  'Stay hands-on across the stack rather than narrowing into one layer',
]

export default function About() {
  const skillGroups = resumeData.howIWork.slice(0, 4)

  return (
    <div className="mx-auto flex max-w-350 flex-col gap-12 px-6 py-16 sm:px-10 sm:py-24">
      <header className="flex flex-col gap-3 border-b-[3px] border-cyan pb-6">
        <h1 className="font-display text-3xl tracking-display text-paper uppercase sm:text-5xl">Identity_File</h1>
        <p className="font-mono text-sm text-dim uppercase">Software Engineer · Systems-minded Builder</p>
      </header>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,320px)_1fr]">
        {/* Left column */}
        <div className="flex flex-col gap-8">
          <div className="h-36 w-36 overflow-hidden border-[5px] border-cyan sm:h-40 sm:w-40">
            <img
              src="/mert.jpg"
              alt={resumeData.masthead.name}
              className="h-full w-full object-cover grayscale transition-[filter] duration-300 ease-brutal hover:grayscale-0"
            />
          </div>

          <div className="flex flex-col gap-3 font-mono text-sm">
            <a href={`mailto:${resumeData.contact.email}`} className="text-fog transition-colors duration-200 ease-brutal hover:text-cyan">
              {resumeData.contact.email}
            </a>
            <span className="text-fog">{resumeData.masthead.city}</span>
            <span className="text-cyan uppercase">
              OPEN_FOR_WORK: {String(resumeData.status.isActive)}
            </span>
          </div>

          <SocialLinks />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-14">
          <section className="flex flex-col gap-4">
            <p className="text-[15px] leading-relaxed text-fog sm:text-base">
              {resumeData.masthead.name} is a full-stack engineer in Istanbul who ships production web and mobile
              products end to end schema, API, and interface, all written by the same hands.
            </p>
            <p className="text-[15px] leading-relaxed text-fog sm:text-base">
              The path here wasn't a straight line: he started in Nursing at Kocaeli University before transferring
              into Software Engineering a deliberate switch, not a default. Since 2023 that's meant real production
              work: internal tools and automation at FairMount Quasar, freelance backend and full-stack builds under
              FutureWave, and most recently full-stack engineering for Helios Science & Technology, alongside sermayex, a
              solo SaaS he's been building and shipping to production since 2025.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-mono text-[11px] tracking-label text-cyan uppercase">// Why Software Engineering</h2>
            <p className="max-w-2xl text-[15px] leading-relaxed text-fog">
              The appeal is end-to-end ownership: the same person writing the database schema, the API that sits on
              it, and the interface someone actually uses watching a real system go from a blank repo to something
              people depend on.
            </p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-mono text-[11px] tracking-label text-cyan uppercase">// Where This Is Going</h2>
            <ul className="flex flex-col gap-3">
              {CAREER_DIRECTIONS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-fog">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-cyan" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-mono text-[11px] tracking-label text-cyan uppercase">// Skills Summary</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {skillGroups.map((group) => (
                <p key={group.title} className="font-mono text-[13px] leading-relaxed text-fog">
                  <span className="text-cyan uppercase">{group.title}:</span> {group.body}
                </p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
