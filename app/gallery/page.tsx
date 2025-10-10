"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image1 from "../../public/1.webp";
import Image2 from "../../public/2.webp";
import Image3 from "../../public/3.webp";
import Image4 from "../../public/4.webp";
import { Button } from "@/components/ui/button";
import { GalleryImage } from "@/components/GalleryImage";

export default function GalleryPage() {
  const router = useRouter();


  return (
    <motion.main className="min-h-screen w-screen flex flex-col items-center justify-start gap-8 bg-white">
      {/* The white ink circle that matches the button's layoutId. It will layout-animate from the small
          circle behind the button to this larger positioned element. */}
      <motion.div layoutId="close-button">
        <Button className="absolute right-10 top-10" variant={"outline"} onClick={() => router.replace('/')}>
          Close
        </Button>
      </motion.div>

      {/* Reveal content after a short delay to allow the layout animation to be visible */}
      <div className="p-10 flex flex-row gap-20 justify-around items-center w-full">
        <motion.h1 layoutId="title" className="text-6xl font-serif text-primary font-bold">Gallery</motion.h1>
        <motion.div layoutId="gallery-ink" className="flex justify-between items-center">


        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6 w-full max-w-6xl px-10">
        <GalleryImage src={Image1} alt="1" layoutId="image1" shouldAnimate />
        <GalleryImage src={Image2} alt="2" layoutId="image2" shouldAnimate />

      </div>

      <div className="grid grid-cols-2 gap-6 mt-6 w-full max-w-6xl px-10">
        <GalleryImage src={Image3} alt="3" layoutId="image3" shouldAnimate />
        <GalleryImage src={Image4} alt="4" layoutId="image4" shouldAnimate />
      </div>
      <br /><br /><br /><br />
    </motion.main>
  );
}

// (no top-level effects) all effects run inside the component
