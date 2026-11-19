"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

interface CountdownTimerProps {
  targetDate: Date;
}

export const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const { t } = useTranslation("home");

  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance > 0) {
      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const timeUnits = [
    {
      label: t("details.day"),
      value: timeLeft.days,
      color: "from-rose-400 to-pink-500",
    },
    {
      label: t("details.hours"),
      value: timeLeft.hours,
      color: "from-purple-400 to-indigo-500",
    },
    {
      label: t("details.minutes"),
      value: timeLeft.minutes,
      color: "from-blue-400 to-cyan-500",
    },
    {
      label: t("details.seconds"),
      value: timeLeft.seconds,
      color: "from-emerald-400 to-teal-500",
    },
  ];

  return (
    <div
      ref={ref}
      className="py-12 sm:py-16 px-4 bg-gradient-to-br from-gray-50 to-rose-50/30"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          className="mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 mb-2.5">
            {t("details.countdown-title")}
          </h2>
          <div className="w-16 h-px bg-rose-400 mx-auto mb-2.5"></div>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-xl mx-auto">
            {t("details.countdown-subtitle")}
          </p>
        </motion.div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{
                opacity: inView ? 1 : 0,
                scale: inView ? 1 : 0.9,
                y: inView ? 0 : 24,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08 + 0.15,
              }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1.5">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${unit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className={`text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br ${unit.color} bg-clip-text text-transparent mb-1.5`}
                  >
                    {unit.value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-gray-500 font-medium text-[11px] sm:text-xs md:text-sm uppercase tracking-wider">
                    {unit.label}
                  </div>
                </div>

                {/* Decorative Corner */}
                <div
                  className={`absolute top-0 right-0 w-7 h-7 bg-gradient-to-br ${unit.color} opacity-20 rounded-bl-full rounded-tr-2xl`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-7 sm:mt-8"
        >
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-sm border border-rose-100">
            <p className="text-gray-700 font-medium text-xs sm:text-sm md:text-base">
              {timeLeft.days > 0
                ? `${timeLeft.days} ${t("details.days-until")}`
                : timeLeft.hours > 0
                ? `${timeLeft.hours} ${t("details.hours-until")}`
                : timeLeft.minutes > 0
                ? `${timeLeft.minutes} ${t("details.minutes-until")}`
                : t("details.moment-arrived")}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};