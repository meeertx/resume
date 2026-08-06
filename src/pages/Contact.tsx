import { useState, type FormEvent } from 'react'
import { Button } from '../components/ui/Button'
import { SocialLinks } from '../components/ui/SocialLinks'
import { resumeData } from '../data/resume'

function CopyEmailButton() {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(resumeData.contact.email)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="border-2 border-line px-3 py-2 font-mono text-[10px] tracking-label text-dim uppercase transition-colors duration-200 ease-brutal hover:border-cyan hover:text-cyan"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

const inputClass =
  'border-2 border-line bg-void px-4 py-3 font-mono text-sm text-paper placeholder:text-dim placeholder:italic focus:border-cyan focus:outline-none'

/**
 * Looks and behaves like a contact form, but there's no backend collecting
 * it — submitting builds a mailto: link from the fields and hands off to
 * the visitor's own mail client. No third-party form service, no server,
 * nothing sent from this page.
 */
function MailtoForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const body = `${message}\n\n— ${name} (${email})`
    const mailto = `mailto:${resumeData.contact.email}?subject=${encodeURIComponent(
      subject || 'New project inquiry',
    )}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className={inputClass} />
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className={inputClass}
      />
      <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className={inputClass} />
      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        rows={5}
        className={inputClass}
      />
      <p className="font-mono text-[10px] tracking-label text-dim uppercase">
        Opens your email client with this filled in — nothing is sent from this page.
      </p>
      <Button type="submit" variant="accent" className="w-full">
        Send
      </Button>
    </form>
  )
}

export default function Contact() {
  return (
    <div className="mx-auto flex max-w-350 flex-col gap-12 px-6 py-16 sm:px-10 sm:py-24">
      <header className="flex flex-col gap-3 border-b-[3px] border-cyan pb-6">
        <h1 className="font-display text-3xl tracking-display text-paper uppercase sm:text-5xl">Connection_Points</h1>
        <p className="font-mono text-sm text-dim">Got a project in mind? Reach out.</p>
      </header>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-4 border-2 border-cyan px-5 py-4">
            <a href={`mailto:${resumeData.contact.email}`} className="font-mono text-sm text-cyan">
              {resumeData.contact.email}
            </a>
            <CopyEmailButton />
          </div>

          <SocialLinks />

          <div className="flex flex-col gap-3 pt-4">
            <Button href={`mailto:${resumeData.contact.email}`} variant="primary" className="w-full">
              Send Email
            </Button>
            <Button href="https://linkedin.com/in/mert-urper" variant="accent" className="w-full">
              Message on LinkedIn
            </Button>
            <Button href="https://github.com/meeertx" variant="primary" className="w-full">
              View GitHub Profile
            </Button>
          </div>
        </div>

        <MailtoForm />
      </div>
    </div>
  )
}
