import React from "react";
import { Star } from "lucide-react";
import ProductReviewCard from "./ProductReviewCard";

const ProductReviewsSection = ({ reviews = [] }) => {
  const staticReviews = [
    {
      name: "Courtney Henry",
      rating: 5,
      comment:
        "I'm obsessed with this blouse! The embroidery is stunning, and the fit is so flattering. Definitely worth the investment!",
      date: "2 mins ago",
      image: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
    },
    {
      name: "Cameron Williamson",
      rating: 4,
      comment:
        "I recently purchased this blouse and I'm in love! The fabric feels soft and luxurious. Highly recommend it!",
      date: "2 mins ago",
      image: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
    },
    {
      name: "Jane Cooper",
      rating: 3,
      comment:
        "The design is unique, and the fabric is comfortable. Great for special occasions!",
      date: "2 mins ago",
      image: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : staticReviews;

  const avgRating =
    displayReviews.length > 0
      ? (
          displayReviews.reduce((sum, r) => sum + r.rating, 0) /
          displayReviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className=" pt-6 pb-8">
      <h3 className="text-base font-semibold text-gray-900 mb-5">
        Customer Reviews
      </h3>

      {/* --- Rating Summary --- */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-8 mb-6">
        {/* Average Rating */}
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={`${
                  i < Math.round(avgRating)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-lg font-semibold text-gray-900 mt-1">
            {avgRating}
          </p>
          <p className="text-sm text-gray-600">
            {displayReviews.length} Reviews
          </p>
        </div>
      </div>

      {/* --- Write Review Button (full width, sharp edges) --- */}
      <div className="flex justify-center mt-6">
        <button className="w-full max-w-full px-6 py-2 border border-red-800 text-red-800 text-sm font-medium hover:bg-red-800 hover:text-white transition-none">
          WRITE A REVIEW
        </button>
      </div>

      {/* --- Reviews List --- */}
      <div className="space-y-4 mt-6">
        {displayReviews.map((review, index) => (
          <ProductReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ProductReviewsSection;
