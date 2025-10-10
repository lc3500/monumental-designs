
"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import BioPhoto from "@/public/bio-photo.webp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AboutSnippet() {
    const router = useRouter();

    return (
        <section className={`w-screen flex md:flex-row items-center justify-center gap-20 color-muted-foreground flex-col`}>
            <motion.div className="flex flex-col items-center justify-center mt-20">
                <Avatar style={{ width: 300, height: 300 }}>
                    <Image src={BioPhoto} alt="Nicole Setser" className="object-cover" />
                </Avatar>
                <h1 className="text-3xl font-semibold mt-3 font-serif">Nicole Setser</h1>
                <h2 className="italic">Founder</h2>
            </motion.div>
            <div className="flex flex-col items-center justify-center text-center ml-10 mr-10">
                <p className="text-lg max-w-xl text-left">
                    At Monumental Designs, we specialize in creating beautifully functional kitchen and bath spaces that reflect your lifestyle and taste. Whether you're building your dream home from the ground up or giving your current space a fresh new look, we’re here to guide you every step of the way...
                </p>
                <Button variant="ghost" size="lg" className="mt-6 font-bold text-lg" onClick={() => router.push('/about')}>
                    Read more
                </Button>
            </div>
        </section>
    );
}