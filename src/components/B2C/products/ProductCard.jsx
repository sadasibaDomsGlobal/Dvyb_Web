// src/components/b2c/products/ProductCard.jsx
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center p-4">
        <img
          src={product.imageUrls?.[0] || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 mb-1">
          {product.brand || 'Unknown Brand'}
        </h4>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.name || product.title}
        </p>
        <p className="text-lg font-bold text-gray-900">
          ₹{product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;











// const ProductCard = ({ product }) => {
//     return (
//         <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
//             <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center p-4">
//                 <img src={product.images} alt={product.name} className="w-full h-full object-cover" />
//             </div>
//             <div className="p-4">
//                 <h4 className="font-semibold text-gray-900 mb-1">{product.brand}</h4>
//                 <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.name}</p>
//                 <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;