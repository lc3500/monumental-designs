"use client";
import Image, { StaticImageData } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface PageHeroProps {
  title: string | ReactNode;
  subtitle?: string;
  backgroundImage?: StaticImageData | string;
  logo?: StaticImageData | string;
  className?: string;
  titleClassName?: string;
  containerClassName?: string;
  enableParallax?: boolean;
  gradientOverlay?: string;
}

/**
 * Reusable hero/banner section with optional parallax effects
 * Supports background images, logos, and custom gradients
 */
export function PageHero({
  title,
  subtitle,
  backgroundImage,
  logo,
  className = "",
  titleClassName = "",
  containerClassName = "h-64",
  enableParallax = true,
  gradientOverlay = "linear-gradient(180deg, var(--color-primary), var(--color-secondary))",
}: PageHeroProps) {
  const scrollY = useScroll().scrollY;
  const yTransform = useTransform(scrollY, [0, 300], [0, 150]);
  const scaleTransform = useTransform(scrollY, [0, 300], [1, 0.8]);
  const y = enableParallax ? yTransform : undefined;
  const scale = enableParallax ? scaleTransform : undefined;

  return (
    <div
      className={`w-full border-t border-b border-primary flex items-center justify-center relative overflow-hidden ${containerClassName} ${className}`}
      style={{ background: gradientOverlay }}
    >
      {/* Background Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt="Cover Image"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30 z-0"
        />
      )}

      {/* Logo with Parallax */}
      {logo && (
        <motion.div
          style={{ y, scale }}
          className="w-full h-full flex flex-col items-center justify-center"
        >
          <Image
            src={logo}
            alt="Logo"
            draggable={false}
            className="absolute z-0 h-[40rem] opacity-20"
          />
        </motion.div>
      )}

      {/* Title */}
      <div className="absolute z-10 flex flex-col items-center justify-center px-10">
        <h1
          className={`text-serif text-4xl text-white font-bold text-center ${titleClassName}`}
          style={{ textShadow: "2px 2px 4px rgba(26, 31, 181, 0.5)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-white text-lg mt-4 text-center">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
