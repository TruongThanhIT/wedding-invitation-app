"use client";

import { useTranslate } from "@/locales";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { allLangs } from "@/locales/all-langs";

interface LanguageToggleProps {
  compact?: boolean;
}

export function LanguageToggle({ compact = false }: LanguageToggleProps) {
  const { onChangeLang, currentLang } = useTranslate();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fallbackLang = allLangs[0];
  const displayLang = mounted ? currentLang || fallbackLang : fallbackLang;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={
          compact
            ? "relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer text-gray-700 hover:text-rose-600 hover:bg-white border border-rose-200/80 bg-white/80 backdrop-blur-md shadow-sm"
            : "relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 group overflow-hidden cursor-pointer text-gray-600 hover:text-rose-500 hover:bg-rose-50/80 border border-gray-200/60 bg-white/80 backdrop-blur-sm shadow-sm"
        }
        title="Chọn ngôn ngữ / Select Language"
      >
        <span
          suppressHydrationWarning
          className="text-sm sm:text-base leading-none"
        >
          {displayLang?.icon}
        </span>

        <span
          suppressHydrationWarning
          className={
            compact
              ? "inline-block whitespace-nowrap text-xs font-semibold uppercase tracking-wide"
              : "hidden sm:inline-block whitespace-nowrap text-xs sm:text-sm font-medium uppercase"
          }
        >
          {displayLang?.value}
        </span>

        <span
          className={`text-[9px] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-36 sm:w-40 rounded-xl bg-white/95 backdrop-blur-md shadow-xl border border-rose-100 py-1.5 z-50 overflow-hidden"
          >
            {allLangs.map((lang) => {
              const isSelected = lang.value === currentLang?.value;
              return (
                <button
                  type="button"
                  key={lang.value}
                  onClick={() => {
                    onChangeLang(lang.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "font-semibold text-rose-600 bg-rose-50/80"
                      : "text-gray-700 hover:bg-rose-50/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{lang.icon}</span>
                    <span>{lang.label}</span>
                  </div>
                  {isSelected && (
                    <span className="text-rose-500 text-xs font-bold">✓</span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}