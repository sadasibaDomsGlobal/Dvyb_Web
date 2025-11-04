import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faCommentDots, faChevronDown } from "@fortawesome/free-solid-svg-icons"; // Font Awesome icons

const FaqPage = () => {
  const faqs = [
    {
      question: "Can I modify my delivery address?",
      answer:
        "Yes, you can modify your delivery address before the order is shipped. Please contact our customer support immediately with your order ID and the new address.",
    },
    {
      question: "What is COD (Cash On Delivery)? Are there any additional charges for COD orders?",
      answer:
        "Cash On Delivery allows you to pay for your order at the time of delivery. There might be a small convenience fee for COD orders, which will be clearly displayed during checkout.",
    },
    {
      question: "Can I open and check the contents of my package before accepting delivery?",
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
    <div className="w-full flex flex-col items-center bg-white text-gray-900 font-sans">
      <div className="w-full h-[80px] bg-transparent" />

      <section className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="w-full flex justify-center order-2 md:order-1">
          <img
            src="https://i.pinimg.com/736x/fd/c6/e4/fdc6e4125a9f0297355d78797fd30d47.jpg"
            alt="Customer support banner"
            className="rounded-xl shadow-lg object-cover w-full h-auto max-w-[450px]"
          />
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-2">
          <div className="mb-6">
            <svg
              width="60"
              height="60"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 0C22.386 0 0 22.386 0 50C0 77.614 22.386 100 50 100C77.614 100 100 77.614 100 50C100 22.386 77.614 0 50 0ZM50 10C72.091 10 90 27.909 90 50C90 72.091 72.091 90 50 90C27.909 90 10 72.091 10 50C10 27.909 27.909 10 50 10ZM50 30C39.585 30 31 39.066 31 50.32C31 61.218 39.585 70.32 50 70.32C60.415 70.32 69 61.218 69 50.32C69 39.066 60.415 30 50 30ZM50 40C54.97 40 59 44.03 59 49C59 53.97 54.97 58 50 58C45.03 58 41 53.97 41 49C41 44.03 45.03 40 50 40Z"
                fill="#A52A2A"
              />{" "}
              {/* Example color */}
            </svg>
            <h3 className="text-2xl font-semibold text-red-700 mt-2">DVYB</h3>
          </div>

          <p className="text-xl leading-relaxed text-gray-700 max-w-lg">
            At DVYB, we're here to assist you with shopping that's both simple and budget-friendly,
            all while ensuring you don't sacrifice style, quality, or variety. Whether you're
            preparing for weddings or family gatherings, our carefully selected collections for men,
            women, and kids are tailored to create cohesive looks at incredible prices.
          </p>
        </div>
      </section>

      <section className="max-w-4xl w-full px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-left">Help & Support</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ease-in-out bg-white"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left bg-white text-base font-semibold text-gray-800 focus:outline-none" // Decreased padding and font size
                onClick={() => toggleFAQ(index)}
              >
                <span className="pr-4">{faq.question}</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`flex-shrink-0 w-4 h-4 text-red-700 transition-transform duration-300 ${openFAQIndex === index ? "rotate-180" : ""}`} // Used red color for arrow
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openFAQIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
                style={{
                  maxHeight: openFAQIndex === index ? "500px" : "0px",
                  padding: openFAQIndex === index ? "0px 1.5rem 1.5rem 1.5rem" : "0 1.5rem",
                }}
              >
                <p className="text-gray-600 text-sm leading-relaxed pt-1 border-t border-gray-100 mt-2">
                  {" "}
                  {/* Smaller font size for answer */}
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full bg-white py-16 px-4 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          Need Personal Help?
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-2xl mb-12">
          Our expert team is here to help you succeed. Get personalized support in your preferred
          language.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="flex flex-col items-start p-6 md:p-8 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <FontAwesomeIcon icon={faPhoneAlt} className="text-2xl text-gray-800 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-blue-600 text-base mb-6">Call us at +1-855-223-4567</p>
            <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-base font-medium text-gray-800 hover:bg-gray-50 transition duration-300">
              Call Us
            </button>
          </div>

          <div className="flex flex-col items-start p-6 md:p-8 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <FontAwesomeIcon icon={faCommentDots} className="text-2xl text-gray-800 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat with Us</h3>
            <p className="text-gray-600 text-base mb-6">
              Our expert will connect with you to assist
            </p>
            <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-base font-medium text-gray-800 hover:bg-gray-50 transition duration-300">
              Chat Us
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-[80px] bg-transparent border-t border-gray-200" />
    </div>
  );
};

export default FaqPage;
