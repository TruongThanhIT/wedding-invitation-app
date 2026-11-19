"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
import { LanguageToggle } from "@/components";

interface LetterAnimationProps {
  onOpen: () => void;
  coupleName: string;
}

const SPARKLE_OFFSETS = [
  { x: -45, y: -35, delay: 0 },
  { x: 45, y: -30, delay: 0.12 },
  { x: -50, y: 20, delay: 0.24 },
  { x: 50, y: 25, delay: 0.36 },
  { x: -20, y: -50, delay: 0.48 },
  { x: 25, y: -45, delay: 0.6 },
];

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export const LetterAnimation = ({
  onOpen,
  coupleName,
}: LetterAnimationProps) => {
  const { t } = useTranslation("home");
  const searchParams = useSearchParams();

  const rawTo = searchParams.get("to") || searchParams.get("toName") || "";
  const guestName = rawTo.trim();

  const [isOpening, setIsOpening] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isOpening) return;

    const openTimer = setTimeout(() => {
      onOpen();
    }, 2400);

    return () => {
      clearTimeout(openTimer);
    };
  }, [isOpening, onOpen]);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.75, ease: SMOOTH_EASE }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 overflow-hidden"
    >
      {/* Nút đổi ngôn ngữ ở góc trên bên phải */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{
          opacity: isOpening ? 0 : 1,
          y: isOpening ? -8 : 0,
        }}
        transition={{ duration: 0.35, ease: SMOOTH_EASE }}
        className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-30 ${
          isOpening ? "pointer-events-none" : ""
        }`}
      >
        <LanguageToggle compact />
      </motion.div>

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100%", opacity: 0.3, rotate: 0 }}
            animate={{
              y: "-100%",
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 360, 720],
              x: [0, 40, -40, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.5,
            }}
            className="absolute text-rose-300"
            style={{
              left: `${10 + i * 15}%`,
            }}
          >
            💕
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-5">
        <div className="text-center w-full max-w-2xl">
          {/* Greeting Text */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{
              opacity: isOpening ? 0 : 1,
              y: isOpening ? -10 : 0,
            }}
            transition={{ duration: 0.5, ease: SMOOTH_EASE }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 mb-2 leading-snug">
              {t("letter.envelope-title")}
            </h1>
            <p className="text-xs sm:text-base text-gray-600 max-w-md mx-auto leading-relaxed">
              {guestName ? (
                <>
                  {t("letter.dear")}{" "}
                  <span className="font-semibold text-rose-600">
                    {guestName}
                  </span>
                  <br />
                  {t("letter.envelope-subtitle")}
                </>
              ) : (
                t("letter.envelope-subtitle")
              )}
            </p>
          </motion.div>

          {/* Letter Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: SMOOTH_EASE }}
            className="relative mx-auto"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              className="relative cursor-pointer"
              onClick={handleClick}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={!isOpening ? { scale: 1.025 } : undefined}
              whileTap={!isOpening ? { scale: 0.98 } : undefined}
              transition={{ duration: 0.3, ease: SMOOTH_EASE }}
            >
              {/* Envelope Back */}
              <motion.div
                className="w-76 h-52 sm:w-96 sm:h-64 bg-gradient-to-br from-rose-200 to-pink-300 rounded-xl shadow-xl relative mx-auto"
                animate={{
                  y: isOpening ? 28 : 0,
                }}
                transition={{ duration: 0.75, ease: SMOOTH_EASE }}
              >
                {/* Envelope Pattern */}
                <div className="absolute inset-3.5 border-2 border-rose-300/35 rounded-lg border-dashed"></div>

                {/* Wax Seal */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                  animate={{
                    scale: isOpening ? 0.6 : isHovered ? 1.08 : 1,
                    opacity: isOpening ? 0 : 1,
                  }}
                  transition={{ duration: 0.35, ease: SMOOTH_EASE }}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-full shadow-lg flex items-center justify-center text-white text-lg sm:text-xl font-bold">
                    💌
                  </div>
                </motion.div>

                {/* Envelope Flap */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-28 sm:h-32 bg-gradient-to-br from-rose-300 to-pink-400 origin-top rounded-t-xl"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  }}
                  animate={{
                    rotateX: isOpening ? -180 : 0,
                  }}
                  transition={{
                    duration: 0.85,
                    delay: isOpening ? 0.08 : 0,
                    ease: SMOOTH_EASE,
                  }}
                />
              </motion.div>

              {/* Letter Inside */}
              <AnimatePresence>
                {isOpening && (
                  <div className="absolute inset-x-0 -top-2 flex justify-center z-20 pointer-events-none">
                    <motion.div
                      initial={{ y: 24, opacity: 0, scale: 0.94 }}
                      animate={{ y: -24, opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.35,
                        ease: SMOOTH_EASE,
                      }}
                      className="w-72 sm:w-84 bg-gradient-to-br from-amber-50/95 via-white to-rose-50/95 rounded-2xl shadow-2xl border border-rose-200/80"
                    >
                      <div className="px-6 py-7 sm:px-7 sm:py-8 flex flex-col items-center justify-center text-center">
                        <div className="text-rose-500 text-xl sm:text-2xl mb-2">
                          💕
                        </div>
                        {guestName && (
                          <p className="text-xs text-rose-600 font-semibold mb-1">
                            {t("letter.dear")} {guestName}
                          </p>
                        )}
                        <h3 className="text-base sm:text-lg font-serif font-bold text-gray-900 mb-1.5">
                          {coupleName}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 leading-snug">
                          {t("letter.invitation-title")}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* Sparkle Effects */}
              <AnimatePresence>
                {isHovered && !isOpening && (
                  <>
                    {SPARKLE_OFFSETS.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: [0, item.x],
                          y: [0, item.y],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          delay: item.delay,
                          repeat: Infinity,
                          repeatDelay: 1.5,
                        }}
                        className="absolute top-1/2 left-1/2 text-amber-400 text-sm pointer-events-none"
                      >
                        ✨
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Click Instruction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpening ? 0 : 1 }}
            transition={{ duration: 0.4, ease: SMOOTH_EASE }}
            className="mt-6 sm:mt-8"
          >
            <motion.p
              animate={{
                y: [0, -5, 0],
                opacity: [0.75, 1, 0.75],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-xs sm:text-sm text-gray-600 font-medium"
            >
              {isHovered
                ? t("letter.click-to-open-hover")
                : t("letter.click-to-open")}
            </motion.p>
            <div className="flex justify-center mt-2.5">
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 8, -8, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-xl"
              >
                👆
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};