// src/components/b2c/filters/ColorFilter.jsx
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useFilter } from '../../../context/FilterContext';

const ColorFilter = ({ title, colors, defaultOpen = false, filterType }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const { selectedFilters, updateFilter } = useFilter();

    return (
        <div className="pb-4">
            {/* Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left mb-2"
            >
                <h3 className="font-medium text-gray-900 text-sm">{title}</h3>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {/* Color Grid */}
            {isOpen && (
                <div className="grid grid-cols-4 gap-3">
                    {colors.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => updateFilter(filterType, color.name)}
                            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${selectedFilters.colors.includes(color.name)
                                    ? 'ring-2 ring-gray-800 ring-offset-2'
                                    : 'hover:ring-1 hover:ring-gray-300'
                                }`}
                        >
                            {/* Color circle with inline style */}
                            <div
                                className="w-8 h-8 rounded-full border border-gray-200"
                                style={{
                                    backgroundColor: color.hex,
                                    // Add white border for light colors
                                    border: color.hex.toLowerCase() === '#ffffff' ? '1px solid #d1d5db' : '1px solid transparent'
                                }}
                            />
                            <span className="text-xs text-gray-600 capitalize">{color.name}</span>
                            <span className="text-xs text-gray-400">({color.count})</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ColorFilter;