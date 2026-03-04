export function WhatWeDeliver() {
  const cards = [
    {
      title: "Revenue Growth",
      description:
        "We don\u2019t chase vanity metrics. Every campaign, every creative, every optimization is aimed at one thing \u2014 growing your revenue. Whether it\u2019s through paid ads, SEO, or social media, our strategies are built to bring in paying customers, not just followers.",
    },
    {
      title: "Scalable customer acquisition",
      description:
        "We build systems that bring in customers consistently \u2014 not one-time spikes. From lead generation funnels to retargeting strategies, we create acquisition machines that scale with your business.",
    },
    {
      title: "High conversion rates",
      description:
        "Traffic means nothing without conversions. We optimize every touchpoint \u2014 landing pages, ad creatives, CTAs, email flows \u2014 to turn visitors into leads and leads into customers.",
    },
    {
      title: "Clear Performance Insights",
      description:
        "No guesswork. No jargon-filled reports. You get clear, actionable insights every month \u2014 what\u2019s working, what\u2019s not, and exactly what we\u2019re doing next. Full transparency, always.",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#FFF8E7] px-4 py-16 md:px-10 md:py-20 lg:px-16 lg:py-28">
      {/* Subtle golden radial glow in center */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#F5A623]/15 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto">
        {/* Heading */}
        <h2 className="text-foreground font-black uppercase text-3xl sm:text-4xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-4">
          What We Deliver ?
        </h2>

        {/* Subtitle */}
        <p className="text-foreground/80 text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed mb-12 md:mb-16">
          {"We don\u2019t just \u201Cdo marketing.\u201D We deliver measurable business outcomes."}
        </p>

        {/* 2x2 Card Grid */}
        <div className="relative">
          {/* Center diamond glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 md:w-24 md:h-24"
            aria-hidden="true"
          >
            <div className="w-full h-full rotate-45 bg-[#F5A623]/30 blur-[20px] rounded-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-[#1A1A1A] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 flex flex-col"
              >
                <h3 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl leading-tight mb-4 md:mb-6">
                  {card.title}
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
