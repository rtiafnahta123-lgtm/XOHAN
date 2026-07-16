import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Server, Bot, Palette, Settings, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const services = [
  {
    icon: Server,
    num: '01',
    title: 'Discord Server Setup',
    desc: 'Full architecture from zero — channel hierarchy, role systems, verification flows, bot configuration, and custom embeds built around your community.',
    deliverables: ['Channel & Category Structure', 'Role & Permission Systems', 'Verification & Onboarding', 'Custom Embeds & Branding', 'Ticket Systems'],
    support: '3 days post-delivery',
    accent: '#3B82F6',
  },
  {
    icon: Bot,
    num: '02',
    title: 'Bot Setup & Automation',
    desc: 'Configuration of Carl-bot, MEE6, Dyno, and custom bots. Reaction roles, auto-moderation, welcome systems, and community management tools.',
    deliverables: ['Carl-bot / MEE6 / Dyno', 'Reaction & Dropdown Roles', 'Auto-Moderation Setup', 'Ticket Bot Configuration', 'Custom Automation Flows'],
    support: '3 days post-delivery',
    accent: '#06B6D4',
  },
  {
    icon: Palette,
    num: '03',
    title: 'UI/UX Design',
    desc: 'Interface design for digital products. Landing pages, dashboards, and mobile apps — delivered as production-ready Figma files with a structured design system.',
    deliverables: ['Landing Pages', 'Dashboard UI', 'Mobile Interfaces', 'Design Systems', 'Figma Deliverables'],
    support: '7 days post-delivery',
    accent: '#8B5CF6',
  },
  {
    icon: Settings,
    num: '04',
    title: 'Server Optimization',
    desc: 'For existing communities that have outgrown their structure. Full audit, architectural rebuild, and role cleanup with minimal disruption to active members.',
    deliverables: ['Structure Audit', 'Role System Rebuild', 'Channel Reorganization', 'Bot Reconfiguration', 'Brand Refresh'],
    support: '3 days post-delivery',
    accent: '#10B981',
  },
];

function ServiceCard({ svc, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'rgba(255,255,255,0.04)'
          : 'rgba(255,255,255,0.015)',
        border: `1px solid ${hovered ? `${svc.accent}40` : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '16px',
        boxShadow: hovered
          ? `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${svc.accent}20`
          : '0 4px 20px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle corner accent */}
      <div style={{
        position: 'absolute',
        top: 0, right: 0,
        width: '120px', height: '120px',
        background: `radial-gradient(circle at top right, ${svc.accent}12 0%, transparent 70%)`,
        pointerEvents: 'none',
        transition: 'opacity 0.4s ease',
        opacity: hovered ? 1 : 0.5,
      }} />

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div
          style={{
            width: 44, height: 44,
            borderRadius: '10px',
            background: `${svc.accent}15`,
            border: `1px solid ${svc.accent}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s ease',
            ...(hovered ? { background: `${svc.accent}25`, border: `1px solid ${svc.accent}50` } : {}),
          }}
        >
          <svc.icon style={{ width: 18, height: 18, color: svc.accent }} />
        </div>
        <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>{svc.num}</span>
      </div>

      {/* Title + desc */}
      <h3
        className="font-display font-bold text-white mb-3"
        style={{
          fontSize: '1.15rem',
          letterSpacing: '-0.025em',
          color: hovered ? '#fff' : 'rgba(255,255,255,0.92)',
          transition: 'color 0.3s ease',
        }}
      >
        {svc.title}
      </h3>
      <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.38)' }}>
        {svc.desc}
      </p>

      {/* Deliverables */}
      <ul className="space-y-2.5 mb-8 flex-1">
        {svc.deliverables.map(d => (
          <li key={d} className="flex items-center gap-2.5">
            <CheckCircle2
              style={{
                width: 13, height: 13,
                flexShrink: 0,
                color: hovered ? svc.accent : 'rgba(255,255,255,0.2)',
                transition: 'color 0.3s ease',
              }}
            />
            <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.32)', letterSpacing: '0.03em' }}>
              {d}
            </span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex items-center justify-between pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.18)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {svc.support}
        </span>
        <a
          href="https://www.fiverr.com/rifat_designer9"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-xs transition-all group/link"
          style={{ color: hovered ? svc.accent : 'rgba(255,255,255,0.3)' }}
        >
          Get quote
          <ArrowUpRight
            className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
          />
        </a>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" className="py-32 md:py-44" style={{ background: '#0B0F1A' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="section-label"
        >
          <span>02</span>
          <span>Services</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.08 }}
            className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
          >
            What I<br />
            <span className="text-accent">build.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.18 }}
            className="font-mono text-xs max-w-xs"
            style={{ color: 'rgba(255,255,255,0.25)', lineHeight: 1.7, letterSpacing: '0.03em' }}
          >
            Every service is scoped, scoped, and delivered with full post-delivery support.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {services.map((svc, i) => (
            <ServiceCard key={svc.num} svc={svc} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}