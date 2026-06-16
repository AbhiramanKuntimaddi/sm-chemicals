"use client";

import React from "react";
import {
    Fish, Building2, Wind, Recycle, WashingMachine, Atom,
    Newspaper, Zap, Filter, Shirt, Flame, Car, FlaskConical,
    ArrowUpRight, type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import {useReveal} from "@/hooks/use-reveal";
import {productCategories} from "@/data/products";

const META: Record<string, { icon: LucideIcon; tagline: string }> = {
    aquaculture: {icon: Fish, tagline: "Shrimp & Fish Farming"},
    construction: {icon: Building2, tagline: "Concrete Admixtures"},
    cooling: {icon: Wind, tagline: "Cooling Water Circuits"},
    etp: {icon: Recycle, tagline: "Effluent & Sewage"},
    laundry: {icon: WashingMachine, tagline: "Industrial Laundry"},
    polymer: {icon: Atom, tagline: "Coagulants & Dispersants"},
    "pulp-paper": {icon: Newspaper, tagline: "Paper Manufacturing"},
    "power-plant": {icon: Zap, tagline: "Power Generation"},
    ro: {icon: Filter, tagline: "Reverse Osmosis"},
    textile: {icon: Shirt, tagline: "Textile Processing"},
    "water-boiler": {icon: Flame, tagline: "Boiler Water Treatment"},
    automobile: {icon: Car, tagline: "Automotive Care"},
    other: {icon: FlaskConical, tagline: "Specialty Chemicals"},
};

export function IndustriesSection() {
    const scope = useReveal<HTMLDivElement>({scroll: true, y: 20, blur: 4, stagger: 0.05, duration: 0.8, start: "top 90%"});

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
                            {productCategories.length} product categories engineered for India&apos;s critical infrastructure.
                        </p>
                    </div>
                </div>

                <div
                    ref={scope}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-l border-t border-background-200"
                >
                    {productCategories.map((cat) => {
                        const meta = META[cat.id] ?? {icon: FlaskConical, tagline: "Specialty Chemicals"};
                        const Icon = meta.icon;
                        return (
                            <div key={cat.id} data-reveal className="bg-background-50 group border-r border-b border-background-200">
                                <Link
                                    href="/products"
                                    onClick={() => sessionStorage.setItem("smc:scrollCategory", cat.id)}
                                    className="relative flex flex-col h-72 p-8 transition-all duration-500 overflow-hidden"
                                >
                                    <div
                                        className="absolute inset-0 bg-background-500 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1] z-0"/>

                                    <div
                                        className="absolute top-0 left-0 w-full h-px bg-background-500 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out z-20"/>

                                    <div className="flex flex-col h-full relative z-10">
                                        <div className="mb-8">
                                            <Icon
                                                strokeWidth={1}
                                                className="h-10 w-10 text-text-400 group-hover:text-black transition-all duration-500"
                                            />
                                        </div>

                                        <div className="mt-auto">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-text-300 group-hover:text-black/60 transition-colors duration-500 block mb-2">
                                                {String(cat.products.length).padStart(2, "0")} Products
                                            </span>
                                            <h3 className="text-[14px] font-black uppercase tracking-[0.2em] text-text-950 group-hover:text-black mb-2 transition-colors duration-500 leading-tight">
                                                {cat.name}
                                            </h3>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-text-400 group-hover:text-black/70 leading-tight transition-colors duration-500">
                                                {meta.tagline}
                                            </p>
                                        </div>

                                        <div className="absolute top-0 right-0">
                                            <ArrowUpRight
                                                className="h-5 w-5 text-text-300 group-hover:text-black transition-all duration-500 p-1"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>

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
