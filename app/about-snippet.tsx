
"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import BioPhoto from "@/public/bio-photo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function AboutSnippet() {
    const router = useRouter();

    return (
        <section className={`w-screen h-[80vh] flex items-center justify-center gap-20 color-muted-foreground`}>
            <motion.div layoutId="about-avatar" className="flex flex-col items-center justify-center">
                <Avatar style={{ width: 300, height: 300 }}>
                    <Image src={BioPhoto} alt="Nicole Setser" className="object-cover" />
                </Avatar>
                <h1 className="text-3xl font-semibold mt-3 font-serif">Nicole Setser</h1>
                <h2 className="italic">Founder</h2>
            </motion.div>
            <div className="flex flex-col items-center justify-center text-center">
                <p className="text-lg max-w-xl text-left">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum neque hic repudiandae placeat aliquid officia maiores quisquam porro. Vero, modi! Consequatur porro tempora dicta vitae praesentium obcaecati amet itaque architecto!
                    Quod dicta, eum voluptate delectus ipsa nemo ex in laboriosam nihil laudantium est dolores ratione iusto quos voluptas. Laudantium asperiores sed nobis amet aspernatur molestias quos voluptatum, deserunt expedita sapiente?
                </p>
                <Button variant="ghost" size="lg" className="mt-6 font-bold text-lg" onClick={() => router.push('/about')}>
                    Read more about me
                </Button>
            </div>
        </section>
    );
}