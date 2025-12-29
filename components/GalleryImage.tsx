"use client";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

interface GalleryImageProps {
    src: string | StaticImageData;
    alt: string;
    layoutId?: string;
    className?: string;
    shouldAnimate?: boolean;
}

export function GalleryImage({ src, alt, layoutId, className = "", shouldAnimate = false }: GalleryImageProps) {
    const router = useRouter();
    
    return (
        <motion.div 
            className={`rounded overflow-hidden h-64 w-full relative ${className}`} 
            layoutId={layoutId}
            initial={shouldAnimate ? { opacity: 0, scale: 0.8 } : false}
            animate={shouldAnimate ? { opacity: 1, scale: 1 } : false}
            transition={shouldAnimate ? { duration: 0.5, ease: "easeOut" } : undefined}
        onClick={() => router.push(`/gallery/${alt}`)}
        >
 
            {typeof src === "string" ? (
                <img src={src} alt={alt} className="object-cover w-full h-full" />
            ) : (
                <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            )}
        </motion.div>
    );
}
