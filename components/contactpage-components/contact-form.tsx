"use client";

import React, {useState} from "react";
import {Send, CheckCircle2, RefreshCw} from "lucide-react";

const industries = [
    "Water Treatment", "ETP/STP", "Construction", "Textile",
    "Pharmaceutical", "Paints & Coatings", "Food & Beverage",
    "Power Plants", "Oil & Gas", "Other"
];

export function ContactForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);
        setIsSubmitted(true);
    };

    const inputClasses = `
        w-full bg-transparent border-b border-background-200 py-4 
        text-text-950 placeholder:text-text-300 
        hover:text-text-500 focus:text-text-500 
        focus:outline-none focus:border-accent-500 
        transition-colors font-light text-lg appearance-none rounded-none
    `;

    const labelClasses = "text-[10px] font-black text-text-400 uppercase tracking-[0.3em] block mb-1";

    if (isSubmitted) {
        return (
            <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                <CheckCircle2 className="h-16 w-16 text-text-500 mx-auto mb-6"/>
                <h3 className="text-3xl font-bold text-text-950 tracking-tighter">Request Sent Successful</h3>
                <div className="flex justify-center">
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-8 text-[10px] font-black uppercase tracking-widest border border-background-200 px-8 py-4 hover:bg-text-950 hover:text-background-50 transition-all"
                    >
                        Reset Form / Send another enquiry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-left">
                <div className="group">
                    <label className={labelClasses}>Full Name</label>
                    <input type="text" placeholder="Entry name..." required className={inputClasses}/>
                </div>
                <div className="group">
                    <label className={labelClasses}>Company Entity</label>
                    <input type="text" placeholder="Organization..." required className={inputClasses}/>
                </div>
                <div className="group">
                    <label className={labelClasses}>Email Address</label>
                    <input type="email" placeholder="terminal@domain.com" required className={inputClasses}/>
                </div>
                <div className="group">
                    <label className={labelClasses}>Contact Number</label>
                    <input type="tel" placeholder="+91 00000 00000" required className={inputClasses}/>
                </div>
                <div className="group relative">
                    <label className={labelClasses}>Industry Sector</label>
                    <select
                        required
                        defaultValue=""
                        className={inputClasses}
                    >
                        <option value="" disabled className="text-text-300">
                            Select sector...
                        </option>
                        {industries.map((ind) => (
                            <option
                                key={ind}
                                value={ind.toLowerCase()}
                                className="bg-background-50 text-text-950"
                            >
                                {ind}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-0 bottom-6 pointer-events-none text-text-300">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                    </div>
                </div>
                <div className="group">
                    <label className={labelClasses}>Primary Chemicals</label>
                    <input type="text" placeholder="e.g. PAC, Ferric Chloride..." className={inputClasses}/>
                </div>
            </div>

            <div className="group text-left">
                <label className={labelClasses}>Detailed Specifications</label>
                <textarea rows={4} placeholder="Input requirements..." required
                          className={`${inputClasses} resize-none`}/>
            </div>

            <div className="flex justify-center pt-6">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full md:w-auto min-w-65 bg-text-950 text-background-50 px-10 py-6 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-accent-500 hover:text-text-950 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                >
                    {isLoading ? (
                        <RefreshCw className="h-4 w-4 animate-spin"/>
                    ) : (
                        <>
                            Submit Inquiry
                            <Send className="h-4 w-4"/>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}