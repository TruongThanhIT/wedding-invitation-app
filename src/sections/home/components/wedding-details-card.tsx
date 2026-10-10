"use client";

import { motion } from "motion/react";
import {
  formatWeddingTime,
  generateGoogleCalendarLink,
  generateMapLink,
} from "@/lib/wedding-utils";
import type { WeddingConfigType } from "@/types";
import { useTranslation } from "react-i18next";
import { useTranslate } from "@/locales";

interface WeddingDetailsCardProps {
  date: Date;
  venue: WeddingConfigType["venue"];
}

export const WeddingDetailsCard = ({
  date,
  venue,
}: WeddingDetailsCardProps) => {
  const { currentLang } = useTranslate();
  const { t } = useTranslation("home");

  const calendarEvent = {
    title: t("details.our-wedding-day"),
    start: date,
    end: new Date(date.getTime() + 5 * 60 * 60 * 1000), // 5 hours later
    description: t("details.join-us"),
    location: venue.ceremony.address,
  };

  return (
    <div className="py-12 sm:py-20 bg-gradient-to-br from-white to-rose-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-3 sm:mb-4">
            {t("details.title")}
          </h2>
          <div className="w-24 h-px bg-rose-400 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            {t("details.join-us-text")}
          </p>
        </motion.div>

        {/* Date Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-gradient-to-br from-white via-rose-50/30 to-pink-50/50 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-10 md:p-12 mb-8 sm:mb-12 border border-rose-100/50 overflow-hidden group"
        >
          {/* Background Decorations */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-rose-200/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>

          <div className="relative z-10">
            {/* Save the Date Header */}
            <div className="text-center mb-6 sm:mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-rose-500/10 to-pink-500/10 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 border border-rose-200/50"
              >
                <span className="text-lg sm:text-2xl">💕</span>
                <span className="text-xs sm:text-base font-semibold text-rose-600 tracking-wide uppercase">
                  {t("details.date")}
                </span>
              </motion.div>
            </div>

            {/* Date Display: Mobile xếp ngang 3 ô (grid-cols-3) */}
            <div className="grid grid-cols-3 sm:flex sm:flex-row items-stretch justify-center gap-2 sm:gap-8 md:gap-12 mb-6 sm:mb-8">
              {/* Day */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center group-hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-xl sm:rounded-2xl p-2 sm:p-6 shadow-md sm:shadow-lg mb-1 sm:mb-2 h-16 sm:h-28 md:h-32 lg:h-36 flex flex-col items-center justify-center">
                  <div className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none">
                    {date.getDate()}
                  </div>
                </div>
                <p className="text-[10px] sm:text-sm font-medium text-gray-500 uppercase tracking-wider mt-1 sm:mt-3">
                  {t("details.day")}
                </p>
              </motion.div>

              {/* Month */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center group-hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl sm:rounded-2xl p-2 sm:p-6 shadow-md sm:shadow-lg mb-1 sm:mb-2 h-16 sm:h-28 md:h-32 lg:h-36 flex flex-col items-center justify-center">
                  <div className="text-xs sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-none mb-0.5 sm:mb-1">
                    {date
                      .toLocaleDateString(currentLang.numberFormat.code, {
                        month: "short",
                      })
                      .toUpperCase()}
                  </div>
                  <div className="text-[10px] sm:text-base md:text-lg font-medium opacity-90">
                    {date.getFullYear()}
                  </div>
                </div>
                <p className="text-[10px] sm:text-sm font-medium text-gray-500 uppercase tracking-wider mt-1 sm:mt-3">
                  {t("details.month")} & {t("details.year")}
                </p>
              </motion.div>

              {/* Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center group-hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl sm:rounded-2xl p-2 sm:p-6 shadow-md sm:shadow-lg mb-1 sm:mb-2 h-16 sm:h-28 md:h-32 lg:h-36 flex flex-col items-center justify-center">
                  <div className="text-xs sm:text-xl md:text-2xl lg:text-3xl font-bold leading-none">
                    {formatWeddingTime(date, currentLang.numberFormat.code)}
                  </div>
                </div>
                <p className="text-[10px] sm:text-sm font-medium text-gray-500 uppercase tracking-wider mt-1 sm:mt-3">
                  {t("details.time")}
                </p>
              </motion.div>
            </div>

            {/* Weekday Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-center mb-6 sm:mb-8"
            >
              <div className="relative inline-block w-full max-w-sm sm:max-w-md md:max-w-lg bg-gradient-to-r from-white/90 via-rose-50/80 to-white/90 backdrop-blur-sm rounded-xl sm:rounded-3xl px-3 py-3 sm:px-6 sm:py-5 md:px-8 md:py-6 shadow-md sm:shadow-xl border border-rose-100/50 group/weekday">
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-1 sm:mb-3">
                    <span className="text-base sm:text-2xl md:text-3xl">
                      🗓️
                    </span>
                    <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 font-bold text-center leading-tight">
                      {date.toLocaleDateString(currentLang.numberFormat.code, {
                        weekday: "long",
                      })}
                    </p>
                    <span className="text-base sm:text-2xl md:text-3xl">
                      🗓️
                    </span>
                  </div>
                  <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mb-2 sm:mb-3"></div>
                  <p className="text-xs sm:text-base md:text-lg text-gray-600 font-medium">
                    {date.toLocaleDateString(currentLang.numberFormat.code, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-[11px] sm:text-sm text-rose-600 font-semibold mt-1 sm:mt-2">
                    {t("details.mark-calendar")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center"
            >
              <motion.a
                href={generateGoogleCalendarLink(calendarEvent)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-lg shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 group/btn"
              >
                <span className="text-base sm:text-xl group-hover/btn:scale-110 transition-transform duration-200">
                  📅
                </span>
                <span>{t("details.add-to-calendar")}</span>
                <motion.span
                  className="text-xs sm:text-sm opacity-75"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>

              <p className="text-[11px] sm:text-sm text-gray-500 mt-2 sm:mt-4 max-w-md mx-auto">
                {t("details.message")}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Venue Cards */}
      </div>
      {/* <div className="grid md:grid-cols-2 gap-4 sm:gap-8"> */}
        {/* Ceremony Card */}
        {/* <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-purple-50 to-indigo-100/60 rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8 border border-gray-100 group hover:shadow-xl transition-all duration-300"
        >
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-block bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full p-2.5 sm:p-4 mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-7 h-7 sm:w-10 sm:h-10 text-purple-600"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
              {t("details.ceremony")}
            </h3>
            <div className="w-12 sm:w-16 h-px bg-purple-400 mx-auto"></div>
          </div>

          <div className="space-y-3 sm:space-y-4 text-center">
            <div>
              <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                {venue.ceremony.name}
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                {venue.ceremony.address}
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 sm:p-4">
              <p className="font-medium text-gray-800 text-xs sm:text-base">
                {t("details.time")}
              </p>
              <p className="text-purple-600 font-semibold text-xs sm:text-base">
                {venue.ceremony.time}
              </p>
            </div>

            <motion.a
              href={generateMapLink(venue.ceremony)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:shadow-lg transition-all duration-300"
            >
              📍 {t("details.get-directions")}
            </motion.a>
          </div>
        </motion.div> */}

        {/* Reception Card */}
        {/* <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-br from-amber-50 to-orange-100/60 rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8 border border-gray-100 group hover:shadow-xl transition-all duration-300"
        >
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-block bg-gradient-to-r from-amber-200 to-orange-100 rounded-full p-2.5 sm:p-4 mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
              <div className="text-2xl sm:text-4xl">🥂</div>
            </div>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
              {t("details.reception")}
            </h3>
            <div className="w-12 sm:w-16 h-px bg-orange-400 mx-auto"></div>
          </div>

          <div className="space-y-3 sm:space-y-4 text-center">
            <div>
              <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                {venue.reception.name}
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                {venue.reception.address}
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 sm:p-4">
              <p className="font-medium text-gray-800 text-xs sm:text-base">
                {t("details.time")}
              </p>
              <p className="text-orange-600 font-semibold text-xs sm:text-base">
                {venue.reception.time}
              </p>
            </div>

            <motion.a
              href={generateMapLink(venue.reception)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:shadow-lg transition-all duration-300"
            >
              📍 {t("details.get-directions")}
            </motion.a>
          </div>
        </motion.div> */}
      {/* </div> */}
    </div>
  );
};
