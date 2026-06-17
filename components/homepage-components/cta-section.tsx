"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

export function CtaSection() {
  const scope = useReveal<HTMLDivElement>({
    scroll: true,
    y: 20,
    blur: 0,
    stagger: 0.1,
    duration: 0.8,
    start: "top 90%",
  });

  return (
    <section className="relative py-24 lg:py-32 bg-background-50 text-text-950 border-t border-background-200">
      <div ref={scope} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-4xl mb-16 lg:mb-24">
          <span
            data-reveal
            className="text-[10px] font-black text-text-400 uppercase tracking-[0.3em] block mb-4"
          >
            Direct Contact
          </span>
          <h2
            data-reveal
            className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-wider text-text-950 leading-[0.95]"
          >
            Ready to Transform <br />
            <span className="text-text-400 font-light italic">
              Your Supply Chain?
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          <div className="lg:col-span-7">
            <p
              data-reveal
              className="text-sm sm:text-base md:text-lg text-text-400 font-light leading-relaxed max-w-2xl"
            >
              Partner with{" "}
              <span className="text-text-950 font-medium">SM Chemicals</span>{" "}
              for reliable, high-purity industrial compounds tailored
              specifically to your infrastructure requirements.
            </p>
          </div>

          <div
            data-reveal
            className="lg:col-span-5 flex flex-col sm:flex-row gap-6 w-full justify-start lg:justify-end items-center"
          >
            {/* Your original button animation preserved */}
            <Link
              href="/contact"
              className="group relative h-16 px-12 flex items-center justify-center bg-text-950 text-background-50 rounded-sm overflow-hidden transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-background-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
              <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.4em] group-hover:text-black transition-colors duration-500">
                Request a Quote
              </span>
            </Link>

            <Link
              href="/products"
              className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-text-400 hover:text-text-950 transition-colors duration-500"
            >
              Explore Catalogue
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-background-200 border border-background-200 overflow-hidden">
          {[
            {
              href: "tel:+919876543210",
              label: "Direct Line",
              value: "+91 98765 43210",
              icon: Phone,
            },
            {
              href: "mailto:info@smchemicals.co.in",
              label: "Official Inquiry",
              value: "info@smchemicals.co.in",
              icon: Mail,
            },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-reveal
              className="group bg-background-50 p-8 sm:p-12 flex items-center justify-between transition-colors duration-500 hover:bg-background-100"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-black text-text-400 uppercase tracking-[0.2em] block">
                  {item.label}
                </span>
                <span className="text-base sm:text-lg text-text-950 font-medium tracking-tight block">
                  {item.value}
                </span>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-background-100 rounded-md border border-background-200 text-text-400 group-hover:text-text-950 group-hover:border-text-950 transition-all duration-500">
                <item.icon className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
