// components/navbar/Navbar.jsx
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import SearchDropdown from "./SearchDropdown";
import MobileMenu from "./MobileMenu";
import NavIcons from "./NavIcons";
import {mainlogo} from "../../../assets"
import navItems from "../../../static/navbar/navItems";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../../pages/b2c/login/loginModel";
import { useAuth } from "../../../context/AuthContext";


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
  const wishlistCount = 3;
  const cartCount = 5;
 
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
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-4">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden">
              <FaBars className="text-2xl" />
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
              // onWishlist={() => guard("/wishlist")}
              // onCart={() => guard("/cart")}
              // onProfile={() => guard("/profile")} 
              onWishlist={() => console.log("hey wishlist")}
              onCart={() => console.log("hey cart")}
              onProfile={() => console.log("hey profile")} 
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex justify-center gap-8 py-3 text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.label}
                // onClick={() => navigate(item.path)}
                 onClick={() => navigate("/womenwear")}
                className={item.isHighlight ? "text-primary" : "text-[#2C2C2C] hover:text-black"}
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
