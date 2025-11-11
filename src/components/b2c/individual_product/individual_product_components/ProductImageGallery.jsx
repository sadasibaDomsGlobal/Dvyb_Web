import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductImageGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => setImageError(true);

  // ✅ Helper for mobile version
  const MobileImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goPrev = () => {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const goNext = () => {
      setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    if (!images.length) return null;

    return (
      <div className="relative w-full h-[400px] flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
        {/* Main image */}
        <img
          src={images[currentIndex]}
          alt={`Product ${currentIndex}`}
          className="w-full h-full object-cover transition-transform duration-300 border"
          onError={handleImageError}
        />

        {/* Left arrow */}
        <button
          onClick={goPrev}
          className="absolute left-3 bg-white/70 p-2 rounded-full hover:bg-white shadow-md border"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right arrow */}
        <button
          onClick={goNext}
          className="absolute right-3 bg-white/70 p-2 rounded-full hover:bg-white shadow-md border"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-3 flex gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full border ${
                i === currentIndex ? "bg-gray-800" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  // ✅ Main desktop layout (original)
  const DesktopGallery = () => (
    <div
      className="hidden md:flex items-start justify-start gap-1"
      style={{ width: "440px", height: "510px" }}
    >
      {/* Thumbnails */}
      <div className="flex flex-col gap-2 overflow-y-auto h-full w-[80px]">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`w-[70px] h-[90px] bg-gray-200 rounded-md overflow-hidden border ${
              selectedImage === img ? "border-gray-50" : "border-transparent"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${index}`}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex items-center justify-center w-[350px] h-full rounded-md bg-gray-200 overflow-hidden">
        {imageError ? (
          <div className="text-gray-400 text-sm">Image not available</div>
        ) : (
          <img
            src={selectedImage}
            alt="Product"
            className="w-full h-full border border-gray-100 object-cover transition-transform duration-300 hover:scale-105"
            onError={handleImageError}
          />
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile layout */}
      <div className="block md:hidden w-full">
        <MobileImageSlider />
      </div>

      {/* Desktop layout */}
      <DesktopGallery />
    </>
  );
};

export default ProductImageGallery;
