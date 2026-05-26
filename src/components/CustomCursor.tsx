"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Update global CSS variables on document element for spot-glow calculations
      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
      document.documentElement.style.setProperty("--mouse-x-percent", `${xPercent}%`);
      document.documentElement.style.setProperty("--mouse-y-percent", `${yPercent}%`);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("clickable") ||
        target.style.cursor === "pointer"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    // Initial show if inside window
    setIsVisible(true);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Small pointer dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary-light rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Outer cybernetic ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-primary-light/50 pointer-events-none z-[9998] mix-blend-screen flex items-center justify-center"
        animate={{
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          backgroundColor: isHovered ? "rgba(0, 102, 255, 0.1)" : "rgba(0, 102, 255, 0)",
          borderColor: isHovered ? "rgba(0, 210, 255, 0.8)" : "rgba(0, 102, 255, 0.4)",
          boxShadow: isHovered 
            ? "0 0 15px rgba(0, 210, 255, 0.3)" 
            : "0 0 0px rgba(0, 102, 255, 0)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Subtle crosshair indicator when hovered */}
        {isHovered && (
          <div className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-ping" />
        )}
      </motion.div>
    </>
  );
}
