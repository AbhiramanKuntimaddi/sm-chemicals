"use client";

import React, { useEffect, useRef } from "react";
import { Shield, Microscope, Users, Truck, Award, Clock } from "lucide-react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

// ─── Animated counter — handles "24/7", "99.9%", "48h" ───────────────────────
function AnimatedNumber({
	target,
	isInView,
	hasDecimal,
}: {
	target: number;
	isInView: boolean;
	hasDecimal: boolean;
}) {
	const spring = useSpring(0, { stiffness: 38, damping: 18, mass: 1 });
	const display = useTransform(spring, (v) => v.toFixed(hasDecimal ? 1 : 0));

	useEffect(() => {
		if (isInView) {
			const t = setTimeout(() => spring.set(target), 300);
			return () => clearTimeout(t);
		}
	}, [isInView, spring, target]);

	return <motion.span>{display}</motion.span>;
}

function Counter({ value }: { value: string }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-50px" });
	const parts = value.split(/([0-9.]+)/);
	return (
		<span ref={ref} className="tabular-nums">
			{parts.map((part, i) => {
				const isNum = /^[0-9.]+$/.test(part);
				return isNum ? (
					<AnimatedNumber
						key={i}
						target={parseFloat(part)}
						isInView={isInView}
						hasDecimal={part.includes(".")}
					/>
				) : (
					<span key={i}>{part}</span>
				);
			})}
		</span>
	);
}

// ─── Data ────────────────────────────────────────────────────────────────────
const features = [
	{
		name: "Quality Assured",
		description: "Rigorous multi-stage testing protocols ensure consistent, high-purity performance across every batch.",
		icon: Shield,
		stat: "99.9%",
		statLabel: "Purity rate",
	},
	{
		name: "Innovation",
		description: "Developing bespoke formulations at the frontier of industrial chemistry for evolving sector demands.",
		icon: Microscope,
		stat: "50+",
		statLabel: "Patents filed",
	},
	{
		name: "Expert Support",
		description: "Dedicated chemical engineers on call for technical guidance from molecular selection to final application.",
		icon: Users,
		stat: "24/7",
		statLabel: "Response",
	},
	{
		name: "Reliability",
		description: "Optimised last-mile logistics ensuring guaranteed delivery windows across India's industrial corridors.",
		icon: Truck,
		stat: "48h",
		statLabel: "Turnaround",
	},
];

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({
	feature,
	index,
}: {
	feature: (typeof features)[0];
	index: number;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-60px" });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
			animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
			transition={{ delay: index * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
			whileHover={{ y: -5, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
			className="group relative rounded-2xl overflow-hidden cursor-default"
		>
			{/* Base surface */}
			<div className="absolute inset-0 bg-[#080d1a]" />

			{/* Hover gradient — rising blue wash */}
			<div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-blue-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

			{/* Border */}
			<div className="absolute inset-0 rounded-2xl border border-white/[0.05] group-hover:border-blue-500/20 transition-colors duration-500 pointer-events-none z-10" />

			{/* Top shimmer */}
			<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left" />

			{/* Bottom glow pool */}
			<div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-blue-600/15 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

			{/* Content */}
			<div className="relative z-10 p-7 flex flex-col gap-8">
				{/* Top: icon + stat */}
				<div className="flex items-start justify-between">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.07] text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500">
						<feature.icon strokeWidth={1.5} className="h-5 w-5" />
					</div>

					<div className="text-right">
						<div className="text-2xl font-bold tracking-tighter text-white leading-none">
							<Counter value={feature.stat} />
						</div>
						<div className="text-[9px] font-bold uppercase tracking-[0.2em] mt-1 text-slate-600 group-hover:text-blue-400/60 transition-colors duration-500">
							{feature.statLabel}
						</div>
					</div>
				</div>

				{/* Bottom: name + description */}
				<div>
					<h3 className="text-[15px] font-bold tracking-tight text-slate-200 group-hover:text-white transition-colors duration-300 mb-2">
						{feature.name}
					</h3>
					<p className="text-[12px] text-slate-500 font-light leading-relaxed group-hover:text-slate-400 transition-colors duration-500">
						{feature.description}
					</p>
				</div>
			</div>
		</motion.div>
	);
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function FeaturesSection() {
	const headerRef = useRef(null);
	const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

	return (
		<section className="relative py-28 bg-[#020617] overflow-hidden text-white" data-header-theme="dark">
			{/* Ambient */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-blue-700/6 rounded-full blur-[130px]" />
				<div className="absolute bottom-[5%] right-[5%] w-[350px] h-[350px] bg-indigo-700/5 rounded-full blur-[100px]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:36px_36px]" />
			</div>

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

				{/* ── Header ── */}
				<div
					ref={headerRef}
					className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 lg:mb-20 gap-10"
				>
					<div className="max-w-2xl">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={headerInView ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
							className="relative pl-5 border-l border-blue-500/40"
						>
							<span className="text-[9px] font-bold text-blue-400/70 uppercase tracking-[0.4em] block mb-3">
								Why Choose Us
							</span>
							<h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.92]">
								Excellence in <br />
								<span className="text-slate-600 font-light italic">Every Formula.</span>
							</h2>
						</motion.div>
					</div>

					<motion.p
						initial={{ opacity: 0 }}
						animate={headerInView ? { opacity: 1 } : {}}
						transition={{ delay: 0.25, duration: 1 }}
						className="max-w-[260px] text-slate-500 font-light leading-relaxed text-[13px]"
					>
						Combining cutting-edge research with decades of experience to deliver
						chemical solutions that exceed expectations.
					</motion.p>
				</div>

				{/* ── Cards ── */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
					{features.map((feature, index) => (
						<FeatureCard key={feature.name} feature={feature} index={index} />
					))}
				</div>

				{/* ── Footer achievements ── */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 1, delay: 0.3 }}
					className="mt-14 pt-8 border-t border-white/[0.05] flex flex-wrap justify-center md:justify-start gap-10"
				>
					{[
						{ icon: Award, text: "ISO 9001:2015 Certified" },
						{ icon: Clock, text: "15+ Years Industrial Experience" },
					].map((item, i) => (
						<motion.div
							key={i}
							whileHover={{ opacity: 1 }}
							className="flex items-center gap-3 opacity-30 hover:opacity-100 transition-opacity duration-500 cursor-default"
						>
							<item.icon className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
							<span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-300">
								{item.text}
							</span>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}