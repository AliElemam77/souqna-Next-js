"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/home/products/ProductCard";
import { useGetProductsQuery } from "@/redux/services/productsApi";
import { Search, Filter, X } from "lucide-react";

export default function ProductsPage() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [sort, setSort] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(
    () =>
      [...new Set(products?.map((p) => p.categoryId))].map((id) => ({
        id,
        name: `Category ${id}`,
      })),
    [products]
  );

  const filtered = useMemo(() => {
    if (!products) return [];

    return products
      .filter((p) => {
        const matchesSearch = [p.name, p.nameEn, p.description].some((field) =>
          field?.toLowerCase().includes(search.toLowerCase())
        );

        const matchesCategory =
          !category || p.categoryId.toString() === category;
        const matchesPrice =
          (!min || p.price >= +min) && (!max || p.price <= +max);

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        switch (sort) {
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          default:
            return 0;
        }
      });
  }, [products, search, category, min, max, sort]);

  const clear = () => {
    setSearch("");
    setCategory("");
    setMin("");
    setMax("");
    setSort("");
  };

  return (
    <div className="px-4 py-8 min-h-screen">
      {/* Search + Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4 space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl"
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            <Filter className="w-4 h-4" /> Filter
          </button>

          {(search || category || min || max || sort) && (
            <button
              onClick={clear}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
            >
              <X className="w-4 h-4" /> Clear
            </button>
          )}
        </div>

        {showFilters && (
          <div className="grid md:grid-cols-3 gap-2">
            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Price Range */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Max"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="">Sort by</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="price-asc">Price Low → High</option>
              <option value="price-desc">Price High → Low</option>
            </select>
          </div>
        )}

        {!isLoading && !isError && (
          <p className="text-sm text-gray-600">
            Showing {filtered.length} of {products?.length || 0} products
          </p>
        )}
      </div>

      {/* State: Loading */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white animate-pulse space-y-4 shadow"
            >
              <div className="h-36 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 w-3/4 rounded" />
              <div className="h-4 bg-gray-200 w-1/2 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* State: Error */}
      {isError && (
        <div className="text-center text-red-600 py-10">
          <p>Something went wrong. Please try again.</p>
        </div>
      )}

      {/* State: No Results */}
      {!isLoading && !isError && filtered.length === 0 && (
        <div className="text-center text-gray-600 py-10">No products found</div>
      )}

      {/* Products */}
      {!isLoading && !isError && filtered.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
