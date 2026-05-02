"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProductsHeader() {
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		// Force multiple syncs to ensure the Header logic (Source 3) catches it
		const syncTheme = () => window.dispatchEvent(new Event('scroll'));

		syncTheme();
		const timer1 = setTimeout(syncTheme, 100);
		const timer2 = setTimeout(syncTheme, 500); // Catch late layout shifts

		return () => {
			clearTimeout(timer1);
			clearTimeout(timer2);
		};
	}, []);

	return (
		<section
			ref={sectionRef}
			// This tells Header_3 to use 'text-white'
			data-header-theme="dark"
			// Use 'bg-black' to ensure there is zero ambiguity for the theme detection
			className="dark relative bg-black pt-48 pb-32 min-h-[70vh] overflow-hidden selection:bg-[#8cff00] selection:text-black w-full"
		>
			{/* Subtle Grid */}
			<div className="absolute inset-0 opacity-[0.05] pointer-events-none"
			     style={{
					 backgroundImage: `radial-gradient(circle at center, #8cff00 1px, transparent 1px)`,
					 backgroundSize: '40px 40px'
				 }}
			/>

			<div className="relative z-10 max-w-7xl mx-auto px-6">
				<div className="flex flex-col items-center text-center">
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex items-center gap-4 mb-12"
					>
						<div className="h-px w-6 bg-[#8cff00]/50" />
						<span className="text-[10px] font-black text-[#8cff00] uppercase tracking-[0.6em]">
                      Product Index
                   </span>
						<div className="h-px w-6 bg-[#8cff00]/50" />
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, scale: 0.98 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
						className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.8] text-white max-w-5xl"
					>
						Chemical <br />
						<span className="text-white/20 font-light italic">Portfolio.</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3, duration: 1 }}
						className="mt-12 text-sm md:text-base text-white/40 font-medium uppercase tracking-[0.05em] max-w-2xl leading-relaxed"
					>
						Technical specifications and safety data for high-purity industrial compounds. <br />
						<span className="text-[#8cff00]/80 italic">Engineered for consistency. Verified for scale.</span>
					</motion.p>

					<div className="mt-24 w-full max-w-2xl border-t border-b border-white/10 py-10">
						<div className="grid grid-cols-2 gap-12">
							<div className="flex flex-col items-center border-r border-white/5 text-white">
								<span className="text-[9px] font-black text-[#8cff00] uppercase tracking-[0.4em] mb-2">Update</span>
								<span className="text-sm font-light text-white/80 tabular-nums">Q1 // 2026</span>
							</div>

							<div className="flex flex-col items-center text-white">
								<span className="text-[9px] font-black text-[#8cff00] uppercase tracking-[0.4em] mb-2">Standards</span>
								<span className="text-sm font-light text-white/80 uppercase">ISO 9001:2015</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-black to-transparent" />
		</section>
	);
}