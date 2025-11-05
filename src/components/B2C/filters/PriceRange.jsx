import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const PriceRange = ({ min: initialMin, max: initialMax, defaultOpen = false }) => {
    const [min, setMin] = useState(initialMin || 0);
    const [max, setMax] = useState(initialMax || 100000);
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="pb-4">
            {/* Header with toggle */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left mb-2"
            >
                <h3 className="font-medium text-gray-900 text-sm">PRICE</h3>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {/* Collapsible Content */}
            {isOpen && (
                <div className="space-y-3 text-xs">
                    {/* Min Max Labels */}
                    <div className="flex justify-between text-gray-600">
                        <span>Min</span>
                        <span>Max</span>
                    </div>
                    
                    {/* Price Inputs */}
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={min}
                            onChange={(e) => setMin(Number(e.target.value))}
                            className="flex-1 px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-gray-400"
                            placeholder="55"
                        />
                        <input
                            type="number"
                            value={max}
                            onChange={(e) => setMax(Number(e.target.value))}
                            className="flex-1 px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-gray-400"
                            placeholder="37967"
                        />
                    </div>
                    
                    {/* Range Slider */}
                    <div className="pt-1">
                        <input
                            type="range"
                            min={initialMin || 0}
                            max={initialMax || 100000}
                            value={max}
                            onChange={(e) => setMax(Number(e.target.value))}
                            className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-900"
                        />
                    </div>
                    
                    {/* Scale */}
                    <div className="flex justify-between text-gray-500 pt-1">
                        <span>0</span>
                        <span>5000000</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriceRange;