// import React, { useState, useEffect } from "react";
// import { Minus, Plus, Heart, Trash2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { cartService } from "../../../services/cartService";
// import { auth } from "../../../config";

// function CartPage() {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Sample static cart data (for guests)
//   const staticGuestCart = [
//     {
//       id: "demo1",
//       name: "Men's Classic White Shirt",
//       price: 1299,
//       image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&w=500&q=80",
//       color: "White",
//       size: "M",
//       quantity: 1,
//     },
//     {
//       id: "demo2",
//       name: "Women's Floral Summer Dress",
//       price: 1899,
//       image: "https://images.unsplash.com/photo-1520975918318-3a5c0e7d3b54?auto=format&w=500&q=80",
//       color: "Pink",
//       size: "S",
//       quantity: 1,
//     },
//     {
//       id: "demo3",
//       name: "Casual Blue Denim Jeans",
//       price: 2299,
//       image: "https://images.unsplash.com/photo-1602810318383-eeb5b06c44a2?auto=format&w=500&q=80",
//       color: "Blue",
//       size: "32",
//       quantity: 1,
//     },
//   ];

//   // ✅ Load cart data (Firestore for logged in, static for guest)
//   useEffect(() => {
//     let unsubscribe;

//     const loadCart = async () => {
//       try {
//         const user = auth.currentUser;

//         // 👤 If no user → use local/session storage guest cart
//         if (!user) {
//           let guestCart = JSON.parse(sessionStorage.getItem("guest_cart"));

//           // 🧩 If no guest_cart, initialize with static 3 items
//           if (!guestCart || guestCart.length === 0) {
//             guestCart = staticGuestCart;
//             sessionStorage.setItem("guest_cart", JSON.stringify(guestCart));
//           }

//           setCartItems(guestCart);
//           setLoading(false);
//           return;
//         }

//         // 🔐 Logged-in user → Firestore subscription
//         unsubscribe = await cartService.subscribeToCart((cartData) => {
//           setCartItems(cartData);
//           setLoading(false);
//         });
//       } catch (error) {
//         console.error("Error loading cart:", error);
//         setLoading(false);
//       }
//     };

//     loadCart();
//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, []);

//   // ✅ Remove item from cart
//   const handleRemove = async (id) => {
//     try {
//       const user = auth.currentUser;

//       if (!user) {
//         const updatedCart = cartItems.filter((i) => i.id !== id);
//         sessionStorage.setItem("guest_cart", JSON.stringify(updatedCart));
//         setCartItems(updatedCart);
//         return;
//       }

//       await cartService.removeFromCart(id);
//     } catch (error) {
//       console.error("Error removing item:", error);
//     }
//   };

//   // ✅ Update quantity
//   const handleQuantityChange = async (id, delta) => {
//     try {
//       const user = auth.currentUser;
//       const item = cartItems.find((i) => i.id === id);
//       if (!item) return;

//       const newQuantity = Math.max(1, (item.quantity || 1) + delta);

//       if (!user) {
//         const updatedCart = cartItems.map((i) =>
//           i.id === id ? { ...i, quantity: newQuantity } : i
//         );
//         sessionStorage.setItem("guest_cart", JSON.stringify(updatedCart));
//         setCartItems(updatedCart);
//         return;
//       }

//       await cartService.updateCartItemQuantity(id, newQuantity);
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//     }
//   };

//   // ✅ Proceed to Checkout
//   const handleProceedToCheckout = () => navigate("/checkout", { state: { cartItems } });

//   // ✅ Totals
//   const subtotal = cartItems.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);
//   const discount = subtotal * 0.12;
//   const shipping = cartItems.length > 0 ? 50 : 0;
//   const total = subtotal - discount + shipping;

//   const fontStyles =
//     "font-[Outfit] font-medium uppercase tracking-[0.27px] leading-[100%] text-[#000]";

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         Loading your cart...
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-white py-10 mt-20 px-6 md:px-20">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
//         <div className="flex items-center gap-3">
//           <h1 className={`${fontStyles} text-[20px] font-medium md:text-[22px]`}>
//             Your Shopping <span>Cart</span>
//           </h1>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//         {/* LEFT SECTION - CART ITEMS */}
//         <div className="lg:col-span-2 space-y-6">
//           {cartItems.length === 0 ? (
//             <p className="text-gray-600 text-center py-10">Your cart is empty.</p>
//           ) : (
//             cartItems.map((item, i) => (
//               <div
//                 key={i}
//                 className="border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row gap-6"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-[120px] h-[150px] object-cover rounded-md"
//                 />
//                 <div className="flex-1 space-y-2">
//                   <h2 className="text-[18px] font-medium text-gray-800">{item.name}</h2>
//                   <p className="text-[14px] text-gray-600">
//                     COLOR: {item.color || "Default"} | SIZE: {item.size || "M"}
//                   </p>

//                   <div className="flex items-center gap-4 mt-3">
//                     <div className="flex items-center border border-gray-300 rounded-md">
//                       <button
//                         onClick={() => handleQuantityChange(item.id, -1)}
//                         className="px-2 py-1 hover:bg-gray-100"
//                       >
//                         <Minus className="w-4 h-4 text-gray-700" />
//                       </button>
//                       <span className="px-3 text-[14px]">{item.quantity}</span>
//                       <button
//                         onClick={() => handleQuantityChange(item.id, 1)}
//                         className="px-2 py-1 hover:bg-gray-100"
//                       >
//                         <Plus className="w-4 h-4 text-gray-700" />
//                       </button>
//                     </div>
//                   </div>

//                   <p className="text-[14px] text-gray-500 mt-2">Ships in 3–5 business days.</p>
//                 </div>

//                 <div className="flex flex-col justify-between items-end">
//                   <p className="text-[18px] font-semibold text-gray-800">
//                     ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
//                   </p>
//                   <div className="flex gap-4">
//                     <button className="hover:text-red-500 text-gray-400">
//                       <Heart className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleRemove(item.id)}
//                       className="hover:text-red-500 text-gray-400"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* RIGHT SECTION - CART SUMMARY */}
//         <div className="p-6 rounded-md shadow-sm h-fit border border-transparent">
//           <h2 className="font-[Outfit] text-[18px] font-medium uppercase tracking-[0.27px] text-[#000] mb-5">
//             Cart Summary
//           </h2>

//           <div className="border border-gray-300 rounded-sm p-4 space-y-3">
//             <div className="flex justify-between text-[15px]">
//               <span className="font-medium">Cart Total</span>
//               <span className="font-medium">₹{subtotal.toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between text-[15px]">
//               <span className="font-medium">Total Discount</span>
//               <span className="text-[#000] font-medium">(–) ₹{discount.toLocaleString()}</span>
//             </div>
//             <div className="border-t border-gray-200 pt-2">
//               <div className="flex justify-between text-[15px]">
//                 <span className="font-medium">Shipping</span>
//                 <span className="font-medium">₹{shipping}</span>
//               </div>
//               <p className="text-[13px] text-gray-600 mt-1">
//                 Shipping Charges To Be Calculated On Checkout
//               </p>
//             </div>
//           </div>

//           <div className="mt-6">
//             <div className="flex justify-between items-center">
//               <span className="font-[Outfit] text-[16px] font-medium uppercase text-[#000]">
//                 Total Payable
//               </span>
//               <span className="font-[Outfit] text-[22px] font-semibold text-[#000]">
//                 ₹{total.toLocaleString()}
//               </span>
//             </div>
//           </div>

//           <hr className="border-gray-300 mt-4 mb-5" />

//           <div className="space-y-3">
//             <button
//               onClick={handleProceedToCheckout}
//               className="w-full bg-[#9C0000] text-white py-3 text-[15px] font-[Outfit] font-medium uppercase tracking-[0.27px] rounded-sm hover:bg-[#7A0000] transition"
//             >
//               Proceed To Checkout
//             </button>

//             <button
//               onClick={() => navigate("/")}
//               className="w-full border border-[#9C0000] text-[#9C0000] py-3 text-[15px] font-[Outfit] font-medium uppercase tracking-[0.27px] rounded-sm hover:bg-gray-50 transition"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CartPage;

// import React, { useState, useEffect } from "react";
// import { Minus, Plus, Heart, Trash2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { cartService } from "../../../services/cartService";
// import { auth } from "../../../config";

// function CartPage() {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Load cart data dynamically (Firestore for logged in, sessionStorage for guest)
//   useEffect(() => {
//     let unsubscribe;

//     const loadCart = async () => {
//       try {
//         const user = auth.currentUser;

//         // 👤 If no user → use guest cart from sessionStorage
//         if (!user) {
//           const guestCart = JSON.parse(sessionStorage.getItem("guest_cart")) || [];
//           setCartItems(guestCart);
//           setLoading(false);
//           return;
//         }

//         // 🔐 Logged-in user → subscribe to Firestore cart
//         unsubscribe = await cartService.subscribeToCart((cartData) => {
//           setCartItems(cartData);
//           setLoading(false);
//         });
//       } catch (error) {
//         console.error("Error loading cart:", error);
//         setLoading(false);
//       }
//     };

//     loadCart();
//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, []);

//   // ✅ Remove item
//   const handleRemove = async (id) => {
//     try {
//       const user = auth.currentUser;

//       if (!user) {
//         const updatedCart = cartItems.filter((i) => i.id !== id);
//         sessionStorage.setItem("guest_cart", JSON.stringify(updatedCart));
//         setCartItems(updatedCart);
//         return;
//       }

//       await cartService.removeFromCart(id);
//     } catch (error) {
//       console.error("Error removing item:", error);
//     }
//   };

//   // ✅ Update quantity
//   const handleQuantityChange = async (id, delta) => {
//     try {
//       const user = auth.currentUser;
//       const item = cartItems.find((i) => i.id === id);
//       if (!item) return;

//       const newQuantity = Math.max(1, (item.quantity || 1) + delta);

//       if (!user) {
//         const updatedCart = cartItems.map((i) =>
//           i.id === id ? { ...i, quantity: newQuantity } : i
//         );
//         sessionStorage.setItem("guest_cart", JSON.stringify(updatedCart));
//         setCartItems(updatedCart);
//         return;
//       }

//       await cartService.updateCartItemQuantity(id, newQuantity);
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//     }
//   };

//   // ✅ Proceed to Checkout
//   const handleProceedToCheckout = () => {
//     if (cartItems.length === 0) {
//       alert("Your cart is empty!");
//       return;
//     }
//     navigate("/checkout", { state: { cartItems } });
//   };

//   // ✅ Totals
//   const subtotal = cartItems.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);
//   const discount = subtotal * 0.12;
//   const shipping = cartItems.length > 0 ? 50 : 0;
//   const total = subtotal - discount + shipping;

//   const fontStyles =
//     "font-[Outfit] font-medium uppercase tracking-[0.27px] leading-[100%] text-[#000]";

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         Loading your cart...
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-white py-10 mt-20 px-6 md:px-20">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
//         <div className="flex items-center gap-3">
//           <h1 className={`${fontStyles} text-[20px] font-medium md:text-[22px]`}>
//             Your Shopping <span>Cart</span>
//           </h1>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//         {/* LEFT SECTION - CART ITEMS */}
//         <div className="lg:col-span-2 space-y-6">
//           {cartItems.length === 0 ? (
//             <p className="text-gray-600 text-center py-10">Your cart is empty.</p>
//           ) : (
//             cartItems.map((item, i) => (
//               <div
//                 key={i}
//                 className="border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row gap-6"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-[120px] h-[150px] object-cover rounded-md"
//                 />
//                 <div className="flex-1 space-y-2">
//                   <h2 className="text-[18px] font-medium text-gray-800">{item.name}</h2>
//                   <p className="text-[14px] text-gray-600">
//                     COLOR: {item.color || "Default"} | SIZE: {item.size || "M"}
//                   </p>

//                   <div className="flex items-center gap-4 mt-3">
//                     <div className="flex items-center border border-gray-300 rounded-md">
//                       <button
//                         onClick={() => handleQuantityChange(item.id, -1)}
//                         className="px-2 py-1 hover:bg-gray-100"
//                       >
//                         <Minus className="w-4 h-4 text-gray-700" />
//                       </button>
//                       <span className="px-3 text-[14px]">{item.quantity}</span>
//                       <button
//                         onClick={() => handleQuantityChange(item.id, 1)}
//                         className="px-2 py-1 hover:bg-gray-100"
//                       >
//                         <Plus className="w-4 h-4 text-gray-700" />
//                       </button>
//                     </div>
//                   </div>

//                   <p className="text-[14px] text-gray-500 mt-2">Ships in 3–5 business days.</p>
//                 </div>

//                 <div className="flex flex-col justify-between items-end">
//                   <p className="text-[18px] font-semibold text-gray-800">
//                     ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
//                   </p>
//                   <div className="flex gap-4">
//                     <button className="hover:text-red-500 text-gray-400">
//                       <Heart className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleRemove(item.id)}
//                       className="hover:text-red-500 text-gray-400"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* RIGHT SECTION - CART SUMMARY */}
//         <div className="p-6 rounded-md shadow-sm h-fit border border-transparent">
//           <h2 className="font-[Outfit] text-[18px] font-medium uppercase tracking-[0.27px] text-[#000] mb-5">
//             Cart Summary
//           </h2>

//           <div className="border border-gray-300 rounded-sm p-4 space-y-3">
//             <div className="flex justify-between text-[15px]">
//               <span className="font-medium">Cart Total</span>
//               <span className="font-medium">₹{subtotal.toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between text-[15px]">
//               <span className="font-medium">Total Discount</span>
//               <span className="text-[#000] font-medium">(–) ₹{discount.toLocaleString()}</span>
//             </div>
//             <div className="border-t border-gray-200 pt-2">
//               <div className="flex justify-between text-[15px]">
//                 <span className="font-medium">Shipping</span>
//                 <span className="font-medium">₹{shipping}</span>
//               </div>
//               <p className="text-[13px] text-gray-600 mt-1">
//                 Shipping Charges To Be Calculated On Checkout
//               </p>
//             </div>
//           </div>

//           <div className="mt-6">
//             <div className="flex justify-between items-center">
//               <span className="font-[Outfit] text-[16px] font-medium uppercase text-[#000]">
//                 Total Payable
//               </span>
//               <span className="font-[Outfit] text-[22px] font-semibold text-[#000]">
//                 ₹{total.toLocaleString()}
//               </span>
//             </div>
//           </div>

//           <hr className="border-gray-300 mt-4 mb-5" />

//           <div className="space-y-3">
//             <button
//               onClick={handleProceedToCheckout}
//               className="w-full bg-[#9C0000] text-white py-3 text-[15px] font-[Outfit] font-medium uppercase tracking-[0.27px] rounded-sm hover:bg-[#7A0000] transition"
//             >
//               Proceed To Checkout
//             </button>

//             <button
//               onClick={() => navigate("/")}
//               className="w-full border border-[#9C0000] text-[#9C0000] py-3 text-[15px] font-[Outfit] font-medium uppercase tracking-[0.27px] rounded-sm hover:bg-gray-50 transition"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CartPage;
import React, { useState, useEffect } from "react";
import { Minus, Plus, Heart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cartService } from "../../../services/cartService";
import { auth } from "../../../config";
import emptyCart from "../../../assets/b2c/images/empty_cart/Vector.svg";

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useFirestore, setUseFirestore] = useState(false);

  // ✅ Load cart data dynamically (Firestore for logged in, sessionStorage for guest)
  useEffect(() => {
    let unsubscribe;

    const loadCart = async () => {
      try {
        const user = auth.currentUser;

        // 👤 If no user → use guest cart from sessionStorage
        if (!user) {
          const guestCart = JSON.parse(sessionStorage.getItem("guest_cart")) || [];
          setCartItems(guestCart);
          setLoading(false);
          setUseFirestore(false);
          return;
        }

        // 🔐 Logged-in user → Try Firestore, fallback to sessionStorage
        try {
          unsubscribe = await cartService.subscribeToCart((cartData) => {
            setCartItems(cartData);
            setLoading(false);
            setUseFirestore(true);
          });
        } catch (error) {
          // Fallback to sessionStorage for logged-in users not in Firestore (expected behavior)
          const guestCart = JSON.parse(sessionStorage.getItem("guest_cart")) || [];
          setCartItems(guestCart);
          setLoading(false);
          setUseFirestore(false);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
        // Final fallback to sessionStorage
        const guestCart = JSON.parse(sessionStorage.getItem("guest_cart")) || [];
        setCartItems(guestCart);
        setLoading(false);
        setUseFirestore(false);
      }
    };

    loadCart();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // ✅ Remove item
  const handleRemove = async (id) => {
    try {
      // If using Firestore and user is logged in
      if (useFirestore && auth.currentUser) {
        try {
          await cartService.removeFromCart(id);
          return;
        } catch (error) {
          console.warn("Firestore remove failed, using sessionStorage:", error);
        }
      }

      // Use sessionStorage (guest or fallback)
      const updatedCart = cartItems.filter((i) => i.id !== id);
      sessionStorage.setItem("guest_cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // ✅ Update quantity
  const handleQuantityChange = async (id, delta) => {
    try {
      const item = cartItems.find((i) => i.id === id);
      if (!item) return;

      const newQuantity = Math.max(1, (item.quantity || 1) + delta);

      // If using Firestore and user is logged in
      if (useFirestore && auth.currentUser) {
        try {
          await cartService.updateCartItemQuantity(id, newQuantity);
          return;
        } catch (error) {
          console.warn("Firestore update failed, using sessionStorage:", error);
        }
      }

      // Use sessionStorage (guest or fallback)
      const updatedCart = cartItems.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i));
      sessionStorage.setItem("guest_cart", JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // ✅ Proceed to Checkout
  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout", { state: { cartItems } });
  };

  // ✅ Totals
  const subtotal = cartItems.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);
  const discount = subtotal * 0.12;
  const shipping = cartItems.length > 0 ? 50 : 0;
  const total = subtotal - discount + shipping;

  const fontStyles =
    "font-[Outfit] font-medium uppercase tracking-[0.27px] leading-[100%] text-[#000]";

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading your cart...
      </div>
    );

  return (
    <div className="min-h-screen bg-white py-10 mt-20 px-6 md:px-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div className="flex items-center gap-3">
          <h1 className={`${fontStyles} text-[20px] font-medium md:text-[22px]`}>
            Your Shopping <span>Cart</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SECTION - CART ITEMS */}
        {/* <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-center py-10">Your cart is empty.</p>
          ) : (
            cartItems.map((item, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[120px] h-[150px] object-cover rounded-md"
                />
                <div className="flex-1 space-y-2">
                  <h2 className="text-[18px] font-medium text-gray-800">{item.name}</h2>
                  <p className="text-[14px] text-gray-600">
                    COLOR: {item.color || "Default"} | SIZE: {item.size || "M"}
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-2 py-1 hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4 text-gray-700" />
                      </button>
                      <span className="px-3 text-[14px]">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-2 py-1 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>

                  <p className="text-[14px] text-gray-500 mt-2">Ships in 3–5 business days.</p>
                </div>

                <div className="flex flex-col justify-between items-end">
                  <p className="text-[18px] font-semibold text-gray-800">
                    ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                  </p>
                  <div className="flex gap-4">
                    <button className="hover:text-red-500 text-gray-400">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="hover:text-red-500 text-gray-400"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div> */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
              <div className="bg-gray-100 rounded-full p-6">
                <img
                  src={emptyCart} // Replace with your preferred icon
                  alt="Empty Cart"
                  className="w-[90%] h-[90%]"
                />
              </div>
              <h2 className="text-[32px] font-medium text-gray-800">Your shopping bag is empty</h2>
              <p className="text-[14px] text-gray-600">Start adding your favorites</p>
              <button
                onClick={() => navigate("/")}
                className="bg-[#D8D8D8] text-black border-black-100 px-6 py-3 text-[16px] font-[Outfit] font-medium uppercase tracking-[0.27px] rounded-sm "
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row gap-6"
              >
                {/* existing cart item layout */}
              </div>
            ))
          )}
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
              <span className="text-[#000] font-medium">(–) ₹{discount.toLocaleString()}</span>
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

          <div className="mt-6">
            <div className="flex justify-between items-center">
              <span className="font-[Outfit] text-[16px] font-medium uppercase text-[#000]">
                Total Payable
              </span>
              <span className="font-[Outfit] text-[22px] font-semibold text-[#000]">
                ₹{total.toLocaleString()}
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
    </div>
  );
}

export default CartPage;
