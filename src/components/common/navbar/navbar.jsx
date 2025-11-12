// components/navbar/Navbar.jsx
import { useState } from "react";
import SearchDropdown from "./SearchDropdown";
import NavIcons from "./navIcons";
import { mainlogo } from "../../../assets";
import navItems from "../../../static/navbar/navItems";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../../pages/b2c/login/loginModel";
import { useAuth } from "../../../context/AuthContext";
import { MdOutlineArrowDropDown } from "react-icons/md";
import MobileMenu from "./mobileMenu";
import { useFilter } from "../../../context/FilterContext";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, loading, signOutUser } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  // Filter context
  const { updateFilter, selectedFilters } = useFilter();

  const guard = (path) => {
    if (!loading && !user) {
      setShowLogin(true);
    } else {
      navigate(path);
    }
  };

  // Handle navbar item click
  const handleNavItemClick = (item) => {
    const label = item.label;

    // Map label to display name (used in filter)
    const labelToFilterValue = {
      'SAREE': 'SAREE',
      'KURTA SETS': 'KURTA SETS',
      'ANARKALIS': 'ANARKALIS',
      'SHARARAS': 'SHARARAS',
      'PRÊT': 'PRET',
      'FUSION': 'FUSION',
      'WEDDING': 'WEDDING',
      'SALE': 'SALE',
      '1970': 'VIRTUAL TRYON',
      'LEHANGA': 'LEHANGA',
    };

    const filterValue = labelToFilterValue[label] || label;

    // Special case: Virtual Tryon
    if (item.path === '/virtual-tryon') {
      navigate(item.path);
      return;
    }

    // Update filter + navigate
    updateFilter('categories', filterValue);
    navigate(item.path); // e.g. /womenwear?category=lehenga
  };

  const wishlistCount = 0;
  const cartCount = 0;

  // Check if current category is active
  const isActive = (item) => {
    if (item.path === '/virtual-tryon') return false;
    const param = new URLSearchParams(window.location.search).get('category');
    const map = {
      'saree': 'SAREE',
      'kurta-sets': 'KURTA SETS',
      'anarkalis': 'ANARKALIS',
      'shararas': 'SHARARAS',
      'pret': 'PRET',
      'fusion': 'FUSION',
      'wedding': 'WEDDING',
      'sale': 'SALE',
      'lehenga': 'LEHANGA',
    };
    return map[param] === item.label;
  };

  return (
    <header className="sticky top-0 z-50 bg-white mb-20">
      {searchOpen ? (
        <SearchDropdown
          searchQuery={searchQuery}
          onClose={() => {
            setSearchOpen(false);
            setSearchQuery("");
          }}
        />
      ) : (
        <>
          <div className="flex items-center bg-[#e6e6e6] h-10 px-5 gap-10 font-poppins">
            <span className="text-[12px] font-medium tracking-wider cursor-pointer hover:underline">
              CATEGORIES
            </span>
            <span className="text-[12px] font-medium tracking-wider cursor-pointer hover:underline">
              VIRTUAL TRYON
            </span>
          </div>

          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden flex items-center gap-1 font-medium text-gray-800"
            >
              WOMEN <MdOutlineArrowDropDown className="text-xl" />
            </button>

            <div className="flex-1 flex justify-center cursor-pointer" onClick={() => navigate("/")}>
              <img
                src={mainlogo}
                alt="Logo"
                className="h-14 md:h-18 lg:h-20 transition-all duration-200"
              />
            </div>

            <NavIcons
              wishlistCount={wishlistCount}
              cartCount={cartCount}
              onSearch={() => setSearchOpen(true)}
              onWishlist={() => navigate("/wishlist")}
              onCart={() => guard("/cart")}
              onProfile={() => guard("/profile")}
            />

            {/* Logout */}
            {user && !loading && (
              <button
                onClick={() => {
                  signOutUser();
                  navigate("/");
                }}
                className="ml-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-gray-700" />
              </button>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="flex text-[8px] sm:text-sm md:text-base gap-2 sm:gap-5 md:gap-6 px-4 sm:px-8 md:px-12 overflow-x-auto scrollbar-none hide-scrollbar justify-start sm:justify-center py-2 sm:py-3 font-medium whitespace-nowrap">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavItemClick(item)}
                className={`
                  ${isActive(item) ? "text-primary font-bold" : ""}
                  ${item.isHighlight ? "text-primary" : "text-[#2C2C2C] hover:text-black"}
                  transition-colors duration-200
                `}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {showLogin && (
            <LoginModal isOpen={true} onClose={() => setShowLogin(false)} />
          )}
        </>
      )}

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        onNavClick={navigate}
        onProtectedClick={guard}
      />
    </header>
  );
}