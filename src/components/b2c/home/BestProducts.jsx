import React from 'react';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ path,image, title, size = 'normal' }) => {

  const navigate = useNavigate();
   
   return (


  <div className="relative group overflow-hidden cursor-pointer"
        onClick={()=> navigate(path)}
  >
    <img
      src={image}
      alt={title}
      className={`w-full object-cover transition-transform duration-500 ${
        size === 'large' ? 'h-[500px] md:h-[600px]' : 'h-[300px] md:h-[350px]'
      }`}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity duration-300" />
    <div className="absolute bottom-0 left-0 right-0 py-6 text-center text-white">
      <p className="sm:text-[8px] md:text-sm lg:text-lg sm:font-thin font-medium uppercase mb-2">
        {title}
      </p>
      <button className="sm:text-xs md:text-sm lg:text-lg uppercase tracking-widest px-4 sm:px-2 py-2 transition-all duration-300">
        Shop Now
      </button>
    </div>
  </div>
);
}
const BestProducts = ({products, columns }) => {

console.log(products, "bestselling")
  return (
    <section className="bg-white sm:px-2 md:px-6 lg:px-14">
      <div className="container mx-auto sm:px-2 md:px-6 lg:px-8">

        {/* Desktop/Tablet Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-3 lg:gap-6">
          {/* Large left image */}
          <div className={`md:col-span-${columns===2?8:6}`}>
            <ProductCard
              path = {products[0].path}
              image={columns===2?products[0].images:products[3].images}
              title={products[0].title}
              size="large"
            />
          </div>

          {/* Right column with 2x2 grid */}
          <div className= {`md:col-span-${columns===2?4:6} grid grid-cols-${columns===2?1:2} gap-3 lg:gap-6` }>
  {products.slice(columns === 2 ? 1 : 4,columns === 2 ? 2 : 6).map((product) => (
    <ProductCard
     path = {product.path}
      key={product.id}
      image={product.images}
      title={product.title}
      size="large"
    />
  ))}
</div>
        </div>

        {/* Mobile Layout - Responsive 1 or 2 column grid */}
        <div className="grid grid-cols-2 xs:grid-cols-2 gap-2 md:hidden">
          {products.slice(0,2).map((product) => (
            <ProductCard
              key={product.id}
              image={product.images}
              title={product.title}
              size="normal"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestProducts;