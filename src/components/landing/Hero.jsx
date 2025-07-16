import { useEffect, useState, useRef } from "react";
import Image from "next/image";

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

      if (currentX > prevMouseX.current) {
        setDirection("right");
      } else if (currentX < prevMouseX.current) {
        setDirection("left");
      }

      prevMouseX.current = currentX;

      setIsMoving(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };

    if (window.innerWidth >= 1024) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  let karakterSrc = "/img/karakter.png";
  if (isMoving) {
    karakterSrc =
      direction === "right"
        ? "/img/karakter_kanan.png"
        : "/img/karakter_kiri.png";
  }

  // Auto center kalau mobile
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
  const karakterStyle = isDesktop
    ? {
      left: `${mouseX}px`,
      transform: `translateX(-50%) translateY(50px)`,
    }
    : {
      left: "50%",
      transform: `translateX(-50%) translateY(50px)`,
    };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background selalu full */}
      <Image
        src="/img/bg-coffee.jpg"
        alt="Background Cafe"
        fill
        className="object-cover z-0"
        priority
      />

      {/* Scrollable wrapper */}
      <div className="absolute inset-0 overflow-x-auto lg:overflow-hidden scroll-smooth">
        <div className="relative min-w-[1152px] h-full">
          {/* Karakter */}
          <img
            src={karakterSrc}
            alt="Karakter"
            className="absolute bottom-[-20px] w-[600px] transition-transform duration-75 z-10 pointer-events-none"
            style={karakterStyle}
          />

          {/* Meja depan */}
          <Image
            src="/img/meja-depan.png"
            alt="Meja Kopi"
            fill
            className="absolute bottom-0 left-0 w-full h-auto object-cover z-20"
          />

        </div>
      </div>
    </section>
  );
}
