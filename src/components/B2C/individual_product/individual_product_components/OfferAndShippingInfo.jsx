import React from "react";

const OfferAndShippingInfo = () => {
  const offers = [
    {
      title: "WELCOME 5",
      description: "Get Flat 5% OFF on your order. (T&C Applied)",
      action: "COPY CODE",
    },
    {
      title: "PRICE MATCH PROMISE",
      description: "If you find the product for less we’ll match it! (T&C Applied)",
      action: "KNOW MORE",
    },
  ];

  return (
    <div className="w-full border-t border-gray-200 mt-6">
      {offers.map((offer, index) => (
        <div
          key={index}
          className={`flex items-start justify-between py-3 border-b border-gray-200 last:border-none`}
        >
          {/* Offer Text */}
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              {offer.title}
            </h4>
            <p className="text-xs text-gray-600 mt-1">{offer.description}</p>
          </div>

          {/* Action Text */}
          <button
            className="text-[13px] font-semibold text-yellow-600 uppercase tracking-wide hover:text-yellow-700 transition"
          >
            {offer.action}
          </button>
        </div>
      ))}
    </div>
  );
};

export default OfferAndShippingInfo;
