"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    initial: { opacity: 0, y: 30, filter: "blur(8px)" },
    animate: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 1, ease: [0.19, 1, 0.22, 1] },
    },
};

export function AboutHero() {
    return (
        <section
            data-header-theme="dark"
            className="dark relative min-h-[80vh] flex flex-col bg-background-50 text-text-950 overflow-hidden"
        >
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 max-w-7xl mx-auto w-full pt-32"
            >
                <motion.div variants={itemVariants} className="flex items-center gap-6 mb-12">
                    <div className="h-px w-12 bg-accent-500/40"/>
                    <span className="text-[10px] font-black text-text-400 uppercase tracking-[1em] block text-center">
                        Est. 2008
                    </span>
                    <div className="h-px w-12 bg-accent-500/40"/>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-6xl md:text-[9rem] lg:text-[11rem] font-bold tracking-[-0.04em] leading-[0.8] text-text-950 text-center"
                >
                    The <span className="text-text-400 italic font-light">Standards.</span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="mt-16 max-w-2xl text-center text-text-400 text-sm md:text-lg font-light tracking-wide leading-relaxed"
                >
                    Since 2008, SM Chemicals has defined the intersection of
                    <span className="text-accent-500 font-normal"> high-precision engineering</span> and
                    industrial-scale supply excellence.
                </motion.p>
            </motion.div>
        </section>
    );
}