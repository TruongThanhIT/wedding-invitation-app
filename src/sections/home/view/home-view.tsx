"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { LetterAnimation } from "@/components";
import {
  HeroSection,
  CoupleIntroduction,
  CountdownTimer,
  RSVP,
  GalleryPreview,
  ClosingMessage,
  FloatingNavigation,
  NavigationFAB,
  MusicPlayer,
  ScrollProgressIndicator,
  WeddingEventSection,
} from "../components";
import { NAVIGATION_SECTIONS, WEDDING_CONFIG } from "@/constants";

export default function HomeView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLetter, setShowLetter] = useState(true);

  const [activeCategory, setActiveCategory] = useState<
    "all" | "prewedding" | "memories"
  >("all");

  const activeSection = useScrollSpy(
    NAVIGATION_SECTIONS.map((section) => section.id),
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 250);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleLetterOpen = () => {
    setShowLetter(false);
    setIsLoaded(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <AnimatePresence mode="wait">
        {showLetter ? (
          <LetterAnimation
            key="letter-envelope"
            onOpen={handleLetterOpen}
            coupleName={`${WEDDING_CONFIG.bride.name} & ${WEDDING_CONFIG.groom.name}`}
          />
        ) : (
          <motion.div
            key="wedding-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <FloatingNavigation
              activeSection={activeSection}
              onScrollToSection={scrollToSection}
            />

            {/* Hero Section */}
            <section id="hero" className="relative">
              <HeroSection
                isLoaded={isLoaded}
                couple={WEDDING_CONFIG}
                onScrollToSection={scrollToSection}
              />
            </section>

            {/* Couple Introduction */}
            <section id="couple" className="relative">
              <CoupleIntroduction
                bride={WEDDING_CONFIG.bride}
                groom={WEDDING_CONFIG.groom}
                isVisible={isLoaded}
              />
            </section>

            {/* Date & Venue Section */}
            <section id="details" className="relative">
              <WeddingEventSection
                date={WEDDING_CONFIG.date}
                venue={WEDDING_CONFIG.venue}
              />
            </section>

            {/* RSVP Section */}
            {WEDDING_CONFIG.showRsvp && (
              <section id="rsvp" className="relative">
                <RSVP />
              </section>
            )}

            {/* Gallery Preview */}
            <section id="gallery" className="relative scroll-mt-20">
              <GalleryPreview
                activeCategory={activeCategory}
                onChangeCategory={(cat) => setActiveCategory(cat as any)}
              />
            </section>

            {/* Countdown & Closing Message */}
            <section id="closing" className="relative">
              <CountdownTimer targetDate={WEDDING_CONFIG.date} />
              <ClosingMessage
                bride={WEDDING_CONFIG.bride.fullName}
                groom={WEDDING_CONFIG.groom.fullName}
              />
            </section>

            {/* Music Player */}
            <MusicPlayer />

            {/* Mobile Navigation FAB */}
            <NavigationFAB
              activeSection={activeSection}
              onScrollToSection={scrollToSection}
            />

            {/* Scroll Progress Indicator */}
            <ScrollProgressIndicator activeSection={activeSection} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}