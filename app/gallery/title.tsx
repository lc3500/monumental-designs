"use client";

import { motion } from "framer-motion";

export default function Title() {
    return(<motion.h1 layoutId="title" className="text-6xl font-serif text-primary font-bold">Gallery</motion.h1>);
}