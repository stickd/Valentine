export default function PhotoGallery() {
  const photos = ["/photo1.jpg", "/photo2.jpg", "/photo3.jpg"];
  return (
    <div className="w-full h-screen bg-red-50 flex flex-col items-center overflow-y-scroll p-4 space-y-6">
      <h2 className="text-3xl font-bold mb-6">Мы вместе 💘</h2>
      {photos.map((p, i) => (
        <img
          key={i}
          src={p}
          className="w-80 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500"
        />
      ))}
      <h1 className="text-5xl font-extrabold mt-6 text-center text-pink-700">
        Ты — моё всё 💖
      </h1>
      <audio src="/music.mp3" autoPlay loop />
    </div>
  );
}
