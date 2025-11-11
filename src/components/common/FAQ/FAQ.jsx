import React, { useState } from "react";
import { Phone, MessageCircle, ChevronDown } from "lucide-react";

import brdialImage from "@/assets/b2c/images/FAQ/birdal.svg";
import logoImage from "@/assets/b2c/images/FAQ/Logo.svg";
import LogoName from "@/assets/b2c/images/FAQ/LogoName.svg";

const FaqPage = () => {
  const faqs = [
    {
      question: "Can I modify my delivery address?",
      answer:
        "Yes, you can modify your delivery address before the order is shipped. Please contact our customer support immediately with your order ID and the new address.",
    },
    {
      question:
        "What is COD (Cash On Delivery)? Are there any additional charges for COD orders?",
      answer:
        "Cash On Delivery allows you to pay for your order at the time of delivery. There might be a small convenience fee for COD orders, which will be clearly displayed during checkout.",
    },
    {
      question:
        "Can I open and check the contents of my package before accepting delivery?",
      answer:
        "To ensure the safety and integrity of all orders, packages cannot be opened before payment is made and delivery is accepted. If you receive a damaged or incorrect item, please refer to our return policy.",
    },
    {
      question: "I paid cash on delivery, how would I get the refund?",
      answer:
        "For COD orders, refunds are typically processed via bank transfer to your provided account details. Please ensure your bank information is correct when initiating a return or refund request.",
    },
    {
      question: "Why am I being charged GST?",
      answer:
        "As per government regulations, GST (Goods and Services Tax) is applicable on all products and services. The GST amount is included in the final price displayed at checkout.",
    },
    {
      question:
        "My transaction failed but the money was deducted from my account. What should I do?",
      answer:
        "If your transaction failed but money was deducted, please wait for 24-48 hours. The amount is usually reversed automatically. If it's not, contact your bank and our customer support with your transaction details.",
    },
    {
      question: "If I receive a wrong product, can I get it replaced?",
      answer:
        "Absolutely! If you receive a wrong or defective product, you can request a replacement. Please initiate a return request within our specified return window, and we will arrange for a replacement.",
    },
  ];

  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <div className="w-full flex flex-col items-center bg-white text-gray-900 font-sans mt-8">
      {/* Top Spacer */}
      <div className="w-full h-16 bg-transparent" />

      {/* Hero Section */}
      <section className="max-w-6xl w-full px-6 py-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Left Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={brdialImage}
            alt="Customer support banner"
            className="rounded-lg w-[80%] h-[70%] max-w-md object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center">
          {/* Centered Logo */}
          <div className="mb-6 flex flex-col items-center">
            <img className="w-40 md:w-20 mb-3" src={logoImage} alt="Logo" />

            <img className="mb-2 w-16 md:w-20" src={LogoName} alt="LogoName" />
          </div>

          {/* Paragraph */}
          <p className=" font-medium  leading-relaxed !text-gray-900 max-w-md">
            At DVYB, we're here to assist you with shopping that's both simple
            and budget-friendly, all while ensuring you don't sacrifice style,
            quality, or variety. Whether you're preparing for weddings or family
            gatherings, our carefully selected collections for men, women, and
            kids are tailored to create cohesive looks at incredible prices.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl w-full px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-left">Help & Support</h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left bg-white text-base font-medium text-gray-900 cursor-pointer focus:outline-none hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="pr-4">{faq.question}</span>
                <ChevronDown
                  className={`flex-shrink-0 w-5 h-5 text-gray-900 transition-transform duration-300 ${openFAQIndex === index ? "rotate-180" : ""
                    }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openFAQIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                  }`}
              >
                {openFAQIndex === index && (
                  <div className="px-6 pb-4 pt-2 border-t border-gray-100">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <div className="w-full bg-white py-12 px-6 flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-3">
          Need Personal Help?
        </h2>
        <p className="text-base text-gray-600 text-center max-w-2xl mb-10">
          Our expert team is here to help you succeed. Get personalized support
          in your preferred language.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Call Us */}
          <div className="flex flex-col items-start p-6 bg-white border border-gray-200 rounded-lg">
            <Phone className="w-6 h-6 text-gray-900 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Call Us</h3>
            <p className="text-sm text-gray-600 mb-4">
              Call us at +1-555-123-4567
            </p>
            <button className="w-full py-2.5 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors">
              Call Us
            </button>
          </div>

          {/* Chat With Us */}
          <div className="flex flex-col items-start p-6 bg-white border border-gray-200 rounded-lg">
            <MessageCircle className="w-6 h-6 text-gray-900 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Chat with Us
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Our Expert Will Connect with you to Assist
            </p>
            <button className="w-full py-2.5 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors">
              Chat Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
