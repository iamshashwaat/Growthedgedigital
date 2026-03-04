import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";

const footerLinks = [
  { label: "Our Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Main footer area with warm background */}
      <div className="relative bg-[#FFF8E7] px-6 pt-12 pb-8 md:px-10 lg:px-16">
        {/* Subtle golden radial glow on left */}
        <div
          className="pointer-events-none absolute top-0 left-0 h-full w-1/2"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(245,166,35,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Left: Logo + tagline */}
          <div className="flex flex-col gap-3">
            <Image
              src="/images/logo.png"
              alt="GrowthEdge Digital"
              width={200}
              height={80}
              className="h-16 w-auto"
            />
            <p className="text-foreground/70 text-base">
              A Digital Marketing Agency
            </p>
          </div>

          {/* Center: Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-lg text-foreground hover:text-[#F5A623] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Get in touch */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-foreground">Get in touch</h3>
            <a
              href="tel:+919532073896"
              className="flex items-center gap-2 text-foreground hover:text-[#F5A623] transition-colors"
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span className="text-sm md:text-base">+91- 95320 73896</span>
            </a>
            <a
              href="mailto:Growthedgedigital.co@gmail.com"
              className="flex items-center gap-2 text-foreground hover:text-[#F5A623] transition-colors"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span className="text-sm md:text-base break-all">Growthedgedigital.co@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between bg-foreground px-6 py-3 md:px-10 lg:px-16">
        <p className="text-sm text-background/80">Established in 2025</p>
        <p className="text-sm text-background/80">All right reserved</p>
      </div>
    </footer>
  );
}
