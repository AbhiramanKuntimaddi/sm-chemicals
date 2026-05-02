"use client";

import React, {useRef} from "react";
import {Shield, Microscope, Truck, Zap} from "lucide-react";
import {motion, useInView} from "framer-motion";

const features = [
    {
        name: "QC Compliance",
        stat: "99.9%",
        description: "Standardized purity across all batches.",
        icon: Shield,
    },
    {
        name: "Rapid Prototyping",
        stat: "12d",
        description: "Agile R&D for bespoke formulations.",
        icon: Microscope,
    },
    {
        name: "On-Time Delivery",
        stat: "100%",
        description: "Reliable logistics across industrial hubs.",
        icon: Truck,
    },
    {
        name: "Expert Lead Time",
        stat: "24h",
        description: "Direct engineering support and dispatch.",
        icon: Zap,
    },
];

export function FeaturesSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true, margin: "-10% 0px"});

    return (
        <section className="py-24 bg-background-950 text-white selection:bg-[#8cff00] selection:text-black">
            <div className="mx-auto max-w-7xl px-6">

                {/* ── Header: Aligned and Re-written ── */}
                <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-6">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-8 bg-[#8cff00]"/>
                            <span className="text-[10px] font-bold text-[#8cff00] uppercase tracking-[0.5em]">
                                Technical Core
                            </span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.8] text-white">
                            Precision <span className="text-white/20 font-light italic ml-2">Refined.</span>
                        </h2>
                    </div>

                    {/* Aligned to bottom of text-baseline and updated copy */}
                    <div className="max-w-[320px] lg:text-right pb-2">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed text-white/40">
                            Advanced molecular consistency delivering measurable industrial advantage.
                        </p>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="h-px w-full bg-white/10 mb-16"/>

                {/* Grid */}
                <div ref={ref}
                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
                    {features.map((feat, i) => (
                        <motion.div
                            key={feat.name}
                            initial={{opacity: 0}}
                            animate={isInView ? {opacity: 1} : {}}
                            transition={{delay: i * 0.1, duration: 0.5}}
                            className="group bg-background-950 p-8 h-80 flex flex-col justify-between transition-colors hover:bg-white/2"
                        >
                            <div className="flex justify-between items-start">
                                <div
                                    className="p-2 bg-white/5 border border-white/10 group-hover:border-[#8cff00]/50 transition-colors">
                                    <feat.icon strokeWidth={1}
                                               className="h-5 w-5 text-white/40 group-hover:text-[#8cff00]"/>
                                </div>
                                <div className="text-right">
                                    <span className="block text-4xl font-light tracking-tighter text-white">
                                        {feat.stat}
                                    </span>
                                    <span
                                        className="block text-[9px] font-black uppercase tracking-widest text-[#8cff00] mt-1">
                                        {feat.name}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-white/40 font-light leading-snug group-hover:text-white/80 transition-colors">
                                    {feat.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}