import CategoryCarousel from "../../../components/utils/CategoryCarousel";
import ProductGrid from "../../../components/product/productGrid";
import SectionTitle from "../../../components/utils/sectionTitle";
import homeBanner from "../../../assets/B2C/landing/banner01.svg";
import ClosetIconsSection from "../../../components/b2c/home/ClosetIconsSection";
import { useProducts } from "../../../hooks/useProducts";
import { useStaticProducts } from "../../../hooks/useStaticProducts";
import LuxuryPicks from "../../../components/b2c/home/LuxuryPicks";
import SpotlightCollections from "../../../components/b2c/home/SpotlightCollections";
import BestProducts from "../../../components/b2c/home/BestProducts";
import { useNavigate } from "react-router-dom";



export default function Home() {
  // const { products, loading, error } = useProducts();
  // const { loading, error } = useProducts();
  const { staticProducts, loading, error } = useStaticProducts();
  const navigate = useNavigate()
  console.log(staticProducts)

  if (loading) return <div className="text-center py-20 sm:py-2">Loading…</div>;
  if (error) return <div className="text-center text-iserror py-20">{error}</div>;

  const productsArray = Array.isArray(staticProducts) ? staticProducts : [];
  const wedding = productsArray.filter((p) => p.category === "Wedding");
  // const discount = productsArray.filter((p) => p.discountPercent && p.discountPercent > 0);
  const discount = productsArray.filter((p) => p.category === "Discount");
  const bestsellers = productsArray.filter((p) => p.category === "Bestselling").slice(0, 8);
  const spotlight = productsArray.find((p) => p.category === "Spotlight");
  const luxuryPicks = productsArray.filter((p) => p.category === "Luxury").slice(0, 4);
  const closetIcons = productsArray.filter((p) => p.category === "Closet").slice(0, 8);





  return (
    <div className="mt-44">


      <section
        className="w-full max-w-[95vw] md:h-[90vh] aspect-3/2 sm:aspect-16/7 md:aspect-16/7 lg:aspect-16/5 m-2 md:m-4 lg:mx-7 mx-auto overflow-hidden flex justify-center items-center "
      >
        <img
          onClick={()=>navigate("/womenwear")}
          src={homeBanner}
          alt="New Year Sale"
          className="w-full h-full object-fill object-center"
        />
      </section>

      {/* 2. WEDDING TALES */}
      <section className="container mx-auto py-12 px-0">
        <SectionTitle viewAll>Wedding Tales</SectionTitle>
        <ProductGrid products={wedding} columns={3} />
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section className="py-4">
        <div className="container mx-auto">
          <SectionTitle viewAll>Shop by Category</SectionTitle>
          <CategoryCarousel />
        </div>
      </section>

      {/* 4. DISCOUNT COLLECTION */}
      <section className="container mx-auto py-12 ">
        <SectionTitle viewAll>Discount Collection</SectionTitle>
        <ProductGrid products={discount} columns={4} />
      </section>

      {/* Luxurious Picks of the Day (from image) */}
      <section className="container mx-auto py-12">
        <SectionTitle>Luxurious Picks of the Day</SectionTitle>
        {/* <ProductGrid products={luxuryPicks} columns={4} /> */}
        <LuxuryPicks products={luxuryPicks} columns={4} />
      </section>

      {/* 5. SPOTLIGHT OF THE DAY */}
      {spotlight && (
        <section className="container mx-auto py-12">
          {/* <SectionTitle>Spotlight of the Day</SectionTitle> */}

          <SpotlightCollections />
        </section>
      )}

      {/* 6. BESTSELLING */}
      <section className="container mx-auto py-12 ">
        <SectionTitle viewAll>Bestselling</SectionTitle>
        <BestProducts products={bestsellers} columns={2} />
        <ProductGrid products={wedding} columns={3} />
      </section>

      {/* 7. CLOSET ICONS (New Section) */}
      <section className="container mx-auto py-12">
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