"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

export const RSVP = () => {
  const { t } = useTranslation("home");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 🔗 Thay URL Google Apps Script của bạn vào đây
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

      // Reset form sau 3 giây
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          attendance: "",
          guests: "1",
          message: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Lỗi khi gửi RSVP:", error);
      alert(
        "Có lỗi xảy ra khi gửi RSVP. Bạn vui lòng thử lại hoặc nhắn cho Dâu Rể nhé!",
      );
    } finally {
      setIsSubmitting(false);
    }
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

  if (isSubmitted) {
    return (
      <div className="py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-100">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-12 shadow-xl border border-rose-100"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-800 mb-4">
              {t("rsvp.thank-you", "Cảm ơn bạn!")}
            </h3>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl">
              {t(
                "rsvp.thank-you-received",
                "Dâu Rể đã nhận được phản hồi từ bạn rồi nhé 💕",
              )}
            </p>
            <div className="mt-6 text-2xl">💕</div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-100"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4">
            {t("rsvp.title")}
          </h2>
          <div className="w-24 h-px bg-rose-400 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t("rsvp.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* RSVP Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-rose-100">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 mb-6 text-center">
                {t("rsvp.confirm-attendance")}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("rsvp.full-name", "Họ và Tên")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300"
                    placeholder={t(
                      "rsvp.full-name-placeholder",
                      "Nhập họ và tên",
                    )}
                  />
                </div>

                {/* Email (Bắt buộc để gửi reminder / cám ơn) */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("rsvp.email-address", "Địa chỉ Email")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300"
                    placeholder={t(
                      "rsvp.email-placeholder",
                      "email@example.com",
                    )}
                  />
                </div>

                {/* Attendance */}
                <div>
                  <label
                    htmlFor="attendance"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("rsvp.will-attend", "Bạn sẽ tham dự chứ?")} *
                  </label>
                  <select
                    id="attendance"
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300"
                  >
                    <option value="">
                      {t("rsvp.please-select", "-- Chọn câu trả lời --")}
                    </option>
                    <option value="yes">
                      {t("rsvp.yes-there", "Có, mình chắc chắn sẽ đến")}
                    </option>
                    <option value="no">
                      {t("rsvp.no-cant", "Rất tiếc, mình không thể đến")}
                    </option>
                  </select>
                </div>

                {/* Number of Guests */}
                {formData.attendance === "yes" && (
                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
                    >
                      {t(
                        "rsvp.number-guests",
                        "Số lượng người đi cùng (tính cả bạn)",
                      )}
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300"
                    >
                      <option value="1">
                        {t("rsvp.guest-1", "1 người (Chỉ mình tôi)")}
                      </option>
                      <option value="2">
                        {t("rsvp.guests-count", "{{count}} người", {
                          count: 2,
                        })}
                      </option>
                      <option value="3">
                        {t("rsvp.guests-count", "{{count}} người", {
                          count: 3,
                        })}
                      </option>
                      <option value="4">
                        {t("rsvp.guests-count", "{{count}} người", {
                          count: 4,
                        })}
                      </option>
                    </select>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
                  >
                    {t("rsvp.message-couple", "Lời chúc gửi tới Dâu Rể")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all duration-300 resize-none"
                    placeholder={t(
                      "rsvp.message-placeholder",
                      "Gửi lời chúc mừng...",
                    )}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-4 px-6 rounded-xl font-medium text-base sm:text-lg hover:from-rose-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Đang gửi..."
                    : t("rsvp.send-rsvp", "Gửi xác nhận RSVP")}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* RSVP Deadline */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-rose-600 text-xl">⏰</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    {t("rsvp.deadline")}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {t("rsvp.deadline-date")}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">
                {t("rsvp.deadline-help")}
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-xl">📞</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    {t("rsvp.questions")}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {t("rsvp.questions-help")}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <p>📧 truongthanh.it95@gmail.com</p>
                <p>📱 (+84) 782 808 428 (Zalo)</p>
              </div>
            </div>

            {/* Gift Registry */}
            <div className="bg-gradient-to-br from-rose-50/80 via-white to-pink-50/80 rounded-2xl p-6 shadow-lg border border-rose-100 relative overflow-hidden">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mr-4 shrink-0">
                  <span className="text-rose-600 text-xl">🎁</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    {t("rsvp.gift-registry-title", "Hộp Chúc Phúc Online 💌")}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm font-medium text-rose-500">
                    {t(
                      "rsvp.presence-is-present",
                      "Thành thật mà nói, sự hiện diện của bạn để quậy cùng Dâu Rể đã là món quà lớn nhất rồi!",
                    )}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                {t(
                  "rsvp.gift-message",
                  "Tuy nhiên, nếu bạn muốn gửi chút 'hạt lúa' chúc phúc mà ngại mang tiền mặt hay đỡ phải đi tìm cây ATM rút tiền/ghi bao thư giấy, thì có thể 'ting ting' nhanh qua mã QR bên dưới nha. Thương lắm!",
                )}
              </p>

              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-rose-100/80 shadow-inner">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg p-2 flex-shrink-0 border border-gray-200 shadow-sm">
                    <img
                      src="/assets/images/qr-bank.png"
                      alt="Mã QR Mừng Cưới"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="text-center sm:text-left text-xs sm:text-sm space-y-1.5 text-gray-700 w-full">
                    <p className="font-semibold text-rose-600 text-sm">
                      Ngân hàng:{" "}
                      <span className="text-gray-800 font-bold">
                        Techcombank
                      </span>
                    </p>
                    <p>
                      Số tài khoản:{" "}
                      <span className="font-mono font-bold text-gray-900 select-all">
                        9565 2207 95
                      </span>
                    </p>
                    <p>
                      Chủ tài khoản:{" "}
                      <span className="font-semibold uppercase text-gray-800">
                        Trương Huỳnh Thụy Thái Thanh
                      </span>
                    </p>
                    <p className="text-[11px] text-gray-500 italic mt-1">
                      Nội dung: Mung cuoi Thanh va Zhe - [Tên của bạn]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
