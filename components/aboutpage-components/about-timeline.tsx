"use client";

import React from "react";
import {motion, Variants} from "framer-motion";

const timeline = [
    {
        year: "2008",
        title: "Company Founded",
        description: "SM Chemicals established in Hyderabad with a vision to provide quality chemicals to industries across India."
    },
    {
        year: "2012",
        title: "Expanded Product Range",
        description: "Added water treatment, ETP chemicals, and construction chemicals to our growing portfolio."
    },
    {
        year: "2020",
        title: "ISO Certification",
        description: "Achieved ISO 9001:2015 certification, reinforcing our commitment to quality management systems."
    },
    {
        year: "2024",
        title: "Industry Leader",
        description: "Now serving 500+ clients across 20+ industries, recognized as a trusted chemical solutions partner."
    },
];

const itemVariants: Variants = {
    initial: {opacity: 0, y: 30, filter: "blur(8px)"},
    whileInView: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {duration: 1, ease: [0.19, 1, 0.22, 1]}
    }
};

export function AboutTimeline() {
    return (
        <section
            data-header-theme="dark"
            className="dark bg-background-50 py-32 overflow-hidden border-t border-background-200 selection:bg-accent-500 selection:text-black"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-24 relative">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px w-12 bg-accent-500"/>
                        <span className="text-[10px] font-black text-accent-500 uppercase tracking-[0.6em] block">
                            Our Journey
                        </span>
                    </div>

                    <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-text-950 leading-[0.8]">
                        Milestones <br/>
                        <span className="text-text-400/30 font-light italic text-5xl md:text-7xl">of Excellence.</span>
                    </h2>

                    <div className="absolute top-0 right-0 hidden lg:block border-l border-background-200 pl-6 py-2">
                        <p className="text-[9px] text-text-400 uppercase tracking-[0.2em] leading-relaxed font-bold">
                            Chronological Data<br/>
                            Industrial Growth Archive<br/>
                            V.2024.01
                        </p>
                    </div>
                </div>

                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-background-200 border border-background-200">
                    {timeline.map((item, index) => (
                        <motion.div
                            key={item.year}
                            variants={itemVariants}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{once: true, margin: "-100px"}}
                            className="bg-background-50 p-12 hover:bg-accent-500/2 transition-colors group relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <span
                                    className="text-4xl font-light tracking-tighter text-text-950 group-hover:text-accent-500 transition-colors duration-500 block mb-8">
                                    {item.year}
                                </span>

                                <h3 className="text-accent-500 font-black uppercase tracking-[0.2em] text-[10px] mb-4">
                                    {item.title}
                                </h3>

                                <p className="text-text-400 text-sm leading-relaxed font-light">
                                    {item.description}
                                </p>
                            </div>

                            <div
                                className="absolute top-0 left-0 w-8 h-8 border-t border-l border-accent-500/0 group-hover:border-accent-500/20 transition-all duration-700"/>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}