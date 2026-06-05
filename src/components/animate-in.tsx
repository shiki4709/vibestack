"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { ReactNode, MouseEvent } from "react";

/* ── Fade + slide on scroll ── */

interface AnimateInProps {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly className?: string;
  readonly direction?: "up" | "down" | "left" | "right";
}

const directionOffset = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
} as const;

export function AnimateIn({
  children,
  delay = 0,
  className,
  direction = "up",
}: AnimateInProps) {
  const offset = directionOffset[direction];
  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger container ── */

export function AnimateStagger({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimateStaggerItem({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Word-by-word text reveal ── */

interface TextRevealProps {
  readonly text: string;
  readonly className?: string;
  readonly delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const words = text.split(" ");
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: delay } },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={{
            hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
            },
          }}
          className="inline-block"
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ── Magnetic hover effect ── */

interface MagneticProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly strength?: number;
}

export function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  function handleMouse(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Scale on tap / press ── */

export function ScalePress({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Hover lift with shadow ── */

export function HoverLift({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        boxShadow: "0 12px 24px -8px rgba(0,0,0,0.12)",
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Shimmer loading placeholder ── */

export function Shimmer({ className }: { readonly className?: string }) {
  return <div className={`animate-shimmer ${className ?? ""}`} />;
}
