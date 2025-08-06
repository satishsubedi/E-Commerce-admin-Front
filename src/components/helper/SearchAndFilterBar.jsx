import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import FilterSelect from "./FilterSelect";

const SearchAndFilterBar = ({
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  className = "flex flex-col sm:flex-row gap-4 mb-6",
}) => {
  return (
    <div className={className}>
      {/* Search Input */}
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Filter Selects */}
      {filters.map((filter, index) => (
        <FilterSelect
          key={index}
          value={filter.value}
          onValueChange={filter.onValueChange}
          placeholder={filter.placeholder}
          options={filter.options}
          className={filter.className}
        />
      ))}
    </div>
  );
};

export default SearchAndFilterBar;
