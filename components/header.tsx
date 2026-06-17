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
      <header ref={headerRef} className="fixed top-0 w-full z-999!">
        <div
          className={`absolute inset-0 transition-all duration-300 ${scrolled ? "bg-black/20 backdrop-blur-md" : "bg-transparent"}`}
        />

        <div className="relative mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="text-white text-[14px] font-bold tracking-[0.3em] uppercase z-1000"
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
                  className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-colors ${isActive(item.href) ? "text-accent-500" : "text-white/70 hover:text-white"}`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle Menu"
        className="fixed top-6 right-6 lg:hidden z-1000! flex flex-col justify-center items-center w-10 h-10 cursor-pointer"
      >
        <span
          className={`block h-px w-6 bg-white transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[0.5px]" : "-translate-y-1.25"}`}
        />
        <span
          className={`block h-px w-6 bg-white transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[0.5px]" : "translate-y-1.25"}`}
        />
      </button>

      <div
        ref={menuRef}
        className="fixed inset-0 bg-black z-900 flex flex-col justify-center px-8"
        style={{
          clipPath: "circle(0% at calc(100% - 32px) 40px)",
          pointerEvents: mobileMenuOpen ? "auto" : "none",
        }}
      >
        <nav className="flex flex-col gap-6">
          {navigation.map((item) => (
            <div
              key={item.name}
              className="menu-item opacity-0 flex items-center gap-4"
            >
              <div
                className={`w-2 h-2 rounded-full bg-accent-500 ${isActive(item.href) ? "opacity-100" : "opacity-0"}`}
              />
              <Link
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-bold uppercase text-white"
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
