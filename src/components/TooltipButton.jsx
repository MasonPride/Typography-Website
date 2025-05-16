import { useState, useRef } from "react";

export default function TooltipButton({
  label,
  description,
  isActive,
  onClick,
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 1000); // 1 second delay
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    setShowTooltip(false); // Hide immediately
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded shadow-sm transition ${
          isActive
            ? "bg-blue-600 text-white border border-blue-700"
            : "bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600 hover:text-white"
        }`}
      >
        {label}
      </button>

      {showTooltip && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1 text-sm text-gray-200 bg-gray-800 border border-gray-700 rounded shadow z-10 whitespace-nowrap pointer-events-none">
          {description}
        </div>
      )}
    </div>
  );
}
