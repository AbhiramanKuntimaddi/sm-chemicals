"use client";

import React from "react";
import {MapPin, Phone, Mail, Clock} from "lucide-react";

export function ContactGrid() {
    const info = [
        {icon: MapPin, title: "Location", details: ["Hyderabad, Telangana", "India"]},
        {icon: Phone, title: "Direct Line", details: ["+91 98765 43210"]},
        {icon: Mail, title: "Terminal", details: ["info@smchemicals.co.in"]},
        {icon: Clock, title: "Uptime", details: ["Mon - Sat: 09:00 - 18:00"]},
    ];

    return (
        <section className="py-24 bg-background-50 border-t border-background-200">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-background-200 border border-background-200 overflow-hidden"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-background-200">
                        {info.map((item, i) => (
                            <div
                                key={i}
                                className="bg-background-50 p-12 group hover:bg-background-100 transition-all duration-500 relative overflow-hidden"
                            >
                                <item.icon
                                    className="h-5 w-5 text-text-500 mb-10 group-hover:text-text-700-500 group-hover:scale-110 transition-all duration-500"/>

                                <div className="relative z-10">
                                    <h3 className="text-[10px] font-black text-text-950 uppercase tracking-[0.3em] mb-3">
                                        {item.title}
                                    </h3>
                                    {item.details.map((d, idx) => (
                                        <p key={idx} className="text-sm text-text-400 font-light leading-relaxed">
                                            {d}
                                        </p>
                                    ))}
                                </div>

                                <div
                                    className="absolute top-0 right-0 w-4 h-4 border-t border-r border-background-200 opacity-0 group-hover:opacity-100 transition-opacity"/>
                            </div>
                        ))}
                    </div>

                    <div className="relative min-h-112.5 bg-background-100 overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.827222627063!2d78.4419266!3d17.420077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9736453982e3%3A0x6b87640b3c761c56!2sSM%20Chemicals!5e0!3m2!1sen!2sin!4v1714671000000!5m2!1sen!2sin"
                            className="absolute inset-0 w-full h-full grayscale contrast-[1.1] brightness-[0.95] invert-[0.05] sepia-[0.05]"
                            style={{border: 0}}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="SM Chemicals Location"
                        />

                        <div
                            className="absolute inset-0 pointer-events-none border-l border-background-200 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[32px_32px]"/>

                        <div
                            className="absolute bottom-6 left-6 bg-background-50 border border-background-200 px-4 py-2">
                            <span className="text-[8px] font-mono text-text-400 uppercase tracking-widest">
                                Lat: 17.420077 / Long: 78.441926
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}