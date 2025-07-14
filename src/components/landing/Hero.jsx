import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const [mouseX, setMouseX] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isMoving, setIsMoving] = useState(false);

  const prevMouseX = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const currentX = e.clientX;
      setMouseX(currentX);

      // Deteksi arah
      if (currentX > prevMouseX.current) {
        setDirection("right");
      } else if (currentX < prevMouseX.current) {
        setDirection("left");
      }

      prevMouseX.current = currentX;

      // Set moving ke true & reset timer
      setIsMoving(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsMoving(false); // kalau gak gerak lagi, dianggap diem
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Tentukan gambar karakter
  let karakterSrc = "/img/karakter.png"; // default diem
  if (isMoving) {
    karakterSrc =
      direction === "right"
        ? "/img/karakter_kanan.png"
        : "/img/karakter_kiri.png";
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Layer 1: Background */}
      <img
        src="/img/bg-coffee.jpg"
        alt="Background Cafe"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Layer 2: Karakter */}
      <img
        src={karakterSrc}
        alt="Karakter"
        className="absolute bottom-[-20px] w-[600px] transition-transform duration-50 z-10 pointer-events-none"
        style={{
          left: `${mouseX}px`,
          transform: `translateX(-50%) translateY(50px)`,
        }}
      />

      {/* Layer 3: Meja */}
      <img
        src="/img/meja-depan.png"
        alt="Meja Kopi"
        className="absolute bottom-0 w-full z-20"
      />
    </section>
  );
}
