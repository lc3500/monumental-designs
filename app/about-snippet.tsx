
"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProfileAvatar } from "@/components/ProfileAvatar";

interface AboutSnippetProps {
    name: string;
    role?: string;
    photoUrl?: string;
    excerpt: string;
    ctaLabel: string;
    ctaHref: string;
}

export default function AboutSnippet({
    name,
    role,
    photoUrl,
    excerpt,
    ctaLabel,
    ctaHref,
}: AboutSnippetProps) {
    const router = useRouter();

    return (
        <section className={`w-screen flex md:flex-row items-center justify-center gap-20 color-muted-foreground flex-col`}>
            <motion.div className="flex flex-col items-center justify-center mt-20">
                <ProfileAvatar
                    src={photoUrl || "/bio-photo.webp"}
                    alt={name}
                    name={name}
                    title={role}
                    size={300}
                />
            </motion.div>
            <div className="flex flex-col items-center justify-center text-center ml-10 mr-10">
                <p className="text-lg max-w-xl text-left">
                    {excerpt}
                </p>
                <Button variant="ghost" size="lg" className="mt-6 font-bold text-lg" onClick={() => router.push(ctaHref)}>
                    {ctaLabel}
                </Button>
            </div>
        </section>
    );
}
