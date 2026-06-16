"use client";

import {useState, useRef, useEffect} from "react";
import Link from "next/link";
import {useGSAP} from "@gsap/react";
import {gsap, ScrollTrigger} from "@/lib/gsap";
import {getLenis} from "@/lib/smooth-scroll";
import {X, ArrowUpRight, ArrowRight} from "lucide-react";
import {productCategories, type Product, type ProductSpec} from "@/data/products";

const SPEC_LABELS: { key: keyof ProductSpec; label: string }[] = [
    {key: "chemicalName", label: "Chemical Name"},
    {key: "formula", label: "Formula"},
    {key: "cas", label: "CAS No."},
    {key: "appearance", label: "Appearance"},
    {key: "purity", label: "Purity"},
    {key: "grade", label: "Grade"},
    {key: "solidContent", label: "Solid Content"},
    {key: "packaging", label: "Packaging"},
    {key: "endUse", label: "End Use"},
    {key: "synonyms", label: "Synonyms"},
];

const CARD_PRIORITY: { key: keyof ProductSpec; label: string }[] = [
    {key: "cas", label: "CAS"},
    {key: "purity", label: "Purity"},
    {key: "appearance", label: "Appearance"},
    {key: "grade", label: "Grade"},
    {key: "endUse", label: "Use"},
];

const HEADER_OFFSET = 110;

export function ProductsGrid() {
    const [activeId, setActiveId] = useState(productCategories[0].id);
    const [openProduct, setOpenProduct] = useState<Product | null>(null);

    const rootRef = useRef<HTMLDivElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const scrollToCategory = (id: string) => {
        const el = document.getElementById(`cat-${id}`);
        if (!el) return;
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(el, {offset: -HEADER_OFFSET});
        else window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET, behavior: "smooth"});
    };

    useEffect(() => {
        const target = sessionStorage.getItem("smc:scrollCategory");
        if (!target) return;
        sessionStorage.removeItem("smc:scrollCategory");
        if (!productCategories.some((c) => c.id === target)) return;
        const t = setTimeout(() => scrollToCategory(target), 350);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const sections = productCategories
            .map((c) => document.getElementById(`cat-${c.id}`))
            .filter((el): el is HTMLElement => Boolean(el));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id.replace("cat-", ""));
                });
            },
            {rootMargin: "-25% 0px -65% 0px", threshold: 0},
        );

        sections.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    useGSAP(() => {
        gsap.set(".pg-card", {autoAlpha: 0, y: 24});
        ScrollTrigger.batch(".pg-card", {
            start: "top 92%",
            onEnter: (els) =>
                gsap.to(els, {autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "expo", overwrite: true}),
        });
    }, {scope: rootRef});

    useGSAP(() => {
        if (!openProduct || !drawerRef.current || !panelRef.current) return;
        getLenis()?.stop();
        gsap.fromTo(drawerRef.current, {autoAlpha: 0}, {autoAlpha: 1, duration: 0.3, ease: "power2.out"});
        gsap.fromTo(panelRef.current, {xPercent: 100}, {xPercent: 0, duration: 0.5, ease: "expo"});
    }, {dependencies: [openProduct]});

    const closeDrawer = () => {
        getLenis()?.start();
        if (!drawerRef.current || !panelRef.current) {
            setOpenProduct(null);
            return;
        }
        gsap.to(panelRef.current, {xPercent: 100, duration: 0.4, ease: "power2.in"});
        gsap.to(drawerRef.current, {autoAlpha: 0, duration: 0.4, ease: "power2.in", onComplete: () => setOpenProduct(null)});
    };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const drawerSpecs = openProduct ? SPEC_LABELS.filter(({key}) => openProduct.spec[key]) : [];

    return (
        <section ref={rootRef} className="bg-white text-text-950 selection:bg-accent-500 selection:text-black font-sans">

            {/* Mobile sticky jump bar */}
            <nav className="lg:hidden sticky top-20 z-30 bg-white/90 backdrop-blur-md border-b border-black/10">
                <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3">
                    {productCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => scrollToCategory(cat.id)}
                            className={`shrink-0 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] rounded-full border transition-colors ${
                                activeId === cat.id
                                    ? "bg-text-950 text-white border-text-950"
                                    : "text-text-950/55 border-black/12"
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </nav>

            <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

                    {/* Desktop sticky jump nav */}
                    <aside className="hidden lg:block w-60 shrink-0">
                        <div className="sticky top-32">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-950/40 block mb-6">
                                Portfolio
                            </span>
                            <ul className="space-y-1">
                                {productCategories.map((cat) => (
                                    <li key={cat.id}>
                                        <button
                                            onClick={() => scrollToCategory(cat.id)}
                                            className="group flex items-baseline gap-3 w-full text-left py-1.5"
                                        >
                                            <span
                                                className={`h-px transition-all duration-300 ${
                                                    activeId === cat.id ? "w-6 bg-background-600" : "w-2 bg-black/20 group-hover:w-4"
                                                }`}
                                            />
                                            <span
                                                className={`text-[13px] font-medium tracking-tight transition-colors ${
                                                    activeId === cat.id ? "text-text-950" : "text-text-950/45 group-hover:text-text-950/80"
                                                }`}
                                            >
                                                {cat.name}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Stacked category sections */}
                    <div className="flex-1 min-w-0 space-y-24">
                        {productCategories.map((cat) => (
                            <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-32">
                                <div className="flex items-end justify-between gap-6 border-b border-black/10 pb-6 mb-10">
                                    <div>
                                        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-background-600 block mb-3">
                                            {String(cat.products.length).padStart(2, "0")} Products
                                        </span>
                                        <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-text-950">
                                            {cat.name}
                                        </h2>
                                    </div>
                                </div>
                                <p className="text-text-950/55 text-sm lg:text-base leading-relaxed max-w-2xl mb-10 -mt-4">
                                    {cat.blurb}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {cat.products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onOpen={() => setOpenProduct(product)}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>

            {/* Detail drawer */}
            {openProduct && (
                <div ref={drawerRef} className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-text-950/40 backdrop-blur-sm" onClick={closeDrawer} />
                    <div
                        ref={panelRef}
                        className="relative h-full w-full max-w-xl bg-white flex flex-col shadow-2xl"
                    >
                        <div className="flex items-start justify-between gap-6 p-8 lg:p-10 border-b border-black/10">
                            <div>
                                {openProduct.spec.chemicalName && openProduct.spec.chemicalName !== openProduct.name && (
                                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-background-600 block mb-3">
                                        {openProduct.spec.chemicalName}
                                    </span>
                                )}
                                <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-text-950 leading-tight">
                                    {openProduct.name}
                                </h3>
                            </div>
                            <button
                                onClick={closeDrawer}
                                className="shrink-0 p-2 -mr-2 text-text-950/40 hover:text-text-950 transition-colors"
                                aria-label="Close"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 lg:p-10 space-y-10">
                            <p className="text-text-950/65 text-sm lg:text-[15px] leading-relaxed">
                                {openProduct.description}
                            </p>

                            {drawerSpecs.length > 0 && (
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-950/40 block mb-5">
                                        Specifications
                                    </span>
                                    <dl className="divide-y divide-black/8 border-y border-black/8">
                                        {drawerSpecs.map(({key, label}) => (
                                            <div key={key} className="flex gap-6 py-3.5">
                                                <dt className="w-32 shrink-0 text-[11px] font-bold uppercase tracking-[0.12em] text-text-950/40 pt-0.5">
                                                    {label}
                                                </dt>
                                                <dd className="text-sm font-medium text-text-950 break-words">
                                                    {openProduct.spec[key]}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            )}
                        </div>

                        <div className="p-8 lg:p-10 border-t border-black/10">
                            <Link
                                href="/contact"
                                className="group flex items-center justify-center gap-3 w-full bg-text-950 text-white py-4 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-background-600 transition-colors"
                            >
                                Request a Quote
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

function ProductCard({product, onOpen}: { product: Product; onOpen: () => void }) {
    const keySpecs = CARD_PRIORITY.filter(({key}) => product.spec[key]).slice(0, 2);
    return (
        <button
            onClick={onOpen}
            className="pg-card group text-left flex flex-col h-full border border-black/10 bg-white p-6 transition-all duration-300 hover:border-background-600 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.18)]"
        >
            <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-base font-semibold tracking-tight text-text-950 leading-snug">
                    {product.name}
                </h3>
                <ArrowUpRight
                    size={18}
                    className="shrink-0 text-text-950/25 group-hover:text-background-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
            </div>

            <p className="text-[13px] leading-relaxed text-text-950/50 line-clamp-2 mb-6">
                {product.description}
            </p>

            {keySpecs.length > 0 && (
                <dl className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-black/8">
                    {keySpecs.map(({key, label}) => (
                        <div key={key} className="min-w-0">
                            <dt className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-950/35">{label}</dt>
                            <dd className="text-[12px] font-medium text-text-950/80 truncate">{product.spec[key]}</dd>
                        </div>
                    ))}
                </dl>
            )}
        </button>
    );
}
