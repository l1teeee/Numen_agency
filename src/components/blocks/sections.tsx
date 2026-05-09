'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, User, Mail, MessageSquare, DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'
import { SelectCustom } from '@/components/ui/select-custom'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const INPUT =
  'w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-white/20 focus:outline-none transition-colors duration-200'

// ─── Services ────────────────────────────────────────────────
const services = [
  {
    num: '01',
    title: 'Web Development',
    desc: 'Full-stack apps with Next.js, TypeScript and Supabase. From MVPs to production-grade SaaS platforms.',
  },
  {
    num: '02',
    title: 'Product Design',
    desc: 'Design systems built in Figma, shipped pixel-perfect. Accessible, scalable, consistent across every screen.',
  },
  {
    num: '03',
    title: 'AI Integration',
    desc: 'Embed AI into your product — chatbots, recommendations, automation — powered by the latest models.',
  },
  {
    num: '04',
    title: 'Digital Strategy',
    desc: "Architecture, roadmaps, and growth strategy. We think before we build so you don't have to rebuild.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="sticky top-0 z-10 flex h-screen flex-col bg-black">
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 py-10 lg:px-8">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
          <span className="text-xs uppercase tracking-widest text-white/30">What We Do</span>
          <span className="text-xs text-white/20">02</span>
        </div>
        <div className="mt-6 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              {...fadeUp(i * 0.08)}
              className="flex flex-col justify-between rounded-2xl border border-white/[0.08] p-6 transition-colors duration-300 hover:border-white/[0.16]"
            >
              <span className="text-xs font-medium text-white/20">{s.num}</span>
              <div>
                <h3 className="mb-2 text-base font-semibold text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-white/40">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Projects ────────────────────────────────────────────────
const projects = [
  {
    name: 'VieLink',
    category: 'Platform · 2024',
    desc: 'Smart platform for digital professionals to manage their online presence, connect with clients, and showcase their work — all from a single link.',
    stack: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    href: '#',
  },
  {
    name: 'InkyTap',
    category: 'SaaS · 2024',
    desc: 'Digital ordering and menu management platform for modern restaurants and cafes.',
    stack: ['Next.js', 'Supabase', 'Stripe'],
    href: '#',
  },
  {
    name: 'Numen DS',
    category: 'Internal · 2025',
    desc: 'Component library and design tokens powering all our client products.',
    stack: ['shadcn/ui', 'Figma', 'Tailwind CSS'],
    href: '#',
  },
]

export function ProjectsSection() {
  const [featured, ...rest] = projects
  return (
    <section id="work" className="sticky top-0 z-20 flex h-screen flex-col rounded-t-[2rem] border-t border-white/[0.08] bg-black">
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 py-10 lg:px-8">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
          <span className="text-xs uppercase tracking-widest text-white/30">Selected Work</span>
          <span className="text-xs text-white/20">03</span>
        </div>
        <div className="mt-6 flex flex-1 flex-col gap-3 lg:flex-row">
          <motion.div {...fadeUp(0)} className="flex-1 lg:flex-[2]">
            <Link href={featured.href} className="group flex h-full flex-col justify-between rounded-2xl border border-white/[0.08] p-6 transition-colors duration-300 hover:border-white/[0.16]">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs text-white/30">{featured.category}</span>
                  <h3 className="mt-1 text-xl font-semibold text-white">{featured.name}</h3>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-white/20 transition-colors duration-200 group-hover:text-white" />
              </div>
              <div>
                <p className="mb-4 text-sm leading-relaxed text-white/40">{featured.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {featured.stack.map((t) => (
                    <span key={t} className="rounded-full border border-white/[0.08] px-3 py-1 text-xs text-white/40">{t}</span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
          <div className="flex flex-row gap-3 lg:flex-col lg:flex-1">
            {rest.map((p, i) => (
              <motion.div key={p.name} {...fadeUp(0.1 + i * 0.08)} className="flex-1">
                <Link href={p.href} className="group flex h-full flex-col justify-between rounded-2xl border border-white/[0.08] p-5 transition-colors duration-300 hover:border-white/[0.16]">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs text-white/30">{p.category}</span>
                      <h3 className="mt-1 text-sm font-semibold text-white">{p.name}</h3>
                    </div>
                    <ArrowUpRight className="size-3.5 shrink-0 text-white/20 transition-colors duration-200 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="mb-3 text-xs leading-relaxed text-white/40">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((t) => (
                        <span key={t} className="rounded-full border border-white/[0.08] px-2.5 py-0.5 text-xs text-white/40">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── About ───────────────────────────────────────────────────
const team = [
  {
    initials: 'JM',
    name: 'Julian Mendez',
    role: 'Full-Stack Developer & Co-founder',
    desc: 'Leads architecture and backend systems. Obsessed with clean code and scalable infrastructure.',
  },
  {
    initials: 'IR',
    name: 'Igmer Rodriguez',
    role: 'Full-Stack Developer & Co-founder',
    desc: 'Drives frontend and product design. Turns complex UX problems into elegant, pixel-perfect interfaces.',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="sticky top-0 z-30 flex h-screen flex-col rounded-t-[2rem] border-t border-white/[0.08] bg-black">
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col px-6 py-10 lg:px-8">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
          <span className="text-xs uppercase tracking-widest text-white/30">About Numen</span>
          <span className="text-xs text-white/20">04</span>
        </div>

        <div className="mt-8 grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Left — text + team */}
          <motion.div {...fadeUp(0)} className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-semibold leading-snug tracking-tight text-white lg:text-4xl">
                A small team that builds<br />
                <span className="text-white/25">great digital products.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/40">
                Numen Agency was founded with one mission: build digital products that actually work.
                We combine design thinking with engineering precision to deliver software that scales
                and experiences that people love.
              </p>
            </div>

            <div className="space-y-2.5">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  {...fadeUp(0.12 + i * 0.08)}
                  className="flex items-start gap-4 rounded-2xl border border-white/[0.08] p-4 transition-colors duration-200 hover:border-white/[0.16]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] text-xs font-medium text-white/40">
                    {member.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{member.name}</p>
                    <p className="text-xs text-white/30">{member.role}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/40">{member.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 content-start gap-3">
            {[
              { value: '10+', label: 'Projects delivered' },
              { value: '3+', label: 'Years of experience' },
              { value: '100%', label: 'Remote & async' },
              { value: '24h', label: 'Response time' },
            ].map((stat, i) => (
              <motion.div key={stat.label} {...fadeUp(0.1 + i * 0.07)} className="rounded-2xl border border-white/[0.08] p-6">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-white/40">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Tech Stack ──────────────────────────────────────────────
const stackCategories = [
  {
    label: 'Frontend',
    items: [
      { name: 'Next.js', icon: 'nextdotjs' },
      { name: 'React', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
    ],
  },
  {
    label: 'Backend & DB',
    items: [
      { name: 'Supabase', icon: 'supabase' },
      { name: 'PostgreSQL', icon: 'postgresql' },
    ],
  },
  {
    label: 'Design',
    items: [
      { name: 'Figma', icon: 'figma' },
      { name: 'Framer', icon: 'framer' },
    ],
  },
  {
    label: 'DevOps & Tools',
    items: [
      { name: 'Vercel', icon: 'vercel' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Notion', icon: 'notion' },
    ],
  },
]

export function TechStackSection() {
  return (
    <section id="stack" className="rounded-t-[2rem] border-t border-white/[0.08] bg-black py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between border-b border-white/[0.08] pb-6"
          {...fadeUp(0)}
        >
          <span className="text-xs uppercase tracking-widest text-white/30">Our Stack</span>
          <span className="text-xs text-white/20">06</span>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          <motion.div {...fadeUp(0.05)}>
            <h2 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
              Tools we trust<br />
              <span className="text-white/25">to build with.</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/40">
              We carefully select every tool for reliability, developer experience, and long-term
              scalability. No hype — only tools that actually deliver in production.
            </p>
          </motion.div>

          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {stackCategories.map((cat) => (
              <motion.div key={cat.label} variants={staggerItem}>
                <span className="mb-3 block text-xs uppercase tracking-widest text-white/25">
                  {cat.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item.name}
                      className="flex items-center gap-2 rounded-2xl border border-white/[0.08] px-4 py-2 transition-colors duration-200 hover:border-white/[0.16]"
                    >
                      <img
                        src={`https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${item.icon}.svg`}
                        alt={item.name}
                        className="h-3.5 w-3.5 invert opacity-60"
                      />
                      <span className="text-sm text-white/60">{item.name}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ────────────────────────────────────────────
const testimonials = [
  {
    quote: 'Working with Numen was exactly what our startup needed. They took our rough idea and shipped a product our users actually love. Fast, communicative, and genuinely invested in the outcome.',
    name: 'Maria Santos',
    role: 'CEO, Finspark',
    initials: 'MS',
  },
  {
    quote: 'The level of polish they deliver is remarkable. Our redesign went from concept to launch in 6 weeks, and the design system they built saved us months of future work.',
    name: 'Carlos Herrera',
    role: 'Founder, Stackr',
    initials: 'CH',
  },
  {
    quote: 'Most agencies over-promise and under-deliver. Numen did the opposite — low ego, high output. They felt like part of our team from day one.',
    name: 'Ana Rodriguez',
    role: 'Head of Product, Lumos',
    initials: 'AR',
  },
]

export function TestimonialsSection() {
  return (
    <section className="border-t border-white/[0.08] bg-black py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between border-b border-white/[0.08] pb-6"
          {...fadeUp(0)}
        >
          <span className="text-xs uppercase tracking-widest text-white/30">What Clients Say</span>
          <span className="text-xs text-white/20">05</span>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              className="flex flex-col justify-between gap-8 rounded-2xl border border-white/[0.08] p-6 transition-colors duration-300 hover:border-white/[0.16]"
            >
              <p className="text-sm leading-relaxed text-white/50">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.08] text-[10px] font-medium text-white/30">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-white/30">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Process ─────────────────────────────────────────────────
const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We start by understanding your goals, users, and constraints. Deep dive into the problem space before writing a single line of code.',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Wireframes, prototypes and design systems built in Figma. We validate ideas early so nothing is left to chance during development.',
  },
  {
    num: '03',
    title: 'Build',
    desc: 'Full-stack development with our proven stack. Clean code, thorough testing, and weekly demos to keep you in the loop.',
  },
  {
    num: '04',
    title: 'Launch',
    desc: 'Deploy with confidence. We set up monitoring, analytics and documentation, then stay close for the first weeks post-launch.',
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="border-t border-white/[0.08] bg-black py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between border-b border-white/[0.08] pb-6"
          {...fadeUp(0)}
        >
          <span className="text-xs uppercase tracking-widest text-white/30">How We Work</span>
          <span className="text-xs text-white/20">07</span>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.num}
              variants={staggerItem}
              className="rounded-2xl border border-white/[0.08] p-6 transition-colors duration-300 hover:border-white/[0.16]"
            >
              <span className="text-xs font-medium text-white/20">{step.num}</span>
              <h3 className="mb-3 mt-6 text-base font-semibold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-white/40">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Contact Form + Footer ───────────────────────────────────
const infoItems = [
  { label: 'Email', value: 'hola@numenagency.com' },
  { label: 'Based in', value: 'El Salvador · Remote worldwide' },
  { label: 'Availability', value: 'Open to new projects' },
]

const budgetOptions = [
  { value: 'under5k', label: 'Under $5k' },
  { value: '5-15k', label: '$5k – $15k' },
  { value: '15-50k', label: '$15k – $50k' },
  { value: '50k+', label: '$50k+' },
]

export function ContactFormSection() {
  const [form, setForm] = useState({ name: '', email: '', budget: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle')

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('sent')
  }

  return (
    <>
      <section id="contact" className="border-t border-white/[0.08] bg-black py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-between border-b border-white/[0.08] pb-6"
            {...fadeUp(0)}
          >
            <span className="text-xs uppercase tracking-widest text-white/30">Start a Project</span>
            <span className="text-xs text-white/20">08</span>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left — info */}
            <div className="flex flex-col justify-between gap-10">
              <motion.div {...fadeUp(0.05)}>
                <h2 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                  Let&apos;s build something<br />
                  <span className="text-white/25">great together.</span>
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/40">
                  Tell us about your project. We&apos;ll get back to you within 24 hours with
                  thoughts and next steps.
                </p>
              </motion.div>

              <motion.div
                className="space-y-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {infoItems.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={staggerItem}
                    className="flex items-center gap-4 rounded-2xl border border-white/[0.08] px-5 py-4"
                  >
                    <span className="w-20 shrink-0 text-xs text-white/30">{item.label}</span>
                    <span className="text-sm text-white/60">{item.value}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right — form */}
            <motion.div {...fadeUp(0.12)}>
              {status === 'sent' ? (
                <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border border-white/[0.08] p-12 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] text-white">
                    ✓
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">Message sent!</h3>
                  <p className="mt-2 text-sm text-white/40">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-white/30">Name *</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/20 pointer-events-none" />
                        <input
                          name="name"
                          required
                          value={form.name}
                          onChange={handle}
                          placeholder="Alex Johnson"
                          className={`${INPUT} pl-10`}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-white/30">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/20 pointer-events-none" />
                        <input
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handle}
                          placeholder="alex@company.com"
                          className={`${INPUT} pl-10`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-white/30">Budget range</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/20 pointer-events-none z-10" />
                      <SelectCustom
                        name="budget"
                        value={form.budget}
                        onChange={(v) => setForm((p) => ({ ...p, budget: v }))}
                        options={budgetOptions}
                        placeholder="Select a range"
                        icon={DollarSign}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-white/30">Tell us about your project *</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-3.5 h-3.5 w-3.5 text-white/20 pointer-events-none" />
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handle}
                        placeholder="We're looking to build..."
                        className={`${INPUT} resize-none pl-10`}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'loading'}
                    className="w-full rounded-full bg-white text-black hover:bg-white/90 disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send message'}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer — outside section so border spans full width, content max-w aligned */}
      <footer className="border-t border-white/[0.08] bg-black">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row lg:px-8">
          <span className="text-xs text-white/20">© 2025 Numen Agency. All rights reserved.</span>
          <div className="flex gap-6">
            {['Twitter', 'Instagram', 'LinkedIn', 'GitHub'].map((s) => (
              <Link
                key={s}
                href="#"
                className="text-xs text-white/20 transition-colors duration-150 hover:text-white/60"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
