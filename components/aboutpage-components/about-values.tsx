"use client";

import { useRef } from "react";
import { Target, Eye } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import type { AboutValuesSection } from "@/data/about";

const cardIcons = [Target, Eye];

export function AboutValues({ content }: { content: AboutValuesSection }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;

      const header = el.querySelector<HTMLElement>("[data-reveal]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", el);

      const tl = gsap.timeline({ delay: 0.06 });

      if (header) {
        gsap.set(header, { autoAlpha: 0, y: 16 });
        tl.to(header, {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        });
      }

      cards.forEach((c) => {
        gsap.set(c, { autoAlpha: 0, y: 64 });
      });

      if (cards.length) {
        tl.to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
            stagger: 0.05,
          },
          "-=0.2",
        );
      }

      gsap.to(el, {
        y: -50,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope },
  );
  return (
    <section
      data-header-theme="dark"
      className="bg-background-50 border-t border-background-200 py-16 lg:py-24 font-sans text-text-950"
    >
      <div ref={scope} className="mx-auto max-w-7xl px-6 lg:px-8">
        <div data-reveal className="max-w-2xl mb-12 lg:mb-16">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-text-400 block mb-2">
            {content.eyebrow}
          </span>
          <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-wider text-text-950">
            {content.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 border border-background-200 bg-background-200 gap-px overflow-hidden relative">
          {content.cards.map((card, i) => {
            const Icon = cardIcons[i] ?? Target;
            return (
              <div
                key={i}
                data-card
                className="bg-background-50 p-8 md:p-12 transition-all duration-500 hover:bg-background-100 group relative flex flex-col justify-between min-h-[280px] lg:min-h-[320px]"
              >
                <div>
                  <div className="mb-8">
                    <div className="w-12 h-12 flex items-center justify-center bg-background-100 rounded-lg border border-background-200 text-text-400 group-hover:text-text-950 group-hover:border-text-950 transition-all duration-500">
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-black uppercase tracking-wider text-text-950 mb-4">
                    Our{" "}
                    <span className="font-light text-text-400 block sm:inline">
                      {card.title}
                    </span>
                  </h3>

                  <p className="text-base md:text-lg text-text-800 leading-relaxed max-w-md font-light">
                    {card.body}
                  </p>
                </div>

                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-background-200 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
