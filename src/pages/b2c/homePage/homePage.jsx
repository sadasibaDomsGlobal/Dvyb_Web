import CategoryCarousel from "../../../components/utils/CategoryCarousel";
import ProductGrid from "../../../components/product/productGrid";
import SectionTitle from "../../../components/utils/SectionTitle";
import homeBanner from "@/assets/b2c/landing/banner01.svg";
import ClosetIconsSection from "../../../components/b2c/home/ClosetIconsSection";
// import { useProducts } from "../../../hooks/useProducts";
import { useStaticProducts } from "../../../hooks/useStaticProducts";
import LuxuryPicks from "../../../components/b2c/home/LuxuryPicks";
import SpotlightCollections from "../../../components/b2c/home/SpotlightCollections";
import BestProducts from "../../../components/b2c/home/BestProducts";



export default function Home() {
  // const { products, loading, error } = useProducts();
  // const { loading, error } = useProducts();
  const { staticProducts, loading, error } = useStaticProducts();
  console.log(staticProducts)

  if (loading) return <div className="text-center py-20">Loading…</div>;
  if (error) return <div className="text-center text-iserror py-20">{error}</div>;

  // ----- Split data for sections -----
  // const hero = products.find((p) => p.isNew); // or static banner data
  // const wedding = products.filter((p) => p.category === "Wedding");
  // const discount = products.filter((p) => p.discountPercent && p.discountPercent > 0);
  // const bestsellers = products.slice(0, 8);
  // const spotlight = products[0];
  // const luxuryPicks = products.filter((p) => p.category === "Luxury").slice(0, 4); // For Luxurious Picks
  // const closetIcons = products.filter((p) => p.category === "Closet").slice(0, 8); // Adjust category as needed

  // ----- static data for sections -----
  // Filter products based on category

  const productsArray = Array.isArray(staticProducts) ? staticProducts : [];

  const wedding = productsArray.filter((p) => p.category === "Wedding");
  // const discount = productsArray.filter((p) => p.discountPercent && p.discountPercent > 0);
  const discount = productsArray.filter((p) => p.category === "Discount");
  const bestsellers = productsArray.filter((p) => p.category === "Bestselling").slice(0, 8);
  const spotlight = productsArray.find((p) => p.category === "Spotlight");
  const luxuryPicks = productsArray.filter((p) => p.category === "Luxury").slice(0, 4);
  const closetIcons = productsArray.filter((p) => p.category === "Closet").slice(0, 8);





  return (
    <div className="mt-40">
      <section
        className="cursor-pointer w-full max-w-[95vw] md:h-[90vh] aspect-3/2 sm:aspect-16/7 md:aspect-16/7 lg:aspect-16/5 m-2 md:m-4 lg:mx-7 mx-auto overflow-hidden flex justify-center items-center "
      >
        <img
          src={homeBanner}
          alt="New Year Sale"
          className="w-full h-full object-fill object-center"
        />
      </section>

      {/* 2. WEDDING TALES */}
      <section className="container mx-auto py-12 px-4">
        <SectionTitle viewAll>Wedding Tales</SectionTitle>
        <ProductGrid products={wedding} columns={3} />
      </section>
      

      {/* 3. SHOP BY CATEGORY */}
      <section className="py-4 hide-scrollbar">
        <div className="container mx-auto px-4 hide-scrollbar">
          <SectionTitle viewAll>Shop by Category</SectionTitle>
          <CategoryCarousel />
        </div>
      </section>

      {/* 4. DISCOUNT COLLECTION */}
      <section className="container mx-auto py-12 px-4">
        <SectionTitle viewAll>Discount Collection</SectionTitle>
        <ProductGrid products={discount} columns={4} />
      </section>

      {/* Luxurious Picks of the Day (from image) */}
      <section className="container mx-auto py-12 px-4">
        <SectionTitle>Luxurious Picks of the Day</SectionTitle>
        {/* <ProductGrid products={luxuryPicks} columns={4} /> */}
        <LuxuryPicks products={luxuryPicks} columns={5} />
      </section>

      {/* 5. SPOTLIGHT OF THE DAY */}
      {spotlight && (
        <section className="container mx-auto py-12 px-4">
          <SectionTitle>Spotlight of the Day</SectionTitle>

          <SpotlightCollections />
        </section>
      )}

      {/* 6. BESTSELLING */}
      <section className="container mx-auto py-12 px-4">
        <SectionTitle viewAll>Bestselling</SectionTitle>
        <BestProducts products={bestsellers} columns={2} />
        <ProductGrid products={wedding} columns={3} />
      </section>

      {/* 7. CLOSET ICONS (New Section) */}
      <section className="container mx-auto py-12 px-4">
        {closetIcons.length > 0 && (
          <section>
            <SectionTitle viewAll>Closet icons</SectionTitle>
            <ClosetIconsSection products={closetIcons} columns={5} />
            <ProductGrid products={discount} columns={4} />
            <BestProducts products={bestsellers} columns={3} />
          </section>
        )}
      </section>


    </div>
  );

}
