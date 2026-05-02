"use client";

import Link from "next/link";
import {useState, useEffect, useRef} from "react";
import {usePathname} from "next/navigation";
import {motion, AnimatePresence} from "framer-motion";

const navigation = [
    {name: "Home", href: "/"},
    {name: "Products", href: "/products"},
    {name: "About", href: "/about"},
    {name: "Contact", href: "/contact"},
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [isDark] = useState(true);

    const pathname = usePathname();
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 20);

            if (window.innerWidth >= 1024) {
                if (currentScrollY < 50) {
                    setVisible(true);
                } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                    if (!mobileMenuOpen) setVisible(false);
                } else if (currentScrollY < lastScrollY.current) {
                    setVisible(true);
                }
            } else {
                setVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => window.removeEventListener("scroll", handleScroll);
    }, [mobileMenuOpen]);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    }, [mobileMenuOpen]);

    return (
        <motion.header
            initial={{y: 0}}
            animate={{y: visible ? 0 : -100}}
            transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
            className="fixed top-0 left-0 right-0 z-100"
        >
            <div className={`absolute inset-0 transition-all duration-500 ${
                scrolled
                    ? "bg-black/20 backdrop-blur-md opacity-100"
                    : "bg-transparent opacity-0"
            }`}/>

            <div className={`absolute bottom-0 left-0 right-0 h-px bg-white/5 transition-opacity duration-500 ${
                scrolled ? "opacity-100" : "opacity-0"
            }`}/>

            <div className="relative mx-auto max-w-7xl px-6 md:px-10">
                <div className="flex items-center justify-between h-20 md:h-24">

                    <Link
                        href="/"
                        className="relative z-110"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span
                            className={`text-[14px] font-bold tracking-[0.3em] uppercase transition-colors duration-500 ${isDark || mobileMenuOpen ? 'text-white' : 'text-black'}`}>
                            SM Chemicals
                        </span>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-12">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.name} href={item.href} className="relative group py-2">
                                    <span
                                        className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 ${
                                            isActive ? 'text-accent-500' : isDark ? 'text-text-400 hover:text-white' : 'text-text-500 hover:text-black'
                                        }`}>
                                        {item.name}
                                    </span>
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-px bg-accent-500"
                                        initial={false}
                                        animate={{width: isActive ? "100%" : "0%"}}
                                        transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
                                    />
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-8">
                        <Link
                            href="/contact"
                            className={`hidden lg:block text-[10px] font-bold uppercase tracking-[0.2em] border-b border-accent-500/0 hover:border-accent-500 pb-1 transition-all duration-300 ${
                                isDark ? 'text-white' : 'text-black'
                            }`}
                        >
                            Inquiry
                        </Link>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden relative z-110 flex flex-col items-end gap-1.5 p-2 -mr-2"
                        >
                            <motion.span
                                animate={mobileMenuOpen ? {rotate: 45, y: 7.5, width: "24px"} : {
                                    rotate: 0,
                                    y: 0,
                                    width: "24px"
                                }}
                                className={`h-px transition-colors duration-500 ${isDark || mobileMenuOpen ? 'bg-white' : 'bg-black'}`}
                            />
                            <motion.span
                                animate={mobileMenuOpen ? {opacity: 0, x: 10} : {opacity: 1, x: 0}}
                                className={`w-4 h-px transition-colors duration-500 ${isDark || mobileMenuOpen ? 'bg-white' : 'bg-black'}`}
                            />
                            <motion.span
                                animate={mobileMenuOpen ? {rotate: -45, y: -7.5, width: "24px"} : {
                                    rotate: 0,
                                    y: 0,
                                    width: "12px"
                                }}
                                className={`h-px transition-colors duration-500 ${isDark || mobileMenuOpen ? 'bg-white' : 'bg-black'}`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{clipPath: "circle(0% at calc(100% - 48px) 48px)"}}
                        animate={{clipPath: "circle(150% at calc(100% - 48px) 48px)"}}
                        exit={{clipPath: "circle(0% at calc(100% - 48px) 48px)"}}
                        transition={{duration: 0.8, ease: [0.19, 1, 0.22, 1]}}
                        className="fixed inset-0 z-105 bg-black flex flex-col justify-center px-8"
                    >
                        <nav className="flex flex-col gap-8 relative z-10">
                            {navigation.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{x: -20, opacity: 0}}
                                    animate={{x: 0, opacity: 1}}
                                    transition={{delay: 0.1 + i * 0.08}}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`text-5xl font-bold uppercase tracking-tighter transition-all ${
                                            pathname === item.href ? 'text-accent-500' : 'text-white/40 hover:text-white'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}