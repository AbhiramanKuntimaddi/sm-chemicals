"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";

export function CtaSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-80px" });

	return (
		<section className="relative py-28 bg-slate-50 overflow-hidden">
			{/* Section ambient */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
				<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
				<div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-[110px]" />
				<div className="absolute bottom-[5%] left-[5%] w-[300px] h-[300px] bg-slate-200/60 rounded-full blur-[90px]" />
			</div>

			<div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8" data-header-theme="light">
				<motion.div
					initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
					animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
					transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
					className="relative rounded-3xl overflow-hidden"
				>
					{/* Blue card background */}
					<div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900" />

					{/* Grid texture */}
					<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />

					{/* Radial glows */}
					<div className="absolute -top-24 -right-24 w-[480px] h-[480px] bg-blue-400/20 rounded-full blur-[100px]" />
					<div className="absolute -bottom-16 -left-16 w-[320px] h-[320px] bg-indigo-600/20 rounded-full blur-[80px]" />

					{/* Top shimmer */}
					<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

					{/* Border */}
					<div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />

					{/* ── Content ── */}
					<div className="relative z-10 px-8 py-16 sm:px-14 lg:px-20 lg:py-20">
						<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-14">

							{/* Left */}
							<div className="max-w-xl">
								<motion.div
									initial={{ opacity: 0, x: -16 }}
									animate={isInView ? { opacity: 1, x: 0 } : {}}
									transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
									className="relative pl-5 border-l border-white/25"
								>
									<span className="text-[9px] font-bold text-blue-200/60 uppercase tracking-[0.4em] block mb-4">
										Get in Touch
									</span>
									<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tighter leading-[0.95]">
										Ready to Transform
										<span className="block text-blue-200/60 font-light italic mt-1">
											Your Supply Chain?
										</span>
									</h2>
									<p className="mt-6 text-[14px] text-blue-100/50 font-light leading-relaxed max-w-md">
										Partner with SM Chemicals for reliable, high-quality formulations.
										Get a customised quote tailored to your exact requirements.
									</p>
								</motion.div>

								{/* CTAs */}
								<motion.div
									initial={{ opacity: 0, y: 12 }}
									animate={isInView ? { opacity: 1, y: 0 } : {}}
									transition={{ delay: 0.38, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
									className="mt-10 flex flex-wrap items-center gap-4"
								>
									<Link
										href="/contact"
										className="group inline-flex items-center gap-2 h-12 px-8 rounded-full bg-white text-blue-700
                      text-[13px] font-semibold
                      shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_55px_rgba(255,255,255,0.35)]
                      hover:bg-blue-50 transition-all duration-400"
									>
										Request a Quote
										<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
									</Link>

									<Link
										href="/products"
										className="inline-flex items-center gap-2 h-12 px-8 rounded-full border border-white/25
                      text-white/80 text-[13px] font-medium
                      hover:border-white/50 hover:text-white hover:bg-white/10
                      transition-all duration-400"
									>
										View Products
									</Link>
								</motion.div>
							</div>

							{/* Right: contact cards */}
							<motion.div
								initial={{ opacity: 0, x: 16 }}
								animate={isInView ? { opacity: 1, x: 0 } : {}}
								transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
								className="flex flex-col gap-3 lg:min-w-[300px]"
							>
								{[
									{
										href: "tel:+919876543210",
										icon: Phone,
										label: "Call us now",
										value: "+91 98765 43210",
									},
									{
										href: "mailto:info@smchemicals.co.in",
										icon: Mail,
										label: "Email us at",
										value: "info@smchemicals.co.in",
									},
								].map((item, i) => (
									<motion.a
										key={item.href}
										href={item.href}
										initial={{ opacity: 0, y: 12 }}
										animate={isInView ? { opacity: 1, y: 0 } : {}}
										transition={{
											delay: 0.45 + i * 0.1,
											duration: 0.8,
											ease: [0.16, 1, 0.3, 1],
										}}
										whileHover={{ y: -2, transition: { duration: 0.25 } }}
										className="group flex items-center gap-4 px-5 py-4 rounded-2xl
                      bg-white/[0.07] hover:bg-white/[0.13]
                      border border-white/[0.1] hover:border-white/[0.22]
                      transition-all duration-400"
									>
										<div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl
                      bg-white/10 border border-white/10 text-white
                      group-hover:bg-white group-hover:text-blue-700 group-hover:border-white
                      transition-all duration-500">
											<item.icon strokeWidth={1.5} className="h-[18px] w-[18px]" />
										</div>
										<div>
											<div className="text-[10px] font-medium text-white/40 uppercase tracking-[0.15em] mb-0.5">
												{item.label}
											</div>
											<div className="text-[14px] font-semibold text-white/85 group-hover:text-white transition-colors duration-300">
												{item.value}
											</div>
										</div>
									</motion.a>
								))}
							</motion.div>

						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}