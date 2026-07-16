import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Server, Bot, Palette, Shield, Ticket, Hash, Users, Layout, Globe, BarChart2 } from 'lucide-react';

const skills = [
  { icon: Server, label: 'Discord Server Setup', level: 98, color: '#3B82F6' },
  { icon: Shield, label: 'Roles & Permissions', level: 96, color: '#3B82F6' },
  { icon: Bot, label: 'Bot Integration', level: 90, color: '#06B6D4' },
  { icon: Shield, label: 'Verification Systems', level: 94, color: '#06B6D4' },
  { icon: Ticket, label: 'Ticket Systems', level: 92, color: '#3B82F6' },
  { icon: Hash, label: 'Custom Embeds', level: 95, color: '#3B82F6' },
  { icon: Users, label: 'Community Tools', level: 88, color: '#06B6D4' },
  { icon: Palette, label: 'UI/UX Design', level: 85, color: '#8B5CF6' },
  { icon: Layout, label: 'Landing Pages', level: 82, color: '#8B5CF6' },
  { icon: BarChart2, label: 'Dashboard Design', level: 80, color: '#06B6D4' },
];

const SkillBar = ({ skill, delay, inView }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    className="group"
  >
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2.5">
        <skill.icon className="w-4 h-4" style={{ color: skill.color, opacity: 0.7 }} />
        <span className="font-mono text-xs text-white/50 group-hover:text-white transition-colors tracking-wide">{skill.label}</span>
      </div>
      <span className="font-mono text-xs text-white/25">{skill.level}</span>
    </div>
    <div className="h-px bg-white/[0.06] relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 h-full"
        style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)` }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
        transition={{ duration: 1.4, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  </motion.div>
);

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="py-32 md:py-44" style={{ background: '#0B0F1A' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="section-label"
        >
          <span>02</span>
          <span>Skills</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.08 }}
          >
            <h2 className="font-display font-bold text-white mb-5"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}>
              The tools that<br />
              <span className="text-accent">run my work.</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              From Discord architecture to clean UI design — every skill has been built through real projects, not tutorials.
            </p>
          </motion.div>

          <div className="space-y-5">
            {skills.map((s, i) => (
              <SkillBar key={s.label} skill={s} delay={0.05 + i * 0.055} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}