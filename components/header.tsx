"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const CLIP = (r: number) => `circle(${r}% at calc(100% - 32px) 40px)`;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  const lastScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const radiusRef = useRef({ value: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      setVisible(
        currentScrollY < 100 ||
          currentScrollY < lastScrollY.current ||
          mobileMenuOpen,
      );
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  useGSAP(
    () => {
      gsap.to(headerRef.current, {
        y: visible ? 0 : -100,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    { dependencies: [visible] },
  );

  useGSAP(() => {
    const menu = menuRef.current;
    if (!menu) return;
    tl.current = gsap
      .timeline({ paused: true })
      .to(radiusRef.current, {
        value: 150,
        duration: 0.6,
        ease: "power3.inOut",
        onUpdate: () => {
          const val = CLIP(radiusRef.current.value);
          menu.style.clipPath = val;
        },
      })
      .fromTo(
        ".menu-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.05 },
        "-=0.3",
      );
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) tl.current?.play();
    else tl.current?.reverse();
  }, [mobileMenuOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header ref={headerRef} className="fixed top-0 w-full z-[90]">
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            scrolled ? "bg-black/20 backdrop-blur-md" : "bg-transparent"
          }`}
        />

        <div className="relative mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="text-white text-[14px] font-bold tracking-[0.3em] uppercase z-[100]"
          >
            SM Chemicals
          </Link>

          <nav className="hidden lg:flex gap-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative group py-2"
              >
                <span
                  className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-colors ${
                    isActive(item.href)
                      ? "text-accent-500"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.name}
                </span>
                <span
                  className={`absolute bottom-0 left-0 h-px bg-accent-500 transition-all duration-300 ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="hidden lg:block text-[10px] font-bold uppercase tracking-[0.2em] text-white"
          >
            Inquiry
          </Link>
        </div>
      </header>

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        className="fixed top-6 right-6 lg:hidden z-[200] flex flex-col justify-center items-center gap-1.5 w-10 h-10 cursor-pointer"
      >
        <span
          className={`block h-px w-6 bg-white transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "rotate-45 translate-y-[2.5px]" : ""
          }`}
        />
        <span
          className={`block h-px w-6 bg-white transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "-rotate-45 -translate-y-[2.5px]" : ""
          }`}
        />
      </button>

      <div
        ref={menuRef}
        className="fixed inset-0 bg-black z-[100] flex flex-col justify-center px-8"
        style={{
          clipPath: "circle(0% at calc(100% - 32px) 40px)",
          pointerEvents: mobileMenuOpen ? "auto" : "none",
        }}
      >
        <nav className="flex flex-col gap-6">
          {navigation.map((item) => (
            <div key={item.name} className="menu-item opacity-0">
              <Link
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-bold uppercase text-white hover:text-accent-500 transition-colors"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
