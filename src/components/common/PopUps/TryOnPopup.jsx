import React, { useState } from 'react';
import Model from "../../../assets/B2C/images/Popups/Model.svg"
import { X, Copy, Check, MessageCircle, Mail, Instagram, Share2, Facebook, Send } from 'lucide-react';

export default function ShareModal() {
  const [copied, setCopied] = useState(false);
  const shareUrl = "http://www.adc.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialPlatforms = [
    { name: 'WhatsApp', color: 'bg-green-500', Icon: MessageCircle },
    { name: 'Gmail', color: 'bg-red-500', Icon: Mail },
    { name: 'Instagram', color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400', Icon: Instagram },
    { name: 'Quickshare', color: 'bg-blue-500', Icon: Share2 },
    { name: 'Facebook', color: 'bg-blue-600', Icon: Facebook },
    { name: 'Telegram', color: 'bg-sky-500', Icon: Send },
    { name: 'Snapchat', color: 'bg-yellow-400', Icon: MessageCircle }
  ];

  return (
    <div className="min-h-screen bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="relative p-6 pb-4 text-center border-b">
          <button className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
          <h2 className="text-xl font-semibold tracking-wide mb-1">
            SHARE YOUR LOOK WITH FRIENDS
          </h2>
          <p className="text-sm text-gray-600">
            Good things are better<br />when shared
          </p>
        </div>

        {/* Product Image */}
        <div className="p-6 flex justify-center">
          <div className="relative w-56 h-80 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={Model} 
              alt="Fashion look"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Share Link */}
        <div className="px-6 pb-4">
          <label className="block text-sm font-medium mb-2">Share link</label>
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-3">
            <input 
              type="text" 
              value={shareUrl}
              readOnly
              className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
            />
            <button 
              onClick={handleCopy}
              className="p-1.5 hover:bg-gray-200 rounded transition-colors"
            >
              {copied ? (
                <Check size={18} className="text-green-600" />
              ) : (
                <Copy size={18} className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500 font-medium">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="px-2 pb-3">
          <div className="grid grid-cols-4 gap-2sm:flex sm:justify-center sm:gap-6">
            {socialPlatforms.map((platform) => (
              <button
                key={platform.name}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`w-14 h-14 rounded-full ${platform.color} flex items-center justify-center shadow-md transform transition-transform group-hover:scale-110`}>
                  <platform.Icon className="text-white" size={23} strokeWidth={1} />
                </div>
                <span className="text-xs text-gray-700 font-medium">
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