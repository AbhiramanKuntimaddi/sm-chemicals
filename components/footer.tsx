import Link from "next/link"
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react"

const footerLinks = {
  products: [
    { name: "Water Treatment", href: "/products" },
    { name: "ETP Chemicals", href: "/products" },
    { name: "Construction Chemicals", href: "/products" },
    { name: "Textile Chemicals", href: "/products" },
    { name: "Pharmaceutical Chemicals", href: "/products" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our History", href: "/about" },
    { name: "Quality Policy", href: "/about" },
    { name: "Careers", href: "/contact" },
    { name: "Contact", href: "/contact" },
  ],
  industries: [
    { name: "Power Plants", href: "/products" },
    { name: "Oil & Gas", href: "/products" },
    { name: "Food & Beverage", href: "/products" },
    { name: "Paints & Coatings", href: "/products" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex h-12 w-12 items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-primary rotate-6 transition-transform group-hover:rotate-12" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                  <span className="text-xl font-black text-primary-foreground">SM</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">SM Chemicals</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent-foreground/60">Industrial Solutions</span>
              </div>
            </Link>
            <p className="mt-6 text-accent-foreground/70 max-w-sm leading-relaxed">
              Your trusted partner for comprehensive chemical solutions across industries. 
              Delivering quality and innovation since 2008.
            </p>
            
            {/* Contact info */}
            <div className="mt-8 space-y-4">
              <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-accent-foreground/70 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:info@smchemicals.co.in" className="flex items-center gap-3 text-sm text-accent-foreground/70 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@smchemicals.co.in</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-accent-foreground/70">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Hyderabad, Telangana, India</span>
              </div>
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-foreground">Products</h3>
                <ul className="mt-6 space-y-4">
                  {footerLinks.products.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group flex items-center text-sm text-accent-foreground/70 transition-colors hover:text-primary"
                      >
                        {link.name}
                        <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 -translate-y-1 translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-foreground">Company</h3>
                <ul className="mt-6 space-y-4">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group flex items-center text-sm text-accent-foreground/70 transition-colors hover:text-primary"
                      >
                        {link.name}
                        <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 -translate-y-1 translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-foreground">Industries</h3>
                <ul className="mt-6 space-y-4">
                  {footerLinks.industries.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group flex items-center text-sm text-accent-foreground/70 transition-colors hover:text-primary"
                      >
                        {link.name}
                        <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 -translate-y-1 translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-accent-foreground/10">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-accent-foreground/50">
              &copy; {new Date().getFullYear()} SM Chemicals. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/about" className="text-sm text-accent-foreground/50 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/about" className="text-sm text-accent-foreground/50 hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
