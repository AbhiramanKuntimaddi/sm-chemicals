"use client";

import { Target, Eye } from "lucide-react";

export function AboutValues() {
  return (
    <section
      data-header-theme="dark"
      className="bg-background-50 border-t border-background-200 py-16 lg:py-24 font-sans text-text-950"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-400 block mb-2">
            Core Pillars
          </span>
          <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-wider text-text-950">
            Purpose & Direction
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 border border-background-200 bg-background-200 gap-px overflow-hidden relative">
          <div className="bg-background-50 p-8 md:p-12 transition-all duration-500 hover:bg-background-100 group relative flex flex-col justify-between min-h-[280px] lg:min-h-[320px]">
            <div>
              <div className="mb-8">
                <div className="w-12 h-12 flex items-center justify-center bg-background-100 rounded-lg border border-background-200 text-text-400 group-hover:text-text-950 group-hover:border-text-950 transition-all duration-500">
                  <Target className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>

              <h3 className="text-xl lg:text-2xl font-black uppercase tracking-wider text-text-950 mb-4">
                Our{" "}
                <span className="font-light text-text-400 block sm:inline">
                  Mission
                </span>
              </h3>

              <p className="text-sm text-text-400 leading-relaxed max-w-md font-light">
                Engineering high-precision chemical solutions that drive
                innovation across India's infrastructure.
              </p>
            </div>

            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-background-200 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </div>

          <div className="bg-background-50 p-8 md:p-12 transition-all duration-500 hover:bg-background-100 group relative flex flex-col justify-between min-h-[280px] lg:min-h-[320px]">
            <div>
              <div className="mb-8">
                <div className="w-12 h-12 flex items-center justify-center bg-background-100 rounded-lg border border-background-200 text-text-400 group-hover:text-text-950 group-hover:border-text-950 transition-all duration-500">
                  <Eye className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>

              <h3 className="text-xl lg:text-2xl font-black uppercase tracking-wider text-text-950 mb-4">
                Our{" "}
                <span className="font-light text-text-400 block sm:inline">
                  Vision
                </span>
              </h3>

              <p className="text-sm text-text-400 leading-relaxed max-w-md font-light">
                To lead the industry through molecular engineering and
                high-purity industrial formulations.
              </p>
            </div>

            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-background-200 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
