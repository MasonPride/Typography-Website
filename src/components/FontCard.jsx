export default function FontCard({
  fontFamily,
  text,
  fontSize,
  lineHeight,
  fontWeight,
  color,
}) {
  return (
    <div className="p-4 mb-4 border rounded shadow">
      <p
        style={{
          fontFamily,
          fontSize: `${fontSize}px`,
          lineHeight,
          fontWeight,
          color,
        }}
      >
        {text || "Preview Text"}
      </p>
      <div className="mt-2 text-sm text-gray-500">Font: {fontFamily}</div>
    </div>
  );
}
