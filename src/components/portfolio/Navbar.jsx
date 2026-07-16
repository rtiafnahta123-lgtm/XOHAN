import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(7,10,18,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group"
        >
          <span className="font-display font-bold text-white text-xl tracking-tight">
            XOHAN
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-cyan-400 transition-colors" />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => go(l.href)}
              className="px-5 py-2 font-mono text-xs text-white/40 hover:text-white tracking-widest uppercase transition-colors duration-200 link-draw"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <a
          href="https://www.fiverr.com/rifat_designer9"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary hidden md:inline-flex"
          style={{ padding: '9px 20px', fontSize: '0.75rem' }}
        >
          Hire Me
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white/60 hover:text-white transition-colors">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t"
            style={{ background: 'rgba(7,10,18,0.98)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {links.map((l) => (
                <button key={l.label} onClick={() => go(l.href)}
                  className="text-left py-3 font-mono text-xs text-white/50 hover:text-white tracking-widest uppercase transition-colors">
                  {l.label}
                </button>
              ))}
              <div className="pt-3">
                <a href="https://www.fiverr.com/rifat_designer9" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}