import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const TYPED_ROLE = 'Discord Server Designer & UI/UX Designer';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 140]);
  const yShapes = useTransform(scrollY, [0, 700], [0, 60]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-[#070A12]">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large XOHAN outline — parallax slower */}
        <motion.div style={{ y }} className="logo-bg-text absolute select-none"
          style={{ y, left: '-3%', top: '50%', transform: 'translateY(-50%)' }}>
          XOHAN
        </motion.div>

        {/* Radial glow blobs */}
        <motion.div style={{ y: yShapes }} className="absolute"
          style={{ y: yShapes, width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)', top: '10%', left: '5%', filter: 'blur(60px)' }} />
        <motion.div style={{ y: yShapes }} className="absolute"
          style={{ y: yShapes, width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)', bottom: '10%', right: '10%', filter: 'blur(80px)' }} />

        {/* Floating geometric shapes — parallax */}
        <motion.div style={{ y: yShapes }}
          className="shape-float absolute"
          style={{ y: yShapes, top: '22%', left: '42%', width: '16px', height: '16px', border: '1.5px solid rgba(59,130,246,0.35)', transform: 'rotate(15deg)' }} />
        <motion.div style={{ y: yShapes }}
          className="shape-float2 absolute"
          style={{ y: yShapes, top: '60%', left: '36%', width: '11px', height: '11px', border: '1.5px solid rgba(59,130,246,0.25)', transform: 'rotate(30deg)' }} />
        <motion.div style={{ y: yShapes }}
          className="shape-float3 absolute"
          style={{ y: yShapes, top: '75%', left: '55%', width: '8px', height: '8px', border: '1.5px solid rgba(6,182,212,0.25)', transform: 'rotate(0deg)' }} />
        <motion.div style={{ y: yShapes }}
          className="shape-float absolute"
          style={{ y: yShapes, top: '35%', left: '50%', width: '22px', height: '22px', border: '1.5px solid rgba(59,130,246,0.2)', transform: 'rotate(45deg)', animationDelay: '-2s' }} />
        <motion.div style={{ y: yShapes }}
          className="shape-float2 absolute"
          style={{ y: yShapes, top: '48%', left: '28%', width: '9px', height: '9px', border: '1.5px solid rgba(99,102,241,0.3)', transform: 'rotate(20deg)' }} />
      </div>

      {/* Main content — RIGHT ALIGNED like reference */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full pt-28 pb-20 md:pt-36">
        <motion.div
          style={{ opacity }}
          className="ml-auto max-w-2xl"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Section label */}
          <motion.div variants={item} className="flex items-center gap-3 mb-8">
            <span className="text-blue-500 font-mono text-xs tracking-widest">—</span>
            <span className="font-mono text-xs text-white/35 tracking-[0.2em] uppercase">
              Discord &amp; UI/UX Designer
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={item}>
            <h1 className="font-display font-bold text-white leading-[1.0]"
              style={{ fontSize: 'clamp(3.2rem, 7vw, 6.5rem)', letterSpacing: '-0.04em' }}>
              Rowson<br />
              Khan<br />
              <span className="text-accent">XOHAN</span>
            </h1>
          </motion.div>

          {/* Typed role line */}
          <motion.div variants={item} className="mt-6 mb-7 flex items-center gap-2">
            <span className="text-blue-400 font-mono text-sm">{'>'}</span>
            <span className="font-mono text-sm text-white/60">{TYPED_ROLE}</span>
            <span className="blink text-blue-400 font-mono text-sm">_</span>
          </motion.div>

          {/* Bio */}
          <motion.p variants={item} className="text-white/50 text-base leading-relaxed max-w-lg mb-10">
            I design Discord servers and digital interfaces that are built to grow, built to scale,
            and built to last. 200+ servers completed. Every project from scratch.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary group"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Social links — below CTAs, clear of scroll indicator */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-6 mt-10">
            {[
              { label: 'Fiverr', href: 'https://www.fiverr.com/rifat_designer9' },
              { label: 'Discord', href: 'https://discord.com/users/xohanisdead' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rowson-khan-80240b373/' },
              { label: 'Email', href: 'mailto:rtiafnahta123@gmail.com' },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                className="link-draw font-mono text-xs text-white/30 hover:text-blue-400 tracking-widest uppercase transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* SCROLL indicator — bottom RIGHT, away from social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-3"
      >
        <div className="relative w-px h-12 bg-white/10 overflow-hidden">
          <motion.div
            className="absolute top-0 w-full bg-blue-500"
            animate={{ height: ['0%', '100%'], top: ['0%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]" style={{ writingMode: 'vertical-rl' }}>SCROLL</span>
      </motion.div>
    </section>
  );
}