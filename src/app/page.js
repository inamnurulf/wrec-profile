"use client";

import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Vision from "@/components/Vision";
import ResearchScope from "@/components/ResearchScope";
import Milestones from "@/components/MilesStone";
import Team from "@/components/Teams";
import Contact from "@/components/Contact";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 max-w-screen overflow-x-hidden">
      <Hero />
      <About />
      <Vision />
      <ResearchScope />
      <Milestones />
      <Team />
      <Contact />
    </main>
  );
}







