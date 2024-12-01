import React, { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { X } from "lucide-react";

export const SearchBarWithAutocomplete = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
  ]);

  const handleClear = () => {
    setQuery("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative w-full max-w-full mx-auto">
      {/* Search Bar */}
      <div className="flex items-center bg-white border-2 border-gray-500 rounded-2xl px-4 py-2 shadow-sm w-full">
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for anything"
          className="flex-1 border-none outline-none focus:ring-0"
        />
        {query && (
          <Button
            variant="ghost"
            onClick={handleClear}
            className="p-2 text-gray-500"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {query && (
        <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-2">
          {suggestions
            .filter((item) =>
              item.toLowerCase().includes(query.toLowerCase())
            )
            .map((item, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => setQuery(item)}
              >
                {item}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

