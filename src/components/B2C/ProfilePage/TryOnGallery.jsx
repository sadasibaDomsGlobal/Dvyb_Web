import React, { useState } from 'react';
import { Share2, ShoppingCart, Download, X, Loader2, ArrowLeft, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserTryons } from '../../../hooks/useUserTryons';
import { addToCart } from '../../../services/cartService'; 
import { deleteTryOn } from '../../../services/tryOnService'; 
import { usePopup } from '../../../context/ToastPopupContext';
import { useAuth } from '../../../context/AuthContext'; 
import toast from 'react-hot-toast';

const TryOnGalleryCard = ({ item, onShare, onAddToCart, onDelete }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Debug: Log the image URL
  console.log('Try-on image URL:', item.tryOnImage);

  const formattedDate = item.createdAt
    ? new Date(item.createdAt.seconds * 1000).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    : 'Unknown date';

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this try-on?')) {
      setIsDeleting(true);
      await onDelete(item.id);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 relative group">
      {/* Delete Button - Hidden */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="absolute top-2 right-2 z-10 hidden"
        title="Delete try-on"
      >
        {isDeleting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : null}
      </button>

      {/* Image Container */}
      <div className="relative bg-[#D4B89C] aspect-[3/4] overflow-hidden">
        {/* Loading Spinner - Only show when loading and no error */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            <p className="text-xs text-gray-500 mt-2">Loading...</p>
          </div>
        )}
        
        {/* Error State */}
        {imageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
            <p className="text-xs text-red-500">Failed to load image</p>
            <p className="text-xs text-gray-400 mt-1">Check console</p>
          </div>
        )}

        <img
          src={item.tryOnImage || item.garmentImage || 'https://via.placeholder.com/400x600?text=No+Image'}
          alt={item.productName}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => {
            console.log('✅ Image loaded successfully:', item.tryOnImage);
            setImageLoaded(true);
            setImageError(false);
          }}
          onError={(e) => {
            console.error('❌ Image load error for:', item.tryOnImage);
            console.error('Full item data:', item);
            setImageError(true);
            setImageLoaded(true); // Stop loading spinner
            
            // Fallback to garment image if try-on image fails
            if (item.garmentImage && e.target.src !== item.garmentImage) {
              console.log('Trying fallback to garmentImage:', item.garmentImage);
              e.target.src = item.garmentImage;
            } else {
              e.target.src = 'https://via.placeholder.com/400x600?text=Image+Not+Available';
            }
          }}
          crossOrigin="anonymous" // Add this if images are from external domain
        />

        {/* Video Icon for 3D - Bottom Right */}
        {item.videoUrl && (
          <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs flex items-center gap-1">
            🎥 Video
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand/Designer Name */}
        {item.garmentName && (
          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
            {item.garmentName}
          </p>
        )}
        
        {/* Product Name */}
        <h3 className="font-normal text-gray-900 text-sm mb-2 line-clamp-2 leading-snug">
          {item.productName || 'Product'}
        </h3>
        
        {/* Try-on Date */}
        <p className="text-xs text-gray-500 mb-4">
          Tried On {formattedDate}
        </p>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => onAddToCart(item)}
            className="w-full bg-white border text-primary hover:bg-hoverBg cursor-pointer border-gray-300 hover:text-white font-medium py-2.5 text-sm transition-all duration-200 flex items-center justify-center gap-2"
          >
            ADD TO CART
          </button>
          <button
            onClick={() => onShare(item)}
            className="w-full bg-[#8B1A1A] cursor-pointer hover:bg-[#6d1515] text-white font-medium py-2.5 text-sm transition-all duration-200 flex items-center justify-center gap-2"
          >
            SHARE YOUR LOOK
          </button>
        </div>
      </div>
    </div>
  );
};
const ShareModal = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  const shareOptions = [
    { name: 'Save', icon: Download, color: 'bg-gray-600' },
    { name: 'Messages', icon: Share2, color: 'bg-blue-500' },
    { name: 'WhatsApp', icon: Share2, color: 'bg-green-500' },
    { name: 'LinkedIn', icon: Share2, color: 'bg-blue-700' }
  ];

  const handleShare = async (platform) => {
    if (platform === 'Save') {
      try {
        const link = document.createElement('a');
        link.href = item.tryOnImage;
        link.download = `tryon-${item.productName || 'image'}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Image downloaded!');
      } catch (error) {
        console.error('Download error:', error);
        toast.error('Failed to download image');
      }
    } else {
      if (navigator.share) {
        try {
          await navigator.share({
            title: `Check out my try-on: ${item.productName}`,
            text: `I tried on ${item.productName} virtually!`,
            url: window.location.href
          });
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.log('Share error:', err);
          }
        }
      } else {
        toast.error('Sharing not supported on this device');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold mb-6">Share Look</h3>

        <div className="mb-6">
          <img
            src={item.tryOnImage}
            alt={item.productName}
            className="w-32 h-44 mx-auto object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {shareOptions.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleShare(option.name)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`${option.color} text-white p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-lg`}>
                <option.icon className="w-6 h-6" />
              </div>
              <span className="text-xs text-gray-700 font-medium">
                {option.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function TryOnGallery() {
  const navigate = useNavigate();
  const { tryons, loading, error } = useUserTryons();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { showPopup } = usePopup();
  const { user } = useAuth();

    console.log('Total tryons:', tryons.length);
  console.log('First tryon data:', tryons[0]);

  const handleShare = (item) => {
    setSelectedItem(item);
    setShareModalOpen(true);
  };

 const handleAddToCart = async (item) => {
  if (!user) {
    toast.error("Please log in to add items to cart!");
    return;
  }

  try {
    const productData = {
      name: item.productName,
      title: item.productName,
      price: parseFloat(item.price) || 0,
      size: item.selectedSizes?.[0] || 'Free Size',
      color: item.selectedColors?.[0] || '',
      image: item.garmentImage,  // 🔥 Use original garment image
      imageUrls: [item.garmentImage, item.tryOnImage].filter(Boolean), // 🔥 Original first, then try-on
      selectedColors: item.selectedColors || [],
      selectedSizes: item.selectedSizes || [],
      fabric: item.fabric || '',
      description: '',
      subtotal: parseFloat(item.price) || 0,
      discount: item.discount || 0,
      fromTryOnGallery: true, // 🔥 Flag to indicate this came from gallery
      tryOnData: {
        tryOnImage: item.tryOnImage,
        originalImage: item.garmentImage,
        viewMode: item.viewMode,
        videoUrl: item.videoUrl
      }
    };

    await addToCart(item.productId, productData, 1);
    
    showPopup("cart", {
      title: item.productName,
      image: item.garmentImage, // 🔥 Show original garment image in popup
    });

    toast.success(`${item.productName} added to cart!`);
  } catch (error) {
    console.error("Add to cart error:", error);
    toast.error("Failed to add item to cart.");
  }
};

  const handleDelete = async (tryOnId) => {
    try {
      await deleteTryOn(tryOnId);
      toast.success('Try-on deleted successfully!');
      window.location.reload(); // Simple reload to refresh data
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete try-on');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your try-ons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!tryons.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">👗</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Try-Ons Yet
          </h2>
          <p className="text-gray-600 mb-6">
            Start trying on outfits to see them here!
          </p>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            My Try-On Gallery
          </h1>
          <p className="text-gray-600">
            All your virtual try-ons in one place ({tryons.length} {tryons.length === 1 ? 'item' : 'items'})
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tryons.map((item) => (
            <TryOnGalleryCard
              key={item.id}
              item={item}
              onShare={handleShare}
              onAddToCart={handleAddToCart}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        item={selectedItem}
      />
    </div>
  );
}