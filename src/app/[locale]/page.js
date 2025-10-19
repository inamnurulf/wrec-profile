"use client";

import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Vision from "@/components/Vision";
import ResearchScope from "@/components/ResearchScope";
import Milestones from "@/components/MilesStone";
import Team from "@/components/Teams";
import Contact from "@/components/Contact";
import SectionDivider from "@/components/atoms/SectionDevider";
import OurGallery from "@/components/OurGallery";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 max-w-screen overflow-x-hidden">
      <Hero />
      <OurGallery id="gallery" />
      <SectionDivider />
      <About />
      <SectionDivider flip />
      <Vision />
      <SectionDivider />
      <ResearchScope />
      <SectionDivider flip />
      <Milestones />
      <SectionDivider />
      <Team />
      <SectionDivider flip />
      <Contact />
    </main>
  );
}
