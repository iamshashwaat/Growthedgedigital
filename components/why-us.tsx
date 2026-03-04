import Image from "next/image";

const leftCards = [
  "We don\u2019t do cookie-cutter strategies. Every plan is custom-built for your business.",
  "We don\u2019t measure success by how viral your post went. We measure success by how much your business grows.",
  "We don\u2019t measure success by how viral your post went. We measure success by how much your business grows.",
];

const rightStatements = [
  "We treat your business like our own, Your wins are our wins",
  "We\u2019re not just service providers, We\u2019re your growth partners",
];

export function WhyUs() {
  return (
    <section className="relative w-full bg-[#111111] overflow-hidden">
      <div className="px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-16 lg:px-16 lg:py-20">
        {/* Two-column grid layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-16">
          {/* ---- LEFT COLUMN ---- */}
          <div className="flex flex-col">
            {/* WHY US ? marker heading */}
            <h2
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[6.5rem] text-white leading-[0.95]"
              style={{ fontFamily: "var(--font-marker)" }}
            >
              {"WHY US ?"}
            </h2>

            {/* Subtitle */}
            <p className="mt-4 text-base md:text-lg lg:text-xl text-white/90 italic">
              {"Why "}
              <span className="font-semibold text-white not-italic">
                @growthedge__digital
              </span>
              {" ?"}
            </p>

            {/* Three white pill cards */}
            <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4 lg:gap-5">
              {leftCards.map((text, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl sm:rounded-[2rem] px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-5 max-w-md"
                >
                  <p className="text-xs sm:text-sm md:text-[0.95rem] text-[#111111] text-center leading-relaxed font-medium">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* Chess king image at bottom-left */}
            <div className="relative mt-4 sm:mt-6 h-32 sm:h-44 md:h-52 lg:h-56 w-28 sm:w-36 md:w-44 lg:w-48">
              <Image
                src="/images/chess-king.png"
                alt="White chess king piece lying on its side"
                fill
                className="object-contain object-left-bottom"
              />
            </div>
          </div>

          {/* ---- RIGHT COLUMN ---- */}
          <div className="flex flex-col mt-10 lg:mt-0 lg:justify-between">
            {/* Large amber heading - right-aligned */}
            <div className="lg:pt-8">
              <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-black text-[#F5A623] uppercase leading-[1.05] tracking-tight text-left lg:text-right">
                A DIFFERENT
                <br />
                <span className="inline-block text-right w-full">KIND OF</span>
                <br />
                PARTNERSHIP
              </h3>
            </div>

            {/* Two white horizontal statement bars */}
            <div className="mt-8 sm:mt-10 lg:mt-auto flex flex-col gap-3 sm:gap-5 lg:gap-6">
              {rightStatements.map((text, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl sm:rounded-[2rem] px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5"
                >
                  <p className="text-xs sm:text-sm md:text-base text-[#111111] text-center leading-relaxed font-medium">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
