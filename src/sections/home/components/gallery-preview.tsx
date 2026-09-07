"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

interface GalleryItem {
  id: number;
  category: string;
  src: string;
  title: string;
  description?: string;
}

export const GalleryPreview = () => {
  const { t } = useTranslation("home");

  // State quản lý xem ảnh phóng to (Lightbox) và mở Album toàn bộ
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [isFullGalleryOpen, setIsFullGalleryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Kho ảnh phong phú (Mỗi chủ đề có nhiều ảnh)
  const fullGallery: GalleryItem[] = [
    {
      id: 1,
      category: "engagement",
      src: "/assets/images/gallery/engagement-1.jpg",
      title: "Lễ Đính Hôn",
      description: "Khoảnh khắc trao nhẫn hạnh phúc",
    },
    {
      id: 2,
      category: "engagement",
      src: "/assets/images/gallery/engagement-2.jpg",
      title: "Lễ Đính Hôn",
      description: "Nụ cười rạng rỡ ngày chung đôi",
    },
    {
      id: 3,
      category: "travel",
      src: "/assets/images/gallery/travel-1.jpg",
      title: "Chuyến Đi Cùng Nhau",
      description: "Cùng nhau đi khắp thế gian",
    },
    {
      id: 4,
      category: "travel",
      src: "/assets/images/gallery/travel-2.jpg",
      title: "Chuyến Đi Cùng Nhau",
      description: "Kỷ niệm đẹp tại đồi hoa",
    },
    {
      id: 5,
      category: "date",
      src: "/assets/images/gallery/date-1.jpg",
      title: "Hẹn Hò Cuối Tuần",
      description: "Những buổi chiều bình yên bên nhau",
    },
    {
      id: 6,
      category: "proposal",
      src: "/assets/images/gallery/proposal-1.jpg",
      title: "Lời Cầu Hôn",
      description: "Ngày anh nói câu đồng ý",
    },
  ];

  // Danh sách 6 ảnh tiêu biểu hiển thị ra ngoài trang chủ
  const previewImages = fullGallery.slice(0, 6);

  // Lọc ảnh theo tab khi mở bộ sưu tập đầy đủ
  const filteredImages =
    activeTab === "all"
      ? fullGallery
      : fullGallery.filter((img) => img.category === activeTab);

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % fullGallery.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + fullGallery.length) % fullGallery.length,
      );
    }
  };

  return (
    <div
      ref={ref}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-rose-50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Tiêu đề */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4">
            {t("gallery.journey-title", "Hành Trình Yêu Thương")}
          </h2>
          <div className="w-24 h-px bg-rose-400 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t(
              "gallery.journey-subtitle",
              "Những khoảnh khắc đẹp nhất của chúng mình",
            )}
          </p>
        </motion.div>

        {/* Lưới 6 Ảnh Preview ngoài trang chủ */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {previewImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedImageIndex(index)}
              className="group relative aspect-square bg-rose-100 rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* 1. Thẻ Ảnh thật */}
              <img
                src={image.src}
                alt={image.title}
                onError={(e) => {
                  // Nếu ảnh lỗi/chưa có, ẩn ảnh đi để lộ nền hoặc emoji bên dưới
                  (e.target as HTMLElement).style.display = "none";
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
              />

              {/* 2. Khung dự phòng hiện Emoji/Icon khi chưa thêm ảnh đúng đường dẫn */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center z-0">
                <span className="text-4xl sm:text-5xl opacity-60">📸</span>
              </div>

              {/* 3. Overlay hiển thị thông tin & biểu tượng phóng to khi Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-20">
                <div className="flex justify-end">
                  <span className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white text-sm">
                    🔍
                  </span>
                </div>
                <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xs sm:text-sm font-semibold">
                    {image.title}
                  </p>
                  <p className="text-[11px] sm:text-xs opacity-80">
                    {image.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nút Bấm "Xem toàn bộ bộ sưu tập" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => setIsFullGalleryOpen(true)}
            className="bg-white text-gray-700 px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-rose-300 group text-sm sm:text-base inline-flex items-center space-x-2"
          >
            <span>{t("gallery.view-full", "Xem Tất Cả Ảnh")}</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              📸
            </span>
          </button>
        </motion.div>
      </div>

      {/* ==================== 1. MODAL PHÓNG TO ẢNH (LIGHTBOX) ==================== */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Nút Đóng */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10"
            >
              ✕
            </button>

            {/* Nút Lùi Ảnh */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-4 sm:left-8 text-white/80 hover:text-white text-2xl z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              ❮
            </button>

            {/* Khung Ảnh Phóng To */}
            <div
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={fullGallery[selectedImageIndex].src}
                alt={fullGallery[selectedImageIndex].title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="mt-4 text-center text-white">
                <h3 className="text-lg font-serif font-semibold">
                  {fullGallery[selectedImageIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  {fullGallery[selectedImageIndex].description}
                </p>
              </div>
            </div>

            {/* Nút Tới Ảnh */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 sm:right-8 text-white/80 hover:text-white text-2xl z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              ❯
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== 2. MODAL XEM TOÀN BỘ ALBUM (FULL GALLERY) ==================== */}
      <AnimatePresence>
        {isFullGalleryOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto p-4 sm:p-8"
          >
            <div className="max-w-6xl mx-auto">
              {/* Thanh tiêu đề Modal */}
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-gray-800">
                    Bộ Sưu Tập Kỷ Niệm
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Tổng hợp những khoảnh khắc đáng nhớ của Thanh & Zhe
                  </p>
                </div>
                <button
                  onClick={() => setIsFullGalleryOpen(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center font-bold transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Các Tab phân loại danh mục */}
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {[
                  { key: "all", label: "Tất Cả" },
                  { key: "engagement", label: "Lễ Đính Hôn" },
                  { key: "travel", label: "Du Lịch" },
                  { key: "date", label: "Hẹn Hò" },
                  { key: "proposal", label: "Cầu Hôn" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                      activeTab === tab.key
                        ? "bg-rose-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Lưới toàn bộ ảnh trong Modal */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredImages.map((image, idx) => (
                  <div
                    key={image.id}
                    onClick={() => {
                      const realIndex = fullGallery.findIndex(
                        (i) => i.id === image.id,
                      );
                      setSelectedImageIndex(realIndex);
                    }}
                    className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium p-2 text-center">
                      Click để phóng to
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
