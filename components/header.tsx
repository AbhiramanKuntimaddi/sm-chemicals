"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "Products", href: "/products" },
	{ name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
];

export function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [hidden, setHidden] = useState(false); // auto-hide
	const [isDark, setIsDark] = useState(true);
	const [mounted, setMounted] = useState(false);
	const lastScrollY = useRef(0);
	const pathname = usePathname();

	useEffect(() => {
		const t = setTimeout(() => setMounted(true), 100);
		return () => clearTimeout(t);
	}, []);

	// ── Auto-hide on scroll down, reveal on scroll up ─────────────────────────
	useEffect(() => {
		const onScroll = () => {
			const y = window.scrollY;
			setScrolled(y > 40);

			// Only hide after scrolling past 120px; always show at top
			if (y < 120) {
				setHidden(false);
			} else if (y > lastScrollY.current + 8) {
				// Scrolling down — hide (but never hide when mobile menu is open)
				if (!mobileMenuOpen) setHidden(true);
			} else if (y < lastScrollY.current - 4) {
				// Scrolling up — reveal
				setHidden(false);
			}
			lastScrollY.current = y;
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [mobileMenuOpen]);

	// ── data-header-theme detection ───────────────────────────────────────────
	const detectTheme = useCallback(() => {
		const sections = Array.from(
			document.querySelectorAll<HTMLElement>("[data-header-theme]"),
		);
		for (const el of sections) {
			const { top, bottom } = el.getBoundingClientRect();
			if (top <= 52 && bottom > 52) {
				setIsDark(el.dataset.headerTheme === "dark");
				return;
			}
		}
	}, []);

	useEffect(() => {
		const t = setTimeout(detectTheme, 60);
		window.addEventListener("scroll", detectTheme, { passive: true });
		return () => {
			clearTimeout(t);
			window.removeEventListener("scroll", detectTheme);
		};
	}, [detectTheme, pathname]);

	// ── Body scroll lock ──────────────────────────────────────────────────────
	useEffect(() => {
		document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileMenuOpen]);

	// ── Colour tokens ─────────────────────────────────────────────────────────
	const T = "all 0.4s cubic-bezier(0.16,1,0.3,1)";

	const logoName = isDark ? "#ffffff" : "#0f172a";
	const logoSub = isDark ? "rgba(255,255,255,0.30)" : "#94a3b8";
	const logoMarkBg = isDark ? "#ffffff" : "#2563eb";
	const logoMarkText = isDark ? "#1d4ed8" : "#ffffff";
	const navDefault = isDark ? "rgba(255,255,255,0.45)" : "#64748b";
	const navActive = isDark ? "#ffffff" : "#0f172a";
	const ctaBg = isDark ? "#ffffff" : "#2563eb";
	const ctaText = isDark ? "#1d4ed8" : "#ffffff";
	const ctaGlow = isDark
		? "0 0 28px rgba(255,255,255,0.15)"
		: "0 0 28px rgba(37,99,235,0.28)";
	const hamburger = mobileMenuOpen ? "#ffffff" : isDark ? "#ffffff" : "#0f172a";
	const divider = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";

	const navbarBg = scrolled
		? isDark
			? "rgba(2,6,23,0.75)"
			: "rgba(255,255,255,0.88)"
		: "transparent";
	const navbarBorder = scrolled
		? isDark
			? "rgba(255,255,255,0.06)"
			: "rgba(226,232,240,0.9)"
		: "transparent";

	return (
		<>
			<motion.header
				animate={{ y: hidden ? "-110%" : "0%" }}
				transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
				className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? "py-2" : "py-5"}`}
				style={{ transition: `padding ${T}` }}>
				{/* Backdrop */}
				<div
					className="absolute inset-0"
					style={{
						background: navbarBg,
						borderBottom: `1px solid ${navbarBorder}`,
						backdropFilter: scrolled ? "blur(24px) saturate(1.6)" : "none",
						WebkitBackdropFilter: scrolled
							? "blur(24px) saturate(1.6)"
							: "none",
						transition: T,
					}}
				/>

				<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
					<div className="flex items-center justify-between h-12">
						{/* ── Logo ── */}
						<motion.div
							initial={{ opacity: 0, x: -16 }}
							animate={mounted ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
							<Link
								href="/"
								onClick={() => setMobileMenuOpen(false)}
								className="group flex items-center gap-3">
								<div className="relative flex items-center justify-center w-9 h-9">
									<div
										className="absolute inset-0 rounded-xl rotate-3 group-hover:rotate-12"
										style={{ background: logoMarkBg, transition: T }}
									/>
									<span
										className="relative font-black text-xs tracking-tight"
										style={{ color: logoMarkText, transition: T }}>
										SM
									</span>
								</div>
								<div className="hidden sm:flex flex-col leading-none">
									<span
										className="font-bold text-[13px] tracking-tight"
										style={{ color: logoName, transition: T }}>
										SM Chemicals
									</span>
									<span
										className="text-[9px] font-semibold uppercase tracking-[0.22em] mt-0.5"
										style={{ color: logoSub, transition: T }}>
										Est. 2008
									</span>
								</div>
							</Link>
						</motion.div>

						{/* ── Desktop nav — spaced links with animated underline ── */}
						<nav className="hidden lg:flex items-center gap-8">
							{navigation.map((item, i) => {
								const isActive = pathname === item.href;
								return (
									<motion.div
										key={item.name}
										initial={{ opacity: 0, y: -8 }}
										animate={mounted ? { opacity: 1, y: 0 } : {}}
										transition={{
											delay: 0.1 + i * 0.06,
											duration: 0.7,
											ease: [0.16, 1, 0.3, 1],
										}}
										className="relative">
										<Link
											href={item.href}
											className="relative flex flex-col items-center gap-1 text-[13px] font-medium py-1 group"
											style={{
												color: isActive ? navActive : navDefault,
												transition: T,
											}}>
											{item.name}

											{/* Underline — active stays, hover fades in */}
											<span className="absolute -bottom-0.5 left-0 right-0 h-px overflow-hidden">
												{/* Active underline */}
												{isActive && (
													<motion.span
														layoutId="nav-underline"
														className="absolute inset-0 h-px"
														style={{
															background: isDark ? "#ffffff" : "#2563eb",
														}}
														transition={{
															type: "spring",
															bounce: 0.2,
															duration: 0.5,
														}}
													/>
												)}
												{/* Hover underline (only for inactive) */}
												{!isActive && (
													<span
														className="absolute inset-0 h-px scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
														style={{
															background: isDark
																? "rgba(255,255,255,0.25)"
																: "rgba(15,23,42,0.2)",
														}}
													/>
												)}
											</span>
										</Link>
									</motion.div>
								);
							})}
						</nav>

						{/* ── Right: CTA + hamburger ── */}
						<motion.div
							initial={{ opacity: 0, x: 16 }}
							animate={mounted ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
							className="flex items-center gap-3">
							<Link
								href="/contact"
								className="hidden lg:inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-[13px] font-semibold active:scale-95"
								style={{
									background: ctaBg,
									color: ctaText,
									boxShadow: ctaGlow,
									transition: T,
								}}>
								Get Quote
								<ArrowUpRight className="w-3.5 h-3.5" />
							</Link>

							{/* Hamburger → X */}
							<button
								onClick={() => setMobileMenuOpen((v) => !v)}
								className="lg:hidden relative w-8 h-8 flex items-center justify-center"
								aria-label="Toggle menu">
								<motion.span
									animate={{
										rotate: mobileMenuOpen ? 45 : 0,
										y: mobileMenuOpen ? 0 : -5,
									}}
									transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
									className="absolute w-5 h-[1.5px] rounded-full"
									style={{
										background: hamburger,
										transition: "background 0.35s ease",
									}}
								/>
								<motion.span
									animate={{
										opacity: mobileMenuOpen ? 0 : 1,
										scaleX: mobileMenuOpen ? 0 : 1,
									}}
									transition={{ duration: 0.2 }}
									className="absolute w-5 h-[1.5px] rounded-full"
									style={{
										background: hamburger,
										transition: "background 0.35s ease",
									}}
								/>
								<motion.span
									animate={{
										rotate: mobileMenuOpen ? -45 : 0,
										y: mobileMenuOpen ? 0 : 5,
									}}
									transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
									className="absolute w-5 h-[1.5px] rounded-full"
									style={{
										background: hamburger,
										transition: "background 0.35s ease",
									}}
								/>
							</button>
						</motion.div>
					</div>
				</div>
			</motion.header>

			{/* ── Mobile full-screen overlay ── */}
			<AnimatePresence>
				{mobileMenuOpen && (
					<motion.div
						key="mobile-menu"
						initial={{ clipPath: "circle(0% at calc(100% - 52px) 52px)" }}
						animate={{ clipPath: "circle(170% at calc(100% - 52px) 52px)" }}
						exit={{ clipPath: "circle(0% at calc(100% - 52px) 52px)" }}
						transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
						className="fixed inset-0 z-40 lg:hidden flex flex-col"
						style={{ background: "#020617" }}>
						<div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
						<div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-indigo-700/6 rounded-full blur-[100px] pointer-events-none" />
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:36px_36px] pointer-events-none" />

						<div className="h-24 flex-shrink-0" />

						<div className="relative z-10 flex-1 flex flex-col justify-center px-8">
							<div className="space-y-1">
								{navigation.map((item, i) => (
									<motion.div
										key={item.name}
										initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
										animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
										exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
										transition={{
											delay: i * 0.07,
											duration: 0.55,
											ease: [0.16, 1, 0.3, 1],
										}}>
										<Link
											href={item.href}
											onClick={() => setMobileMenuOpen(false)}
											className="group flex items-center justify-between py-4"
											style={{
												borderBottom: "1px solid rgba(255,255,255,0.05)",
											}}>
											<span
												className="text-4xl font-bold tracking-tight"
												style={{
													color:
														pathname === item.href
															? "#ffffff"
															: "rgba(255,255,255,0.22)",
													transition: "color 0.3s ease",
												}}>
												{item.name}
											</span>
											<ArrowUpRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
										</Link>
									</motion.div>
								))}
							</div>

							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0 }}
								transition={{
									delay: 0.35,
									duration: 0.55,
									ease: [0.16, 1, 0.3, 1],
								}}
								className="mt-10">
								<Link
									href="/contact"
									onClick={() => setMobileMenuOpen(false)}
									className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 text-white text-sm font-semibold"
									style={{ boxShadow: "0 0 32px rgba(37,99,235,0.4)" }}>
									Get a Quote
									<ArrowUpRight className="w-4 h-4" />
								</Link>
							</motion.div>
						</div>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ delay: 0.4, duration: 0.5 }}
							className="relative z-10 px-8 py-8"
							style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
							<p
								className="text-[9px] font-bold uppercase tracking-[0.35em] mb-4"
								style={{ color: "rgba(255,255,255,0.25)" }}>
								Quick Connect
							</p>
							<div className="space-y-1.5">
								<a
									href="tel:+919848311479"
									className="block text-base font-semibold text-white/70 hover:text-white transition-colors">
									+91 98483 11479
								</a>
								<a
									href="mailto:info@smchemicals.co.in"
									className="block text-sm hover:text-blue-400 transition-colors"
									style={{ color: "rgba(255,255,255,0.28)" }}>
									info@smchemicals.co.in
								</a>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
