// services/otpService.js
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app from "../config/firebaseConfig";

const auth = getAuth(app); // ← Always initialize auth here
auth.settings.appVerificationDisabledForTesting = true;
let recaptchaVerifier = null;

export const setupRecaptcha = (containerId = "recaptcha-container") => {
  if (recaptchaVerifier) {
    recaptchaVerifier.clear(); // Clean up previous widget
  }

  recaptchaVerifier = new RecaptchaVerifier(
    auth, // ← 1st: auth instance
    containerId, // ← 2nd: container ID or element
    {
      size: "invisible",
      callback: () => console.log("reCAPTCHA solved"),
      "expired-callback": () => {
        console.warn("reCAPTCHA expired");
        recaptchaVerifier?.render().then((widgetId) => {
          // grecaptcha.reset(widgetId);
          console.log("THe widget id is", widgetId);
          
          
        });
      },
    }
  );

  return recaptchaVerifier;
};

export const sendOtp = async (phoneNumber) => {
  if (!recaptchaVerifier) {
    throw new Error("reCAPTCHA not set up. Call setupRecaptcha() first.");
  }

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    return confirmationResult;
  } catch (error) {
    // Auto-reset reCAPTCHA on error
      //   recaptchaVerifier.render().then((widgetId) => 
      //     grecaptcha.reset(widgetId)
      // );
    console.error("Error sending OTP:", error);
    throw error;
  }
};

export const verifyOtp = async (confirmationResult, otp) => {
  try {
    const result = await confirmationResult.confirm(otp);
    recaptchaVerifier?.clear();
    recaptchaVerifier = null;
    return result.user;
  } catch (error) {
    console.error("OTP verification failed:", error);
    throw error;
  }
};

// Optional: For local testing only
// auth.settings.appVerificationDisabledForTesting = true;  