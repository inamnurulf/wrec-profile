"use client";

import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Vision from "@/components/Vision";
import ResearchScope from "@/components/ResearchScope";
import Milestones from "@/components/MilesStone";
import Team from "@/components/Teams";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Hero />
      <About />
      <Vision />
      <ResearchScope />
      <Milestones />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}







