const items = [
  'Discord Server Design', '✦', 'Bot Setup & Automation', '✦', 'UI/UX Design', '✦',
  'Verification Systems', '✦', 'Gaming Communities', '✦', 'Web3 Projects', '✦',
  'Custom Embeds', '✦', 'Server Architecture', '✦', 'Community Branding', '✦',
];
const all = [...items, ...items];

export default function MarqueeBand() {
  return (
    <div className="py-3 overflow-hidden border-y" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(59,130,246,0.03)' }}>
      <div className="marquee-track">
        {all.map((item, i) => (
          <span key={i} className="mx-8 font-mono text-[10px] tracking-[0.18em]" style={{
            color: item === '✦' ? '#3B82F6' : 'rgba(255,255,255,0.18)',
            textTransform: item !== '✦' ? 'uppercase' : 'none',
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}