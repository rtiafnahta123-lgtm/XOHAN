import { useRef, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

const projects = [
  {
    id: 1, num: '01', title: 'Apex Gaming Community',
    tag: 'Discord · Gaming',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80',
    tech: ['Server Architecture', 'Bot Suite', 'Role Progression', 'Tournament System'],
    desc: 'Full-scale competitive gaming hub. Ranked role progression, tournament brackets, and a moderation framework built to handle rapid growth.',
    cat: 'discord',
  },
  {
    id: 2, num: '02', title: 'VaultX Crypto Server',
    tag: 'Discord · Web3',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    tech: ['KYC Flow', 'VIP Tiers', 'Audit Logging', 'Security'],
    desc: 'High-security crypto community with tiered access, automated KYC verification, and compliance-grade audit trail.',
    cat: 'discord',
  },
  {
    id: 3, num: '03', title: 'NebulaApp Dashboard',
    tag: 'UI/UX · SaaS',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    tech: ['Dashboard UI', 'Dark Theme', 'Design System', 'Figma'],
    desc: 'End-to-end dashboard design for a SaaS analytics platform. Delivered as structured Figma files with a documented component library.',
    cat: 'uiux',
  },
  {
    id: 4, num: '04', title: 'Moonlight Anime Lounge',
    tag: 'Discord · Anime',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80',
    tech: ['Custom Embeds', 'Verification', 'Age-Gate', 'Compliance'],
    desc: 'Themed anime community with strict verification, custom embed design, and full compliance architecture for 5K+ members.',
    cat: 'discord',
  },
];

function ProjectCard({ p, index, inView }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });

  const handleMouseMove = useCallback((e) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0–1
    const y = (e.clientY - rect.top) / rect.height;    // 0–1
    setTilt({
      rotateY: (x - 0.5) * 14,   // -7 to +7 deg
      rotateX: -(y - 0.5) * 10,  // -5 to +5 deg
      glowX: x * 100,
      glowY: y * 100,
    });
  }, []);

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  };

  // Subtle idle float offset per card
  const floatDelay = index * 1.1;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        borderRadius: '20px',
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid ${hovered ? 'rgba(59,130,246,0.35)' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered
          ? `0 28px 70px rgba(0,0,0,0.65), 0 0 0 1px rgba(59,130,246,0.15), 0 0 60px rgba(59,130,246,0.08)`
          : '0 8px 32px rgba(0,0,0,0.35)',
        transform: !isTouch && hovered
          ? `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(8px)`
          : 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        transition: hovered
          ? 'box-shadow 0.2s ease, border-color 0.2s ease'
          : 'transform 0.6s cubic-bezier(0.23,1,0.32,1), box-shadow 0.6s ease, border-color 0.4s ease',
        willChange: 'transform',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Dynamic spotlight glow that follows cursor */}
      {hovered && !isTouch && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(59,130,246,0.1) 0%, transparent 60%)`,
            borderRadius: '20px',
            zIndex: 1,
            transition: 'background 0.05s linear',
          }}
        />
      )}

      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/8', borderRadius: '20px 20px 0 0' }}>
        <img
          src={p.image} alt={p.title}
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.4) saturate(0.5)',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.7s cubic-bezier(0.23,1,0.32,1)',
          }}
        />
        {/* Tech tags overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'rgba(59,130,246,0.07)', zIndex: 2 }}
        >
          <div className="flex flex-wrap gap-2 p-6 justify-center">
            {p.tech.map(t => (
              <span key={t} className="font-mono text-[11px] px-3 py-1.5"
                style={{ background: 'rgba(7,10,18,0.9)', color: '#3B82F6', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '4px' }}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>
        {/* Tag badge */}
        <div className="absolute top-4 left-4" style={{ zIndex: 3 }}>
          <span className="font-mono text-[11px] px-2.5 py-1.5 text-white/50"
            style={{ background: 'rgba(7,10,18,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px' }}>
            {p.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6" style={{ position: 'relative', zIndex: 2 }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <span className="font-mono text-xs text-white/20">{p.num}</span>
              <h3 className="font-display font-bold text-white text-lg" style={{ letterSpacing: '-0.02em' }}>{p.title}</h3>
            </div>
            <p className="text-white/35 text-sm leading-relaxed ml-8">{p.desc}</p>
          </div>
          <a href="https://www.fiverr.com/rifat_designer9" target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-white/[0.08] hover:border-blue-500 hover:text-blue-400 text-white/30 transition-all"
            style={{ borderRadius: '6px' }}>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? projects : projects.filter(p => p.cat === filter);

  return (
    <section id="portfolio" className="py-32 md:py-44" style={{ background: '#070A12' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="section-label"
        >
          <span>03</span>
          <span>Projects</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.08 }}
            className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
          >
            Selected work &amp;<br />
            <span className="text-accent">shipped projects.</span>
          </motion.h2>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex gap-0 border border-white/[0.08]"
          >
            {[['all', 'All'], ['discord', 'Discord'], ['uiux', 'UI/UX']].map(([k, l]) => (
              <button key={k} onClick={() => setFilter(k)}
                className="px-5 py-2.5 font-mono text-xs tracking-widest uppercase transition-all"
                style={{
                  background: filter === k ? '#3B82F6' : 'transparent',
                  color: filter === k ? 'white' : 'rgba(255,255,255,0.3)',
                  borderRight: k !== 'uiux' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}>
                {l}
              </button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-7"
          >
            {filtered.map((p, i) => <ProjectCard key={p.id} p={p} index={i} inView={inView} />)}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <a href="https://www.fiverr.com/rifat_designer9" target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs text-white/30 hover:text-blue-400 tracking-widest uppercase transition-colors">
            All work on Fiverr →
          </a>
        </motion.div>
      </div>
    </section>
  );
}