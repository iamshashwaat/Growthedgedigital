import { LightbulbIcon } from "./lightbulb-icon";

const steps = [
  {
    number: "1",
    title: "Understanding your Business",
    items: [
      "What you sell",
      "Who your target audience is",
      "Your competitors",
      "Your current marketing efforts",
      "Your revenue goals",
    ],
  },
  {
    number: "2",
    title: "Research and Planning",
    items: [
      "Research your industry & competitors",
      "Identify your ideal customer profile",
      "Define clear goals (leads, sales, brand awareness)",
      "Decide the right platforms (Instagram, X, LinkedIn)",
      "Create a monthly strategy & content plan",
    ],
  },
  {
    number: "3",
    title: "Content & Campaign Creation",
    items: [
      "Design creatives (posts, ads, reels, graphics)",
      "Write captions & ad copies",
      "Build landing pages if needed",
      "Set up ad campaigns with proper targeting",
      "Install tracking tools",
    ],
  },
  {
    number: "4",
    title: "Launch, Monitor & Optimize",
    items: [
      "Monitor daily performance",
      "Track leads, clicks, conversions",
      "Test different creatives & audiences",
      "Improve ads based on real data",
    ],
  },
  {
    number: "5",
    title: "Reporting & Growth Review",
    items: [
      "Clear performance reports",
      "Insights on what worked & what didn't",
      "Recommendations for next steps",
      "Growth plan for the upcoming month",
    ],
  },
  {
    number: "6",
    title: "Communication & transparency",
    items: [
      "Regular Updates",
      "Quick Responses",
      "Full transparency on performance and spending",
    ],
  },
];

export function HowWeWork() {
  return (
    <section className="relative w-full bg-[#111111] text-white overflow-hidden">
      <div className="relative px-6 py-16 md:px-12 md:py-20 lg:px-20 lg:py-24">
        {/* Header area */}
        <div className="relative mb-12 md:mb-16">
          <h2
            className="font-marker text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl uppercase tracking-wide"
            style={{ fontFamily: "var(--font-marker)" }}
          >
            HOW WE WORK <span className="text-[#F5A623]">?</span>
          </h2>

          {/* Lightbulb positioned top-right */}
          <div className="absolute -top-4 right-0 sm:-top-8 md:-top-12 md:right-4 lg:-top-10 lg:right-8">
            <LightbulbIcon className="w-16 h-20 sm:w-24 sm:h-28 md:w-32 md:h-36 lg:w-40 lg:h-44" />
          </div>

          <p className="mt-4 text-base md:text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed">
            Growth requires clarity, discipline, and a commitment to outcomes.
          </p>
        </div>

        {/* Steps zigzag layout */}
        <div className="relative">
          {/* SVG dashed connecting line */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              x1="35%"
              y1="8%"
              x2="65%"
              y2="25%"
              stroke="#888"
              strokeWidth="1.5"
              strokeDasharray="8 6"
            />
            <line
              x1="65%"
              y1="25%"
              x2="35%"
              y2="42%"
              stroke="#888"
              strokeWidth="1.5"
              strokeDasharray="8 6"
            />
            <line
              x1="35%"
              y1="42%"
              x2="65%"
              y2="59%"
              stroke="#888"
              strokeWidth="1.5"
              strokeDasharray="8 6"
            />
            <line
              x1="65%"
              y1="59%"
              x2="35%"
              y2="76%"
              stroke="#888"
              strokeWidth="1.5"
              strokeDasharray="8 6"
            />
            <line
              x1="35%"
              y1="76%"
              x2="65%"
              y2="93%"
              stroke="#888"
              strokeWidth="1.5"
              strokeDasharray="8 6"
            />
            {/* Dots at connection points */}
            <circle cx="35%" cy="8%" r="5" fill="#999" />
            <circle cx="65%" cy="25%" r="5" fill="#999" />
            <circle cx="35%" cy="42%" r="5" fill="#999" />
            <circle cx="65%" cy="59%" r="5" fill="#999" />
            <circle cx="35%" cy="76%" r="5" fill="#999" />
            <circle cx="65%" cy="93%" r="5" fill="#999" />
          </svg>

          {/* Steps grid */}
          <div className="relative z-10 flex flex-col gap-10 md:gap-14 lg:gap-16">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`flex flex-col md:flex-row ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <div
                    className={`flex gap-3 md:gap-4 max-w-xl ${
                      isLeft ? "md:ml-8 lg:ml-16" : "md:mr-8 lg:mr-16"
                    }`}
                  >
                    {/* Big number */}
                    <span className="text-5xl md:text-6xl lg:text-7xl font-black text-[#F5A623] leading-none shrink-0 -mt-1">
                      {step.number}
                    </span>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <ul className="flex flex-col gap-1">
                        {step.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm md:text-base text-white/75"
                          >
                            <span className="mt-2 w-1 h-1 rounded-full bg-white/75 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
