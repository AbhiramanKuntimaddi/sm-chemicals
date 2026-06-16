"use client";

import Link from "next/link";
import {useState, useEffect, useRef} from "react";
import {usePathname} from "next/navigation";
import {useGSAP} from "@gsap/react";
import {gsap} from "@/lib/gsap";

const navigation = [
    {name: "Home", href: "/"},
    {name: "Products", href: "/products"},
    {name: "About", href: "/about"},
    {name: "Contact", href: "/contact"},
];

const CLIP = (r: number) => `circle(${r}% at calc(100% - 48px) 48px)`;

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [isDark] = useState(true);

    const pathname = usePathname();
    const lastScrollY = useRef(0);

    const headerRef = useRef<HTMLElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const clipRef = useRef(0);

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

    useGSAP(() => {
        gsap.to(headerRef.current, {
            y: visible ? 0 : -100,
            duration: 0.6,
            ease: "smooth",
        });
    }, {dependencies: [visible]});

    useGSAP(() => {
        const menu = menuRef.current;
        if (!menu) return;

        if (mobileMenuOpen) {
            menu.style.pointerEvents = "auto";
            gsap.to(clipRef, {
                current: 150,
                duration: 0.8,
                ease: "expo",
                onUpdate: () => {
                    menu.style.clipPath = CLIP(clipRef.current);
                },
            });
            gsap.fromTo(
                ".menu-item",
                {x: -20, autoAlpha: 0},
                {x: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08, delay: 0.1, ease: "power2.out"},
            );
        } else {
            gsap.to(clipRef, {
                current: 0,
                duration: 0.8,
                ease: "expo",
                onUpdate: () => {
                    menu.style.clipPath = CLIP(clipRef.current);
                },
                onComplete: () => {
                    menu.style.pointerEvents = "none";
                },
            });
        }
    }, {dependencies: [mobileMenuOpen]});

    const barBase = `h-px transition-[transform,width,opacity,background-color] duration-500 ${isDark || mobileMenuOpen ? 'bg-white' : 'bg-black'}`;

    return (
        <header
            ref={headerRef}
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
                                    <span
                                        className="absolute bottom-0 left-0 h-px bg-accent-500 transition-[width] duration-400 ease-[0.16,1,0.3,1]"
                                        style={{width: isActive ? "100%" : "0%"}}
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
                            <span
                                className={`${barBase} w-6 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`}
                            />
                            <span
                                className={`${barBase} w-4 ${mobileMenuOpen ? 'opacity-0 translate-x-[10px]' : 'opacity-100'}`}
                            />
                            <span
                                className={`${barBase} origin-center ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[7.5px]' : 'w-3'}`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div
                ref={menuRef}
                style={{clipPath: CLIP(0), pointerEvents: "none"}}
                className="fixed inset-0 z-105 bg-black flex flex-col justify-center px-8"
            >
                <nav className="flex flex-col gap-8 relative z-10">
                    {navigation.map((item) => (
                        <div key={item.name} className="menu-item">
                            <Link
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-5xl font-bold uppercase tracking-tighter transition-all ${
                                    pathname === item.href ? 'text-accent-500' : 'text-white/40 hover:text-white'
                                }`}
                            >
                                {item.name}
                            </Link>
                        </div>
                    ))}
                </nav>
            </div>
        </header>
    );
}
