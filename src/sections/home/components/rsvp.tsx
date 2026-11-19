"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

export const RSVP = () => {
  const { t } = useTranslation("home");

  const [formData, setFormData] = useState({
    name: "",
    attendance: "",
    guests: "1",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const isFormValid =
    formData.name.trim().length > 0 && formData.attendance !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      alert(
        t(
          "rsvp.please-select-attendance",
          "Vui lòng điền tên và chọn trạng thái tham dự của bạn nhé!",
        ),
      );
      return;
    }

    setIsSubmitting(true);

    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwQ5p8eziqaE0f0tBqYFu73V4dWXvcPlJDi4-fxdbkPvMiQhLVa5zD0oVFQ6WRqCEGnrQ/exec";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setIsSubmitted(true);
      setFormData({
        name: "",
        attendance: "",
        guests: "1",
        message: "",
      });
    } catch (error) {
      console.error("Lỗi khi gửi RSVP:", error);
      alert(t("rsvp.error-alert"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      attendance: "",
      guests: "1",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const selectArrowStyle =
    "appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236B7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:11px_11px] bg-[right_1rem_center] bg-no-repeat";

  if (isSubmitted) {
    return (
      <div className="py-16 px-4 bg-gradient-to-br from-rose-50 to-pink-100">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-rose-100"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-gray-800 mb-3">
              {t("rsvp.thank-you")}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              {t("rsvp.thank-you-received")}
            </p>
            <button
              type="button"
              onClick={handleResetForm}
              className="text-xs sm:text-sm text-rose-500 hover:text-rose-600 underline underline-offset-4 font-medium transition-colors cursor-pointer"
            >
              {t("rsvp.submit-another")}
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="py-16 px-4 bg-gradient-to-br from-rose-50 to-pink-100"
    >
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800 mb-3">
            {t("rsvp.title")}
          </h2>
          <div className="w-20 h-px bg-rose-400 mx-auto mb-4"></div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 border border-rose-200/80 text-rose-600 text-xs sm:text-sm font-medium shadow-sm mb-3">
            <span>⏰</span>
            <span>
              {t("rsvp.deadline")}: <strong>{t("rsvp.deadline-date")}</strong>
            </span>
          </div>

          <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto leading-relaxed whitespace-pre-line">
            {t("rsvp.deadline-help")}
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5"
              >
                {t("rsvp.full-name")}{" "}
                <span className="text-red-500 font-semibold">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300 text-sm text-gray-800 placeholder:text-gray-400"
                placeholder={t("rsvp.full-name-placeholder")}
              />
            </div>

            {/* Attendance & Guests */}
            <div
              className={`grid grid-cols-1 ${
                formData.attendance === "yes" ? "sm:grid-cols-2" : ""
              } gap-4`}
            >
              <div>
                <label
                  htmlFor="attendance"
                  className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5"
                >
                  {t("rsvp.will-attend")}{" "}
                  <span className="text-red-500 font-semibold">*</span>
                </label>
                <select
                  id="attendance"
                  name="attendance"
                  value={formData.attendance}
                  onChange={handleChange}
                  className={`w-full pl-3.5 pr-10 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300 text-sm text-gray-600 ${selectArrowStyle}`}
                >
                  <option value="">{t("rsvp.please-select")}</option>
                  <option value="yes">{t("rsvp.yes-there")}</option>
                  <option value="no">{t("rsvp.no-cant")}</option>
                </select>
              </div>

              {formData.attendance === "yes" && (
                <div>
                  <label
                    htmlFor="guests"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5"
                  >
                    {t("rsvp.number-guests")}
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className={`w-full pl-3.5 pr-10 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300 text-sm text-gray-600 ${selectArrowStyle}`}
                  >
                    <option value="1">{t("rsvp.guest-1")}</option>
                    <option value="2">
                      {t("rsvp.guests-count", { count: 2 })}
                    </option>
                    <option value="3">
                      {t("rsvp.guests-count", { count: 3 })}
                    </option>
                    <option value="4">
                      {t("rsvp.guests-count", { count: 4 })}
                    </option>
                  </select>
                </div>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5"
              >
                {t("rsvp.message-couple")}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300 resize-none text-sm text-gray-800 placeholder:text-gray-400"
                placeholder={t("rsvp.message-placeholder")}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className={`w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-3.5 px-6 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 shadow-lg ${
                !isFormValid || isSubmitting
                  ? "opacity-45 cursor-not-allowed shadow-none"
                  : "hover:from-rose-500 hover:to-pink-600 hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
              }`}
            >
              {isSubmitting
                ? t("rsvp.submitting")
                : t("rsvp.send-rsvp")}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
