// src/components/b2c/filters/ColorFilter.jsx
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useFilter } from '../../../context/FilterContext';

const ColorFilter = ({ title, colors, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const { selectedFilters, updateFilter } = useFilter();

    const handleColorChange = (colorName) => {
        updateFilter('colors', colorName);
    };

    const isColorSelected = (colorName) => {
        return selectedFilters.colors.includes(colorName);
    };

    return (
        <div className="pb-4">
            {/* Header with toggle */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full text-left mb-2"
            >
                <h3 className="font-medium text-gray-900 text-sm">{title}</h3>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {/* Collapsible Content */}
            {isOpen && (
                <div className="grid grid-cols-4 gap-2">
                    {colors.map((color, i) => (
                        <label key={i} className="flex flex-col items-center cursor-pointer group">
                            <input 
                                type="checkbox" 
                                checked={isColorSelected(color.name)}
                                onChange={() => handleColorChange(color.name)}
                                className="sr-only peer" 
                            />
                            <div className={`w-6 h-6 rounded-full border-2 transition-all group-hover:scale-110 ${
                                isColorSelected(color.name) 
                                    ? 'border-gray-900 ring-2 ring-gray-300' 
                                    : 'border-gray-300'
                            } ${color.bgClass}`} />
                            <span className="text-xs text-gray-700 mt-1 text-center leading-tight">{color.name}</span>
                            <span className="text-[10px] text-gray-500">({color.count})</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ColorFilter;