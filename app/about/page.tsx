"use client";
import { Avatar } from "@/components/ui/avatar";
import Header from "../header";
import { motion } from "framer-motion";
import BioPhoto from "@/public/bio-photo.webp";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";


export default function AboutMe() {
    const router = useRouter();
    
    return (
        <main className="pt-20 flex flex-col items-center justify-start w-screen min-h-screen">
            <Header />
            
            <motion.div layoutId="about-avatar" className="w-screen h-[500px] flex items-center justify-center flex-row overflow-y-auto">
                <div className="flex flex-col items-center justify-center">
                    <Avatar className="w-72 h-72">
                        <Image src={BioPhoto} alt="Nicole Setser" className="object-cover" />
                    </Avatar>
                    <h1 className="text-3xl font-semibold mt-3 font-serif">Nicole Setser</h1>
                    <h2 className="italic">Founder</h2>
                </div>
            </motion.div>
            <section className="px-5 md:pl-20 md:pr-20 pb-20 text-lg text-left">
                <p>
                    At Monumental Designs, we specialize in creating beautifully functional kitchen and bath spaces that reflect your lifestyle and taste. Whether you're building your dream home from the ground up or giving your current space a fresh new look, we’re here to guide you every step of the way.


                </p>
                <br />
                <p>We’re passionate about helping homeowners bring their vision to life — especially during new construction and remodeling projects, where our expertise in layout and design can truly shine. From smart storage solutions to stunning surface finishes, we thrive on coming up with creative, personalized ideas that make your space work better and look amazing.</p>
            </section>
            <Button variant="outline" className="ml-10 mb-10 " onClick={() => router.push("/")}><ChevronLeft /> Go Home</Button>
        </main>
    )
}