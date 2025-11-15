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

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id '${containerId}' not found`);
    throw new Error(`reCAPTCHA container '${containerId}' not found in DOM`);
  }

  try {
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
  } catch (error) {
    console.error("Error setting up reCAPTCHA:", error);
    throw error;
  }
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
  if (!confirmationResult) {
    throw new Error("No confirmation result provided");
  }

  try {
    console.log("Verifying OTP...");
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

// Cleanup function for unmounting
export const cleanupRecaptcha = () => {
  if (recaptchaVerifier) {
    try {
      recaptchaVerifier.clear();
    } catch (e) {
      console.warn("Error during cleanup:", e);
    }
    recaptchaVerifier = null;
  }

    const container = document.getElementById("recaptcha-container");
  if (container) {
    container.innerHTML = '';
  }
};