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

export function ContactGrid() {
  const mapsUrl =
    "https://www.google.com/maps/place/SM+Chemicals/@17.3958231,78.5085448,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb99bd948f22e7:0x8085d776472433e2!8m2!3d17.3958231!4d78.5085448!16s%2Fg%2F11y16h117x?entry=ttu";

  const info = [
    {
      icon: MapPin,
      title: "Location",
      details: ["2-2-1137, 5/B, Shivam Rd", "New Nallakunta, Hyderabad"],
      action: () => window.open(mapsUrl, "_blank"),
    },
    {
      icon: Phone,
      title: "Direct Line",
      details: ["+91 98765 43210"],
      action: () => (window.location.href = "tel:+919876543210"),
    },
    {
      icon: Mail,
      title: "Official Mail",
      details: ["info@smchemicals.co.in"],
      action: () => (window.location.href = "mailto:info@smchemicals.co.in"),
    },
    {
      icon: Clock,
      title: "Operations",
      details: ["Mon - Sat: 09:00 - 18:00"],
      action: null,
    },
  ];

  return (
    <section className="py-24 bg-background-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-[9px] font-black text-text-400 uppercase tracking-[0.4em] mb-4 block">
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
                  <h3 className="text-[9px] font-black text-text-950 uppercase tracking-[0.3em] mb-3">
                    {item.title}
                  </h3>
                  {item.details.map((d, idx) => (
                    <p
                      key={idx}
                      className="text-[13px] text-text-500 font-medium"
                    >
                      {d}
                    </p>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <div className="relative bg-background-100 h-full min-h-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.960252554746!2d78.50854481656246!3d17.39582310967114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99bd948f22e7%3A0x8085d776472433e2!2sSM%20Chemicals!5e0!3m2!1sen!2sin!4v1718623157000!5m2!1sen!2sin"
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
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-text-950">
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
