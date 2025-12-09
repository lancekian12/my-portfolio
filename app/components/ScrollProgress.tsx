"use client";

import React, { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 h-full z-50"
      style={{
        right: "3px", // move inward from right edge
        width: "6px",  // slightly thicker for visibility
      }}
    >
      <div
        className="w-full rounded-full transition-all duration-150 ease-out shadow-md"
        style={{
          height: `${scrollProgress}%`,
          background:
            typeof window !== "undefined" &&
            document.documentElement.classList.contains("dark")
              ? "linear-gradient(to bottom, rgba(255,255,255,0.85), rgba(200,200,200,0.6))"
              : "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(100,100,100,0.6))",
        }}
      />
    </div>
  );
};

export default ScrollProgress;
