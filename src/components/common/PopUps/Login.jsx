import React from "react";
import LoginBanner from "../../../assets/B2C/images/MainBlog/Banner.svg";

const Login = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div
        className="relative w-[90%] md:w-[900px] h-[450px] rounded-md overflow-hidden shadow-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${LoginBanner})` }}
      >
      

        {/* Text Content */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center !text-white px-6 md:px-12 z-10">
          <p className="text-6xl md:text-6xl font-extrabold mb-3 tracking-wide leading-tight !text-white">
            Limited time offer
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-3 tracking-wide leading-tight text-white">
            Get <span className="text-white">20% off</span>
          </h1>
          <p className="text-sm md:text-base mb-6 !text-white leading-relaxed">
            Thank you for visiting, save on your first order with code{" "}
            <span className="font-semibold text-black">GET20</span>
          </p>

          <button className="border border-black text-white px-6 py-2 hover:bg-white hover:text-black transition duration-300 text-sm md:text-base font-semibold w-fit rounded-full">
            SHOP NOW
          </button>
        </div>

        {/* Close Button */}
        <button className="absolute top-4 right-5 bg-white bg-opacity-30 hover:bg-opacity-50 text-black rounded-full p-2 transition z-20">
          ✕
        </button>
      </div>
    </div>
  );
};

export default Login;