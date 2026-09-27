"use client";

import type { WeddingConfigType } from "@/types";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import Image from "next/image";

interface CoupleIntroductionProps {
  bride: WeddingConfigType["bride"];
  groom: WeddingConfigType["groom"];
  isVisible: boolean;
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
      className="py-20 px-4 bg-gradient-to-b from-white to-rose-50/30 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4">
            {t("couple.our-story")}
          </h2>
          <div className="w-24 h-px bg-rose-400 mx-auto"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            {t("couple.story-text")}
          </p>
        </motion.div>

        {/* Couple Cards */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-right"
          >
            <div className="relative inline-block mb-6">
              {/* Khung ảnh dọc chuẩn tỉ lệ 3:4 */}
              <div className="relative w-60 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-rose-100/50 bg-rose-50">
                <Image
                  src={bride.photo}
                  alt={`${bride.fullName}'s photo`}
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 768px) 288px, 320px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-12 h-12 sm:w-14 sm:h-14 bg-rose-200 rounded-full flex items-center justify-center shadow-lg z-10 border-2 border-white">
                <span className="text-white text-xl sm:text-2xl">👸</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 mb-2">
              {bride.fullName}
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-rose-600 mb-4 font-medium">
              {t("couple.the-bride")}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0 lg:ml-auto">
              {t("couple.bride-description")}
            </p>

            {/* Decorative Elements */}
            <div className="mt-6 flex justify-center lg:justify-end space-x-2">
              <div className="w-2 h-2 bg-rose-300 rounded-full"></div>
              <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
              <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
            </div>
          </motion.div>

          {/* Heart Divider Desktop*/}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: inView ? 1 : 0, rotate: inView ? 0 : -180 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-rose-100"
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

          {/* Heart Divider (Mobile) */}
          <div className="lg:hidden flex justify-center -my-4 z-20">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: inView ? 1 : 0, rotate: inView ? 0 : -180 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-rose-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-rose-500 fill-rose-400/20 stroke-rose-500 stroke-[1.5] animate-pulse"
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
            <div className="relative inline-block mb-6">
              {/* Khung ảnh dọc chuẩn tỉ lệ 3:4 */}
              <div className="relative w-60 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-blue-100/50 bg-blue-50">
                <Image
                  src={groom.photo}
                  alt={`${groom.fullName}'s photo`}
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 768px) 288px, 320px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
              <div className="absolute -bottom-3 -left-3 w-12 h-12 sm:w-14 sm:h-14 bg-blue-200 rounded-full flex items-center justify-center shadow-lg z-10 border-2 border-white">
                <span className="text-white text-xl sm:text-2xl">🤴</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 mb-2">
              {groom.fullName}
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-blue-600 mb-4 font-medium">
              {t("couple.the-groom")}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
              {t("couple.groom-description")}
            </p>

            {/* Decorative Elements */}
            <div className="mt-6 flex justify-center lg:justify-start space-x-2">
              <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </motion.div>
        </div>

        {/* Love Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg border border-white/40">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-700 italic mb-4">
              {t("couple.love-quote")}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">— Clannad</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
