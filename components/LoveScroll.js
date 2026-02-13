"use client";

import { useEffect, useState, useRef } from "react";

export default function LoveScroll({ text, onFinish }) {
  const [displayed, setDisplayed] = useState("");
  const index = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index.current < text.length) {
        setDisplayed((prev) => prev + text[index.current]);
        index.current += 1;

        // плавний скрол вниз
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        if (onFinish) onFinish();
      }
    }, 50); // швидкість появи символів
    return () => clearInterval(interval);
  }, [text, onFinish]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-y-auto bg-pink-100 p-6 text-pink-700 font-handwritten text-xl md:text-2xl leading-relaxed"
      style={{ fontFamily: "'Marck Script', cursive" }}
    >
      {displayed}
    </div>
  );
}
