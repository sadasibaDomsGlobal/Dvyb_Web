import React, { useState, useEffect } from "react";
import { Minus, Plus, Heart, Trash2 } from "lucide-react";
import { usePopup } from "../../../context/PopupProvider";
import {
    cartService
} from "../../../services/cartService";
import { wishlistService } from "../../../services/wishlistService";
import { useNavigate } from "react-router-dom";
import {mainlogo} from "../../../assets"

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { showPopup } = usePopup();
  const navigate = useNavigate();

  // 🛒 Subscribe to cart updates
  useEffect(() => {
    let unsubscribe = null;

    const setupSubscription = async () => {
      try {
        unsubscribe = await cartService.subscribeToCart((items) => {
          setCartItems(items);
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Error setting up cart subscription:", error);
        setIsLoading(false);
      }
    };

    setupSubscription();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // 🚀 Proceed to Checkout
  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before checkout.");
      return;
    }
    navigate("/checkoutpage");
  };

  // 💖 Move item to wishlist
  const moveToWishlist = async (item) => {
    try {
      await wishlistService.addToWishlist(item.id, {
        name: item.name,
        price: item.price,
        color: item.color,
        size: item.size,
        imageUrls: item.imageUrls,
        freeShipping: item.freeShipping,
        shippingMessage: item.shippingMessage,
      });

      await cartService.removeFromCart(item.id);

      showPopup("wishlist", {
        title: item.name,
        image: item.imageUrls?.[0],
      });
    } catch (error) {
      console.error("Error moving item to wishlist:", error);
      alert("Failed to move item to wishlist. Please try again.");
    }
  };

  // 🗑️ Remove item
  const removeItem = async (product) => {
    try {
      await cartService.removeFromCart(product.id);
      const title = product.name || product.title || "Product";
      const image =
        product.imageUrls?.[0] || product.image || product.imageUrl || "";
      showPopup("cartremove", { title, image });
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item.");
    }
  };

  // 🔢 Update quantity
  const handleQuantityChange = async (item, delta) => {
    const newQuantity = (item.quantity || 1) + delta;
    if (newQuantity < 1) return;
    try {
      await updateCartItemQuantity(item.id, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity.");
    }
  };

  // 💰 Totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.subtotal || item.price * (item.quantity || 1)),
    0
  );

  const discount = subtotal * 0.12;
  const shipping = cartItems.some((i) => !i.freeShipping) ? 50 : 0;
  const totalPayable = subtotal - discount + shipping;

  const fontStyles =
    "font-[Outfit] font-medium uppercase tracking-[0.27px] leading-[100%] text-[#000]";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading your cart...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-6 md:px-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div className="flex items-center gap-3">
          <h1
            className={`${fontStyles} text-[20px] font-medium md:text-[22px]`}
          >
            Your Shopping <span className="">Cart</span>
          </h1>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Section - Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-600 bg-gray-50 py-10 rounded-md shadow-sm">
              Your cart is empty.
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row gap-6"
              >
                <img
                  src={
                    item.imageUrls?.[0] ||
                    "https://via.placeholder.com/150?text=No+Image"
                  }
                  alt={item.name}
                  className="w-[120px] h-[150px] object-cover rounded-md"
                />
                <div className="flex-1 space-y-2">
                  <h2 className="text-[18px] font-medium text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-[14px] text-gray-600">
                    CODE: {item.id || "N/A"}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <select
                      className="border border-gray-300 rounded-md px-3 py-1 text-[14px]"
                      defaultValue={item.size || "M"}
                    >
                      <option>XS</option>
                      <option>S</option>
                      <option>M</option>
                      <option>L</option>
                    </select>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => handleQuantityChange(item, -1)}
                        className="px-2 py-1 hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4 text-gray-700" />
                      </button>
                      <span className="px-3 text-[14px]">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item, +1)}
                        className="px-2 py-1 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                  {item.shippingMessage && (
                    <p className="text-[14px] text-gray-500 mt-2">
                      {item.shippingMessage}
                    </p>
                  )}
                </div>
                <div className="flex flex-col justify-between items-end">
                  <p className="text-[18px] font-semibold text-gray-800">
                    ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => moveToWishlist(item)}
                      className="hover:text-red-500 text-gray-400"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => removeItem(item)}
                      className="hover:text-red-500 text-gray-400"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Offer Banner */}
          {cartItems.length > 0 && (
            <div className="text-[#9C0000] text-[14px] bg-yellow-100 p-2 font-medium tracking-wide mt-2">
              SHOP FOR ₹12,229 MORE AND GET FLAT ₹10,000 OFF! USE COUPON CODE
              <span className="text-[#9C0000] font-semibold ml-1">
                SHOPMORE75K
              </span>
            </div>
          )}

          {/* Notes */}
          <ul className="text-[13px] text-gray-600 list-disc pl-5 space-y-1 mt-4">
            <li>
              Once your order has been placed, no subsequent changes can be made
              in it.
            </li>
            <li>
              Shipping cost may vary depending on the delivery destination.
            </li>
            <li>
              Please check the final amount on the summary page before payment.
            </li>
            <li>An item’s price may vary according to the size selected.</li>
          </ul>

          <div className="flex justify-start gap-6 text-[13px] text-gray-700 mt-5">
            <a href="#" className="hover:text-gray-900">
              SHIPPING POLICY
            </a>
            <a href="#" className="hover:text-gray-900">
              HELP
            </a>
            <a href="#" className="hover:text-gray-900">
              CONTACT US
            </a>
          </div>
        </div>

        {/* RIGHT SECTION - CART SUMMARY */}
        <div className="p-6 rounded-md shadow-sm h-fit border border-transparent">
          <h2 className="font-[Outfit] text-[18px] font-medium uppercase tracking-[0.27px] text-[#000] mb-5">
            Cart Summary
          </h2>

          <div className="border border-gray-300 rounded-sm p-4 space-y-3">
            <div className="flex justify-between text-[15px]">
              <span className="font-medium">Cart Total</span>
              <span className="font-medium">₹{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-[15px]">
              <span className="font-medium">Total Discount</span>
              <span className="text-[#000] font-medium">
                (-) ₹{discount.toLocaleString()}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between text-[15px]">
                <span className="font-medium">Shipping</span>
                <span className="font-medium">₹{shipping}</span>
              </div>
              <p className="text-[13px] text-gray-600 mt-1">
                Shipping Charges To Be Calculated On Checkout
              </p>
            </div>
          </div>

          {/* Coupon Section */}
          <div className="mt-6">
            <label
              htmlFor="coupon"
              className="text-[14px] font-[Outfit] font-medium uppercase tracking-[0.27px] text-[#000] block mb-2"
            >
              Coupon Code
            </label>

            <div className="flex border border-gray-300 rounded-sm overflow-hidden">
              <input
                id="coupon"
                type="text"
                placeholder="Enter Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-3 py-2 text-[14px] focus:outline-none"
              />
              <button className="px-6 py-2 bg-[#3E0F0F] text-white text-[14px] font-medium uppercase tracking-[0.27px] hover:bg-[#2a0b0b] transition">
                Apply
              </button>
            </div>
          </div>

          {/* Total Payable */}
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <span className="font-[Outfit] text-[16px] font-medium uppercase text-[#000]">
                Total Payable
              </span>
              <span className="font-[Outfit] text-[22px] font-semibold text-[#000]">
                ₹{totalPayable.toLocaleString()}
              </span>
            </div>
          </div>

          <hr className="border-gray-300 mt-4 mb-5" />

          <div className="space-y-3">
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-[#9C0000] text-white py-3 text-[15px] font-[Outfit] font-medium uppercase tracking-[0.27px] rounded-sm hover:bg-[#7A0000] transition"
            >
              Proceed To Checkout
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full border border-[#9C0000] text-[#9C0000] py-3 text-[15px] font-[Outfit] font-medium uppercase tracking-[0.27px] rounded-sm hover:bg-gray-50 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      {/* TRENDING PRODUCTS */}
      <div className="mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className=" text-[24px] md:text-[20px] font-medium uppercase text-[#000]">
            Trending Products
          </h2>
          <button className="text-black text-[14px] md:text-[15px] font-medium uppercase hover:underline">
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {[
            {
              name: "SUHINO",
              desc: "Ivory Tissue Mirror & Zari Embroidered Lehenga Set",
              price: "₹94,900",
              img: "https://i.pinimg.com/1200x/09/f0/ed/09f0ed9f1ed02934ada91fdd74f5a670.jpg",
            },
            {
              name: "KANCHIVARAM",
              desc: "Silk Saree with Gold Zari Work",
              price: "₹35,000",
              img: "https://i.pinimg.com/1200x/09/f0/ed/09f0ed9f1ed02934ada91fdd74f5a670.jpg",
            },
            {
              name: "ARANYA",
              desc: "Handcrafted Block Printed Kurta Set",
              price: "₹12,500",
              img: "https://i.pinimg.com/1200x/09/f0/ed/09f0ed9f1ed02934ada91fdd74f5a670.jpg",
            },
            {
              name: "RANGRAGE",
              desc: "Embellished Anarkali Suit with Dupatta",
              price: "₹18,750",
              img: "https://i.pinimg.com/1200x/09/f0/ed/09f0ed9f1ed02934ada91fdd74f5a670.jpg",
            },
            {
              name: "MEERA",
              desc: "Chiffon Floral Print Anarkali with Belt",
              price: "₹24,500",
              img: "https://i.pinimg.com/1200x/09/f0/ed/09f0ed9f1ed02934ada91fdd74f5a670.jpg",
            },
          ].map((product, i) => (
            <div key={i} className="text-center space-y-2">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-[320px] object-cover rounded-md hover:scale-[1.03] transition-transform"
              />
              <h3 className="font-[Outfit] text-[14px] font-medium text-[#000] uppercase tracking-[0.3px]">
                {product.name}
              </h3>
              <p className="text-[13px] text-gray-600 px-1 leading-tight">
                {product.desc}
              </p>
              <p className="text-[14px] font-semibold text-[#000]">
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RECENTLY VIEWED PRODUCTS */}
      <div className="mt-16 mb-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className=" text-[24px] md:text-[20px] font-medium uppercase text-[#000]">
            Recently Viewed Product
          </h2>
          <button className="text-black text-[14px] md:text-[15px] font-medium uppercase hover:underline">
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {[
            {
              name: "KALYAN",
              desc: "Traditional Banarasi Brocade Saree",
              price: "₹45,000",
              img: "https://i.pinimg.com/1200x/09/f0/ed/09f0ed9f1ed02934ada91fdd74f5a670.jpg",
            },
            {
              name: "RANGRAGE",
              desc: "Embellished Anarkali Suit with Dupatta",
              price: "₹18,750",
              img: "https://i.pinimg.com/1200x/09/f0/ed/09f0ed9f1ed02934ada91fdd74f5a670.jpg",
            },
            {
              name: "ARANYA",
              desc: "Handcrafted Block Printed Kurta Set",
              price: "₹12,500",
              img: "https://i.pinimg.com/1200x/09/f0/ed/09f0ed9f1ed02934ada91fdd74f5a670.jpg",
            },
            {
              name: "KANCHIVARAM",
              desc: "Silk Saree with Gold Zari Work",
              price: "₹35,000",
              img: "https://i.pinimg.com/1200x/09/f0/ed/09f0ed9f1ed02934ada91fdd74f5a670.jpg",
            },
            {
              name: "SUHINO",
              desc: "Ivory Tissue Mirror & Zari Embroidered Lehenga Set",
              price: "₹94,900",
              img: "https://i.pinimg.com/1200x/09/f0/ed/09f0ed9f1ed02934ada91fdd74f5a670.jpg",
            },
          ].map((product, i) => (
            <div key={i} className="text-center space-y-2">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-[320px] object-cover rounded-md hover:scale-[1.03] transition-transform"
              />
              <h3 className="font-[Outfit] text-[14px] font-medium text-[#000] uppercase tracking-[0.3px]">
                {product.name}
              </h3>
              <p className="text-[13px] text-gray-600 px-1 leading-tight">
                {product.desc}
              </p>
              <p className="text-[14px] font-semibold text-[#000]">
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
