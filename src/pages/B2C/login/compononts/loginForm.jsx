// import React, { useState, useEffect } from "react";
// import CountryCodeDropdown from "../../../../components/common/login/countryCodeDropdown";
// import { setupRecaptcha, sendOtp } from "../../../../services/otpService";
// import loginBanner from "../../../../assets/common/login/loginBanner.svg";

// const LoginForm = ({ onOtpSent, onGuest }) => {
//   const [countryCode, setCountryCode] = useState("+91");
//   const [mobile, setMobile] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//   // Only run once on mount
//   setupRecaptcha("recaptcha-container");
//   return () => {
//     // Cleanup on unmount
//     if (window.recaptchaVerifier) {
//       window.recaptchaVerifier.clear();
//       window.recaptchaVerifier = null;
//     }
//   };
// }, []);

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const phoneNumber = `${countryCode}${mobile}`;
//       const confirmation = await sendOtp(phoneNumber);
//       onOtpSent(confirmation, mobile);
//     } catch (error) {
//       alert("Failed to send OTP. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white py-6 w-full max-w-md mx-auto font-outfit mb-12">
//       <img
//         src={loginBanner}
//         alt="login-banner"
//         className=" mb-4 w-full object-cover h-52"
//       />
//       <form onSubmit={handleSendOtp} className="flex flex-col gap-4 ">
//         <div className="flex">
//           <CountryCodeDropdown value={countryCode} onChange={setCountryCode} />
//           <input
//             type="tel"
//             placeholder="Enter Mobile Number"
//             className="flex-1 border border-border p-3 "
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-primary text-white p-3  hover:bg-primary"
//         >
//           {loading ? "Sending..." : "SIGNUP / LOGIN"}
//         </button>
//         <div className="flex items-center justify-center text-gray-500">
//           <span className="mx-2">OR</span>
//         </div>
//         <button
//           type="button"
//           onClick={onGuest}
//           className="border border-primary text-primary p-2 hover:bg-color-secondary"
//         >
//           CHECK OUT AS GUEST
//         </button>
//         <div className="text-xs text-center text-gray-500">
//           By continuing, I agree to <a href="#" className="text-primaryLight">Terms of Use</a> &{" "}
//           <a href="#" className="text-primaryLight">Privacy Policy</a>
//         </div>
//       </form>
//       <div id="recaptcha-container"></div>
//     </div>
//   );
// };

// export default LoginForm;


import React, { useState, useEffect } from "react";
import { AsYouType, parsePhoneNumberFromString, isValidPhoneNumber } from "libphonenumber-js";
import CountryCodeDropdown from "../../../../components/common/login/countryCodeDropdown";
import { setupRecaptcha, sendOtp } from "../../../../services/otpService";
import loginBanner from "../../../../assets/common/login/loginBanner.svg";

const LoginForm = ({ onOtpSent, onGuest }) => {
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");  // Raw input (e.g., "812194372")
  const [formattedMobile, setFormattedMobile] = useState("");  // Display: "812 194 372"
  const [error, setError] = useState("");  // For validation errors
  const [loading, setLoading] = useState(false);

  // Format mobile as user types (Indian style with spaces)
  const formatMobileInput = (inputValue) => {
    const formatter = new AsYouType("IN");
    const formatted = formatter.input(inputValue);
    setMobile(inputValue.replace(/\D/g, ""));  // Store digits only internally
    setFormattedMobile(formatted);
    setError("");  // Clear error on input
  };

  // Validate full E.164 number before submit
  const validatePhone = () => {
    const fullNumber = `${countryCode}${mobile.replace(/\D/g, "")}`;
    const phoneNumber = parsePhoneNumberFromString(fullNumber, "IN");
    if (!phoneNumber || !isValidPhoneNumber(fullNumber)) {
      setError("Please enter a valid 10-digit mobile number.");
      return null;
    }
    return fullNumber;  // E.164: "+91812194372"
  };

  useEffect(() => {
    // Setup reCAPTCHA on mount
    setupRecaptcha("recaptcha-container");
    return () => {
      // Cleanup: Use global if needed, but prefer exported var from service
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const phoneNumber = validatePhone();
    if (!phoneNumber) return;  // Early exit on invalid

    setLoading(true);
    setError("");  // Clear any prev error
    try {
      const confirmation = await sendOtp(phoneNumber);
      onOtpSent(confirmation, mobile);  // Pass raw mobile for display in OTP screen
    } catch (error) {
      // Better error mapping (Firebase-specific)
      let msg = "Failed to send OTP. Please try again.";
      if (error.code === "auth/invalid-phone-number") {
        msg = "Invalid phone number. Please check and try again.";
      } else if (error.code === "auth/captcha-check-failed") {
        msg = "Verification failed. Please refresh and try again.";
      }
      setError(msg);
      // Optionally: Log to console for debugging
      console.error("OTP Send Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-6 w-full max-w-md mx-auto font-outfit mb-12">
      <img
        src={loginBanner}
        alt="login-banner"
        className="mb-4 w-full object-cover h-52"
      />
      <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
        <div className="flex">
          <CountryCodeDropdown value={countryCode} onChange={setCountryCode} />
          <input
            type="tel"
            inputMode="numeric"
            placeholder="Enter Mobile Number"
            className={`flex-1 border p-3 ${
              error ? "border-red-500" : "border-border"
            }`}
            value={formattedMobile}
            onChange={(e) => formatMobileInput(e.target.value)}
            maxLength={12}  // Approx for formatted
            required
            disabled={loading}
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading || mobile.length < 10}
          className="bg-primary text-white p-3 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "SIGNUP / LOGIN"}
        </button>
        <div className="flex items-center justify-center text-gray-500">
          <span className="mx-2">OR</span>
        </div>
        <button
          type="button"
          onClick={onGuest}
          disabled={loading}
          className="border border-primary text-primary p-2 hover:bg-color-secondary disabled:opacity-50"
        >
          CHECK OUT AS GUEST
        </button>
        <div className="text-xs text-center text-gray-500">
          By continuing, I agree to{" "}
          <a href="#" className="text-primaryLight">Terms of Use</a> &{" "}
          <a href="#" className="text-primaryLight">Privacy Policy</a>
        </div>
      </form>
      <div id="recaptcha-container" style={{ display: "none" }}></div>  {/* Hidden for invisible */}
    </div>
  );
};

export default LoginForm;