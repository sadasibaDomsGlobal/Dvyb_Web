import React, { useState } from "react";
import LoginForm from "./compononts/loginForm";
import OtpVerification from "../../../components/common/login/otpVerification";
import cross from "../../../assets/common/icons/cross.svg";

const LoginModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState("login");
  const [confirmation, setConfirmation] = useState(null);
  const [mobile, setMobile] = useState("");

  if (!isOpen) return null; 

  const handleOtpSent = (confirmationResult, number) => {
    setConfirmation(confirmationResult);
    setMobile(number);
    setStep("otp");
  };

  const handleSuccess = (user) => {
    alert("Login Successful!");
    console.log(user);
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 ">
      <div className="relative bg-white shadow-xl w-full max-w-md mx-4 p-4 bg-white shadow-lg  font-outfit">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 h-6 w-6 mb-2"
        >
          <img src={cross} alt="cross" />
        </button>

        {/* Content */}
        {step === "login" ? (
          <LoginForm
            onOtpSent={handleOtpSent}
            onGuest={() => alert("Guest Checkout")}
          />
        ) : (
          <OtpVerification
            confirmation={confirmation}
            mobile={mobile}
            onSuccess={handleSuccess}
            onError={() => {}}
            onResend={() => setStep("login")}
          />
        )}
      </div>
    </div>
  );
};

export default LoginModal;




// import React, { useState } from "react";
// import LoginModal from "./pages/auth/login/LoginModal";

// const App = () => {
//   const [showLogin, setShowLogin] = useState(false);

//   return (
//     <div className="h-screen flex items-center justify-center bg-[var(--color-secondary)]">
//       <button
//         onClick={() => setShowLogin(true)}
//         className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg"
//       >
//         Open Login
//       </button>

//       {/* The Modal */}
//       <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
//     </div>
//   );
// };

// export default App;
