import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MessageSquare, Map, Hammer, RefreshCw, CheckCircle } from 'lucide-react';

const steps = [
  { n: '01', icon: MessageSquare, title: 'Discovery', desc: "A focused conversation about your brand, audience, goals, and technical requirements. The brief is everything — this is where the project is actually decided. I ask the questions most designers skip." },
  { n: '02', icon: Map, title: 'Architecture', desc: "Before touching a single setting, I map the full structure: channel hierarchies, role systems, user flows, or UI wireframes. Architecture first, execution second." },
  { n: '03', icon: Hammer, title: 'Build', desc: "Execution phase. Every channel, permission, embed, bot, and visual element is built to the agreed spec. No improvisation. No scope creep. No surprises." },
  { n: '04', icon: RefreshCw, title: 'Review & Refine', desc: "Full walkthrough with you. Feedback is implemented through structured revision rounds — not ad hoc changes — until everything is exactly right." },
  { n: '05', icon: CheckCircle, title: 'Handoff', desc: "Clean delivery with admin guide, bot documentation, and a post-delivery support window. You own everything, completely. No vendor lock-in." },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState(0);
  const s = steps[active];
  const Icon = s.icon;

  return (
    <section id="process" className="py-32 md:py-44" style={{ background: '#070A12' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="section-label"
        >
          <span>05</span>
          <span>Process</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.08 }}
          className="font-display font-bold text-white mb-16"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
        >
          The path<br />
          <span className="text-accent">to delivery.</span>
        </motion.h2>

        <div className="grid lg:grid-cols-[280px_1fr] gap-5">
          {/* Step selector */}
          <div className="flex flex-col gap-2">
            {steps.map((step, i) => (
              <motion.button
                key={step.n}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActive(i)}
                className="text-left px-5 py-4 flex items-center gap-4"
                style={{
                  borderRadius: '12px',
                  border: `1px solid ${active === i ? 'rgba(59,130,246,0.28)' : 'rgba(255,255,255,0.05)'}`,
                  background: active === i ? 'rgba(59,130,246,0.08)' : 'rgba(255,255,255,0.01)',
                  boxShadow: active === i ? '0 0 24px rgba(59,130,246,0.08)' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  if (active !== i) {
                    e.currentTarget.style.borderColor = 'rgba(59,130,246,0.18)';
                    e.currentTarget.style.background = 'rgba(59,130,246,0.04)';
                  }
                }}
                onMouseLeave={e => {
                  if (active !== i) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                  }
                }}
              >
                <span
                  className="font-mono text-xs"
                  style={{
                    color: active === i ? '#3B82F6' : 'rgba(255,255,255,0.2)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {step.n}
                </span>
                <span
                  className="font-display font-semibold text-sm"
                  style={{
                    color: active === i ? 'white' : 'rgba(255,255,255,0.38)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {step.title}
                </span>
                {active === i && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 timeline-dot" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderRadius: '20px',
                border: '1px solid rgba(59,130,246,0.14)',
                background: 'rgba(255,255,255,0.025)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(59,130,246,0.06)',
                position: 'relative',
                overflow: 'hidden',
                padding: '40px',
              }}
            >
              {/* Corner glow */}
              <div style={{
                position: 'absolute', top: 0, left: 0,
                width: '220px', height: '180px',
                background: 'radial-gradient(ellipse at top left, rgba(59,130,246,0.1) 0%, transparent 65%)',
                pointerEvents: 'none',
              }} />

              {/* Icon + step label */}
              <div className="flex items-center gap-3 mb-6" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: 38, height: 38,
                  borderRadius: '10px',
                  background: 'rgba(59,130,246,0.12)',
                  border: '1px solid rgba(59,130,246,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon style={{ width: 16, height: 16, color: '#3B82F6' }} />
                </div>
                <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(59,130,246,0.55)' }}>
                  STEP {s.n} / 05
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-display font-bold text-white mb-5"
                style={{ fontSize: '1.9rem', letterSpacing: '-0.03em', position: 'relative', zIndex: 1 }}
              >
                {s.title}
              </h3>

              {/* Description */}
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: '540px', position: 'relative', zIndex: 1 }}>
                {s.desc}
              </p>

              {/* Progress pills */}
              <div className="flex gap-2 mt-10" style={{ position: 'relative', zIndex: 1 }}>
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    style={{
                      height: '4px',
                      width: active === i ? '32px' : '8px',
                      borderRadius: '99px',
                      background: active === i ? '#3B82F6' : 'rgba(255,255,255,0.1)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}