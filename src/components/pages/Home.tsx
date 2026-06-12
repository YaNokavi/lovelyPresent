import { useEffect } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import HeroSection from "../sections/HeroSection";
import TimelineSection from "../sections/TimelineSection";
import PowerUpsSection from "../sections/PowerUpsSection";

export default function Home() {
  useScrollReveal();

  return (
    <div>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <TimelineSection />
        <PowerUpsSection />
      </main>
      <Footer />
    </div>
  );
}
