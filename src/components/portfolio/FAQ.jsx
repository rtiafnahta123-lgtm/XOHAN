import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  { q: 'Do you use templates?', a: 'Never. Every project is built from scratch, designed specifically for your brand and audience. No recycled structures, no copy-paste embeds, no shortcuts.' },
  { q: 'What information do you need to start?', a: "Your server name, purpose, target audience, color palette, preferred bots, and approximate member count. A Discord invite or brand reference helps but isn't required." },
  { q: "What's your typical delivery time?", a: 'Standard projects (30–50 channels) ship in 3–5 business days. Complex servers with multiple bots take 5–10 days. Rush delivery is available on request.' },
  { q: 'How many revisions are included?', a: 'At least 2 structured revision rounds on all packages. Premium packages include up to 5. Minor adjustments are handled freely throughout the project.' },
  { q: 'Can you redesign an existing server?', a: "Yes — it's one of the most common requests. I audit the existing structure, identify inefficiencies, and rebuild with minimal disruption to your active members." },
  { q: 'Do you do UI/UX work outside Discord?', a: 'Yes. Landing pages, dashboards, mobile app interfaces, and design systems. I deliver Figma files or developer-ready assets depending on your needs.' },
];

const FaqItem = ({ faq, index, open, setOpen, inView }) => {
  const isOpen = open === index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="border-b border-white/[0.06]"
    >
      <button
        onClick={() => setOpen(isOpen ? null : index)}
        className="w-full py-5 flex items-center gap-4 text-left group"
      >
        <div className="w-5 h-5 border border-white/[0.1] flex items-center justify-center flex-shrink-0 group-hover:border-blue-500/40 transition-colors">
          <Plus className="w-3 h-3 text-white/30 group-hover:text-blue-400 transition-all duration-200"
            style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }} />
        </div>
        <span className="font-display font-semibold text-base transition-colors" style={{ color: isOpen ? 'white' : 'rgba(255,255,255,0.55)' }}>
          {faq.q}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-9 text-white/40 leading-relaxed text-sm font-mono">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="faq" className="py-32 md:py-44" style={{ background: '#070A12' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="section-label"
        >
          <span>07</span>
          <span>FAQ</span>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.08 }}
            className="font-display font-bold text-white lg:sticky lg:top-32"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
          >
            Common<br />
            <span className="text-accent">questions.</span>
          </motion.h2>

          <div>
            {faqs.map((f, i) => <FaqItem key={i} faq={f} index={i} open={open} setOpen={setOpen} inView={inView} />)}
          </div>
        </div>
      </div>
    </section>
  );
}