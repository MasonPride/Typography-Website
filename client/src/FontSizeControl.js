function FontSizeControl({ fontSize, onFontSizeChange }) {
  const handleChange = (e) => {
    const newSize = Number(e.target.value);
    onFontSizeChange(newSize);
  };

  return (
    <div className="font-size-control">
      <label>Font Size:</label>
      <input
        type="range"
        min="12"
        max="48"
        value={fontSize}
        onChange={handleChange}
        className="slider"
      />
      <input
        type="number"
        min="12"
        max="48"
        value={fontSize}
        onChange={handleChange}
        className="number-input"
      />
    </div>
  );
}

export default FontSizeControl;
