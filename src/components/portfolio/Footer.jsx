export default function Footer() {
  const year = new Date().getFullYear();
  const go = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="border-t py-10" style={{ background: '#070A12', borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 group">
          <span className="font-display font-bold text-white text-base tracking-tight group-hover:text-blue-400 transition-colors">XOHAN</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-cyan-400 transition-colors" />
        </button>

        <nav className="flex flex-wrap justify-center gap-6">
          {[['About', '#about'], ['Services', '#services'], ['Work', '#portfolio'], ['Process', '#process'], ['Contact', '#contact']].map(([l, h]) => (
            <button key={l} onClick={() => go(h)} className="font-mono text-[10px] text-white/20 hover:text-white/60 tracking-widest uppercase transition-colors">{l}</button>
          ))}
        </nav>

        <span className="font-mono text-[10px] text-white/15">© {year} Rowson Khan</span>
      </div>
      <div className="sr-only">Discord server designer Bangladesh, professional Discord setup, UI UX designer freelancer, Fiverr Discord expert</div>
    </footer>
  );
}