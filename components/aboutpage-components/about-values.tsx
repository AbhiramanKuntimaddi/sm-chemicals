"use client";

import { Target, Eye } from "lucide-react";

export function AboutValues() {
    return (
        <section data-header-theme="dark" className="bg-background-50 border-t border-background-200 py-24">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-background-200 border border-background-200 overflow-hidden">
                    <div className="bg-background-50 p-12 lg:p-24 hover:bg-accent-500/2 transition-colors group relative">
                        <Target className="w-10 h-10 text-text-400 mb-12 group-hover:scale-110 transition-transform duration-500" />
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-text-950 mb-8 leading-none">
                            Our <span className="italic font-light text-text-400">Mission.</span>
                        </h2>
                        <p className="text-lg text-text-400 leading-relaxed max-w-md font-light">
                            Engineering high-precision chemical solutions that drive innovation across India's infrastructure.
                        </p>
                    </div>
                    <div className="bg-background-50 p-12 lg:p-24 hover:bg-accent-500/2 transition-colors group relative">
                        <Eye className="w-10 h-10 text-text-400 mb-12 group-hover:scale-110 transition-transform duration-500" />
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-text-950 mb-8 leading-none">
                            Our <span className="italic font-light text-text-400">Vision.</span>
                        </h2>
                        <p className="text-lg text-text-400 leading-relaxed max-w-md font-light">
                            To lead the industry through molecular engineering and high-purity industrial formulations.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}