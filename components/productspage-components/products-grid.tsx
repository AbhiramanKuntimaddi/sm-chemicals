"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    ArrowRight,
    ChevronLeft,
    FileText,
    Download,
    X,
    Send,
    Square,
    CheckSquare,
    CheckCircle2
} from "lucide-react";
import { products } from "@/data/products";

export function ProductsGrid() {
    const [selectedProduct, setSelectedProduct] = useState(products[0]);
    const [selectedChemicals, setSelectedChemicals] = useState<string[]>([]);
    const [isMobileView, setIsMobileView] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const displayProduct = useMemo(() => {
        return products.find(p => p.id === selectedProduct?.id) || products[0];
    }, [selectedProduct]);

    const toggleChemical = (item: string) => {
        setSelectedChemicals(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <section className="bg-white h-auto selection:bg-background-500 selection:text-text-950 font-sans" data->
            <div className="max-w-400 mx-auto px-0 lg:px-6 py-6 lg:py-12">

                <div className="flex flex-col lg:flex-row border-y lg:border border-background-200 h-auto lg:h-200 overflow-hidden relative">

                    <aside className={`w-full lg:w-100 bg-background-50 border-r border-background-200 flex flex-col shrink-0 ${
                        isMobileView ? "hidden lg:flex" : "flex"
                    }`}>
                        <div className="p-8 border-b border-background-200 bg-white shrink-0">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-400">Product Portfolio</span>
                        </div>
                        <div className="flex-1 overflow-y-auto no-scrollbar">
                            {products.map((product) => (
                                <button
                                    key={product.id}
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setSelectedChemicals([]);
                                        setIsMobileView(true);
                                    }}
                                    className={`w-full text-left p-8 border-b border-background-100 transition-all relative ${
                                        displayProduct?.id === product.id ? "bg-white" : "hover:bg-white/50"
                                    }`}
                                >
                                    {displayProduct?.id === product.id && (
                                        <motion.div layoutId="active" className="absolute left-0 top-0 bottom-0 w-1.5 bg-background-500" />
                                    )}
                                    <div className="flex items-center justify-between">
                                        <h3 className={`text-base font-bold uppercase tracking-tight leading-tight pr-4 ${
                                            displayProduct?.id === product.id ? "text-text-950" : "text-text-500"
                                        }`}>
                                            {product.name}
                                        </h3>
                                        <ChevronRight size={16} className={displayProduct?.id === product.id ? "text-background-500" : "text-text-200"} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </aside>

                    <main className={`flex-1 bg-white flex flex-col min-w-0 ${
                        isMobileView ? "flex" : "hidden lg:flex"
                    }`}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={displayProduct.id}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="h-full flex flex-col"
                            >
                                <div className="lg:hidden p-6 border-b border-background-200 bg-background-50 flex items-center shrink-0">
                                    <button onClick={() => setIsMobileView(false)} className="text-[10px] font-black uppercase text-text-950 flex items-center gap-2">
                                        <ChevronLeft size={16} /> Portfolio Index
                                    </button>
                                </div>

                                <div className="p-8 lg:p-20 flex-1 overflow-y-auto no-scrollbar">
                                    <motion.p variants={itemVariants} className="text-text-500 text-lg lg:text-xl leading-relaxed max-w-3xl mb-12 font-medium">
                                        {displayProduct.description}
                                    </motion.p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-0 border-t border-background-200 pt-16">
                                        <div className="md:pr-12 md:border-r border-background-100">
                                            <motion.h4 variants={itemVariants} className="text-[12px] font-black uppercase tracking-[0.3em] text-text-950 mb-10 border-b-2 border-background-500 w-fit pb-1">
                                                Chemicals List
                                            </motion.h4>
                                            <div className="space-y-6">
                                                {displayProduct.items.map((item: string) => (
                                                    <motion.div
                                                        key={item}
                                                        variants={itemVariants}
                                                        className="flex items-start gap-4"
                                                    >
                                                        <CheckCircle2 size={18} className="text-background-500 shrink-0 mt-0.5" />
                                                        <span className="text-xs font-bold uppercase tracking-tight text-text-950">
                                                            {item}
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="md:pl-12 flex flex-col justify-start">
                                            <motion.div variants={itemVariants} className="p-8 bg-background-50 border-l-4 border-background-500">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-background-500 mb-6 block">Documentation</span>
                                                <button className="w-full py-5 px-6 bg-white border border-background-200 flex items-center justify-between group hover:border-text-950 transition-all">
                                                    <div className="flex items-center gap-3">
                                                        <FileText size={20} className="text-text-400 group-hover:text-text-950" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-text-950">Technical Datasheet</span>
                                                    </div>
                                                    <Download size={18} className="text-background-500 group-hover:translate-y-0.5 transition-transform" />
                                                </button>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    onClick={() => setIsModalOpen(true)}
                                    variants={itemVariants}
                                    className="w-full py-12 bg-text-950 text-white flex items-center justify-center gap-8 group hover:bg-background-500 transition-colors duration-300 shrink-0"
                                >
                                    <span className="text-sm font-black uppercase tracking-[0.5em]">Request Technical Quote</span>
                                    <ArrowRight size={24} className="group-hover:translate-x-4 transition-transform duration-500" />
                                </motion.button>
                            </motion.div>
                        </AnimatePresence>
                    </main>

                    <AnimatePresence>
                        {isModalOpen && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50 flex items-center justify-center bg-text-950/90 p-4"
                            >
                                <motion.div
                                    initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }}
                                    className="bg-white w-full max-w-2xl border border-background-200 max-h-[90vh] flex flex-col"
                                >
                                    <div className="p-8 border-b border-background-200 flex justify-between items-center bg-background-50 shrink-0">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-background-500">Inquiry Specification</span>
                                            <h3 className="text-xl font-bold uppercase text-text-950 tracking-tighter">{displayProduct.name}</h3>
                                        </div>
                                        <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-background-200 transition-colors"><X size={24} /></button>
                                    </div>

                                    <div className="p-8 space-y-8 overflow-y-auto no-scrollbar">
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black uppercase text-text-400 tracking-[0.2em]">Select Chemicals for Quote:</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {displayProduct.items.map((item) => (
                                                    <button
                                                        key={item}
                                                        onClick={() => toggleChemical(item)}
                                                        className={`flex items-center gap-3 p-3 border transition-all text-left ${
                                                            selectedChemicals.includes(item)
                                                                ? "border-background-500 bg-background-50"
                                                                : "border-background-100 hover:border-background-200"
                                                        }`}
                                                    >
                                                        <div className={selectedChemicals.includes(item) ? "text-background-500" : "text-text-100"}>
                                                            {selectedChemicals.includes(item) ? <CheckSquare size={18} /> : <Square size={18} />}
                                                        </div>
                                                        <span className="text-[10px] font-bold uppercase tracking-tight text-text-950">{item}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-background-100">
                                            <input type="text" placeholder="NAME" className="w-full p-4 border border-background-200 text-[10px] font-bold uppercase focus:border-background-500 outline-none" />
                                            <input type="email" placeholder="EMAIL" className="w-full p-4 border border-background-200 text-[10px] font-bold uppercase focus:border-background-500 outline-none" />
                                        </div>
                                        <textarea rows={3} placeholder="PROJECT SPECIFICATIONS" className="w-full p-4 border border-background-200 text-[10px] font-bold uppercase focus:border-background-500 outline-none" />
                                    </div>

                                    <button className="w-full py-8 bg-background-500 text-text-950 font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-text-950 hover:text-white transition-all shrink-0">
                                        Send Request {selectedChemicals.length > 0 && `(${selectedChemicals.length})`} <Send size={18} />
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}