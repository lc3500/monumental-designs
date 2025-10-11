"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function MotionCloseButton() {
    const router = useRouter();

    return (<motion.div layoutId="close-button">
        <Button className="absolute right-10 top-10" variant={"outline"} onClick={() => router.replace('/')}>
            Close
        </Button>
    </motion.div>);
}