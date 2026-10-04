"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Le panneau de marque : fond sauge profond, trame de points. Les points
 * suivent le curseur — parallaxe d'un pixel près, et un halo qui les éclaire
 * sous la main. Rien ne bouge si l'utilisateur a demandé moins d'animation.
 */
export function BrandPanel(props: {
  side: "start" | "end";
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);
  const target = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0.5, y: 0.5 });

  const tick = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const c = current.current;
    const t = target.current;
    c.x += (t.x - c.x) * 0.12;
    c.y += (t.y - c.y) * 0.12;
    el.style.setProperty("--px", `${c.x * 100}%`);
    el.style.setProperty("--py", `${c.y * 100}%`);
    el.style.setProperty("--dx", `${(c.x - 0.5) * -16}px`);
    el.style.setProperty("--dy", `${(c.y - 0.5) * -16}px`);
    frame.current =
      Math.abs(t.x - c.x) + Math.abs(t.y - c.y) > 0.0005
        ? requestAnimationFrame(tick)
        : null;
  }, []);

  const start = useCallback(() => {
    if (frame.current === null) frame.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(() => {
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  function onPointerMove(event: React.PointerEvent<HTMLElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    target.current = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };
    start();
  }

  function onPointerLeave() {
    target.current = { x: 0.5, y: 0.5 };
    start();
  }

  return (
    <aside
      ref={ref}
      data-side={props.side}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={
        {
          "--px": "50%",
          "--py": "50%",
          "--dx": "0px",
          "--dy": "0px",
        } as React.CSSProperties
      }
      className="group bg-brand-panel text-brand-panel-foreground relative isolate hidden flex-col justify-center overflow-hidden px-10 py-16 lg:flex data-[side=end]:lg:order-2 xl:px-16"
    >
      {/* Trame de fond, constante. */}
      <span
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute -inset-6 -z-10 opacity-[0.22] [background-position:var(--dx)_var(--dy)] motion-reduce:[background-position:0_0]"
      />
      {/* Halo : la même trame, plus vive, révélée autour du curseur. */}
      <span
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute -inset-6 -z-10 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-70 [background-position:var(--dx)_var(--dy)] [mask-image:radial-gradient(220px_220px_at_var(--px)_var(--py),#000_0%,#0000_70%)] [-webkit-mask-image:radial-gradient(220px_220px_at_var(--px)_var(--py),#000_0%,#0000_70%)] motion-reduce:hidden"
      />
      <div className="mx-auto w-full max-w-lg">{props.children}</div>
    </aside>
  );
}
