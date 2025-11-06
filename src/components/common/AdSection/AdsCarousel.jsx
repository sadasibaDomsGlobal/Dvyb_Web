import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ads from './AdsImages';

const AdsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const navigate = useNavigate();

    // Auto-scroll functionality
    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === ads.length - 1 ? 0 : prevIndex + 1
        );
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? ads.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Handle ad click
    const handleAdClick = (ad) => {
        if (ad.link) {
            navigate(ad.link);
        }
    };

    // Auto-scroll effect
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 4000); // Change slide every 4 seconds

        return () => clearInterval(interval);
    }, [currentIndex, isPaused, nextSlide]);

    return (
        <div
            className="relative bg-white rounded-lg overflow-hidden shadow-lg mx-auto"
            style={{ width: '900px', height: '335px' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Main Carousel Container */}
            <div className="relative w-full h-full">
                {/* Ads Images */}
                {ads.map((ad, index) => (
                    <div
                        key={ad.id}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={ad.image}
                            alt={ad.alt}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => handleAdClick(ad)}
                        />
                    </div>
                ))}

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-10"
                    aria-label="Previous ad"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 z-10"
                    aria-label="Next ad"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Indicators/Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {ads.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentIndex
                                    ? 'bg-white scale-110'
                                    : 'bg-white/50 hover:bg-white/80'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200/50 z-10">
                    <div
                        className="h-full bg-white transition-all duration-4000 ease-linear"
                        style={{
                            width: isPaused ? '100%' : '0%',
                            animation: isPaused ? 'none' : 'progress 4s linear'
                        }}
                    />
                </div>
            </div>

            {/* Progress Bar Animation */}
            <style jsx>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
        </div>
    );
};

export default AdsCarousel;