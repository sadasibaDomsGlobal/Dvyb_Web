import { useState } from "react";
import { FaBars } from "react-icons/fa";
import SearchDropdown from "./SearchDropdown";
import MobileMenu from "./MobileMenu";
import NavIcons from "./NavIcons";
import {mainlogo} from "../../../assets"
import navItems from "../../../static/navbar/navItems";
import { useNavigate } from "react-router-dom";
import { LoginModal } from "../../../pages/B2C/login/loginModel";


export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()

  const isLoggedIn = false;
  const wishlistCount = 3;
  const cartCount = 5;

  // const navigate = (path) => console.log("Go to", path);
  const handleProtected = (path) => {
    if (!isLoggedIn) {
      setShowLogin(true);
      // alert("Please login!");
      // navigate("/login");
    } else {
      navigate(path);
    }
  };

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
              onWishlist={() => handleProtected("/wishlist")}
              onCart={() => handleProtected("/cart")}
              // onProfile={() => handleProtected("/profile")}
              onProfile={() => handleProtected(true)}
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
        </>
      )}

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        onNavClick={navigate}
        onProtectedClick={handleProtected}
      />
      
      {/* Login model used here */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </header>
  );
}






































// import React, { useState, useEffect, useRef } from "react";
// import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
// import { mainlogo } from "../../../assets";

// // Mock imports - replace with your actual imports
// const b2clogo = "https://via.placeholder.com/150x50/0C2D5B/FFFFFF?text=LOGO";
// const search_icon = "https://via.placeholder.com/24/0C2D5B/FFFFFF?text=S";
// const fav = "https://via.placeholder.com/24/0C2D5B/FFFFFF?text=♥";
// const cart = "https://via.placeholder.com/24/0C2D5B/FFFFFF?text=🛒";
// const profile = "https://via.placeholder.com/24/0C2D5B/FFFFFF?text=👤";
// const profile_ic = "https://via.placeholder.com/20/0C2D5B/FFFFFF?text=P";
// const heart_ic = "https://via.placeholder.com/20/0C2D5B/FFFFFF?text=♥";

// // Browse categories with images
// const browseCategories = [
//   { name: "NEW", img: "https://via.placeholder.com/150x200/F5F5F5/333?text=NEW" },
//   { name: "LEHENGAS", img: "https://via.placeholder.com/150x200/FFE5E5/333?text=LEHENGAS" },
//   { name: "SAREE", img: "https://via.placeholder.com/150x200/E5F5FF/333?text=SAREE" },
//   { name: "ANARKALIS", img: "https://via.placeholder.com/150x200/FFE5F5/333?text=ANARKALIS" },
//   { name: "KURTA SET", img: "https://via.placeholder.com/150x200/E5FFE5/333?text=KURTA+SET" },
//   { name: "SHARARAS", img: "https://via.placeholder.com/150x200/FFF5E5/333?text=SHARARAS" },
//   { name: "BLOUSES", img: "https://via.placeholder.com/150x200/F5E5FF/333?text=BLOUSES" },
// ];

// // Trending products mock data
// const trendingProducts = [
//   { id: 1, name: "Ivory Tissue Mirror & Zari Embroidered Lehenga Set", brand: "SUHINO", price: "₹94,900", img: "https://via.placeholder.com/300x400/FFF/333?text=Product+1" },
//   { id: 2, name: "Ivory Tissue Mirror & Zari Embroidered Lehenga Set", brand: "SUHINO", price: "₹94,900", img: "https://via.placeholder.com/300x400/FFF/333?text=Product+2" },
//   { id: 3, name: "Ivory Tissue Mirror & Zari Embroidered Lehenga Set", brand: "SUHINO", price: "₹94,900", img: "https://via.placeholder.com/300x400/FFF/333?text=Product+3" },
//   { id: 4, name: "Ivory Tissue Mirror & Zari Embroidered Lehenga Set", brand: "SUHINO", price: "₹94,900", img: "https://via.placeholder.com/300x400/FFF/333?text=Product+4" },
//   { id: 5, name: "Ivory Tissue Mirror & Zari Embroidered Lehenga Set", brand: "SUHINO", price: "₹94,900", img: "https://via.placeholder.com/300x400/FFF/333?text=Product+5" },
// ];

// const SearchDropdown = ({ searchQuery, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
//       {/* Search Header */}
//       <div className="border-b border-gray-200 py-6 px-6">
//         <div className="max-w-6xl mx-auto flex items-center gap-4">
//           <div className="flex items-center flex-1 gap-4">
//             <FaSearch className="text-gray-400 text-xl" />
//             <input
//               type="text"
//               placeholder="Search for Products and Categories"
//               value={searchQuery}
//               className="flex-1 text-base outline-none"
//               autoFocus
//             />
//           </div>
//           <button className="bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800">
//             Search
//           </button>
//           <button onClick={onClose} className="text-2xl text-gray-600 hover:text-black">
//             ×
//           </button>
//         </div>
//       </div>

//       {/* Browse Categories Section */}
//       <div className="max-w-6xl mx-auto px-6 py-8">
//         <h2 className="text-xl font-semibold mb-6">BROWSE CATEGORIES</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
//           {browseCategories.map((category, idx) => (
//             <div key={idx} className="flex flex-col items-center cursor-pointer group">
//               <div className="w-full aspect-[3/4] overflow-hidden mb-2">
//                 <img
//                   src={category.img}
//                   alt={category.name}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//               </div>
//               <span className="text-xs font-medium text-gray-800">{category.name}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Trending Products Section */}
//       <div className="max-w-6xl mx-auto px-6 py-8 border-t border-gray-200">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-semibold">TRENDING PRODUCTS</h2>
//           <button className="text-sm font-medium hover:underline">VIEW ALL</button>
//         </div>
//         <div className="relative">
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//             {trendingProducts.map((product) => (
//               <div key={product.id} className="flex flex-col cursor-pointer group">
//                 <div className="w-full aspect-[3/4] overflow-hidden mb-2 bg-gray-100">
//                   <img
//                     src={product.img}
//                     alt={product.name}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
//                 <span className="text-xs font-medium text-gray-600 mb-1">{product.brand}</span>
//                 <h3 className="text-sm text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
//                 <span className="text-sm font-semibold">{product.price}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Navbar = () => {
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
  
//   const [wishlist] = useState([1, 2]);
//   const [cartItems] = useState([1, 2, 3]);

//   const navigate = (path) => {
//     console.log("Navigate to:", path);
//   };

//   const handleProtectedClick = (callback) => {
//     if (!isLoggedIn) {
//       alert("Please log in to continue!");
//       navigate('/login');
//     } else {
//       callback();
//     }
//   };

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen((prev) => !prev);
//   };

//   const navItems = [
//     { label: "LEHANGA", path: "/products?category=lehanga" },
//     { label: "SAREE", path: "/products?category=saree" },
//     { label: "KURTA SETS", path: "/products?category=kurta-sets" },
//     { label: "ANARKALIS", path: "/products?category=anarkalis" },
//     { label: "SHARARAS", path: "/products?category=shararas" },
//     { label: "PRÊT", path: "/products?category=pret" },
//     { label: "FUSION", path: "/products?category=fusion" },
//     { label: "WEDDING", path: "/products?category=wedding" },
//     { label: "SALE", path: "/products?category=sale", isHighlight: true },
//     { label: "VIRTUAL TRYON", path: "/virtual-tryon", isHighlight: true },
//   ];

//   return (
//     <header className="relative bg-white sticky top-0 z-50 shadow-sm">
//       {searchOpen ? (
//         <SearchDropdown
//           searchQuery={searchQuery}
//           onClose={() => {
//             setSearchOpen(false);
//             setSearchQuery('');
//           }}
//         />
//       ) : (
//         <>
//           {/* Top Row */}
//           <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
//             {/* Hamburger */}
//             <div className="flex items-center lg:hidden">
//               <FaBars
//                 className="text-xl text-gray-600 cursor-pointer"
//                 onClick={toggleMobileMenu}
//               />
//             </div>
//             <div className="hidden md:block md:w-1/3"></div>
            
//             {/* Logo */}
//             <div className="flex justify-center flex-1 md:w-1/3">
//               <img
//                 src={mainlogo}
//                 alt="logo"
//                 className="h-8 sm:h-10 md:h-12 object-contain cursor-pointer"
//                 onClick={() => navigate("/")}
//               />
//             </div>
            
//             {/* Desktop Icons */}
//             <div className="flex justify-end items-center space-x-3 sm:space-x-4 md:space-x-6 md:w-1/3">
//               {/* Mobile search icon */}
//               <FaSearch
//                 className="md:hidden text-lg cursor-pointer text-gray-600 hover:text-gray-900"
//                 onClick={() => setSearchOpen(true)}
//               />
              
//               {/* Desktop Icons */}
//               <div className="hidden md:flex items-center space-x-6">
//                 {/* Search */}
//                 <FaSearch
//                   className="cursor-pointer text-gray-700 hover:text-gray-900 text-lg"
//                   onClick={() => setSearchOpen(true)}
//                 />
                
//                 {/* Wishlist with badge */}
//                 <div className="relative">
//                   <img
//                     className="cursor-pointer w-5 h-5"
//                     src={fav}
//                     alt="wishlist"
//                     onClick={() =>
//                       handleProtectedClick(() => navigate("/mywishlist"))
//                     }
//                   />
//                   {wishlist.length > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                       {wishlist.length}
//                     </span>
//                   )}
//                 </div>

//                 {/* Cart with badge */}
//                 <div className="relative">
//                   <img
//                     className="cursor-pointer w-5 h-5"
//                     src={cart}
//                     alt="cart"
//                     onClick={() =>
//                       handleProtectedClick(() => navigate("/mycart"))
//                     }
//                   />
//                   {cartItems.length > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                       {cartItems.length}
//                     </span>
//                   )}
//                 </div>

//                 {/* Profile */}
//                 <img
//                   className="cursor-pointer w-5 h-5"
//                   src={profile}
//                   alt="profile"
//                   onClick={() =>
//                     handleProtectedClick(() => navigate("/your-profile"))
//                   }
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex justify-center items-center gap-6 px-6 py-4 border-t border-gray-200 text-sm">
//             {navItems.map((item, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => navigate(item.path)}
//                 className={`font-medium tracking-wide transition-colors ${
//                   item.isHighlight
//                     ? "text-red-600 hover:text-red-700"
//                     : "text-gray-700 hover:text-gray-900"
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </nav>

//           {/* Mobile Menu */}
//           {mobileMenuOpen && (
//             <div className="fixed inset-0 z-[9999] lg:hidden">
//               <div
//                 className="fixed inset-0 bg-black bg-opacity-50"
//                 onClick={(e) => {
//                   if (e.target === e.currentTarget) {
//                     setMobileMenuOpen(false);
//                   }
//                 }}
//               >
//                 <div 
//                   className="fixed top-0 left-0 w-4/5 max-w-sm h-full bg-white shadow-lg overflow-y-auto"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   {/* Header */}
//                   <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
//                     <img src={b2clogo} alt="logo" className="h-8 object-contain" />
//                     <FaTimes
//                       className="text-xl text-gray-600 cursor-pointer"
//                       onClick={() => setMobileMenuOpen(false)}
//                     />
//                   </div>
                  
//                   {/* Menu Items */}
//                   <div className="py-2">
//                     {/* Navigation Items */}
//                     {navItems.map((item, idx) => (
//                       <button
//                         key={idx}
//                         className={`w-full px-5 py-3 text-left font-medium transition-colors ${
//                           item.isHighlight
//                             ? "text-red-600 hover:bg-red-50"
//                             : "text-gray-700 hover:bg-gray-50"
//                         }`}
//                         onClick={() => {
//                           navigate(item.path);
//                           setMobileMenuOpen(false);
//                         }}
//                       >
//                         {item.label}
//                       </button>
//                     ))}

//                     {/* Divider */}
//                     <div className="border-t border-gray-200 my-2"></div>

//                     {/* WISHLIST */}
//                     <button 
//                       className="flex items-center gap-3 w-full px-5 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
//                       onClick={() => handleProtectedClick(() => navigate("/mywishlist"))}
//                     >
//                       <img src={heart_ic} className="h-[20px]" alt="" /> 
//                       <span>WISHLIST</span>
//                     </button>

//                     {/* CART */}
//                     <button 
//                       className="flex items-center gap-3 w-full px-5 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
//                       onClick={() => handleProtectedClick(() => navigate("/mycart"))}
//                     >
//                       <img src={cart} className="h-[20px]" alt="" />
//                       <span>CART</span>
//                     </button>

//                     {/* PROFILE */}
//                     <button 
//                       className="flex items-center gap-3 w-full px-5 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
//                       onClick={() => handleProtectedClick(() => navigate("/your-profile"))}
//                     >
//                       <img src={profile_ic} className="h-[20px]" alt="" />
//                       <span>PROFILE</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </header>
//   );
// };

// export default Navbar;