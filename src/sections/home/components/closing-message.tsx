"use client";

import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

interface ClosingMessageProps {
  bride: string;
  groom: string;
}

export const ClosingMessage = ({ bride, groom }: ClosingMessageProps) => {
  const { t } = useTranslation("home");

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className="py-12 sm:py-16 px-4 bg-gradient-to-br from-rose-100 to-pink-200"
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          className="mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 mb-2.5">
            {t("closing-message.title")}
          </h2>
          <div className="w-16 h-px bg-rose-400 mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.95 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-white/75 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-lg border border-white/60 mb-6 sm:mb-8"
        >
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-5">
            &quot;{t("closing-message.quote")}&quot;
          </p>
          <div className="text-xs sm:text-sm text-gray-500">
            {t("closing-message.with-love")}
          </div>
          <div className="text-base sm:text-xl md:text-2xl font-serif font-bold text-rose-600 mt-1">
            {groom} &amp; {bride}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex justify-center space-x-3 text-xl sm:text-2xl"
        >
          <span className="animate-bounce">💕</span>
          <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>
            💖
          </span>
          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
            💕
          </span>
        </motion.div>
      </div>
    </div>
  );
};