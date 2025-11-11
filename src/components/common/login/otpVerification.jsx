import React, { useState } from "react";
import OtpInput from "./otpInput";
import { verifyOtp } from "../../../services/otpService";
import otpBanner from "@/assets/common/login/loginBanner.svg";

const OtpVerification = ({ confirmation, mobile, onSuccess, onError, onResend }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await verifyOtp(confirmation, otp);
      onSuccess(user);
    } catch {
      setError("The OTP you entered is incorrect.");
      onError();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white mb-12 py-6 w-full max-w-md mx-auto font-outfit">
      <img src={otpBanner} alt="otp-banner" className="mb-12 w-full object-cover h-62" />
      <div className="text-center m-4 p-12">
        <span className="text-2xl font-bold text-textLight">OTP Verification</span>
        <p className="text-base">
          Enter the OTP sent to <b className="text-textDark font-bold" >+91 {mobile}</b>
        </p>
        <form onSubmit={handleVerify}>
          {/* <OtpInput value={otp} onChange={setOtp} length={6} /> */}
          <OtpInput
            value={otp}
            onChange={setOtp}
            length={6}
            onComplete={(value) => {
              console.log("OTP Complete:", value);
              // Validate or submit
              if (value !== "123456") setError(true);
              else setError(false);
            }}
            error={error}
            autoFocus
          />
        
          <p className="text-base text-borderLight font-normal p-2">
           {error && error ?<span className="text-base text-[#FF0000] font-">{error} </span> : ` Didn’t receive the OTP? ${" "}`}
            Didn’t receive the OTP? {" "}
            <button type="button" onClick={onResend} className="font-medium underline text-[#000000]">
              Resend OTP
            </button>
          </p>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 mt-4"
          >
            {loading ? "Verifying..." : "VERIFY OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
