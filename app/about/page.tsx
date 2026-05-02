import { Metadata } from "next";
import { AboutHero } from "@/components/aboutpage-components/about-hero";
import { AboutValues } from "@/components/aboutpage-components/about-values";
import { AboutTimeline } from "@/components/aboutpage-components/about-timeline";
import { AboutCertifications } from "@/components/aboutpage-components/about-certifications";

export const metadata: Metadata = {
    title: "About Us - SM Chemicals",
    description: "Learn about our mission, vision, and commitment to industrial excellence.",
};

export default function AboutPage() {
    return (
        <main>
            <AboutHero />
            <AboutValues />
            <AboutTimeline />
            <AboutCertifications />
        </main>
    );
}