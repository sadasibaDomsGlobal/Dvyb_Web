import cartImage from "../../../assets/B2C/images/empty_cart/cart.png";

const EmptyCartState = () => {
  return (
    <div className="text-center mb-16">
      <div className="mb-8">
        {/* Cart Image */}
        <div className="flex justify-center mb-6">
          <img src={cartImage} alt="Empty Cart" className="w-48 h-48 object-contain" />
        </div>

        <h1 className="text-4xl font-medium text-gray-900 mb-4">Your shopping cart is empty</h1>
        <p className="text-xl text-gray-600 mb-8">You have no items in your cart</p>
      </div>
      <button className="bg-black text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-800 transition duration-200">
        CONTINUE SHOPPING
      </button>
    </div>
  );
};

export default EmptyCartState;
