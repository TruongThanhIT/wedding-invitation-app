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

  // 1. Tự động lấy thông tin tháng, năm, ngày từ biến date truyền vào (Tránh hard-code)
  const weddingYear = date.getFullYear();
  const weddingMonthIndex = date.getMonth(); // 0-based (0 là tháng 1)
  const weddingDay = date.getDate();

  // Tên tháng hiển thị động theo ngôn ngữ hệ thống
  const monthString = date.toLocaleDateString(currentLang.numberFormat.code, {
    month: "long",
  });

  // 2. Tính toán số ngày trong tháng và ngày bắt đầu trong tuần (Thứ 2 = 0 ... CN = 6) để vẽ lưới lịch chuẩn xác
  const firstDayOfMonth = new Date(weddingYear, weddingMonthIndex, 1);
  let startDayOffset = firstDayOfMonth.getDay() - 1; // Chuyển Chủ Nhật (0) về cuối tuần
  if (startDayOffset === -1) startDayOffset = 6;

  const totalDaysInMonth = new Date(weddingYear, weddingMonthIndex + 1, 0).getDate();
  const daysInMonth = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);
  const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  return (
    <section id="details" ref={ref} className="py-12 sm:py-20 px-3 sm:px-6 bg-gradient-to-b from-white via-rose-50/20 to-white overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 25 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-gray-900 mb-2 font-bold">
            {t("details.title")}
          </h2>
          <div className="w-16 h-px bg-rose-400 mx-auto mb-2"></div>
          <p className="text-xs sm:text-base text-gray-600 max-w-lg mx-auto">
            {t("details.join-us-text")}
          </p>
        </motion.div>

        {/* Main Grid: Lịch bên trái / Địa điểm bên phải */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* 📅 TỜ LỊCH THÁNG ĐỘNG (Col 5) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-rose-100 relative"
          >
            {/* Header Lịch hiển thị động theo date */}
            <div className="text-center mb-4">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                {monthString} / {weddingYear}
              </span>
            </div>

            {/* Bảng Lưới Lịch */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm mb-4">
              {weekDays.map((day, idx) => (
                <div key={idx} className="font-semibold text-gray-400 py-1">
                  {day}
                </div>
              ))}

              {Array.from({ length: startDayOffset }).map((_, idx) => (
                <div key={`empty-${idx}`} className="py-2" />
              ))}

              {daysInMonth.map((day) => {
                const isWeddingDay = day === weddingDay;
                return (
                  <div
                    key={day}
                    className="relative flex items-center justify-center py-2 font-medium"
                  >
                    {isWeddingDay ? (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-8 h-8 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center shadow-md relative"
                      >
                        {day}
                        <span className="absolute -top-1.5 -right-1.5 text-xs">
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

            {/* Nút Thêm Vào Lịch */}
            <div className="pt-3 border-t border-gray-100 text-center">
              <a
                href={generateGoogleCalendarLink(calendarEvent)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-rose-500 hover:bg-rose-600 text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold shadow-md transition-all duration-300"
              >
                <span>📅</span>
                <span>{t("details.add-to-calendar")}</span>
              </a>
            </div>
          </motion.div>

          {/* 📍 THÔNG TIN ĐỊA ĐIỂM DÙNG DỮ LIỆU TỪ VENUE PROP (Col 7) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7 space-y-4"
          >
            {/* Lễ Vu Quy Card */}
            <div className="bg-gradient-to-r from-purple-50/80 to-white rounded-2xl p-4 sm:p-5 shadow-md border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏡</span>
                  <h3 className="font-serif font-bold text-gray-900 text-base sm:text-lg">
                    LỄ VU QUY
                  </h3>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md font-semibold">
                    {venue.ceremony.time}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-gray-800">
                  {venue.ceremony.name}
                </h4>
                <p className="text-xs text-gray-600 leading-tight">
                  {venue.ceremony.address}
                </p>
              </div>
              <button
                onClick={() => window.open(generateMapLink(venue.ceremony), "_blank")}
                className="self-start sm:self-center shrink-0 bg-purple-600 text-white px-3.5 py-2 rounded-xl text-xs font-medium hover:bg-purple-700 transition-colors shadow-sm cursor-pointer"
              >
                📍 Bản đồ
              </button>
            </div>

            {/* Tiệc Cưới Card */}
            <div className="bg-gradient-to-r from-amber-50/80 to-white rounded-2xl p-4 sm:p-5 shadow-md border border-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🥂</span>
                  <h3 className="font-serif font-bold text-gray-900 text-base sm:text-lg">
                    TIỆC CƯỚI
                  </h3>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-semibold">
                    {venue.reception.time}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-gray-800">
                  {venue.reception.name}
                </h4>
                <p className="text-xs text-gray-600 leading-tight">
                  {venue.reception.address}
                </p>
              </div>
              <button
                onClick={() => window.open(generateMapLink(venue.reception), "_blank")}
                className="self-start sm:self-center shrink-0 bg-amber-600 text-white px-3.5 py-2 rounded-xl text-xs font-medium hover:bg-amber-700 transition-colors shadow-sm cursor-pointer"
              >
                📍 Bản đồ
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};