const ColorFilter = ({ title, colors }) => {
    return (
        <div className="border border-gray-200 rounded-xl p-4 mb-6 shadow-sm hover:shadow-md transition-shadow bg-white">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm tracking-wide uppercase">
                {title}
            </h3>
            <div className="grid grid-cols-5 gap-4 sm:grid-cols-6">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center"
                    >
                        <button
                            className={`w-8 h-8 rounded-full border border-gray-300 shadow-sm hover:scale-105 transition-transform ${color.color}`}
                        />
                        <span className="text-xs text-gray-700 mt-1">{color.name}</span>
                        <span className="text-[10px] text-gray-400">({color.count})</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColorFilter;
