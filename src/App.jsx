import axios from "axios";
import { useEffect, useState } from "react";

import TextInput from "./components/TextInput";
import Controls from "./components/Controls";
import FontCard from "./components/FontCard";
import FontSearch from "./components/FontSearch";

// Font types available via Google Fonts
const fontTypes = [
  "serif",
  "sans-serif",
  "monospace",
  "display",
  "handwriting",
];

// Access API key from .env
const API_KEY = import.meta.env.VITE_GOOGLE_FONTS_API_KEY;
const API_URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}&sort=alpha`;

export default function App() {
  const [fonts, setFonts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("serif");
  const [text, setText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  );

  const [fontSize, setFontSize] = useState(24);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [fontWeight, setFontWeight] = useState("400");
  const [color, setColor] = useState("#000000");

  const [pinnedFont, setPinnedFont] = useState(null);
  const [page, setPage] = useState(1);
  const fontsPerPage = 10;

  const [randomFonts, setRandomFonts] = useState([]);
  const [isRandomMode, setIsRandomMode] = useState(false);

  // Fetch fonts once on load
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setFonts(response.data.items);
      })
      .catch((error) => console.error("Error fetching fonts:", error));
  }, []);

  // Reset when category or pinned font changes
  useEffect(() => {
    setPage(1);
    setIsRandomMode(false);
  }, [selectedCategory, pinnedFont]);

  // Filter fonts by selected category (excluding pinned font)
  const filteredFonts = fonts.filter(
    (font) =>
      font.category === selectedCategory &&
      (!pinnedFont || font.family !== pinnedFont.family)
  );

  // Paginate filtered fonts
  const paginatedFonts = filteredFonts.slice(
    (page - 1) * fontsPerPage,
    page * fontsPerPage
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4">Typography Sandbox</h1>

        <TextInput setText={setText} />

        <Controls
          fontSize={fontSize}
          setFontSize={setFontSize}
          lineHeight={lineHeight}
          setLineHeight={setLineHeight}
          fontWeight={fontWeight}
          setFontWeight={setFontWeight}
          color={color}
          setColor={setColor}
        />

        <FontSearch fonts={fonts} onSelect={setPinnedFont} />

        <div className="flex flex-wrap gap-2 mb-4">
          {fontTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedCategory(type)}
              className={`px-4 py-2 rounded ${
                selectedCategory === type
                  ? "bg-blue-900 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-blue-50"
              }`}
            >
              {type}
            </button>
          ))}

          <button
            onClick={() => {
              const shuffled = [...fonts].sort(() => 0.5 - Math.random());
              setRandomFonts(shuffled.slice(0, 10));
              setIsRandomMode(true);
              setPinnedFont(null); // Clear any pinned font
            }}
            className="px-4 py-2 rounded bg-indigo-700 text-white hover:bg-indigo-800"
          >
            Random
          </button>
        </div>
      </div>

      {/* Font Cards Section */}
      <div className="mb-10">
        {isRandomMode ? (
          randomFonts.map((font) => (
            <FontCard
              key={font.family}
              fontFamily={font.family}
              text={text}
              fontSize={fontSize}
              lineHeight={lineHeight}
              fontWeight={fontWeight}
              color={color}
            />
          ))
        ) : (
          <>
            {pinnedFont && (
              <FontCard
                key={pinnedFont.family}
                fontFamily={pinnedFont.family}
                text={text}
                fontSize={fontSize}
                lineHeight={lineHeight}
                fontWeight={fontWeight}
                color={color}
              />
            )}
            {paginatedFonts.map((font) => (
              <FontCard
                key={font.family}
                fontFamily={font.family}
                text={text}
                fontSize={fontSize}
                lineHeight={lineHeight}
                fontWeight={fontWeight}
                color={color}
              />
            ))}
          </>
        )}
      </div>

      {/* Pagination Controls */}
      {!isRandomMode && (
        <div className="flex justify-center gap-4 mb-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={page * fontsPerPage >= filteredFonts.length}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
