import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { Badge } from "@/components/ui";
import { Search, Filter, X } from "lucide-react";

interface FilterSidebarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: {
    organic: boolean;
    maxPrice: number;
    maxDistance: number;
    minRating: number;
  };
  onFilterChange: (key: string, value: any) => void;
  onResetFilters: () => void;
  filteredCount: number;
}

export function FilterSidebar({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  onResetFilters,
  filteredCount
}: FilterSidebarProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </h3>
        <Badge variant="secondary" className="text-xs">
          {filteredCount} results
        </Badge>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search products, farmers..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Max Price: ₹{filters.maxPrice}
        </label>
        <input
          type="range"
          min="10"
          max="500"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange("maxPrice", +e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹10</span>
          <span>₹500</span>
        </div>
      </div>

      {/* Distance Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Max Distance: {filters.maxDistance} km
        </label>
        <input
          type="range"
          min="5"
          max="100"
          value={filters.maxDistance}
          onChange={(e) => onFilterChange("maxDistance", +e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>5 km</span>
          <span>100 km</span>
        </div>
      </div>

      {/* Rating Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Min Rating: {filters.minRating}⭐
        </label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={filters.minRating}
          onChange={(e) => onFilterChange("minRating", +e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>5</span>
        </div>
      </div>

      {/* Organic Checkbox */}
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.organic}
            onChange={(e) => onFilterChange("organic", e.target.checked)}
            className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
          />
          <span className="text-sm font-medium text-gray-700">Organic Only</span>
        </label>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        onClick={onResetFilters}
        className="w-full"
      >
        <X className="w-4 h-4 mr-2" />
        Reset Filters
      </Button>
    </div>
  );
}
