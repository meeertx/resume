import emailjs from '@emailjs/browser'
import { useState, type FormEvent } from 'react'
import { Button } from '../components/ui/Button'
import { SocialLinks } from '../components/ui/SocialLinks'
import { resumeData } from '../data/resume'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const EMAILJS_CONFIGURED = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY)

// Once, at module load — not per-send. @emailjs/browser@4.4.1's typed
// Options has no privateKey field (that's a Node-SDK/REST-API concept, not
// something the browser SDK's public API exposes), so VITE_EMAILJS_PRIVATE_KEY
// — if set — currently goes unused. Flag if Strict Mode actually needs it.
if (EMAILJS_CONFIGURED) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })
}

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

type SendStatus = 'idle' | 'sending' | 'success' | 'error'

/**
 * A real contact form — sends via EmailJS directly from the browser, no
 * server of our own to run or pay for. Needs VITE_EMAILJS_SERVICE_ID/
 * TEMPLATE_ID/PUBLIC_KEY set in .env (see .env.example); until those exist
 * this fails with a clear inline message pointing at direct email instead
 * of silently doing nothing.
 */
function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<SendStatus>('idle')

  const sending = status === 'sending'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!EMAILJS_CONFIGURED) {
      console.error('EmailJS is not configured — set VITE_EMAILJS_* in .env (see .env.example)')
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        subject: subject || 'New project inquiry',
        message,
      })
      setStatus('success')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    } catch (err) {
      console.error('EmailJS send failed', err)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        required
        disabled={sending}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className={inputClass}
      />
      <input
        required
        disabled={sending}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className={inputClass}
      />
      <input
        disabled={sending}
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        className={inputClass}
      />
      <textarea
        required
        disabled={sending}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        rows={5}
        className={inputClass}
      />

      {status === 'success' && (
        <p className="font-mono text-[11px] tracking-label text-cyan uppercase">
          Message sent — I'll get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p className="font-mono text-[11px] tracking-label text-magenta uppercase">
          Something went wrong — email {resumeData.contact.email} directly instead.
        </p>
      )}

      <Button type="submit" variant="accent" className="w-full" disabled={sending}>
        {sending ? 'Sending…' : 'Send'}
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

        <ContactForm />
      </div>
    </div>
  )
}
