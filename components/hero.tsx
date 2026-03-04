import Image from "next/image";
import { EyeIcon } from "./eye-icon";

export function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-65px)] overflow-hidden bg-background flex flex-col justify-center px-4 py-8 md:px-10 md:py-16 lg:px-16 lg:py-24">
      <div className="relative w-full">
        {/* Line 1: YOUR VISION + Eye Icon */}
        <div className="flex items-center gap-1 md:gap-3">
          <h1 className="hero-text text-foreground whitespace-nowrap">
            YOUR{" "}
            <span className="text-[#F5A623]">VISION</span>
          </h1>
          <EyeIcon className="w-[clamp(2.5rem,8vw,8rem)] h-auto shrink-0 -mt-[0.5em]" />
        </div>

        {/* Line 2: OUR CRAFT - centered/right aligned */}
        <div className="flex justify-center md:pl-[15%]">
          <p className="hero-text text-foreground">
            OUR CRAFT
          </p>
        </div>

        {/* Line 3: REAL with pencil overlaying */}
        <div className="relative mt-2 md:mt-0">
          {/* Pencil image - spans across the section diagonally */}
          <div className="absolute left-[-5%] sm:left-[-2%] top-[50%] -translate-y-1/2 w-[75%] sm:w-[80%] md:w-[70%] z-10 pointer-events-none">
            <Image
              src="/images/pencil.png"
              alt=""
              width={1600}
              height={300}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
          <div className="flex justify-end">
            <p className="hero-text text-foreground">
              REAL
            </p>
          </div>
        </div>

        {/* Line 4: GROWTH */}
        <div className="relative z-0">
          <p className="hero-text text-foreground">
            GROWTH
          </p>
        </div>
      </div>
    </section>
  );
}
