"use client";

import React, { useEffect, useRef, useState, MouseEvent } from "react";
import {
	Droplets, Factory, Building2, Shirt, Pill,
	Paintbrush, Milk, Zap, Waves, Fuel, ArrowUpRight, MoveRight,
} from "lucide-react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

const industries = [
	{
		name: "Water Treatment",
		icon: Droplets,
		description: "Advanced purification and chemical dosing systems for municipal and industrial water networks.",
		tag: "Core Vertical",
		span: "lg:col-span-2 lg:row-span-2",
		featured: true,
	},
	{ name: "ETP / STP Plants",   icon: Factory,    description: "Complete effluent treatment systems" },
	{ name: "Construction",       icon: Building2,  description: "Waterproofing & admixtures" },
	{ name: "Textiles",           icon: Shirt,      description: "Dyes & finishing agents" },
	{ name: "Pharmaceuticals",    icon: Pill,       description: "API intermediates" },
	{ name: "Paints & Coatings",  icon: Paintbrush, description: "Resins & functional additives" },
	{ name: "Food & Beverage",    icon: Milk,       description: "Processing chemicals" },
	{ name: "Power Plants",       icon: Zap,        description: "Boiler & cooling treatment" },
	{ name: "Swimming Pools",     icon: Waves,      description: "Sanitation & maintenance" },
	{ name: "Oil & Gas",          icon: Fuel,       description: "Refining chemicals" },
];

// ─── Tilt card shell ─────────────────────────────────────────────────────────
function TiltCard({
	children,
	className = "",
	delay = 0,
}: {
	children: React.ReactNode;
	className?: string;
	delay?: number;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-60px" });
	const mx = useMotionValue(0);
	const my = useMotionValue(0);
	const sx = useSpring(mx, { stiffness: 130, damping: 26 });
	const sy = useSpring(my, { stiffness: 130, damping: 26 });
	const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5]);
	const rotateY = useTransform(sx, [-0.5, 0.5], [-5, 5]);

	function onMove(e: MouseEvent<HTMLDivElement>) {
		const r = e.currentTarget.getBoundingClientRect();
		mx.set((e.clientX - r.left) / r.width - 0.5);
		my.set((e.clientY - r.top) / r.height - 0.5);
		e.currentTarget.style.setProperty("--cx", `${e.clientX - r.left}px`);
		e.currentTarget.style.setProperty("--cy", `${e.clientY - r.top}px`);
	}

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
			animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
			transition={{ delay, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
			onMouseMove={onMove}
			onMouseLeave={() => { mx.set(0); my.set(0); }}
			style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
			className={`group relative rounded-2xl overflow-hidden ${className}`}
		>
			{/* Border */}
			<div className="absolute inset-0 rounded-2xl border border-slate-200 pointer-events-none z-20 group-hover:border-blue-200 transition-colors duration-500" />
			{/* Spotlight */}
			<div
				className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"
				style={{
					background: `radial-gradient(260px circle at var(--cx) var(--cy), rgba(59,130,246,0.06), transparent 70%)`,
				}}
			/>
			{/* Top edge shimmer on hover */}
			<div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

			<div style={{ transform: "translateZ(16px)" }} className="relative z-10 h-full">
				{children}
			</div>
		</motion.div>
	);
}

// ─── Featured card ────────────────────────────────────────────────────────────
function FeaturedCard({ industry, delay }: { industry: (typeof industries)[0]; delay: number }) {
	return (
		<TiltCard className="h-full" delay={delay}>
			<Link href="/products" className="flex flex-col justify-between h-full p-8 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.05)]">
				{/* Decorative blob */}
				<div className="absolute bottom-0 right-0 w-52 h-52 bg-blue-50 rounded-full blur-3xl pointer-events-none" />

				{/* Top */}
				<div className="flex items-start justify-between">
					<span className="text-[9px] font-bold tracking-[0.3em] uppercase text-blue-500/60">
						{industry.tag}
					</span>
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500">
						<industry.icon strokeWidth={1.5} className="h-5 w-5" />
					</div>
				</div>

				{/* Bottom */}
				<div>
					<h3 className="text-3xl font-bold tracking-tight text-slate-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors duration-400">
						{industry.name}
					</h3>
					<p className="text-[13px] text-slate-400 font-light leading-relaxed max-w-[220px] mb-6">
						{industry.description}
					</p>
					<div className="inline-flex items-center gap-2 text-[11px] font-semibold text-blue-500 group-hover:text-blue-600 transition-colors">
						View solutions
						<MoveRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
					</div>
				</div>
			</Link>
		</TiltCard>
	);
}

// ─── Standard card ────────────────────────────────────────────────────────────
function IndustryCard({
	industry,
	delay,
	isMobile = false,
}: {
	industry: (typeof industries)[0];
	delay: number;
	isMobile?: boolean;
}) {
	return (
		<TiltCard className="h-full" delay={delay}>
			<Link
				href="/products"
				className="flex flex-col justify-between h-full p-5 lg:p-6 bg-white shadow-[0_1px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow duration-500"
			>
				{/* Icon + arrow */}
				<div className="flex items-start justify-between">
					<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500">
						<industry.icon strokeWidth={1.5} className="h-4 w-4" />
					</div>
					<div className="opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-400">
						<ArrowUpRight className="h-3.5 w-3.5 text-blue-500" />
					</div>
				</div>

				{/* Name + description */}
				<div className={isMobile ? "mt-14" : ""}>
					<h3 className="text-[14px] lg:text-[15px] font-bold tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors duration-400 leading-snug">
						{industry.name}
					</h3>
					<p className="mt-1 text-[11px] text-slate-400 font-light leading-snug group-hover:text-slate-500 transition-colors duration-400">
						{industry.description}
					</p>
				</div>
			</Link>
		</TiltCard>
	);
}

// ─── CTA card ─────────────────────────────────────────────────────────────────
function CtaCard({ delay }: { delay: number }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-60px" });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
			animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
			transition={{ delay, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
			className="lg:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer"
		>
			<div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15),transparent_60%)]" />
			<div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500/30 rounded-full blur-2xl pointer-events-none" />
			<div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />

			<Link href="/products" className="relative z-10 flex items-center justify-between h-full px-7 py-6">
				<div>
					<div className="text-[9px] font-bold tracking-[0.3em] uppercase text-blue-200/70 mb-2">
						All Industries
					</div>
					<div className="text-lg font-bold text-white group-hover:text-blue-50 transition-colors duration-400">
						Explore full catalogue
					</div>
				</div>
				<div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 border border-white/20 group-hover:bg-white group-hover:border-white transition-all duration-500">
					<MoveRight className="h-4 w-4 text-white group-hover:text-blue-600 transition-colors duration-300" />
				</div>
			</Link>
		</motion.div>
	);
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function IndustriesSection() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
		if (isPaused) return;
		const interval = setInterval(() => {
			if (scrollRef.current && window.innerWidth < 1024) {
				const { scrollLeft, offsetWidth, scrollWidth } = scrollRef.current;
				if (scrollLeft >= scrollWidth - offsetWidth - 10) {
					scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
				} else {
					scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
				}
			}
		}, 4000);
		return () => clearInterval(interval);
	}, [isPaused]);

	return (
		<section id="industries" className="relative py-28 bg-slate-50 overflow-hidden" data-header-theme="light">
			<style jsx global>{`
				.hide-scrollbar::-webkit-scrollbar { display: none; }
				.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
			`}</style>

			{/* Subtle ambient layers */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
				<div className="absolute top-[15%] right-[5%] w-[420px] h-[420px] bg-blue-100/50 rounded-full blur-[110px]" />
				<div className="absolute bottom-[10%] left-[5%] w-[320px] h-[320px] bg-slate-200/70 rounded-full blur-[90px]" />
			</div>

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

				{/* ── Header ── */}
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-14 lg:mb-20 gap-8">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
						className="relative pl-5 border-l-2 border-blue-500/50"
					>
						<span className="text-[9px] font-bold text-blue-500/70 uppercase tracking-[0.4em] block mb-3">
							Market Verticals
						</span>
						<h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900 leading-none">
							Industry{" "}
							<span className="text-slate-300 font-light">Sectors.</span>
						</h2>
					</motion.div>

					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2, duration: 1 }}
						className="max-w-[260px] text-slate-400 font-light leading-relaxed text-[13px]"
					>
						High-purity chemical engineering for India&apos;s most demanding industrial sectors.
					</motion.p>
				</div>

				{/* ── Mobile carousel ── */}
				<div
					ref={scrollRef}
					onMouseEnter={() => setIsPaused(true)}
					onMouseLeave={() => setIsPaused(false)}
					className="lg:hidden hide-scrollbar flex overflow-x-auto gap-3 pb-8 snap-x snap-mandatory -mx-6 px-6"
				>
					{industries.map((industry) => (
						<div key={industry.name} className="min-w-[80%] sm:min-w-[44%] snap-center h-44">
							{industry.featured
								? <FeaturedCard industry={industry} delay={0} />
								: <IndustryCard industry={industry} delay={0} isMobile />
							}
						</div>
					))}
				</div>

				{/* ── Desktop bento grid ── */}
				<div className="hidden lg:grid grid-cols-5 gap-3 auto-rows-[170px] [perspective:1200px]">
					{/* Featured 2×2 */}
					<div className="col-span-2 row-span-2">
						<FeaturedCard industry={industries[0]} delay={0.05} />
					</div>

					{/* Row 1, cols 3–5 */}
					{industries.slice(1, 4).map((ind, i) => (
						<div key={ind.name} className="col-span-1">
							<IndustryCard industry={ind} delay={0.1 + i * 0.06} />
						</div>
					))}

					{/* Row 2, cols 3–5 */}
					{industries.slice(4, 7).map((ind, i) => (
						<div key={ind.name} className="col-span-1">
							<IndustryCard industry={ind} delay={0.22 + i * 0.06} />
						</div>
					))}

					{/* Row 3 — 3 cards + CTA */}
					{industries.slice(7, 10).map((ind, i) => (
						<div key={ind.name} className="col-span-1">
							<IndustryCard industry={ind} delay={0.34 + i * 0.06} />
						</div>
					))}
					<CtaCard delay={0.46} />
				</div>

			</div>
		</section>
	);
}