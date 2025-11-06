import CategoryCarousel from "../../../components/utils/CategoryCarousel";
import ProductGrid from "../../../components/product/productGrid";
import SectionTitle from "../../../components/utils/SectionTitle";
import homeBanner from "../../../assets/B2C/landing/banner01.svg";
import ClosetIconsSection from "../../../components/b2c/home/sections/ClosetIconsSection";
import { useProducts } from "../../../hooks/useProducts";
import { usestaticProducts } from "../../../hooks/useStaticProducts";



export default function Home() {
  // const { products, loading, error } = useProducts();
  // const { loading, error } = useProducts();
   const { staticProducts, loading, error } = usestaticProducts();
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
  const discount = productsArray.filter((p) => p.discountPercent && p.discountPercent > 0);
  const bestsellers = productsArray.filter((p) => p.category === "Bestselling").slice(0, 8);
  const spotlight = productsArray.find((p) => p.category === "Spotlight");
  const luxuryPicks = productsArray.filter((p) => p.category === "Luxury").slice(0, 4);
  const closetIcons = productsArray.filter((p) => p.category === "Closet").slice(0, 8);





  return (
    <>
      {/* 1. HERO */}
      {/* <HeroBanner
        discount={15}
        code="NEWYEAR"
        imageUrl={hero?.images[0] || "/hero.jpg"}
      /> */}
      <section className="w-[90vw] h-[500px] md:h-[600px] m-3 mx-auto overflow-hidden flex justify-center items-center shadow-lg">
        <img
          src={homeBanner}
          alt="New Year Sale"
          className="w-full h-full object-cover "
        />
      </section>

      {/* 2. WEDDING TALES */}
      <section className="container mx-auto py-12 px-4">
        <SectionTitle viewAll>Wedding Tales</SectionTitle>
        <ProductGrid products={wedding} columns={3} />
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <SectionTitle>Shop by Category</SectionTitle>
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
        <ProductGrid products={luxuryPicks} columns={4} />
      </section>

      {/* 5. SPOTLIGHT OF THE DAY */}
      {spotlight && (
        <section className="container mx-auto py-12 px-4">
          <SectionTitle>Spotlight of the Day</SectionTitle>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* <img
              src={spotlight.images[0]}
              alt={spotlight.title}
              className="w-full rounded-xl"
            /> */}
            <div>
              <h3 className="text-3xl font-serif mb-4">{spotlight.title}</h3>
              <p className="text-textLight mb-6">{spotlight.description}</p>
              <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primaryLight">
                SHOP NOW
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 6. BESTSELLING */}
      <section className="container mx-auto py-12 px-4">
        <SectionTitle viewAll>Bestselling</SectionTitle>
        <ProductGrid products={bestsellers} columns={4} />
      </section>

      {/* 7. CLOSET ICONS (New Section) */}
      {closetIcons.length > 0 && (
        <ClosetIconsSection products={closetIcons} />
      )}


    </>
  );

}

// export default function Home() {
//   const { products, loading, error } = useProducts();

//   if (loading) return <div className="text-center py-20">Loading…</div>;
//   if (error) return <div className="text-center text-iserror py-20">{error}</div>;

//   // ----- Split data for sections -----
//   const hero = products.find((p) => p.isNew); // or static banner data
//   const wedding = products.filter((p) => p.category === "Wedding");
//   const discount = products.filter((p) => p.discountPercent && p.discountPercent > 0);
//   const bestsellers = products.slice(0, 8);
//   const spotlight = products[0];

//   return (
//     <>
//       {/* 1. HERO */}
//       {/* <HeroBanner
//         discount={15}
//         code="NEWYEAR"
//         imageUrl={hero?.images[0] || "/hero.jpg"}
//       /> */}

//       {/* 2. WEDDING TALES */}
//       <section className="container mx-auto py-12 px-4">
//         <SectionTitle viewAll>Wedding Tales</SectionTitle>
//         <ProductGrid products={wedding} columns={3} />
//       </section>

//       {/* 3. SHOP BY CATEGORY */}
//       <section className="bg-gray-50 py-12">
//         <div className="container mx-auto px-4">
//           <SectionTitle>Shop by Category</SectionTitle>
//           <CategoryCarousel />
//         </div>
//       </section>

//       {/* 4. DISCOUNT COLLECTION */}
//       <section className="container mx-auto py-12 px-4">
//         <SectionTitle viewAll>Discount Collection</SectionTitle>
//         <ProductGrid products={discount} columns={4} />
//       </section>

//       {/* 5. SPOTLIGHT OF THE DAY */}
//       {spotlight && (
//         <section className="container mx-auto py-12 px-4">
//           <SectionTitle>Spotlight of the Day</SectionTitle>
//           <div className="grid md:grid-cols-2 gap-8 items-center">
//             <img
//               src={spotlight.images[0]}
//               alt={spotlight.title}
//               className="w-full rounded-xl"
//             />
//             <div>
//               <h3 className="text-3xl font-serif mb-4">{spotlight.title}</h3>
//               <p className="text-textLight mb-6">{spotlight.description}</p>
//               <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primaryLight">
//                 SHOP NOW
//               </button>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* 6. BESTSELLING */}
//       <section className="container mx-auto py-12 px-4">
//         <SectionTitle viewAll>Bestselling</SectionTitle>
//         <ProductGrid products={bestsellers} columns={4} />
//       </section>
//     </>
//   );
// }


