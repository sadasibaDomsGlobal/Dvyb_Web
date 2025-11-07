import React from "react";
import { Eye, Truck, MonitorPlay, MessageCircle } from "lucide-react";

const HelpAndTryonSection = () => {
  const helpItems = [
    {
      icon: <Eye size={22} className="text-gray-800" />,
      title: "Virtual Try On",
      description: "Virtual fitting made easy.",
    },
    {
      icon: <Truck size={22} className="text-gray-800" />,
      title: "Early Delivery",
      description: "Need the product sooner?",
    },
    {
      icon: <MonitorPlay size={22} className="text-gray-800" />,
      title: "Live Product Preview",
      description: "Try it on with your picture.",
    },
  ];

  return (
    <div className="border-t pt-6 mt-6 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {helpItems.map((item, index) => (
          <div key={index} className="flex flex-col items-start gap-1">
            <div>{item.icon}</div>
            <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
            <p className="text-xs text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-800 mb-3">
          Do you need help with customisation or shipping of this product?
        </p>

        <button className="flex items-center justify-center gap-2 border border-green-700 text-green-700 font-medium text-xs px-4 py-2 rounded-md hover:bg-green-700 hover:text-white transition mx-auto">
          <MessageCircle size={16} />
          Chat With Us
        </button>
      </div>
    </div>
  );
};

export default HelpAndTryonSection;
