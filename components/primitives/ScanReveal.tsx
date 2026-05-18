'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  trigger?: 'mount' | 'view';
  className?: string;
};

/**
 * The signature motion of NEXUS//13.
 * Reveals content with a horizontal scan-in (clip-path), like a CRT syncing.
 * Used everywhere a panel or row appears.
 */
export function ScanReveal({
  children,
  delay = 0,
  duration = 800,
  trigger = 'mount',
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(trigger === 'mount');

  useEffect(() => {
    if (trigger === 'mount') return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        clipPath: active ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
        opacity: active ? 1 : 0.4,
        transition: `clip-path ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'clip-path, opacity',
      }}
    >
      {children}
    </div>
  );
}
