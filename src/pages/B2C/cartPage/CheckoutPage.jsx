
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { subscribeToCart, clearCart } from "../../services/CartService";
import { createOrder } from "../../services/OrderService";
import { db, app } from "../../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { Country, State, City } from "country-state-city";
import { getFunctions, httpsCallable } from "firebase/functions";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const functions = getFunctions(app, "us-central1");
  const MAROON = "#800000";

  // Cart & loading
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Accordion state & unlocking
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
  const [collectionName, setCollectionName] = useState("");

  // Step 3 - payment
  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod/card/upi
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Location arrays
  const [countryArray, setCountryArray] = useState([]);
  const [stateArray, setStateArray] = useState([]);
  const [cityArray, setCityArray] = useState([]);

  // Coupon code
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(null);

  // Fetch countries (once)
  useEffect(() => {
    try {
      const countries = Country.getAllCountries().map((c) => ({
        code: c.isoCode,
        name: c.name,
      }));
      setCountryArray(countries);
    } catch (err) {
      console.warn("country-state-city load failed:", err);
      setCountryArray([]);
    }
  }, []);

  // Update states when country changes
  useEffect(() => {
    if (shippingForm.country) {
      const states = State.getStatesOfCountry(shippingForm.country).map(
        (s) => ({
          code: s.isoCode,
          name: s.name,
        })
      );
      setStateArray(states);
    } else setStateArray([]);
    setCityArray([]);
    setShippingForm((p) => ({ ...p, state: "", city: "" }));
  }, [shippingForm.country]);

  // Update cities when state changes
  useEffect(() => {
    if (shippingForm.country && shippingForm.state) {
      const cities = City.getCitiesOfState(
        shippingForm.country,
        shippingForm.state
      ).map((c) => ({ name: c.name }));
      setCityArray(cities);
    } else setCityArray([]);
    setShippingForm((p) => ({ ...p, city: "" }));
  }, [shippingForm.state]);

  // Subscribe to cart updates
  // useEffect(() => {
  //   let unsubscribe = null;
  //   const setup = async () => {
  //     try {
  //       unsubscribe = await subscribeToCart((items) => {
  //         setCartItems(items || []);
  //         setIsLoading(false);
  //       });
  //     } catch (err) {
  //       console.error("subscribeToCart error:", err);
  //       setIsLoading(false);
  //     }
  //   };
  //   setup();
  //   return () => {
  //     if (unsubscribe) unsubscribe();
  //   };
  // }, []);
  useEffect(() => {
    if (user === undefined || user === null) return;

    let unsubscribe = null;

    const setup = async () => {
      try {
        unsubscribe = await subscribeToCart((items) => {
          setCartItems(items || []);
          setIsLoading(false);
        });
      } catch (err) {
        console.error("subscribeToCart error:", err);
        setIsLoading(false);
      }
    };

    setup();

    return () => unsubscribe && unsubscribe();
  }, [user]);

  // Prefill email & detect user collection in Firestore
  useEffect(() => {
    if (!user) return;
    const fetchUser = async () => {
      try {
        let ref = doc(db, "b2c_users", user.uid);
        let snap = await getDoc(ref);
        if (snap.exists()) setCollectionName("b2c_users");
        else {
          ref = doc(db, "B2BBulkOrders_users", user.uid);
          snap = await getDoc(ref);
          if (snap.exists()) setCollectionName("B2BBulkOrders_users");
        }
        setEmail(user.email || "");
        // If user doc has saved shipping address, optionally prefill
        if (snap && snap.exists()) {
          const data = snap.data();
          const shipping = data.currentShippingAddress;
          if (shipping) {
            // Try to parse details if available (best-effort)
            setShippingForm((p) => ({
              ...p,
              firstName: shipping.name?.split(" ")?.[0] || p.firstName,
              lastName:
                shipping.name?.split(" ")?.slice(1).join(" ") || p.lastName,
              streetAddress: shipping.details || p.streetAddress,
              phone: shipping.phone || p.phone,
            }));
          }
        }
      } catch (err) {
        console.error("fetch user error:", err);
      }
    };
    fetchUser();
  }, [user]);

  // Accordion open handler (enforce sequential)
  const openRequestedStep = (n) => {
    if (n === 1) {
      setOpenStep(1);
      return;
    }
    if (n === 2 && step2Unlocked) {
      setOpenStep(2);
      return;
    }
    if (n === 3 && step3Unlocked) {
      setOpenStep(3);
      return;
    }
    if (n === 2) alert("Please complete Step 1 (User Details) first.");
    if (n === 3) alert("Please complete Step 2 (Shipping) first.");
  };

  // Step 1: validate email and unlock step 2
  const handleCheckoutAsGuest = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setStep2Unlocked(true);
    setOpenStep(2);
  };

  // Shipping handlers
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingForm((p) => ({ ...p, [name]: value }));
  };

  const isShippingValid = () => {
    const {
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      postalCode,
      country,
      phone,
    } = shippingForm;
    return (
      firstName?.trim() &&
      lastName?.trim() &&
      streetAddress?.trim() &&
      city?.trim() &&
      state?.trim() &&
      postalCode?.trim() &&
      country?.trim() &&
      phone?.trim()
    );
  };

  // Save shipping info to Firestore (if user) and unlock step 3
  const handleProceedToPayment = async () => {
    if (!isShippingValid()) {
      alert("Please fill all required shipping fields.");
      return;
    }

    try {
      if (user && collectionName) {
        const userRef = doc(db, collectionName, user.uid);
        const shippingAddressToSave = {
          id: Date.now(),
          type: "Shipping",
          name: `${shippingForm.firstName} ${shippingForm.lastName}`,
          details: `${shippingForm.streetAddress}${
            shippingForm.city ? ", " + shippingForm.city : ""
          }${shippingForm.state ? ", " + shippingForm.state : ""}${
            shippingForm.postalCode ? " - " + shippingForm.postalCode : ""
          }${shippingForm.country ? ", " + shippingForm.country : ""}`,
          phone: shippingForm.phone,
          isShipping: true,
          createdAt: new Date().toISOString(),
        };

        if (saveInfo) {
          await updateDoc(userRef, {
            addresses: arrayUnion(shippingAddressToSave),
          });
        }

        await updateDoc(userRef, {
          currentShippingAddress: shippingAddressToSave,
          lastUpdated: new Date().toISOString(),
        });
      }

      setStep3Unlocked(true);
      setOpenStep(3);
    } catch (err) {
      console.error("handleProceedToPayment error:", err);
      alert("Failed to save shipping address. Try again.");
    }
  };

  // Totals
  const subtotal = cartItems.reduce(
    (sum, it) => sum + (it.subtotal || (it.price || 0) * (it.quantity || 1)),
    0
  );
  const discount = couponApplied?.amount
    ? couponApplied.amount
    : subtotal * 0.12;
  const shippingFee = cartItems.some((i) => !i.freeShipping) ? 50 : 0;
  const totalPayable = Math.max(0, subtotal - discount + shippingFee);

  // Coupon apply stub (you can expand to call server)
  const handleApplyCoupon = () => {
    if (!couponCode) return alert("Enter coupon code.");
    // example: if code "FLAT50" -> flat 50 off
    if (couponCode.trim().toUpperCase() === "FLAT50") {
      setCouponApplied({ code: "FLAT50", amount: 50 });
      alert("Coupon applied: ₹50 off");
    } else {
      // fallback to default discount logic (we already calculate discount by percent)
      setCouponApplied(null);
      alert("Invalid coupon. Default discount applied.");
    }
  };

  // Build product list for orders
  const buildProductsForOrder = () =>
    cartItems.map((item) => ({
      productId: item.productId || item.id,
      name: item.name || item.title || "Product",
      color: item.color || "N/A",
      size: item.size || "N/A",
      quantity: item.quantity || 1,
      price: item.price || 0,
      image: (item.imageUrls && item.imageUrls[0]) || item.image || "",
      subtotal: item.subtotal || (item.price || 0) * (item.quantity || 1),
    }));

  // COD order
  const placeCODOrder = async () => {
    try {
      const products = buildProductsForOrder();

      // Optional: fetch saved shipping/billing from user doc
      let billingAddr = null;
      let shippingAddr = null;
      if (user && collectionName) {
        try {
          const ref = doc(db, collectionName, user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const data = snap.data();
            billingAddr = data.currentBillingAddress || null;
            shippingAddr = data.currentShippingAddress || null;
          }
        } catch (err) {
          console.warn("Could not fetch addresses for order:", err);
        }
      }

      const orderData = {
        products,
        billingAddress: billingAddr,
        shippingAddress: shippingAddr || {
          name: `${shippingForm.firstName} ${shippingForm.lastName}`,
          details: shippingForm.streetAddress,
          phone: shippingForm.phone,
        },
        paymentMethod: "cod",
        subtotal,
        discount,
        shipping: shippingFee,
        total: totalPayable,
        estimatedDelivery: "Within 5-7 business days",
      };

      const res = await createOrder(orderData);
      if (res.success) {
        await clearCart();
        alert(`Order placed successfully! Order ID: ${res.orderId || "N/A"}`);
        navigate("/");
      } else {
        alert("Order creation failed. Try again.");
      }
    } catch (err) {
      console.error("placeCODOrder error:", err);
      alert("Failed to place COD order: " + (err.message || ""));
    }
  };

  // Razorpay prepaid flow (create order server-side via cloud function and open checkout)
  const handleRazorpayPayment = async () => {
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    // Ensure shipping is present for logged-in users
    if (user && collectionName) {
      try {
        const ref = doc(db, collectionName, user.uid);
        const snap = await getDoc(ref);
        const data = snap.exists() ? snap.data() : {};
        if (!data?.currentShippingAddress) {
          alert("Please save/confirm shipping address before payment.");
          return;
        }
      } catch (err) {
        console.error("Address check error:", err);
      }
    }

    setIsProcessingPayment(true);

    try {
      const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!RAZORPAY_KEY) {
        throw new Error(
          "Razorpay key not configured. Set VITE_RAZORPAY_KEY_ID in env."
        );
      }

      // Call cloud function to create Razorpay order
      const createRzpOrder = httpsCallable(functions, "createRazorpayOrder");
      const createRes = await createRzpOrder({ amount: Number(totalPayable) }); // ✅ send rupees only

      if (!createRes.data?.success)
        throw new Error("Failed to create Razorpay order on server");

      const rzpOrder = createRes.data.order;
      const options = {
        key: RAZORPAY_KEY,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency || "INR",
        name: "DVYB",
        description: "Order Payment",
        order_id: rzpOrder.id,
        handler: async function (response) {
          try {
            const verifyFn = httpsCallable(functions, "verifyRazorpayPayment");
            const verifyRes = await verifyFn({
              ...response,
              orderId: rzpOrder.id,
            });
            if (verifyRes.data?.success) {
              await clearCart();
              alert(
                "Payment successful! Order ID: " +
                  (verifyRes.data.orderId || rzpOrder.id)
              );
              navigate("/");
            } else {
              alert("Payment verification failed on server.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Payment verification failed: " + err.message);
          } finally {
            setIsProcessingPayment(false);
          }
        },
        prefill: {
          name: `${shippingForm.firstName || ""} ${
            shippingForm.lastName || ""
          }`.trim(),
          email: email || (user && user.email) || "",
          contact: shippingForm.phone || "",
        },
        theme: { color: MAROON },
      };

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay SDK not loaded. Add <script src='https://checkout.razorpay.com/v1/checkout.js'></script> in your index.html"
        );
      }

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.error("Razorpay payment.failed:", response);
        alert(
          "Payment failed: " + (response.error?.description || "Unknown error")
        );
        setIsProcessingPayment(false);
      });

      // open checkout
      rzp.open();
    } catch (err) {
      console.error("Razorpay flow error:", err);
      alert("Payment initiation failed: " + err.message);
      setIsProcessingPayment(false);
    }
  };

  const handlePayNow = async () => {
    if (!step3Unlocked) {
      alert("Please complete previous steps first.");
      return;
    }
    if (paymentMethod === "cod") {
      await placeCODOrder();
      return;
    }
    await handleRazorpayPayment();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-[Outfit]">
        Loading checkout...
      </div>
    );
  }

  // Render
  return (
    <div className="min-h-screen bg-white font-[Outfit]">
      <div className="max-w-F7xl mx-auto px-2 md:px-10 py-10">
        {/* Header */}
        {/* <div className="flex items-center gap-3 mb-10">
          <img
            src={b2clogo}
            alt="logo"
            className="h-6 object-contain cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1 className="text-[22px] font-medium uppercase tracking-wide border-l-4 border-[#800000] pl-3">
            Checkout
          </h1>
        </div> */}

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-2">
          {/* LEFT SIDE – Steps */}
          <div className="lg:col-span-2 space-y-5">
            {/* 1. USER DETAILS */}
            <div className=" border-gray-200 rounded-sm">
              <div
                className="bg-gray-100 px-4 py-3 flex justify-between items-center border-l-4"
                style={{ borderColor: openStep === 1 ? MAROON : "transparent" }}
                onClick={() => openRequestedStep(1)}
              >
                <h2 className="font-semibold text-[15px] uppercase">
                  1. User Details
                </h2>
                {email && openStep !== 1 && (
                  <div className="text-sm text-gray-600">{email}</div>
                )}
              </div>
              {openStep === 1 && (
                
                <div className="p-6 space-y-6">
                  {/* ✅ Row with both texts side-by-side */}
                  <div className="flex justify-between items-center">
                    <p className="text-[14px] text-gray-700 font-normal">
                      Tell us your Email ID for sending you your order details.
                    </p>

                    <div className="text-[13px] text-gray-600 font-normal">
                      <p>Don’t have an account? </p>
                      <p>Create an account for faster transactions. </p>
                      <span
                        onClick={() => alert("Open signup flow")}
                        className="text-[#800000] font-medium cursor-pointer hover:underline"
                      >
                        Sign up!
                      </span>
                    </div>
                  </div>

                  {/* ✅ Email + Button vertical */}
                  <div className="flex flex-col gap-4">
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
                      {user ? "Continue" : "Checkout as Guest"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. SHIPPING & BILLING INFO */}
            <div className="border-gray-200 rounded-sm">
              <div
                className="border-l-4 border-[#800000] bg-gray-100 px-4 py-3 flex justify-between items-center cursor-pointer"
                onClick={() => openRequestedStep(2)}
                style={{ borderColor: openStep === 2 ? MAROON : undefined }}
              >
                <h2 className="font-semibold text-[15px] uppercase">
                  2. Shipping & Billing Info
                </h2>
              </div>
              {openStep === 2 && (
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      name="firstName"
                      value={shippingForm.firstName}
                      onChange={handleShippingChange}
                      placeholder="First Name"
                      className="border border-gray-300 px-3 py-2 rounded-sm"
                    />
                    <input
                      name="lastName"
                      value={shippingForm.lastName}
                      onChange={handleShippingChange}
                      placeholder="Last Name"
                      className="border border-gray-300 px-3 py-2 rounded-sm"
                    />
                  </div>

                  <input
                    name="streetAddress"
                    value={shippingForm.streetAddress}
                    onChange={handleShippingChange}
                    placeholder="Street Address"
                    className="border border-gray-300 px-3 py-2 rounded-sm w-full"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                      name="country"
                      value={shippingForm.country}
                      onChange={handleShippingChange}
                      className="border border-gray-300 px-3 py-2 rounded-sm"
                    >
                      <option value="">Country</option>
                      {countryArray.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>

                    <select
                      name="state"
                      value={shippingForm.state}
                      onChange={handleShippingChange}
                      className="border border-gray-300 px-3 py-2 rounded-sm"
                    >
                      <option value="">State</option>
                      {stateArray.map((s) => (
                        <option key={s.code} value={s.code}>
                          {s.name}
                        </option>
                      ))}
                    </select>

                    <select
                      name="city"
                      value={shippingForm.city}
                      onChange={handleShippingChange}
                      className="border border-gray-300 px-3 py-2 rounded-sm"
                    >
                      <option value="">City</option>
                      {cityArray.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      name="postalCode"
                      value={shippingForm.postalCode}
                      onChange={handleShippingChange}
                      placeholder="Postal Code"
                      className="border border-gray-300 px-3 py-2 rounded-sm"
                    />
                    <input
                      name="phone"
                      value={shippingForm.phone}
                      onChange={handleShippingChange}
                      placeholder="Phone"
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

                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleProceedToPayment}
                      className="bg-[#800000] text-white px-6 py-3 uppercase rounded-sm hover:bg-[#660000]"
                    >
                      Proceed to Payment
                    </button>
                    <button
                      onClick={() =>
                        alert("Open address modal / manage addresses")
                      }
                      className="border border-gray-400 px-6 py-3 rounded-sm"
                    >
                      Add New Address
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. PAYMENT METHOD */}
            <div className="border border-gray-200 rounded-sm">
              <div
                className=" border-l-4 border-[#800000] bg-gray-100 px-4 py-3 flex justify-between items-center cursor-pointer"
                style={{ borderColor: openStep === 3 ? MAROON : undefined }}
                onClick={() => openRequestedStep(3)}
              >
                <h2 className="font-semibold text-[15px] uppercase">
                  3. Payment Method
                </h2>
              </div>
              {openStep === 3 && (
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setPaymentMethod("cod")}
                      className={`border border-gray-300 py-4 rounded-sm uppercase ${
                        paymentMethod === "cod" ? "bg-[#800000] text-white" : ""
                      }`}
                    >
                      Cash on Delivery
                    </button>
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`border border-gray-300 py-4 rounded-sm uppercase ${
                        paymentMethod === "card"
                          ? "bg-[#800000] text-white"
                          : ""
                      }`}
                    >
                      Credit / Debit Card
                    </button>
                    <button
                      onClick={() => setPaymentMethod("netbank")}
                      className={`border border-gray-300 py-4 rounded-sm uppercase ${
                        paymentMethod === "netbank"
                          ? "bg-[#800000] text-white"
                          : ""
                      }`}
                    >
                      Net Banking
                    </button>
                    <button
                      onClick={() => setPaymentMethod("upi")}
                      className={`border border-gray-300 py-4 rounded-sm uppercase ${
                        paymentMethod === "upi" ? "bg-[#800000] text-white" : ""
                      }`}
                    >
                      UPI
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#800000]"
                      />
                      I agree to DVYB Terms & Conditions
                    </label>

                    <div className="flex-1 text-right">
                      <button
                        onClick={handlePayNow}
                        disabled={isProcessingPayment}
                        className="bg-[#800000] text-white px-6 py-3 rounded-sm hover:bg-[#660000] disabled:bg-gray-400"
                      >
                        {isProcessingPayment
                          ? "Processing Payment..."
                          : "Pay Now"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-600">
                    <span role="img" aria-label="lock">
                      🔒
                    </span>{" "}
                    Secure Checkout
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE – Cart Summary */}
          <div className="space-y-8">
            {/* Cart Summary Box */}
            <div className="border border-gray-200 rounded-sm p-6">
              <h2 className="text-[16px] font-semibold uppercase mb-4">
                Cart Summary
              </h2>

              <div className="space-y-2 text-[14px]">
                <div className="flex justify-between">
                  <span>Cart Total</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Discount</span>
                  <span>(–) ₹{discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <span>Shipping</span>
                  <span>₹{shippingFee}</span>
                </div>
                <p className="text-[12px] text-gray-500 mt-1">
                  Shipping Charges To Be Calculated On Checkout
                </p>
              </div>

              <div className="mt-5 flex items-center gap-2 text-[13px]">
                <input
                  type="checkbox"
                  id="gift"
                  className="accent-[#800000] w-4 h-4"
                />
                <label htmlFor="gift" className="text-gray-700">
                  This is a gift item
                </label>
                <span className="text-[#800000] cursor-pointer">
                  (Know More)
                </span>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="coupon"
                  className="block text-[13px] font-medium uppercase mb-2"
                >
                  Coupon Code
                </label>
                <div className="flex border border-gray-300 rounded-sm overflow-hidden">
                  <input
                    type="text"
                    id="coupon"
                    placeholder="Enter Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-[13px] focus:outline-none"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-[#800000] text-white px-6 text-[13px] uppercase hover:bg-[#660000]"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-[15px] font-medium">
                  <span>Total Payable</span>
                  <span className="text-[18px] font-semibold">
                    ₹{totalPayable.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => setOpenStep(3)}
                  className="w-full bg-[#800000] text-white py-3 text-[14px] uppercase rounded-sm hover:bg-[#660000] transition"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="w-full border border-[#800000] text-[#800000] py-3 text-[14px] uppercase rounded-sm hover:bg-gray-50 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Product Summary */}
            <div className="border border-gray-200 rounded-sm p-6">
              <h2 className="text-[16px] font-semibold uppercase mb-4">
                Product Summary
              </h2>
              <div className="space-y-5">
                {cartItems.length === 0 ? (
                  <p className="text-gray-600 text-[14px] text-center py-4">
                    Your cart is empty.
                  </p>
                ) : (
                  cartItems.map((item, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <img
                        src={
                          item.imageUrls?.[0] ||
                          "https://via.placeholder.com/100"
                        }
                        alt={item.name}
                        className="w-20 h-24 object-cover rounded-sm"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-[14px] uppercase">
                          {item.name}
                        </p>
                        <p className="text-[13px] text-gray-500 capitalize">
                          {item.color || "—"} | Size: {item.size || "—"}
                        </p>
                        <p className="text-[13px] text-gray-500">
                          Qty: {item.quantity || 1}
                        </p>
                        <p className="text-[13px] text-gray-500 italic">
                          Est. Shipping: 4–7 Days
                        </p>
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
    </div>
  );
}
