"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer";
      setIsPointer(!!isClickable);
    };

    const leave = () => setIsVisible(false);
    const enter = () => setIsVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Outer ring */}
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[9999] hidden rounded-full border border-white/30 mix-blend-difference md:block"
            animate={{
              x: position.x - (isPointer ? 24 : 16),
              y: position.y - (isPointer ? 24 : 16),
              width: isPointer ? 48 : 32,
              height: isPointer ? 48 : 32,
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 28,
              mass: 0.5,
            }}
          />
          {/* Inner dot */}
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-1.5 w-1.5 rounded-full bg-white mix-blend-difference md:block"
            animate={{
              x: position.x - 3,
              y: position.y - 3,
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28,
              mass: 0.3,
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
