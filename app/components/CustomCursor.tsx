"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);
  const [scrolling, setScrolling] = useState(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Smooth spring follow
  const springX = useSpring(cursorX, { stiffness: 120, damping: 18, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 18, mass: 0.5 });

  // Dot (faster, tighter)
  const dotX = useSpring(cursorX, { stiffness: 400, damping: 28 });
  const dotY = useSpring(cursorY, { stiffness: 400, damping: 28 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    const onScroll = () => {
      const dy = window.scrollY - lastScrollY.current;
      scrollVelocity.current = dy;
      lastScrollY.current = window.scrollY;
      setScrolling(true);

      // Move cursor Y based on scroll direction
      cursorY.set(cursorY.get() + dy * 0.3);

      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setScrolling(false);
        scrollVelocity.current = 0;
      }, 150);
    };

    // Detect hover on interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']")) setHovered(true);
    };
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']")) setHovered(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("scroll", onScroll);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      clearTimeout(scrollTimeout.current);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: hovered ? "var(--violet)" : "var(--indigo)",
          opacity: 0.6,
        }}
        animate={{
          width: clicked ? 20 : hovered ? 44 : 32,
          height: clicked ? 20 : hovered ? 44 : 32,
          opacity: scrolling ? 0.9 : 0.6,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          background: hovered ? "var(--violet)" : "var(--indigo)",
        }}
        animate={{
          width: clicked ? 12 : hovered ? 6 : 5,
          height: clicked ? 12 : hovered ? 6 : 5,
          opacity: scrolling ? 1 : 0.85,
        }}
        transition={{ duration: 0.12 }}
      />

      {/* Scroll streak — shows when scrolling */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: `linear-gradient(to bottom, var(--indigo), var(--violet))`,
          width: 2,
          originY: 0,
        }}
        animate={{
          height: scrolling ? Math.min(Math.abs(scrollVelocity.current) * 3, 60) : 0,
          opacity: scrolling ? 0.5 : 0,
          scaleY: scrollVelocity.current < 0 ? -1 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
