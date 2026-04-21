"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type ImageDetailClientProps = {
  imageId: string;
  images: string[];
};

export default function ImageDetailClient({
  imageId,
  images,
}: ImageDetailClientProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const isNavigatingRef = useRef(false);
  const scaleRef = useRef(1);
  const isPinchingRef = useRef(false);

  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
  const rotate = useTransform(x, [-200, 0, 200], [-5, 0, 5]);
  const leftIndicatorOpacity = useTransform(x, [0, 100], [0, 0.5]);
  const leftIndicatorX = useTransform(x, [0, 100], [0, -20]);
  const rightIndicatorOpacity = useTransform(x, [-100, 0], [0.5, 0]);
  const rightIndicatorX = useTransform(x, [-100, 0], [20, 0]);

  useEffect(() => {
    if (imageId && !images.includes(imageId)) {
      router.replace("/gallery");
    }
  }, [imageId, images, router]);

  useEffect(() => {
    setScale(1);
    scaleRef.current = 1;
    setPosition({ x: 0, y: 0 });
    isNavigatingRef.current = false;
    setCurrentIndex(images.indexOf(imageId));
  }, [imageId, images]);

  useEffect(() => {
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener("touchmove", preventZoom, { passive: false });
    return () => document.removeEventListener("touchmove", preventZoom);
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = -e.deltaY * 0.01;
      const newScale = Math.min(Math.max(1, scale + delta), 4);
      setScale(newScale);
      scaleRef.current = newScale;
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container) return;

    let initialDistance = 0;
    let initialScale = 1;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        isPinchingRef.current = true;
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        initialScale = scaleRef.current;
      } else if (e.touches.length === 1) {
        isPinchingRef.current = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        isPinchingRef.current = true;
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        const distanceRatio = currentDistance / initialDistance;
        const newScale = Math.min(Math.max(1, initialScale * distanceRatio), 4);
        setScale(newScale);
        scaleRef.current = newScale;
        if (newScale === 1) {
          setPosition({ x: 0, y: 0 });
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        isPinchingRef.current = false;
      }
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handleDragStart = () => {
    if (isPinchingRef.current || scale > 1) {
      return false;
    }
  };

  const handleDrag = () => {
    if (isPinchingRef.current || scale > 1) {
      return;
    }
  };

  const handleDragEnd = () => {
    if (isPinchingRef.current || scale > 1) {
      return;
    }
  };

  const goToNext = (withAnimation = true) => {
    if (currentIndex < images.length - 1) {
      const nextImage = images[currentIndex + 1];
      setCurrentIndex(currentIndex + 1);
      if (withAnimation) {
        x.set(-1000);
        setTimeout(() => {
          router.push(`/gallery/${nextImage}`);
        }, 300);
      } else {
        router.push(`/gallery/${nextImage}`);
      }
    }
  };

  const goToPrevious = (withAnimation = true) => {
    if (currentIndex > 0) {
      const prevImage = images[currentIndex - 1];
      setCurrentIndex(currentIndex - 1);
      if (withAnimation) {
        x.set(1000);
        setTimeout(() => {
          router.push(`/gallery/${prevImage}`);
        }, 300);
      } else {
        router.push(`/gallery/${prevImage}`);
      }
    }
  };

  if (!imageId || !images.includes(imageId)) {
    return <Skeleton>Please wait...</Skeleton>;
  }

  return (
    <main className="w-screen flex h-screen flex-col items-center justify-start md:justify-center bg-white">
      <motion.div className="w-screen relative flex flex-col items-center justify-start md:justify-center">
        <div className="hidden md:flex flex-row justify-around items-center w-full ">
          <motion.h1
            layoutId="title"
            className="text-6xl font-serif text-primary font-bold"
          >
            {imageId}
          </motion.h1>
        </div>
        <div className="flex flex-row justify-center items-center h-[60vh] w-full px-4 mt-10 md:mt-0">
          <button
            onClick={() => goToPrevious(false)}
            disabled={currentIndex === 0}
            className="flex items-center justify-center hover:bg-accent rounded-md transition-colors flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed hidden md:flex"
          >
            <ChevronLeft className="h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24" />
          </button>
          <div
            ref={imageContainerRef}
            onWheel={handleWheel}
            className="relative w-full md:w-[70vw] h-full flex items-center justify-center overflow-hidden"
          >
            <motion.div
              drag={scale > 1}
              dragElastic={0}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              style={{ x, y: position.y, opacity, rotate, scale }}
              className="relative w-full h-full"
            >
              <Image
                src={`/${imageId}.webp`}
                alt={`Image ${imageId}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 70vw"
                priority
              />
            </motion.div>
            <motion.div
              style={{ opacity: leftIndicatorOpacity, x: leftIndicatorX }}
              className="absolute left-10 top-1/2 -translate-y-1/2 text-6xl text-primary pointer-events-none"
            >
              ‹
            </motion.div>
            <motion.div
              style={{ opacity: rightIndicatorOpacity, x: rightIndicatorX }}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-6xl text-primary pointer-events-none"
            >
              ›
            </motion.div>
          </div>
          <button
            onClick={() => goToNext(false)}
            disabled={currentIndex === images.length - 1}
            className="flex items-center justify-center hover:bg-accent rounded-md transition-colors flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed hidden md:flex"
          >
            <ChevronRight className="h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24" />
          </button>
        </div>
        <div className="flex flex-row justify-between w-full px-10 mt-5 md:hidden">
          <Button
            variant="outline"
            onClick={() => goToPrevious(false)}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-6 w-6" />
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => goToNext(false)}
            disabled={currentIndex === images.length - 1}
          >
            Next
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
