'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  trigger?: 'mount' | 'view';
  className?: string;
};

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

    // Activate immediately if element is already fully in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      // threshold 0 = fires as soon as any pixel enters viewport
      // rootMargin pre-triggers 80px before element enters bottom of screen
      { threshold: 0, rootMargin: '0px 0px 80px 0px' },
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
        opacity: active ? 1 : 0,
        transition: `clip-path ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'clip-path, opacity',
      }}
    >
      {children}
    </div>
  );
}
