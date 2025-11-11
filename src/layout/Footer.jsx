import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div>
                    <h3 className="text-2xl font-bold text-teal-400 mb-4">DVYB</h3>
                    <p className="text-sm text-gray-400">
                        Premium ethnic wear for the modern woman.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-semibold mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-teal-400 transition">Home</a></li>
                        <li><a href="#" className="hover:text-teal-400 transition">Sarees</a></li>
                        <li><a href="#" className="hover:text-teal-400 transition">Kurtas</a></li>
                        <li><a href="#" className="hover:text-teal-400 transition">About</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-semibold mb-3">Contact Us</h4>
                    <div className="space-y-2 text-sm text-gray-400">
                        <p className="flex items-center gap-2">
                            <Mail size={16} /> support@dvyb.com
                        </p>
                        <p className="flex items-center gap-2">
                            <Phone size={16} /> +91 98765 43210
                        </p>
                        <p className="flex items-center gap-2">
                            <MapPin size={16} /> Mumbai, India
                        </p>
                    </div>
                </div>

                {/* Social */}
                <div>
                    <h4 className="font-semibold mb-3">Follow Us</h4>
                    <div className="flex space-x-3">
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-teal-600 transition">
                            <Instagram size={18} />
                        </a>
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-teal-600 transition">
                            <Facebook size={18} />
                        </a>
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-teal-600 transition">
                            <Twitter size={18} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
                © 2025 DVYB. All rights reserved. | For testing only.
            </div>
        </footer>
    );
};

export default Footer;