"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
import LazyImage from "./LazyImage";
import Image1 from "../public/1.webp";
import Image2 from "../public/2.webp";
import { useRouter } from "next/navigation";

export default function ImagesSection() {
    const scrollY = useScroll().scrollY;
    const picContainerRef = useRef<HTMLDivElement>(null);
    let distanceFromTop = 0;
    let marginNegativeValue = 0;
    const router = useRouter();

    useEffect(() => {
        if (picContainerRef.current) {
            const rect = picContainerRef.current.getBoundingClientRect();
            distanceFromTop = rect.top + scrollY.get();
            marginNegativeValue = -distanceFromTop * 0.02
        }
    }, [picContainerRef]);

    return (<section className="overflow-hidden flex flex-col border-primary-top-bottom justify-center items-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
        <div ref={picContainerRef} className="pl-10 pt-10 mb-[-90px] text-5xl text-serif font-bold flex justify-start items-center ">
            <motion.h1
                layoutId="title"
                className="text-primary-faded scale-y-120 md:scale-y-200 text-center w-full"
                style={{ textShadow: '2px 2px 4px rgba(99, 74, 0, 0.1)', transform: `translateY(${marginNegativeValue}px)` }}
            >
                Refined. Inspirational. Awe-Inspiring.
            </motion.h1>

        </div>
        <div className="flex justify-center items-center w-full max-w-6xl">
            <motion.div
                layoutId="image1"
                className="flex justify-center items-center"
                style={{
                    scale: useTransform(
                        scrollY,
                        [distanceFromTop, distanceFromTop + 800, distanceFromTop + 1600],
                        [0.5, 0.8, 0.6]
                    ),
                }}
            >
                <div className="w-[60vw] md:w-[45vw] h-150 md:p-10 rounded-lg overflow-hidden flex items-center justify-center">
                    <LazyImage src={Image1} alt="Sample Image 1" fill className="object-cover" style={{ borderRadius: '0.5rem' }} />
                </div>
            </motion.div>
            <motion.div
                layoutId="image2"
                className="flex justify-center items-center"
                style={{
                    scale: useTransform(
                        useScroll().scrollY,
                        [distanceFromTop, distanceFromTop + 800, distanceFromTop + 1600],
                        [0.5, 0.8, 0.6]
                    ),
                }}
            >
                <div className="w-[60vw] md:w-[45vw] h-150 md:p-10 rounded-lg overflow-hidden flex items-center justify-center">
                    <LazyImage src={Image2} alt="Sample Image 2" fill className="object-cover" style={{ borderRadius: '0.5rem' }} />
                </div>
            </motion.div>

        </div>
        <div className="self-center mb-10 mt-5 w-48 h-12 z-20 flex items-center justify-center">
            <motion.div layoutId="gallery-ink" className="bg-white">
                <Button
                    variant={"default"}
                    className="w-full h-full"
                    onClick={() => {
                        router.push("/gallery");
                    }}
                >
                    View Gallery
                </Button>
            </motion.div>
        </div>
    </section>);
}