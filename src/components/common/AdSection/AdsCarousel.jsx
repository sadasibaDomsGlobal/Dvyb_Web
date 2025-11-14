import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ads from './AdsImages';

const AdsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const navigate = useNavigate();

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === ads.length - 1 ? 0 : prevIndex + 1
        );
    }, []);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const handleAdClick = (ad) => {
        if (ad.link) {
            navigate(ad.link);
        }
    };

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 4000);

        return () => clearInterval(interval);
    }, [currentIndex, isPaused, nextSlide]);

    return (
        <div
            className="relative overflow-hidden mx-auto"
            style={{
                width: "900px",
                height: "334.68px",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="relative w-full h-full">

                {/* Ads Images */}
                {ads.map((ad, index) => (
                    <div
                        key={ad.id}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                            index === currentIndex ? "opacity-100" : "opacity-0"
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

                {/* Indicators/Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {ads.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                index === currentIndex
                                    ? "bg-white scale-110"
                                    : "bg-white/50 hover:bg-white/80"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AdsCarousel;
