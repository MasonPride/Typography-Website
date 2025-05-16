import { useState } from "react";

export default function FontSearch({ fonts, onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length === 0) {
      setSuggestions([]);
    } else {
      const matches = fonts
        .filter((font) =>
          font.family.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(matches);
    }
  };

  const handleSelect = (font) => {
    onSelect(font);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="mb-6 relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a font..."
        className="w-full p-2 border border-gray-300 rounded shadow-sm"
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded shadow mt-1 w-full z-10">
          {suggestions.map((font) => (
            <li
              key={font.family}
              onClick={() => handleSelect(font)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {font.family}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
