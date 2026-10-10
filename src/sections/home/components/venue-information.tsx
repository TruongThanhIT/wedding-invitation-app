"use client";

import type { WeddingConfigType } from "@/types";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { generateMapLink } from "@/lib/wedding-utils";
import { useInView } from "react-intersection-observer";

interface VenueInformationProps {
  venue: WeddingConfigType["venue"];
}

export const VenueInformation = ({ venue }: VenueInformationProps) => {
  const { t } = useTranslation("home");

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className="py-12 sm:py-20 px-3 sm:px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-2 sm:mb-4">
            {t("venue.location-title")}
          </h2>
          <div className="w-16 sm:w-24 h-px bg-rose-400 mx-auto"></div>
          <p className="text-xs sm:text-lg md:text-xl text-gray-600 mt-3 sm:mt-6 max-w-2xl mx-auto px-2">
            {t("venue.location-subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
          {/* Ceremony Venue */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-md sm:shadow-lg border border-purple-100"
          >
            <div className="text-center mb-5 sm:mb-8">
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-md sm:shadow-lg">
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-7 h-7 sm:w-10 sm:h-10 text-rose-100"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 mb-1 sm:mb-2">
                {t("venue.ceremony-time")}
              </h3>
              <div className="w-12 sm:w-16 h-px bg-purple-400 mx-auto"></div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h4 className="text-base sm:text-xl md:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2">
                  {venue.ceremony.name}
                </h4>
                <p className="text-xs sm:text-base md:text-lg text-gray-600 mb-3 sm:mb-4">
                  {venue.ceremony.address}
                </p>
                <div className="inline-block bg-white/70 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm">
                  <p className="text-purple-700 font-medium text-xs sm:text-base">
                    📅 {venue.ceremony.time}
                  </p>
                </div>
              </div>

              <div className="bg-white/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-2 sm:space-y-4">
                <h5 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-xs sm:text-base">
                  {t("venue.ceremony-details")}
                </h5>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                  <p>• {t("venue.arrive-early")}</p>
                  <p>• {t("venue.unplugged")}</p>
                  <p>• {t("venue.parking")}</p>
                </div>
              </div>

              <button
                onClick={() =>
                  window.open(generateMapLink(venue.ceremony), "_blank")
                }
                className="w-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-medium hover:from-purple-500 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-xl text-xs sm:text-base cursor-pointer"
              >
                {t("venue.view-map")}
              </button>
            </div>
          </motion.div>

          {/* Reception Venue */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-md sm:shadow-lg border border-amber-100"
          >
            <div className="text-center mb-5 sm:mb-8">
              <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-md sm:shadow-lg">
                <span className="text-white text-2xl sm:text-3xl">🥂</span>
              </div>
              <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 mb-1 sm:mb-2">
                {t("venue.reception-time")}
              </h3>
              <div className="w-12 sm:w-16 h-px bg-amber-400 mx-auto"></div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h4 className="text-base sm:text-xl md:text-2xl font-semibold text-gray-800 mb-1 sm:mb-2">
                  {venue.reception.name}
                </h4>
                <p className="text-xs sm:text-base md:text-lg text-gray-600 mb-3 sm:mb-4">
                  {venue.reception.address}
                </p>
                <div className="inline-block bg-white/70 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm">
                  <p className="text-amber-700 font-medium text-xs sm:text-base">
                    🍽️ {venue.reception.time}
                  </p>
                </div>
              </div>

              <div className="bg-white/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-2 sm:space-y-4">
                <h5 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-xs sm:text-base">
                  {t("venue.reception-details")}
                </h5>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                  <p>• {t("venue.welcome-drink")}</p>
                  <p>• {t("venue.open-bar")}</p>
                  <p>• {t("venue.dancing")}</p>
                </div>
              </div>

              <button
                onClick={() =>
                  window.open(generateMapLink(venue.reception), "_blank")
                }
                className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-medium hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-xl text-xs sm:text-base cursor-pointer"
              >
                {t("venue.view-map")}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};