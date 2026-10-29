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
      className="py-16 sm:py-20 px-4 bg-gradient-to-b from-white to-rose-50/30 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Couple Cards */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-right"
          >
            <div className="relative inline-block mb-4 sm:mb-6">
              {/* Tối ưu kích thước khung ảnh */}
              <div className="relative w-44 h-56 sm:w-72 sm:h-96 md:w-80 md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border-2 sm:border-4 border-white ring-1 ring-rose-200/60 bg-rose-50 mx-auto">
                <Image
                  src={bride.photo}
                  alt={`${bride.fullName}'s photo`}
                  fill
                  sizes="(max-width: 640px) 176px, (max-width: 1024px) 288px, 320px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
              {/* Icon Emoji Bride */}
              <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-10 h-10 sm:w-14 sm:h-14 bg-rose-100 rounded-full flex items-center justify-center shadow-lg z-10 border-2 border-white ring-1 ring-rose-200">
                <span className="text-white text-lg sm:text-2xl">👸</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-900 mb-1 sm:mb-2 font-bold tracking-tight">
              {bride.fullName}
            </h3>
            <p className="text-sm sm:text-lg md:text-xl text-rose-600 mb-3 sm:mb-4 font-semibold">
              {t("couple.the-bride")}
            </p>
            <p className="text-xs sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-sm sm:max-w-md mx-auto lg:mx-0 lg:ml-auto px-4 sm:px-0">
              {t("couple.bride-description")}
            </p>

            <div className="mt-5 sm:mt-6 flex justify-center lg:justify-end space-x-1.5 sm:space-x-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-300 rounded-full"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-500 rounded-full"></div>
            </div>
          </motion.div>

          {/* Heart Divider Desktop */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: inView ? 1 : 0, rotate: inView ? 0 : -180 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-rose-100 ring-2 ring-rose-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-8 h-8 text-rose-500 fill-rose-400/20 stroke-rose-500 stroke-[1.5] animate-pulse"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          </div>

          {/* Heart Divider Mobile */}
          <div className="lg:hidden flex justify-center -my-2 z-20">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: inView ? 1 : 0, rotate: inView ? 0 : -180 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-rose-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 text-rose-500 fill-rose-400/20 stroke-rose-500 stroke-[1.5] animate-pulse"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          </div>

          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center lg:text-left"
          >
            <div className="relative inline-block mb-4 sm:mb-6">
              {/* Tối ưu kích thước khung ảnh */}
              <div className="relative w-44 h-56 sm:w-72 sm:h-96 md:w-80 md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border-2 sm:border-4 border-white ring-1 ring-blue-200/60 bg-blue-50 mx-auto">
                <Image
                  src={groom.photo}
                  alt={`${groom.fullName}'s photo`}
                  fill
                  sizes="(max-width: 640px) 176px, (max-width: 1024px) 288px, 320px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
              {/* Icon Emoji Groom */}
              <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-10 h-10 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center shadow-lg z-10 border-2 border-white ring-1 ring-blue-200">
                <span className="text-white text-lg sm:text-2xl">🤴</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-900 mb-1 sm:mb-2 font-bold tracking-tight">
              {groom.fullName}
            </h3>
            <p className="text-sm sm:text-lg md:text-xl text-blue-600 mb-3 sm:mb-4 font-semibold">
              {t("couple.the-groom")}
            </p>
            <p className="text-xs sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-sm sm:max-w-md mx-auto lg:mx-0 px-4 sm:px-0">
              {t("couple.groom-description")}
            </p>

            <div className="mt-5 sm:mt-6 flex justify-center lg:justify-start space-x-1.5 sm:space-x-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-300 rounded-full"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};