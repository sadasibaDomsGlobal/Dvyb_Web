import React from "react";
import FooterLinks from "./footerLinks";
import FooterSocials from "./footerSocials";
import FooterAppLinks from "./footerAppLinks";

import returnIcon from "../../../assets/common/footer/Return-Policy-Icon.svg"
import OriginalIcon from "../../../assets/common/footer/Original-Guarantee-Icon.svg"


const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 px-6 py-10 md:px-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        <FooterLinks
          title="Quick Links"
          links={[
            { label: "Virtual Try On", to: "/tryon" },
            { label: "Exclusives", to: "/exclusives" },
            { label: "Best Sellers", to: "/bestsellers" },
            { label: "Closet Icon", to: "/closet-icon" },
            { label: "Bridal Closet", to: "/bridal-closet" },
          ]}
        />
        <FooterLinks
          title="Our Company"
          links={[
            { label: "Contact Us", to: "/contact" },
            { label: "FAQ", to: "/faq" },
            { label: "Terms & Conditions", to: "/terms" },
            { label: "Privacy Policy", to: "/privacy" },
          ]}
        />
        <FooterLinks
          title="Customer Policies"
          links={[
            { label: "Store", to: "/store" },
            { label: "Shipping Info", to: "/shipping" },
            { label: "Return Policy", to: "/returns" },
            { label: "Warranty", to: "/warranty" },
          ]}
        />
        <FooterLinks
          title="Our Services"
          links={[
            { label: "Support", to: "/support" },
            { label: "Blog", to: "/blog" },
            { label: "Careers", to: "/careers" },
            { label: "Feedback", to: "/feedback" },
          ]}
        />
        <div>
          <h5 className="font-medium  uppercase text-xs tracking-wide">
            Follow Us On
          </h5>
          <FooterSocials />
          <h5 className="font-medium  uppercase text-xs tracking-wide mt-6">
            Follow Us On
          </h5>
          <div className=" flex flex-col md:flex-row justify-between items-center">
            <FooterAppLinks />
          </div>
        </div>
      </div>

      <div className=" w-full mt-10 flex flex-col md:flex-row  items-center pt-6 text-sm text-gray-700 gap-16">
        {/* <div className="flex items-center gap-2">
          <img
            src={returnIcon}
            alt="return"
            className="w-9 h-12"
          />
          <p className="leading-4">
            <span className="font-medium uppercase text-sm ">RETURN WITHIN 14 DAYS </span>
            of receiving <br /> your order
          </p>
        </div>

        <div className="flex items-center gap-2 mb-4 md:mb-0">

          <img
            src={OriginalIcon}
            alt="original seal"
            className="w-9 h-12"
          />
          <p className="leading-6">
            <span className="font-medium uppercase text-sm leading-3">100% ORIGINAL </span>
            guarantee <br /> for all products at dvyb.in
          </p>
        </div> */}

  {/* Return Policy */}
          <div className="flex items-start">
            <img src={returnIcon} alt="" className="w-9 h-12"/>
             <p className="ml-2">
              <span className="text-[13px] font-medium" 
              style={{
                 lineHeight: "1"
              }}
              >
                RETURN WITHIN 14 DAYS
              </span> <span className="text-[13px] font-light">
                of <br /> receiving your order
              </span>
            </p>
           
          </div>
{/* Guarantee */}
          <div className="flex items-start">
            <img src={OriginalIcon} alt="" className="w-9 h-12" />
            <p className="ml-2">
              <span className=" text-[13px] font-medium">100% ORIGINAL</span> <span className=" text-[13px] font-light  "
              style={{
                lineHeight : "16px"
              }}
              >guarantee for <br /> all products at dvyb.in</span>
            </p>
          </div>


      </div>


    </footer>
  );
};

export default Footer;
