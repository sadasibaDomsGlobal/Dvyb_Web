import React, { useState } from 'react';
import img from "../../../assets/B2C/images/Popups/Productshare.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCopy,
  faCheck,
  faTimes,
  faEnvelope,
  faShareAlt,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import {
  faWhatsapp,
  faInstagram,
  faFacebook,
  faSnapchat,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons';

export default function ShareCart() {
  const [copied, setCopied] = useState(false);
  const shareUrl = "http://www.adc.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialPlatforms = [
    { name: 'WhatsApp', color: 'bg-green-500', icon: faWhatsapp },
    { name: 'Gmail', color: 'bg-red-500', icon: faEnvelope },
    { name: 'Instagram', color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400', icon: faInstagram },
    { name: 'Quickshare', color: 'bg-blue-500', icon: faShareAlt },
    { name: 'Facebook', color: 'bg-blue-600', icon: faFacebook },
    { name: 'Telegram', color: 'bg-sky-500', icon: faTelegram },
    { name: 'Snapchat', color: 'bg-yellow-400', icon: faSnapchat }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl shadow-lg rounded-xl overflow-hidden">
        {/* Header */}
        <div className="p-8 pb-6 text-center border-b border-gray-200 relative">
          <button
            className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
          <h2 className="text-2xl font-semibold tracking-wider mb-2">
            SHARE YOUR CART
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Share and shop together
          </p>
        </div>

        {/* Share Link Section */}
        <div className="p-8 pb-6">
          <label className="block text-sm font-semibold mb-3">Share Product Link</label>
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded p-4">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
            />
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-200 rounded-md transition-colors flex-shrink-0"
              title="Copy link"
            >
              {copied ? (
                <FontAwesomeIcon icon={faCheck} className="text-green-600" />
              ) : (
                <FontAwesomeIcon icon={faCopy} className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="px-8 pb-6">
          <div className="flex items-center gap-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-base text-gray-600 font-medium">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="px-8 pb-10">
          <div className="flex flex-wrap justify-center gap-4">
            {socialPlatforms.map((platform) => (
              <button
                key={platform.name}
                className="flex flex-col items-center gap-3 group min-w-[70px]"
              >
                <div className={`w-10 h-10 rounded-full ${platform.color} flex items-center justify-center shadow-lg transform transition-all duration-200 group-hover:scale-110 group-hover:shadow-xl`}>
                  <FontAwesomeIcon icon={platform.icon} className="text-white" size="lg" />
                </div>
                <span className="text-xs text-gray-800 font-medium">
                  {platform.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}