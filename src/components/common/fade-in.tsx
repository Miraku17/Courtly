"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
};

export const FadeIn = ({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
}: FadeInProps) => {
  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
