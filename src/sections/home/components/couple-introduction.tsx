"use client";

import type { WeddingConfigType } from "@/types";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import Image from "next/image";

interface CoupleIntroductionProps {
  bride: WeddingConfigType["bride"];
  groom: WeddingConfigType["groom"];
  isVisible?: boolean;
}

export const CoupleIntroduction = ({
  bride,
  groom,
}: CoupleIntroductionProps) => {
  const { t } = useTranslation("home");

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className="py-10 sm:py-16 px-3 sm:px-6 bg-gradient-to-b from-white to-rose-50/30 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <div className="relative grid grid-cols-2 gap-3 sm:gap-8 lg:gap-16 items-start">
          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-center flex flex-col items-center"
          >
            <div className="relative inline-block mb-3 sm:mb-4">
              <div className="relative w-36 h-48 sm:w-60 sm:h-76 md:w-72 md:h-[360px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border-2 sm:border-4 border-white ring-1 ring-rose-200/60 bg-rose-50 mx-auto">
                <Image
                  src={bride.photo}
                  alt={`${bride.fullName}'s photo`}
                  fill
                  sizes="(max-width: 640px) 144px, (max-width: 1024px) 240px, 288px"
                  className="object-cover object-top transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
              {/* Icon Emoji Bride */}
              <div className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2.5 sm:-right-2.5 w-7 h-7 sm:w-12 sm:h-12 bg-rose-100 rounded-full flex items-center justify-center shadow-md z-10 border-2 border-white ring-1 ring-rose-200">
                <span className="text-xs sm:text-xl">👸</span>
              </div>
            </div>

            <h3 className="text-[13px] sm:text-xl md:text-2xl lg:text-[26px] font-serif text-gray-900 mb-0.5 sm:mb-1 font-bold tracking-tight leading-snug sm:whitespace-nowrap">
              {bride.fullName}
            </h3>
            <p className="text-[11px] sm:text-base md:text-lg text-rose-600 mb-1.5 sm:mb-3 font-semibold">
              {t("couple.the-bride")}
            </p>
            <p className="text-[11px] sm:text-sm md:text-base text-gray-700 leading-relaxed max-w-xs sm:max-w-sm px-1 sm:px-2">
              {t("couple.bride-description")}
            </p>

            <div className="mt-2.5 sm:mt-4 flex justify-center space-x-1 sm:space-x-1.5">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-rose-300 rounded-full"></div>
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-rose-400 rounded-full"></div>
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-rose-500 rounded-full"></div>
            </div>
          </motion.div>

          {/* Heart Divider */}
          <div className="flex absolute left-1/2 top-28 sm:top-38 md:top-44 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: inView ? 1 : 0, rotate: inView ? 0 : -180 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white rounded-full flex items-center justify-center shadow-lg border-2 sm:border-4 border-rose-100 ring-1 sm:ring-2 ring-rose-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-rose-500 fill-rose-400/20 stroke-rose-500 stroke-[1.5] animate-pulse"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          </div>

          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-center flex flex-col items-center"
          >
            <div className="relative inline-block mb-3 sm:mb-4">
              <div className="relative w-36 h-48 sm:w-60 sm:h-76 md:w-72 md:h-[360px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border-2 sm:border-4 border-white ring-1 ring-blue-200/60 bg-blue-50 mx-auto">
                <Image
                  src={groom.photo}
                  alt={`${groom.fullName}'s photo`}
                  fill
                  sizes="(max-width: 640px) 144px, (max-width: 1024px) 240px, 288px"
                  className="object-cover object-top transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
              {/* Icon Emoji Groom */}
              <div className="absolute -bottom-1.5 -left-1.5 sm:-bottom-2.5 sm:-left-2.5 w-7 h-7 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-md z-10 border-2 border-white ring-1 ring-blue-200">
                <span className="text-xs sm:text-xl">🤴</span>
              </div>
            </div>

            <h3 className="text-[13px] sm:text-xl md:text-2xl lg:text-[26px] font-serif text-gray-900 mb-0.5 sm:mb-1 font-bold tracking-tight leading-snug sm:whitespace-nowrap">
              {groom.fullName}
            </h3>
            <p className="text-[11px] sm:text-base md:text-lg text-blue-600 mb-1.5 sm:mb-3 font-semibold">
              {t("couple.the-groom")}
            </p>
            <p className="text-[11px] sm:text-sm md:text-base text-gray-700 leading-relaxed max-w-xs sm:max-w-sm px-1 sm:px-2">
              {t("couple.groom-description")}
            </p>

            <div className="mt-2.5 sm:mt-4 flex justify-center space-x-1 sm:space-x-1.5">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-300 rounded-full"></div>
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full"></div>
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};