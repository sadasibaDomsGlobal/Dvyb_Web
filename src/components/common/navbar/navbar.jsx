// components/navbar/Navbar.jsx
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import SearchDropdown from "./SearchDropdown";
import NavIcons from "./navIcons";
import {mainlogo} from "../../../assets"
import navItems from "../../../static/navbar/navItems";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../../pages/b2c/login/loginModel";
import { useAuth } from "../../../context/AuthContext";
import { MdOutlineArrowDropDown } from "react-icons/md";
import MobileMenu from "./mobileMenu";


export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate()

  
  const guard = (path) => {
    if (!loading && !user) {
      setShowLogin(true);
    } else {
      navigate(path);
    }
  };

  const isLoggedIn = true;
  const wishlistCount = 0;
  const cartCount = 0;
 
  return (
    <header className="sticky top-0 z-50 bg-white">
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
        <div class=" flex items-center bg-[#e6e6e6] h-10 px-5 gap-10 font-poppins ">
  <span class="text-[12px] font-medium tracking-wider cursor-pointer hover:underline">
    CATEGORIES
  </span>
  <span class="text-[12px] font-medium tracking-wider cursor-pointer hover:underline">
    VIRTUAL TRYON
  </span>
</div>

          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-4">
            
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden flex items-center gap-1 font-medium text-gray-800">
              {/* <FaBars className="text-2xl" /> */}
              WOMEN <MdOutlineArrowDropDown className="text-xl" />
            </button>

            <div className="flex-1 flex justify-center"
            onClick={()=> navigate("/") }
            >
              <img src={mainlogo} alt="Logo"  className="h-14 md:h-18 lg:h-20 cursor-pointer transition-all duration-200" onClick={() => navigate("/")} />
            </div>

            <NavIcons
              wishlistCount={wishlistCount}
              cartCount={cartCount}
              onSearch={() => setSearchOpen(true)}
              onWishlist={() => guard("/wishlist")}
              onCart={() => guard("/cart")}
              onProfile={() => guard("/profile")} 
              // onWishlist={() => console.log("hey wishlist")}
              // onCart={() => console.log("hey cart")}
              // onProfile={() => console.log("hey profile")} 
            />
          </div>

          {/* Desktop Nav */}
          <nav className="flex text-[8px] sm:text-sm md:text-base gap-2 sm:gap-5 md:gap-6 px-4 sm:px-8 md:px-12 overflow-x-auto scrollbar-none hide-scrollbar  justify-start sm:justify-center py-2 sm:py-3 font-medium whitespace-nowrap">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                // onClick={() => navigate("/womenwear")}
                className={`${item.isHighlight ? "text-primary" : "text-[#2C2C2C] hover:text-black"} transition-colors duration-200`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          {showLogin && (
        <LoginModal
          isOpen={true}
          onClose={() => setShowLogin(false)}
        />
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
