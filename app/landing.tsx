"use client";
import { Button } from '@/components/ui/button';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function LandingSection() {
    const { scrollY } = useScroll();
    // Fade out and move up the heading as you scroll down
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
    const y = useTransform(scrollY, [0, 300], [0, -100]);

    return (
        <section className="w-screen h-[90vh] flex flex-col items-center justify-center gap-20 ">
            <motion.div style={{ opacity, y, scale }}>
                <h3>Fort Wayne, IN</h3>
                <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }} className='text-6xl font-serif'>Elevate your home to</motion.h2>
                <div className="text-6xl font-serif text-center mb-4 flex flex-col">
                    <motion.span 
                        className="gradient-background text-bold text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.8, 
                            delay: 0.3,
                            type: "spring",
                            stiffness: 100
                        }}
                        whileHover={{ 
                            scale: 1.05,
                            rotate: [-1, 1, -1, 0],
                            transition: { duration: 0.3 }
                        }}
                    >
                        Monumental
                    </motion.span>
                </div>
                <motion.h1
                initial={{ scale: 0.8, opacity: 0.95 }}
                animate={{ scale: 2, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
                whileHover={{ 
                    scale: 2.05,
                }}
                className='text-6xl font-serif text-center mb-4 flex flex-col'
                >
                    Heights
                </motion.h1>
            </motion.div>
            <div className="flex flex-row w-full justify-center items-center">
                <Button variant={'outline'} size={'lg'} className='font-bold text-lg'>
                    Find Out How We Can Help
                </Button>
            </div>
        </section>
    );
}
