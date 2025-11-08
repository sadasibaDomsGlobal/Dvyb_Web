// components/navbar/MobileMenu.jsx
import { FaTimes } from "react-icons/fa";

export default function MobileMenu({ isOpen, onClose, navItems, onNavClick, onProtectedClick }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] lg:hidden" onClick={onClose}>
      <div className="fixed inset-0 bg-black/50" />
      <div
        className="fixed top-0 left-0 w-80 max-w-full h-full bg-white shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <button onClick={onClose}>
            <FaTimes className="text-2xl text-gray-600" />
          </button>
        </div>

        <nav className="py-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onNavClick(item.path);
                onClose();
              }}
              className={`block w-full text-left px-6 py-4 font-medium transition ${
                item.isHighlight ? "text-red-600 bg-red-50" : "text-gray-800 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t mt-4 pt-4 px-6 space-y-3">
          <button onClick={() => onProtectedClick("/mywishlist")} className="flex items-center gap-3 text-gray-700">
            Wishlist
          </button>
          <button onClick={() => onProtectedClick("/mycart")} className="flex items-center gap-3 text-gray-700">
            Cart ({/* cartCount */})
          </button>
          <button onClick={() => onProtectedClick("/profile")} className="flex items-center gap-3 text-gray-700">
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}