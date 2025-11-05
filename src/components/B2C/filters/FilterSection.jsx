import { useState } from 'react';
import { Search } from 'lucide-react';

const FilterSection = ({ title, items, searchable = false }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="border border-gray-200 rounded-xl p-4 mb-6 shadow-sm hover:shadow-md transition-shadow bg-white">
            <h3 className="font-semibold text-gray-900 mb-4 text-sm tracking-wide uppercase">
                {title}
            </h3>

            {/* Search Bar */}
            {searchable && (
                <div className="relative mb-4">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            )}

            {/* Checkbox list */}
            <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
                {filteredItems.map((item, index) => (
                    <label
                        key={index}
                        className="flex items-center justify-between cursor-pointer group hover:bg-gray-50 p-1 rounded-md transition-colors"
                    >
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                            />
                            <span className="ml-2 text-sm text-gray-800 group-hover:text-gray-900 transition">
                                {item.name}
                            </span>
                        </div>
                        <span className="text-xs text-gray-500 group-hover:text-gray-700 transition">
                            ({item.count})
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FilterSection;
