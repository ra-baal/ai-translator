"use client";

import { useState, useEffect } from "react";

const breakpoints = {
  md: 768,
  lg: 1024,
};

type ScreenSize = "small" | "medium" | "large";

export function useScreenSize() {
  const [width, setWidth] = useState(breakpoints.md); // next.js nie pozwala tu tutaj odczytywać window.width

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  let screenSize: ScreenSize;
  if (width < breakpoints.md) {
    screenSize = "small";
  } else if (width >= breakpoints.md && width < breakpoints.lg) {
    screenSize = "medium";
  } else {
    screenSize = "large";
  }

  return {
    isSm: screenSize === "small",
    isMd: screenSize === "medium",
    isLg: screenSize === "large",
  };
}
