function TextInput({ onTextChange }) {
  return (
    <input
      type="text"
      onChange={(e) => onTextChange(e.target.value)}
      placeholder="Type something..."
      className="text-input-component"
    />
  );
}

export default TextInput;
