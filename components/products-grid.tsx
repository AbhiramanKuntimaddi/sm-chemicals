"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronRight, ArrowRight, MoveRight } from "lucide-react";
import Link from "next/link";

const categories = [
	{ id: "all",          name: "All Products" },
	{ id: "water",        name: "Water Treatment" },
	{ id: "etp",          name: "ETP / STP" },
	{ id: "construction", name: "Construction" },
	{ id: "textile",      name: "Textile" },
	{ id: "pharma",       name: "Pharmaceutical" },
	{ id: "boiler",       name: "Boiler Chemicals" },
	{ id: "cooling",      name: "Cooling Tower" },
];

const products = [
	{
		id: 1, category: "water", featured: true,
		name: "Water Treatment Chemicals",
		description: "Comprehensive coagulants, flocculants, pH adjusters, and disinfectants for industrial water purification.",
		items: ["Polyaluminium Chloride (PAC)", "Ferric Chloride", "Sodium Hypochlorite", "Alum", "Caustic Soda", "Hydrochloric Acid"],
	},
	{
		id: 2, category: "etp", featured: true,
		name: "ETP / STP Chemicals",
		description: "Specialised chemicals for effluent and sewage treatment ensuring environmental compliance.",
		items: ["Anionic Polyelectrolyte", "Cationic Polyelectrolyte", "Anti-Foam Agents", "Defoamers", "Bio-Culture", "Nutrient Solutions"],
	},
	{
		id: 3, category: "construction", featured: false,
		name: "Construction Chemicals",
		description: "High-performance additives for concrete and building materials enhancing strength and durability.",
		items: ["Plasticizers", "Superplasticizers", "Waterproofing Compounds", "Curing Compounds", "Grout Additives", "Bonding Agents"],
	},
	{
		id: 4, category: "textile", featured: false,
		name: "Textile Chemicals",
		description: "Complete range for textile processing and finishing from pre-treatment to final application.",
		items: ["Softeners", "Fixing Agents", "Leveling Agents", "Anti-Pilling Agents", "Wetting Agents", "Sequestering Agents"],
	},
	{
		id: 5, category: "pharma", featured: false,
		name: "Pharmaceutical Chemicals",
		description: "High-purity chemicals for pharmaceutical manufacturing meeting stringent quality standards.",
		items: ["Solvents", "Reagents", "APIs", "Intermediates", "Excipients", "Buffer Solutions"],
	},
	{
		id: 6, category: "boiler", featured: true,
		name: "Boiler Water Chemicals",
		description: "Specialised treatment preventing scale, corrosion, and deposits in industrial boiler systems.",
		items: ["Oxygen Scavengers", "Scale Inhibitors", "Corrosion Inhibitors", "Alkalinity Builders", "Condensate Treatment", "Sludge Conditioners"],
	},
	{
		id: 7, category: "cooling", featured: false,
		name: "Cooling Tower Chemicals",
		description: "Complete water treatment for cooling systems ensuring optimal heat transfer efficiency.",
		items: ["Biocides", "Scale & Corrosion Inhibitors", "Dispersants", "pH Controllers", "Legionella Control", "Biodispersants"],
	},
	{
		id: 8, category: "etp", featured: false,
		name: "Sludge Treatment",
		description: "Solutions for sludge dewatering, thickening, and management in treatment facilities.",
		items: ["Dewatering Polymers", "Thickening Agents", "Conditioning Chemicals", "Odor Control", "Sludge Digesters"],
	},
];

// Product Card
function ProductCard({ product, index }: { product: (typeof products)[0]; index: number }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-60px" });
	const categoryName = categories.find(c => c.id === product.category)?.name;

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
			animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
			transition={{ delay: (index % 3) * 0.08, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
			whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
			className="group relative rounded-2xl overflow-hidden cursor-default bg-white flex flex-col"
			style={{ boxShadow: "0 1px 12px rgba(0,0,0,0.05)" }}
		>
			{/* Hover fill */}
			<div className="absolute inset-0 bg-linear-to-t from-blue-50/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

			{/* Border */}
			<div className="absolute inset-0 rounded-2xl border border-slate-100 group-hover:border-blue-200 transition-colors duration-500 pointer-events-none" />

			{/* Top shimmer */}
			<div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-400/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

			{/* Bottom glow */}
			<div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2/3 h-10 bg-blue-500/8 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

			<div className="relative z-10 p-7 flex flex-col flex-1">
				{/* Top row */}
				<div className="flex items-start justify-between mb-6">
					<span className="inline-flex items-center text-[9px] font-bold uppercase tracking-[0.25em] text-blue-500/70 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
						{categoryName}
					</span>
					{product.featured && (
						<span className="inline-flex items-center text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
							Popular
						</span>
					)}
				</div>

				{/* Name */}
				<h3 className="text-[17px] font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors duration-400 leading-snug mb-3">
					{product.name}
				</h3>

				{/* Description */}
				<p className="text-[13px] text-slate-400 font-light leading-relaxed mb-6">
					{product.description}
				</p>

				{/* Items list */}
				<ul className="space-y-2 mb-8 flex-1">
					{product.items.slice(0, 4).map((item) => (
						<li key={item} className="flex items-center gap-2.5 text-[12px] text-slate-500">
							<div className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
							{item}
						</li>
					))}
					{product.items.length > 4 && (
						<li className="text-[11px] font-semibold text-blue-500/70 pl-3.5">
							+{product.items.length - 4} more
						</li>
					)}
				</ul>

				{/* Footer CTA */}
				<div className="pt-5 border-t border-slate-100 group-hover:border-blue-100 transition-colors duration-500">
					<Link
						href="/contact"
						className="inline-flex items-center gap-2 text-[12px] font-semibold text-slate-400 hover:text-blue-600 transition-colors duration-300 group/link"
					>
						Request Quote
						<MoveRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
					</Link>
				</div>
			</div>
		</motion.div>
	);
}

// Products Grid
export function ProductsGrid() {
	const [activeCategory, setActiveCategory] = useState("all");
	const headerRef = useRef(null);
	const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

	const filtered = activeCategory === "all"
		? products
		: products.filter(p => p.category === activeCategory);

	return (
		<section className="relative py-20 bg-slate-50 overflow-hidden">
			{/* Ambient */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-[5%] right-[5%] w-100 h-100 bg-blue-100/40 rounded-full blur-[110px]" />
				<div className="absolute bottom-[5%] left-[5%] w-75 h-75 bg-slate-200/60 rounded-full blur-[90px]" />
			</div>

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

				{/* ── Filter tabs ── */}
				<motion.div
					ref={headerRef}
					initial={{ opacity: 0, y: 16 }}
					animate={headerInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					className="flex flex-wrap gap-2 mb-14"
				>
					{categories.map((cat) => {
						const isActive = activeCategory === cat.id;
						return (
							<button
								key={cat.id}
								onClick={() => setActiveCategory(cat.id)}
								className="relative px-4 py-2 rounded-full text-[12px] font-semibold transition-all duration-300 outline-none"
								style={{
									background:  isActive ? "#2563eb" : "white",
									color:       isActive ? "white" : "#94a3b8",
									border:      isActive ? "1px solid #2563eb" : "1px solid #e2e8f0",
									boxShadow:   isActive ? "0 0 20px rgba(37,99,235,0.25)" : "0 1px 4px rgba(0,0,0,0.04)",
								}}
							>
								{cat.name}
							</button>
						);
					})}
				</motion.div>

				{/* ── Product cards ── */}
				<AnimatePresence mode="wait">
					<motion.div
						key={activeCategory}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
						className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
					>
						{filtered.map((product, index) => (
							<ProductCard key={product.id} product={product} index={index} />
						))}
					</motion.div>
				</AnimatePresence>

				{/* ── Custom solution CTA ── */}
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
					className="mt-16 relative rounded-3xl overflow-hidden"
				>
					<div className="absolute inset-0 bg-linear-to-br from-blue-600 via-blue-700 to-blue-900" />
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.12),transparent_60%)]" />
					<div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl" />
					<div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
					<div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent" />

					<div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 px-8 py-10 lg:px-12">
						<div>
							<p className="text-[9px] font-bold uppercase tracking-[0.35em] text-blue-200/60 mb-3">
								Custom Formulations
							</p>
							<h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
								Need a Custom Solution?
							</h3>
							<p className="mt-2 text-[13px] text-blue-100/50 font-light leading-relaxed max-w-md">
								Our technical team can help you find the right chemicals for your specific process requirements.
							</p>
						</div>
						<Link
							href="/contact"
							className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-blue-700 text-[13px] font-semibold shrink-0
								hover:bg-blue-50 shadow-[0_0_32px_rgba(255,255,255,0.2)] hover:shadow-[0_0_44px_rgba(255,255,255,0.3)]
								transition-all duration-400"
						>
							Contact Our Experts
							<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
						</Link>
					</div>
				</motion.div>

			</div>
		</section>
	);
}