import Sidebar from "../components/b2c/sidebar/Sidebar";
import AdsCarousel from "../components/common/AdSection/AdsCarousel";

export default function ProductLayout({ children, products }) {
  return (
    <div className="container mx-auto px-4 py-8 mt-28 overflow-x-hidden  scrollbar-hide">

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <aside className="lg:w-1/4">
          <Sidebar products={products} />
        </aside>

        {/* Ads + Product grid area */}
        <section className="lg:w-3/4 mt-10">
          <AdsCarousel />
          {children}
        </section>
      </div>
    </div>
  );
}