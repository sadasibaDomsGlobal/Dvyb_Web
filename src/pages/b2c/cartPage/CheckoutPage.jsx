// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Country, State, City } from "country-state-city";

// export default function CheckoutPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const MAROON = "#800000";

//   // Cart items from navigation state
//   const [cartItems, setCartItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Accordion state & unlocking
//   const [openStep, setOpenStep] = useState(1);
//   const [step2Unlocked, setStep2Unlocked] = useState(false);
//   const [step3Unlocked, setStep3Unlocked] = useState(false);

//   // Step 1 - user
//   const [email, setEmail] = useState("");

//   // Step 2 - shipping
//   const [shippingForm, setShippingForm] = useState({
//     firstName: "",
//     lastName: "",
//     streetAddress: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     country: "",
//     phone: "",
//   });
//   const [saveInfo, setSaveInfo] = useState(false);

//   // Step 3 - payment
//   const [paymentMethod, setPaymentMethod] = useState("cod");
//   const [isProcessingPayment, setIsProcessingPayment] = useState(false);

//   // Coupon code
//   const [couponCode, setCouponCode] = useState("");
//   const [couponApplied, setCouponApplied] = useState(null);

//   // Get cart items from location state
//   useEffect(() => {
//     if (location.state?.cartItems) {
//       setCartItems(location.state.cartItems);
//     }
//     setIsLoading(false);
//   }, [location.state]);

//   // Accordion open handler (enforce sequential)
//   const openRequestedStep = (n) => {
//     if (n === 1) {
//       setOpenStep(1);
//       return;
//     }
//     if (n === 2 && step2Unlocked) {
//       setOpenStep(2);
//       return;
//     }
//     if (n === 3 && step3Unlocked) {
//       setOpenStep(3);
//       return;
//     }
//     if (n === 2) alert("Please complete Step 1 (User Details) first.");
//     if (n === 3) alert("Please complete Step 2 (Shipping) first.");
//   };

//   // Step 1: validate email and unlock step 2
//   const handleCheckoutAsGuest = () => {
//     // ✅ Improved email regex
//     const emailRegex = /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//     if (!email || !emailRegex.test(email)) {
//       alert("Please enter a valid email address (example: john.doe@gmail.com).");
//       return;
//     }

//     setStep2Unlocked(true);
//     setOpenStep(2);
//   };

//   // Shipping handlers
//   const handleShippingChange = (e) => {
//     const { name, value } = e.target;
//     setShippingForm((p) => ({ ...p, [name]: value }));
//   };

//   const isShippingValid = () => {
//     const { firstName, lastName, streetAddress, city, state, postalCode, country, phone } =
//       shippingForm;
//     return (
//       firstName?.trim() &&
//       lastName?.trim() &&
//       streetAddress?.trim() &&
//       city?.trim() &&
//       state?.trim() &&
//       postalCode?.trim() &&
//       country?.trim() &&
//       phone?.trim()
//     );
//   };

//   // Save shipping info and unlock step 3
//   const handleProceedToPayment = async () => {
//     if (!isShippingValid()) {
//       alert("Please fill all required shipping fields.");
//       return;
//     }
//     setStep3Unlocked(true);
//     setOpenStep(3);
//   };

//   // Totals
//   const subtotal = cartItems.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 1), 0);
//   const discount = couponApplied?.amount ? couponApplied.amount : subtotal * 0.12;
//   const shippingFee = cartItems.length > 0 ? 50 : 0;
//   const totalPayable = Math.max(0, subtotal - discount + shippingFee);

//   // Coupon apply
//   const handleApplyCoupon = () => {
//     if (!couponCode) return alert("Enter coupon code.");
//     if (couponCode.trim().toUpperCase() === "FLAT50") {
//       setCouponApplied({ code: "FLAT50", amount: 50 });
//       alert("Coupon applied: ₹50 off");
//     } else {
//       setCouponApplied(null);
//       alert("Invalid coupon. Default discount applied.");
//     }
//   };

//   // COD order
//   const placeCODOrder = async () => {
//     try {
//       alert(`Order placed successfully! Total: ₹${totalPayable.toLocaleString()}`);
//       navigate("/");
//     } catch (err) {
//       console.error("placeCODOrder error:", err);
//       alert("Failed to place COD order: " + (err.message || ""));
//     }
//   };

//   const handlePayNow = async () => {
//     if (!step3Unlocked) {
//       alert("Please complete previous steps first.");
//       return;
//     }
//     if (paymentMethod === "cod") {
//       await placeCODOrder();
//       return;
//     }
//     alert("Online payment integration pending. Use COD for now.");
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center font-[Outfit]">
//         Loading checkout...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white mt-20 font-[Outfit]">
//       <div className="max-w-7xl mx-auto px-2 md:px-10 py-10">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-2">
//           {/* LEFT SIDE – Steps */}
//           <div className="lg:col-span-2 space-y-5">
//             {/* 1. USER DETAILS */}
//             <div className="border border-gray-200 rounded-sm">
//               <div
//                 className="bg-gray-100 px-4 py-3 flex justify-between items-center border-l-4 cursor-pointer"
//                 style={{ borderColor: openStep === 1 ? MAROON : "transparent" }}
//                 onClick={() => openRequestedStep(1)}
//               >
//                 <h2 className="font-semibold text-[15px] uppercase">1. User Details</h2>
//                 {email && openStep !== 1 && <div className="text-sm text-gray-600">{email}</div>}
//               </div>
//               {openStep === 1 && (
//                 <div className="p-6 space-y-6">
//                   <div className="flex justify-between items-center">
//                     <p className="text-[14px] text-gray-700 font-normal">
//                       Tell us your Email ID for sending you your order details.
//                     </p>
//                     <div className="text-[13px] text-gray-600 font-normal">
//                       <p>Don't have an account?</p>
//                       <p>Create an account for faster transactions.</p>
//                       <span
//                         onClick={() => alert("Open signup flow")}
//                         className="text-[#800000] font-medium cursor-pointer hover:underline"
//                       >
//                         Sign up!
//                       </span>
//                     </div>
//                   </div>

//                   <div className="flex flex-col gap-4">
//                     <input
//                       type="email"
//                       placeholder="Enter your email address"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="border border-gray-300 rounded-sm px-4 py-2 text-[14px]
//                      focus:outline-none focus:ring-1 focus:ring-[#800000] w-[349px]"
//                     />

//                     <button
//                       onClick={handleCheckoutAsGuest}
//                       className="bg-[#800000] text-white px-6 py-2 text-[14px] uppercase
//                      rounded-sm hover:bg-[#660000] transition w-[349px]"
//                     >
//                       Checkout as Guest
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* 2. SHIPPING & BILLING INFO */}
//             <div className="border border-gray-200 rounded-sm">
//               <div
//                 className="border-l-4 bg-gray-100 px-4 py-3 flex justify-between items-center cursor-pointer"
//                 onClick={() => openRequestedStep(2)}
//                 style={{ borderColor: openStep === 2 ? MAROON : "transparent" }}
//               >
//                 <h2 className="font-semibold text-[15px] uppercase">2. Shipping & Billing Info</h2>
//                 {isShippingValid() && openStep !== 2 && (
//                   <div className="text-sm text-gray-600">
//                     {shippingForm.firstName} {shippingForm.lastName}, {shippingForm.city}
//                   </div>
//                 )}
//               </div>
//               {openStep === 2 && (
//                 <div className="p-6 space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input
//                       name="firstName"
//                       value={shippingForm.firstName}
//                       onChange={handleShippingChange}
//                       placeholder="First Name"
//                       className="border border-gray-300 px-3 py-2 rounded-sm"
//                     />
//                     <input
//                       name="lastName"
//                       value={shippingForm.lastName}
//                       onChange={handleShippingChange}
//                       placeholder="Last Name"
//                       className="border border-gray-300 px-3 py-2 rounded-sm"
//                     />
//                   </div>

//                   <input
//                     name="streetAddress"
//                     value={shippingForm.streetAddress}
//                     onChange={handleShippingChange}
//                     placeholder="Street Address"
//                     className="border border-gray-300 px-3 py-2 rounded-sm w-full"
//                   />

//                   {/* COUNTRY → STATE → CITY DROPDOWNS */}
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {/* COUNTRY */}
//                     <select
//                       name="country"
//                       value={
//                         Country.getAllCountries().find((c) => c.name === shippingForm.country)
//                           ?.isoCode || ""
//                       }
//                       onChange={(e) => {
//                         const selectedCountry = Country.getCountryByCode(e.target.value);
//                         setShippingForm((p) => ({
//                           ...p,
//                           country: selectedCountry?.name || "",
//                           state: "",
//                           city: "",
//                         }));
//                       }}
//                       className="border border-gray-300 px-3 py-2 rounded-sm"
//                     >
//                       <option value="">Select Country</option>
//                       {Country.getAllCountries().map((c) => (
//                         <option key={c.isoCode} value={c.isoCode}>
//                           {c.name}
//                         </option>
//                       ))}
//                     </select>

//                     {/* STATE */}
//                     <select
//                       name="state"
//                       value={
//                         State.getStatesOfCountry(
//                           Country.getAllCountries().find((c) => c.name === shippingForm.country)
//                             ?.isoCode
//                         ).find((s) => s.name === shippingForm.state)?.isoCode || ""
//                       }
//                       onChange={(e) => {
//                         const selectedState = State.getStateByCodeAndCountry(
//                           e.target.value,
//                           Country.getAllCountries().find((c) => c.name === shippingForm.country)
//                             ?.isoCode
//                         );
//                         setShippingForm((p) => ({
//                           ...p,
//                           state: selectedState?.name || "",
//                           city: "",
//                         }));
//                       }}
//                       disabled={!shippingForm.country}
//                       className="border border-gray-300 px-3 py-2 rounded-sm"
//                     >
//                       <option value="">Select State</option>
//                       {shippingForm.country &&
//                         State.getStatesOfCountry(
//                           Country.getAllCountries().find((c) => c.name === shippingForm.country)
//                             ?.isoCode
//                         ).map((s) => (
//                           <option key={s.isoCode} value={s.isoCode}>
//                             {s.name}
//                           </option>
//                         ))}
//                     </select>

//                     {/* CITY */}
//                     <select
//                       name="city"
//                       value={shippingForm.city}
//                       onChange={(e) => setShippingForm((p) => ({ ...p, city: e.target.value }))}
//                       disabled={!shippingForm.state}
//                       className="border border-gray-300 px-3 py-2 rounded-sm"
//                     >
//                       <option value="">Select City</option>
//                       {shippingForm.state &&
//                         City.getCitiesOfState(
//                           Country.getAllCountries().find((c) => c.name === shippingForm.country)
//                             ?.isoCode,
//                           State.getStatesOfCountry(
//                             Country.getAllCountries().find((c) => c.name === shippingForm.country)
//                               ?.isoCode
//                           ).find((s) => s.name === shippingForm.state)?.isoCode
//                         ).map((city) => (
//                           <option key={city.name} value={city.name}>
//                             {city.name}
//                           </option>
//                         ))}
//                     </select>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input
//                       name="postalCode"
//                       value={shippingForm.postalCode}
//                       onChange={handleShippingChange}
//                       placeholder="Postal Code"
//                       className="border border-gray-300 px-3 py-2 rounded-sm"
//                     />
//                     <input
//                       name="phone"
//                       value={shippingForm.phone}
//                       onChange={handleShippingChange}
//                       placeholder="Phone"
//                       className="border border-gray-300 px-3 py-2 rounded-sm"
//                     />
//                   </div>

//                   <label className="flex items-center gap-2 text-[13px]">
//                     <input
//                       type="checkbox"
//                       checked={saveInfo}
//                       onChange={(e) => setSaveInfo(e.target.checked)}
//                       className="w-4 h-4 accent-[#800000]"
//                     />
//                     Save this address for future
//                   </label>

//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={handleProceedToPayment}
//                       className="bg-[#800000] text-white px-6 py-3 uppercase rounded-sm hover:bg-[#660000]"
//                     >
//                       Proceed to Payment
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* 3. PAYMENT METHOD */}
//             <div className="border border-gray-200 rounded-sm">
//               <div
//                 className="border-l-4 bg-gray-100 px-4 py-3 flex justify-between items-center cursor-pointer"
//                 style={{ borderColor: openStep === 3 ? MAROON : "transparent" }}
//                 onClick={() => openRequestedStep(3)}
//               >
//                 <h2 className="font-semibold text-[15px] uppercase">3. Payment Method</h2>
//                 {paymentMethod && openStep !== 3 && (
//                   <div className="text-sm text-gray-600 capitalize">
//                     {paymentMethod === "cod"
//                       ? "Cash on Delivery"
//                       : paymentMethod === "card"
//                         ? "Credit/Debit Card"
//                         : paymentMethod === "netbank"
//                           ? "Net Banking"
//                           : "UPI"}
//                   </div>
//                 )}
//               </div>
//               {openStep === 3 && (
//                 <div className="p-6 space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <button
//                       onClick={() => setPaymentMethod("cod")}
//                       className={`border border-gray-300 py-4 rounded-sm uppercase ${
//                         paymentMethod === "cod" ? "bg-[#800000] text-white" : ""
//                       }`}
//                     >
//                       Cash on Delivery
//                     </button>
//                     <button
//                       onClick={() => setPaymentMethod("card")}
//                       className={`border border-gray-300 py-4 rounded-sm uppercase ${
//                         paymentMethod === "card" ? "bg-[#800000] text-white" : ""
//                       }`}
//                     >
//                       Credit / Debit Card
//                     </button>
//                     <button
//                       onClick={() => setPaymentMethod("netbank")}
//                       className={`border border-gray-300 py-4 rounded-sm uppercase ${
//                         paymentMethod === "netbank" ? "bg-[#800000] text-white" : ""
//                       }`}
//                     >
//                       Net Banking
//                     </button>
//                     <button
//                       onClick={() => setPaymentMethod("upi")}
//                       className={`border border-gray-300 py-4 rounded-sm uppercase ${
//                         paymentMethod === "upi" ? "bg-[#800000] text-white" : ""
//                       }`}
//                     >
//                       UPI
//                     </button>
//                   </div>

//                   <div className="flex items-center gap-3 mt-4">
//                     <label className="flex items-center gap-2 text-sm">
//                       <input type="checkbox" className="w-4 h-4 accent-[#800000]" />I agree to DVYB
//                       Terms & Conditions
//                     </label>

//                     <div className="flex-1 text-right">
//                       <button
//                         onClick={handlePayNow}
//                         disabled={isProcessingPayment}
//                         className="bg-[#800000] text-white px-6 py-3 rounded-sm hover:bg-[#660000] disabled:bg-gray-400"
//                       >
//                         {isProcessingPayment ? "Processing Payment..." : "Pay Now"}
//                       </button>
//                     </div>
//                   </div>

//                   <div className="mt-4 text-sm text-gray-600">
//                     <span role="img" aria-label="lock">
//                       🔒
//                     </span>{" "}
//                     Secure Checkout
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* RIGHT SIDE – Cart Summary */}
//           <div className="space-y-8">
//             <div className="border border-gray-200 rounded-sm p-6">
//               <h2 className="text-[16px] font-semibold uppercase mb-4">Cart Summary</h2>

//               <div className="space-y-2 text-[14px]">
//                 <div className="flex justify-between">
//                   <span>Cart Total</span>
//                   <span>₹{subtotal.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Total Discount</span>
//                   <span>(–) ₹{discount.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between border-t border-gray-200 pt-2">
//                   <span>Shipping</span>
//                   <span>₹{shippingFee}</span>
//                 </div>
//                 <p className="text-[12px] text-gray-500 mt-1">
//                   Shipping Charges To Be Calculated On Checkout
//                 </p>
//               </div>

//               <div className="mt-5 flex items-center gap-2 text-[13px]">
//                 <input type="checkbox" id="gift" className="accent-[#800000] w-4 h-4" />
//                 <label htmlFor="gift" className="text-gray-700">
//                   This is a gift item
//                 </label>
//                 <span className="text-[#800000] cursor-pointer">(Know More)</span>
//               </div>

//               <div className="mt-5">
//                 <label htmlFor="coupon" className="block text-[13px] font-medium uppercase mb-2">
//                   Coupon Code
//                 </label>
//                 <div className="flex border border-gray-300 rounded-sm overflow-hidden">
//                   <input
//                     type="text"
//                     id="coupon"
//                     placeholder="Enter Coupon Code"
//                     value={couponCode}
//                     onChange={(e) => setCouponCode(e.target.value)}
//                     className="flex-1 px-3 py-2 text-[13px] focus:outline-none"
//                   />
//                   <button
//                     onClick={handleApplyCoupon}
//                     className="bg-[#800000] text-white px-6 text-[13px] uppercase hover:bg-[#660000]"
//                   >
//                     Apply
//                   </button>
//                 </div>
//               </div>

//               <div className="mt-6 border-t border-gray-200 pt-4">
//                 <div className="flex justify-between items-center text-[15px] font-medium">
//                   <span>Total Payable</span>
//                   <span className="text-[18px] font-semibold">
//                     ₹{totalPayable.toLocaleString()}
//                   </span>
//                 </div>
//               </div>

//               <div className="mt-6 space-y-3">
//                 <button
//                   onClick={() => setOpenStep(3)}
//                   className="w-full bg-[#800000] text-white py-3 text-[14px] uppercase rounded-sm hover:bg-[#660000] transition"
//                 >
//                   Proceed to Checkout
//                 </button>
//                 <button
//                   onClick={() => navigate("/")}
//                   className="w-full border border-[#800000] text-[#800000] py-3 text-[14px] uppercase rounded-sm hover:bg-gray-50 transition"
//                 >
//                   Continue Shopping
//                 </button>
//               </div>
//             </div>

//             {/* Product Summary */}
//             <div className="border border-gray-200 rounded-sm p-6">
//               <h2 className="text-[16px] font-semibold uppercase mb-4">Product Summary</h2>
//               <div className="space-y-5">
//                 {cartItems.length === 0 ? (
//                   <p className="text-gray-600 text-[14px] text-center py-4">Your cart is empty.</p>
//                 ) : (
//                   cartItems.map((item, i) => (
//                     <div key={i} className="flex gap-4 items-center">
//                       <img
//                         src={item.image || "https://via.placeholder.com/100"}
//                         alt={item.name}
//                         className="w-20 h-24 object-cover rounded-sm"
//                       />
//                       <div className="flex-1">
//                         <p className="font-medium text-[14px] uppercase">{item.name}</p>
//                         <p className="text-[13px] text-gray-500 capitalize">
//                           {item.color || "—"} | Size: {item.size || "—"}
//                         </p>
//                         <p className="text-[13px] text-gray-500">Qty: {item.quantity || 1}</p>
//                         <p className="text-[13px] text-gray-500 italic">Est. Shipping: 4–7 Days</p>
//                       </div>
//                       <p className="font-semibold text-[14px] text-[#000]">
//                         ₹{(item.price || 0).toLocaleString()}
//                       </p>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import { auth } from "../../../config";
import { cartService } from "../../../services/cartService";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const MAROON = "#800000";

  // 🛒 Cart state
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Accordion step states
  const [openStep, setOpenStep] = useState(1);
  const [step2Unlocked, setStep2Unlocked] = useState(false);
  const [step3Unlocked, setStep3Unlocked] = useState(false);

  // Step 1 - user
  const [email, setEmail] = useState("");

  // Step 2 - shipping
  const [shippingForm, setShippingForm] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const [saveInfo, setSaveInfo] = useState(false);

  // Step 3 - payment
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Coupon code
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(null);

  // ✅ Load cart dynamically — Firestore (logged-in) or sessionStorage (guest)
  useEffect(() => {
    let unsubscribe;

    const loadCart = async () => {
      try {
        const user = auth.currentUser;

        // 🔹 If cart items are passed from navigation, use that
        if (location.state?.cartItems?.length) {
          setCartItems(location.state.cartItems);
          setIsLoading(false);
          return;
        }

        // 🔹 Logged-in user → Firestore
        if (user) {
          unsubscribe = await cartService.subscribeToCart((cartData) => {
            setCartItems(cartData);
            setIsLoading(false);
          });
          return;
        }

        // 🔹 Guest user → sessionStorage
        const guestCart = JSON.parse(sessionStorage.getItem("guest_cart")) || [];
        setCartItems(guestCart);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading cart:", error);
        setIsLoading(false);
      }
    };

    loadCart();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [location.state]);

  /** ===================
   *   Accordion Handling
   *  =================== */
  const openRequestedStep = (n) => {
    if (n === 1) return setOpenStep(1);
    if (n === 2 && step2Unlocked) return setOpenStep(2);
    if (n === 3 && step3Unlocked) return setOpenStep(3);
    if (n === 2) alert("Please complete Step 1 (User Details) first.");
    if (n === 3) alert("Please complete Step 2 (Shipping) first.");
  };

  /** ✅ Step 1 — Email validation */
  const handleCheckoutAsGuest = () => {
    const emailRegex = /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      alert("Please enter a valid email address (example: john.doe@gmail.com).");
      return;
    }

    setStep2Unlocked(true);
    setOpenStep(2);
  };

  /** ✅ Step 2 — Shipping */
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingForm((p) => ({ ...p, [name]: value }));
  };

  const isShippingValid = () => {
    const { firstName, lastName, streetAddress, city, state, postalCode, country, phone } =
      shippingForm;
    return (
      firstName && lastName && streetAddress && city && state && postalCode && country && phone
    );
  };

  const handleProceedToPayment = () => {
    if (!isShippingValid()) {
      alert("Please fill all required shipping fields.");
      return;
    }
    setStep3Unlocked(true);
    setOpenStep(3);
  };

  /** ✅ Step 3 — Payment */
  const handlePayNow = async () => {
    if (!step3Unlocked) {
      alert("Please complete previous steps first.");
      return;
    }

    setIsProcessingPayment(true);

    try {
      if (paymentMethod === "cod") {
        // sessionStorage.removeItem("guest_cart");
        navigate("/order-success");
      } else {
        alert("Online payment integration pending. Please use COD for now.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong while processing your payment.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  /** ✅ Coupon */
  const handleApplyCoupon = () => {
    if (!couponCode) return alert("Enter a coupon code.");
    if (couponCode.trim().toUpperCase() === "FLAT50") {
      setCouponApplied({ code: "FLAT50", amount: 50 });
      alert("Coupon applied: ₹50 off");
    } else {
      setCouponApplied(null);
      alert("Invalid coupon. Default discount applied.");
    }
  };

  /** ✅ Totals */
  const subtotal = cartItems.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0);
  const discount = couponApplied?.amount ? couponApplied.amount : subtotal * 0.12;
  const shippingFee = cartItems.length > 0 ? 50 : 0;
  const totalPayable = Math.max(0, subtotal - discount + shippingFee);

  /** ✅ Loading */
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading checkout...
      </div>
    );

  return (
    <div className="min-h-screen  bg-white mt-30 font-[Outfit]">
      <div className="max-w-7xl mx-auto px-2 md:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-2">
          {/* LEFT SIDE - Steps */}
          <div className="lg:col-span-2 space-y-5">
            {/* STEP 1: USER DETAILS */}
            <div className="border border-gray-200 rounded-sm">
              <div
                className="bg-gray-100 px-5 py-3 flex justify-between items-center border-l-4 cursor-pointer"
                style={{ borderColor: openStep === 1 ? MAROON : "transparent" }}
                onClick={() => openRequestedStep(1)}
              >
                <h2 className="font-semibold text-[15px] uppercase">1. User Details</h2>
                {email && openStep !== 1 && <div className="text-sm text-gray-600">{email}</div>}
              </div>
              {openStep === 1 && (
                <div className="p-3 space-y-5">
                  <p className="text-[14px] text-gray-700">
                    Enter your email for order details and updates.
                  </p>
                  <div className="gap-20 space-x-4">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-gray-300 rounded-sm px-4 py-2 text-[14px]
                     focus:outline-none focus:ring-1 focus:ring-[#800000] w-[349px]"
                    />
                    <button
                      onClick={handleCheckoutAsGuest}
                      className="bg-[#800000] text-white px-6 py-2 text-[14px] uppercase
                     rounded-sm hover:bg-[#660000] transition w-[349px]"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2: SHIPPING INFO */}
            <div className="border border-gray-200 rounded-sm">
              <div
                className="border-l-4 bg-gray-100 px-4 py-3 flex justify-between items-center cursor-pointer"
                style={{ borderColor: openStep === 2 ? MAROON : "transparent" }}
                onClick={() => openRequestedStep(2)}
              >
                <h2 className="font-semibold text-[15px] uppercase">2. Shipping Info</h2>
              </div>
              {openStep === 2 && (
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      name="firstName"
                      placeholder="First Name"
                      value={shippingForm.firstName}
                      onChange={handleShippingChange}
                      className="border border-gray-300 px-3 py-2 rounded-sm"
                    />
                    <input
                      name="lastName"
                      placeholder="Last Name"
                      value={shippingForm.lastName}
                      onChange={handleShippingChange}
                      className="border border-gray-300 px-3 py-2 rounded-sm"
                    />
                  </div>

                  <input
                    name="streetAddress"
                    placeholder="Street Address"
                    value={shippingForm.streetAddress}
                    onChange={handleShippingChange}
                    className="border border-gray-300 px-3 py-2 rounded-sm w-full"
                  />

                  {/* Country/State/City Dropdowns */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Country */}
                    <select
                      name="country"
                      value={
                        Country.getAllCountries().find((c) => c.name === shippingForm.country)
                          ?.isoCode || ""
                      }
                      onChange={(e) => {
                        const selectedCountry = Country.getCountryByCode(e.target.value);
                        setShippingForm((p) => ({
                          ...p,
                          country: selectedCountry?.name || "",
                          state: "",
                          city: "",
                        }));
                      }}
                      className="border border-gray-300 px-3 py-2 rounded-sm"
                    >
                      <option value="">Select Country</option>
                      {Country.getAllCountries().map((c) => (
                        <option key={c.isoCode} value={c.isoCode}>
                          {c.name}
                        </option>
                      ))}
                    </select>

                    {/* State */}
                    <select
                      name="state"
                      value={
                        State.getStatesOfCountry(
                          Country.getAllCountries().find((c) => c.name === shippingForm.country)
                            ?.isoCode
                        ).find((s) => s.name === shippingForm.state)?.isoCode || ""
                      }
                      onChange={(e) => {
                        const selectedState = State.getStateByCodeAndCountry(
                          e.target.value,
                          Country.getAllCountries().find((c) => c.name === shippingForm.country)
                            ?.isoCode
                        );
                        setShippingForm((p) => ({
                          ...p,
                          state: selectedState?.name || "",
                          city: "",
                        }));
                      }}
                      disabled={!shippingForm.country}
                      className="border border-gray-300 px-3 py-2 rounded-sm"
                    >
                      <option value="">Select State</option>
                      {shippingForm.country &&
                        State.getStatesOfCountry(
                          Country.getAllCountries().find((c) => c.name === shippingForm.country)
                            ?.isoCode
                        ).map((s) => (
                          <option key={s.isoCode} value={s.isoCode}>
                            {s.name}
                          </option>
                        ))}
                    </select>

                    {/* City */}
                    <select
                      name="city"
                      value={shippingForm.city}
                      onChange={(e) => setShippingForm((p) => ({ ...p, city: e.target.value }))}
                      disabled={!shippingForm.state}
                      className="border border-gray-300 px-3 py-2 rounded-sm"
                    >
                      <option value="">Select City</option>
                      {shippingForm.state &&
                        City.getCitiesOfState(
                          Country.getAllCountries().find((c) => c.name === shippingForm.country)
                            ?.isoCode,
                          State.getStatesOfCountry(
                            Country.getAllCountries().find((c) => c.name === shippingForm.country)
                              ?.isoCode
                          ).find((s) => s.name === shippingForm.state)?.isoCode
                        ).map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      name="postalCode"
                      placeholder="Postal Code"
                      value={shippingForm.postalCode}
                      onChange={handleShippingChange}
                      className="border border-gray-300 px-3 py-2 rounded-sm"
                    />
                    <input
                      name="phone"
                      placeholder="Phone"
                      value={shippingForm.phone}
                      onChange={handleShippingChange}
                      className="border border-gray-300 px-3 py-2 rounded-sm"
                    />
                  </div>

                  <label className="flex items-center gap-2 text-[13px]">
                    <input
                      type="checkbox"
                      checked={saveInfo}
                      onChange={(e) => setSaveInfo(e.target.checked)}
                      className="w-4 h-4 accent-[#800000]"
                    />
                    Save this address for future
                  </label>

                  <button
                    onClick={handleProceedToPayment}
                    className="bg-[#800000] text-white px-6 py-3 uppercase rounded-sm hover:bg-[#660000]"
                  >
                    Proceed to Payment
                  </button>
                </div>
              )}
            </div>

            {/* STEP 3: PAYMENT */}
            <div className="border border-gray-200 rounded-sm">
              <div
                className="border-l-4 bg-gray-100 px-4 py-3 flex justify-between items-center cursor-pointer"
                style={{ borderColor: openStep === 3 ? MAROON : "transparent" }}
                onClick={() => openRequestedStep(3)}
              >
                <h2 className="font-semibold text-[15px] uppercase">3. Payment Method</h2>
              </div>
              {openStep === 3 && (
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {["cod", "card", "netbank", "upi"].map((method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`border border-gray-300 py-4 rounded-sm uppercase ${
                          paymentMethod === method ? "bg-[#800000] text-white" : ""
                        }`}
                      >
                        {method === "cod"
                          ? "Cash on Delivery"
                          : method === "card"
                            ? "Credit/Debit Card"
                            : method === "netbank"
                              ? "Net Banking"
                              : "UPI"}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handlePayNow}
                    disabled={isProcessingPayment}
                    className="bg-[#800000] text-white px-6 py-3 rounded-sm hover:bg-[#660000] disabled:bg-gray-400"
                  >
                    {isProcessingPayment ? "Processing..." : "Pay Now"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE - CART SUMMARY */}
          <div className="space-y-8">
            <div className="border border-gray-200 rounded-sm p-6">
              <h2 className="text-[16px] font-semibold uppercase mb-4">Cart Summary</h2>
              <div className="space-y-2 text-[14px]">
                <div className="flex justify-between">
                  <span>Cart Total</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>(–) ₹{discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <span>Shipping</span>
                  <span>₹{shippingFee}</span>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-[15px] font-medium">
                  <span>Total Payable</span>
                  <span className="text-[18px] font-semibold">
                    ₹{totalPayable.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* PRODUCT SUMMARY */}
            <div className="border border-gray-200 rounded-sm p-6">
              <h2 className="text-[16px] font-semibold uppercase mb-4">Product Summary</h2>
              {cartItems.length === 0 ? (
                <p className="text-gray-600 text-[14px] text-center py-4">Your cart is empty.</p>
              ) : (
                cartItems.map((item, i) => (
                  <div key={i} className="flex gap-4 items-center mb-4">
                    <img
                      src={item.image || "https://via.placeholder.com/100"}
                      alt={item.name}
                      className="w-20 h-24 object-cover rounded-sm"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-[14px] uppercase">{item.name}</p>
                      <p className="text-[13px] text-gray-500 capitalize">
                        {item.color || "—"} | Size: {item.size || "—"}
                      </p>
                      <p className="text-[13px] text-gray-500">Qty: {item.quantity || 1}</p>
                    </div>
                    <p className="font-semibold text-[14px] text-[#000]">
                      ₹{(item.price || 0).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
