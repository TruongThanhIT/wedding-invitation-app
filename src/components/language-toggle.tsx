'use client';

import { useTranslate } from '@/locales';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { allLangs } from '@/locales/all-langs';

// Language Toggle & Dropdown Selector Component
export function LanguageToggle() {
  const { onChangeLang, currentLang } = useTranslate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Nút bấm chính trên Header */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 group overflow-hidden cursor-pointer text-gray-600 hover:text-rose-500 hover:bg-rose-50/80 border border-gray-200/60 bg-white/80 backdrop-blur-sm shadow-sm"
        title="Chọn ngôn ngữ / Select Language"
      >
        {/* Icon / Cờ hiện tại */}
        <span className="text-sm sm:text-base relative z-10">
          {currentLang?.icon}
        </span>

        {/* Nhãn ngôn ngữ hiện tại */}
        <span className="hidden sm:inline-block whitespace-nowrap relative z-10 text-xs sm:text-sm font-medium uppercase">
          {currentLang?.value}
        </span>

        {/* Mũi tên chỉ xuống */}
        <span className={`text-[10px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </motion.button>

      {/* Danh sách Dropdown xổ xuống */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-36 sm:w-40 rounded-xl bg-white shadow-xl border border-gray-100 py-2 z-50 overflow-hidden"
          >
            {allLangs.map((lang) => {
              const isSelected = lang.value === currentLang?.value;
              return (
                <button
                  key={lang.value}
                  onClick={() => {
                    onChangeLang(lang.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'font-semibold text-rose-600 bg-rose-50/70'
                      : 'text-gray-700 hover:bg-gray-50'
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