// src/components/b2c/filters/FilterSection.jsx
import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useFilter } from '../../../context/FilterContext';
import { useNavigate } from 'react-router-dom';

// Define mapping directly in the file
const categoryPathMap = {
  'LEHENGA': '/womenwear?category=lehenga',
  'SAREE': '/womenwear?category=saree',
  'KURTA SETS': '/womenwear?category=kurta-sets',
  'ANARKALIS': '/womenwear?category=anarkalis',
  'SHARARAS': '/womenwear?category=shararas',
  'PRÊT': '/womenwear?category=pret',
  'FUSION': '/womenwear?category=fusion',
  'WEDDING': '/womenwear?category=wedding',
  'SALE': '/womenwear?category=sale',
  'VIRTUAL TRYON': '/virtual-tryon',
};

const FilterSection = ({
    title,
    items,
    searchable = false,
    defaultOpen = false,
    filterType
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const { selectedFilters, updateFilter } = useFilter();
    const navigate = useNavigate();

    const handleCheckboxChange = (itemName) => {
        // Only handle navigation for categories
        if (filterType === 'categories') {
            const normalizedName = itemName.toUpperCase().trim();

            // Check if deselecting current category
            const isCurrentlySelected = selectedFilters.categories[0] === itemName;
            if (isCurrentlySelected) {
                updateFilter(filterType, itemName); // clears category
                navigate('/womenwear'); // go to base URL
                return;
            }

            // Navigate to mapped path
            const path = categoryPathMap[normalizedName];
            if (path) {
                updateFilter(filterType, itemName);
                navigate(path);
                return;
            }
        }

        // For size, color, discount — just update filter
        updateFilter(filterType, itemName);
    };

    const filtered = items
        .filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => b.count - a.count);

    const isChecked = (itemName) => {
        return selectedFilters[filterType].includes(itemName);
    };

    return (
        <div className="pb-4 hide-scrollbar scrollbar-none">
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
                <div>
                    {searchable && (
                        <div className="relative mb-2">
                            <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-8 pr-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-gray-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="space-y-1 max-h-40 overflow-y-auto hide-scrollbar text-xs">
                        {filtered.map((item, i) => (
                            <label key={i} className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-gray-50">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={isChecked(item.name)}
                                        onChange={() => handleCheckboxChange(item.name)}
                                        className="rounded border-gray-300 text-gray-900 focus:ring-gray-500 w-3 h-3"
                                    />
                                    <span className="text-gray-800">{item.name}</span>
                                </div>
                                <span className="text-gray-500">({item.count})</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterSection;