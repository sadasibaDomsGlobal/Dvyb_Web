import Sidebar from "../components/b2c/sidebar/Sidebar";
import AdsCarousel from "../components/common/AdSection/AdsCarousel";

export default function ProductLayout({ children, products }) {
  return (
    <div className="container mx-auto px-4 py-8 mt-10  scrollbar-hide">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Discover Our Collection
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-1/4">
          <Sidebar products={products} />
        </aside>

        {/* Ads + Product grid area */}
        <section className="lg:w-3/4">
          <AdsCarousel />
          {children}
        </section>
      </div>
    </div>
  );
}
















// // import Header from "../components/common/header/Header";
// // import Footer from "../components/common/footer/Footer";
// import Sidebar from "../components/b2c/sidebar/Sidebar";
// import AdsCarousel from "../components/common/AdSection/AdsCarousel";

// const ProductLayout = ({ children, products }) => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* <Header /> */}
//       <h1>Header Is Currently not there</h1>

//       <main className="flex-grow container mx-auto px-4 py-6">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar only visible in product list pages */}
//           <aside className="lg:w-1/4">
//             <Sidebar products={products} />
//           </aside>

//           <section className="lg:w-3/4 flex flex-col gap-6">
//             <AdsCarousel />
//             {children}
//           </section>
//         </div>
//       </main>

//       {/* <Footer /> */}
//       <h1>Footer Is Currently not there</h1>
//     </div>
//   );
// };

// export default ProductLayout;
