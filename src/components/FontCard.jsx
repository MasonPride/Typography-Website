import { useEffect } from 'react';
import WebFont from 'webfontloader';

export default function FontCard({ fontFamily, text, fontSize, lineHeight, fontWeight, color }) {
  useEffect(() => {
    WebFont.load({
      google: {
        families: [fontFamily],
      },
    });
  }, [fontFamily]);

  return (
    <div className="w-full px-6 my-6">
      <div className="max-w-screen-xl mx-auto p-6 rounded-lg border border-gray-200 shadow bg-white">
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
        <div className="mt-2 text-sm text-gray-500">Font: {fontFamily}</div>
      </div>
    </div>
  );
}
