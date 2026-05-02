"use client";

import React, {useRef} from "react";
import Link from "next/link";
import {motion, useInView} from "framer-motion";
import {ArrowRight} from "lucide-react";

export function CtaSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true, margin: "-10%"});

    return (
        <section
            className="relative py-32 bg-background-50 text-text-950 overflow-hidden selection:bg-background-500 selection:text-black">

            <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">

                <div className="flex flex-col items-center text-center mb-16">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px w-8 bg-background-500"/>
                        <span className="text-[10px] font-black text-text-400 uppercase tracking-[0.5em]">
                      Direct Contact
                   </span>
                        <div className="h-px w-8 bg-background-500"/>
                    </div>

                    <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.85] text-text-950 max-w-4xl">
                        Ready to Transform <br/>
                        <span className="text-text-400 font-light italic">Your Supply Chain?</span>
                    </h2>
                </div>

                <div className="flex flex-col items-center justify-center">

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={isInView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.8, ease: [0.19, 1, 0.22, 1]}}
                        className="flex flex-col items-center"
                    >
                        <p className="text-[14px] md:text-[16px] text-text-500 font-medium leading-relaxed mb-12 text-center max-w-2xl uppercase tracking-tight">
                            Partner with <span className="text-text-950 font-black">SM Chemicals</span> for reliable,
                            high-purity industrial compounds tailored to your exact requirements.
                        </p>

                        <div className="flex flex-wrap justify-center gap-8 mb-20">
                            <Link
                                href="/contact"
                                className="group relative h-16 px-12 flex items-center justify-center bg-text-950 text-background-50 rounded-sm overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                            >
                                <div
                                    className="absolute inset-0 bg-background-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]"/>
                                <span
                                    className="relative z-10 text-[11px] font-black uppercase tracking-[0.4em] group-hover:text-black transition-colors duration-500">
                            Request a Quote
                         </span>
                            </Link>

                            <Link
                                href="/products"
                                className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-text-400 hover:text-text-950 transition-colors duration-500"
                            >
                                Explore Catalogue
                                <ArrowRight className="h-4 w-4"/>
                            </Link>
                        </div>
                    </motion.div>

                    <div
                        className="flex flex-col md:flex-row items-center gap-12 md:gap-24 py-12 border-t border-background-200 w-full justify-center">
                        {[
                            {
                                href: "tel:+919876543210",
                                label: "Direct Line",
                                value: "+91 98765 43210",
                            },
                            {
                                href: "mailto:info@smchemicals.co.in",
                                label: "Official Inquiry",
                                value: "info@smchemicals.co.in",
                            },
                        ].map((item, i) => (
                            <motion.a
                                key={item.href}
                                href={item.href}
                                initial={{opacity: 0}}
                                animate={isInView ? {opacity: 1} : {}}
                                transition={{delay: 0.3 + i * 0.1}}
                                className="group flex flex-col items-center text-center"
                            >
                         <span className="text-[10px] font-black text-background-500 uppercase tracking-[0.4em] mb-3">
                            {item.label}
                         </span>
                                <span
                                    className="text-lg md:text-xl text-text-950 font-light tracking-tight group-hover:text-background-500 transition-colors duration-500">
                            {item.value}
                         </span>
                            </motion.a>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}