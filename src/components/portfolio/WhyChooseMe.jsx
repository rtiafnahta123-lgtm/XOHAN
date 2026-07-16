import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const points = [
  { label: 'No templates. Ever.', body: 'Every project is built from zero, shaped entirely around your brand, audience, and goals.' },
  { label: 'Scales with you.', body: 'Structures designed for 100 members grow cleanly to 100,000 without a rebuild.' },
  { label: 'Obsessive detail.', body: 'Every permission, embed, and pixel gets deliberate attention — not just the visible parts.' },
  { label: 'Clear communication.', body: "You'll know where things stand at every stage. No chasing, no radio silence." },
];

export default function WhyChooseMe() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-32 md:py-44" style={{ background: '#0B0F1A' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="section-label"
        >
          <span>04</span>
          <span>Why XOHAN</span>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.08 }}
            className="lg:sticky lg:top-32"
          >
            <h2 className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}>
              Built different.<br />
              <span className="text-accent">Delivered different.</span>
            </h2>
          </motion.div>

          <div>
            {points.map((pt, i) => (
              <motion.div
                key={pt.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.12 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="why-row py-8 border-b border-white/[0.06] group hover:border-blue-500/25 rounded-sm px-4 -mx-4"
              >
                <div className="flex items-start gap-6">
                  <span className="font-mono text-xs text-white/20 pt-1 flex-shrink-0">0{i + 1}</span>
                  <div>
                    <p className="font-display font-bold text-white mb-2 text-lg group-hover:text-blue-300 transition-colors" style={{ letterSpacing: '-0.02em' }}>{pt.label}</p>
                    <p className="text-white/40 text-sm leading-relaxed">{pt.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}