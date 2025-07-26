"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "@/redux/slices/productsDetailsSlice";
import { useParams } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { addToCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {
    productDetails: product,
    loading,
    error,
  } = useSelector((state: RootState) => state.productsDetails);

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetails(productId));
    }
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.nameEn} added to cart!`,{
        duration: 3000,
        position: "bottom-right",
        style: {
            background: "#000",
            color: "#fff",
        },
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto my-10 p-5 bg-slate-100 rounded-md shadow-md animate-pulse">
        <div className="flex flex-col md:flex-row md:space-x-10">
          <div className="md:flex-1 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 max-w-full">
              {[...Array(4)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-gray-300 w-20 h-20 rounded-md"
                ></div>
              ))}
            </div>
            <div className="flex-1 flex justify-center md:justify-start">
              <div className="bg-gray-300 w-full h-[400px] rounded-md"></div>
            </div>
          </div>
          <div className="md:flex-1 mt-6 md:mt-0 space-y-4">
            <div className="bg-gray-300 h-8 w-3/4 rounded-md"></div>
            <div className="bg-gray-300 h-5 w-full rounded-md"></div>
            <div className="bg-gray-300 h-6 w-1/4 rounded-md"></div>
            <div className="bg-gray-300 h-4 w-1/3 rounded-md"></div>
            <div className="bg-gray-300 h-4 w-1/2 rounded-md"></div>
            <div className="bg-gray-300 h-10 w-40 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container mx-auto my-10 p-5 bg-red-100 border border-red-400 text-red-700 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-2">Something went wrong 😢</h2>
        <p>{error}</p>
        <button
          onClick={() => productId && dispatch(getProductDetails(productId))}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 p-5 bg-slate-100 rounded-md shadow-md">
      <div className="flex flex-col md:flex-row md:space-x-10">
        {/* الصور */}
        <div className="md:flex-1 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
          {/* الصور المصغرة */}
          <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 overflow-x-auto md:overflow-x-visible max-w-full">
            {product.images?.map((img: string, idx: number) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} thumbnail ${idx + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`cursor-pointer rounded-md border-2 ${
                  selectedImage === img
                    ? "border-blue-600"
                    : "border-transparent hover:border-gray-400"
                } w-20 h-20 object-cover flex-shrink-0`}
              />
            ))}
          </div>

          {/* الصورة الكبيرة */}
          <div className="flex-1 flex justify-center md:justify-start">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="rounded-md shadow-lg max-w-full max-h-[400px] object-contain"
            />
          </div>
        </div>

        {/* تفاصيل المنتج */}
        <div className="md:flex-1 mt-6 md:mt-0">
          <h1 className="text-3xl font-extrabold mb-4">
            {product.nameEn} - {product.name}
          </h1>
          <p className="text-lg mb-4">{product.description}</p>

          <div className="mb-3">
            <span className="text-2xl font-bold text-green-700">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-gray-500 line-through ml-3">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="mb-3 text-md font-medium">
            Category:{" "}
            <span className="text-gray-700">
              {product.category?.name || "-"}
            </span>
          </div>

          <div className="mb-3 text-sm text-gray-600">
            {product.tags?.length > 0 ? (
              <>Tags: {product.tags.join(", ")}</>
            ) : (
              <>No tags available</>
            )}
          </div>

          <div className="mb-6">
            <span className="text-yellow-500 font-semibold">
              Rating: {product.rating} / 5
            </span>
          </div>

          <button
            className="bg-yellow-400 text-white px-6 py-3 rounded-md hover:bg-yellow-700 transition duration-300"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
