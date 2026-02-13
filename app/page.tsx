"use client";

import { useState } from "react";
import HeartGame from "../components/HeartGame";
import LoveScroll from "../components/LoveScroll";
import PhotoGallery from "../components/PhotoGallery";

export default function Home() {
  const [caught, setCaught] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div>
      {!caught ? (
        <HeartGame onCaught={() => setCaught(true)} />
      ) : !showGallery ? (
        <LoveScroll text={loveText} onArrowClick={() => setShowGallery(true)} />
      ) : (
        <PhotoGallery />
      )}
    </div>
  );
}
