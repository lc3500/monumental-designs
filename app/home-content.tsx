"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HomeContent({ children }: { children: React.ReactNode }) {
    const { scrollY } = useScroll();
    const router = useRouter();
    const background = useTransform(scrollY, [0, 1200], ["#c39e88", "#efe6e1ff"]);

    return (
        <motion.main layoutId="background" className="transition-all duration-300 ease-in-out overflow-x-hidden pt-20" style={{ background }}>
            {children}
        </motion.main>
    );
}