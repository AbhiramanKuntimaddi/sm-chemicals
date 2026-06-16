"use client";

import React from "react";
import {useReveal} from "@/hooks/use-reveal";

export default function ProductsHeader() {
	const scope = useReveal<HTMLDivElement>({y: 16, blur: 4, stagger: 0.08});

	return (
		<section
			data-header-theme="dark"
			className="dark relative bg-black pt-36 pb-12 overflow-hidden selection:bg-[#8cff00] selection:text-black"
		>
			<div className="absolute inset-0 opacity-[0.05] pointer-events-none"
			     style={{
					 backgroundImage: `radial-gradient(circle at center, #8cff00 1px, transparent 1px)`,
					 backgroundSize: '40px 40px'
				 }}
			/>

			<div ref={scope} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
				<div data-reveal className="flex items-center gap-3 mb-5">
					<div className="h-px w-6 bg-[#8cff00]/60" />
					<span className="text-[10px] font-black text-[#8cff00] uppercase tracking-[0.5em]">
						Product Index
					</span>
				</div>
				<h1 data-reveal className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9] text-white">
					Chemical <span className="text-white/25 font-light italic">Portfolio.</span>
				</h1>
				<p data-reveal className="mt-5 text-sm text-white/40 font-medium uppercase tracking-[0.05em] max-w-2xl leading-relaxed">
					High-purity industrial compounds — engineered for consistency, verified for scale.
				</p>
			</div>
		</section>
	);
}
