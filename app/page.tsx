"use client";

import { useState } from "react";
import HeartGame from "../components/HeartGame";

export default function Home() {
  const [caught, setCaught] = useState(false);

  return (
    <div>
      <HeartGame onCaught={() => setCaught(true)} />
      {caught && (
        <div className="text-center mt-10 text-2xl text-pink-700">
          🎉 Ти спіймала серце! ❤️
        </div>
      )}
    </div>
  );
}
