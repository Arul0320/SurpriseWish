import { useState, useCallback } from "react";
import coupleImg from "@/assets/3.jpeg";

interface ProposalPageProps {
  onAccept: () => void;
}

const ProposalPage = ({ onAccept }: ProposalPageProps) => {
  const [noPos, setNoPos] = useState<{ top?: string; left?: string }>({});
  const [yesScale, setYesScale] = useState(1);
  const [noAttempts, setNoAttempts] = useState(0);

  const moveNoButton = useCallback(() => {
    const top = Math.random() * 70 + 10;
    const left = Math.random() * 70 + 10;
    setNoPos({ top: `${top}%`, left: `${left}%` });
    setNoAttempts((prev) => prev + 1);
    setYesScale((prev) => Math.min(prev + 0.15, 2.2));
  }, []);

  const playfulMessages = [
    "Don't waste your time choosing No 😉",
    "Haha nice try! 😂",
    "You really thought? 🤭",
    "The No button has trust issues 💀",
    "Just click Yes already! 🥺",
    "No is not an option, darling 💅",
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-secondary opacity-50 blur-2xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-valentine-blush opacity-40 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-valentine-rose opacity-20 blur-2xl" />

      <div className="relative z-10 flex flex-col items-center max-w-lg w-full">
        {/* Couple Image */}
        <div className="bounce-soft mb-6">
          <img
            src={coupleImg}
            alt="Cute cartoon couple"
            className="w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover border-4 border-primary shadow-lg"
          />
        </div>

        {/* Names */}
        <p className="text-lg font-body font-semibold text-muted-foreground mb-2 tracking-wider">
          You & Me
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display shimmer-text mb-8 text-center leading-tight">
          Will you be my Valentine?
        </h1>

        {/* Buttons */}
        <div className="flex gap-6 mb-6 relative">
          <button
            onClick={onAccept}
            className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-bold text-lg shadow-lg pulse-glow transition-all duration-300 hover:brightness-110 active:scale-95"
            style={{ transform: `scale(${yesScale})` }}
          >
            Yes ❤️
          </button>

          <button
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={moveNoButton}
            className="px-8 py-4 rounded-full bg-muted text-muted-foreground font-body font-bold text-lg shadow transition-all duration-200 hover:bg-muted"
            style={
              noPos.top
                ? {
                  position: "fixed",
                  top: noPos.top,
                  left: noPos.left,
                  zIndex: 100,
                  transition: "all 0.3s ease",
                }
                : {}
            }
          >
            No 💔
          </button>
        </div>

        {/* Playful Message */}
        <p className="text-base text-muted-foreground font-body text-center sway">
          {playfulMessages[Math.min(noAttempts, playfulMessages.length - 1)]}
        </p>
      </div>
    </div>
  );
};

export default ProposalPage;
