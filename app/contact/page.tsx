import {ContactHero} from "@/components/contactpage-components/contact-hero";
import {ContactGrid} from "@/components/contactpage-components/contact-grid";
import {ContactInquiry} from "@/components/contactpage-components/contact-inquiry";

export default function ContactPage() {
    return (
        <main className="bg-background-50 selection:bg-accent-500 selection:text-black">
            <ContactHero/>
            <ContactGrid/>
            <ContactInquiry/>
        </main>
    );
}