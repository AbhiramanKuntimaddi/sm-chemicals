"use client";

import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import type { ContactContent } from "@/data/content";
import { useSection } from "@/hooks/use-section";

export function ContactGrid({ contact }: { contact: ContactContent }) {
  const mapsUrl = contact.mapsUrl;

  const info = [
    {
      icon: MapPin,
      title: "Location",
      details: contact.addressLines,
      action: () => window.open(mapsUrl, "_blank"),
    },
    {
      icon: Phone,
      title: "Direct Line",
      details: [contact.phone],
      action: () =>
        (window.location.href = `tel:${contact.phone.replace(/\s+/g, "")}`),
    },
    {
      icon: Mail,
      title: "Official Mail",
      details: [contact.email],
      action: () => (window.location.href = `mailto:${contact.email}`),
    },
    {
      icon: Clock,
      title: "Operations",
      details: [contact.hours],
      action: null,
    },
  ];

  const scope = useSection<HTMLDivElement>({
    stagger: 0.08,
    start: "top 85%",
    exitY: -50,
  });

  return (
    <section className="py-24 bg-background-50">
      <div ref={scope} className="mx-auto max-w-7xl px-6 lg:px-8">
        <div data-reveal className="mb-16">
          <span className="text-[11px] font-black text-text-400 uppercase tracking-[0.4em] mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-text-950">
            Corporate Presence.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 border border-background-200 bg-background-200 gap-px">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-background-200">
            {info.map((item, i) => (
              <button
                key={i}
                data-reveal
                onClick={item.action || undefined}
                disabled={!item.action}
                className={`bg-background-50 p-10 flex flex-col justify-between text-left transition-colors duration-500 ${item.action ? "hover:bg-background-100 cursor-pointer group" : "cursor-default"}`}
              >
                <div className="flex justify-between items-start mb-12 w-full">
                  <item.icon
                    className={`h-5 w-5 transition-colors duration-500 ${item.action ? "text-text-300 group-hover:text-text-950" : "text-text-300"}`}
                  />
                  {item.action && (
                    <ArrowRight className="h-4 w-4 text-background-200 group-hover:text-text-950 transition-all duration-500" />
                  )}
                </div>

                <div>
                  <h3 className="text-[11px] font-black text-text-950 uppercase tracking-[0.3em] mb-3">
                    {item.title}
                  </h3>
                  {item.details.map((d, idx) => (
                    <p
                      key={idx}
                      className="text-base text-text-800 font-medium"
                    >
                      {d}
                    </p>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <div data-reveal className="relative bg-background-100 h-full min-h-100">
            <iframe
              src={`https://maps.google.com/maps?cid=${contact.mapCid}&z=16&hl=en&output=embed`}
              className="absolute inset-0 w-full h-full grayscale-[0.8] contrast-[1.1] opacity-90"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="SM Chemicals Location"
            />

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-background-50 px-3 py-1.5 border border-background-200 shadow-sm flex items-center gap-2 hover:bg-background-100 transition-colors"
            >
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-text-950">
                Open in Maps
              </span>
              <ExternalLink className="w-3 h-3 text-text-950" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
