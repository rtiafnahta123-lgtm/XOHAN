import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Copy, Check, ArrowUpRight, Send } from 'lucide-react';

const CopyField = ({ label, value, href }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between py-5 border-b border-white/[0.06] group">
      <div>
        <div className="font-mono text-[10px] text-white/20 uppercase tracking-widest mb-1">{label}</div>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer"
            className="text-sm text-white/60 hover:text-blue-400 transition-colors font-medium flex items-center gap-1">
            {value}
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ) : (
          <span className="text-sm text-white/60 font-medium">{value}</span>
        )}
      </div>
      <button
        onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
        className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 border border-white/[0.08] hover:border-blue-500/40 flex items-center justify-center"
      >
        {copied ? <Check className="w-3 h-3 text-blue-400" /> : <Copy className="w-3 h-3 text-white/30" />}
      </button>
    </div>
  );
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-32 md:py-44" style={{ background: '#0B0F1A' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="section-label"
        >
          <span>08</span>
          <span>Contact</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.08 }}
          >
            <h2 className="font-display font-bold text-white mb-6"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}>
              Let's build<br />
              <span className="text-accent">something real.</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-10">
              Have a project, a Discord server to design, or a UI to build? I'm open to new work,
              collaborations, and interesting opportunities.
            </p>

            {/* Contact list */}
            <div>
              <CopyField label="Email" value="rtiafnahta123@gmail.com" href="mailto:rtiafnahta123@gmail.com" />
              <CopyField label="Fiverr" value="fiverr.com/rifat_designer9" href="https://www.fiverr.com/rifat_designer9" />
              <CopyField label="LinkedIn" value="rowson-khan-80240b373" href="https://www.linkedin.com/in/rowson-khan-80240b373/" />
              <CopyField label="Discord" value="xohanisdead" />
            </div>

            <div className="flex items-center gap-2.5 mt-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 timeline-dot" />
              <span className="font-mono text-xs text-white/25">Currently available for new projects</span>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.18 }}
          >
            <form onSubmit={submit} className="space-y-4">
              {[
                { k: 'name', l: 'Name', t: 'text', ph: 'Your name' },
                { k: 'email', l: 'Email', t: 'email', ph: 'your@email.com' },
              ].map(f => (
                <div key={f.k}>
                  <label className="block font-mono text-[10px] text-white/25 uppercase tracking-widest mb-2">{f.l}</label>
                  <input
                    type={f.t}
                    placeholder={f.ph}
                    required
                    value={form[f.k]}
                    onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))}
                    className="w-full px-4 py-3.5 bg-transparent text-sm text-white placeholder-white/20 transition-colors focus:outline-none font-mono"
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>
              ))}
              <div>
                <label className="block font-mono text-[10px] text-white/25 uppercase tracking-widest mb-2">Project Details</label>
                <textarea
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-3.5 bg-transparent text-sm text-white placeholder-white/20 transition-colors focus:outline-none resize-none font-mono leading-relaxed"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center group">
                {sent ? 'Message Sent' : 'Send Message'}
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}