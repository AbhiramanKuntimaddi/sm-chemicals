"use client";

import React, { useState, useEffect, useRef, MouseEvent } from "react";
import Link from "next/link";
import {
	motion,
	AnimatePresence,
	useMotionValue,
	useSpring,
	useTransform,
	useInView,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const words = [
	"Water Treatment",
	"Construction",
	"Pharmaceuticals",
	"Textiles",
	"Power Plants",
];

const stats = [
	{
		value: "15+",
		label: "Years",
		desc: "Industry leadership",
		sub: "since 2008",
		delay: 0,
	},
	{
		value: "20+",
		label: "Sectors",
		desc: "Tailored solutions",
		sub: "across industries",
		delay: 0.08,
	},
	{
		value: "100+",
		label: "Products",
		desc: "High-purity",
		sub: "formulations",
		delay: 0.16,
	},
	{
		value: "500+",
		label: "Partners",
		desc: "Global enterprise",
		sub: "clients",
		delay: 0.24,
	},
	{
		value: "99.9%",
		label: "Purity",
		desc: "Quality assured",
		sub: "every batch",
		delay: 0.32,
	},
];

// Animated Counter
function Counter({ value, inView }: { value: string; inView: boolean }) {
	const numericPart = parseFloat(value.replace(/[^0-9.]/g, ""));
	const suffix = value.replace(/[0-9.]/g, "");
	const spring = useSpring(0, { stiffness: 35, damping: 18, mass: 1 });
	const displayValue = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

	useEffect(() => {
		if (inView) {
			const t = setTimeout(() => spring.set(numericPart), 300);
			return () => clearTimeout(t);
		}
	}, [inView, spring, numericPart]);

	return <motion.span className="tabular-nums">{displayValue}</motion.span>;
}

// Stat Card — flat lift + shimmer hover
function StatCard({
	stat,
	index,
	delay,
}: {
	stat: (typeof stats)[0];
	index: number;
	delay: number;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-50px" });
	const isWide = index === 0;

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
			animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
			transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
			whileHover={{
				y: -4,
				transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
			}}
			className={`group relative rounded-2xl overflow-hidden cursor-default select-none ${isWide ? "col-span-2" : "col-span-1"}`}>
			{/* Base */}
			<div className="absolute inset-0 bg-[#080d1a]" />

			{/* Rising blue wash on hover */}
			<div className="absolute inset-0 bg-linear-to-t from-blue-950/60 via-blue-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

			{/* Border */}
			<div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-blue-500/25 transition-colors duration-500 pointer-events-none" />

			{/* Top shimmer — slides in from left */}
			<div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-400/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />

			{/* Bottom glow pool */}
			<div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2/3 h-12 bg-blue-600/15 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

			{/* Content */}
			<div className="relative z-10 p-5 h-full flex flex-col justify-between min-h-32.5">
				{/* Label + dot */}
				<div className="flex items-center justify-between">
					<span className="text-[9px] font-bold tracking-[0.25em] uppercase text-blue-400/60 group-hover:text-blue-400/90 transition-colors duration-500">
						{stat.label}
					</span>
					<div className="w-1.5 h-1.5 rounded-full bg-blue-500/30 group-hover:bg-blue-400 group-hover:shadow-[0_0_8px_rgba(59,130,246,0.9)] transition-all duration-500" />
				</div>

				{/* Number */}
				<div
					className={`font-bold text-white tracking-tighter leading-none ${isWide ? "text-6xl" : "text-4xl"}`}>
					<Counter value={stat.value} inView={isInView} />
				</div>

				{/* Description */}
				<div className="space-y-0.5">
					<div className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-300 transition-colors duration-500">
						{stat.desc}
					</div>
					<div className="text-[10px] text-slate-600 group-hover:text-slate-500 font-medium transition-colors duration-500">
						{stat.sub}
					</div>
				</div>
			</div>
		</motion.div>
	);
}

// Main Hero
export default function HeroSection() {
	const [wordIndex, setWordIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(
			() => setWordIndex((prev) => (prev + 1) % words.length),
			3500,
		);
		return () => clearInterval(interval);
	}, []);

	return (
		<section
			data-header-theme="dark"
			className="relative min-h-screen flex flex-col bg-[#020617] overflow-hidden"
			style={{ paddingTop: "clamp(6rem, 12vw, 9rem)", paddingBottom: "4rem" }}>
			{/* ── Ambient ── */}
			<div className="absolute inset-0 pointer-events-none">
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 2.5, ease: "easeOut" }}
					className="absolute top-[-15%] right-[-5%] w-175 h-175 bg-blue-600/8 rounded-full blur-[140px]"
				/>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 3, delay: 0.5 }}
					className="absolute bottom-[-20%] left-[-10%] w-125 h-125 bg-indigo-700/6 rounded-full blur-[120px]"
				/>
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:36px_36px]" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,#020617_100%)]" />
			</div>

			<div className="relative z-10 flex-1 flex flex-col justify-center">
				<div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 w-full">
					<div className="flex flex-col lg:flex-row gap-14 lg:gap-28 items-center">
						{/* ── Left ── */}
						<div className="flex-[1.5] max-w-3xl w-full">
							{/* Eyebrow — Est. badge */}
							<motion.div
								initial={{ opacity: 0, y: -12 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
								className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/3 border border-white/[0.07] mb-6 lg:mb-8 self-start">
								<motion.div
									animate={{ opacity: [0.4, 1, 0.4] }}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: "easeInOut",
									}}
									className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"
									style={{ boxShadow: "0 0 8px rgba(96,165,250,0.9)" }}
								/>
								<span className="text-[9px] font-bold text-blue-300/70 tracking-[0.35em] uppercase">
									Est. 2008 · Industrial Chemistry
								</span>
							</motion.div>

							{/* Headline */}
							<motion.h1
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.15, duration: 0.6 }}
								className="text-[2.8rem] sm:text-6xl md:text-[5.5rem] font-bold tracking-tight leading-[0.92]">
								{/* SM Chemicals — same size as Engineering */}
								<motion.span
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										delay: 0.2,
										duration: 1,
										ease: [0.16, 1, 0.3, 1],
									}}
									className="block text-white">
									SM Chemicals
								</motion.span>
								<motion.span
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										delay: 0.28,
										duration: 1,
										ease: [0.16, 1, 0.3, 1],
									}}
									className="block text-slate-700 font-light mt-1 md:mt-2">
									Engineering
								</motion.span>
								<motion.span
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										delay: 0.36,
										duration: 1,
										ease: [0.16, 1, 0.3, 1],
									}}
									className="block text-slate-600 font-light">
									Chemicals for
								</motion.span>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										delay: 0.44,
										duration: 1,
										ease: [0.16, 1, 0.3, 1],
									}}
									className="relative flex items-center h-[1.15em] overflow-hidden text-blue-400">
									<AnimatePresence mode="wait" initial={false}>
										<motion.span
											key={words[wordIndex]}
											initial={{ y: "110%", opacity: 0, filter: "blur(12px)" }}
											animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
											exit={{ y: "-110%", opacity: 0, filter: "blur(12px)" }}
											transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
											className="absolute left-0 whitespace-nowrap pb-2">
											{words[wordIndex]}
										</motion.span>
									</AnimatePresence>
									<span className="opacity-0 pointer-events-none whitespace-nowrap">
										Pharmaceuticals
									</span>
								</motion.div>
							</motion.h1>

							{/* Description */}
							<motion.p
								initial={{ opacity: 0, y: 12 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									delay: 0.6,
									duration: 1,
									ease: [0.16, 1, 0.3, 1],
								}}
								className="mt-6 lg:mt-8 text-base md:text-lg text-slate-400/90 max-w-lg leading-relaxed font-light">
								Crafting high-precision industrial formulations that drive
								efficiency and innovation in India&apos;s most demanding
								sectors.
							</motion.p>

							{/* CTAs */}
							<motion.div
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									delay: 0.75,
									duration: 1,
									ease: [0.16, 1, 0.3, 1],
								}}
								className="mt-8 lg:mt-12 flex flex-wrap items-center gap-4">
								<Button
									size="lg"
									className="h-12 px-7 rounded-full bg-blue-600 hover:bg-blue-500 text-white border-none
										shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.45)]
										group transition-all duration-500 text-sm font-semibold tracking-wide">
									Explore Products
									<ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
								</Button>

								<button className="group flex items-center gap-3 text-sm font-medium text-slate-400 hover:text-white transition-colors duration-300">
									<div className="relative w-10 h-10 rounded-full border border-slate-700/80 flex items-center justify-center group-hover:border-blue-500/50 transition-colors duration-500 overflow-hidden">
										<div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/8 transition-colors duration-500 rounded-full" />
										<Play className="relative h-3 w-3 fill-slate-400 group-hover:fill-blue-400 ml-0.5 transition-colors duration-300" />
									</div>
									Our Story
								</button>
							</motion.div>
						</div>

						{/* ── Right: Bento cards ── */}
						<div className="flex-1 w-full max-w-full lg:max-w-100 grid grid-cols-2 gap-3">
							{stats.map((stat, index) => (
								<StatCard
									key={stat.label}
									stat={stat}
									index={index}
									delay={stat.delay + 0.5}
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Bottom fade */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#020617] to-transparent pointer-events-none" />
		</section>
	);
}
