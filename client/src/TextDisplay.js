function TextDisplay({ text, fontSize }) {
  return (
    <textarea
      value={text}
      readOnly
      className="text-display-component"
      style={{ fontSize: `${fontSize}px` }}
    />
  );
}
export default TextDisplay;
