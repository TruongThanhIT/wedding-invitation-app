"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

type CategoryType =
  | "all"
  | "prewedding"
  | "linkedin"
  | "firstMeet"
  | "chinaTour"
  | "vietnamTour"
  | "newZealand";

interface GalleryItem {
  id: number;
  category: CategoryType;
  src: string;
  titleKey: string;
  descriptionKey?: string;
}

interface GalleryPreviewProps {
  activeCategory?: string;
  onChangeCategory?: (category: string) => void;
}

export const GalleryPreview = ({
  activeCategory = "all",
  onChangeCategory,
}: GalleryPreviewProps) => {
  const { t } = useTranslation("home");

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [isFullGalleryOpen, setIsFullGalleryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(activeCategory);

  useEffect(() => {
    setActiveTab(activeCategory);
  }, [activeCategory]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Kho ảnh gắn với các category chi tiết trùng khớp mốc thời gian
  const fullGallery: GalleryItem[] = [
    // --- PRE-WEDDING ---
    {
      id: 1,
      category: "prewedding",
      src: "/assets/images/gallery/prewedding-1.jpg",
      titleKey: "gallery.items.pre1.title",
      descriptionKey: "gallery.items.pre1.desc",
    },
    {
      id: 2,
      category: "prewedding",
      src: "/assets/images/gallery/prewedding-2.jpg",
      titleKey: "gallery.items.pre2.title",
      descriptionKey: "gallery.items.pre2.desc",
    },
    {
      id: 3,
      category: "prewedding",
      src: "/assets/images/gallery/prewedding-3.jpg",
      titleKey: "gallery.items.pre3.title",
      descriptionKey: "gallery.items.pre3.desc",
    },
    {
      id: 4,
      category: "prewedding",
      src: "/assets/images/gallery/prewedding-4.jpg",
      titleKey: "gallery.items.pre4.title",
      descriptionKey: "gallery.items.pre4.desc",
    },
    {
      id: 5,
      category: "prewedding",
      src: "/assets/images/gallery/prewedding-5.jpg",
      titleKey: "gallery.items.pre5.title",
      descriptionKey: "gallery.items.pre5.desc",
    },
    {
      id: 6,
      category: "prewedding",
      src: "/assets/images/gallery/prewedding-6.jpg",
      titleKey: "gallery.items.pre6.title",
      descriptionKey: "gallery.items.pre6.desc",
    },
    {
      id: 24,
      category: "prewedding",
      src: "/assets/images/gallery/prewedding-14.jpg",
      titleKey: "gallery.items.pre6.title",
      descriptionKey: "gallery.items.pre6.desc",
    },

    // --- LINKEDIN / MỐI DUYÊN ---
    {
      id: 19,
      category: "linkedin",
      src: "/assets/images/gallery/story-1.png",
      titleKey: "gallery.items.mem5.title",
      descriptionKey: "gallery.items.mem5.desc",
    },

    // --- CHUYẾN BAY & GẶP NHAU (First Meet) ---
    {
      id: 20,
      category: "firstMeet",
      src: "/assets/images/gallery/story-2.jpg",
      titleKey: "gallery.items.firstMeet.title",
      descriptionKey: "gallery.items.firstMeet.description",
    },
    {
      id: 23,
      category: "firstMeet",
      src: "/assets/images/gallery/story-4.png",
      titleKey: "gallery.items.inLove.title",
      descriptionKey: "gallery.items.inLove.description",
    },

    // --- DU LỊCH TRUNG QUỐC ---
    {
      id: 14,
      category: "chinaTour",
      src: "/assets/images/gallery/travel-1.jpg",
      titleKey: "gallery.items.mem1.title",
      descriptionKey: "gallery.items.mem1.desc",
    },
    {
      id: 15,
      category: "chinaTour",
      src: "/assets/images/gallery/travel-2.jpg",
      titleKey: "gallery.items.mem2.title",
      descriptionKey: "gallery.items.mem2.desc",
    },
    {
      id: 22,
      category: "chinaTour",
      src: "/assets/images/gallery/travel-6.png",
      titleKey: "gallery.items.mem6.title",
      descriptionKey: "gallery.items.mem6.desc",
    },

    // --- HÀNH TRÌNH XUYÊN VIỆT ---
    {
      id: 21,
      category: "vietnamTour",
      src: "/assets/images/gallery/story-3.png",
      titleKey: "gallery.items.vietnamTour.title",
      descriptionKey: "gallery.items.vietnamTour.description",
    },
    {
      id: 26,
      category: "vietnamTour",
      src: "/assets/images/gallery/travel-7.png",
      titleKey: "gallery.items.vietnamTour.title",
      descriptionKey: "gallery.items.vietnamTour.description",
    },
    {
      id: 25,
      category: "vietnamTour",
      src: "/assets/images/gallery/travel-8.png",
      titleKey: "gallery.items.vietnamTour.title",
      descriptionKey: "gallery.items.vietnamTour.description",
    },

    // --- BẾN ĐỖ NEW ZEALAND ---
    {
      id: 16,
      category: "newZealand",
      src: "/assets/images/gallery/travel-3.png",
      titleKey: "gallery.items.mem3.title",
      descriptionKey: "gallery.items.mem3.desc",
    },
    {
      id: 17,
      category: "newZealand",
      src: "/assets/images/gallery/travel-4.png",
      titleKey: "gallery.items.mem4.title",
      descriptionKey: "gallery.items.mem4.desc",
    },
    {
      id: 18,
      category: "newZealand",
      src: "/assets/images/gallery/travel-5.jpg",
      titleKey: "gallery.items.newZealand.title",
      descriptionKey: "gallery.items.newZealand.desc",
    },
  ];

  // Lọc theo Category được chọn
  const filteredImages =
    activeTab === "all"
      ? fullGallery
      : fullGallery.filter((img) => img.category === activeTab);

  const previewImages = filteredImages.slice(0, 6);

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

  const tabs: { key: CategoryType; labelKey: string }[] = [
    { key: "all", labelKey: "gallery.categories.all" },
    { key: "prewedding", labelKey: "gallery.categories.prewedding" },
    { key: "linkedin", labelKey: "gallery.categories.linkedin" },
    { key: "firstMeet", labelKey: "gallery.categories.firstMeet" },
    { key: "chinaTour", labelKey: "gallery.categories.chinaTour" },
    { key: "vietnamTour", labelKey: "gallery.categories.vietnamTour" },
    { key: "newZealand", labelKey: "gallery.categories.newZealand" },
  ];

  return (
    <div
      id="gallery-section"
      ref={ref}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-rose-50 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Tiêu đề */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4">
            {t("gallery.journeyTitle")}
          </h2>
          <div className="w-24 h-px bg-rose-400 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t("gallery.journeySubtitle")}
          </p>
        </motion.div>

        {/* Thanh Tabs Lọc Danh Mục Ngay Trên Lưới Ảnh Trang Chủ */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                if (onChangeCategory) onChangeCategory(tab.key);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-rose-500 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-rose-50 border border-gray-200"
              }`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        {/* Lưới Ảnh Preview */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {previewImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => {
                  const realIndex = fullGallery.findIndex(
                    (i) => i.id === image.id,
                  );
                  setSelectedImageIndex(realIndex);
                }}
                className="group relative aspect-square bg-rose-100 rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={t(image.titleKey)}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-20">
                  <div className="flex justify-end">
                    <span className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white text-sm">
                      🔍
                    </span>
                  </div>
                  <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs sm:text-sm font-semibold">
                      {t(image.titleKey)}
                    </p>
                    {image.descriptionKey && (
                      <p className="text-[11px] sm:text-xs opacity-80">
                        {t(image.descriptionKey)}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 text-sm">
            Chưa có ảnh trong mục này.
          </div>
        )}

        {/* Nút Xem Tất Cả */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => setIsFullGalleryOpen(true)}
            className="bg-white text-gray-700 px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-rose-300 group text-sm sm:text-base inline-flex items-center space-x-2"
          >
            <span>
              {t("gallery.viewFull")} ({filteredImages.length})
            </span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              📸
            </span>
          </button>
        </motion.div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImageIndex(null)}
          >
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10"
            >
              ✕
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-4 sm:left-8 text-white/80 hover:text-white text-2xl z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              ❮
            </button>

            <div
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={fullGallery[selectedImageIndex].src}
                alt={t(fullGallery[selectedImageIndex].titleKey)}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="mt-4 text-center text-white">
                <h3 className="text-lg font-serif font-semibold">
                  {t(fullGallery[selectedImageIndex].titleKey)}
                </h3>
                {fullGallery[selectedImageIndex].descriptionKey && (
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">
                    {t(fullGallery[selectedImageIndex].descriptionKey!)}
                  </p>
                )}
              </div>
            </div>

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

      {/* FULL GALLERY MODAL */}
      <AnimatePresence>
        {isFullGalleryOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto p-4 sm:p-8"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-gray-800">
                    {t("gallery.fullAlbumTitle")}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {t("gallery.fullAlbumSubtitle")}
                  </p>
                </div>
                <button
                  onClick={() => setIsFullGalleryOpen(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center font-bold transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key);
                      if (onChangeCategory) onChangeCategory(tab.key);
                    }}
                    className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                      activeTab === tab.key
                        ? "bg-rose-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {t(tab.labelKey)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredImages.map((image) => (
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
                    <Image
                      src={image.src}
                      alt={t(image.titleKey)}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2 text-center">
                      <p className="text-xs font-semibold">
                        {t(image.titleKey)}
                      </p>
                      <p className="text-[10px] text-gray-200 mt-0.5">
                        {t("gallery.clickToZoom")}
                      </p>
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
