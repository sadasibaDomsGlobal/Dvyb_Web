// services/otpService.js
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app from "../config/firebaseConfig";

const auth = getAuth(app);
let recaptchaVerifier = null;

// Only for local testing - remove in production
if (process.env.NODE_ENV === 'development') {
  auth.settings.appVerificationDisabledForTesting = true;
}

export const setupRecaptcha = (containerId = "recaptcha-container") => {
  // Clear existing verifier
  if (recaptchaVerifier) {
    try {
      recaptchaVerifier.clear();
    } catch (e) {
      console.warn("Error clearing recaptcha:", e);
    }
    recaptchaVerifier = null;
  }

  // Correct parameter order: (auth, containerIdOrElement, parameters)
  recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
    callback: (response) => {
      console.log("reCAPTCHA solved", response);
    },
    "expired-callback": () => {
      console.warn("reCAPTCHA expired");
      if (recaptchaVerifier) {
        try {
          recaptchaVerifier.render().then((widgetId) => {
            window.grecaptcha.reset(widgetId);
          });
        } catch (e) {
          console.error("Error resetting reCAPTCHA:", e);
        }
      }
    },
  });

  return recaptchaVerifier;
};

export const sendOtp = async (phoneNumber) => {
  if (!recaptchaVerifier) {
    throw new Error("reCAPTCHA not set up. Call setupRecaptcha() first.");
  }

  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );
    return confirmationResult;
  } catch (error) {
    console.error("Error sending OTP:", error);
    
    // Reset reCAPTCHA on error
    if (recaptchaVerifier) {
      try {
        const widgetId = await recaptchaVerifier.render();
        window.grecaptcha.reset(widgetId);
      } catch (resetError) {
        console.error("Error resetting reCAPTCHA:", resetError);
      }
    }
    
    throw error;
  }
};

export const verifyOtp = async (confirmationResult, otp) => {
  try {
    const result = await confirmationResult.confirm(otp);
    
    // Clean up
    if (recaptchaVerifier) {
      try {
        recaptchaVerifier.clear();
      } catch (e) {
        console.warn("Error clearing recaptcha:", e);
      }
      recaptchaVerifier = null;
    }
    
    return result.user;
  } catch (error) {
    console.error("OTP verification failed:", error);
    throw error;
  }
};