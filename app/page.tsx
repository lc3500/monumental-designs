"use client";
import Image from "next/image";
import Header from "./header";
import LandingSection from "./landing";
import { Avatar } from "@/components/ui/avatar";
import AboutSnippet from "./about-snippet";
import { useScroll, useTransform, motion, distance } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image1 from "../public/1.png";
import Image2 from "../public/2.png";
import Image3 from "../public/3.png";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const { scrollY } = useScroll();
  const router = useRouter();
  const background = useTransform(scrollY, [0, 1200], ["#c39e88", "#efe6e1ff"]);
  const picContainerRef = useRef<HTMLDivElement>(null);
  let distanceFromTop = 0;

  useEffect(() => {
    if (picContainerRef.current) {
      const rect = picContainerRef.current.getBoundingClientRect();
      distanceFromTop = rect.top + window.scrollY;
      console.log("Distance from top:", distanceFromTop);
    }
  }, [picContainerRef]);

  return (
    <motion.main layoutId="background" className="transition-all duration-300 ease-in-out" style={{ background }}>
      <Header />
      <LandingSection />
      <section className="w-screen flex flex-col border-primary-top-bottom">
        <div ref={picContainerRef} className="w-screen pl-10 pt-10 pb-10 text-7xl text-serif font-bold flex justify-start items-center">
          <motion.h1 layoutId="title"className="text-primary-faded">Refined. Inspirational. Awe-Inspring.</motion.h1>

        </div>
        <div className="flex justify-evenly items-center w-full">
          <motion.div
          layoutId="image1"
            className="overflow-hidden flex justify-center items-center"
            style={{
              scale: useTransform(
                useScroll().scrollY,
                [distanceFromTop, distanceFromTop + window.innerHeight, distanceFromTop + (2 * window.innerHeight)],
                [0.5, 0.8, 0.6]
              ),
            }}
          >
            <div className="w-100 h-150 p-20 rounded-lg overflow-hidden flex items-center justify-center">
              <Image src={Image1} alt="Sample Image 1" fill className="object-cover" style={{ borderRadius: '0.5rem' }} />
            </div>
          </motion.div>
          <motion.div
          layoutId="image2"
            className="overflow-hidden flex justify-center items-center"
            style={{
              scale: useTransform(
                useScroll().scrollY,
                [distanceFromTop, distanceFromTop + window.innerHeight, distanceFromTop + (2 * window.innerHeight)],
                [0.5, 0.8, 0.6]
              ),
            }}
          >
            <div className="w-100 h-150 p-20 rounded-lg overflow-hidden flex items-center justify-center">
              <Image src={Image2} alt="Sample Image 2" fill className="object-cover" style={{ borderRadius: '0.5rem' }} />
            </div>
          </motion.div>
          <motion.div
            layoutId="image3"
            className="overflow-hidden flex justify-center items-center"
            style={{
              scale: useTransform(
                useScroll().scrollY,
                [distanceFromTop, distanceFromTop + window.innerHeight, distanceFromTop + (2 * window.innerHeight)],
                [0.5, 0.8, 0.6]
              ),
            }}
          >
            <div className="w-100 h-150 p-20 rounded-lg overflow-hidden flex items-center justify-center">
              <Image src={Image3} alt="Sample Image 3" fill className="object-cover" style={{ borderRadius: '0.5rem' }} loading="eager" />
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
      </section>
      <AboutSnippet />
      <section className="p-20 flex flex-col items-center justify-center gap-10 ">
        <h1>Why Clients Love Us</h1>
        <p>Testimonials coming soon...</p>
      </section>
    </motion.main>
  );
}
