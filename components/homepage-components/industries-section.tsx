"use client";

import React, {useRef} from "react";
import {
    Droplets, Factory, Building2, Shirt, Pill,
    Paintbrush, Milk, Zap, Waves, Fuel, ArrowUpRight,
    LucideIcon
} from "lucide-react";
import Link from "next/link";
import {motion, useInView, Variants} from "framer-motion";

interface Industry {
    name: string;
    icon: LucideIcon;
    desc: string;
}

const industries: Industry[] = [
    {name: "Water Treatment", icon: Droplets, desc: "Purification & Dosing"},
    {name: "ETP / STP Plants", icon: Factory, desc: "Effluent Systems"},
    {name: "Construction", icon: Building2, desc: "Admixtures & Prep"},
    {name: "Textiles", icon: Shirt, desc: "Dyes & Finishing"},
    {name: "Pharmaceuticals", icon: Pill, desc: "API Intermediates"},
    {name: "Paints & Coatings", icon: Paintbrush, desc: "Resins & Additives"},
    {name: "Food & Beverage", icon: Milk, desc: "Process Chemicals"},
    {name: "Power Plants", icon: Zap, desc: "Cooling Treatment"},
    {name: "Swimming Pools", icon: Waves, desc: "Water Sanitation"},
    {name: "Oil & Gas", icon: Fuel, desc: "Refining Agents"},
];

const containerVariants: Variants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {staggerChildren: 0.05, delayChildren: 0.2},
    },
};

const itemVariants: Variants = {
    hidden: {opacity: 0, y: 20, filter: "blur(4px)"},
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {duration: 0.8, ease: [0.19, 1, 0.22, 1]}
    },
};

export function IndustriesSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {once: true, amount: 0.1});

    return (
        <section id="industries" className="py-32 bg-background-50 text-text-950 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 relative z-10">

                <div
                    className="flex flex-col md:flex-row md:items-end justify-between mb-20 border-b border-background-200 pb-12">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-px w-8 bg-background-500"/>
                            <span className="text-[10px] font-black text-text-400 uppercase tracking-[0.5em] block">
                                Sector Expertise
                            </span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-text-950 leading-[0.8]">
                            Industrial{" "}
                            <span className="text-text-400 font-light italic">
                                Scopes.
                            </span>
                        </h2>
                    </div>
                    <div className="md:text-right mt-8 md:mt-0">
                        <p className="text-[11px] text-text-500 max-w-xs leading-relaxed uppercase tracking-[0.2em] font-bold">
                            High-precision chemical formulations engineered for India&apos;s critical infrastructure.
                        </p>
                    </div>
                </div>

                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-background-200 border border-background-200"
                >
                    {industries.map((ind: Industry) => (
                        <motion.div
                            key={ind.name}
                            variants={itemVariants}
                            className="bg-background-50 group"
                        >
                            <Link
                                href="/products"
                                className="relative flex flex-col h-72 p-8 transition-all duration-500 overflow-hidden"
                            >
                                <div
                                    className="absolute inset-0 bg-background-500 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1] z-0"/>

                                <div
                                    className="absolute top-0 left-0 w-full h-px bg-background-500 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out z-20"/>

                                <div className="flex flex-col h-full relative z-10">
                                    <div className="mb-8">
                                        <ind.icon
                                            strokeWidth={1}
                                            className="h-10 w-10 text-text-400 group-hover:text-black transition-all duration-500"
                                        />
                                    </div>

                                    <div className="mt-auto">
                                        <h3 className="text-[14px] font-black uppercase tracking-[0.2em] text-text-950 group-hover:text-black mb-2 transition-colors duration-500">
                                            {ind.name}
                                        </h3>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-text-400 group-hover:text-black/70 leading-tight transition-colors duration-500">
                                            {ind.desc}
                                        </p>
                                    </div>

                                    <div className="absolute top-0 right-0">
                                        <ArrowUpRight
                                            className="h-5 w-5 text-text-300 group-hover:text-black transition-all duration-500 p-1"
                                        />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-24 flex flex-col items-center gap-6">
                    <Link
                        href="/products"
                        className="group relative h-16 px-16 flex items-center justify-center bg-text-950 text-background-50 rounded-sm overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                    >
                        <div
                            className="absolute inset-0 bg-background-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]"/>
                        <span
                            className="relative z-10 text-[11px] font-black uppercase tracking-[0.4em] text-background-50 group-hover:text-black transition-colors duration-500">
                            Explore Full Catalogue
                        </span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-background-500 animate-pulse"/>
                        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-text-400">
                            Custom Formulations Available
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}