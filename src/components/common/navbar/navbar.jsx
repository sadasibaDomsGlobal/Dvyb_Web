// components/navbar/Navbar.jsx
import { useState, useEffect } from "react";
import SearchDropdown from "./SearchDropdown";
import MobileMenu from "./MobileMenu";
import NavIcons from "./NavIcons";
import {mainlogo} from "../../../assets"
import navItems from "../../../static/navbar/navItems";
import { useNavigate } from "react-router-dom";
import LoginModal from "../../../pages/b2c/login/loginModel";
import { useAuth } from "../../../context/AuthContext";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useFilter } from "../../../context/FilterContext";


export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, loading, signOutUser  } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  // Add filter context
  const { setCategoryFromNavbar } = useFilter();

  
  const guard = (path) => {
    if (!loading && !user) {
      setShowLogin(true);
    } else {
      navigate(path);
    }
  };

  // Handle navbar item click
  const handleNavItemClick = (itemLabel) => {
    // Map navbar labels to filter categories
    const categoryMap = {
      'LEHANGA': 'Lehenga',
      'SAREE': 'Saree',
      'KURTA SETS': 'Kurta Sets',
      'ANARKALIS': 'Anarkali',
      'SHARARAS': 'Sharara',
      'PRET': 'Pret',
      'FUSION': 'Fusion',
      'WEDDING': 'Wedding',
      'SALE': 'Sale',
      'VIRTUAL TRYON': 'Virtual Try On'
    };
    const category = categoryMap[itemLabel] || itemLabel;
    
    // Set the category in filter context
    setCategoryFromNavbar(category);
    
    // Navigate to products page
    navigate("/womenwear");
  }


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

            <div className="flex-1 cursor-pointer flex justify-center"
            onClick={()=> navigate("/") }
            >
              <img src={mainlogo} alt="Logo"  className="h-14 md:h-18 lg:h-20 cursor-pointer transition-all duration-200" onClick={() => navigate("/")} />
            </div>

            <NavIcons 
              wishlistCount={wishlistCount}
              cartCount={cartCount}
              onSearch={() => setSearchOpen(true)}
              onWishlist={() => navigate("/wishlist")}
              onCart={() => guard("/cart")}
              onProfile={() => guard("/profile")}

              // onWishlist={() => console.log("hey wishlist")}
              // onCart={() => console.log("hey cart")}
              // onProfile={() => console.log("hey profile")} 
            />
            {/* Logout button visible only if logged in */}
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
          <nav className="flex text-[8px] sm:text-sm md:text-base gap-2 sm:gap-5 md:gap-6 px-4 sm:px-8 md:px-12 overflow-x-auto scrollbar-none hide-scrollbar  justify-start sm:justify-center py-2 sm:py-3 font-medium whitespace-nowrap">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavItemClick(item.label)}
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