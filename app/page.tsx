"use client";

import { useState } from "react";
import HeartGame from "../components/HeartGame";
import LoveScroll from "../components/LoveScroll";
import PhotoGallery from "../components/PhotoGallery";

export default function Home() {
  const [caught, setCaught] = useState(false);
  const [scrollDone, setScrollDone] = useState(false);

  const loveText = `
  Я люблю тебя всем сердцем и каждым днём,
  ты делаешь мою жизнь ярче,
  с тобой я счастлив...
  `;

  return (
    <div>
      {!caught ? (
        <HeartGame onCaught={() => setCaught(true)} />
      ) : !scrollDone ? (
        <LoveScroll text={loveText} onFinish={() => setScrollDone(true)} />
      ) : (
        <PhotoGallery />
      )}
    </div>
  );
}
