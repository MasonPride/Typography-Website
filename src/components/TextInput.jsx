export default function TextInput({ setText }) {
  return (
    <textarea
      onChange={(e) => setText(e.target.value)}
      rows="4"
      className="w-full p-4 text-lg bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 placeholder-gray-400 resize-none"
      placeholder="Type something to preview..."
    />
  );
}
