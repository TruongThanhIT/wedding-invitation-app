"use client";

import { motion } from "motion/react";
import {
  formatWeddingTime,
  generateGoogleCalendarLink,
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

  // Lấy thông tin ngày, tháng, thứ dựa theo ngôn ngữ hiện tại
  const dayNumber = date.getDate();
  const monthString = date.toLocaleDateString(currentLang.numberFormat.code, {
    month: "long",
  });
  const yearNumber = date.getFullYear();
  const weekdayString = date.toLocaleDateString(currentLang.numberFormat.code, {
    weekday: "long",
  });
  const timeString = formatWeddingTime(date, currentLang.numberFormat.code);

  return (
    <div className="py-12 sm:py-20 bg-gradient-to-br from-white to-rose-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900 mb-3 font-bold">
            {t("details.title")}
          </h2>
          <div className="w-20 h-px bg-rose-400 mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto px-2">
            {t("details.join-us-text")}
          </p>
        </motion.div>

        {/* Mini Calendar Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-white rounded-3xl shadow-xl p-6 sm:p-10 max-w-md mx-auto border border-rose-100 text-center overflow-hidden"
        >
          {/* Decorative background blur */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-100/50 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-pink-100/50 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Tag Lưu ngày cưới */}
            <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 border border-rose-200/60 shadow-sm">
              <span>💕</span>
              <span className="uppercase tracking-wider">
                {t("details.date")}
              </span>
            </div>

            {/* Tờ lịch tối giản */}
            <div className="bg-gradient-to-b from-rose-500 to-pink-600 text-white rounded-2xl p-6 sm:p-8 shadow-lg mb-6 relative">
              {/* Vòng khoen lịch giả lập phía trên */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-8">
                <div className="w-3 h-6 bg-gray-300 rounded-full shadow-inner"></div>
                <div className="w-3 h-6 bg-gray-300 rounded-full shadow-inner"></div>
              </div>

              {/* Tháng và Năm */}
              <div className="text-xs sm:text-sm font-medium uppercase tracking-widest text-rose-100 mb-1">
                {monthString} {yearNumber}
              </div>

              {/* Thứ trong tuần */}
              <div className="text-sm sm:text-base font-serif italic text-rose-50 mb-3">
                {weekdayString}
              </div>

              {/* Ngày và Biểu tượng Trái Tim Highlight */}
              <div className="relative inline-flex items-center justify-center my-2">
                <span className="text-6xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-md">
                  {dayNumber}
                </span>
                {/* Trái tim đánh dấu ngày cưới */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-4 text-2xl sm:text-3xl"
                  title="Ngày cưới của chúng mình"
                >
                  ❤️
                </motion.div>
              </div>

              {/* Giờ tổ chức */}
              <div className="mt-3 pt-3 border-t border-white/20 text-xs sm:text-sm font-medium text-rose-100 flex items-center justify-center gap-1.5">
                <span>⏰</span>
                <span>{timeString}</span>
              </div>
            </div>

            {/* Nhắc nhở nhỏ */}
            <p className="text-xs sm:text-sm text-gray-500 mb-6 font-medium">
              {t("details.mark-calendar")} 🗓️
            </p>

            {/* Call to Action: Thêm vào lịch */}
            <motion.a
              href={generateGoogleCalendarLink(calendarEvent)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3.5 px-6 rounded-xl font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span>📅</span>
              <span>{t("details.add-to-calendar")}</span>
              <span className="opacity-75">→</span>
            </motion.a>

            <p className="text-[11px] sm:text-xs text-gray-400 mt-3">
              {t("details.message")}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
