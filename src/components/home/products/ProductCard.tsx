"use client";

import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import Link from "next/link";
export default function ProductCard({
  product,
  index,
}: {
  product: {
    id: number;
    name: string;
    nameEn: string;
    image: string;
    description: string;
    price: number;
    originalPrice: number;
    categoryId: number;
  };
  index: number;
}) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
    toast.success(`${product.nameEn} added to cart!`, {
      duration: 3000,
      position: "bottom-right",
      style: {
        background: "#000",
        color: "#fff",
      },
    });
  };

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <Link href={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.nameEn}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        <div className="p-4 flex flex-col justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              {product.name.split(" ").slice(0, 2).join(" ")}
            </h3>
            <p className="text-gray-500 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
              {product.description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-semibold text-amber-600">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm line-through text-gray-400">
              ${product.originalPrice.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-200 text-sm font-medium"
          >
            Add to Cart
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
