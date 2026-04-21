"use client";

import { motion } from "framer-motion";

interface TitleProps {
    title: string;
}

export default function Title({ title }: TitleProps) {
    return(<motion.h1 layoutId="title" className="text-6xl font-serif text-primary font-bold">{title}</motion.h1>);
}
