"use client";

import React from "react";
import {Shield, Clock, Award, CheckCircle2} from "lucide-react";
import {useSection} from "@/hooks/use-section";
import type {AboutCertsSection} from "@/data/about";

const specIcons = [Shield, Clock, Award, CheckCircle2];

export function AboutCertifications({content}: {content: AboutCertsSection}) {
    const scope = useSection<HTMLDivElement>({duration: 0.8, stagger: 0.1, start: "top 85%", exitY: -50});

    return (
        <section
            data-header-theme="light"
            className="bg-background-50 py-32 overflow-hidden border-t border-background-200 selection:bg-accent-500 selection:text-black"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">

                    <div className="lg:sticky lg:top-32 h-fit flex flex-col justify-start">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[11px] font-black text-text-400 uppercase tracking-[0.4em]">
                                {content.eyebrow}
                            </span>
                        </div>

                        <h2 className="text-6xl font-bold tracking-tighter text-text-950 mb-8 leading-[0.85]">
                            {content.heading} <br/>
                            <span className="italic font-light text-text-300">{content.headingAccent}</span>
                        </h2>

                        <p className="text-lg text-text-800 max-w-sm leading-relaxed mb-8 font-light">
                            {content.body}
                        </p>
                    </div>

                    <div
                        ref={scope}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-background-200 border border-background-200 h-full">
                        {content.specs.map((item, i) => {
                            const Icon = specIcons[i] ?? Shield;
                            return (
                            <div
                                key={i}
                                data-reveal
                                className="p-12 bg-background-50 hover:bg-background-100 transition-colors duration-300 group relative overflow-hidden flex flex-col justify-between"
                            >
                                <Icon
                                    className="w-6 h-6 text-text-950 mb-12 group-hover:text-text-500 group-hover:scale-110 transition-all duration-500"
                                />
                                <div className="space-y-1 relative z-10">
                                    <div className="font-bold text-text-950 text-xl tracking-tight">
                                        {item.title}
                                    </div>
                                    <div className="text-[11px] text-text-400 uppercase tracking-[0.2em] font-black">
                                        {item.detail}
                                    </div>
                                </div>

                                <div
                                    className="absolute top-0 right-0 w-4 h-4 border-t border-r border-background-200 opacity-0 group-hover:opacity-100 transition-opacity"/>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
