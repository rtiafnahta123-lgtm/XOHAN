import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function Counter({ to, suffix = '', prefix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const duration = 1800;
    const steps = 60;
    const increment = to / steps;
    const timer = setInterval(() => {
      current = Math.min(current + increment, to);
      setVal(Math.floor(current));
      if (current >= to) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

const tags = ['Discord Architecture', 'Bot Configuration', 'UI/UX Design', 'Community Branding', 'Web3 Servers', 'Gaming Communities', 'Anime Communities', 'Creator Brands'];

const stats = [
  { to: 200, suffix: '+', label: 'Servers Built', sub: 'All from scratch' },
  { to: 50, suffix: '+', label: 'Projects Done', sub: 'Fiverr & direct' },
  { to: 7, suffix: '+', label: 'Days Support', sub: 'UI/UX projects' },
  { to: 100, suffix: '%', label: 'Self-Taught', sub: 'Self-driven' },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] } },
});

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-32 md:py-44 relative" style={{ background: '#070A12' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>

        {/* Section header — reference style */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="section-label"
        >
          <span>01</span>
          <span>About</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left — big heading like reference */}
          <motion.div
            variants={fadeUp(0.08)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <h2 className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}>
              Crafting servers<br />
              <span className="text-accent">worth building.</span>
            </h2>
          </motion.div>

          {/* Right — bio + tags */}
          <motion.div
            variants={fadeUp(0.15)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="pt-2"
          >
            <p className="text-white/50 leading-relaxed mb-4">
              I'm <span className="text-white font-medium">Rowson Khan</span>, a professional Discord server designer and UI/UX specialist from Bangladesh operating as <span className="text-blue-400">XOHAN</span>. I started designing servers out of passion for clean architecture and grew it into a speciality — building communities that are structured, scalable, and visually intentional.
            </p>
            <p className="text-white/40 leading-relaxed text-sm mb-8">
              Gaming hubs, crypto communities, creator brands, anime servers — I approach each one the same way: from scratch, shaped entirely around the people it serves, with systems that hold up at scale.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-white/30">
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" />Bangladesh</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Remote</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />Available</span>
            </div>
          </motion.div>
        </div>

        {/* Stats — 4 columns like reference */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-white/[0.06]" style={{ borderRadius: '16px', overflow: 'hidden' }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp(0.1 + i * 0.07)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="p-8 border-r border-b border-white/[0.06] last:border-r-0 group card-interactive"
              style={{ borderRight: i === stats.length - 1 ? 'none' : undefined }}
            >
              <div className="font-display font-bold text-white text-4xl mb-2 tabular-nums group-hover:text-blue-400 transition-colors">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="text-white/70 font-medium text-sm mb-1">{s.label}</div>
              <div className="text-white/25 font-mono text-xs">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}