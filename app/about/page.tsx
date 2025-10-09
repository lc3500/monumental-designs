"use client";
import { Avatar } from "@/components/ui/avatar";
import Header from "../header";
import { motion } from "framer-motion";

export default function AboutMe() {
    return (
        <main className="pt-20">
            <Header />
            <motion.div layoutId="about-avatar" className="w-screen h-[500px] flex items-center justify-center flex-row">
                <div className="flex flex-col items-center justify-center">
                <Avatar className="bg-primary p-32" />
                <h1 className="text-3xl font-semibold mt-3 font-serif">Nicole Setser</h1>
                <h2 className="italic">Founder</h2>
            </div>
            </motion.div>
            <section className="pl-20 pr-20 pb-20 text-lg text-justify">
                <p>...amet consectetur adipisicing elit. Atque ut optio architecto necessitatibus similique repudiandae, quaerat blanditiis, eum officia, vitae ea! Reprehenderit exercitationem quibusdam, similique nihil ipsam minus cupiditate eaque!
                Ipsum voluptatibus similique totam animi nostrum. Vel harum, sunt velit quia voluptatum dolores cupiditate tenetur iure sapiente, provident atque illo esse id quo commodi iste quas ratione. Nemo, minus velit!
                Laudantium autem doloremque fugiat, possimus repellat consectetur nisi perspiciatis fugit excepturi id veritatis quidem eius delectus. Tempore expedita iusto, suscipit architecto ut voluptas eos vitae quis. Possimus quam quidem reiciendis.
                Voluptate deserunt ratione amet quam necessitatibus consequatur natus laudantium neque culpa! Vel vero alias ipsa, nostrum, repellat ea cumque autem, nobis sequi illum aut culpa vitae labore architecto quibusdam expedita!</p>
            </section>
        </main>
    )
}