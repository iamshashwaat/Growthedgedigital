import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const servicesTopRow = [
  {
    title: "SEO (Search Engine Optimization)",
    points: [
      "Improve search rankings and visibility.",
      "Drive high-quality organic traffic.",
      "Generate consistent long-term leads.",
    ],
    variant: "dark" as const,
  },
  {
    title: "Social Media Marketing",
    points: [
      "Build strong brand presence online.",
      "Engage and grow your audience.",
      "Turn followers into customers.",
    ],
    variant: "amber" as const,
  },
  {
    title: "Web Development & Design",
    points: [
      "Create modern, responsive websites.",
      "Optimize for user experience and conversions.",
      "Build scalable digital platforms.",
    ],
    variant: "dark" as const,
  },
  {
    title: "PPC (Pay-Per-Click) Advertising",
    points: [
      "Target ready-to-buy customers.",
      "Maximize ROI with optimized ads.",
      "Scale campaigns profitably.",
    ],
    variant: "amber" as const,
  },
];

const servicesBottomRow = [
  {
    title: "Content Marketing",
    points: [
      "Create valuable, engaging content.",
      "Build authority in your niche.",
      "Drive traffic and conversions.",
    ],
    variant: "dark" as const,
  },
  {
    title: "Email Marketing",
    points: [
      "Automate lead nurturing.",
      "Increase customer retention.",
      "Boost repeat sales.",
    ],
    variant: "amber" as const,
  },
  {
    title: "Branding & Creative Services",
    points: [
      "Develop strong brand identity.",
      "Create consistent visual messaging.",
      "Stand out in competitive markets.",
    ],
    variant: "dark" as const,
  },
  {
    title: "Analytics & Reporting",
    points: [
      "Track key performance metrics.",
      "Make data-driven decisions.",
      "Improve marketing efficiency.",
    ],
    variant: "amber" as const,
  },
];

function ServiceCard({
  title,
  points,
  variant,
}: {
  title: string;
  points: string[];
  variant: "dark" | "amber";
}) {
  const isDark = variant === "dark";

  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 ${
        isDark ? "bg-[#1A1A1A]" : "bg-[#F5A623]"
      }`}
    >
      <h3
        className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 leading-tight ${
          isDark ? "text-white" : "text-[#1A1A1A]"
        }`}
      >
        {title}
      </h3>
      <ul className="space-y-2">
        {points.map((point, i) => (
          <li
            key={i}
            className={`flex items-start gap-2 text-sm sm:text-base ${
              isDark ? "text-white" : "text-[#1A1A1A]"
            }`}
          >
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-current shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Services Hero Section */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-10 sm:mb-14 md:mb-16">
            <p className="text-[#F5A623] font-bold uppercase tracking-wide text-sm sm:text-base mb-3 sm:mb-4">
              OUR SERVICES
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight max-w-4xl mx-auto">
              From strategy to execution, we deliver marketing that truly{" "}
              <span className="bg-[#F5A623] px-2 text-foreground">performs</span>
            </h1>
          </div>

          {/* Top Row - 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 md:mb-10">
            {servicesTopRow.map((service, i) => (
              <ServiceCard
                key={i}
                title={service.title}
                points={service.points}
                variant={service.variant}
              />
            ))}
          </div>

          {/* Bottom Row - 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {servicesBottomRow.map((service, i) => (
              <ServiceCard
                key={i}
                title={service.title}
                points={service.points}
                variant={service.variant}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
