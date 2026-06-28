"use client";

import React from "react";
import { useReveal } from "@/hooks/use-reveal";

export function CareersHero() {
	const scope = useReveal<HTMLDivElement>({ y: 16, blur: 4, stagger: 0.08 });

	return (
		<section
			data-header-theme="dark"
			className="dark relative bg-background-50 text-text-950 overflow-hidden pt-36 pb-12 border-b border-background-200"
		>
			<div ref={scope} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
				<div data-reveal className="flex items-center gap-3 mb-5">
					<div className="h-px w-6 bg-accent-500/60" />
					<span className="text-[11px] font-black text-text-400 uppercase tracking-[0.5em]">
						Careers
					</span>
				</div>

				<h1
					data-reveal
					className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9] text-text-950"
				>
					Join the <span className="text-text-400 italic font-light">team.</span>
				</h1>

				<p
					data-reveal
					className="mt-5 max-w-2xl text-text-400 text-lg md:text-xl font-light tracking-wide leading-relaxed"
				>
					Build the chemistry behind India's industry. We&apos;re always looking
					for <span className="text-accent-500 font-normal">curious, rigorous people</span>{" "}
					to grow with us.
				</p>
			</div>
		</section>
	);
}
