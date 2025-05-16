export default function Controls({
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
  fontWeight,
  setFontWeight,
  color,
  setColor,
  letterSpacing,
  setLetterSpacing,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm mb-1">Font Size: {fontSize}px</label>
        <input
          type="range"
          min="10"
          max="100"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="w-full accent-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Line Spacing: {lineHeight}</label>
        <input
          type="range"
          min="1"
          max="3"
          step="0.1"
          value={lineHeight}
          onChange={(e) => setLineHeight(parseFloat(e.target.value))}
          className="w-full accent-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Font Weight</label>
        <select
          value={fontWeight}
          onChange={(e) => setFontWeight(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 text-gray-100 rounded"
        >
          <option value="100">Thin</option>
          <option value="400">Normal</option>
          <option value="700">Bold</option>
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">
          Letter Spacing: {letterSpacing}px
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={letterSpacing}
          onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
          className="w-full accent-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Text Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-10 rounded"
        />
      </div>
    </div>
  );
}
