// ClosetIconsSection.jsx
import ProductCard from "../../../product/ProductCard";

export default function ClosetIconsSection({ products }) {
  // Assuming 8 products for two rows; slice if more
  const topRow = products.slice(0, 4);
  const bottomRow = products.slice(4, 8);

  return (
    <section className="container mx-auto py-12 px-4">
      <SectionTitle viewAll>Closet Icons</SectionTitle>
      <div className="space-y-8">
        {/* Top Row: Full-width images with titles/prices below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {topRow.map((product) => (
            <div key={product.id} className="text-center">
              <div className="aspect-w-1 aspect-h-1 relative overflow-hidden rounded-xl shadow-md">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-sm font-medium text-textDark line-clamp-2 mb-1">
                  {product.title}
                </h3>
                <p className="text-primary font-bold text-base">₹{product.price.toLocaleString("en-IN")}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row: Similar but with discount styling if applicable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {bottomRow.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="h-full" // Ensure uniform height
            />
          ))}
        </div>
      </div>
    </section>
  );
}