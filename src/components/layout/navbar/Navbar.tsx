"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { Menu, X, ShoppingCart } from "lucide-react";
import Logo from "@/components/common/logo/Logo";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useSelector((state: any) => state.cart.cartItems);

  const cartCount =
    cartItems?.reduce((total: number, item: any) => total + item.quantity, 0) ||
    0;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-white/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-black hover:text-gray-700 transition-colors font-bold text-xl lg:text-2xl flex items-center space-x-2"
          >
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium px-3 py-1.5 rounded-md transition-all duration-200 ${
                  pathname === link.href
                    ? "text-amber-600 border border-amber-300 shadow-md bg-white/60 backdrop-blur-md"
                    : "text-gray-700 hover:text-amber-600 hover:border hover:shadow-sm"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              href="/cart"
              className={`relative group ${
                pathname === "/cart"
                  ? "text-amber-600"
                  : "text-gray-700 hover:text-amber-600"
              }`}
            >
              <ShoppingCart className="w-6 h-6 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1 text-gray-700"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-white/20 shadow-sm transition-all">
          <nav className="py-4 px-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 rounded transition ${
                  pathname === link.href
                    ? "bg-amber-100 text-amber-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-amber-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
