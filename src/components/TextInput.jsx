export default function TextInput({ text, setText }) {
  return (
    <textarea
      className="w-full p-4 text-lg border rounded-md shadow resize-none"
      rows="3"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type here..."
    />
  );
}
