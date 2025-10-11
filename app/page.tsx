"use client";
import Image from "next/image";
import Header from "./header";
import LandingSection from "./landing";
import AboutSnippet from "./about-snippet";
import { useScroll, useTransform, motion } from "framer-motion";
import Image1 from "../public/1.webp";
import Image2 from "../public/2.webp";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

export default function Home() {
  const { scrollY } = useScroll();
  const router = useRouter();
  const background = useTransform(scrollY, [0, 1200], ["#c39e88", "#efe6e1ff"]);
  const picContainerRef = useRef<HTMLDivElement>(null);
  let distanceFromTop = 0;
  let marginNegativeValue = 0;

  useEffect(() => {
    if (picContainerRef.current) {
      const rect = picContainerRef.current.getBoundingClientRect();
      distanceFromTop = rect.top + scrollY.get();
      marginNegativeValue = -distanceFromTop * 0.02
    }
  }, [picContainerRef]);

  return (
    <motion.main layoutId="background" className="transition-all duration-300 ease-in-out overflow-x-hidden pt-20" style={{ background }}>
      <Header />
      <LandingSection />
      <section className="overflow-hidden flex flex-col border-primary-top-bottom justify-center items-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
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
              <Image src={Image1} alt="Sample Image 1" fill className="object-cover" style={{ borderRadius: '0.5rem' }} />
            </div>
            </motion.div>
          <motion.div
            layoutId="image2"
            className="flex justify-center items-center"
            style={{
              scale: useTransform(
                useScroll().scrollY,
                [distanceFromTop, distanceFromTop + distanceFromTop, distanceFromTop + (2 * distanceFromTop)],
                [0.5, 0.8, 0.6]
              ),
            }}
          >
            <div className="w-[60vw] md:w-[45vw] h-150 md:p-10 rounded-lg overflow-hidden flex items-center justify-center">
              <Image src={Image2} alt="Sample Image 2" fill className="object-cover" style={{ borderRadius: '0.5rem' }} />
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
      <section className="p-20 flex flex-col items-center justify-start p-20 gap-10 bg-background">
        <div id="wrapper" className="m-10 max-w-4xl w-[90vw] flex flex-col sm:flex-row gap-15 items-center justify-center">
          <h1 className="text-4xl font-serif color-primary font-bold">Why Clients Love Us</h1>
          <ul className="text-xl flex flex-col gap-4">
            <li className="flex flex-row items-center gap-5"><Check className="color-primary"/> Clear visuals = no guesswork</li>
            <li className="flex flex-row items-center gap-5"><Check className="color-primary"/> Collaborative, stress-free process</li>
            <li className="flex flex-row items-center gap-5"><Check className="color-primary"/> A design journey that’s as fun as the final reveal</li>
          </ul>
        </div>
      </section>
      <AboutSnippet />
      <div className="h-30"/>
    </motion.main>
  );
}
