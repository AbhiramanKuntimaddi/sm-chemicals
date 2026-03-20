import { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contact Us - SM Chemicals",
  description: "Get in touch with SM Chemicals for inquiries, quotes, and technical support.",
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Hyderabad, Telangana", "India - 500001"],
    action: null,
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 98765 43210", "+91 40 1234 5678"],
    action: "tel:+919876543210",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@smchemicals.co.in", "sales@smchemicals.co.in"],
    action: "mailto:info@smchemicals.co.in",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: Closed"],
    action: null,
  },
]

export default function ContactPage() {
  return (
    <div className="pt-20" data-header-theme="light">
      {/* Hero section */}
      <section className="relative bg-accent py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-4">
              Contact Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-accent-foreground">
              Let&apos;s Start a
              <span className="block text-primary">Conversation</span>
            </h1>
            <p className="mt-6 text-lg text-accent-foreground/70 max-w-2xl">
              Have questions about our products or need a custom solution? 
              Our team of experts is ready to help you find the perfect chemical solution.
            </p>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left column - Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Get in Touch
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Reach out to us through any of the following channels. 
                We typically respond within 24 hours on business days.
              </p>

              {/* Contact cards */}
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {contactInfo.map((item) => {
                  const Wrapper = item.action ? 'a' : 'div'
                  return (
                    <Wrapper
                      key={item.title}
                      {...(item.action ? { href: item.action } : {})}
                      className={`group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg ${
                        item.action ? "cursor-pointer" : ""
                      }`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-4 font-semibold text-card-foreground">
                        {item.title}
                      </h3>
                      {item.details.map((detail, i) => (
                        <p key={i} className="mt-1 text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </Wrapper>
                  )
                })}
              </div>

              {/* Map */}
              <div className="mt-10 overflow-hidden rounded-2xl border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3160tried!2d78.26796!3d17.38504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1623456789"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SM Chemicals Location"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Quick links */}
              <div className="mt-10 rounded-2xl bg-muted p-6">
                <h3 className="font-semibold text-foreground">Looking for something else?</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link 
                    href="/products" 
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    View Products
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                  <Link 
                    href="/about" 
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    About Us
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right column - Form */}
            <div>
              <div className="rounded-3xl border border-border bg-card p-8 lg:p-10">
                <h2 className="text-2xl font-bold text-card-foreground">
                  Request a Quote
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Fill out the form below and our team will get back to you 
                  with a customized quote within 24 hours.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
