// Import modules
import axios from "axios";
import { useEffect, useState } from "react";
import WebFont from "webfontloader";

// Import Components
import TextInput from "./components/TextInput";
import Controls from "./components/Controls";
import FontCard from "./components/FontCard";
import FontSearch from "./components/FontSearch";
import TooltipButton from "./components/TooltipButton";
import ScrollToTopButton from "./components/ScrollToTopButton";

const fontTypes = [
  "serif",
  "sans-serif",
  "monospace",
  "display",
  "handwriting",
];

// API URL
const API_URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${
  import.meta.env.VITE_GOOGLE_FONTS_API_KEY
}&sort=alpha`;

export default function App() {
  const [fonts, setFonts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("serif");
  const [text, setText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
  );

  // Controls
  const [fontSize, setFontSize] = useState(24);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [fontWeight, setFontWeight] = useState("400");
  const [color, setColor] = useState("#ffffff");
  const [letterSpacing, setLetterSpacing] = useState(0);

  // Font management
  const [page, setPage] = useState(1);
  const fontsPerPage = 10;
  const [randomFonts, setRandomFonts] = useState([]);
  const [isRandomMode, setIsRandomMode] = useState(false);
  const [pinnedFonts, setPinnedFonts] = useState([]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins:400,600"],
      },
    });
  }, []);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setFonts(response.data.items))
      .catch((error) => console.error("Error fetching fonts:", error));
  }, []);

  useEffect(() => {
    setPage(1);
    setIsRandomMode(false);
  }, [selectedCategory]);

  const togglePinFont = (font) => {
    setPinnedFonts((prev) => {
      const isPinned = prev.find((f) => f.family === font.family);
      if (isPinned) {
        return prev.filter((f) => f.family !== font.family);
      } else {
        return [...prev, font];
      }
    });
  };

  const getFontTypeDescription = (type) => {
    switch (type) {
      case "serif":
        return "Traditional fonts with small lines or strokes (e.g., Times)";
      case "sans-serif":
        return "Clean fonts without serifs (e.g., Arial, Helvetica)";
      case "monospace":
        return "Equal-width characters (e.g., Courier, code fonts)";
      case "display":
        return "Decorative fonts used for headlines and titles";
      case "handwriting":
        return "Script or cursive-like fonts, informal and playful";
      default:
        return "Font category";
    }
  };

  // Filter and exclude pinned fonts from regular results
  const filteredFonts = fonts.filter(
    (font) =>
      font.category === selectedCategory &&
      !pinnedFonts.find((f) => f.family === font.family)
  );

  const paginatedFonts = filteredFonts.slice(
    (page - 1) * fontsPerPage,
    page * fontsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1
          className="text-6xl font-bold text-center my-20 tracking-tight text-white-400 transition-transform duration-300 ease-in-out hover:scale-105"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Typography Sandbox
        </h1>

        {/* Controls Box */}
        <div className="bg-gray-800 shadow rounded-lg border border-gray-700 p-6 mb-8">
          <TextInput setText={setText} />
          <div className="mt-4">
            <Controls
              fontSize={fontSize}
              setFontSize={setFontSize}
              lineHeight={lineHeight}
              setLineHeight={setLineHeight}
              fontWeight={fontWeight}
              setFontWeight={setFontWeight}
              color={color}
              setColor={setColor}
              letterSpacing={letterSpacing}
              setLetterSpacing={setLetterSpacing}
            />
          </div>
          <div className="mt-4">
            <FontSearch
              fonts={fonts}
              onSelect={(font) => togglePinFont(font)}
            />
          </div>
        </div>

        {/* Font Type Buttons + Random */}
        <div className="bg-gray-800 shadow rounded-lg border border-gray-700 p-4 flex flex-wrap justify-center gap-2 mb-10">
          {fontTypes.map((type) => (
            <TooltipButton
              key={type}
              label={type}
              isActive={selectedCategory === type}
              onClick={() => setSelectedCategory(type)}
              description={getFontTypeDescription(type)}
            />
          ))}
          <button
            onClick={() => {
              const shuffled = [...fonts].sort(() => 0.5 - Math.random());
              setRandomFonts(shuffled.slice(0, 10));
              setIsRandomMode(true);
            }}
            className="px-4 py-2 rounded bg-indigo-700 text-white hover:bg-indigo-800 shadow-md transition"
          >
            Random
          </button>
        </div>
      </div>

      {/* Font Cards */}
      <div className="mb-10">
        {/* Pinned fonts always shown first */}
        {pinnedFonts.map((font) => (
          <FontCard
            key={`pinned-${font.family}`}
            fontFamily={font.family}
            text={text}
            fontSize={fontSize}
            lineHeight={lineHeight}
            fontWeight={fontWeight}
            color={color}
            letterSpacing={letterSpacing}
            isPinned={true}
            onTogglePin={() => togglePinFont(font)}
          />
        ))}

        {/* Random or filtered font list */}
        {isRandomMode
          ? randomFonts
              .filter(
                (font) => !pinnedFonts.find((f) => f.family === font.family)
              )
              .map((font) => (
                <FontCard
                  key={font.family}
                  fontFamily={font.family}
                  text={text}
                  fontSize={fontSize}
                  lineHeight={lineHeight}
                  fontWeight={fontWeight}
                  color={color}
                  letterSpacing={letterSpacing}
                  isPinned={false}
                  onTogglePin={() => togglePinFont(font)}
                />
              ))
          : paginatedFonts.map((font) => (
              <FontCard
                key={font.family}
                fontFamily={font.family}
                text={text}
                fontSize={fontSize}
                lineHeight={lineHeight}
                fontWeight={fontWeight}
                color={color}
                letterSpacing={letterSpacing}
                isPinned={false}
                onTogglePin={() => togglePinFont(font)}
              />
            ))}
      </div>

      {/* Pagination */}
      {!isRandomMode && (
        <div className="flex justify-center gap-4 mb-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 shadow-sm"
          >
            Previous
          </button>
          <button
            disabled={page * fontsPerPage >= filteredFonts.length}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 shadow-sm"
          >
            Next
          </button>
        </div>
      )}
      <ScrollToTopButton />
    </div>
  );
}
