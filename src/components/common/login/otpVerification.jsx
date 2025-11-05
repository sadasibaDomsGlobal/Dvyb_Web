import React, { useState } from "react";
import OtpInput from "./OtpInput";
import { verifyOtp } from "../../../services/otpService";
import otpBanner from "../../../assets/common/login/loginBanner.svg";

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
      <img src={otpBanner} alt="otp-banner" className="mb-4 w-full object-cover h-48" />
      <div className="text-center">
        <h3 className="text-2xl font-extrabold text-textLight ">OTP Verification</h3>
        <p className="text-sm">
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
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          <p className="text-base mt-2 text-borderLight">
            Didn’t receive the OTP?{" "}
            <button type="button" onClick={onResend} className="font-medium">
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
