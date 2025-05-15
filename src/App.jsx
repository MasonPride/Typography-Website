import axios from 'axios';
import { useEffect, useState } from 'react';

import TextInput from "./components/TextInput";
import Controls from "./components/Controls";
import FontCard from "./components/FontCard";

// Font types available via Google Fonts
const fontTypes = ["serif", "sans-serif", "monospace", "display", "handwriting"];

// Access API key from .env
const API_KEY = import.meta.env.VITE_GOOGLE_FONTS_API_KEY;
const API_URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`;

export default function App() {
  const [fonts, setFonts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("serif");
  const [text, setText] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget tristique leo. Etiam fermentum efficitur magna, id pretium dui porta ut. Sed at aliquet lectus, quis mattis ex. Maecenas finibus ex sed urna condimentum venenatis. Vivamus nec tincidunt dolor. Donec auctor laoreet justo id ultrices. Nulla facilisi. Donec elit dui, blandit a dolor sed, blandit fermentum dui.");

  // Font customization state
  const [fontSize, setFontSize] = useState(24);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [fontWeight, setFontWeight] = useState("400");
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setFonts(response.data.items);
      })
      .catch(error => console.error("Error fetching fonts:", error));
  }, []);

  const filteredFonts = fonts
    .filter(font => font.category === selectedCategory)
    .slice(0, 10); // Show only first 10 for now

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Centered Controls */}
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

        {/* Font Category Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {fontTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedCategory(type)}
              className={`px-4 py-2 rounded ${
                selectedCategory === type
                  ? 'bg-blue-900 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-blue-50'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Full-width Font Cards */}
      {filteredFonts.map((font) => (
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
    </div>
  );
}
