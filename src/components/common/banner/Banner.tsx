"use client";

import React from "react";

export default function BannerSection() {
  return (
    <section className="my-10 overflow-hidden bg-[url(https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2670&auto=format&fit=crop)] bg-cover bg-top bg-no-repeat">
      <div className="bg-black/50 p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="text-center ltr:sm:text-left rtl:sm:text-right">
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
            Latest Shirts
          </h2>

          <p className="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
            Discover our latest collection of shirts, designed to elevate your
            style and comfort. From casual to formal, we have something for
            every occasion.
          </p>
        </div>
      </div>
    </section>
  );
}
