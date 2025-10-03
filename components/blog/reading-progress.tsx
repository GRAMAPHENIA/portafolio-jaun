"use client";

import React, { useEffect, useState } from "react";

interface ReadingProgressProps {
  target: React.RefObject<HTMLElement | null>;
}

export function ReadingProgress({ target }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (!target.current) return;

      const element = target.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      const windowScrollTop = window.scrollY;
      const elementOffsetTop = element.offsetTop;

      if (windowScrollTop >= elementOffsetTop) {
        const scrolled = windowScrollTop - elementOffsetTop;
        const progress = Math.min((scrolled / totalHeight) * 100, 100);
        setProgress(progress);
      } else {
        setProgress(0);
      }
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress(); // Initial calculation

    return () => window.removeEventListener("scroll", updateProgress);
  }, [target]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
      <div
        className="h-full bg-accent transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
