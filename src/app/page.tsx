import BannerSection from "@/components/common/banner/Banner";
import CategoriesList from "@/components/home/categories/Categories";
import Hero from "@/components/home/hero/Hero";
import Products from "@/components/home/products/Products";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <CategoriesList />
      <BannerSection />
      <Products />
    </div>
  );
}
