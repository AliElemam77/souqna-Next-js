"use client";

import { useGetCategoriesQuery } from "../../../redux/services/categoriesApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import CategoryCard from "./CategoryCard";
import Header from "@/components/common/header/Header";

export default function CategoriesSlider() {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useGetCategoriesQuery();

  if (isLoading) {
    return (
      <div className="px-4 py-8 container mx-auto">
        <Header title="Trending Categories" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse  rounded p-2 space-y-2">
              <div className="w-full h-32 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-4 py-8 text-center">
        <div className="inline-block p-6 bg-red-100 border border-red-300 rounded-lg text-red-700 shadow-md">
          <p className="font-bold text-lg mb-2">Oops! Something went wrong</p>
          <p className="text-sm">
            {(error as any).message || "Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <Header title="Trending Categories" />
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        autoplay={{ delay: 2200, pauseOnMouseEnter: true }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 4.6 },
        }}
      >
        {categories?.map((cat) => (
          <SwiperSlide key={cat.id.toString()}>
            <CategoryCard cat={cat} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
