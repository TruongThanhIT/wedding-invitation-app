"use client";

import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

interface LoveStoryProps {
  onSelectCategory?: (category: string) => void;
}

export const LoveStory = ({ onSelectCategory }: LoveStoryProps) => {
  const { t } = useTranslation("home");

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const storyItems = [
    {
      categoryKey: "linkedin",
      badge: t("loveStory.items.linkedin.badge"),
      title: t("loveStory.items.linkedin.title"),
      description: t("loveStory.items.linkedin.description"),
      icon: "💼",
      coverImage: "/assets/images/gallery/story-1.png",
    },
    {
      categoryKey: "firstMeet",
      badge: t("loveStory.items.firstMeet.badge"),
      title: t("loveStory.items.firstMeet.title"),
      description: t("loveStory.items.firstMeet.description"),
      icon: "✈️",
      coverImage: "/assets/images/gallery/story-2.jpg",
    },
    {
      categoryKey: "chinaTour",
      badge: t("loveStory.items.chinaTour.badge"),
      title: t("loveStory.items.chinaTour.title"),
      description: t("loveStory.items.chinaTour.description"),
      icon: "🇨🇳",
      coverImage: "/assets/images/gallery/travel-1.jpg",
    },
    {
      categoryKey: "vietnamTour",
      badge: t("loveStory.items.vietnamTour.badge"),
      title: t("loveStory.items.vietnamTour.title"),
      description: t("loveStory.items.vietnamTour.description"),
      icon: "🇻🇳",
      coverImage: "/assets/images/gallery/story-3.png",
    },
    {
      categoryKey: "newZealand",
      badge: t("loveStory.items.newZealand.badge"),
      title: t("loveStory.items.newZealand.title"),
      description: t("loveStory.items.newZealand.description"),
      icon: "🇳🇿",
      coverImage: "/assets/images/gallery/travel-5.jpg",
    },
     {
      categoryKey: "propose",
      badge: t("loveStory.items.propose.badge"),
      title: t("loveStory.items.propose.title"),
      description: t("loveStory.items.propose.description"),
      icon: "💍",
      coverImage: "/assets/images/gallery/propose-2.png",
    },
    {
      categoryKey: "prewedding",
      badge: t("loveStory.items.prewedding.badge"),
      title: t("loveStory.items.prewedding.title"),
      description: t("loveStory.items.prewedding.description"),
      icon: "🏡",
      coverImage: "/assets/images/gallery/prewedding-7.jpg",
    },
  ];

  const handleCardClick = (categoryKey: string) => {
    if (typeof onSelectCategory === "function") {
      onSelectCategory(categoryKey);
    }

    const gallerySection = document.getElementById("gallery-section");
    if (gallerySection) {
      const yOffset = -80;
      const y =
        gallerySection.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={ref}
      className="py-16 px-4 bg-gradient-to-b from-rose-50/30 via-white to-rose-50/20"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800 mb-3">
            {t("loveStory.title")}
          </h3>
          <div className="w-16 h-0.5 bg-rose-400 mx-auto mb-4"></div>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            {t("loveStory.subtitle")}
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-rose-200 transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {storyItems.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-rose-400 shadow-md text-sm">
                    {item.icon}
                  </div>

                  <div className="hidden md:block md:w-1/2"></div>

                  <div
                    className={`w-full pl-16 md:w-1/2 ${
                      isEven ? "md:pl-0 md:pr-10" : "md:pl-10 md:pr-0"
                    }`}
                  >
                    <div
                      onClick={() => handleCardClick(item.categoryKey)}
                      className="group bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-rose-100 hover:border-rose-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="bg-rose-100 text-rose-700 px-3 py-0.5 rounded-full text-xs font-semibold">
                          {item.badge}
                        </span>
                      </div>

                      <h4 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-rose-600 transition-colors mb-2">
                        {item.title}
                      </h4>

                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {item.coverImage && (
                        <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden mb-4 bg-rose-50 border border-gray-100">
                          <img
                            src={item.coverImage}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      <div className="flex items-center text-xs sm:text-sm text-rose-500 font-semibold group-hover:translate-x-1 transition-transform">
                        <span>{t("loveStory.viewAlbum")}</span>
                        <span className="ml-1">→</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-16">
          <button
            onClick={() => handleCardClick("all")}
            className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-medium px-8 py-3.5 rounded-full shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
          >
            <span>🖼️</span>
            <span>{t("loveStory.viewAllPhotos")}</span>
          </button>
        </div>
      </div>
    </section>
  );
};