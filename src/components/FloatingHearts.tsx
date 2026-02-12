import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const FloatingHearts = ({ active = true }: { active?: boolean }) => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    if (!active) return;
    const emojis = ["❤️", "💕", "💖", "💗", "💝", "🩷", "💘"];
    const interval = setInterval(() => {
      const newHeart: Heart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        size: 0.5 + Math.random() * 1.5,
        duration: 4 + Math.random() * 6,
        delay: 0,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      };
      setHearts((prev) => [...prev.slice(-20), newHeart]);
    }, 400);
    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <>
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}rem`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </>
  );
};

export default FloatingHearts;
