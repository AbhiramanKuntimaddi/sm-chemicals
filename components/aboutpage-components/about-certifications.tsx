"use client";

import React from "react";
import {Shield, Clock, Award, CheckCircle2} from "lucide-react";
import {motion, Variants} from "framer-motion";

const itemVariants: Variants = {
    initial: {opacity: 0, y: 30, filter: "blur(8px)"},
    whileInView: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {duration: 0.8, ease: [0.19, 1, 0.22, 1]}
    }
};

export function AboutCertifications() {
    const specs = [
        {icon: Shield, title: "ISO 9001:2015", detail: "Quality Management"},
        {icon: Clock, title: "15+ Years", detail: "Industry Experience"},
        {icon: Award, title: "Certified", detail: "Safety Standards"},
        {icon: CheckCircle2, title: "Reliable", detail: "Pan-India Delivery"},
    ];

    return (
        <section
            data-header-theme="light"
            className="bg-background-50 py-32 overflow-hidden border-t border-background-200 selection:bg-accent-500 selection:text-black"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">

                    <div className="lg:sticky lg:top-32 h-fit flex flex-col justify-start">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[10px] font-black text-text-400 uppercase tracking-[0.4em]">
                                Quality Assurance
                            </span>
                        </div>

                        <h2 className="text-6xl font-bold tracking-tighter text-text-950 mb-8 leading-[0.85]">
                            Verified <br/>
                            <span className="italic font-light text-text-300">Standards.</span>
                        </h2>

                        <p className="text-lg text-text-400 max-w-sm leading-relaxed mb-8 font-light">
                            Our commitment to quality is backed by internationally recognized
                            certifications and rigorous quality control processes.
                        </p>
                    </div>

                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-background-200 border border-background-200 h-full">
                        {specs.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                initial="initial"
                                whileInView="whileInView"
                                viewport={{once: true, margin: "-50px"}}
                                className="p-12 bg-background-50 hover:bg-background-100 transition-colors duration-300 group relative overflow-hidden flex flex-col justify-between"
                            >
                                <item.icon
                                    className="w-6 h-6 text-text-950 mb-12 group-hover:text-text-500 group-hover:scale-110 transition-all duration-500"
                                />
                                <div className="space-y-1 relative z-10">
                                    <div className="font-bold text-text-950 text-xl tracking-tight">
                                        {item.title}
                                    </div>
                                    <div className="text-[10px] text-text-400 uppercase tracking-[0.2em] font-black">
                                        {item.detail}
                                    </div>
                                </div>

                                <div
                                    className="absolute top-0 right-0 w-4 h-4 border-t border-r border-background-200 opacity-0 group-hover:opacity-100 transition-opacity"/>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}