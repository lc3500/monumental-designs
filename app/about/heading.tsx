"use client";
import { motion } from "framer-motion";
import { ProfileAvatar } from "@/components/ProfileAvatar";

interface HeadingProps {
    name: string;
    role?: string;
    photoUrl?: string;
}

export default function Heading({ name, role, photoUrl }: HeadingProps) {
    return(
        <motion.div layoutId="about-avatar" className="w-screen h-[500px] flex items-center justify-center flex-row overflow-y-auto">
                <ProfileAvatar
                    src={photoUrl || "/bio-photo.webp"}
                    alt={name}
                    name={name}
                    title={role}
                    size={288}
                />
            </motion.div>
    )
}
