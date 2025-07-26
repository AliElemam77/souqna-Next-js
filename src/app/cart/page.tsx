"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart, clearCart } from "@/redux/slices/cartSlice";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart!", {
      duration: 3000,
      position: "bottom-right",
      style: {
        background: "#000",
        color: "#fff",
      },
    });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared successfully!", {
      duration: 3000,
      position: "bottom-right",
      style: {
        background: "#000",
        color: "#fff",
      },
    })
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <ShoppingCart className="w-7 h-7 text-amber-600" />
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="
            text-gray-500 text-lg text-center
            p-6 bg-gray-100 rounded-lg shadow-sm
            flex flex-col items-center justify-center
            h-64
            
        ">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 p-4 bg-white shadow-sm rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-rose-600 hover:text-rose-800 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-bold text-amber-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center gap-4 flex-wrap">
              <button
                onClick={handleClearCart}
                className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors border border-rose-200"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </button>

              <button className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>

            <button className="w-full mt-4 py-3 bg-slate-100 text-slate-800 rounded-lg hover:bg-slate-200 transition-colors">
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
}
