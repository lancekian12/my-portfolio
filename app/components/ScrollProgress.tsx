"use client";

import React, { useEffect, useState, useRef } from "react";

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  const lastKnownScrollY = useRef(0);
  const ticking = useRef(false);
  const rafId = useRef<number | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    setMounted(true); 

    setIsDark(document.documentElement.classList.contains("dark"));

    const updateProgress = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.max(0, Math.min(100, scrolled)));
    };

    updateProgress();

    const onScroll = () => {
      lastKnownScrollY.current = window.scrollY || window.pageYOffset;
      if (!ticking.current) {
        ticking.current = true;
        rafId.current = window.requestAnimationFrame(() => {
          const scrollTop = lastKnownScrollY.current;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          setScrollProgress(Math.max(0, Math.min(100, scrolled)));
          ticking.current = false;
        });
      }
    };

    const onResize = () => updateProgress();
    const onLoad = () => updateProgress();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onLoad);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.target === document.documentElement) {
          setIsDark(document.documentElement.classList.contains("dark"));
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    mutationObserverRef.current = observer;

    let resizeObserver: ResizeObserver | null = null;
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(() => updateProgress());
      resizeObserver.observe(document.documentElement);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (mutationObserverRef.current) mutationObserverRef.current.disconnect();
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  if (!mounted) return null; // render nothing on server to avoid mismatch

  return (
    <div
      className="fixed top-0 h-full z-50"
      style={{
        right: "3px",
        width: "6px",
        pointerEvents: "none",
      }}
      aria-hidden
    >
      <div
        className="w-full h-full rounded-full overflow-hidden"
        style={{
          background: "transparent",
        }}
      >
        <div
          className="w-full rounded-full transition-transform duration-150 ease-out shadow-md"
          style={{
            height: "100%",
            transform: `scaleY(${scrollProgress / 100})`,
            transformOrigin: "top",
            background: isDark
              ? "linear-gradient(to bottom, rgba(255,255,255,0.85), rgba(200,200,200,0.6))"
              : "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(100,100,100,0.6))",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};

export default ScrollProgress;