// src/data/staticProducts.js
// Static data for testing homepage sections
// Use in useProducts hook: return { products: staticProducts, loading: false, error: null }

 const staticProducts = [
  // Hero/New Arrivals
  {
    id: "hero-1",
    title: "New Year Festive Lehenga",
    name: "Festive Lehenga Choli",
    price: 12500,
    originalPrice: 15000,
    discountPercent: 15,
    category: "Wedding",
    images: ["/images/lehenga-red-hero.jpg"],
    description: "Embroidered red lehenga with mirror work, perfect for celebrations.",
    isNew: true,
    timestamp: new Date(),
  },

  // Wedding Tales (3 products)
  {
    id: "wedding-1",
    title: "Cocktail Lehenga",
    price: 8500,
    originalPrice: 10500,
    discountPercent: 20,
    category: "Wedding",
    images: ["/images/cocktail-lehenga-purple.jpg"],
    description: "Purple georgette lehenga with zari embroidery.",
  },
  {
    id: "wedding-2",
    title: "Elegant Evening Drapery",
    price: 7200,
    category: "Wedding",
    images: ["/images/elegant-drapery-silk.jpg"],
    description: "Silk drapery saree in pastel shades for evening wear.",
  },
  {
    id: "wedding-3",
    title: "Floral Churidar Set",
    price: 4800,
    category: "Wedding",
    images: ["/images/floral-churidar-red.jpg"],
    description: "Red floral printed churidar set with dupatta.",
  },

  // Discount Collection (4+ products)
  {
    id: "discount-1",
    title: "Cocktail Lehenga Off",
    price: 6800,
    originalPrice: 8500,
    discountPercent: 20,
    category: "Discount",
    images: ["/images/lehenga-cocktail-discount.jpg"],
    description: "Discounted cocktail lehenga in lavender.",
  },
  {
    id: "discount-2",
    title: "Elegant Saree Drapery",
    price: 6120,
    originalPrice: 7200,
    discountPercent: 15,
    category: "Discount",
    images: ["/images/saree-elegant-discount.jpg"],
    description: "Discounted silk saree with zari border.",
  },
  {
    id: "discount-3",
    title: "Floral Kurta Off",
    price: 4080,
    originalPrice: 4800,
    discountPercent: 15,
    category: "Discount",
    images: ["/images/kurta-floral-discount.jpg"],
    description: "Floral printed kurta with discount.",
  },
  {
    id: "discount-4",
    title: "Floral Churidar Kurta",
    price: 3400,
    originalPrice: 4000,
    discountPercent: 15,
    category: "Discount",
    images: ["/images/churidar-floral-discount.jpg"],
    description: "Churidar set on sale.",
  },

  // Luxurious Picks (4 products)
  {
    id: "lux-1",
    title: "Ivory Tussar Mirror Zari",
    price: 4900,
    category: "Luxury",
    images: ["/images/ivory-tussar-zari.jpg"],
    description: "Handwoven tussar silk with mirror work.",
  },
  {
    id: "lux-2",
    title: "Silk Saree with Zari",
    price: 8000,
    category: "Luxury",
    images: ["/images/silk-saree-zari.jpg"],
    description: "Pure silk saree featuring gold zari.",
  },
  {
    id: "lux-3",
    title: "Handblock Printed Kurta",
    price: 3500,
    category: "Luxury",
    images: ["/images/handblock-kurta-black.jpg"],
    description: "Black handblock printed cotton kurta.",
  },
  {
    id: "lux-4",
    title: "Kanchipuram Embroidery Saree",
    price: 7500,
    category: "Luxury",
    images: ["/images/kanchipuram-saree.jpg"],
    description: "Traditional Kanchipuram silk saree.",
  },

  // Spotlight of the Day
  {
    id: "spotlight-1",
    title: "Kanchipuram Saree",
    price: 9500,
    category: "Spotlight",
    images: ["/images/kanchipuram-spotlight.jpg"],
    description: "Vibrant Kanchipuram saree with floral motifs, holding a fresh flower.",
  },

  // Bestselling (8 products)
  {
    id: "best-1",
    title: "Cocktail Lehenga Bestseller",
    price: 8500,
    category: "Bestselling",
    images: ["/images/cocktail-lehenga-best.jpg"],
    description: "Top-selling purple lehenga.",
  },
  {
    id: "best-2",
    title: "Elegant Evening Drapery",
    price: 7200,
    category: "Bestselling",
    images: ["/images/evening-drapery-best.jpg"],
    description: "Popular evening wear drapery.",
  },
  {
    id: "best-3",
    title: "Char Kurta Bestseller",
    price: 4500,
    category: "Bestselling",
    images: ["/images/char-kurta-green.jpg"],
    description: "Green char kurta set.",
  },
  {
    id: "best-4",
    title: "Floral Churidar",
    price: 4800,
    category: "Bestselling",
    images: ["/images/floral-churidar-best.jpg"],
    description: "Bestselling floral set.",
  },
  {
    id: "best-5",
    title: "Red Saree Bestseller",
    price: 6500,
    category: "Bestselling",
    images: ["/images/red-saree-best.jpg"],
    description: "Classic red saree.",
  },
  {
    id: "best-6",
    title: "Blue Anarkali",
    price: 5800,
    category: "Bestselling",
    images: ["/images/blue-anarkali.jpg"],
    description: "Elegant blue anarkali suit.",
  },
  {
    id: "best-7",
    title: "Pink Lehenga",
    price: 9200,
    category: "Bestselling",
    images: ["/images/pink-lehenga.jpg"],
    description: "Festive pink lehenga.",
  },
  {
    id: "best-8",
    title: "Sharara Set",
    price: 5100,
    category: "Bestselling",
    images: ["/images/sharara-set.jpg"],
    description: "Embroidered sharara.",
  },

  // Closet Icons (8 products)
  {
    id: "closet-1",
    title: "Ivory Mirror Zari Saree",
    price: 4900,
    category: "Closet",
    images: ["/images/ivory-mirror-zari.jpg"],
    description: "Closet essential ivory saree.",
  },
  {
    id: "closet-2",
    title: "Ivory Tussar Saree",
    price: 5000,
    category: "Closet",
    images: ["/images/ivory-tussar.jpg"],
    description: "Lightweight tussar saree.",
  },
  {
    id: "closet-3",
    title: "Ivory Zari Saree",
    price: 4800,
    category: "Closet",
    images: ["/images/ivory-zari.jpg"],
    description: "Zari detailed ivory saree.",
  },
  {
    id: "closet-4",
    title: "Ivory Mirror Saree",
    price: 5200,
    category: "Closet",
    images: ["/images/ivory-mirror.jpg"],
    description: "Mirror work ivory saree.",
  },
  {
    id: "closet-5",
    title: "Cocktail Lehenga Closet",
    price: 6800,
    originalPrice: 8500,
    discountPercent: 20,
    category: "Closet",
    images: ["/images/cocktail-lehenga-closet.jpg"],
    description: "Versatile cocktail lehenga.",
  },
  {
    id: "closet-6",
    title: "Elegant Saree Closet",
    price: 6120,
    originalPrice: 7200,
    discountPercent: 15,
    category: "Closet",
    images: ["/images/elegant-saree-closet.jpg"],
    description: "Everyday elegant saree.",
  },
  {
    id: "closet-7",
    title: "Floral Kurta Closet",
    price: 4080,
    originalPrice: 4800,
    discountPercent: 15,
    category: "Closet",
    images: ["/images/floral-kurta-closet.jpg"],
    description: "Casual floral kurta.",
  },
  {
    id: "closet-8",
    title: "Floral Churidar Closet",
    price: 3400,
    originalPrice: 4000,
    discountPercent: 15,
    category: "Closet",
    images: ["/images/floral-churidar-closet.jpg"],
    description: "Comfortable churidar set.",
  },

  // Category Samples (for carousel - images only, no full products needed)
  // Lehenga, Kurtis, Sarees, Shararas, Anarkalis, etc. - use in CategoryCarousel as static
];

// To use in useProducts.js for static mode:
// export function useProducts(staticMode = false) {
//   if (staticMode) {
//     return { products: staticProducts, loading: false, error: null };
//   }
//   // ... real fetch
// }


export default staticProducts;