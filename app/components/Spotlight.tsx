"use client";

import { useEffect, useRef } from "react";

type Props = {
  enabled?: boolean;
  cursorEnabled?: boolean;
};

export default function Spotlight({
  enabled = true,
  cursorEnabled = true,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const el = rootRef.current;
    const cur = cursorRef.current;
    if (!el) return;

    let clientX = window.innerWidth / 2;
    let clientY = window.innerHeight / 2;
    let x = clientX;
    let y = clientY;
    let raf = 0;

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (e instanceof TouchEvent) {
        const t = e.touches[0];
        if (!t) return;
        clientX = t.clientX;
        clientY = t.clientY;
      } else {
        const m = e as MouseEvent;
        clientX = m.clientX;
        clientY = m.clientY;
      }

      if (cur) {
        cur.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onLeave = () => {
      clientX = -9999;
      clientY = -9999;
      if (cur) cur.style.opacity = "0";
    };

    const prevCursor = document.documentElement.style.cursor;
    if (cursorEnabled) document.documentElement.style.cursor = "none";

    const loop = () => {
      // SOFTER / SLOWER SHIMMER
      x += (clientX - x) * 0.07;
      y += (clientY - y) * 0.07;

      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);

      if (cur) cur.style.opacity = clientX === -9999 ? "0" : "1";

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);

      if (cursorEnabled) document.documentElement.style.cursor = prevCursor || "";
    };
  }, [enabled, cursorEnabled]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] spotlight-root"
      style={
        {
          "--x": "50%",
          "--y": "50%",
        } as React.CSSProperties
      }
    >
      <div className="absolute inset-0 spotlight-overlay" />
      {cursorEnabled && (
        <div
          ref={cursorRef}
          className="spotlight-cursor"
          style={{ transform: "translate(-50%, -50%)", opacity: 0 }}
        />
      )}
    </div>
  );
}
