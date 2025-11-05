const PriceRange = () => {
    return (
        <div className="border border-gray-200 rounded-xl p-4 mb-6 shadow-sm hover:shadow-md transition-shadow bg-white">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm tracking-wide uppercase">
                Price
            </h3>
            <div className="space-y-3">
                <div className="flex justify-between text-xs text-gray-500">
                    <span>Min</span>
                    <span>Max</span>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="₹1000"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all"
                    />
                    <input
                        type="text"
                        placeholder="₹1,00,000"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all"
                    />
                </div>
            </div>
        </div>
    );
};

export default PriceRange;
