import { Metadata } from "next"
import { Target, Eye, Award, Users, Clock, Shield, Lightbulb, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - SM Chemicals",
  description: "Learn about SM Chemicals - our mission, vision, values, and commitment to delivering quality chemical solutions.",
}

const values = [
  {
    name: "Quality First",
    description: "We never compromise on the quality of our products and services, ensuring every batch meets stringent standards.",
    icon: Award,
  },
  {
    name: "Customer Focus",
    description: "Your success is our priority. We build lasting partnerships based on trust and mutual growth.",
    icon: Users,
  },
  {
    name: "Innovation",
    description: "Continuously developing new formulations and solutions to meet evolving industry demands.",
    icon: Lightbulb,
  },
  {
    name: "Integrity",
    description: "Transparent business practices and ethical operations in everything we do.",
    icon: Heart,
  },
]

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Happy Clients" },
  { value: "100+", label: "Products" },
  { value: "20+", label: "Industries" },
]

const timeline = [
  { year: "2008", title: "Company Founded", description: "SM Chemicals established in Hyderabad with a vision to provide quality chemicals to industries across India." },
  { year: "2012", title: "Expanded Product Range", description: "Added water treatment, ETP chemicals, and construction chemicals to our growing portfolio." },
  { year: "2016", title: "Pan-India Operations", description: "Expanded distribution network to serve clients across all major Indian states with reliable delivery." },
  { year: "2020", title: "ISO Certification", description: "Achieved ISO 9001:2015 certification, reinforcing our commitment to quality management systems." },
  { year: "2024", title: "Industry Leader", description: "Now serving 500+ clients across 20+ industries, recognized as a trusted chemical solutions partner." },
]

export default function AboutPage() {
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
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-accent-foreground">
              Your Trusted
              <span className="block text-primary">Chemical Partner</span>
            </h1>
            <p className="mt-6 text-lg text-accent-foreground/70 max-w-2xl">
              Since 2008, SM Chemicals has been committed to delivering quality 
              chemical solutions that drive industrial success across India.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-accent-foreground/10 bg-accent-foreground/5 p-6 text-center">
                <div className="text-4xl font-bold text-primary">{stat.value}</div>
                <div className="mt-2 text-sm text-accent-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="group rounded-3xl border border-border bg-card p-10 hover:border-primary/50 hover:shadow-xl transition-all duration-300">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Target className="h-7 w-7" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-card-foreground">Our Mission</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                To provide innovative, high-quality chemical solutions that meet the evolving 
                needs of industries while maintaining the highest standards of safety, 
                sustainability, and customer service. We strive to be the most trusted 
                chemical partner for businesses across India.
              </p>
            </div>
            <div className="group rounded-3xl border border-border bg-card p-10 hover:border-primary/50 hover:shadow-xl transition-all duration-300">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Eye className="h-7 w-7" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-card-foreground">Our Vision</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                To become India&apos;s leading chemical solutions provider, recognized for our 
                commitment to quality, innovation, and sustainable practices. We envision 
                a future where every industry has access to reliable, efficient, and 
                environmentally responsible chemical solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-4">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Principles That Guide Us
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.name} className="group text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-10 w-10" />
                </div>
                <h3 className="mt-8 text-xl font-semibold text-foreground">
                  {value.name}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Journey */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Milestones That Define Us
            </h2>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-px" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col lg:flex-row ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-start lg:items-center gap-8`}
                >
                  {/* Content card */}
                  <div className={`w-full lg:w-1/2 pl-20 lg:pl-0 ${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16 lg:text-left"}`}>
                    <div className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                      <span className="inline-block text-sm font-bold text-primary">{item.year}</span>
                      <h3 className="mt-2 text-lg font-semibold text-card-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 flex h-4 w-4 items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-primary shadow-lg shadow-primary/25" />
                  </div>
                  
                  <div className="hidden lg:block w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-accent">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-4">
                Certifications
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-accent-foreground">
                Quality You Can Trust
              </h2>
              <p className="mt-4 text-accent-foreground/70">
                Our commitment to quality is backed by internationally recognized certifications 
                and rigorous quality control processes.
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-accent-foreground/5 border border-accent-foreground/10">
                <Shield className="h-10 w-10 text-primary" />
                <div>
                  <div className="font-semibold text-accent-foreground">ISO 9001:2015</div>
                  <div className="text-sm text-accent-foreground/60">Quality Management</div>
                </div>
              </div>
              <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-accent-foreground/5 border border-accent-foreground/10">
                <Clock className="h-10 w-10 text-primary" />
                <div>
                  <div className="font-semibold text-accent-foreground">15+ Years</div>
                  <div className="text-sm text-accent-foreground/60">Industry Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
