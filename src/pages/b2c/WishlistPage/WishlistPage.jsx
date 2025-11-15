import React, { useState, useEffect } from 'react';
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  isInWishlist,
  toggleWishlist,
  subscribeToWishlist,
  clearWishlist
} from '../../../services/WishlistService';
import { cartService } from '../../../services/cartService';
import { toast } from "react-toastify";
import { Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { usePopup } from '../../../context/ToastPopupContext'; 
import b2clogo from "../../../assets/Navbar/B2cLogo.png"
import empty_wishlistIc from '../../../assets/ProfileImages/empty_wishlistIc.png'


// Wishlist Button Component
const WishlistButton = ({ productId, productData, className = "" }) => {
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkWishlistStatus();
  }, [productId]);

  const checkWishlistStatus = async () => {
    try {
      const status = await isInWishlist(productId);
      setInWishlist(status);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  };

  const handleToggleWishlist = async () => {
    setLoading(true);
    try {
      const result = await toggleWishlist(productId, productData);
      setInWishlist(result.inWishlist);
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      alert('Failed to update wishlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={loading}
      className={`wishlist-btn ${inWishlist ? 'in-wishlist' : ''} ${className}`}
      style={{
        background: inWishlist ? '#ff4757' : '#ddd',
        color: inWishlist ? 'white' : '#333',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1
      }}
    >
      {loading ? '...' : inWishlist ? '❤️ Remove' : '🤍 Add to Wishlist'}
    </button>
  );
};

// Main Wishlist Page Component
const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Safe access to usePopup - fallback if not available
  let showPopup = null;
  try {
    const popupContext = usePopup();
    showPopup = popupContext?.showPopup;
  } catch (err) {
    console.warn('usePopup context not available:', err);
  }

  useEffect(() => {
    let unsubscribe = null;

    // Subscribe to real-time wishlist updates
    const setupSubscription = async () => {
      try {
        unsubscribe = await subscribeToWishlist((items) => {
          setWishlistItems(items);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error setting up wishlist subscription:', error);
        setLoading(false);
      }
    };

    setupSubscription();

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromWishlist(productId);
      toast.success('Item removed from wishlist');
      // Real-time listener will automatically update the list
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item. Please try again.');
    }
  };

  const handleClearWishlist = async () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      try {
        await clearWishlist();
        toast.success('Wishlist cleared');
        // Real-time listener will automatically update the list
      } catch (error) {
        console.error('Error clearing wishlist:', error);
        toast.error('Failed to clear wishlist. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading your wishlist...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <img
          src={b2clogo}
          alt="logo"
          className="h-6 object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />
        <h1 className="text-2xl tracking-wide font-semibold text-gray-900">
          My Wishlist Items <span className="text-gray-500">({wishlistItems.length})</span>
        </h1>
      </div>

      {/* Empty Wishlist UI */}
      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="h-[400px] w-[800px] flex items-center justify-center rounded-full">
            <img src={empty_wishlistIc} className='object-cover h-auto w-auto' alt="Empty wishlist" />
          </div>

          <p className="text-lg font-semibold text-gray-800 mt-12">Your Wishlist is Empty</p>
          <p className="text-sm font-medium text-gray-700 mt-3 mb-6">Start adding your favorites</p>

          <Link
            to="/products"
            className="px-6 py-2 border border-double border-gray-400 text-gray-900 hover:bg-gray-900 hover:text-white transition text-sm font-medium"
          >
            CONTINUE SHOPPING
          </Link>

          {/* Trending section */}
          <div className="w-full mt-20">
            <h2 className="text-base font-semibold tracking-wide text-gray-900 mb-6">TRENDING PRODUCTS</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border rounded-md overflow-hidden">
                  <div className="w-full h-64 bg-gray-100" />
                  <div className="p-3">
                    <p className="text-sm text-gray-700 font-medium">Sample Product</p>
                    <p className="text-sm text-gray-900 font-semibold mt-1">₹12345</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Wishlist Grid UI */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlistItems.map((item) => (
            <div key={item.productId} className="group h-[448px] w-[219px] overflow-hidden hover:shadow-md transition">
              {/* Image */}
              <Link to={`/products/${item.productId}`}>
                <img
                  src={item.image || item.imageUrls?.[0]}
                  alt={item.name}
                  className="w-full h-[322px] object-cover"
                />
              </Link>

              {/* Details */}
              <div>
                <p className="text-sm w-1/2 mt-1 text-gray-900 font-medium truncate">{item.name}</p>
                <p className='text-xs line-clamp-2 text-gray-600 mt-1'>{item.description}</p>
                <p className="text-sm text-gray-600 mt-1">₹{item.price?.toLocaleString("en-IN")}</p>

                <button
                  onClick={() => handleRemoveItem(item.productId)}
                  className="mt-1.5 h-[27px] text-center font-semibold cursor-pointer w-[219px] bg-[#D9D9D9] text-gray-900 text-sm hover:bg-gray-700 hover:text-white transition"
                >
                  REMOVE FROM WISHLIST
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Example usage in a product component
const ProductCard = ({ product }) => {
  // Safe access to usePopup
  let showPopup = null;
  try {
    const popupContext = usePopup();
    showPopup = popupContext?.showPopup;
  } catch (err) {
    console.warn('usePopup context not available:', err);
  }

  return (
    <div className="product-card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
      <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <h3>{product.name}</h3>
      <p>Color: {product.color} | Size: {product.size}</p>
      <p><strong>₹{product.price}</strong></p>

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button style={{ flex: 1, padding: '10px', background: '#2ed573', color: 'white', border: 'none', borderRadius: '4px' }}>
          Add to Cart
        </button>
        <WishlistButton
          productId={product.id}
          productData={{
            name: product.name,
            price: product.price,
            color: product.color,
            size: product.size,
            image: product.image
          }}
        />
      </div>
    </div>
  );
};

export { WishlistButton, WishlistPage, ProductCard };