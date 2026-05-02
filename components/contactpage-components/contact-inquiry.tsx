"use client";

import { ContactForm } from "./contact-form";

export function ContactInquiry() {
    return (
        <section className="py-32 bg-background-50 border-t border-background-200 selection:bg-accent-500 selection:text-black">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-20 flex flex-col items-center text-center">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-text-950 mb-8 leading-none max-w-4xl">
                        Request <span className="italic font-light text-text-300">Technical Quote.</span>
                    </h2>

                    <p className="text-lg text-text-400 max-w-2xl font-light leading-relaxed">
                        Specify molecular purity requirements, industrial scale, and logistical
                        deadlines for accurate chemical assessment.
                    </p>
                </div>

                <div className="bg-background-200 border border-background-200 p-px max-w-5xl mx-auto">
                    <div className="bg-background-50 p-8 md:p-16">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}