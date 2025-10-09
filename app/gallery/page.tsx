"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Image1 from "../../public/1.png";
import Image2 from "../../public/2.png";
import Image3 from "../../public/3.png";
import { Button } from "@/components/ui/button";

export default function GalleryPage() {
  const router = useRouter();
  

  return (
    <motion.main className="min-h-screen w-screen relative flex flex-col items-center justify-start gap-8 bg-white">
      {/* The white ink circle that matches the button's layoutId. It will layout-animate from the small
          circle behind the button to this larger positioned element. */}
      

      {/* Reveal content after a short delay to allow the layout animation to be visible */}
      <div className="p-10 flex flex-row gap-20 justify-around items-center w-full">
     <motion.h1 layoutId="title" className="text-6xl font-serif text-primary font-bold">Gallery</motion.h1>
        <motion.div layoutId="gallery-ink" className="flex justify-between items-center">
          
          <Button variant={"outline"} onClick={() => router.back()}>
            Close
          </Button>
        </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6 w-full max-w-6xl px-10">
          <motion.div className="rounded overflow-hidden h-64 w-full relative" layoutId="image1">
            <Image src={Image1} alt="1" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </motion.div>
          <motion.div className="rounded overflow-hidden h-64 w-full relative" layoutId="image2">
            <Image src={Image2} alt="2" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </motion.div>
          <motion.div className="rounded overflow-hidden h-64 w-full relative" layoutId="image3">
            <Image src={Image3} alt="3" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </motion.div>
        </div>
    
    </motion.main>
  );
}

// (no top-level effects) all effects run inside the component
