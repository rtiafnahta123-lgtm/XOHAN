import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    text: "XOHAN rebuilt our Discord from zero. The structure is immediately clear, bots work perfectly, and member engagement went up significantly. Delivers on every promise.",
    name: 'Alex_Raven',
    initials: 'AR',
    role: 'Gaming Community Owner',
    detail: '10K+ Members',
    color: '#3B82F6',
  },
  {
    text: "Fast, professional, no hand-holding required. He asked the right questions upfront and delivered a server with proper security architecture — KYC flow, audit logging, tiered roles. Everything.",
    name: 'CryptoVault_CEO',
    initials: 'CV',
    role: 'Web3 Project Founder',
    detail: 'DeFi Community',
    color: '#06B6D4',
  },
  {
    text: "Clean work with genuine design thinking behind it. Not someone who just moves shapes — he understands systems and builds accordingly. Dashboard came out better than I imagined.",
    name: 'SaaSFounder_X',
    initials: 'SF',
    role: 'UI/UX Client',
    detail: 'SaaS Startup',
    color: '#8B5CF6',
  },
];

function Stars() {
  return (
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <Star key={i} style={{ width: 13, height: 13, fill: '#F59E0B', color: '#F59E0B' }} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (idx) => {
    setDir(idx > active ? 1 : -1);
    setActive(idx);
  };
  const prev = () => go((active - 1 + testimonials.length) % testimonials.length);
  const next = () => go((active + 1) % testimonials.length);

  const t = testimonials[active];

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -40 : 40, scale: 0.97, transition: { duration: 0.3 } }),
  };

  return (
    <section className="py-32 md:py-44 relative overflow-hidden" style={{ background: '#0B0F1A' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="section-label"
        >
          <span>06</span>
          <span>Testimonials</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.08 }}
            className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
          >
            What clients<br />
            <span className="text-accent">actually say.</span>
          </motion.h2>

          {/* Nav controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center transition-all"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'rgba(255,255,255,0.4)',
                background: 'transparent',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)'; e.currentTarget.style.color = '#3B82F6'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center transition-all"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'rgba(255,255,255,0.4)',
                background: 'transparent',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)'; e.currentTarget.style.color = '#3B82F6'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs ml-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {String(active + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          {/* Main card */}
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
            minHeight: '280px',
          }}>
            {/* Glass bg */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(255,255,255,0.025)',
              backdropFilter: 'blur(16px)',
            }} />
            {/* Accent glow top-left */}
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: '300px', height: '200px',
              background: `radial-gradient(ellipse at top left, ${t.color}18 0%, transparent 65%)`,
              pointerEvents: 'none',
              transition: 'background 0.5s ease',
            }} />

            <div className="relative grid md:grid-cols-[1fr_auto] gap-0">
              {/* Quote content */}
              <div className="p-10 md:p-14">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={active}
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <Stars />
                    <div
                      className="font-display font-bold mb-8 leading-snug"
                      style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.45rem)', color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.02em' }}
                    >
                      "{t.text}"
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        style={{
                          width: 44, height: 44, borderRadius: '10px',
                          background: `${t.color}18`,
                          border: `1px solid ${t.color}35`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '0.72rem', fontWeight: 700,
                          color: t.color,
                          flexShrink: 0,
                        }}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <div className="font-display font-semibold text-white" style={{ fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
                          {t.name}
                        </div>
                        <div className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          {t.role} · {t.detail}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Side dot indicators */}
              <div className="hidden md:flex flex-col items-center justify-center gap-3 pr-10">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    style={{
                      width: i === active ? 24 : 6,
                      height: 6,
                      borderRadius: 99,
                      background: i === active ? t.color : 'rgba(255,255,255,0.15)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                style={{
                  width: i === active ? 24 : 6,
                  height: 6,
                  borderRadius: 99,
                  background: i === active ? '#3B82F6' : 'rgba(255,255,255,0.15)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}