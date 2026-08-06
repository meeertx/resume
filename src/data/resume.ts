import type { ResumeData } from '../types/resume'

export const resumeData: ResumeData = {
  masthead: {
    name: 'Mert Ürper',
    role: 'Full-Stack Engineer',
    city: 'Istanbul, Turkey',
  },

  status: {
    label: 'Available for new projects',
    isActive: true,
  },

  summary:
    'Full-stack engineer who ships production web and mobile products end to end — from Postgres schema to deployed UI — for startups, freelance clients, and R&D teams in Istanbul.',

  contact: {
    email: 'mert.urper1@gmail.com',
    links: [
      { label: 'GitHub', href: 'https://github.com/meeertx' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/mert-urper' },
    ],
  },

  selectedWork: [
    {
      index: 1,
      name: 'sermayex',
      metric: { value: '377', label: 'commits shipping a solo SaaS from zero to production' },
      description: [
        'Calculates real startup-formation costs for Turkish founders, combining live market data with Google Gemini for incentive and grant guidance.',
        'Runs a three-tier membership with iyzico payments, a Sanity-powered blog, and Playwright end-to-end tests across nine independent Zustand stores.',
      ],
      stack: ['React 19', 'TypeScript', 'Vite', 'Express', 'Supabase', 'Gemini API', 'Zustand', 'iyzico'],
      year: '2025–Present',
      role: 'Solo builder',
    },
    {
      index: 2,
      name: 'helios-ic-portal',
      metric: { value: '4', label: 'role-based modules unifying company-wide workflows' },
      description: [
        'Internal enterprise portal for Helios Scitech consolidating lab workflows, HR, procurement, and task management behind one login.',
        'Row-level security and Supabase Realtime keep every module’s data scoped and synced live across the team.',
      ],
      stack: ['React 19', 'TypeScript', 'Vite', 'Supabase (Postgres/Auth/RLS)', 'Tailwind CSS', 'Framer Motion'],
      year: '2026',
      role: 'Freelance Engineer',
    },
    {
      index: 3,
      name: 'helios-science-technology',
      metric: { value: '3', label: 'languages shipped across storefront, catalog & CMS' },
      description: [
        'Full-stack corporate site and product catalog for a materials-science company, covering Metal-Organic Framework datasheets end to end.',
        'Sanity CMS powers content in-house; Supabase and Iyzico handle inventory, orders, and payment.',
      ],
      stack: ['React 19', 'Vite', 'TypeScript', 'Sanity', 'Supabase', 'i18next', 'Tailwind CSS'],
      year: '2026',
      role: 'Freelance Engineer',
    },
    {
      index: 4,
      name: 'kimyaLab',
      metric: { value: '3', label: 'certificate types (SDS/COA/MSDS) tracked per product' },
      description: [
        'Chemical product inventory and catalog system with role-based access control and multi-field search by name, CAS number, or product code.',
        'Three.js renders 3D molecule visualizations for every catalog entry.',
      ],
      stack: ['React', 'TypeScript', 'Firebase', 'Three.js', 'Tailwind CSS'],
      year: '2025',
      role: 'Solo builder',
    },
  ],

  everythingElse: [
    {
      name: 'helios-portal',
      description: 'Sales/CRM, TÜBİTAK-KOSGEB grant accounting, and lab inventory in one modular dashboard for Helios Scitech.',
      stack: ['React 19', 'Supabase', 'Tailwind'],
      year: '2026',
    },
    {
      name: 'helios-tech',
      description: 'Marketing site for Metal-Organic Framework materials with interactive 3D molecular visualization.',
      stack: ['React', 'Vite', 'Framer Motion'],
      year: '2026',
    },
    {
      name: 'CleanerLab (xCleaner)',
      description: 'Commercial iOS/Android app detecting duplicate photos via pixel comparison; shipped to a private investor with IAP and push notifications.',
      stack: ['React Native', 'Firebase'],
      year: '2022–2023',
    },
    {
      name: 'eDoc',
      description: 'Logistics and appointment aggregation platform with real-time GPS tracking over Socket.io and Google Maps.',
      stack: ['Node.js', 'React', 'Socket.io'],
      year: '2023',
    },
    {
      name: 'FoodRecipeApp',
      description: 'Recipe browser built to learn gesture-driven UI with react-native-reanimated.',
      stack: ['React Native'],
      year: '2023',
    },
    {
      name: 'MovieApp',
      description: 'Movie discovery app built while learning React Native fundamentals.',
      stack: ['React Native'],
      year: '2023',
    },
    {
      name: 'noteApp',
      description: 'Local note-taking app backed by AsyncStorage.',
      stack: ['React Native'],
      year: '2023',
    },
    {
      name: 'react-native-first-app',
      description: 'First React Native build — layout and navigation fundamentals.',
      stack: ['React Native'],
      year: '2023',
    },
  ],

  howIWork: [
    {
      title: 'Frontend',
      body: 'React, Next.js, React Native, TypeScript, Tailwind CSS. Same component vocabulary across web and mobile, so UI logic isn’t rewritten twice.',
    },
    {
      title: 'Backend',
      body: 'Node.js, Express, NestJS, Python, RESTful APIs. Auth, authorization, and database integration done the same way on every project.',
    },
    {
      title: 'Data',
      body: 'Postgres via Supabase on every recent project — row-level security scoping access by role, Realtime replacing polling for live state, schema written before a single API route. MongoDB and Prisma when a project’s shape calls for them.',
    },
    {
      title: 'Delivery',
      body: 'CI/CD from day one, not bolted on after — git-push deploys to Vercel, environment-scoped secrets, and Playwright end-to-end tests gating what actually reaches production.',
    },
    {
      title: 'Education',
      body: 'B.Sc. Software Engineering, Nişantaşı University (2021–2026, GPA 3.30/4.00). One semester on Erasmus+ exchange at Mondragon University, Spain (2025).',
    },
    {
      title: 'Languages',
      body: 'Turkish (native), English (B2 / upper-intermediate).',
    },
    {
      title: 'Currently',
      body: 'Building sermayex end to end while delivering freelance web and mobile work for clients in Istanbul.',
    },
  ],

  footer: {
    line: 'Mert Ürper — Istanbul, Turkey — © 2026',
  },
}
