"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

type CategoryType =
  | "all"
  | "prewedding"
  | "propose"
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
  const translate = (key: string) => t(key as any);

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
      titleKey: "gallery.items.pre7.title",
      descriptionKey: "gallery.items.pre7.desc",
    },

    // PROPOSE
    {
      id: 27,
      category: "propose",
      src: "/assets/images/gallery/propose-1.png",
      titleKey: "gallery.items.propose1.title",
      descriptionKey: "gallery.items.propose1.desc",
    },
    {
      id: 28,
      category: "propose",
      src: "/assets/images/gallery/propose-2.png",
      titleKey: "gallery.items.propose2.title",
      descriptionKey: "gallery.items.propose2.desc",
    },
    {
      id: 29,
      category: "propose",
      src: "/assets/images/gallery/propose-3.png",
      titleKey: "gallery.items.propose3.title",
      descriptionKey: "gallery.items.propose3.desc",
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
      descriptionKey: "gallery.items.firstMeet.desc",
    },
    {
      id: 23,
      category: "firstMeet",
      src: "/assets/images/gallery/story-4.png",
      titleKey: "gallery.items.inLove.title",
      descriptionKey: "gallery.items.inLove.desc",
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
      titleKey: "gallery.items.vietnamTour1.title",
      descriptionKey: "gallery.items.vietnamTour1.desc",
    },
    {
      id: 26,
      category: "vietnamTour",
      src: "/assets/images/gallery/travel-7.png",
      titleKey: "gallery.items.vietnamTour2.title",
      descriptionKey: "gallery.items.vietnamTour2.desc",
    },
    {
      id: 25,
      category: "vietnamTour",
      src: "/assets/images/gallery/travel-8.png",
      titleKey: "gallery.items.vietnamTour3.title",
      descriptionKey: "gallery.items.vietnamTour3.desc",
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
    { key: "propose", labelKey: "gallery.categories.propose" },
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
      className="py-12 sm:py-16 px-3 sm:px-6 bg-gradient-to-br from-gray-50 to-rose-50 scroll-mt-24"
    >
      <div className="max-w-5xl mx-auto">
        {/* Tiêu đề */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-4xl font-serif text-gray-900 mb-2 font-bold">
            {t("gallery.journeyTitle")}
          </h2>
          <div className="w-16 h-px bg-rose-400 mx-auto mb-2.5"></div>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto">
            {t("gallery.journeySubtitle")}
          </p>
        </motion.div>

        {/* Thanh Tabs Lọc Danh Mục Ngay Trên Lưới Ảnh Trang Chủ */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                if (onChangeCategory) onChangeCategory(tab.key);
              }}
              className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTab === tab.key
                  ? "bg-rose-500 text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-rose-50 border border-gray-200"
              }`}
            >
              {translate(tab.labelKey)}
            </button>
          ))}
        </div>

        {/* Lưới Ảnh Preview */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
            {previewImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.94 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => {
                  const realIndex = fullGallery.findIndex(
                    (i) => i.id === image.id,
                  );
                  setSelectedImageIndex(realIndex);
                }}
                className="group relative aspect-square bg-rose-100 rounded-2xl shadow-md overflow-hidden border border-rose-100/80 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={translate(image.titleKey)}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 sm:p-4 z-20">
                  <div className="flex justify-end">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white text-xs sm:text-sm">
                      🔍
                    </span>
                  </div>
                  <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs sm:text-sm font-semibold">
                      {translate(image.titleKey)}
                    </p>
                    {image.descriptionKey && (
                      <p className="text-[11px] sm:text-xs opacity-80">
                        {translate(image.descriptionKey)}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500 text-xs sm:text-sm">
            Chưa có ảnh trong mục này.
          </div>
        )}

        {/* Nút Xem Tất Cả */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center mt-8 sm:mt-10"
        >
          <button
            onClick={() => setIsFullGalleryOpen(true)}
            className="bg-white text-gray-700 px-6 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-rose-300 group text-xs sm:text-sm inline-flex items-center space-x-2 cursor-pointer"
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
              className="absolute top-5 right-5 text-white/80 hover:text-white text-2xl z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 cursor-pointer"
            >
              ✕
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-3 sm:left-8 text-white/80 hover:text-white text-xl z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            >
              ❮
            </button>

            <div
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={fullGallery[selectedImageIndex].src}
                alt={translate(fullGallery[selectedImageIndex].titleKey)}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="mt-3 sm:mt-4 text-center text-white">
                <h3 className="text-sm sm:text-lg font-serif font-semibold">
                  {translate(fullGallery[selectedImageIndex].titleKey)}
                </h3>
                {fullGallery[selectedImageIndex].descriptionKey && (
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">
                    {translate(fullGallery[selectedImageIndex].descriptionKey!)}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-3 sm:right-8 text-white/80 hover:text-white text-xl z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
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
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
          >
            {/* STICKY HEADER */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm px-4 sm:px-6 py-3.5">
              <div className="max-w-5xl mx-auto flex justify-between items-center">
                <div>
                  <h3 className="text-lg sm:text-2xl font-serif font-bold text-gray-800">
                    {t("gallery.fullAlbumTitle")}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {t("gallery.fullAlbumSubtitle")}
                  </p>
                </div>
                <button
                  onClick={() => setIsFullGalleryOpen(false)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center font-bold transition-all shadow-sm cursor-pointer"
                  title="Đóng"
                >
                  ✕
                </button>
              </div>

              {/* STICKY TABS */}
              <div className="max-w-5xl mx-auto flex flex-wrap gap-1.5 sm:gap-2 mt-3 justify-center">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key);
                      if (onChangeCategory) onChangeCategory(tab.key);
                    }}
                    className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      activeTab === tab.key
                        ? "bg-rose-500 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {translate(tab.labelKey)}
                  </button>
                ))}
              </div>
            </div>

            {/* CONTENT GRID */}
            <div className="max-w-5xl mx-auto p-3 sm:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
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
                      alt={translate(image.titleKey)}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2 text-center">
                      <p className="text-xs font-semibold">
                        {translate(image.titleKey)}
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