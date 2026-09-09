"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapReveal<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Anima elementos com classe .gsap-reveal
      gsap.fromTo(
        ".gsap-reveal",
        {
          opacity: 0,
          y: 28,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        }
      );

      // Anima badges flutuantes
      gsap.to(".gsap-float", {
        y: -6,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}
