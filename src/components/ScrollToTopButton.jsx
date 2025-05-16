import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed top-9 right-10 w-10 h-10 rounded-full bg-blue-800 text-white text-xl flex items-center justify-center shadow-sm hover:bg-blue-700 transition z-50"
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        ↑
      </button>
    )
  );
}
