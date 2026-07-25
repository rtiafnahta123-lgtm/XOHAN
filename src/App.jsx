import { useState, useRef, useEffect } from 'react';
import {
  ArrowUpRight, Award, Crown, X,
  Users, Layers, Bot, Zap, Palette,
  CheckCircle2, Star, ChevronLeft, ChevronRight,
  Copy, Check, Send, Plus, Minus,
  Eye, Target, Pen, Code, Rocket,
} from 'lucide-react';

/* ══════════════════════ DESIGN TOKENS ══════════════════════════════════════ */
const CR    = '#DC143C';
const CR50  = 'rgba(220,20,60,0.5)';
const CR20  = 'rgba(220,20,60,0.2)';
const CR10  = 'rgba(220,20,60,0.1)';
const CR06  = 'rgba(220,20,60,0.06)';
const BRAND = 'XOHAN';
// Each nav item: { label shown to user, id of the target section }
const NAV_LINKS = [
  { label: 'About',    id: 'about'     },
  { label: 'Services', id: 'services'  },
  { label: 'Work',     id: 'portfolio' },
  { label: 'Contact',  id: 'contact'   },
];
const PODIUM    = "'FSP DEMO - PODIUM Sharp 4.11','Space Grotesk',sans-serif";
const INTER     = "'Inter',sans-serif";
const go = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

/* ══════════════════════ GLOBAL INTERACTION HELPERS ══════════════════════════ */
// 3-D tilt — applied directly on the element receiving mouse events
const tilt = (e) => {
  const el = e.currentTarget;
  const r  = el.getBoundingClientRect();
  const x  = (e.clientX - r.left) / r.width  - 0.5;
  const y  = (e.clientY - r.top)  / r.height - 0.5;
  el.style.transition = 'transform 0.08s ease';
  el.style.transform  = `perspective(900px) rotateY(${x*10}deg) rotateX(${-y*10}deg) scale3d(1.025,1.025,1.025)`;
};
const tiltReset = (e) => {
  e.currentTarget.style.transition = 'transform 0.65s cubic-bezier(0.23,1,0.32,1)';
  e.currentTarget.style.transform  = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
};

// Magnetic — translate button toward cursor
const mag = (e) => {
  const el = e.currentTarget;
  const r  = el.getBoundingClientRect();
  const x  = (e.clientX - r.left - r.width  / 2) * 0.28;
  const y  = (e.clientY - r.top  - r.height / 2) * 0.28;
  el.style.transition = 'transform 0.15s ease';
  el.style.transform  = `translate(${x}px,${y}px)`;
};
const magReset = (e) => {
  e.currentTarget.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
  e.currentTarget.style.transform  = 'translate(0,0)';
};

/* ══════════════════════ useInView ══════════════════════════════════════════ */
function useInView(thr = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold: thr }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [thr]);
  return [ref, v];
}

/* ══════════════════════ REVEAL ══════════════════════════════════════════════ */
function Reveal({ children, d = 0, y = 30, className = '' }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity .9s cubic-bezier(.16,1,.3,1) ${d}s, transform .9s cubic-bezier(.16,1,.3,1) ${d}s`,
    }}>
      {children}
    </div>
  );
}

/* ══════════════════════ SECTION HEADER ══════════════════════════════════════ */
function SH({ eyebrow, title, bg, sub, center }) {
  const [ref, v] = useInView(.07);
  const ta = center ? 'center' : 'left';
  return (
    <div ref={ref} style={{ position:'relative', marginBottom:'5rem', overflow:'visible', textAlign:ta }}>
      {/* Ghost outlined background text */}
      <div aria-hidden style={{
        position:'absolute', top:'-0.75rem',
        left: center ? '50%' : '-0.5rem',
        transform: center ? 'translateX(-50%)' : 'none',
        fontFamily:PODIUM,
        fontSize:'clamp(5rem,16vw,11rem)',
        color:'transparent',
        WebkitTextStroke:`1.5px ${CR10}`,
        textTransform:'uppercase', lineHeight:1,
        userSelect:'none', pointerEvents:'none',
        whiteSpace:'nowrap', zIndex:0,
        opacity: v ? 0.8 : 0,
        transition:'opacity 1.3s ease .15s',
      }}>{bg}</div>

      <div style={{ position:'relative', zIndex:1 }}>
        {eyebrow && (
          <div style={{
            display:'inline-flex', alignItems:'center', gap:'.5rem',
            marginBottom:'1.25rem',
            opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(14px)',
            transition:'all .7s ease .08s',
          }}>
            <span style={{ display:'inline-block', width:20, height:1.5, background:CR }} />
            <span style={{ fontFamily:INTER, fontSize:'.62rem', color:CR, letterSpacing:'.28em', textTransform:'uppercase' }}>
              {eyebrow}
            </span>
          </div>
        )}
        <h2 style={{
          fontFamily:PODIUM,
          fontSize:'clamp(2.5rem,5.5vw,5rem)',
          color:'#fff', textTransform:'uppercase',
          lineHeight:.92, letterSpacing:'-.01em',
          marginBottom: sub ? '1.25rem' : 0,
          opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(24px)',
          transition:'all .9s cubic-bezier(.16,1,.3,1) .2s',
        }}>{title}</h2>
        {sub && (
          <p style={{
            fontFamily:INTER,
            fontSize:'clamp(.85rem,1.5vw,.98rem)',
            color:'rgba(255,255,255,.38)',
            maxWidth:480, lineHeight:1.8,
            margin: center ? '0 auto' : 0,
            opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(16px)',
            transition:'all .9s cubic-bezier(.16,1,.3,1) .35s',
          }}>{sub}</p>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════ SECTION WRAPPER ════════════════════════════════════ */
function SW({ children, id, bg = '#060606', style: s = {} }) {
  return (
    <section id={id}
      style={{ background:bg, padding:'clamp(5rem,10vw,9rem) 0', position:'relative', overflow:'hidden', ...s }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(1.5rem,5vw,4rem)', position:'relative', zIndex:1 }}>
        {children}
      </div>
    </section>
  );

}

/* ══════════════════════ MARQUEE ═════════════════════════════════════════════ */
const MQ = ['Discord Server Design','Community Management','Bot Configuration','UI/UX Design','Bot Automation','Server Architecture','Community Strategy','Dashboard Design'];
function MarqueeBand() {
  return (
    <div style={{ overflow:'hidden', padding:'1.1rem 0', borderTop:`1px solid ${CR20}`, borderBottom:`1px solid ${CR20}`, background:'#030303' }}>
      <div className="marquee-track">
        {[...MQ,...MQ].map((t,i) => (
          <span key={i} style={{
            display:'inline-flex', alignItems:'center', gap:'1.5rem',
            padding:'0 1.5rem', fontFamily:INTER, fontSize:'.62rem',
            letterSpacing:'.3em', textTransform:'uppercase', whiteSpace:'nowrap',
            color: i%2===0 ? 'rgba(255,255,255,.18)' : CR50,
          }}>
            {t}
            <span style={{ width:3, height:3, borderRadius:'50%', background:CR20, display:'inline-block' }} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════ COUNTER ═════════════════════════════════════════════ */
function Ctr({ to, sfx = '' }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setDone(true); }, { threshold:.2 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!done) return;
    let c = 0; const inc = to/60;
    const t = setInterval(() => { c = Math.min(c+inc,to); setV(Math.floor(c)); if (c>=to) clearInterval(t); }, 30);
    return () => clearInterval(t);
  }, [done, to]);
  return <span ref={ref}>{v}{sfx}</span>;
}

/* ══════════════════════ ABOUT ═══════════════════════════════════════════════ */
const A_STATS = [
  { to:250, sfx:'+', l:'Servers Built' },
  { to:95,  sfx:'%', l:'Client Retention' },
  { to:5,   sfx:'+', l:'Years of Excellence' },
  { to:100, sfx:'%', l:'Passion-Driven' },
];

function About() {
  return (
    <SW id="about" bg="#070707">
      <SH eyebrow="About XOHAN" bg="ABOUT"
        title={<>Community<br /><span style={{ color:CR }}>architect.</span></>}
        sub="Building premium Discord communities and digital interfaces — structured, intentional, and built to scale."
      />

      {/* Stat tiles */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', border:'1px solid rgba(255,255,255,.06)', marginBottom:'5rem' }}>
        {A_STATS.map((s,i) => (
          <Reveal key={s.l} d={i*.08}>
            <div
              onMouseEnter={e => { e.currentTarget.style.background=`rgba(220,20,60,.04)`; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; }}
              style={{ padding:'2.25rem 1.75rem', borderRight:i<A_STATS.length-1?'1px solid rgba(255,255,255,.06)':'none', position:'relative', overflow:'hidden', transition:'background .35s ease' }}>
              <div style={{ position:'absolute', top:0, left:0, width:2, height:'100%', background:`linear-gradient(to bottom,${CR},transparent)`, opacity:.7 }} />
              <div style={{ fontFamily:INTER, fontWeight:800, color:'#fff', fontSize:'clamp(2rem,4vw,3rem)', letterSpacing:'-.03em', lineHeight:1 }}>
                <Ctr to={s.to} sfx={s.sfx} />
              </div>
              <div style={{ fontFamily:INTER, fontSize:'.65rem', color:'rgba(255,255,255,.3)', letterSpacing:'.15em', textTransform:'uppercase', marginTop:'.5rem' }}>{s.l}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Bio + tags */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'4rem', alignItems:'start' }}>
        <Reveal d={.1}>
          <p style={{ fontFamily:INTER, color:'rgba(255,255,255,.55)', lineHeight:1.85, fontSize:'1rem', marginBottom:'1.25rem' }}>
            I'm <strong style={{ color:'#fff' }}>Rowson Khan</strong>, a Discord server designer and UI/UX specialist operating as{' '}
            <strong style={{ color:CR }}>XOHAN</strong>. I design and build premium Discord communities and digital interfaces — focusing on clarity, architecture, and experiences that feel effortless for both members and administrators.
          </p>
          <p style={{ fontFamily:INTER, color:'rgba(255,255,255,.3)', lineHeight:1.85, fontSize:'.9rem', marginBottom:'2rem' }}>
            From competitive gaming hubs to crypto communities, every server I build starts from a deep understanding of the people it serves — then gets structured to scale with them.
          </p>
          {/* Floating availability badge */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'.5rem 1rem', border:`1px solid ${CR20}`, background:`rgba(220,20,60,.04)`, backdropFilter:'blur(8px)', animation:'float 3s ease-in-out infinite' }}>
            <span className="pulse-dot" style={{ width:6, height:6, borderRadius:'50%', background:'#4ade80', flexShrink:0 }} />
            <span style={{ fontFamily:INTER, fontSize:'.65rem', color:'rgba(255,255,255,.5)', letterSpacing:'.1em', textTransform:'uppercase' }}>Available for new projects</span>
          </div>
        </Reveal>
        <Reveal d={.18}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'.6rem' }}>
            {['Discord Server Design','Bot Configuration','Community Management','UI/UX Design','Bot Automation','Server Architecture','Dashboard Design','Figma Systems','Verification Flows','Onboarding Design'].map(t => (
              <span key={t}
                style={{ fontFamily:INTER, fontSize:'.68rem', color:'rgba(255,255,255,.35)', border:'1px solid rgba(255,255,255,.08)', padding:'.35rem .85rem', letterSpacing:'.04em', transition:'all .25s ease', cursor:'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=CR20; e.currentTarget.style.color='rgba(255,255,255,.85)'; e.currentTarget.style.background=CR06; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.08)'; e.currentTarget.style.color='rgba(255,255,255,.35)'; e.currentTarget.style.background='transparent'; }}>
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </SW>
  );
}

/* ══════════════════════ SKILL RADAR ════════════════════════════════════════ */
const RS = [
  { name:'Discord Design', value:95 },
  { name:'Server Dev',     value:92 },
  { name:'Bot Config',     value:90 },
  { name:'Bot Automation', value:87 },
  { name:'UI/UX Design',   value:88 },
  { name:'Community Mgmt', value:85 },
  { name:'Dashboard UI',   value:82 },
  { name:'Strategy',       value:80 },
];
const CX=220, CY=220, RR=155, NN=RS.length;
const ang  = i => (i/NN)*2*Math.PI - Math.PI/2;
const apt  = (i,r) => ({ x:+(CX+r*Math.cos(ang(i))).toFixed(1), y:+(CY+r*Math.sin(ang(i))).toFixed(1) });
const rPts = r => RS.map((_,i)=>{const p=apt(i,r);return `${p.x},${p.y}`;}).join(' ');
const dPts = () => RS.map((s,i)=>{const p=apt(i,(s.value/100)*RR);return `${p.x},${p.y}`;}).join(' ');

function Radar() {
  const [ref, v] = useInView(.18);
  const [hov, setHov] = useState(null);

  const lbl = i => {
    const a=ang(i), r=RR+44;
    const x=+(CX+r*Math.cos(a)).toFixed(1), y=+(CY+r*Math.sin(a)).toFixed(1);
    const ca=Math.cos(a), sa=Math.sin(a);
    return { x, y, anchor:ca>.15?'start':ca<-.15?'end':'middle', dy:sa>.15?'1em':sa<-.15?'-.3em':'.35em' };
  };

  return (
    <div ref={ref}>
      <svg viewBox="-55 -45 550 535" style={{ width:'100%', overflow:'visible' }}>
        {/* Rings */}
        {[1,2,3,4,5].map(k => (
          <polygon key={k} points={rPts((k/5)*RR)} fill="none"
            stroke={k===5 ? 'rgba(255,255,255,.1)' : 'rgba(255,255,255,.04)'}
            strokeWidth={k===5?1:.5}
            style={{ transformOrigin:`${CX}px ${CY}px`, transform:v?'scale(1)':'scale(0)', transition:`transform .8s cubic-bezier(.16,1,.3,1) ${k*.06}s` }}
          />
        ))}
        {/* Axes */}
        {RS.map((_,i)=>{const op=apt(i,RR);return (
          <line key={i} x1={CX} y1={CY} x2={op.x} y2={op.y}
            stroke="rgba(255,255,255,.06)" strokeWidth={1}
            strokeDasharray={RR} strokeDashoffset={v?0:RR}
            style={{ transition:`stroke-dashoffset 1s ease ${i*.05}s` }} />
        );})}
        {/* Data area fill */}
        <polygon points={dPts()} fill={CR06} stroke="none"
          style={{ transformOrigin:`${CX}px ${CY}px`, transform:v?'scale(1)':'scale(0)', transition:'transform 1.2s cubic-bezier(.16,1,.3,1) .4s' }} />
        {/* Data stroke */}
        <polygon points={dPts()} fill="none" stroke={CR} strokeWidth={1.5}
          style={{ transformOrigin:`${CX}px ${CY}px`, transform:v?'scale(1)':'scale(0)', transition:'transform 1.2s cubic-bezier(.16,1,.3,1) .4s', filter:`drop-shadow(0 0 7px ${CR})` }} />
        {/* Nodes */}
        {RS.map((s,i)=>{
          const p=apt(i,(s.value/100)*RR), isH=hov===i;
          return (
            <g key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{ cursor:'pointer' }}>
              <circle cx={p.x} cy={p.y} r={isH?20:0} fill={CR10} style={{ transition:'r .3s ease', opacity:v?1:0 }} />
              <circle cx={p.x} cy={p.y} r={isH?6:4} fill={isH?CR:'#fff'} stroke={CR} strokeWidth={1.5}
                style={{ transformOrigin:`${p.x}px ${p.y}px`, transform:v?'scale(1)':'scale(0)', transition:`transform .5s ease ${.8+i*.07}s, r .3s, fill .3s`, filter:isH?`drop-shadow(0 0 12px ${CR})`:'none' }} />
            </g>
          );
        })}
        {/* Labels */}
        {RS.map((s,i)=>{
          const {x,y,anchor,dy}=lbl(i);
          return (
            <text key={i} x={x} y={y} dy={dy} textAnchor={anchor}
              fill={hov===i?CR:'rgba(255,255,255,.45)'}
              style={{ fontFamily:INTER, fontSize:'10.5px', letterSpacing:'.04em', textTransform:'uppercase', opacity:v?1:0, transition:`opacity .6s ease ${.6+i*.05}s, fill .3s` }}>
              {s.name}
            </text>
          );
        })}
        {/* Glassmorphism tooltip */}
        {hov!==null&&(()=>{
          const s=RS[hov], p=apt(hov,(s.value/100)*RR);
          const W=106, H=50, tx=p.x>CX?p.x-W-14:p.x+14, ty=p.y>CY?p.y-H-10:p.y+10;
          return (
            <g>
              <rect x={tx} y={ty} width={W} height={H} rx={6}
                fill="rgba(6,6,6,.88)" stroke={CR20} strokeWidth={1}
                style={{ filter:'blur(0px)' }} />
              {/* top-left accent */}
              <rect x={tx} y={ty} width={3} height={H} rx={6} fill={CR} opacity={.7} />
              <text x={tx+12} y={ty+18} fill="rgba(255,255,255,.75)"
                style={{ fontFamily:INTER, fontSize:'9.5px', fontWeight:600 }}>{s.name}</text>
              <text x={tx+12} y={ty+36} fill={CR}
                style={{ fontFamily:INTER, fontSize:'15px', fontWeight:800 }}>{s.value}%</text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

/* ══════════════════════ SKILLS SECTION ══════════════════════════════════════ */
const SKILL_LIST = [
  { l:'Discord Server Design',  pct:95, d:'Channel architecture, roles, permissions, embeds & branding' },
  { l:'Discord Server Dev',     pct:92, d:'Full server builds from zero — structured for scale' },
  { l:'Bot Setup & Config',     pct:90, d:'Carl-bot, MEE6, Dyno, Ticket Tool and more' },
  { l:'Bot Automation',         pct:87, d:'Custom automation flows, triggers, and slash commands' },
  { l:'UI/UX Design',           pct:88, d:'Figma — dashboards, landing pages, design systems' },
  { l:'Community Management',   pct:85, d:'Moderation, growth strategy, engagement systems' },
];

function Skills() {
  const [secRef, secV] = useInView(.08);
  return (
    <SW id="skills" bg="#050505">
      <SH eyebrow="Expertise" bg="SKILLS"
        title={<>My skill<br /><span style={{ color:CR }}>arsenal.</span></>}
        sub="A data-driven breakdown of the capabilities I bring to every Discord and design project."
      />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:'5rem', alignItems:'center' }}>
        <Reveal><Radar /></Reveal>
        <div ref={secRef} style={{ display:'flex', flexDirection:'column', gap:'1.75rem' }}>
          {SKILL_LIST.map((sk,i) => (
            <Reveal key={sk.l} d={i*.07}>
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'.5rem' }}>
                  <span style={{ fontFamily:INTER, fontSize:'.82rem', color:'rgba(255,255,255,.8)', fontWeight:500 }}>{sk.l}</span>
                  <span style={{ fontFamily:INTER, fontSize:'.78rem', color:CR, fontWeight:700 }}>{sk.pct}%</span>
                </div>
                <div style={{ height:2, background:'rgba(255,255,255,.06)', position:'relative', overflow:'hidden' }}>
                  <div style={{
                    position:'absolute', inset:'0 auto 0 0',
                    background:`linear-gradient(to right,${CR},${CR50})`,
                    width:`${sk.pct}%`, transformOrigin:'left',
                    transform:secV?'scaleX(1)':'scaleX(0)',
                    transition:`transform 1.2s cubic-bezier(.16,1,.3,1) ${i*.12}s`,
                    boxShadow:secV?`4px 0 12px ${CR20}`:undefined,
                  }} />
                </div>
                <div style={{ fontFamily:INTER, fontSize:'.62rem', color:'rgba(255,255,255,.22)', marginTop:'.3rem', letterSpacing:'.03em' }}>{sk.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SW>
  );
}

/* ══════════════════════ SERVICES ════════════════════════════════════════════ */
const SVCS = [
  {
    num:'01', Icon:Users, title:'Discord Community Management',
    short:'Full ongoing management of your Discord — moderation, engagement, member growth, and community health.',
    deliverables:['Moderation System Setup','Engagement Campaigns','Member Growth Strategy','Conflict Resolution','Health & Activity Reporting'],
    support:'Ongoing / per-package',
  },
  {
    num:'02', Icon:Layers, title:'Discord Server Setup & Development',
    short:'Complete server architecture built from zero — channels, categories, roles, permissions, verification, and branding.',
    deliverables:['Channel & Category Structure','Role Hierarchy & Permissions','Verification & Onboarding Flow','Custom Embeds & Server Branding','Ticket & Support Systems'],
    support:'3–5 days post-delivery',
  },
  {
    num:'03', Icon:Bot, title:'Discord Bot Setup & Configuration',
    short:'Full setup and configuration of popular Discord bots — tailored to your server\'s exact workflow and requirements.',
    deliverables:['Carl-bot / MEE6 / Dyno Setup','Reaction & Button Roles','Auto-Moderation Rules','Leveling & Reward Systems','Logging & Audit Configuration'],
    support:'3 days post-delivery',
  },
  {
    num:'04', Icon:Zap, title:'Discord Bot Automation',
    short:'Custom automation flows, scheduled messages, triggers, and slash commands — making your server run itself.',
    deliverables:['Custom Automation Flows','Scheduled Announcements','Welcome & Leave Messages','Role Trigger Automation','Command Customisation'],
    support:'3 days post-delivery',
  },
  {
    num:'05', Icon:Palette, title:'UI/UX Design',
    short:'Production-ready Figma designs for dashboards, landing pages, and web interfaces — with a full design system included.',
    deliverables:['Landing Page Design','Dashboard & Admin UI','Web Interface Design','Figma Component Library','Design System & Tokens'],
    support:'7 days post-delivery',
  },
];

function SvcCard({ svc, open, onToggle, i }) {
  const [ref, v] = useInView();
  const { Icon } = svc;
  return (
    <div ref={ref}
      onClick={onToggle}
      onMouseMove={e => {
        if (open) return;
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        el.style.setProperty('--shine-x', `${x*100}%`);
      }}
      style={{
        opacity:v?1:0, transform:v?'translateY(0)':'translateY(28px)',
        transition:`opacity .85s ease ${i*.07}s, transform .85s ease ${i*.07}s, border-color .3s, background .3s`,
        border:`1px solid ${open?CR20:'rgba(255,255,255,.07)'}`,
        background:open?`rgba(220,20,60,.04)`:'rgba(255,255,255,.02)',
        cursor:'pointer', position:'relative', overflow:'hidden',
      }}>
      {/* Shimmer line on hover */}
      {!open && <div style={{ position:'absolute', top:0, left:'var(--shine-x,50%)', transform:'translateX(-50%)', width:1, height:'100%', background:`linear-gradient(to bottom,transparent,${CR20},transparent)`, pointerEvents:'none', opacity:.6 }} />}

      {/* Header */}
      <div style={{ padding:'1.75rem 2rem', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1.5rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'1.25rem' }}>
          <div style={{ width:44, height:44, border:`1px solid ${open?CR20:'rgba(255,255,255,.1)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all .3s', background:open?CR06:'transparent' }}>
            <Icon style={{ width:18, height:18, color:open?CR:'rgba(255,255,255,.45)', transition:'color .3s', filter:open?`drop-shadow(0 0 6px ${CR})`:'none' }} />
          </div>
          <div>
            <div style={{ fontFamily:INTER, fontSize:'.58rem', color:open?CR50:'rgba(255,255,255,.15)', letterSpacing:'.12em', marginBottom:'.2rem', transition:'color .3s' }}>{svc.num}</div>
            <h3 style={{ fontFamily:PODIUM, color:open?'#fff':'rgba(255,255,255,.8)', fontSize:'clamp(.95rem,2vw,1.15rem)', textTransform:'uppercase', letterSpacing:'.04em', transition:'color .3s' }}>{svc.title}</h3>
          </div>
        </div>
        <div style={{ width:28, height:28, border:`1px solid ${open?CR20:'rgba(255,255,255,.08)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all .35s', transform:open?'rotate(0deg)':'rotate(0deg)' }}>
          {open?<Minus style={{ width:13,height:13,color:CR }}/>:<Plus style={{ width:13,height:13,color:'rgba(255,255,255,.35)' }}/>}
        </div>
      </div>

      {/* Expandable body */}
      <div style={{ maxHeight:open?'400px':0, overflow:'hidden', transition:'max-height .58s cubic-bezier(.16,1,.3,1)' }}>
        <div style={{ padding:'0 2rem 2rem', borderTop:`1px solid ${CR10}` }}>
          <p style={{ fontFamily:INTER, color:'rgba(255,255,255,.45)', fontSize:'.875rem', lineHeight:1.82, margin:'1.25rem 0 1.5rem' }}>{svc.short}</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))', gap:'.6rem', marginBottom:'1.5rem' }}>
            {svc.deliverables.map(d => (
              <div key={d} style={{ display:'flex', alignItems:'center', gap:'.5rem' }}>
                <CheckCircle2 style={{ width:11,height:11,color:CR,flexShrink:0 }} />
                <span style={{ fontFamily:INTER, fontSize:'.72rem', color:'rgba(255,255,255,.42)', letterSpacing:'.03em' }}>{d}</span>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,.06)' }}>
            <span style={{ fontFamily:INTER, fontSize:'.62rem', color:'rgba(255,255,255,.2)', letterSpacing:'.08em', textTransform:'uppercase' }}>Support: {svc.support}</span>
            <a href="https://www.fiverr.com/rifat_designer9" target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:'.4rem', fontFamily:INTER, fontSize:'.68rem', letterSpacing:'.1em', textTransform:'uppercase', color:CR, textDecoration:'none', transition:'all .2s' }}
              onMouseEnter={e => e.currentTarget.style.textShadow=`0 0 20px ${CR}`}
              onMouseLeave={e => e.currentTarget.style.textShadow='none'}>
              Get quote <ArrowUpRight style={{ width:11,height:11 }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Services() {
  const [open, setOpen] = useState(null);
  return (
    <SW id="services" bg="#080808">
      <SH eyebrow="Services" bg="SERVICES"
        title={<>What I<br /><span style={{ color:CR }}>actually do.</span></>}
        sub="Five core services — all focused on Discord and UI/UX. No fluff, no filler."
      />
      <div style={{ display:'flex', flexDirection:'column', gap:'.75rem' }}>
        {SVCS.map((svc,i) => (
          <SvcCard key={svc.num} svc={svc} i={i} open={open===i} onToggle={()=>setOpen(open===i?null:i)} />
        ))}
      </div>
    </SW>
  );
}

/* ══════════════════════ PORTFOLIO — 3D tilt cards ═══════════════════════════ */
const PROJECTS = [
  {
    id:1, num:'01', title:'Apex Gaming Hub',
    tag:'Discord Server Setup · Gaming',
    desc:'Full server architecture for a competitive gaming community — ranked roles, tournament channels, verification system, and full bot configuration for 10K+ members.',
  },
  {
    id:2, num:'02', title:'CryptoVault Community',
    tag:'Bot Automation · Web3',
    desc:'Multi-layer bot automation system with security protocols, holder verification, tiered access roles, and moderation flows for a Web3 project.',
  },
  {
    id:3, num:'03', title:'Nebula Dashboard',
    tag:'UI/UX Design · SaaS',
    desc:'End-to-end dashboard UI design for a SaaS analytics platform — delivered as a structured Figma file with a full component library and design system.',
  },
  {
    id:4, num:'04', title:'Creator Circle',
    tag:'Server Setup · Community Mgmt',
    desc:'Discord server setup and ongoing community management for a content creator — subscription roles, giveaway bots, engagement systems, and moderation.',
  },
];

function ProjCard({ p, i }) {
  const [hov, setHov] = useState(false);
  const [ref, v] = useInView();
  return (
    <div ref={ref}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={e=>{setHov(false);tiltReset(e);}}
      onMouseMove={tilt}
      style={{
        opacity:v?1:0, transform:v?'translateY(0)':'translateY(36px)',
        transition:`opacity .85s ease ${i*.09}s, transform .85s ease ${i*.09}s`,
        border:`1px solid ${hov?CR20:'rgba(255,255,255,.07)'}`,
        background: hov?`rgba(220,20,60,.03)`:'rgba(255,255,255,.015)',
        overflow:'hidden', willChange:'transform', transformStyle:'preserve-3d',
        boxShadow: hov?`0 24px 60px rgba(0,0,0,.5), 0 0 0 1px ${CR10}`:'none',
      }}>

      {/* ── Image-free header panel ── */}
      <div style={{ position:'relative', padding:'2.25rem 2rem 1.75rem', overflow:'hidden', borderBottom:`1px solid ${hov?CR10:'rgba(255,255,255,.05)'}`, transition:'border-color .35s' }}>
        {/* Animated top accent bar */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(to right,${CR},transparent)`, opacity: hov?1:0.35, transition:'opacity .4s' }} />

        {/* Ghost outlined project number */}
        <div aria-hidden style={{
          position:'absolute', bottom:'-1.5rem', right:'1.5rem',
          fontFamily:PODIUM, fontSize:'7rem', lineHeight:1,
          color:'transparent', WebkitTextStroke:`1px ${hov?CR20:'rgba(255,255,255,.05)'}`,
          userSelect:'none', pointerEvents:'none',
          transition:'color .4s, -webkit-text-stroke-color .4s',
        }}>{p.num}</div>

        {/* Tag pill */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:6, marginBottom:'1.25rem' }}>
          <span style={{ display:'inline-block', width:14, height:1.5, background: hov?CR:'rgba(255,255,255,.2)', transition:'background .3s' }} />
          <span style={{ fontFamily:INTER, fontSize:'.62rem', color: hov?CR50:'rgba(255,255,255,.3)', letterSpacing:'.15em', textTransform:'uppercase', transition:'color .3s' }}>{p.tag}</span>
        </div>

        {/* Title */}
        <h3 style={{ fontFamily:PODIUM, color:'#fff', fontSize:'clamp(1.2rem,2.5vw,1.55rem)', textTransform:'uppercase', letterSpacing:'.04em', lineHeight:1, position:'relative', zIndex:1 }}>{p.title}</h3>
      </div>

      {/* ── Description + CTA ── */}
      <div style={{ padding:'1.5rem 2rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'1rem' }}>
          <p style={{ fontFamily:INTER, fontSize:'.82rem', color:'rgba(255,255,255,.32)', lineHeight:1.75, flex:1 }}>{p.desc}</p>
          <a href="#contact" onClick={e=>{e.preventDefault();go('#contact');}}
            style={{ flexShrink:0, width:36, height:36, border:`1px solid ${hov?CR20:'rgba(255,255,255,.1)'}`, display:'flex', alignItems:'center', justifyContent:'center', color:hov?CR:'rgba(255,255,255,.3)', textDecoration:'none', transition:'all .3s', marginLeft:'1rem', boxShadow:hov?`0 0 20px ${CR10}`:'none' }}>
            <ArrowUpRight style={{ width:14,height:14 }} />
          </a>
        </div>
      </div>
    </div>
  );
}

function Portfolio() {
  return (
    <SW id="portfolio" bg="#070707">
      <SH eyebrow="Featured Work" bg="WORK"
        title={<>Selected<br /><span style={{ color:CR }}>projects.</span></>}
        sub="Discord servers, bot systems, and UI/UX designs — built to the highest standard."
      />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:'1.25rem' }}>
        {PROJECTS.map((p,i) => <ProjCard key={p.id} p={p} i={i} />)}
      </div>
    </SW>
  );
}

/* ══════════════════════ PROCESS ════════════════════════════════════════════ */
const PROC = [
  { n:'01', t:'Discovery', d:'Understanding your community — its purpose, audience, size, and goals before any planning begins.', Icon:Eye },
  { n:'02', t:'Architecture', d:'Mapping out every channel, role, permission level, and bot — structured so the server scales cleanly with your community.', Icon:Target },
  { n:'03', t:'Design & Build', d:'Building the full server or interface. Every detail — from embed colour to button labels — is considered and intentional.', Icon:Pen },
  { n:'04', t:'Configuration', d:'Bots, automation flows, triggers, and moderation rules — all tested and configured to your exact requirements.', Icon:Code },
  { n:'05', t:'Handoff & Support', d:'Full delivery with documentation, walkthrough, and post-delivery support so you can manage everything confidently.', Icon:Rocket },
];

function Process() {
  return (
    <SW id="process" bg="#050505">
      <SH eyebrow="How I Work" bg="PROCESS"
        title={<>The<br /><span style={{ color:CR }}>process.</span></>}
        sub="Every project follows a proven framework — from first conversation to final delivery."
      />
      <div style={{ display:'flex', flexDirection:'column' }}>
        {PROC.map((s,i) => (
          <Reveal key={s.n} d={i*.1}>
            <div
              onMouseEnter={e => { e.currentTarget.style.background='rgba(220,20,60,.025)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; }}
              style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:'0 2.5rem', paddingBottom:i<PROC.length-1?'3.5rem':0, paddingTop:'.25rem', paddingLeft:'1rem', paddingRight:'1rem', transition:'background .35s', borderRadius:4 }}>
              {/* Step indicator */}
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                <div style={{ width:52, height:52, border:`1px solid ${CR20}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, background:`rgba(220,20,60,.04)`, position:'relative', zIndex:1 }}>
                  <span style={{ fontFamily:PODIUM, color:CR, fontSize:'1rem', letterSpacing:'.05em' }}>{s.n}</span>
                </div>
                {i<PROC.length-1 && <div style={{ width:1, flex:1, background:`linear-gradient(to bottom,${CR20},transparent)`, marginTop:'.5rem' }} />}
              </div>
              {/* Content */}
              <div style={{ paddingTop:'.7rem' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'.75rem', marginBottom:'.75rem' }}>
                  <s.Icon style={{ width:15,height:15,color:'rgba(255,255,255,.3)',flexShrink:0 }} />
                  <h3 style={{ fontFamily:PODIUM, color:'#fff', fontSize:'clamp(1.1rem,2.2vw,1.45rem)', textTransform:'uppercase', letterSpacing:'.04em' }}>{s.t}</h3>
                </div>
                <p style={{ fontFamily:INTER, color:'rgba(255,255,255,.45)', fontSize:'.9rem', lineHeight:1.82, maxWidth:'560px' }}>{s.d}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SW>
  );
}

/* ══════════════════════ TESTIMONIALS ════════════════════════════════════════ */
const TESTI = [
  { text:"XOHAN rebuilt our Discord from the ground up. Every channel, role, and bot configuration is exactly right. Members immediately noticed how clean and professional it felt. No notes.", name:'Alex_Raven', role:'Gaming Community Owner', detail:'10K+ Members', initials:'AR' },
  { text:"Automation flows are flawless. Holder verification, tiered roles, and every bot configured with zero issues. Precise, fast, and professional — exactly what a Web3 project needs.", name:'CryptoVault_CEO', role:'Web3 Project Founder', detail:'DeFi Community', initials:'CV' },
  { text:"Dashboard design came out cleaner and more functional than I imagined. Figma files were properly structured with a real component system. Would work with XOHAN again without hesitation.", name:'SaaSFounder_X', role:'UI/UX Design Client', detail:'SaaS Startup', initials:'SF' },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  const prev = () => setActive(a=>(a-1+TESTI.length)%TESTI.length);
  const next = () => setActive(a=>(a+1)%TESTI.length);
  const t = TESTI[active];
  const others = TESTI.filter((_,i)=>i!==active);

  return (
    <SW id="testimonials" bg="#060606">
      <SH eyebrow="Client Voice" bg="WORDS"
        title={<>What clients<br /><span style={{ color:CR }}>actually say.</span></>}
      />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1.5rem', alignItems:'start' }}>
        {/* Featured */}
        <Reveal d={.08}>
          <div
            style={{ border:`1px solid ${CR20}`, padding:'clamp(2rem,4vw,3rem)', position:'relative', overflow:'hidden', backdropFilter:'blur(4px)', background:'rgba(8,8,8,.6)' }}>
            {/* Decorative quote */}
            <div aria-hidden style={{ position:'absolute', top:'-2rem', left:'-1rem', fontFamily:PODIUM, fontSize:'12rem', color:'transparent', WebkitTextStroke:`1px ${CR10}`, lineHeight:1, userSelect:'none', pointerEvents:'none', zIndex:0 }}>"</div>
            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ display:'flex', gap:3, marginBottom:'2rem' }}>
                {[...Array(5)].map((_,i)=><Star key={i} style={{ width:12,height:12,fill:'#fff',color:'#fff',opacity:.75 }} />)}
              </div>
              <div key={active} style={{ fontFamily:PODIUM, color:'rgba(255,255,255,.88)', fontSize:'clamp(1.05rem,2vw,1.3rem)', lineHeight:1.52, letterSpacing:'.01em', marginBottom:'2.25rem', animation:'fade-in .45s ease forwards' }}>
                "{t.text}"
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'2.25rem' }}>
                <div style={{ width:44, height:44, border:`1px solid ${CR20}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:INTER, fontSize:'.72rem', fontWeight:700, color:CR, flexShrink:0, background:CR06 }}>{t.initials}</div>
                <div>
                  <div style={{ fontFamily:INTER, fontWeight:600, color:'#fff', fontSize:'.92rem' }}>{t.name}</div>
                  <div style={{ fontFamily:INTER, fontSize:'.7rem', color:'rgba(255,255,255,.3)', marginTop:2 }}>{t.role} · {t.detail}</div>
                </div>
              </div>
              {/* Nav controls */}
              <div style={{ display:'flex', gap:'.75rem', alignItems:'center' }}>
                {[prev,next].map((fn,k)=>(
                  <button key={k} onClick={fn}
                    onMouseMove={mag} onMouseLeave={magReset}
                    style={{ width:36,height:36,border:`1px solid ${CR20}`,background:'transparent',color:'rgba(255,255,255,.4)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'border-color .2s,color .2s,box-shadow .2s' }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=CR;e.currentTarget.style.color=CR;e.currentTarget.style.boxShadow=`0 0 20px ${CR10}`;}}
                    onFocus={e=>{e.currentTarget.style.borderColor=CR;e.currentTarget.style.color=CR;}}
                    onBlur={e=>{e.currentTarget.style.borderColor=CR20;e.currentTarget.style.color='rgba(255,255,255,.4)';}}>
                    {k===0?<ChevronLeft style={{ width:15,height:15 }}/>:<ChevronRight style={{ width:15,height:15 }}/>}
                  </button>
                ))}
                <span style={{ fontFamily:INTER, fontSize:'.68rem', color:'rgba(255,255,255,.2)', marginLeft:'.25rem' }}>
                  {String(active+1).padStart(2,'0')} / {String(TESTI.length).padStart(2,'0')}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Mini cards */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }}>
          {others.map((tt,k)=>(
            <Reveal key={tt.name} d={.14+k*.08}>
              <div onClick={()=>setActive(TESTI.indexOf(tt))}
                onMouseMove={tilt} onMouseLeave={tiltReset}
                style={{ border:'1px solid rgba(255,255,255,.07)', padding:'1.75rem', cursor:'pointer', background:'rgba(255,255,255,.015)', transition:'border-color .3s, box-shadow .3s', willChange:'transform', backdropFilter:'blur(4px)' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=CR20;e.currentTarget.style.boxShadow=`0 8px 40px rgba(0,0,0,.4),0 0 0 1px ${CR10}`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.07)';e.currentTarget.style.boxShadow='none';tiltReset(e);}}>
                <div style={{ display:'flex', gap:3, marginBottom:'1rem' }}>
                  {[...Array(5)].map((_,i)=><Star key={i} style={{ width:10,height:10,fill:'#fff',color:'#fff',opacity:.45 }} />)}
                </div>
                <p style={{ fontFamily:INTER, color:'rgba(255,255,255,.38)', fontSize:'.82rem', lineHeight:1.72, marginBottom:'1.25rem' }}>"{tt.text.slice(0,100)}…"</p>
                <div style={{ display:'flex', alignItems:'center', gap:'.75rem' }}>
                  <div style={{ width:32,height:32,border:'1px solid rgba(255,255,255,.12)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:INTER,fontSize:'.65rem',fontWeight:700,color:'rgba(255,255,255,.5)' }}>{tt.initials}</div>
                  <div style={{ fontFamily:INTER, fontSize:'.7rem', color:'rgba(255,255,255,.38)' }}>{tt.name} · {tt.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SW>
  );
}

/* ══════════════════════ FAQ ═════════════════════════════════════════════════ */
const FAQS = [
  { q:'What Discord services do you offer?', a:'I offer five core services: Discord Community Management, Discord Server Setup & Development, Discord Bot Setup & Configuration, Discord Bot Automation, and UI/UX Design. Everything listed on this site is something I genuinely specialise in.' },
  { q:'How long does a Discord server setup take?', a:'A standard server setup takes 3–5 business days. More complex projects with extensive role hierarchies, multiple bot integrations, or custom automation flows may take up to 7–10 days. Timeline is always confirmed upfront.' },
  { q:'Do you offer ongoing community management?', a:'Yes. Community management is offered as an ongoing engagement — either as a standalone service or bundled with a server setup. Scope, schedule, and deliverables are agreed before we start.' },
  { q:'Which bots do you work with?', a:'I regularly configure Carl-bot, MEE6, Dyno, Ticket Tool, YAGPDB, and several others. If your required bot isn\'t listed, reach out — I\'m likely familiar with it or can learn it quickly.' },
  { q:'What platforms do you design UI/UX for?', a:'Primarily web — dashboards, landing pages, admin panels, and SaaS interfaces. All delivered as structured Figma files with components and a design system. I don\'t build frontend code as part of this service.' },
  { q:'Do you work with new communities or existing ones?', a:'Both. I can build a server from zero or audit and restructure an existing one. For existing servers I\'ll do a full review first and share findings before we agree on scope.' },
];

function FAQItem({ faq, open, onToggle, i }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{ opacity:v?1:0, transform:v?'none':'translateY(20px)', transition:`opacity .8s ease ${i*.06}s, transform .8s ease ${i*.06}s`, borderBottom:'1px solid rgba(255,255,255,.06)' }}>
      <button onClick={onToggle}
        style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1.5rem 0', background:'none', border:'none', cursor:'pointer', textAlign:'left' }}
        onMouseEnter={e=>e.currentTarget.querySelector('.faq-q').style.color='#fff'}
        onMouseLeave={e=>e.currentTarget.querySelector('.faq-q').style.color=open?'#fff':'rgba(255,255,255,.72)'}>
        <span className="faq-q" style={{ fontFamily:INTER, fontSize:'clamp(.9rem,1.8vw,1.05rem)', color:open?'#fff':'rgba(255,255,255,.72)', fontWeight:500, letterSpacing:'-.01em', transition:'color .25s', paddingRight:'2rem' }}>
          {faq.q}
        </span>
        <div style={{ width:28, height:28, border:`1px solid ${open?CR20:'rgba(255,255,255,.08)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all .3s', background:open?CR06:'transparent' }}>
          {open?<Minus style={{ width:12,height:12,color:CR }}/>:<Plus style={{ width:12,height:12,color:'rgba(255,255,255,.3)' }}/>}
        </div>
      </button>
      <div style={{ maxHeight:open?'280px':0, overflow:'hidden', transition:'max-height .52s cubic-bezier(.16,1,.3,1)' }}>
        <p style={{ fontFamily:INTER, color:'rgba(255,255,255,.42)', fontSize:'.9rem', lineHeight:1.82, paddingBottom:'1.5rem', maxWidth:720 }}>{faq.a}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <SW id="faq" bg="#070707">
      <SH eyebrow="FAQ" bg="FAQ"
        title={<>Common<br /><span style={{ color:CR }}>questions.</span></>}
        sub="Everything you need to know before we start working together."
      />
      <div style={{ maxWidth:800 }}>
        {FAQS.map((f,i)=>(
          <FAQItem key={f.q} faq={f} i={i} open={open===i} onToggle={()=>setOpen(open===i?null:i)} />
        ))}
      </div>
    </SW>
  );
}

/* ══════════════════════ CONTACT ═════════════════════════════════════════════ */
function CpField({ label, value, href }) {
  const [cp, setCp] = useState(false);
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.25rem 0', borderBottom:'1px solid rgba(255,255,255,.06)' }}>
      <div>
        <div style={{ fontFamily:INTER, fontSize:'.58rem', color:'rgba(255,255,255,.2)', textTransform:'uppercase', letterSpacing:'.15em', marginBottom:'.3rem' }}>{label}</div>
        {href
          ? <a href={href} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:INTER, fontSize:'.9rem', color:'rgba(255,255,255,.62)', textDecoration:'none', display:'inline-flex', alignItems:'center', gap:4, transition:'color .2s' }}
              onMouseEnter={e=>e.currentTarget.style.color='#fff'}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,.62)'}>
              {value} <ArrowUpRight style={{ width:11,height:11,opacity:.5 }}/>
            </a>
          : <span style={{ fontFamily:INTER, fontSize:'.9rem', color:'rgba(255,255,255,.62)' }}>{value}</span>
        }
      </div>
      <button
        onMouseMove={mag} onMouseLeave={e=>{magReset(e);}}
        onClick={()=>{navigator.clipboard.writeText(value);setCp(true);setTimeout(()=>setCp(false),2000);}}
        style={{ width:32, height:32, border:`1px solid ${cp?CR20:'rgba(255,255,255,.08)'}`, background:cp?CR06:'transparent', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'all .25s' }}>
        {cp?<Check style={{ width:11,height:11,color:CR }}/>:<Copy style={{ width:11,height:11,color:'rgba(255,255,255,.3)' }}/>}
      </button>
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [sent, setSent] = useState(false);
  const submit = e => { e.preventDefault(); setSent(true); setTimeout(()=>setSent(false),3000); };

  return (
    <SW id="contact" bg="#050505">
      <SH eyebrow="Get in Touch" bg="CONTACT"
        title={<>Let's build<br /><span style={{ color:CR }}>something real.</span></>}
        sub="Have a project in mind? I'd love to hear about it."
      />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'5rem', alignItems:'start' }}>
        {/* Left */}
        <Reveal d={.05}>
          <CpField label="Email" value="rtiafnahta123@gmail.com" href="mailto:rtiafnahta123@gmail.com" />
          <CpField label="Fiverr" value="fiverr.com/rifat_designer9" href="https://www.fiverr.com/rifat_designer9" />
          <CpField label="LinkedIn" value="rowson-khan-80240b373" href="https://www.linkedin.com/in/rowson-khan-80240b373/" />
          <CpField label="Discord" value="xohanisdead" />
          <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:'1.75rem' }}>
            <span className="pulse-dot" style={{ width:6, height:6, borderRadius:'50%', background:'#4ade80', flexShrink:0 }} />
            <span style={{ fontFamily:INTER, fontSize:'.68rem', color:'rgba(255,255,255,.25)', letterSpacing:'.08em' }}>Currently available for new projects</span>
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal d={.12}>
          <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }}>
            {[{k:'name',l:'Name',t:'text',ph:'Your name'},{k:'email',l:'Email',t:'email',ph:'your@email.com'}].map(f=>(
              <div key={f.k}>
                <label style={{ display:'block', fontFamily:INTER, fontSize:'.58rem', color:'rgba(255,255,255,.25)', textTransform:'uppercase', letterSpacing:'.15em', marginBottom:'.5rem' }}>{f.l}</label>
                <input type={f.t} placeholder={f.ph} required value={form[f.k]}
                  onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}
                  style={{ width:'100%', padding:'.9rem 1rem', background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.08)', color:'#fff', fontFamily:INTER, fontSize:'.875rem', outline:'none', transition:'border-color .2s, box-shadow .2s', boxSizing:'border-box' }}
                  onFocus={e=>{e.target.style.borderColor=CR20;e.target.style.boxShadow=`0 0 0 1px ${CR10}`;}}
                  onBlur={e=>{e.target.style.borderColor='rgba(255,255,255,.08)';e.target.style.boxShadow='none';}}
                />
              </div>
            ))}
            <div>
              <label style={{ display:'block', fontFamily:INTER, fontSize:'.58rem', color:'rgba(255,255,255,.25)', textTransform:'uppercase', letterSpacing:'.15em', marginBottom:'.5rem' }}>Project Details</label>
              <textarea rows={5} placeholder="Tell me about your project..." required value={form.message}
                onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                style={{ width:'100%', padding:'.9rem 1rem', background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.08)', color:'#fff', fontFamily:INTER, fontSize:'.875rem', outline:'none', resize:'none', lineHeight:1.72, transition:'border-color .2s, box-shadow .2s', boxSizing:'border-box' }}
                onFocus={e=>{e.target.style.borderColor=CR20;e.target.style.boxShadow=`0 0 0 1px ${CR10}`;}}
                onBlur={e=>{e.target.style.borderColor='rgba(255,255,255,.08)';e.target.style.boxShadow='none';}}
              />
            </div>
            <button type="submit"
              onMouseMove={mag} onMouseLeave={magReset}
              style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'1rem 2rem', background:CR, color:'#fff', fontFamily:INTER, fontSize:'.7rem', letterSpacing:'.2em', textTransform:'uppercase', fontWeight:700, border:'none', cursor:'pointer', transition:'all .25s', boxShadow:`0 0 30px ${CR20}` }}
              onMouseEnter={e=>{e.currentTarget.style.background='#b80f30';e.currentTarget.style.boxShadow=`0 0 60px ${CR}55, 0 8px 30px rgba(0,0,0,.4)`;}}
              onMouseLeave={e=>{magReset(e);e.currentTarget.style.background=CR;e.currentTarget.style.boxShadow=`0 0 30px ${CR20}`;}}>
              {sent?'Message Sent ✓':(<><Send style={{ width:14,height:14 }}/>Send Message</>)}
            </button>
          </form>
        </Reveal>
      </div>
    </SW>
  );
}

/* ══════════════════════ FOOTER ══════════════════════════════════════════════ */
function Footer() {
  const yr = new Date().getFullYear();
  return (
    <footer style={{ background:'#030303', borderTop:`1px solid ${CR20}`, padding:'3.5rem 0', position:'relative', overflow:'hidden' }}>
      <div aria-hidden style={{ position:'absolute', bottom:'-2.5rem', left:'50%', transform:'translateX(-50%)', fontFamily:PODIUM, fontSize:'clamp(7rem,20vw,16rem)', color:'transparent', WebkitTextStroke:`1.5px ${CR10}`, textTransform:'uppercase', lineHeight:1, userSelect:'none', pointerEvents:'none', whiteSpace:'nowrap' }}>
        {BRAND}
      </div>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(1.5rem,5vw,4rem)', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:'1rem', position:'relative', zIndex:1 }}>
        <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
          onMouseMove={mag} onMouseLeave={magReset}
          style={{ fontFamily:PODIUM, color:'#fff', fontSize:'1.1rem', letterSpacing:'.15em', textTransform:'uppercase', background:'none', border:'none', cursor:'pointer', transition:'color .2s' }}
          onMouseEnter={e=>e.currentTarget.style.color=CR}
          onBlur={e=>e.currentTarget.style.color='#fff'}>
          {BRAND}
        </button>
        <nav style={{ display:'flex', flexWrap:'wrap', gap:'1.5rem' }}>
          {[['About','#about'],['Skills','#skills'],['Services','#services'],['Work','#portfolio'],['Process','#process'],['FAQ','#faq'],['Contact','#contact']].map(([l,h])=>(
            <button key={l} onClick={()=>go(h)}
              style={{ fontFamily:INTER, fontSize:'.62rem', color:'rgba(255,255,255,.2)', textTransform:'uppercase', letterSpacing:'.15em', background:'none', border:'none', cursor:'pointer', transition:'color .2s' }}
              onMouseEnter={e=>e.currentTarget.style.color=CR}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,.2)'}>{l}</button>
          ))}
        </nav>
        <span style={{ fontFamily:INTER, fontSize:'.62rem', color:'rgba(255,255,255,.15)' }}>© {yr} Rowson Khan</span>
      </div>
    </footer>
  );
}

/* ══════════════════════ HERO DATA ══════════════════════════════════════════ */
const HERO_STATS = [
  { value:'250+', label:'Projects Completed' },
  { value:'5+',   label:'Years of Experience' },
  { value:'100%', label:'Quality Commitment'  },
];

/* ══════════════════════════════════════════════════════════════════════════════
   ROOT APP — Hero block is preserved EXACTLY. Do NOT modify.
═══════════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior:'smooth' });

  return (
    <div style={{ background:'#000', color:'#fff', overflowX:'hidden' }}>

      {/* ══════════ HERO (fullscreen, sticky navbar) ══════════ */}
      <div className="relative w-full bg-black hero-full" style={{ overflow:'hidden', position:'relative' }}>

        <video
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
          autoPlay muted loop playsInline
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.85) 100%)' }} />

        <div className="relative z-10 flex flex-col hero-full">

          {/* ─── Navbar ─── */}
          <nav style={{ display:'flex', alignItems:'center', padding:'clamp(1.25rem, 3vw, 1.75rem) clamp(1.5rem, 5vw, 4rem)', gap:0 }}>

            {/* ── Left column: Brand logo ── */}
            <div style={{ flex:1, display:'flex', alignItems:'center' }}>
              <span style={{ fontFamily:PODIUM, color:'#fff', fontWeight:700, fontSize:'clamp(1.3rem, 2.5vw, 1.75rem)', letterSpacing:'0.15em', textTransform:'uppercase', userSelect:'none' }}>
                {BRAND}
              </span>
            </div>

            {/* ── Center column: Nav links (desktop only) ── */}
            <ul className="hidden md:flex" style={{ listStyle:'none', alignItems:'center', gap:'2.25rem', margin:0, padding:0, flexShrink:0 }}>
              {NAV_LINKS.map(({ label, id }) => (
                <li key={id} style={{ listStyle:'none' }}>
                  <button onClick={()=>scrollTo('#'+id)}
                    style={{ fontFamily:INTER, fontSize:'0.72rem', color:'rgba(255,255,255,0.62)', letterSpacing:'0.18em', textTransform:'uppercase', background:'none', border:'none', cursor:'pointer', transition:'color 0.25s', padding:'0.25rem 0' }}
                    onMouseEnter={e=>e.currentTarget.style.color='#fff'}
                    onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.62)'}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>

            {/* ── Right column: CTA (desktop) + Hamburger (mobile) ── */}
            <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'flex-end' }}>
              <a href="#contact" onClick={e=>{e.preventDefault();scrollTo('#contact');}}
                className="hidden md:inline-flex"
                style={{ alignItems:'center', gap:'7px', border:'1px solid rgba(255,255,255,0.22)', padding:'0.65rem 1.35rem', fontFamily:INTER, fontSize:'0.65rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.8)', textDecoration:'none', transition:'border-color 0.3s, background 0.3s, color 0.3s', lineHeight:1, flexShrink:0 }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.55)';e.currentTarget.style.background='rgba(255,255,255,0.06)';e.currentTarget.style.color='#fff';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.22)';e.currentTarget.style.background='transparent';e.currentTarget.style.color='rgba(255,255,255,0.8)';}}
                onMouseMove={mag}
                onBlur={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.22)';e.currentTarget.style.background='transparent';magReset(e);}}>  
                GET IN TOUCH <ArrowUpRight style={{ width:11,height:11 }} />
              </a>
              <div className="md:hidden">
                <button onClick={()=>setMenuOpen(true)} aria-label="Open menu"
                  style={{ display:'flex', flexDirection:'column', gap:'5px', background:'none', border:'none', cursor:'pointer', padding:'6px' }}>
                  <span style={{ display:'block', width:22, height:1.5, background:'#fff' }} />
                  <span style={{ display:'block', width:22, height:1.5, background:'#fff' }} />
                  <span style={{ display:'block', width:14, height:1.5, background:'#fff' }} />
                </button>
              </div>
            </div>

          </nav>


          {/* ─── Hero content ─── */}
          <div style={{ flex:1, display:'flex', alignItems:'flex-start', padding:'0 clamp(1.5rem, 5vw, 4rem)', paddingTop:'clamp(2rem, 6vw, 4rem)', paddingBottom:'clamp(3rem, 8vw, 5rem)' }}>
            <div style={{ maxWidth:'1280px', width:'100%' }}>
              <div className="animate-fade-up" style={{ display:'flex', alignItems:'center', gap:'0.625rem', marginBottom:'clamp(1.25rem, 3vw, 2rem)' }}>
                <Crown style={{ width:14, height:14, color:'rgba(255,255,255,0.5)', flexShrink:0 }} />
                <span style={{ fontFamily:INTER, color:'rgba(255,255,255,0.5)', fontSize:'clamp(0.62rem, 1.1vw, 0.75rem)', letterSpacing:'0.32em', textTransform:'uppercase' }}>
                  Precision &middot; Craft &middot; Excellence
                </span>
              </div>
              <div className="animate-fade-up-delay-1" style={{ fontFamily:PODIUM, color:'#fff', textTransform:'uppercase', lineHeight:0.92, letterSpacing:'-0.01em' }}>
                <div style={{ fontSize:'clamp(2.8rem, 8vw, 7rem)' }}>Build.</div>
                <div style={{ fontSize:'clamp(2.8rem, 8vw, 7rem)' }}>Refine.</div>
                <div style={{ fontSize:'clamp(2.8rem, 8vw, 7rem)' }}>Deliver.</div>
              </div>
              <p className="animate-fade-up-delay-2"
                style={{ fontFamily:INTER, color:'rgba(255,255,255,0.58)', fontSize:'clamp(0.8rem, 1.5vw, 1rem)', lineHeight:1.8, maxWidth:'420px', marginTop:'clamp(1.25rem, 3vw, 2rem)' }}>
                Every project I take on is a commitment to quality —{' '}
                <strong style={{ color:'rgba(255,255,255,0.88)', fontWeight:600 }}>built with precision,</strong>{' '}
                refined with care, and delivered to a standard that lasts.
              </p>
              <div className="animate-fade-up-delay-3" style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:'clamp(1rem, 2vw, 1.5rem)', marginTop:'clamp(1.5rem, 3vw, 2.5rem)' }}>
                <a href="#portfolio" onClick={e=>{e.preventDefault();scrollTo('#portfolio');}}
                  onMouseMove={mag} onMouseLeave={e=>{magReset(e);e.currentTarget.style.background='#fff';e.currentTarget.style.boxShadow='none';}}
                  style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#fff', color:'#000', padding:'clamp(0.75rem, 1.5vw, 1rem) clamp(1.25rem, 3vw, 1.75rem)', fontFamily:INTER, fontSize:'clamp(0.6rem, 1vw, 0.72rem)', letterSpacing:'0.2em', textTransform:'uppercase', fontWeight:700, textDecoration:'none', transition:'background 0.25s, box-shadow 0.25s, transform 0.4s' }}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,0.92)';e.currentTarget.style.boxShadow='0 8px 30px rgba(255,255,255,0.15)';}}
                  >
                  VIEW MY WORK <ArrowUpRight style={{ width:13,height:13 }} />
                </a>

                {/* ── Hire Me on Fiverr ── */}
                <a
                  href="https://www.fiverr.com/rifat_designer9"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseMove={mag}
                  onMouseLeave={e=>{magReset(e);e.currentTarget.style.background='#1DBF73';e.currentTarget.style.boxShadow='0 0 24px rgba(29,191,115,0.35)';}}
                  onMouseEnter={e=>{e.currentTarget.style.background='#17a863';e.currentTarget.style.boxShadow='0 8px 32px rgba(29,191,115,0.55)';}}
                  style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#1DBF73', color:'#fff', padding:'clamp(0.75rem, 1.5vw, 1rem) clamp(1.25rem, 3vw, 1.75rem)', fontFamily:INTER, fontSize:'clamp(0.6rem, 1vw, 0.72rem)', letterSpacing:'0.2em', textTransform:'uppercase', fontWeight:700, textDecoration:'none', transition:'background 0.25s, box-shadow 0.25s, transform 0.4s', boxShadow:'0 0 24px rgba(29,191,115,0.35)' }}
                >
                  HIRE ME <ArrowUpRight style={{ width:13,height:13 }} />
                </a>

                <div className="hidden sm:flex" style={{ alignItems:'center', gap:'0.75rem' }}>
                  <Award style={{ width:28, height:28, color:'rgba(255,255,255,0.35)' }} />
                  <div style={{ fontFamily:INTER, fontSize:'0.62rem', color:'rgba(255,255,255,0.45)', letterSpacing:'0.1em', textTransform:'uppercase', lineHeight:1.65 }}>
                    <div>Quality&#x2011;First</div><div>Professional</div>
                  </div>
                </div>
              </div>

              <div className="animate-fade-up-delay-4" style={{ display:'flex', flexWrap:'wrap', gap:'clamp(1.25rem, 4vw, 4rem)', marginTop:'clamp(2rem, 4vw, 3.5rem)' }}>
                {HERO_STATS.map(({ value, label }) => (
                  <div key={label}>
                    <div style={{ fontFamily:INTER, color:'#fff', fontSize:'clamp(1.5rem, 4vw, 3.2rem)', fontWeight:700, letterSpacing:'-0.02em' }}>{value}</div>
                    <div style={{ fontFamily:INTER, color:'rgba(255,255,255,0.4)', fontSize:'clamp(0.55rem, 0.9vw, 0.7rem)', letterSpacing:'0.2em', textTransform:'uppercase', marginTop:'0.25rem' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Mobile menu ─── */}
        <div style={{ position:'fixed', inset:0, zIndex:50, background:'rgba(0,0,0,0.97)', backdropFilter:'blur(4px)', opacity:menuOpen?1:0, visibility:menuOpen?'visible':'hidden', transition:'opacity 0.5s, visibility 0.5s' }}>
          <div style={{ display:'flex', flexDirection:'column', height:'100%', padding:'clamp(1.25rem, 3vw, 1.75rem) clamp(1.5rem, 5vw, 2.5rem)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontFamily:PODIUM, color:'#fff', fontWeight:700, fontSize:'clamp(1.3rem, 2.5vw, 1.75rem)', letterSpacing:'0.15em', textTransform:'uppercase' }}>{BRAND}</span>
              <button onClick={()=>setMenuOpen(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.6)', padding:'4px' }} aria-label="Close menu">
                <X style={{ width:24, height:24 }} />
              </button>
            </div>
            <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', gap:'1.5rem' }}>
              {NAV_LINKS.map(({ label, id }, i) => (
                <button key={id}
                  onClick={()=>{setMenuOpen(false);scrollTo('#'+id);}}
                  style={{ fontFamily:PODIUM, color:'#fff', fontSize:'clamp(2rem, 7vw, 3.5rem)', textTransform:'uppercase', letterSpacing:'0.04em', background:'none', border:'none', cursor:'pointer', textAlign:'left', opacity:menuOpen?1:0, transform:menuOpen?'translateY(0)':'translateY(20px)', transition:`opacity 0.4s ease ${i*80+100}ms, transform 0.4s ease ${i*80+100}ms` }}>
                  {label}
                </button>
              ))}
              <a href="#contact" onClick={e=>{e.preventDefault();setMenuOpen(false);scrollTo('#contact');}}
                style={{ display:'inline-flex', alignItems:'center', gap:'8px', marginTop:'1rem', border:`1px solid ${CR20}`, padding:'0.75rem 1.5rem', width:'fit-content', fontFamily:INTER, fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'#fff', textDecoration:'none', background:CR06, opacity:menuOpen?1:0, transform:menuOpen?'translateY(0)':'translateY(20px)', transition:`opacity 0.4s ease ${NAV_LINKS.length*80+100}ms, transform 0.4s ease ${NAV_LINKS.length*80+100}ms` }}>
                GET IN TOUCH <ArrowUpRight style={{ width:13,height:13 }} />
              </a>
            </div>
          </div>
        </div>

      </div>{/* /hero */}

      {/* ══════════ BELOW-HERO SECTIONS ══════════ */}
      <MarqueeBand />
      <About />
      <Skills />
      <Services />
      <Portfolio />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />

    </div>
  );
}