import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HowWeWork } from "@/components/how-we-work";
import { WhatWeDeliver } from "@/components/what-we-deliver";
import { WhyUs } from "@/components/why-us";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HowWeWork />
      <WhatWeDeliver />
      <WhyUs />
      <Footer />
    </main>
  );
}
