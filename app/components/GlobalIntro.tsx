"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function GlobalIntro() {
  const [show, setShow] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const teamRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const glassShapesRef = useRef<(HTMLDivElement | null)[]>([]);

  const wexunWord = "nuXeW".split("");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          y: "-100%",
          duration: 0.9,
          ease: "expo.inOut",
          delay: 0.2,
          onComplete: () => {
            setShow(false);
            document.body.style.overflow = "";
          },
        });
      },
    });

    tl.fromTo(
      glassShapesRef.current,
      { y: 150, opacity: 0, scale: 0.5, rotate: -20 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.out",
      },
    )

      .fromTo(
        lettersRef.current,
        { y: 80, opacity: 0, rotateX: -45 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.08,
          ease: "back.out(1.7)",
        },
        "-=1",
      )

      .fromTo(
        teamRef.current,
        { opacity: 0, letterSpacing: "0px", y: 10 },
        {
          opacity: 1,
          letterSpacing: "12px",
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.6",
      )

      .fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power4.inOut" },
        "-=0.4",
      );
  }, []);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-app overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-wexun-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-wexun-secondary/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Floating Glass Shapes (Decorative) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          ref={(el) => {
            glassShapesRef.current[0] = el;
          }}
          className="absolute -top-10 -left-10 md:top-10 md:left-20 w-24 h-24 md:w-32 md:h-32 glass rounded-2xl rotate-12"
        />
        <div
          ref={(el) => {
            glassShapesRef.current[1] = el;
          }}
          className="absolute top-1/4 right-5 md:right-32 w-16 h-16 md:w-20 md:h-20 glass rounded-full"
        />
        <div
          ref={(el) => {
            glassShapesRef.current[2] = el;
          }}
          className="absolute bottom-10 left-10 md:bottom-20 md:left-1/3 w-20 h-20 md:w-28 md:h-28 glass rounded-3xl -rotate-12"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* WeXun Text */}
        <h1
          className="flex justify-center overflow-hidden pb-2"
          style={{ perspective: "400px" }}
        >
          {wexunWord.map((letter, index) => (
            <span
              key={index}
              ref={(el) => {
                lettersRef.current[index] = el;
              }}
              className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-wexun-primary via-purple-400 to-wexun-secondary inline-block origin-bottom"
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* TEAM Text */}
        <div className="mt-2 md:mt-4 h-8 overflow-hidden flex justify-center">
          <span
            ref={teamRef}
            className="text-white/60 dark:text-white/80 text-xl md:text-2xl font-light tracking-[12px] uppercase block"
          >
            TEAM
          </span>
        </div>

        {/* Cyber Progress Line */}
        <div className="mt-12 md:mt-16 w-48 md:w-64 h-[2px] bg-white/10 mx-auto rounded-full overflow-hidden relative">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#6C63FF] via-[#a78bfa] to-[#FF6584] origin-left"
            style={{ boxShadow: "0 0 10px rgba(108, 99, 255, 0.8)" }} // Glow Effect
          />
        </div>

        <p className="text-white/30 text-xs mt-4 font-mono uppercase tracking-widest opacity-50">
          powered by WeXun Team
        </p>
      </div>
    </div>
  );
}
