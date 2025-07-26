"use client";

import Logo from "@/components/common/logo/Logo";
import React from "react";

export default function AboutSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About
              <span className="">
                <Logo />
              </span>
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              <strong>Souqna</strong> is a modern and user-friendly e-commerce
              platform designed to make online shopping smooth, fast, and
              secure.
            </p>
            <p className="mt-4 text-gray-700 text-lg leading-relaxed">
              Our mission is to provide customers with a seamless experience —
              from discovering products and filtering by category, to managing
              the shopping cart with ease.
            </p>
            <p className="mt-4 text-gray-700 text-lg leading-relaxed">
              We focus on simplicity, speed, and usability — offering a smooth
              user journey that helps shoppers find what they need effortlessly.
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2670&auto=format&fit=crop"
              alt="About Souqna"
              className="w-full rounded-xl shadow-md object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
