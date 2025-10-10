"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";

// Available images in your gallery
const images = ["1", "2", "3", "4"];

export default function ImageDetailPage({ params }: { params: Promise<{ "image-id": string }> }) {
    const router = useRouter();
    const { "image-id": imageId } = use(params);

    useEffect(() => {
        if (!images.includes(imageId)) {
            // If the imageId is not valid, redirect to the gallery main page
            router.replace('/gallery');
        }
    }, [imageId, router]);

    if (!images.includes(imageId)) {
        return <Skeleton>Please wait...</Skeleton>; // Or a loading state while redirecting
    }

    const [currentIndex, setCurrentIndex] = useState(images.indexOf(imageId));
    const [dragDirection, setDragDirection] = useState(0);

    // Zoom state
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const [isDraggingImage, setIsDraggingImage] = useState(false);
    const isNavigatingRef = useRef(false);
    const scaleRef = useRef(1); // Keep track of current scale for pinch zoom
    const isPinchingRef = useRef(false); // Track if user is currently pinching

    // Motion values for swipe animation
    const x = useMotionValue(0);
    const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
    const rotate = useTransform(x, [-200, 0, 200], [-5, 0, 5]);

    // Swipe indicator transforms (must be defined at top level, not conditionally)
    const leftIndicatorOpacity = useTransform(x, [0, 100], [0, 0.5]);
    const leftIndicatorX = useTransform(x, [0, 100], [0, -20]);
    const rightIndicatorOpacity = useTransform(x, [-100, 0], [0.5, 0]);
    const rightIndicatorX = useTransform(x, [-100, 0], [20, 0]);

    // Swipe threshold (pixels)
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    // Reset zoom when image changes
    useEffect(() => {
        setScale(1);
        scaleRef.current = 1;
        setPosition({ x: 0, y: 0 });
        isNavigatingRef.current = false;
    }, [imageId]);

    // Prevent page zoom on mobile
    useEffect(() => {
        const preventZoom = (e: TouchEvent) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        };

        document.addEventListener('touchmove', preventZoom, { passive: false });
        return () => document.removeEventListener('touchmove', preventZoom);
    }, []);

    // Handle wheel zoom
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

    // Handle pinch zoom
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
                // Use the ref to get the current scale value
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
                
                // Calculate scale with better sensitivity
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

        container.addEventListener('touchstart', handleTouchStart, { passive: false });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd, { passive: false });

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, []); // Empty dependency array since we use refs

    const handleDragStart = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        // Prevent drag if user is pinching
        if (isPinchingRef.current || scale > 1) {
            return false;
        }
    };

    const handleDrag = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        // Ignore drag if pinching
        if (isPinchingRef.current || scale > 1) {
            return;
        }

        if (scale > 1) {
            // When zoomed, handle panning
            setPosition({
                x: position.x + info.delta.x,
                y: position.y + info.delta.y
            });
        } else {
            // Don't check momentum during drag - only on dragEnd
            // This prevents multiple rapid navigations
        }
    };

    const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        // Ignore drag end if user was pinching
        if (isPinchingRef.current || scale > 1) {
            return;
        }

        // Only allow swiping if not zoomed in
        if (scale > 1) {
            return;
        }

        // Prevent multiple navigations from same gesture
        if (isNavigatingRef.current) {
            return;
        }

        const swipe = swipePower(info.offset.x, info.velocity.x);

        if (swipe < -swipeConfidenceThreshold && currentIndex < images.length - 1) {
            // Swiped left - go to next image
            isNavigatingRef.current = true;
            goToNext();
        } else if (swipe > swipeConfidenceThreshold && currentIndex > 0) {
            // Swiped right - go to previous image
            isNavigatingRef.current = true;
            goToPrevious();
        } else {
            // Reset position with animation if not enough momentum
            x.set(0);
        }
    };

    const goToNext = (withAnimation = true) => {
        if (currentIndex < images.length - 1) {
            const nextImage = images[currentIndex + 1];
            setCurrentIndex(currentIndex + 1);
            setDragDirection(1);
            
            if (withAnimation) {
                // Animate out before navigating (for swipe gestures)
                x.set(-1000);
                setTimeout(() => {
                    router.push(`/gallery/${nextImage}`);
                }, 300);
            } else {
                // Direct navigation (for button clicks)
                router.push(`/gallery/${nextImage}`);
            }
        }
    };

    const goToPrevious = (withAnimation = true) => {
        if (currentIndex > 0) {
            const prevImage = images[currentIndex - 1];
            setCurrentIndex(currentIndex - 1);
            setDragDirection(-1);
            
            if (withAnimation) {
                // Animate out before navigating (for swipe gestures)
                x.set(1000);
                setTimeout(() => {
                    router.push(`/gallery/${prevImage}`);
                }, 300);
            } else {
                // Direct navigation (for button clicks)
                router.push(`/gallery/${prevImage}`);
            }
        }
    };

    return (
        <main className="w-screen flex h-screen flex-col items-center justify-start md:justify-center bg-white">
           
            <motion.div className="w-screen relative flex flex-col items-center justify-start md:justify-center">
                {/* The white ink circle that matches the button's layoutId. It will layout-animate from the small
          circle behind the button to this larger positioned element. */}


                {/* Reveal content after a short delay to allow the layout animation to be visible */}
                <div className="hidden md:flex flex-row justify-around items-center w-full ">
                    <motion.h1 layoutId="title" className="text-6xl font-serif text-primary font-bold">{imageId}</motion.h1>

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
                        className="flex h-[60vh] w-full max-w-[500px] mx-4 justify-center items-center relative touch-none"
                        style={{
                            cursor: scale > 1 ? 'move' : 'grab',
                        }}
                        onWheel={handleWheel}
                    >
                        {scale === 1 ? (
                            // Swipe mode - only drag on x-axis
                            <motion.div
                                drag="x"
                                layoutId={'image' + imageId}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragStart={handleDragStart}
                                onDrag={handleDrag}
                                onDragEnd={handleDragEnd}
                                style={{
                                    x,
                                    opacity,
                                    rotate,
                                }}
                                className="relative w-full h-full cursor-grab active:cursor-grabbing"
                                whileTap={{ cursor: "grabbing" }}
                            >
                                <Image
                                    src={"/" + imageId + ".webp"}
                                    alt={imageId}
                                    fill
                                    className="object-contain pointer-events-none select-none"
                                />
                            </motion.div>
                        ) : (
                            // Zoom mode - drag freely to pan
                            <motion.div
                                drag
                                dragElastic={0.3}
                                dragMomentum={false}
                                onDrag={handleDrag}
                                style={{
                                    scale,
                                    x: position.x,
                                    y: position.y,
                                }}
                                className="relative w-full h-full cursor-move"
                            >
                                <Image
                                    src={"/" + imageId + ".webp"}
                                    alt={imageId}
                                    fill
                                    className="object-contain pointer-events-none select-none"
                                />
                            </motion.div>
                        )}

                        {/* Swipe indicator hints - only show when not zoomed */}
                        {scale === 1 && (
                            <>
                                <motion.div
                                    className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl opacity-0 pointer-events-none z-10"
                                    style={{
                                        opacity: leftIndicatorOpacity,
                                        x: leftIndicatorX
                                    }}
                                >
                                    ←
                                </motion.div>
                                <motion.div
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-4xl opacity-0 pointer-events-none z-10"
                                    style={{
                                        opacity: rightIndicatorOpacity,
                                        x: rightIndicatorX
                                    }}
                                >
                                    →
                                </motion.div>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => goToNext(false)}
                        disabled={currentIndex === images.length - 1}
                        className="flex items-center justify-center hover:bg-accent rounded-md transition-colors flex-shrink-0 disabled:opacity-30 disabled:cursor-not-allowed hidden md:flex"
                    >
                        <ChevronRight className="h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24" />
                    </button>
                </div>

                {/* Image counter and zoom level */}
                <div className="text-center text-muted-foreground space-y-2">
                    <div className="flex md:hidden">{currentIndex + 1} / {images.length}</div>
                    {scale > 1 && (
                        <div className="text-sm">
                            Zoom: {Math.round(scale * 100)}%
                            <button
                                onClick={() => {
                                    setScale(1);
                                    setPosition({ x: 0, y: 0 });
                                }}
                                className="ml-2 text-xs underline hover:text-primary"
                            >
                                Reset
                            </button>
                        </div>
                    )}
                    <div className="text-xs">
                        {scale === 1 ? 'Pinch or Ctrl+Scroll to zoom' : 'Drag to pan'}
                    </div>
                </div>

            </motion.div>
             <motion.div layoutId="close-button" className="pt-10">
                <Button variant="destructive" className="h-20" onClick={() => router.push('/gallery')}>
                    ← Back to Gallery
                </Button>
            </motion.div>
        </main>
    );
}
