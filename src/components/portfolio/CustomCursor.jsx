import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const trail = useRef({ x: -100, y: -100 });
  const raf = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Disable on touch devices
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  useEffect(() => {
    if (isTouch) return;
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', move, { passive: true });

    const loop = () => {
      const lerpFactor = 0.12;
      trail.current.x += (pos.current.x - trail.current.x) * lerpFactor;
      trail.current.y += (pos.current.y - trail.current.y) * lerpFactor;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${trail.current.x - 20}px, ${trail.current.y - 20}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    const onEnter = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHovered(true);
    };
    const onLeave = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHovered(false);
    };
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf.current);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Trailing ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-none"
        style={{
          width: hovered ? '48px' : '40px',
          height: hovered ? '48px' : '40px',
          borderRadius: '50%',
          border: `1px solid rgba(59,130,246,${hovered ? '0.7' : '0.4'})`,
          boxShadow: hovered ? '0 0 16px rgba(59,130,246,0.35), inset 0 0 8px rgba(59,130,246,0.1)' : '0 0 8px rgba(59,130,246,0.2)',
          background: hovered ? 'rgba(59,130,246,0.06)' : 'transparent',
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
          willChange: 'transform',
          marginLeft: hovered ? '-4px' : '0',
          marginTop: hovered ? '-4px' : '0',
        }}
      />
      {/* Sharp center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#3B82F6',
          boxShadow: '0 0 8px #3B82F6, 0 0 4px rgba(6,182,212,0.5)',
          transition: 'opacity 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  );
}