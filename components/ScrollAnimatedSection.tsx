"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface ScrollAnimatedSectionProps {
  children: ReactNode;
  className?: string;
  enableFade?: boolean;
  enableScale?: boolean;
  enableY?: boolean;
  fadeRange?: [number, number];
  scaleRange?: [number, number];
  yRange?: [number, number];
  scrollRange?: [number, number];
}

/**
 * Wrapper component for scroll-based animations
 * Provides fade, scale, and Y-transform effects based on scroll position
 */
export function ScrollAnimatedSection({
  children,
  className = "",
  enableFade = true,
  enableScale = false,
  enableY = false,
  fadeRange = [1, 0],
  scaleRange = [1, 0.8],
  yRange = [0, -100],
  scrollRange = [0, 300],
}: ScrollAnimatedSectionProps) {
  const { scrollY } = useScroll();
  
  const opacity = enableFade ? useTransform(scrollY, scrollRange, fadeRange) : undefined;
  const scale = enableScale ? useTransform(scrollY, scrollRange, scaleRange) : undefined;
  const y = enableY ? useTransform(scrollY, scrollRange, yRange) : undefined;

  return (
    <motion.div style={{ opacity, scale, y }} className={className}>
      {children}
    </motion.div>
  );
}
