import { useState } from "react";
import TextInput from "./components/TextInput";
import Controls from "./components/Controls";
import FontCard from "./components/FontCard";

const fontCategories = {
  serif: ["Georgia", "Times New Roman", "Garamond"],
  sans: ["Arial", "Helvetica", "Verdana"],
  monospace: ["Courier New", "Lucida Console"],
  script: ["Brush Script MT", "Cursive"],
};

export default function App() {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [fontWeight, setFontWeight] = useState("400");
  const [color, setColor] = useState("#000000");
  const [selectedCategory, setSelectedCategory] = useState("serif");

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Typography Sandbox</h1>

      <TextInput text={text} setText={setText} />
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

      <div className="flex space-x-2 mb-4">
        {Object.keys(fontCategories).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedCategory(type)}
            className={`px-4 py-2 rounded ${
              selectedCategory === type
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {fontCategories[selectedCategory].map((font) => (
        <FontCard
          key={font}
          fontFamily={font}
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
