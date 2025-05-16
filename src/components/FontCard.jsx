import { useEffect } from "react";
import WebFont from "webfontloader";

export default function FontCard({
  fontFamily,
  text,
  fontSize,
  lineHeight,
  fontWeight,
  color,
}) {
  useEffect(() => {
    WebFont.load({
      google: {
        families: [fontFamily],
      },
    });
  }, [fontFamily]);

  // Determine readable font weight label
  const getWeightLabel = (weight) => {
    const weightNum = parseInt(weight, 10);
    if (weightNum <= 300) return "Thin";
    if (weightNum >= 700) return "Bold";
    return "Normal";
  };

  return (
    <div className="w-full px-6 my-6">
      <div className="max-w-screen-xl mx-auto p-6 rounded-lg border border-gray-200 shadow bg-white">
        {/* Font Info Header */}
        <div className="mb-4 text-sm text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
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
        </div>

        {/* Preview Text */}
        <p
          style={{
            fontFamily,
            fontSize: `${fontSize}px`,
            lineHeight,
            fontWeight,
            color,
          }}
          className="break-words"
        >
          {text || "Preview Text"}
        </p>
      </div>
    </div>
  );
}
