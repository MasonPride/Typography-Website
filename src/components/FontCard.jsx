import { useEffect } from "react";
import WebFont from "webfontloader";

export default function FontCard({
  fontFamily,
  text,
  fontSize,
  lineHeight,
  fontWeight,
  color,
  letterSpacing,
  onTogglePin,
  isPinned,
}) {
  useEffect(() => {
    WebFont.load({
      google: {
        families: [fontFamily],
      },
    });
  }, [fontFamily]);

  const getWeightLabel = (weight) => {
    const weightNum = parseInt(weight, 10);
    if (weightNum <= 300) return "Thin";
    if (weightNum >= 700) return "Bold";
    return "Normal";
  };

  return (
    <div className="px-4 my-6 w-full">
      <div className="w-full max-w-screen-2xl mx-auto p-6 border border-gray-700 shadow bg-gray-800 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105">
        <div className="mb-4 text-sm text-gray-400 flex flex-wrap gap-x-4 gap-y-1">
          <span>
            <strong>Font:</strong> {fontFamily}
          </span>
          <span>
            <strong>Size:</strong> {fontSize}px
          </span>
          <span>
            <strong>Weight:</strong> {getWeightLabel(fontWeight)}
          </span>
          <span>
            <strong>Line Spacing:</strong> {lineHeight}
          </span>
          <span>
            <strong>Letter Spacing:</strong> {letterSpacing}px
          </span>
          <button
            onClick={onTogglePin}
            aria-label={isPinned ? "Unpin font" : "Pin font"}
            className={`w-6 h-6 rounded-full border transition
    ${
      isPinned
        ? "bg-blue-500 border-blue-500"
        : "border-gray-500 hover:border-blue-400"
    }`}
          ></button>
        </div>
        <p
          style={{
            fontFamily,
            fontSize: `${fontSize}px`,
            lineHeight,
            fontWeight,
            color,
            letterSpacing: `${letterSpacing}px`,
          }}
          className="break-words"
        >
          {text || "Preview Text"}
        </p>
      </div>
    </div>
  );
}
