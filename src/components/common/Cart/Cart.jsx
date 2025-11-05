
import React, { useMemo, useState } from "react";


const currency = (v) =>
  typeof v === "number"
    ? v.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })
    : v;

const PlaceholderImage = ({ alt }) => (
  <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 flex items-center justify-center text-gray-400 text-xs rounded">
    {alt || "image"}
  </div>
);

export default function Cart({ initialProducts = null }) {
  // sample products — used when user doesn't pass initialProducts prop
  const sampleProducts = [
    {
      id: "p1",
      title: "GOLDEN MUSTARD ELEGANCE ANARKALI SET",
      subtitle: "mustard spun silk anarkali set",
      code: "SUSC0425127",
      price: 59000,
      qty: 1,
      discount: 0,
      discountIsPercent: false,
      sizeOptions: ["S", "M", "L"],
      selectedSize: "S",
      img: null,
      estShip: "4TH OF NOVEMBER",
    },
    {
      id: "p2",
      title: "EMERALD GREEN CHIFFON ANARKALI SET",
      subtitle: "green chiffon anarkali with embroidery",
      code: "SUSC0425128",
      price: 65000,
      qty: 2,
      discount: 5000, // rupees discount
      discountIsPercent: false,
      sizeOptions: ["S", "M", "L"],
      selectedSize: "M",
      img: null,
      estShip: "6TH OF NOVEMBER",
    },
    {
      id: "p3",
      title: "CRIMSON SILK ANARKALI SUIT",
      subtitle: "red silk anarkali with zari work",
      code: "SUSC0425129",
      price: 72000,
      qty: 4,
      discount: 5,
      discountIsPercent: true, // 5% off on this item
      sizeOptions: ["M", "L", "XL"],
      selectedSize: "L",
      img: null,
      estShip: "8TH OF NOVEMBER",
    },
  ];

  const [cartItems, setCartItems] = useState(initialProducts ?? sampleProducts);
  const [wishlist, setWishlist] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(null); // { type: 'percent'|'fixed', value: number }

  // move to wishlist and remove from cart
  const handleAddToWishlist = (id) => {
    setCartItems((prev) => {
      const item = prev.find((p) => p.id === id);
      if (!item) return prev;
      setWishlist((w) => {
        // avoid duplicates
        if (w.some((x) => x.id === id)) return w;
        return [...w, item];
      });
      return prev.filter((p) => p.id !== id);
    });
  };

  // remove from cart
  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  // change size
  const handleSizeChange = (id, newSize) => {
    setCartItems((prev) => prev.map((p) => (p.id === id ? { ...p, selectedSize: newSize } : p)));
  };

  // quantity change
  const handleQtyChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const newQty = Math.max(1, (p.qty || 1) + delta);
        return { ...p, qty: newQty };
      })
    );
  };

  // apply coupon — simple logic:
  // if coupon ends with % treat as percent (e.g. '10%'), else if starts with 'FLAT' and number treat as fixed rupees
  const applyCoupon = () => {
    const c = coupon.trim();
    if (!c) return;
    if (c.endsWith("%")) {
      const val = parseFloat(c.slice(0, -1));
      if (!isNaN(val)) {
        setCouponApplied({ type: "percent", value: val });
      }
    } else if (/^FLAT(\d+)$/i.test(c)) {
      const match = c.match(/^FLAT(\d+)$/i);
      const val = parseInt(match[1], 10);
      setCouponApplied({ type: "fixed", value: val });
    } else {
      // try plain number as rupees
      const n = parseFloat(c);
      if (!isNaN(n)) {
        setCouponApplied({ type: "fixed", value: n });
      } else {
        // unknown coupon format: clear
        setCouponApplied(null);
      }
    }
  };

  // calculations
  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, p) => sum + (p.price || 0) * (p.qty || 1), 0);

    // product-specific discounts: if discountIsPercent true => percentage of item price * qty; else rupee value * qty? We'll treat rupee discount as per item (multiply by qty)
    const productDiscount = cartItems.reduce((sum, p) => {
      if (!p.discount) return sum;
      if (p.discountIsPercent) {
        return sum + ((p.price || 0) * (p.discount / 100)) * (p.qty || 1);
      } else {
        return sum + (p.discount || 0) * (p.qty || 1);
      }
    }, 0);

    // apply coupon
    let couponDiscount = 0;
    if (couponApplied) {
      if (couponApplied.type === "percent") {
        couponDiscount = ((subtotal - productDiscount) * couponApplied.value) / 100;
      } else {
        couponDiscount = couponApplied.value;
      }
    }

    const totalDiscount = productDiscount + couponDiscount;
    const shipping = 0; // placeholder: shipping to be calculated on checkout
    const totalPayable = Math.max(0, subtotal - totalDiscount + shipping);

    return {
      subtotal,
      productDiscount,
      couponDiscount,
      totalDiscount,
      shipping,
      totalPayable,
    };
  }, [cartItems, couponApplied]);

  return (
    <div className="min-h-screen bg-white py-10 px-4 md:px-12 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: cart list (2/3 width on wide screens) */}
        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold tracking-wider mb-6">YOUR SHOPPING CART</h3>

          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <div className="p-6 border rounded text-center text-gray-600">Your cart is empty.</div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="border rounded p-4 flex gap-4 items-start">
                  <div className="flex-none">
                    {item.img ? (
                      // if image is provided
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded"
                      />
                    ) : (
                      <PlaceholderImage alt="product" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-sm md:text-base font-semibold leading-tight">{item.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                        <p className="text-xs text-gray-400 mt-1">CODE: {item.code}</p>
                      </div>

                      <div className="text-right">
                        <div className="text-sm md:text-base font-medium">{currency(item.price)}</div>
                        <div className="text-xs text-gray-400 mt-2">₹{(item.price || 0).toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      {/* size dropdown */}
                      <div className="flex items-center gap-3">
                        <label className="text-xs text-gray-500 mr-2">Size</label>
                        <select
                          value={item.selectedSize}
                          onChange={(e) => handleSizeChange(item.id, e.target.value)}
                          className="text-xs border rounded px-2 py-1"
                        >
                          {item.sizeOptions?.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* qty control */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQtyChange(item.id, -1)}
                          className="w-8 h-8 border rounded flex items-center justify-center text-sm"
                          aria-label="decrease quantity"
                        >
                          −
                        </button>
                        <div className="px-3 text-sm">{item.qty}</div>
                        <button
                          onClick={() => handleQtyChange(item.id, +1)}
                          className="w-8 h-8 border rounded flex items-center justify-center text-sm"
                          aria-label="increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* estimated shipping */}
                      <div className="text-xs text-gray-400">{`ESTIMATED SHIPPING DATE : ${item.estShip || "-"}`}</div>

                      {/* icons: wishlist and remove */}
                      <div className="ml-auto flex items-center gap-3">
                        <button
                          onClick={() => handleAddToWishlist(item.id)}
                          title="Move to wishlist"
                          className="p-1 rounded text-gray-500 hover:text-red-600"
                        >
                          {/* heart icon */}
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12.1 21.35l-1.1-1.03C5.14 15.36 2 12.28 2 8.5 2 6 3.99 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18.01 4 20 6 20 8.5c0 3.78-3.14 6.86-8.9 11.82l-1 1.03z"
                              stroke="currentColor"
                              strokeWidth="1"
                              fill="transparent"
                            />
                          </svg>
                        </button>

                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          title="Remove from cart"
                          className="p-1 rounded text-gray-500 hover:text-gray-900"
                        >
                          {/* X icon */}
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* promotional bar */}
          <div className="mt-6 p-4 bg-yellow-50 border rounded text-sm text-yellow-700">
            <strong>SHOP FOR ₹19,229 MORE AND GET FLAT ₹10,000 OFF!</strong> USE COUPON CODE <span className="font-semibold">SHOPMORE175K</span>
          </div>

          {/* footnotes */}
          <div className="mt-6 text-xs text-gray-500 space-y-1">
            <p>• once your order has been placed no subsequent changes can be made in it.</p>
            <p>• shipping cost may vary depending on the delivery destination.</p>
            <p>• please check the final amount on the order summary page before completing the payment.</p>
            <p>• an item's price may vary according to the size selected.</p>
          </div>

          <div className="mt-4 flex gap-4 text-xs">
            <button className="underline text-gray-600">SHIPPING POLICY</button>
            <button className="underline text-gray-600">HELP</button>
            <button className="underline text-gray-600">CONTACT US</button>
          </div>
        </div>

        {/* Right: cart summary */}
        <aside className="border rounded p-6 h-fit">
          <h3 className="text-sm font-semibold mb-4">CART SUMMARY</h3>

          <div className="border rounded p-4 mb-4">
            <div className="flex justify-between text-sm">
              <div>Cart Total</div>
              <div>{currency(totals.subtotal)}</div>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <div>Total Discount</div>
              <div>({currency(totals.totalDiscount)})</div>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <div>Shipping</div>
              <div>{currency(totals.shipping)}</div>
            </div>
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm">This is a gift item</span>
              <button className="ml-auto text-xs underline text-gray-500">(Know More)</button>
            </label>
          </div>

          {/* coupon */}
          <div className="mb-4">
            <label className="text-xs block mb-2">COUPON CODE</label>
            <div className="flex gap-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter Coupon Code"
                className="flex-1 border rounded px-3 py-2 text-sm"
              />
              <button
                onClick={applyCoupon}
                className="px-4 py-2 text-sm font-semibold bg-gray-900 text-white rounded"
              >
                APPLY
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Example coupons: <span className="font-semibold">10%</span>, <span className="font-semibold">FLAT1000</span> or <span className="font-semibold">1000</span>
            </div>
            {couponApplied && (
              <div className="mt-2 text-xs text-green-600">Applied: {couponApplied.type === "percent" ? `${couponApplied.value}% off` : currency(couponApplied.value)}</div>
            )}
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="text-sm font-medium">TOTAL PAYABLE</div>
            <div className="text-xl font-bold">{currency(totals.totalPayable)}</div>
          </div>

          <div className="mt-6 space-y-3">
            <button className="w-full bg-red-800 text-white py-3 rounded text-sm font-semibold">PROCEED TO CHECKOUT</button>
            <button className="w-full border border-red-800 text-red-800 py-3 rounded text-sm font-semibold">CONTINUE SHOPPING</button>
          </div>

          {/* wishlist preview */}
          <div className="mt-6">
            <h4 className="text-xs font-semibold mb-2">WISHLIST ({wishlist.length})</h4>
            <div className="space-y-2">
              {wishlist.length === 0 ? (
                <div className="text-xs text-gray-500">No items in wishlist.</div>
              ) : (
                wishlist.map((w) => (
                  <div key={w.id} className="flex items-center gap-3">
                    {w.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={w.img} alt={w.title} className="w-10 h-10 object-cover rounded" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded" />
                    )}
                    <div className="text-xs">
                      <div className="font-medium">{w.title}</div>
                      <div className="text-gray-400">Qty: {w.qty}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
