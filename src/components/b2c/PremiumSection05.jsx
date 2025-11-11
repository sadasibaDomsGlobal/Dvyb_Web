import React, { useState, useEffect } from "react";
import { Heart, Star } from "lucide-react";
import Bag_ic from '@/assets/b2c/images/commmon/bag_ic.svg';
import { useNavigate } from "react-router-dom";

import { cartService } from "../../services/cartService";
import { wishlistService } from "../../services/wishlistService";
// import { addToCart, subscribeToCart } from "../../services/cartService";
// import { toggleWishlist, isInWishlist } from "../../services/wishlistService";


import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { usePopup } from "../../../context/ToastPopupContext";
import { useProducts } from "../../hooks";

function PremiumSection05() {
  
  const { products, loading, error } = useProducts(); 

  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [togglingWishlist, setTogglingWishlist] = useState(new Set());
  const [displayedProducts, setDisplayedProducts] = useState([]);

  const [cartIds, setCartIds] = useState(new Set());
  const [inFlightAdds, setInFlightAdds] = useState(new Set());
  // const { showPopup } = usePopup();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Subscribe to cart (unchanged)
  useEffect(() => {
    let unsubscribe = null;
    const setup = async () => {
      unsubscribe = await cartService.subscribeToCart((cartItems) => {
        const ids = new Set(cartItems.map(ci => ci.productId || ci.id));
        setCartIds(ids);
      });
    };
    setup();
    return () => typeof unsubscribe === "function" && unsubscribe();
  }, [user]);

  // Responsive display (unchanged)
  useEffect(() => {
    const handleResize = () => {
      setDisplayedProducts(window.innerWidth < 768 ? products.slice(0, 4) : products);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [products]);

  // Wishlist status (unchanged)
  useEffect(() => {
    const checkWishlist = async () => {
      if (!user || products.length === 0) return;
      try {
        const checks = await Promise.all(products.map(p => wishlistService.isInWishlist(p.id)));
        const set = new Set();
        products.forEach((p, i) => checks[i] && set.add(p.id));
        setWishlistItems(set);
      } catch (err) {
        console.error("Wishlist error:", err);
      }
    };
    checkWishlist();
  }, [user, products]);

  
  const handleAddToCart = async (product, e) => {
    e.stopPropagation();
    if (!user) return toast.error("Please log in to add items to cart!");
    if (cartIds.has(product.id)) return navigate("mycart");
    if (inFlightAdds.has(product.id)) return;

    setInFlightAdds(prev => new Set(prev).add(product.id));
    setCartIds(prev => new Set(prev).add(product.id));

    try {
      await cartService.addToCart(product.id, {
        name: product.name,
        price: product.price,
        imageUrls: product.imageUrls
      }, 1);
    } catch (err) {
      setCartIds(prev => { const s = new Set(prev); s.delete(product.id); return s; });
      toast.error("Failed to add to cart.");
      console.error(err);
    } finally {
      setInFlightAdds(prev => { const s = new Set(prev); s.delete(product.id); return s; });
    }
  };

  // handleWishlistToggle (unchanged)
  const handleWishlistToggle = async (product, e) => {
    e.stopPropagation();
    if (!user) return toast.error("Please log in to manage your wishlist!");
    if (togglingWishlist.has(product.id)) return;

    setTogglingWishlist(prev => new Set([...prev, product.id]));

    const productData = {
      name: product.name || product.title,
      title: product.title || product.name,
      price: parseFloat(product.price) || 0,
      imageUrls: product.imageUrls || [],
      selectedColors: product.selectedColors || [],
      selectedSizes: product.selectedSizes || [],
      fabric: product.fabric || '',
      craft: product.craft || '',
      description: product.description || ''
    };

    try {
      const result = await wishlistService.toggleWishlist(product.id, productData);
      setWishlistItems(prev => {
        const s = new Set(prev);
        result.inWishlist ? s.add(product.id) : s.delete(product.id);
        return s;
      });

      // showPopup(result.inWishlist ? "wishlist" : "wishlistRemove", {
      //   title: productData.name,
      //   image: productData.imageUrls?.[0],
      // });
      
    } catch (err) {
      toast.error("Failed to update wishlist.");
      console.error(err);
    } finally {
      setTogglingWishlist(prev => { const s = new Set(prev); s.delete(product.id); return s; });
    }
  };

  const handleProductClick = (product) => navigate(`/products/${product.id}`);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600"><p>{error}</p></div>;

  return (
    <div className="min-h-screen bg-white lg:py-12 py-8 px-4" style={{ fontFamily: "Outfit" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 p-1 mb-6">
            <span className="text-[18px] text-[#98C0D9] font-medium tracking-wider">
              DVYB COLLECTION
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PREMIUM SELECTIONS
          </h1>
          <p className="text-gray-600 mb-6">
            Indulge in our curated luxury collection, where fashion meets culture.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-24 justify-items-center">
          {products.length === 0 ? (
            <p className="text-gray-600 text-center col-span-full">
              No premium products available at the moment.
            </p>
          ) : (
            displayedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow w-full max-w-[320px] md:max-w-[340px] lg:max-w-[360px] xl:w-80 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={product.imageUrls?.[0] || "https://via.placeholder.com/400"}
                    alt={product.name || product.title}
                    className="w-full h-full object-cover"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded-md">
                      -{product.discount}% OFF
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center mb-2 justify-between">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                      ))}
                      <span className="text-xs text-gray-700 ml-1">(4.0)</span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2">
                    {product.name || product.title}
                  </h3>

                  <div className="mb-1">
                    <span className="font-bold text-gray-900 text-base mr-2">₹{product.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{parseFloat(product.price) + 100}</span>
                  </div>

                  <div className="mb-3">
                    <span className="text-xs text-green-600 font-medium">Save ₹100</span>
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    <button
                      className={`flex-1 bg-[#3C8E9A] hover:bg-teal-700 text-white text-xs font-medium py-2 px-3 rounded flex items-center justify-center space-x-1 transition-colors ${
                        inFlightAdds.has(product.id) ? 'opacity-50' : ''
                      }`}
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={inFlightAdds.has(product.id)}
                    >
                      <img src={Bag_ic} className="w-4 h-4 md:w-5 md:h-5" />
                      <p className="text-[8px] md:text-xs">
                        {cartIds.has(product.id) ? 'GO TO BAG' : (inFlightAdds.has(product.id) ? 'ADDING...' : 'ADD TO BAG')}
                      </p>
                    </button>

                    <button
                      className={`p-1 border border-gray-200 rounded hover:bg-gray-50 ${
                        togglingWishlist.has(product.id) ? 'opacity-50' : ''
                      }`}
                      onClick={(e) => handleWishlistToggle(product, e)}
                      disabled={togglingWishlist.has(product.id)}
                    >
                      <Heart
                        className={`w-3 h-3 md:h-5 md:w-5 m-1 transition-colors ${
                          wishlistItems.has(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PremiumSection05;