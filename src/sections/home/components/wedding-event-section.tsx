"use client";

import type { WeddingConfigType } from "@/types";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useTranslate } from "@/locales";
import { generateGoogleCalendarLink, generateMapLink } from "@/lib/wedding-utils";
import { useInView } from "react-intersection-observer";

interface WeddingEventSectionProps {
  date: Date;
  venue: WeddingConfigType["venue"];
}

export const WeddingEventSection = ({ date, venue }: WeddingEventSectionProps) => {
  const { currentLang } = useTranslate();
  const { t } = useTranslation("home");

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const calendarEvent = {
    title: t("details.our-wedding-day"),
    start: date,
    end: new Date(date.getTime() + 5 * 60 * 60 * 1000),
    description: t("details.join-us"),
    location: venue.ceremony.address,
  };

  const weddingYear = date.getFullYear();
  const weddingMonthIndex = date.getMonth();
  const weddingDay = date.getDate();

  const monthString = date.toLocaleDateString(currentLang.numberFormat.code, {
    month: "long",
  });

  const formattedFullDate = date.toLocaleDateString(currentLang.numberFormat.code, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const firstDayOfMonth = new Date(weddingYear, weddingMonthIndex, 1);
  let startDayOffset = firstDayOfMonth.getDay() - 1;
  if (startDayOffset === -1) startDayOffset = 6;

  const totalDaysInMonth = new Date(weddingYear, weddingMonthIndex + 1, 0).getDate();
  const daysInMonth = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);
  const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  return (
    <section
      id="details"
      ref={ref}
      className="py-10 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-white via-rose-50/25 to-white overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-7 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-4xl font-serif text-gray-900 mb-2 font-bold">
            {t("details.title")}
          </h2>
          <div className="w-16 h-px bg-rose-400 mx-auto mb-2.5"></div>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-md mx-auto">
            {t("details.join-us-text")}
          </p>
        </motion.div>

        {/* Main Grid cân bằng chiều cao 2 cột */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* 📅 TỜ LỊCH THÁNG GỌN ĐẸP (Col 5) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 bg-white rounded-3xl p-4 sm:p-5 shadow-lg border border-rose-100 flex flex-col justify-between"
          >
            <div>
              {/* Header Lịch */}
              <div className="text-center mb-3">
                <span className="inline-block text-[11px] sm:text-xs font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                  {monthString} / {weddingYear}
                </span>
              </div>

              {/* Lưới Lịch thu gọn dọc */}
              <div className="grid grid-cols-7 gap-0.5 text-center text-xs mb-3">
                {weekDays.map((day, idx) => (
                  <div
                    key={idx}
                    className="font-semibold text-gray-400 text-[11px] py-1"
                  >
                    {day}
                  </div>
                ))}

                {Array.from({ length: startDayOffset }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="py-1" />
                ))}

                {daysInMonth.map((day) => {
                  const isWeddingDay = day === weddingDay;
                  return (
                    <div
                      key={day}
                      className="relative flex items-center justify-center py-1 text-xs font-medium"
                    >
                      {isWeddingDay ? (
                        <motion.div
                          animate={{ scale: [1, 1.08, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-7 h-7 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center shadow-sm relative text-xs"
                        >
                          {day}
                          <span className="absolute -top-1.5 -right-1 text-[10px]">
                            ❤️
                          </span>
                        </motion.div>
                      ) : (
                        <span className="text-gray-700">{day}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nút Thêm Vào Lịch */}
            <div className="pt-3 border-t border-rose-50">
              <a
                href={generateGoogleCalendarLink(calendarEvent)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all duration-300"
              >
                <span>📅</span>
                <span>{t("details.add-to-calendar")}</span>
              </a>
            </div>
          </motion.div>

          {/* 📍 CỘT PHẢI: NGÀY TRỌNG ĐẠI + 2 ĐỊA ĐIỂM (Col 7) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-7 flex flex-col justify-between gap-4"
          >
            {/* Dòng Highlight ngày cưới giúp cột phải đầy đặn & đồng điệu */}
            <div className="bg-rose-50/70 border border-rose-100 rounded-2xl px-4 py-3 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-rose-500">
                ✨ {t("details.our-wedding-day")}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-gray-800 capitalize">
                {formattedFullDate}
              </span>
            </div>

            {/* Lễ Vu Quy Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-rose-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-1">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base">🏡</span>
                  <h3 className="font-serif font-bold text-gray-900 text-sm sm:text-base">
                    {t("venue.ceremony-time")}
                  </h3>
                  <span className="text-[11px] bg-rose-100/80 text-rose-700 px-2 py-0.5 rounded-md font-semibold">
                    {venue.ceremony.time}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                  {venue.ceremony.name}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {venue.ceremony.address}
                </p>
              </div>
              <button
                onClick={() => window.open(generateMapLink(venue.ceremony), "_blank")}
                className="self-start sm:self-center shrink-0 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                📍 {t("venue.view-map")}
              </button>
            </div>

            {/* Tiệc Cưới Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-amber-100/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-1">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base">🥂</span>
                  <h3 className="font-serif font-bold text-gray-900 text-sm sm:text-base">
                    {t("venue.reception-time")}
                  </h3>
                  <span className="text-[11px] bg-amber-100/80 text-amber-800 px-2 py-0.5 rounded-md font-semibold">
                    {venue.reception.time}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-gray-800">
                  {venue.reception.name}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {venue.reception.address}
                </p>
              </div>
              <button
                onClick={() => window.open(generateMapLink(venue.reception), "_blank")}
                className="self-start sm:self-center shrink-0 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                📍 {t("venue.view-map")}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};