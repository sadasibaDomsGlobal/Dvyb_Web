import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import SidebarHeader from "./SidebarHeader";
import SidebarCategories from "./SidebarCategories";
import SidebarProducts from "./SidebarProducts";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2.5 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto z-40 
          w-72 sm:w-80 bg-white rounded-r-2xl lg:rounded-none 
          border-r border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)]
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full p-5 space-y-6">
          <SidebarHeader />
          <SidebarCategories />
          <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <SidebarProducts />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
