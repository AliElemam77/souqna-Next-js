"use client";

import { useGetProductsQuery } from "../../../redux/services/productsApi";
import Header from "@/components/common/header/Header";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function ProductsList() {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl p-4 animate-pulse bg-white shadow-md border border-gray-200"
          >
            <div className="w-full h-40 bg-gray-200 rounded-lg mb-4" />

            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 p-4 text-center">
        {(error as any).message || "Something went wrong. Try again later."}
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <Header title="Featured Products" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.slice(0, 4).map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
      <div className="text-center mt-6">
        <Link href={"/products"}>
          <button className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
}
