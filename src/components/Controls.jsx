export default function Controls({
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight,
  fontWeight,
  setFontWeight,
  color,
  setColor,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <div>
        <label>Font Size: {fontSize}px</label>
        <input
          type="range"
          min="10"
          max="100"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <label>Line Spacing: {lineHeight}</label>
        <input
          type="range"
          min="1"
          max="3"
          step="0.1"
          value={lineHeight}
          onChange={(e) => setLineHeight(e.target.value)}
          className="w-full"
        />
      </div>
      <div>
        <label>Font Weight</label>
        <select
          value={fontWeight}
          onChange={(e) => setFontWeight(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="400">Normal</option>
          <option value="700">Bold</option>
          <option value="100">Thin</option>
          {/* Add more if needed */}
        </select>
      </div>
      <div>
        <label>Text Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full h-10"
        />
      </div>
    </div>
  );
}
