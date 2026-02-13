"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================
   LoveScroll
========================= */
function LoveScroll({
  text,
  onArrowClick,
}: {
  text: string;
  onArrowClick: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const index = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index.current < text.length) {
        const char = text[index.current];
        setDisplayed((prev) => prev + char);
        index.current += 1;

        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setIsFinished(true);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-y-auto bg-pink-100 p-6 text-pink-700 text-xl md:text-2xl leading-relaxed relative"
      style={{ fontFamily: "'Marck Script', cursive" }}
    >
      {displayed}

      {isFinished && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={onArrowClick}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 text-4xl cursor-pointer"
        >
          ⬇
        </motion.div>
      )}
    </div>
  );
}

/* =========================
   PhotoGallery
========================= */
function PhotoGallery() {
  const photos = Array.from({ length: 10 }, (_, i) => `/${i + 1}.jpg`);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showFinalText, setShowFinalText] = useState(false);

  useEffect(() => {
    let frame: number;
    const speed = 0.4;

    const scrollDown = () => {
      const container = containerRef.current;
      if (!container) return;

      if (
        container.scrollTop + container.clientHeight <
        container.scrollHeight
      ) {
        container.scrollTop += speed;
        frame = requestAnimationFrame(scrollDown);
      } else {
        setShowFinalText(true);
      }
    };

    frame = requestAnimationFrame(scrollDown);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen overflow-y-auto bg-pink-200 p-10 flex flex-col gap-16"
    >
      {photos.map((src, index) => (
        <motion.img
          key={index}
          src={src}
          alt={`memory ${index + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="rounded-3xl shadow-2xl w-full object-cover"
        />
      ))}

      <AnimatePresence>
        {showFinalText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="mt-20 text-center text-pink-700 font-bold text-4xl md:text-6xl leading-tight"
          >
            Я тебе люблю <br />З Днем Святого Валентина! 💗
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-32" />
    </div>
  );
}

/* =========================
   HeartGame
========================= */
export default function HeartGame() {
  const [showRules, setShowRules] = useState(true);
  const [showHeart, setShowHeart] = useState(false);
  const [victory, setVictory] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const animationRef = useRef<number | null>(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const velocity = useRef({
    dx: 5 + Math.random() * 5,
    dy: 5 + Math.random() * 5,
  });

  const rotation = useRef(Math.random() * 360);
  const rotationSpeed = useRef((Math.random() - 0.5) * 10);

  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  const loveText =
    "Дашулічка, ти сама прекрасна дівчинка в світі! Сама гарна, сама розумна, турботлива, чутлива, хорошенька, ніжна. Мені дуже повезло в житті, що я зустрів тебе і маю змогу проводити час разом з тобою, ти робиш мене щасливим :) В дуже недалекому майбутньому ми будемо засинати і просинатись кожен день разом. Багааааааато часу попереду. Якщо я в раю — то ти мій янгол. Швидкий цьом))) Ти сама любима моя бусінка і я хочу провести все життя з тобою!";

  useEffect(() => {
    const updateSize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const animateHeart = () => {
    setPosition((prev) => {
      let x = prev.x + velocity.current.dx;
      let y = prev.y + velocity.current.dy;

      if (x < 0 || x + 96 > screenWidth) velocity.current.dx *= -1;
      if (y < 0 || y + 96 > screenHeight) velocity.current.dy *= -1;

      return {
        x: Math.max(0, Math.min(x, screenWidth - 96)),
        y: Math.max(0, Math.min(y, screenHeight - 96)),
      };
    });

    rotation.current += rotationSpeed.current;
    animationRef.current = requestAnimationFrame(animateHeart);
  };

  useEffect(() => {
    if (showHeart && !victory)
      animationRef.current = requestAnimationFrame(animateHeart);

    return () => {
      if (animationRef.current !== null)
        cancelAnimationFrame(animationRef.current);
    };
  }, [showHeart, victory, screenWidth, screenHeight]);

  const handleHeartClick = () => {
    if (attempts < 2) {
      setAttempts((prev) => prev + 1);
      setPosition({
        x: Math.random() * (screenWidth - 96),
        y: Math.random() * (screenHeight - 96),
      });
    } else {
      setVictory(true);
      if (animationRef.current !== null)
        cancelAnimationFrame(animationRef.current);
      setTimeout(() => setShowScroll(true), 3000);
    }
  };

  return (
    <div className="relative w-screen h-screen flex justify-center items-center overflow-hidden bg-pink-100">
      {/* Rules */}
      <AnimatePresence>
        {showRules && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute text-center text-3xl text-pink-700 cursor-pointer"
            onClick={() => {
              setShowRules(false);
              setShowHeart(true);
            }}
          >
            ❤️ Спіймай серце ❤️
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heart */}
      <AnimatePresence>
        {showHeart && !victory && (
          <motion.div
            onClick={handleHeartClick}
            style={{
              position: "absolute",
              top: position.y,
              left: position.x,
              fontSize: "6rem",
              rotate: rotation.current + "deg",
              cursor: "pointer",
            }}
          >
            ❤️
          </motion.div>
        )}
      </AnimatePresence>

      {/* Victory */}
      <AnimatePresence>
        {victory && !showScroll && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute text-4xl text-pink-700 text-center"
          >
            🎉 Ти спіймала моє серце ❤️
          </motion.div>
        )}
      </AnimatePresence>

      {/* LoveScroll */}
      {showScroll && !showGallery && (
        <LoveScroll text={loveText} onArrowClick={() => setShowGallery(true)} />
      )}

      {/* PhotoGallery */}
      {showGallery && <PhotoGallery />}
    </div>
  );
}
