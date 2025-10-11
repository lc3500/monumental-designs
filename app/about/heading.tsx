"use client";
import { Avatar } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import Image from "next/image";
import BioPhoto from "@/public/bio-photo.webp";

export default function Heading() {
    return(
        <motion.div layoutId="about-avatar" className="w-screen h-[500px] flex items-center justify-center flex-row overflow-y-auto">
                <div className="flex flex-col items-center justify-center">
                    <Avatar className="w-72 h-72">
                        <Image src={BioPhoto} alt="Nicole Setser" className="object-cover" />
                    </Avatar>
                    <h1 className="text-3xl font-semibold mt-3 font-serif">Nicole Setser</h1>
                    <h2 className="italic">Founder</h2>
                </div>
            </motion.div>
    )
}