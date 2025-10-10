"use client";

import { motion } from "framer-motion";

export default function GalleryTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0.9, x: 0.95 }}
      animate={{ opacity: 1, x: 1 }}
      exit={{ opacity: 0, x: 0.95 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1], // Custom easing for smooth motion
        type: "spring", 
        stiffness: 100,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  );
}
