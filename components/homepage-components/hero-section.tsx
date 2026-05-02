"use client";

import React, {useState, useEffect, useRef} from "react";
import {motion, AnimatePresence, useMotionValue, animate, useTransform, Variants} from "framer-motion";
import {ArrowUpRight, FlaskConical} from "lucide-react";
import Link from "next/link";

const sectors = ["Water Treatment", "Construction", "Pharmaceuticals", "Textiles", "Power Plants"];

const stats = [
    {label: "Experience", value: 15, suffix: "Yrs"},
    {label: "Sectors", value: 20, suffix: "+"},
    {label: "Portfolio", value: 100, suffix: "+"},
    {label: "Global", value: 500, suffix: "+"},
    {label: "Purity", value: 99.99, suffix: "%", decimals: 2},
];

const containerVariants: Variants = {
    initial: {opacity: 0},
    animate: {
        opacity: 1,
        transition: {staggerChildren: 0.15, delayChildren: 0.1},
    },
};

const itemVariants: Variants = {
    initial: {opacity: 0, y: 30, filter: "blur(8px)"},
    animate: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {duration: 1, ease: [0.19, 1, 0.22, 1]},
    },
};

const Counter = ({value, decimals = 0, delay = 0}: { value: number; decimals?: number; delay?: number }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) => v.toFixed(decimals));
    useEffect(() => {
        const t = setTimeout(() => animate(count, value, {duration: 3.5, ease: [0.19, 1, 0.22, 1]}), delay * 1000);
        return () => clearTimeout(t);
    }, [value, count, delay]);
    return <motion.span>{rounded}</motion.span>;
};

const MolecularBackground = ({mousePosition}: { mousePosition: React.MutableRefObject<{ x: number, y: number }> }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", {alpha: true});
        if (!ctx) return;

        const accentColor = '#8cff00';
        let particles: Particle[] = [];
        let frame: number;
        let time = 0;
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            baseVx: number;
            baseVy: number;
            size: number;
            type: 'dot' | 'plus' | 'hollow';
            pulseOffset: number;

            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.baseVx = (Math.random() - 0.5) * 0.1;
                this.baseVy = (Math.random() - 0.5) * 0.1;
                this.vx = this.baseVx;
                this.vy = this.baseVy;
                this.size = Math.random() * 1.5 + (isMobile ? 1 : 1.2);
                this.pulseOffset = Math.random() * Math.PI * 2;
                const rand = Math.random();
                this.type = rand > 0.85 ? 'plus' : rand > 0.65 ? 'hollow' : 'dot';
            }

            update(w: number, h: number) {
                const dx = this.x - mousePosition.current.x;
                const dy = this.y - mousePosition.current.y;
                const distSq = dx * dx + dy * dy;
                const radius = isMobile ? 120 : 250;

                if (distSq < radius * radius) {
                    const dist = Math.sqrt(distSq);
                    const force = (radius - dist) / 7000;
                    this.vx += (dx / dist) * force;
                    this.vy += (dy / dist) * force;
                }

                this.vx *= 0.98;
                this.vy *= 0.98;
                this.vx += (this.baseVx - this.vx) * 0.01;
                this.vy += (this.baseVy - this.vy) * 0.01;
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = w; else if (this.x > w) this.x = 0;
                if (this.y < 0) this.y = h; else if (this.y > h) this.y = 0;
            }

            draw(ctx: CanvasRenderingContext2D, time: number, color: string) {
                const pulse = Math.sin(time + this.pulseOffset) * 0.3 + 0.7;
                ctx.beginPath();
                ctx.globalAlpha = pulse * 0.8;
                ctx.strokeStyle = ctx.fillStyle = color;
                ctx.lineWidth = 1.2;

                if (this.type === 'plus') {
                    const s = this.size * 1.8;
                    ctx.moveTo(this.x - s, this.y);
                    ctx.lineTo(this.x + s, this.y);
                    ctx.moveTo(this.x, this.y - s);
                    ctx.lineTo(this.x, this.y + s);
                    ctx.stroke();
                } else if (this.type === 'hollow') {
                    ctx.arc(this.x, this.y, this.size * 1.4, 0, Math.PI * 2);
                    ctx.stroke();
                } else {
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        const init = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
            particles = Array.from({length: isMobile ? 35 : 75}, () => new Particle(canvas.width, canvas.height));
        };

        const draw = () => {
            time += 0.012;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                p1.update(canvas.width, canvas.height);
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dSq = dx * dx + dy * dy;
                    if (dSq < (isMobile ? 8100 : 22500)) {
                        ctx.save();
                        ctx.beginPath();
                        ctx.globalAlpha = (1 - Math.sqrt(dSq) / (isMobile ? 90 : 150)) * 0.45;
                        ctx.strokeStyle = accentColor;
                        ctx.lineWidth = 1.2;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                        ctx.restore();
                    }
                }
                p1.draw(ctx, time, accentColor);
            }
            frame = requestAnimationFrame(draw);
        };

        init();
        draw();
        window.addEventListener("resize", init);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", init);
        };
    }, [mousePosition]);

    return <canvas ref={canvasRef}
                   className="absolute inset-0 z-0 pointer-events-none opacity-80 mix-blend-plus-lighter"/>;
};

export default function HeroSection() {
    const [index, setIndex] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const mousePosition = useRef({x: -1000, y: -1000});

    useEffect(() => {
        const t = setInterval(() => setIndex((i) => (i + 1) % sectors.length), 4500);
        return () => clearInterval(t);
    }, []);

    const handleInteraction = (e: any) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        mousePosition.current = {x: clientX - rect.left, y: clientY - rect.top};
    };

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleInteraction}
            onTouchMove={handleInteraction}
            data-header-theme={"dark"}
            className="dark relative min-h-screen flex flex-col bg-background-50 text-text-950 overflow-hidden selection:bg-accent-500 selection:text-black"
        >
            <MolecularBackground mousePosition={mousePosition}/>

            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full py-24 md:py-40"
            >
                <motion.div variants={itemVariants} className="flex items-center gap-4 md:gap-6 mb-10 md:mb-16">
                    <div className="h-px w-6 md:w-12 bg-accent-500/40"/>
                    <span
                        className="text-[9px] md:text-[10px] uppercase tracking-[0.6em] md:tracking-[1em] font-black text-text-400 text-center whitespace-nowrap">
                        Est. 2008 · Chemical Engineering
                    </span>
                    <div className="h-px w-6 md:w-12 bg-accent-500/40"/>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-5xl sm:text-7xl md:text-[9rem] lg:text-[11rem] font-bold tracking-[-0.04em] leading-[0.9] md:leading-[0.75] text-text-950 mb-10 md:mb-16 text-center"
                >
                    SM <span className="text-text-400 italic font-light">Chemicals</span>
                </motion.h1>

                <motion.div variants={itemVariants} className="flex flex-col items-center w-full mb-12 md:mb-20">
                    <span
                        className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-text-400 font-bold mb-4 md:mb-6">
                        Engineering Chemicals for
                    </span>
                    <div className="relative h-14 md:h-24 w-full flex justify-center items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{y: 20, opacity: 0, filter: "blur(10px)"}}
                                animate={{y: 0, opacity: 1, filter: "blur(0px)"}}
                                exit={{y: -20, opacity: 0, filter: "blur(10px)"}}
                                transition={{duration: 0.8, ease: [0.19, 1, 0.22, 1]}}
                                className="absolute text-2xl sm:text-4xl md:text-7xl font-light italic text-accent-500 tracking-tight text-center"
                            >
                                {sectors[index].toUpperCase()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                <motion.p
                    variants={itemVariants}
                    className="max-w-xs sm:max-w-md md:max-w-2xl text-center text-text-400 text-xs sm:text-sm md:text-lg font-light tracking-wide leading-relaxed mb-12 md:mb-20"
                >
                    Crafting <span
                    className="text-accent-500 font-normal">high-precision industrial formulations</span> that drive
                    innovation across India&apos;s infrastructure.
                </motion.p>

                <motion.div variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 md:gap-8 items-center w-full sm:w-auto px-4 sm:px-0">
                    <Link
                        href="/products"
                        className="group relative h-14 md:h-16 w-full sm:w-64 flex items-center justify-center bg-accent-500 rounded-sm overflow-hidden transition-colors"
                    >
                        <motion.div className="absolute inset-0 bg-white opacity-0" whileHover={{opacity: 1}}
                                    transition={{duration: 0.4}}/>
                        <span
                            className="relative z-10 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-black">Explore Products</span>
                        <FlaskConical className="relative z-10 ml-3 w-4 h-4 text-black"/>
                    </Link>

                    <Link
                        href="/portfolio"
                        className="group relative h-14 md:h-16 w-full sm:w-64 flex items-center justify-center border border-text-300 hover:border-accent-500 rounded-sm transition-all duration-500"
                    >
                        <span
                            className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-text-400 group-hover:text-accent-500">View Portfolio</span>
                        <ArrowUpRight
                            className="ml-3 w-4 h-4 text-text-400 group-hover:text-accent-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"/>
                    </Link>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-6 md:gap-12 mt-24 md:mt-40 w-full border-t border-background-200 pt-12 md:pt-20"
                >
                    {stats.map((s, i) => (
                        <div key={i} className="flex flex-col items-center md:items-start group cursor-default">
                            <div className="flex items-baseline mb-2">
                                <span className="text-4xl md:text-6xl font-extralight tracking-tighter text-text-950">
                                    <Counter value={s.value} decimals={s.decimals} delay={1.2 + i * 0.1}/>
                                </span>
                                <span
                                    className="text-xl md:text-3xl text-accent-500 ml-1 font-bold tracking-normal transition-colors">
                                    {s.suffix}
                                </span>
                            </div>
                            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-text-400 group-hover:text-accent-500 transition-colors duration-500">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}