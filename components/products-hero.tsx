"use client";

import { motion } from "framer-motion";

export default function ProductsHeader() {
	return (
		<section className="relative bg-white pt-32 pb-16 border-b border-slate-100" data-header-theme="light">
			{/* Subtle "Data Grid" background - barely visible */}
			<div
				className="absolute inset-0 opacity-[0.015] pointer-events-none"
				style={{
					backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
					backgroundSize: "32px 32px",
				}}
			/>

			<div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
					<div className="max-w-2xl">
						{/* Sharp, Balanced Headline */}
						<motion.h1
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
							Chemical{" "}
							<span className="text-slate-400 font-light italic">
								Portfolio
							</span>
						</motion.h1>

						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2, duration: 1 }}
							className="mt-5 text-slate-500 text-base leading-relaxed font-light max-w-lg">
							A high-precision index of industrial formulations across eight
							core sectors. Select a category to view technical specifications.
						</motion.p>
					</div>

					{/* Functional Detail: Replacing "Loud Stats" with "Technical Metadata" */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
						className="flex items-center gap-8 py-3 px-6 bg-slate-50 rounded-full border border-slate-100">
						<div className="flex flex-col">
							<span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
								Update
							</span>
							<span className="text-xs font-medium text-slate-700">
								Q1 2026
							</span>
						</div>
						<div className="w-px h-6 bg-slate-200" />
						<div className="flex flex-col">
							<span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
								Compliance
							</span>
							<span className="text-xs font-medium text-slate-700">
								ISO/REACH
							</span>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
