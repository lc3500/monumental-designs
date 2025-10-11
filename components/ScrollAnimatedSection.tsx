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
  const fadeTransform =  useTransform(scrollY, scrollRange, fadeRange)
  const scaleTransform = useTransform(scrollY, scrollRange, scaleRange)
  const yTransform = useTransform(scrollY, scrollRange, yRange)

  const opacity = enableFade ? fadeTransform : undefined;
  const scale = enableScale ? scaleTransform : undefined;
  const y = enableY ? yTransform : undefined;

  return (
    <motion.div style={{ opacity, scale, y }} className={className}>
      {children}
    </motion.div>
  );
}
